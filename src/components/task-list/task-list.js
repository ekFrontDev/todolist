import React from 'react'

import './task-list.css'
// eslint-disable-next-line import/named
import { Task } from '../task/task'

const TaskList = ({ todos, onDeleted, onToggleCompleted, onEditTask, onEdiTaskChange }) => {
  const elements = todos.map((item) => {
    const { id, completed, date, editing, ...itemProps } = item

    return (
      <Task
        nameTask={itemProps.nameTask}
        completed={completed}
        date={date}
        editing={editing}
        key={id}
        id={id}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onEditTask={() => onEditTask(id)}
        onEditTaskChange={onEdiTaskChange}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
export default TaskList
