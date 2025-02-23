/* eslint-disable object-curly-newline */
import React from 'react'

import './task-list.css'
// eslint-disable-next-line import/named
import Task from '../task/task'

export default function TaskList({
  todos,
  onDeleted,
  onToggleCompleted,
  onEditTask,
  onEdiTaskChange,
  onTaskTimerState,
  onTimerStart,
  onTimerEnd,
  onChangeTimerState,
}) {
  const elements = todos.map((item) => {
    // eslint-disable-next-line prettier/prettier
    const {id,
      completed,
      date,
      editing,
      minuteForTask,
      seconds,
      minuteTens,
      minute,
      secondTens,
      second,
      timer,
      // eslint-disable-next-line prettier/prettier
      ...itemProps} = item

    return (
      <Task
        nameTask={itemProps.nameTask}
        completed={completed}
        date={date}
        editing={editing}
        key={id}
        id={id}
        minuteForTask={minuteForTask}
        secondsForTask={seconds}
        minuteTens={minuteTens}
        minute={minute}
        secondTens={secondTens}
        second={second}
        timer={timer}
        onDeleted={() => onDeleted(id)}
        onToggleCompleted={() => onToggleCompleted(id)}
        onEditTask={() => onEditTask(id)}
        onEditTaskChange={onEdiTaskChange}
        onTaskTimerState={onTaskTimerState}
        onTimerStart={() => onTimerStart(id)}
        onTimerEnd={onTimerEnd}
        onChangeTimerState={onChangeTimerState}
      />
    )
  })
  return <ul className="todo-list">{elements}</ul>
}
