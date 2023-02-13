import { RootState } from '../store';

export const selectTasksData = (state: RootState) => state.tasks;
