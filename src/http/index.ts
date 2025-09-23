import axios from 'axios';
import Toast from 'react-native-toast-message';

import {HOST} from '../constants/settings';
import {store} from '../store';
import {CLEAR_ERROR} from '../features';
import i18n from '../../i18n';
import {ToastType} from '../constants/utils';

const getHeaders = () => {
    const headers = {
        Accept: 'application/json',
        'Content-type': 'Application/json',
    };
    const access = store.getState().auth.access;
    if (access) {
        headers.Authorization = `Bearer ${access}`;
    }
    return headers;
};

const refreshAccessToken = async function () {
    return axios
        .request({
            method: 'POST',
            url: HOST.concat('/auth/refresh/'),
            data: {
                refresh: store.getState().auth.refresh,
            },
        })
        .then(response => {
            if (response.status === 200) {
                store.dispatch({
                    type: 'auth/refresh',
                    payload: response.data,
                });
            }
        })
        .catch(() => {
            store.dispatch({
                type: 'auth/logout',
            });
        });
};

export const httpClient = axios.create({
    timeout: 10000,
});

httpClient.interceptors.request.use(
    async config => {
        config.headers = getHeaders();
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

httpClient.interceptors.response.use(
    response => {
        return response;
    },
    async function (error) {
        let response_status;
        try {
            response_status = error.response.status;
        } catch {
            response_status = 200;
        }
        const originalRequest = error.config;
        if (response_status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await refreshAccessToken();
            return httpClient(originalRequest);
        } else {
            if (response_status === 400 || response_status === 401) {
                const data = error.response.data;
                if (data) {
                    for (const key in data) {
                        if (key === 'detail') {
                            Toast.show({
                                type: ToastType.ERROR,
                                text1: 'Error',
                                text2: data[key],
                                onHide: () => {
                                    store.dispatch({
                                        type: CLEAR_ERROR,
                                    });
                                },
                            });
                        }
                    }
                }
            }
            if (response_status === 403) {
                Toast.show({
                    type: ToastType.ERROR,
                    text1: 'Error',
                    text2: 'Prohibido',
                });
            }
            if (response_status === 404) {
                Toast.show({
                    type: ToastType.ERROR,
                    text1: 'Error',
                    text2: 'No encontrado',
                });
            }
            if (response_status === 500) {
                Toast.show({
                    type: ToastType.ERROR,
                    text1: 'Error',
                    text2: 'Error interno del servidor',
                });
            }
        }
        return Promise.reject(error);
    },
);

export default async function makeApiCall(url, method, data, rejectWithValue) {
    try {
        const response = await httpClient.request({
            url,
            method,
            data: {
                ...data,
                lang: i18n.language,
            },
        });
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNABORTED' || !error.response) {
            Toast.show({
                type: ToastType.ERROR,
                text1: 'Error',
                text2:
                    'La solicitud ha excedido el tiempo de espera. Por favor, inténtelo de nuevo.',
            });
            throw rejectWithValue({
                detail:
                    'La solicitud ha excedido el tiempo de espera. Por favor, inténtelo de nuevo.',
            });
        } else {
            throw rejectWithValue(error.response.data);
        }
    }
}