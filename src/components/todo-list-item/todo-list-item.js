import React, {Component} from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component{
  constructor() {
    super();

    // //Для того, чтобы this не терялся,
    // // нужно создать функцию-стрелку внутри конструктора
    // this.onLabelClick = () => {
    //   this.setState(({done}) => {
    //     return ({done: !done})
    //   })
    // }
    // this.onMarkImportant = () => {
    //   //В некоторых случаях setState может работать асинхронно,
    //   // делается это реактом для оптимизации
    //   // чтобы это исправить, нужно передавать в setState функцию,
    //   // которая пинимает в себя state, тогда функция вызовется, когда state
    //   // будет в финальном состоянии, применять такую запись нужно,
    //   // если текущее состояние зависит от предыдущего
    //   this.setState(({important}) => {
    //     return {
    //       important: ! important
    //     }
    //   })
    // }
  }

  render() {
    const { label,
      onDelete,
      onToggleImportant,
      onToggleDone,
      important,
      done } = this.props

    let className = 'todo-list-item';
    if ( done ) {
      className += ' done'
    }
    if ( important ) {
      className += ' important'
    }

    return (
      <div className={className}
      >
        <div
          className="todo-list-item-label"
          onClick={ onToggleDone }
        >
          {label}
        </div>

      <div className="btns">
        <button type="button"
                onClick={ onToggleImportant }
                className="btn btn-outline-success btn-sm float-right">
        <i className="fa fa-exclamation"/>
      </button>

      <button
        type="button"
        className="btn btn-outline-danger btn-sm float-right"
        onClick={onDelete}
      >
        <i className="fa fa-trash-fill">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"            fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
            </svg>
        </i>
      </button>
      </div>
    </div>
    );
  }
}