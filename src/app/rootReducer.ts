import { combineReducers } from '@reduxjs/toolkit';
import serviceLogsReducer from '../features/serviceLogs/serviceLogsSlice';

const rootReducer = combineReducers({
  serviceLogs: serviceLogsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
