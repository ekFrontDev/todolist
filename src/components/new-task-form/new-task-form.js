import React, { useState } from 'react'
import './new-task-form.css'

export default function NewTaskForm({ onTaskAdded }) {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  function onTextChange(evt) {
    const { name, value } = evt.target
    if (name === 'label') {
      setLabel(value)
    } else if (name === 'min') {
      setMin(value)
    } else if (name === 'sec') {
      setSec(value)
    }
  }

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault()
        if (label.trim() && min.trim() && sec.trim()) {
          const obj = { label, min, sec }
          onTaskAdded(obj)
          setLabel('')
          setMin('')
          setSec('')
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
        onChange={onTextChange}
        value={label}
      />
      <input
        name="min"
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        autoComplete="off"
        onChange={onTextChange}
        value={min}
      />
      <input
        name="sec"
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        autoComplete="off"
        onChange={onTextChange}
        value={sec}
        min={0}
        max={60}
      />
      <button type="submit" />
    </form>
  )
}
