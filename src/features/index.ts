import { combineReducers } from 'redux';

import auth from './auth.ts';

export const CLEAR_ERROR = 'CLEAR_ERROR';

const appReducer = combineReducers({
  auth,
});

const rootReducer = (
  state: RootState | undefined,
  action: { type: string },
): RootState => {
  if (action.type === 'auth/logout') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;

export default rootReducer;
