/* eslint-disable prettier/prettier */
/* eslint-disable indent */
// global import
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'

// element import
import NewTaskForm from './components/new-task-form'
import TaskList from './components/task-list'
import Footer from './components/footer'

const headElement = document.querySelector('.todoapp')
const head = createRoot(headElement)

export default function App() {
	const [todoData, setTodoData] = useState([])
	const [filter, setFilter] = useState('all')

	function deletTask(id) {
		const idx = todoData.findIndex((el) => el.id === id)
      setTodoData(todoData.toSpliced(idx, 1))
	}

  // eslint-disable-next-line class-methods-use-this
  function createNewObject(obj) {
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

   function addTask(event) {
      const taskObj = createNewObject(event)
		setTodoData(todoData.toSpliced(0, 0, taskObj))
    }

   function onToggleCompleted(id) {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = { ...oldTask, completed: !oldTask.completed }
        const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
        setTodoData(newArr)
    }

   function clearCompletedTask() {
		const newArr = todoData.filter((el) => !el.completed)
		setTodoData(newArr)
    }

   function filterTask(items, filterItem) {
      switch (filterItem) {
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

   function onFilterChange(filterItem) {
      setFilter(filterItem)
    }

   function editTask(id) {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = { ...oldTask, editing: !oldTask.editing }
        const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
        setTodoData(newArr)
    }

   function editTaskChange(id, text) {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldTask = todoData[idx]
        const newTask = { ...oldTask, nameTask: text, editing: !oldTask.editing }
        const newArr = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)]
        setTodoData(newArr)
    }

   function taskTimerState(min, sec, id) {
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
		  setTodoData(newArr)
    }
	
	 function timerStart(id) {
		const idx = todoData.findIndex((el) => el.id === id)
		const oldTask = todoData[idx]
			// eslint-disable-next-line no-shadow
		const newTask = { ...oldTask, timer: !oldTask.timer }
		const newArr = [ ...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1) ]
		setTodoData(newArr)
	 }

	function timerEnd(id) {
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
			setTodoData(newArr)
	 }

	function changeTimerState(arr) {
		const [ minTens, min, secTens, sec, id ] = arr
		const totalMin = minTens * 10 + min
      const totalSec = secTens * 10 + sec
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
		setTodoData(newArr)
	}

   const doneCount = todoData.filter((el) => el.completed).length
   const todoCount = todoData.length - doneCount

   const visibleItems = filterTask(todoData, filter)

	return (
	<>
		<h1>todos</h1>
		<NewTaskForm onTaskAdded={addTask} />
		<TaskList
			todos={visibleItems}
			onDeleted={deletTask}
			onToggleCompleted={onToggleCompleted}
			onEditTask={editTask}
			onEdiTaskChange={editTaskChange}
			onTaskTimerState={taskTimerState}
			onTimerStart={timerStart}
			onTimerEnd={timerEnd}
			onChangeTimerState={changeTimerState}
		/>
		<Footer
			todoCount={todoCount}
			onClearTask={clearCompletedTask}
			filter={filter}
			onFilterChange={onFilterChange}
		/>
	</>
	)
}

head.render(<App />)