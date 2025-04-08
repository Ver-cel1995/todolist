import {RootState} from "../../app/store.ts";
import {Tasks} from "../../app/App.tsx";

export const selectTasks = (state: RootState): Tasks => state.tasks