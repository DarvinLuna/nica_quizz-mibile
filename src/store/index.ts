import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {NativeModules} from 'react-native';

import futecAttendanceReducer from '../features';


const getPersistenceKey = async (): Promise<string> => {
    try {
        const {Environment} = NativeModules;

        if (Environment) {
            const instanceInfo = await Environment.getInstanceInfo();
            const instanceId = instanceInfo?.instanceId;
            const launchMode = instanceInfo?.launchMode;

            // For multi-instance scenarios, use unique keys
            if (
                instanceId &&
                (launchMode === 'NEW_INSTANCE' || launchMode === 'KEEP_LAUNCHER')
            ) {
                const baseKey = `nova_${Config.ENV || 'demo'}`;
                return `${baseKey}_instance_${instanceId}`;
            }
        }
    } catch (error) {
        console.warn('Could not get instance info for persistence key:', error);
    }

    // Fallback to environment-specific key for single instances
    return `nova_${Config.ENV || 'demo'}`;
};

const createPersistedReducer = async () => {
    const persistenceKey = await getPersistenceKey();
    console.log(`🗄️ Using persistence key: ${persistenceKey}`);

    const baseReducer = (() => {
        switch (Config.ENV) {
            case 'futec_attendance':
                return futecAttendanceReducer;
        }
    })();

    return persistReducer(
        {
            key: persistenceKey,
            storage: AsyncStorage,
            transforms: [],
        },
        // @ts-ignore
        baseReducer,
    );
};

const getPersistedReducer = () => {
    switch (Config.ENV) {
        case 'futec_attendance':
            return persistReducer(
                {
                    key: 'root',
                    storage: AsyncStorage,
                },
                futecAttendanceReducer,
            );

    }
};

let storeInstance: ReturnType<typeof configureStore> | null = null;
let persistorInstance: ReturnType<typeof persistStore> | null = null;

export const initializeStore = async () => {
    if (storeInstance && persistorInstance) {
        return {store: storeInstance, persistor: persistorInstance};
    }

    try {
        const persistedReducer = await createPersistedReducer();

        storeInstance = configureStore({
            reducer: persistedReducer,
            middleware: getDefaultMiddleware => {
                return getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                    immutableCheck: false,
                });
            },
        });

        persistorInstance = persistStore(storeInstance);

        return {store: storeInstance, persistor: persistorInstance};
    } catch (error) {
        console.warn(
            'Failed to create instance-specific store, falling back to legacy store:',
            error,
        );

        const legacyPersistedReducer = getPersistedReducer();

        storeInstance = configureStore({
            // @ts-ignore
            reducer: legacyPersistedReducer,
            middleware: getDefaultMiddleware => {
                return getDefaultMiddleware({
                    serializableCheck: {
                        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                    },
                    immutableCheck: false,
                });
            },
        });

        persistorInstance = persistStore(storeInstance);

        return {store: storeInstance, persistor: persistorInstance};
    }
};

const persistedReducer = getPersistedReducer();

const IGNORED_ACTIONS = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
const store = configureStore({
    // @ts-ignore
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: IGNORED_ACTIONS,
            },
            immutableCheck: false,
        });
    },
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;

export {store, persistor};