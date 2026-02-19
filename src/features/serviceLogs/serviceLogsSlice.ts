import { createSlice, createEntityAdapter, createSelector, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { ServiceLogEntry, ServiceLogFormValues, ServiceLogStatus } from '@/types/serviceLog.ts';
import type { RootState } from '@/app/rootReducer.ts';

const serviceLogsAdapter = createEntityAdapter({
  selectId: (log: ServiceLogEntry) => log.id,
  sortComparer: (a: ServiceLogEntry, b: ServiceLogEntry) => b.createdAt.localeCompare(a.createdAt),
});

export const buildEntry = (
  payload: ServiceLogFormValues,
  status: ServiceLogStatus,
  id: string = nanoid(),
  now: string = new Date().toISOString(),
): ServiceLogEntry => ({
  ...payload,
  kind: 'serviceLog',
  status,
  id,
  createdAt: now,
  updatedAt: now,
});

interface ServiceLogsState {
  currentFormState: ServiceLogFormValues | null;
}

const initialState = serviceLogsAdapter.getInitialState<ServiceLogsState>({
  currentFormState: null,
});

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
    setCurrentFormState: (state, action: PayloadAction<ServiceLogFormValues | null>) => {
      state.currentFormState = action.payload;
    },
    clearAllDrafts: (state) => {
      const draftIds = Object.values(state.entities)
        .filter((entity): entity is ServiceLogEntry => 
          entity !== undefined && entity.status === ServiceLogStatus.Draft
        )
        .map((entity) => entity.id);
      serviceLogsAdapter.removeMany(state, draftIds);
    },
    promoteDraftToLog: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      serviceLogsAdapter.updateOne(state, {
        id,
        changes: {
          status: ServiceLogStatus.Completed,
          updatedAt: new Date().toISOString(),
        },
      });
    },
  },
});

export const {
  addServiceLog,
  addDraft,
  updateServiceLog,
  deleteServiceLog,
  setCurrentFormState,
  clearAllDrafts,
  promoteDraftToLog,
} = serviceLogsSlice.actions;

export const serviceLogsSelectors = serviceLogsAdapter.getSelectors<RootState>(
  (state) => state.serviceLogs
);

export const selectCurrentFormState = (state: RootState) => state.serviceLogs.currentFormState;
export const selectDrafts = createSelector(
  serviceLogsSelectors.selectAll,
  (logs) => logs.filter((log) => log.status === ServiceLogStatus.Draft)
);

export const selectCompletedLogs = createSelector(
  serviceLogsSelectors.selectAll,
  (logs) => logs.filter((log) => log.status === ServiceLogStatus.Completed)
);

export default serviceLogsSlice.reducer;
