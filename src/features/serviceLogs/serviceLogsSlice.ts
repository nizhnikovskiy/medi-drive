import { createSlice, createEntityAdapter, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { ServiceLogEntry, ServiceLogFormValues, ServiceLogStatus } from '../../types/serviceLog';
import type { RootState } from '../../app/rootReducer';

const serviceLogsAdapter = createEntityAdapter({
  selectId: (log: ServiceLogEntry) => log.id,
  sortComparer: (a: ServiceLogEntry, b: ServiceLogEntry) => b.createdAt.localeCompare(a.createdAt),
});

const buildEntry = (
  payload: ServiceLogFormValues,
  status: ServiceLogStatus,
): ServiceLogEntry => {
  const now = new Date().toISOString();
  return {
    ...payload,
    kind: 'serviceLog',
    status,
    id: nanoid(),
    createdAt: now,
    updatedAt: now,
  };
};

const initialState = serviceLogsAdapter.getInitialState();

const serviceLogsSlice = createSlice({
  name: 'serviceLogs',
  initialState,
  reducers: {
    addServiceLog: (state, action: PayloadAction<ServiceLogFormValues>) => {
      serviceLogsAdapter.addOne(state, buildEntry(action.payload, ServiceLogStatus.Completed));
    },
    addDraft: (state, action: PayloadAction<ServiceLogFormValues>) => {
      serviceLogsAdapter.addOne(state, buildEntry(action.payload, ServiceLogStatus.Draft));
    },
    updateServiceLog: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<ServiceLogFormValues> }>
    ) => {
      const { id, changes } = action.payload;
      serviceLogsAdapter.updateOne(state, {
        id,
        changes: {
          ...changes,
          updatedAt: new Date().toISOString(),
        },
      });
    },
    deleteServiceLog: (state, action: PayloadAction<string>) => {
      serviceLogsAdapter.removeOne(state, action.payload);
    },
  },
});

export const {
  addServiceLog,
  addDraft,
  updateServiceLog,
  deleteServiceLog,
} = serviceLogsSlice.actions;

export const serviceLogsSelectors = serviceLogsAdapter.getSelectors<RootState>(
  (state) => state.serviceLogs
);

export default serviceLogsSlice.reducer;
