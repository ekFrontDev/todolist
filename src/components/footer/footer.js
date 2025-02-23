import React from 'react'

import './footer.css'

import TaskFilter from '../task-filter'

export default function Footer({ todoCount, onClearTask, filter, onFilterChange }) {
  return (
    <foter className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearTask}>
        Clear completed
      </button>
    </foter>
  )
}
