/* eslint-disable prettier/prettier */
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

	 this.interval = null

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

	 // функция записывает в стейт значения таймера после добавления таски в список
    this.taskTimerState = (min, sec, id) => {
      this.setState(({ todoData }) => {
        const end = Date.now() + min * 1000 * 60 + sec * 1000
        const now = Date.now()
        const delta = end - now
		  const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = {...oldTask,
			 minuteTens: Math.floor(delta / 1000 / 60 / 10),
          minute: Math.floor((delta / 1000 / 60) % 10),
          secondTens: Math.floor((delta % 60000) / 10000),
          second: Math.floor(((delta % 60000) / 1000) % 10)}
		  const newArr = [ ...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1) ]
		  return { todoData: newArr }
      })
    }
	 // функция меняет значение timer на true при нажатии кнопки плэй
	 this.timerStart = (id) => {
		const { todoData } = this.state
		const idx = todoData.findIndex((el) => el.id === id)
		const oldTask = todoData[idx]
			// eslint-disable-next-line no-shadow
			this.setState(({ todoData }) => {
				const newTask = { ...oldTask, timer: !oldTask.timer }
				const newArr = [ ...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1) ]
				return { todoData: newArr }
			})
	 }

	 this.timerEnd = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id)
			const oldTask = todoData[idx]
			const newTask = { ...oldTask, 
				minuteForTask: 0,
				seconds: 0,
				timer: false, 
				minuteTens: 0,
				minute: 0,
				secondTens: 0,
				second: 0}
			const newArr = [ ...todoData.slice(0, idx), 
				newTask, ...todoData.slice(idx + 1) ]
			return { todoData: newArr }
		})
	 }

	 this.changeTimerState = (arr) => {
		const [ minTens, min, secTens, sec, id ] = arr
		const totalMin = minTens * 10 + min
      const totalSec = secTens * 10 + sec
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id)
			const oldTask = todoData[idx]
			const newTask = { ...oldTask, 
				minuteForTask: totalMin,
				seconds: totalSec,
				minuteTens: minTens,
				minute: min,
				secondTens: secTens,
				second: sec}
			const newArr = [ ...todoData.slice(0, idx), 
				newTask, ...todoData.slice(idx + 1) ]
			return { todoData: newArr }
		})
	 }
  }

  // функция для создания объекта Task
  // eslint-disable-next-line class-methods-use-this
  createNewObject(obj) {
    const { label, min, sec } = obj
    // eslint-disable-next-line object-curly-newline
    return {
      nameTask: label,
      id: Math.floor(Math.random() * 1000),
      completed: false,
      date: new Date(),
      editing: false,
      minuteForTask: Number(min),
      seconds: Number(sec),
      minuteTens: '',
      // eslint-disable-next-line no-dupe-keys
      minute: '',
      secondTens: '',
      second: '',
		timer: false
      // eslint-disable-next-line prettier/prettier
    // eslint-disable-next-line object-curly-newline
    }
  }

  // eslint-disable-next-line prettier/prettier
  state = { todoData: [
      // eslint-disable-next-line prettier/prettier
      // {nameTask: 'Drink ',
      //   id: Math.random() * 10,
      //   completed: false,
      //   date: new Date(),
      //   editing: false,
      //   minuteForTask: Number(7),
      //   seconds: Number(60),
      //   minuteTens: '',
      //   minute: '',
      //   secondTens: '',
      //   second: '',
		//   timer: false
        // eslint-disable-next-line object-curly-newline
      // },
    ],

    // eslint-disable-next-line prettier/prettier
    filter: 'all',}

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
          onTaskTimerState={this.taskTimerState}
			 onTimerStart={this.timerStart}
			 onTimerEnd={this.timerEnd}
			 onChangeTimerState={this.changeTimerState}
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
