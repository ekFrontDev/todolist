/* eslint-disable no-unused-vars */
import React from 'react'
import { formatDistance, format, formatISO9075 } from 'date-fns'
import './task.css'

class Task extends React.Component {
  constructor() {
    super()

    // функция
    this.onTextChange = (evt) => {
      this.setState({ label: evt.target.value })
    }

    // функция
    this.onEditing = (evt) => {
      evt.preventDefault()
      const { onEditTaskChange, id } = this.props
      const text = this.state.label
      onEditTaskChange(id, text)
      this.setState({ label: '' })
    }

    this.taskTimerPlay = () => {
      const { id, minuteTens, minute, secondTens, second, onTimerEnd, onChangeTimerState } = this.props
      const totalSeconds = (minuteTens * 10 + minute) * 60 + (secondTens * 10 + second)
      const end = Date.now() + totalSeconds * 1000
      this.interval = setInterval(() => {
        const now = Date.now()
        const delta = end - now
        if (delta <= 0) {
          clearInterval(this.interval)
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
    }

    this.timerStart = () => {
      const { id, timer, onTimerStart } = this.props
      if (timer) {
        return
      }
      onTimerStart(id)
      this.taskTimerPlay()
    }

    this.timerPause = () => {
      const { id, onTimerStart } = this.props
      clearInterval(this.interval)
      onTimerStart(id)
    }
  }

  componentDidMount() {
    this.props.onTaskTimerState(this.props.minuteForTask, this.props.secondsForTask, this.props.id)
  }

  //   componentDidUpdate(prevProps) {
  //     const { id, onTimerStart } = this.props
  //     if (prevProps.timer !== this.props.timer) {
  //       // this.props.onTaskTimerState(this.props.minuteForTask, this.props.secondsForTask, this.props.id)
  //       onTimerStart(id)
  //     }
  //   }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  interval = null

  state = { label: '', minTens: '', min: '', secTens: '', sec: '' }

  render() {
    // eslint-disable-next-line prettier/prettier
    const {nameTask,
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
    } = this.props

    const { minTens, min, secTens, sec } = this.state

    let classNames = ''

    const time = formatDistance(date, new Date(), { includeSeconds: true })

    if (completed) {
      classNames += ' completed'
    }

    if (editing) {
      classNames += ' editing'
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
              <button className="icon icon-play" onClick={this.timerStart}></button>
              <button className="icon icon-pause" onClick={this.timerPause}></button>
              {minuteTens}
              {minute}:{secondTens}
              {second}
            </span>
            <span className="created">created {time} ago</span>
          </label>
          <button className="icon icon-edit" onClick={onEditTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        <form onSubmit={this.onEditing.bind(this)}>
          <input className="edit" placeholder={nameTask} type="text" autoFocus onChange={this.onTextChange} />
        </form>
      </li>
    )
  }
}

export default Task
