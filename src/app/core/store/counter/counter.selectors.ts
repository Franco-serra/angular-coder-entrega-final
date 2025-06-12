import { createFeatureSelector, createSelector } from '@ngrx/store';
import { counterFeaturedName, CounterState } from './counter.reducer';


export const selectCounterState = createFeatureSelector<CounterState>(
    counterFeaturedName,
);

export const selectCounterValue = createSelector(
    selectCounterState,
    (state) => state.value,
)

export const selectCounterValuex10 = createSelector(
    selectCounterValue,
    (value) => value * 10,
)

export const isValueEven = createSelector(
    selectCounterValue,
    (value) => value % 2 === 0,
)

