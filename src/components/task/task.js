/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { formatDistance, format, formatISO9075 } from 'date-fns'
import './task.css'

// eslint-disable-next-line object-curly-newline
export default function Task({
  nameTask,
  onDeleted,
  onToggleCompleted,
  completed,
  date,
  editing,
  onEditTask,
  onEditTaskChange,
  onTaskTimerState,
  onTimerStart,
  onTimerEnd,
  onChangeTimerState,
  id,
  minuteForTask,
  secondsForTask,
  minuteTens,
  minute,
  secondTens,
  second,
  timer,
  // eslint-disable-next-line object-curly-newline
}) {
  const [label, setLabel] = useState('')
  const [intervalID, setInrevalID] = useState(null)

  useEffect(() => {
    onTaskTimerState(minuteForTask, secondsForTask, id)
    return () => clearInterval(intervalID)
  }, [intervalID])

  let classNames = ''

  const time = formatDistance(date, new Date(), { includeSeconds: true })

  if (completed) {
    classNames += ' completed'
  }

  if (editing) {
    classNames += ' editing'
  }

  function onTextChange(evt) {
    setLabel(evt.target.value)
  }

  function onEditing(evt) {
    evt.preventDefault()
    onEditTaskChange(id, label)
    setLabel('')
  }

  function taskTimerPlay() {
    const totalSeconds = (minuteTens * 10 + minute) * 60 + (secondTens * 10 + second)
    const end = Date.now() + totalSeconds * 1000

    const interval = setInterval(() => {
      console.log('setInterval')
      const now = Date.now()
      const delta = end - now
      if (delta <= 0) {
        clearInterval(interval)
        onTimerEnd(id)
        return
      }
      // eslint-disable-next-line object-curly-newline
      const minTens = Math.floor(delta / 1000 / 60 / 10)
      const min = Math.floor((delta / 1000 / 60) % 10)
      const secTens = Math.floor((delta % 60000) / 10000)
      const sec = Math.floor(((delta % 60000) / 1000) % 10)

      const newArr = [minTens, min, secTens, sec, id]
      // eslint-disable-next-line object-curly-newline
      onChangeTimerState(newArr)
    }, 500)
    setInrevalID(interval)
  }

  function timerStart() {
    if (timer) {
      return
    }
    onTimerStart(id)
    taskTimerPlay()
  }

  function timerPause() {
    console.log('timerPause')
    clearInterval(intervalID)
    onTimerStart(id)
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onToggleCompleted} />
        <label>
          <span className="description" onClick={onToggleCompleted}>
            {nameTask}
          </span>
          <span className="description span-data">
            <button className="icon icon-play" onClick={timerStart}></button>
            <button className="icon icon-pause" onClick={timerPause}></button>
            {minuteTens}
            {minute}:{secondTens}
            {second}
          </span>
          <span className="created">created {time} ago</span>
        </label>
        <button className="icon icon-edit" onClick={onEditTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onEditing}>
        <input className="edit" placeholder={nameTask} type="text" autoFocus onChange={onTextChange} />
      </form>
    </li>
  )
}
