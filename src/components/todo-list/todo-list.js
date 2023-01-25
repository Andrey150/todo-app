import React from "react";
import  TodoListItem from '../todo-list-item/todo-list-item'

import './todo-list.css'

const TodoList = ({ todos, onDelete, onToggleImportant, onToggleDone }) => {
  const elements = todos.map((item) => {

    // с помощью рест параметров, можно добавить параметр,
    // в который войдут все остальные свойства
    // и в дальнейшем обращатсья уже к нему
    const {id, ...itemProps} = item

    return (
      <li key={id} className='list-group-item'>
        <TodoListItem
          onDelete={() => onDelete(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          // спред опертор берет каждое свойство из объекта item
          // и передает его в качесте атрибута вместе со значением
          { ...itemProps }
        />
      </li>
    )
  })

  return (
    <ul className='list-group todo-list'>
      {elements}
    </ul>
  )
}

export default TodoList;