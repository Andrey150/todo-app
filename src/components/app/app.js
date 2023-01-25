import React, { Component } from "react";
import AppHeader from "../app-header/app-header";
import SearchPanel from "../search-panel/search-panel";
import ItemStatusFilter from "../item-status-filter/item-status-filter";
import TodoList from "../todo-list/todo-list";
import ItemAddForm from "../item-add-form/item-add-form";

import './app.css'

export default class App extends Component{

  maxId = 100;
  state = {
    todoData : [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    important: false,
    done : false,
  }

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    }
  }

  /**
   * @param id = id из todoData
   * Удаляю элемент из списка
   */
  onDeleteItem = ( id ) => {
    this.setState(({todoData}) => {
        //получаю индекс элемента, который хочу удалить,
        //ищу индекс элемента, у которого id такой же как тот id,
        // который получил
      const index = todoData.findIndex((el) => el.id === id)
        //получаю 2 новых массива
        // от нуля до элемента
      const before = todoData.slice(0, index)
        // от элемента, до конца массива
      const after = todoData.slice(index + 1)
        // собираю новый массив из двух полученных,
        // т.к массивы нельзя изменять, только передавать новые
      const newList = [...before, ...after]
      return {
        todoData: newList
      }
    })
  }

  addItem = (text) => {
    //создаем id
    const newItem = this.createTodoItem(text)
    //добавить элемент в массив
    this.setState(({todoData}) => {
      //получаю новый массив, который содержит в себе старый массив + новый item
      const newArr = [
        ...todoData,
        newItem
      ]
      return {
        todoData: newArr
      }
    })
  }

  toggleProps(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id)
    //Обновить объект
    const oldItem = arr[index]
    const newItem = {...oldItem, [propName]: !oldItem[propName]}

    //Создать новый массив и вернуть его
    return newItem
    // return {
    //   ...arr.slice(0, index),
    //   newItem,
    //   ...arr.slice(index + 1)
    // }
  }

  onToggleImportant = (id) => {
    this.setState(({todoData}) => {
      const index = todoData.findIndex((el) => el.id === id)
      //
      // const oldItem = todoData[index];
      // const newItem = {...oldItem, important: !oldItem.important};

      const newArr = [
        ...todoData.slice(0, index),
        this.toggleProps(todoData, id, 'important'),
        ...todoData.slice(index + 1)
      ]
      return {
        todoData: newArr
      }
      // return {
      //   todoData: this.toggleProps(todoData, id, 'important')
      // }
    })
  }

  onToggleDone = (id) => {
    this.setState(({todoData}) => {

      const index = todoData.findIndex((el) => el.id === id)

      // const oldItem = todoData[index];
      // const newItem = {...oldItem, done: !oldItem.done};

      const newArr = [
        ...todoData.slice(0, index),
        this.toggleProps(todoData, id, 'done'),
        ...todoData.slice(index + 1)
      ]
      return {
        todoData: newArr
      }
      // return {
      //   todoData: this.toggleProps(todoData, id, 'done')
      // }


    })
  }

  render () {

    const { todoData } = this.state
    /**
     * Cчитаю количество элементов со значением 'done'
     */
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel />
          <ItemStatusFilter />
        </div>
        <TodoList
          todos={todoData}
          onDelete={this.onDeleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};