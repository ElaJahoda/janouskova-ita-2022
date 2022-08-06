import { Div_Styled } from '../HomePage'
import { theme } from '../theme'
import React, { ChangeEvent, FC, useState } from 'react'
import styled from '@emotion/styled'

type TTask = {
  taskName: string
  id: number
  complete: boolean
}

const lsId = {
  tasks: ' tasks:list',
}

const getTasksLS = (): TTask[] => {
  const lsTasks = localStorage.getItem(lsId.tasks)
  if (lsTasks) {
    return JSON.parse(lsTasks)
  }
  return []
}
export const ToDo: FC = () => {
  const [todoList, _setTodoList] = useState(getTasksLS())
  const [task, setTask] = useState<string>('')

  const setTodoList = (items: TTask[]) => {
    localStorage.setItem(lsId.tasks, JSON.stringify(items))
    _setTodoList(items)
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value)
  }

  const addTask = (): void => {
    if (task === '') {
      alert('Please, add task item.')
      return
    }
    const newTask = { taskName: task, id: Math.floor(Math.random() * 10000), complete: false }

    setTodoList([newTask, ...todoList])
    setTask('')
  }

  const deleteTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter(task => {
        return task.taskName !== taskNameToDelete
      })
    )
  }

  const AllCheckboxCh = (event: ChangeEvent<HTMLInputElement>) => {
    let checked = event.target.checked
    setTodoList(
      todoList.map(data => {
        data.complete = checked
        return data
      })
    )
  }

  const getToDosLeft = (): number => {
    return todoList.filter(todo => !todo.complete).length
  }

  return (
    <Div_Styled>
      <h1>Todo app</h1>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <Div_TodoApp>
          <Div_header>
            <Input_styled
              type='text'
              placeholder='What needs to be dome?'
              onChange={handleChange}
              value={task}
            />
            <Button_styled onClick={addTask}>Add</Button_styled>
          </Div_header>
          <table>
            <thead>
              <tr>
                <th>
                  <input type='checkbox' onChange={AllCheckboxCh} />
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
                              if (task.id === data.id) {
                                data.complete = checked
                              }
                              return data
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
                      <Button_styled
                        onClick={() => {
                          deleteTask(task.taskName)
                        }}
                      >
                        X
                      </Button_styled>
                    </Td_styled>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <Div_Counter>{getToDosLeft()} items left</Div_Counter>
        </Div_TodoApp>
      </form>
    </Div_Styled>
  )
}

const Input_styled = styled.input`
  margin: auto;
  border: none;
  width: 80%;
  &:focus {
    outline: none;
  }
`

const Div_TodoApp = styled.div`
  box-sizing: border-box;
  text-align: left;
  border-bottom: solid 2px grey;
  border-radius: 5px;
  width: 50%;
  margin: auto;
  background: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`

const Td_styled = styled.td<{ width?: string; border?: string }>`
  width: ${props => props.width};
  font-family: inherit;
  font-size: inherit;
  border-bottom: ${props => props.border};
`

const Div_Counter = styled.div`
  color: black;
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
  border-bottom: solid 1px grey;
  padding: 5px;
  box-shadow: ${theme.boxShadow};
`
const Button_styled = styled.button`
  background-color: ${theme.primaryColor};
  border: solid 0.5px ${theme.primaryColor};
  border-radius: 5px;
`
