/* eslint-disable no-unused-vars */
import React from 'react'
import { formatDistance } from 'date-fns'
import './task.css'

export default class Task extends React.Component {
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
  }

  state = { label: '' }

  render() {
    const { nameTask, onDeleted, onToggleCompleted, completed, date, editing, onEditTask, onEditTaskChange, id } =
      this.props

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
