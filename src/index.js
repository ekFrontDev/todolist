/* eslint-disable indent */
// global import
import React from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

// element import
import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list'
import Footer from './components/footer'

// variables
const headElement = document.querySelector('.todoapp')
const head = createRoot(headElement)

// main App
export default class App extends React.Component {
  constructor() {
    super()

    // функция для удаления такси из тасклиста
    this.deletTask = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)

        return { todoData: todoData.toSpliced(idx, 1) }
      })
    }

    // функция для добавления такси в тасклист
    this.addTask = (event) => {
      const taskObj = this.createNewObject(event)
      this.setState(({ todoData }) => {
        return { todoData: todoData.toSpliced(0, 0, taskObj) }
      })
    }

    // функция для отметки такски как выполненной
    this.onToggleCompleted = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = { ...oldTask, completed: !oldTask.completed }
        const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
        return { todoData: newArr }
      })
    }

    // функция для удаления всех выполненных тасок
    this.clearCompletedTask = () => {
      this.setState(({ todoData }) => {
        const newArr = todoData.filter((el) => !el.completed)
        return { todoData: newArr }
      })
    }

    // фильтрация
    this.filterTask = (items, filter) => {
      switch (filter) {
        case 'all':
          return items
        case 'active':
          return items.filter((el) => !el.completed)
        case 'completed':
          return items.filter((el) => el.completed)
        default:
          return items
      }
    }

    // функция для изменения фильтра в стэйт при нажатии кнопок фильтрации
    this.onFilterChange = (filter) => {
      this.setState({ filter })
    }

    // функция для открытия редактирования таски,
    // при нажатии символа редактирования к ЛИ добавляется новый класс,
    // который рендерит форму для редактирования
    this.editTask = (id) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = { ...oldTask, editing: !oldTask.editing }
        const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
        return { todoData: newArr }
      })
    }

    this.editTaskChange = (id, text) => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = { ...oldTask, nameTask: text, editing: !oldTask.editing }
        const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
        return { todoData: newArr }
      })
    }
  }

  // функция для создания объекта Task
  // eslint-disable-next-line class-methods-use-this
  createNewObject(text) {
    return { nameTask: text, id: Math.random() * 10, completed: false, date: new Date(), editing: false }
  }

  state = { todoData: [], filter: 'all' }

  render() {
    const { todoData, filter } = this.state
    // счетчик тасок
    const doneCount = this.state.todoData.filter((el) => el.completed).length
    const todoCount = this.state.todoData.length - doneCount

    const visibleItems = this.filterTask(todoData, filter)

    return (
      <>
        <h1>todos</h1>
        <NewTaskForm onTaskAdded={this.addTask} />
        <TaskList
          todos={visibleItems}
          onDeleted={this.deletTask}
          onToggleCompleted={this.onToggleCompleted}
          onEditTask={this.editTask}
          onEdiTaskChange={this.editTaskChange}
        />
        <Footer
          todoCount={todoCount}
          onClearTask={this.clearCompletedTask}
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
      </>
    )
  }
}

head.render(<App />)
