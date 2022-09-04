import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Task } from './ToDoRedux'
import { uniqueId } from '../utils/util'

const loadStateLocalStorage = (key: string): [] | Task[] => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : []
  } catch (error) {
    console.error
    return []
  }
}

const saveStateLocalStorage = (key: string, valueToStore: Task[]) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  } catch (error) {
    console.error
  }
}

const keyLocalStorage = 'tasks'

const todoSlice = createSlice({
  name: 'todo',
  initialState: loadStateLocalStorage(keyLocalStorage) as Task[],
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload)
        saveStateLocalStorage(keyLocalStorage, state)
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
      saveStateLocalStorage(keyLocalStorage, state)
    },
    toggleCompleted(state, action: PayloadAction<{ id: number; complete: boolean }>) {
      const index = state.findIndex(task => task.id === action.payload.id)
      state[index].complete = action.payload.complete
      saveStateLocalStorage(keyLocalStorage, state)
    },
  },
})

export const { addTask, deleteTask, toggleCompleted } = todoSlice.actions

export const todoReducer = todoSlice.reducer
