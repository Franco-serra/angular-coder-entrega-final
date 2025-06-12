import { createReducer, on} from '@ngrx/store';
import { increment, decrement } from './counter.actions';

export const counterFeaturedName = 'counter';

export interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0
}

export const counterReducer = createReducer<CounterState>(
    initialState,
    on(increment, (state, props) => ({
    ...state,
    value: state.value + props.value
})),
    on(decrement, (state) => ({
    ...state,
    value: state.value - 1
}))
);
