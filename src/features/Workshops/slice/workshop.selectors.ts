import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store/store';
import { WorkshopStatus } from '../models';

export const selectWorkshopsData = (state: RootState) =>
  state.workshops.workshops;

export const selectUpcomingWorkshops = createSelector(
  [selectWorkshopsData],
  (workshops) =>
    workshops.filter((workshop) => workshop.status === WorkshopStatus.UPCOMING),
);

export const selectCompletedWorkshops = createSelector(
  [selectWorkshopsData],
  (workshops) =>
    workshops.filter(
      (workshop) => workshop.status === WorkshopStatus.COMPLETED,
    ),
);
