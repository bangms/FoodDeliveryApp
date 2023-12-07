import { combineReducers } from 'redux';

import userSlice from '../slices/user';

// 전체 state
const rootReducer = combineReducers({
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
