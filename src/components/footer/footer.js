import React from 'react'

import './footer.css'

import TaskFilter from '../task-filter'

export default class Footer extends React.Component {
  render() {
    const { todoCount, onClearTask, filter, onFilterChange } = this.props

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
}
