import React from 'react'
import './new-task-form.css'

class NewTaskForm extends React.Component {
  //   constructor() {
  //     super()

  // функция для обновления стейта после ввода текста в форму
  onTextChange = (evt) => {
    const { name, value } = evt.target
    this.setState({ [name]: value })
  }

  // функция для создания и добавления такси в такслист из формы
  //  this.onSubmit = (evt) => {
  //    evt.preventDefault()

  //    console.log(evt)
  //    // const { label, min, sec } = this.state
  //    const { value, name } = evt.target
  //    console.log(value, name)

  //    if (value.trim().length !== 0) {
  //      //   this.props.onTaskAdded({ label, min, sec })
  //      this.props.onTaskAdded(value)
  //      //   this.setState({ label: '', min: '', sec: '' })
  //    } else {
  //      alert('A task cannot contain only a space or empty. Please formulate the task in a different way.')
  //    }
  //  }
  //   }

  state = { label: '', min: '', sec: '' }

  render() {
    const { label, min, sec } = this.state
    const { onTaskAdded } = this.props
    return (
      // <form onSubmit={this.onSubmit} className="new-todo-form">
      <form
        onSubmit={(evt) => {
          evt.preventDefault()
          if (label.trim() && min.trim() && sec.trim()) {
            onTaskAdded(this.state)
            this.setState({ label: '', min: '', sec: '' })
          } else {
            alert('Please fill in all fields.')
          }
        }}
        className="new-todo-form"
      >
        <input
          name="label"
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          autoComplete="off"
          onChange={this.onTextChange}
          value={label}
        />
        <input
          name="min"
          type="number"
          className="new-todo-form__timer"
          placeholder="Min"
          autoComplete="off"
          onChange={this.onTextChange}
          value={min}
        />
        <input
          name="sec"
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          autoComplete="off"
          onChange={this.onTextChange}
          value={sec}
          min={0}
          max={60}
        />
        <button type="submit" />
      </form>
    )
  }
}

export default NewTaskForm
