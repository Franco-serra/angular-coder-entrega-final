import { createAction } from "@ngrx/store";
import { props } from "@ngrx/store";


export const increment = createAction('[Counter Component] Increment',
    props<{ value: number }>()
);

export const decrement = createAction('[Counter Component] Decrement');