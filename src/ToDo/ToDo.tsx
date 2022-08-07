import { Div_Styled } from '../HomePage'
import { theme } from '../theme'
import { themeTodo } from './theme'
import { uniqueId } from '../util'
import React, { ChangeEvent, useState } from 'react'
import styled from '@emotion/styled'

type Task = {
  taskName: string
  id: number
  complete: boolean
}

const localStorageId = {
  tasks: ' tasks:list',
}

const getTaskLocalStorage = (): Task[] => {
  const localStorageTasks = localStorage.getItem(localStorageId.tasks)
  if (localStorageTasks) {
    return JSON.parse(localStorageTasks)
  }
  return []
}

function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.log(error)
      return initialValue
    }
  })
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.log(error)
    }
  }
  return [storedValue, setValue] as const
}

export const ToDo = () => {
  const [todoList, _setTodoList] = useState(getTaskLocalStorage())
  const [task, setTask] = useState('')
  const [name, setName] = useLocalStorage<string | Task[]>(localStorageId.tasks, task)
  const [error, setError] = useState<boolean>(false)

  const setTodoList = (items: Task[]) => {
    _setTodoList(items)
    setName(items)
  }

  const addTask = () => {
    if (task.trim() === '') {
      const newError = true
      setError(newError)
      return
    }
    const newTask = { taskName: task, id: uniqueId(), complete: false }

    setTodoList([newTask, ...todoList])
    console.log(localStorageId.tasks)

    setTask('')
    setError(false)
  }

  const deleteTask = (taskNameToDelete: string) => {
    setTodoList(todoList.filter(task => task.taskName !== taskNameToDelete))
  }

  const AllCheckboxChecked = (event: ChangeEvent<HTMLInputElement>) => {
    let checked = event.target.checked
    setTodoList(
      todoList.map(data => {
        data.complete = checked
        return data
      })
    )
  }

  const getToDosLeft = todoList.filter(todo => !todo.complete).length

  return (
    <Div_Styled>
      <h1>Todo App</h1>
      <Div_TodoApp>
        <Div_header>
          <Input_styled
            type='text'
            placeholder={
              error ? 'Error: Nothing added. Please, add task item...' : 'What need to be done?'
            }
            error={error}
            onChange={e => {
              setTask(e.target.value)
            }}
            value={task}
          />
          <Button_styled onClick={addTask}>Add</Button_styled>
        </Div_header>
        <table>
          <thead>
            <tr>
              <th>
                <input type='checkbox' onChange={AllCheckboxChecked} />
              </th>
              <th>List of items:</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {todoList.map(task => {
              return (
                <tr key={task.id}>
                  <Td_styled width='5%'>
                    <input
                      onChange={event => {
                        let checked = event.target.checked
                        setTodoList(
                          todoList.map(data => {
                            console.log(data)
                            const data1 = { ...data }
                            if (task.id === data1.id) {
                              data1.complete = checked

                              console.log(data.complete === data1.complete)
                              console.log(task.id === data1.id)
                            }
                            console.log(data.complete === data1.complete)
                            return data1
                          })
                        )
                      }}
                      value={task.taskName}
                      type='checkbox'
                      checked={task.complete}
                    />
                  </Td_styled>
                  <Td_styled width='100%' border='solid 1px #d3d3d3'>
                    <Span_styled checked={task.complete}>{task.taskName}</Span_styled>
                  </Td_styled>
                  <Td_styled width='10%'>
                    <Button_styled onClick={() => deleteTask(task.taskName)}>X</Button_styled>
                  </Td_styled>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Div_Counter>{getToDosLeft} items left</Div_Counter>
      </Div_TodoApp>
    </Div_Styled>
  )
}

const Input_styled = styled.input<{ error?: boolean }>`
  margin: auto;
  border: none;
  width: 80%;
  &:focus {
    outline: none;
  }
  placeholder: ${props => (props.error ? 'abc' : 'def')};
`

const Div_TodoApp = styled.div`
  box-sizing: border-box;
  text-align: left;
  border-bottom: solid 2px ${themeTodo.primaryColor};
  border-radius: 5px;
  width: 50%;
  margin: auto;
  background: #fff;
  box-shadow: ${themeTodo.boxShadow};
`

const Td_styled = styled.td<{ width?: string; border?: string }>`
  width: ${props => props.width};
  font-family: inherit;
  font-size: inherit;
  border-bottom: ${props => props.border};
`

const Div_Counter = styled.div`
  font-size: small;
  padding: 5px;
  font-size: 15px;
  font-family: inherit; ;
`

const Span_styled = styled.span<{ checked: boolean }>`
  text-decoration: ${props => (props.checked ? 'line-through' : 'none')};
`

const Div_header = styled.div`
  display: flex;
  background: #fff;
  border-bottom: solid 1px ${themeTodo.primaryColor};
  padding: 5px;
  box-shadow: ${theme.boxShadow};
`
const Button_styled = styled.button`
  background-color: ${theme.primaryColor};
  border: solid 0.5px ${theme.primaryColor};
  border-radius: 5px;
`
