import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { FaTrash } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import { genericHookContextBuilder } from '../utils/genericHookContextBuilder'
import { theme } from '../theme'
import { themeTodo } from './theme'
import { uniqueId, useLocalStorage } from '../utils/util'
import React, { useContext, useState } from 'react'
import styled from '@emotion/styled'

type Task = {
  taskName: string
  id: number
  complete: boolean
}

const useLogicState = () => {
  const [todoList, setTodoList] = useLocalStorage<Task[]>('tasks:list', [] as Task[])
  const [task, setTask] = useState('')
  const [error, setError] = useState(false)
  const [filter, setFilter] = useLocalStorage<'All' | 'Complete' | 'Active'>('filterdTasks', 'All')

  const getFilteredTodoList = () => {
    if (filter === 'Active') {
      return todoList.filter(todo => !todo.complete)
    } else if (filter === 'Complete') {
      return todoList.filter(todo => todo.complete)
    } else {
      return todoList
    }
  }
  const filterValue = getFilteredTodoList()

  const addTask = () => {
    if (task.trim() === '') {
      setError(true)
      return
    }
    setTodoList([{ taskName: task, id: uniqueId(), complete: false }, ...todoList])
    setTask('')
    setError(false)
  }

  const deleteTask = (taskNameToDelete: number) => {
    setTodoList(todoList.filter(task => task.id !== taskNameToDelete))
  }

  const incompletedTodosCount = todoList.filter(todo => !todo.complete).length
  return {
    todoList,
    setTodoList,
    filter,
    setFilter,
    task,
    setTask,
    error,
    setError,
    addTask,
    deleteTask,
    incompletedTodosCount,
    filterValue,
  }
}

export const { ContextProvider: TodoContextProvider, Context: TodoContext } =
  genericHookContextBuilder(useLogicState)

export const ToDo = () => {
  return (
    <TodoContextProvider>
      <TodoListBoard />
    </TodoContextProvider>
  )
}

const TodoListBoard = () => {
  const logic = useContext(TodoContext)
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Todo App</title>
      </Helmet>
      <h1>Todo App</h1>

      <Div_TodoApp>
        <form
          onSubmit={e => {
            e.preventDefault()
            logic.addTask()
          }}
        >
          <Div_header>
            <Input_styled
              error={logic.error}
              onChange={e => logic.setTask(e.target.value)}
              value={logic.task}
            ></Input_styled>
            <Button_submit type='submit'>Add</Button_submit>
          </Div_header>
          <table>
            <tbody>
              {logic.filterValue.map(task => {
                return (
                  <tr key={task.id}>
                    <Td_styled width='5%'>
                      <input
                        onChange={event => {
                          let checked = event.target.checked
                          logic.setTodoList(
                            logic.todoList.map(todo => ({
                              ...todo,
                              complete: task.id === todo.id ? checked : todo.complete,
                            }))
                          )
                        }}
                        value={task.taskName}
                        type='checkbox'
                        checked={task.complete}
                      />
                    </Td_styled>
                    <Td_styled width='100%'>
                      <Span_styled checked={task.complete}>{task.taskName}</Span_styled>
                    </Td_styled>
                    <Td_styled width='10%'>
                      <Button_delete onClick={() => logic.deleteTask(task.id)}>
                        <FaTrash />
                      </Button_delete>
                    </Td_styled>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </form>
        <Div_Footer>
          <Span_Counter>{logic.incompletedTodosCount} items left</Span_Counter>{' '}
          <Button_footer
            onClick={() => logic.setFilter('All')}
            aria-pressed={'All' === logic.filter}
          >
            All
          </Button_footer>
          <Button_footer
            onClick={() => logic.setFilter('Active')}
            aria-pressed={'Active' === logic.filter}
          >
            Active
          </Button_footer>
          <Button_footer
            onClick={() => logic.setFilter('Complete')}
            aria-pressed={'Complete' === logic.filter}
          >
            Complete
          </Button_footer>
        </Div_Footer>
      </Div_TodoApp>
    </Div_Styled>
  )
}

const Input_styled = (props: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  error: boolean
  value: string
}) => {
  return (
    <label
      style={{
        margin: 'auto',
        width: '80%',
        color: 'red',
        fontSize: '12px',
      }}
    >
      <input
        style={{
          outline: 'none',
          margin: 'inherit',
          border: 'none',
          width: 'inherit',
          paddingTop: '5px',
          fontSize: '16px',
        }}
        onChange={props.onChange}
        value={props.value}
        type='text'
        placeholder='What need to be done?'
      ></input>
      <p
        style={{
          margin: 'inherit',
        }}
      >
        {props.error ? 'Error: Nothing added. Please, add task item...' : ''}
      </p>
    </label>
  )
}

const Div_TodoApp = styled.div`
  box-sizing: border-box;
  text-align: left;
  border-bottom: solid 2px ${themeTodo.primaryColor};
  border-radius: 5px;
  max-width: 500px;
  margin: auto;
  background: #fff;
  box-shadow: ${themeTodo.boxShadow};
  @media screen and ${theme.mediaSMax} {
    width: 95%;
  }
`

const Td_styled = styled.td<{ width?: string }>`
  width: ${props => props.width};
  padding: 5px;
  font-family: inherit;
  font-size: inherit;
`

const Span_Counter = styled.span`
  padding: 5px;
  font-size: inherit;
  font-family: inherit;
  @media screen and ${theme.mediaSMax} {
    text-align: center;
  }
`

const Span_styled = styled.span<{ checked: boolean }>`
  text-decoration: ${props => (props.checked ? 'line-through' : 'none')};
`

const Div_header = styled.div`
  display: flex;
  background: #fff;
  border-bottom: solid 1px ${themeTodo.primaryColor};
  padding: 5px;
  padding-bottom: px;
`

const Button_delete = styled(Button)`
  background-color: ${theme.backgroundColor};
  transition: all 0.15s ease-out;
  &:hover {
    transition: all 0.15s ease-in;
    transform: scale(1.1);
    background-color: ${theme.backgroundColor};
  }
`

const Button_footer = styled(Button)`
  width: 80px;
  transition: inherit:
  &:hover {
    background-color: ${theme.primaryColor};
    border-radius: 5px;
  }
  &[aria-pressed='true'] {
    border: 3px dotted ${theme.primaryColor};
  }
  @media screen and ${theme.mediaSMax} {
    width: 98%;
    margin: 1% 1%;
  }
`

const Button_submit = styled(Button)`
  padding: 5px 15px 3px 15px;
  background-color: ${theme.primaryColor};
  transition: all 0.15s ease-out;
  &:hover {
    transition: all 0.15s ease-in;
    transform: scale(1.1);
    opacity: 1;
  }
  @media screen and ${theme.mediaSMax} {
    width: 80px;
    margin: 1% 1%;
  }
`

const Div_Footer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
  @media screen and ${theme.mediaSMax} {
    flex-direction: column;
  }
`
