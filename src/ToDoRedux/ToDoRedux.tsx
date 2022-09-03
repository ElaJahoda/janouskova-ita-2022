import { AppDispatch, RootState, store } from './store'
import { Button } from '../components/Button'
import { Div_Styled } from '../HomePage'
import { FaTrash } from 'react-icons/fa'
import { Helmet } from 'react-helmet'
import { Provider, useDispatch } from 'react-redux'
import { addTask, deleteTask, toggleCompleted } from './todoSlice'
import { theme } from '../theme'
import { themeTodo } from '../ToDo/theme'
import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import styled from '@emotion/styled'

export type Task = {
  taskName: string
  id: number
  complete: boolean
}

export const ToDoRedux = () => {
  return (
    <Provider store={store}>
      <ToDoListRedux />
    </Provider>
  )
}

export const ToDoListRedux = () => {
  const tasks = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState(false)
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState('All' as 'All' | 'Complete' | 'Active')
  const getFilteredTodoList = () => {
    if (filter === 'Active') {
      return tasks.todo.filter((todo: Task) => !todo.complete)
    } else if (filter === 'Complete') {
      return tasks.todo.filter((todo: Task) => todo.complete)
    } else {
      return tasks.todo
    }
  }
  const filterValue = getFilteredTodoList()
  const incompletedTodosCount = tasks.todo.filter(todo => !todo.complete).length
  return (
    <Div_Styled>
      <Helmet>
        <title>Eva Janouskova - Todo App</title>
      </Helmet>
      <h1>Todo App</h1>
      <div></div>

      <Div_TodoApp>
        <form
          onSubmit={e => {
            e.preventDefault()
            if (task.trim() === '') {
              return
            }
            dispatch(addTask(task))
            setTask('')
          }}
        >
          <Div_header>
            <Input_styled
              error={error}
              onChange={e => setTask(e.target.value)}
              value={task}
            ></Input_styled>
            <Button_submit type='submit'>Add</Button_submit>
          </Div_header>
          <table>
            <tbody>
              {filterValue.map(task => {
                return (
                  <tr key={task.id}>
                    <Td_styled width='5%'>
                      <input
                        onChange={event => {
                          let checked = event.target.checked
                          dispatch(toggleCompleted({ id: task.id, complete: checked }))
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
                      <Button_delete onClick={() => dispatch(deleteTask(task.id))}>
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
          <Span_Counter>{incompletedTodosCount} items left</Span_Counter>{' '}
          <Button_footer onClick={() => setFilter('All')} aria-pressed={'All' === filter}>
            All
          </Button_footer>
          <Button_footer onClick={() => setFilter('Active')} aria-pressed={'Active' === filter}>
            Active
          </Button_footer>
          <Button_footer onClick={() => setFilter('Complete')} aria-pressed={'Complete' === filter}>
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
