import React from 'react'
import './task-filter.css'

class TaskFilter extends React.Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const elements = this.buttons.map(({ name, label }) => {
      const isActive = filter === name
      const clazz = isActive ? 'selected' : ''
      return (
        <li key={name}>
          <button className={clazz} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      )
    })

    return <ul className="filters">{elements}</ul>
  }
}

export default TaskFilter
