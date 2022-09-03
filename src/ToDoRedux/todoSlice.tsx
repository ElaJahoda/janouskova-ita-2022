import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from './ToDoRedux'
import { uniqueId } from '../utils/util'

const todoSlice = createSlice({
  name: 'todo',
  initialState: [] as Task[],
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload)
      },
      prepare: (taskName: string) => ({
        payload: {
          id: uniqueId(),
          taskName,
          complete: false,
        } as Task,
      }),
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(task => task.id === action.payload)
      state.splice(index, 1)
    },
    toggleCompleted(state, action: PayloadAction<{ id: number; complete: boolean }>) {
      const index = state.findIndex(task => task.id === action.payload.id)
      state[index].complete = action.payload.complete
    },
  },
})

// Action creators are generated for each case reducer function
export const { addTask, deleteTask, toggleCompleted } = todoSlice.actions

export const todoReducer = todoSlice.reducer
