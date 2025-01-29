import React from 'react'
import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()

    // функция для обновления стейта после ввода текста в форму
    this.onTextChange = (evt) => {
      this.setState({ label: evt.target.value })
    }

    // функция для создания и добавления такси в такслист из формы
    this.onSubmit = (evt) => {
      evt.preventDefault()
      if (this.state.label.length !== 0) {
        this.props.onTaskAdded(this.state.label)
      } else {
        // eslint-disable-next-line no-alert
        alert('Empty task! Try again.')
      }
      this.setState({ label: '' })
    }
  }

  state = { label: '' }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onTextChange}
          value={this.state.label}
        />
      </form>
    )
  }
}
