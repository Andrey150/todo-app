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
    term: '',
    filter: 'all' //active / all / done
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

  /**
   *
   * @param term - значение из input, котореое буду искать
   */

  onSerachChange = (term) => {
    this.setState({ term })
  }

  /**
   *
   * @param filter - значение кнопки
   */
  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  /**
   *
   * @param items - массив элементов
   * @param filter - может быть all, active, done
   */
  filterItems(items, filter) {
    switch(filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((el) => !el.done)
      case 'done':
        return items.filter((el) => el.done)
      default:
        return items
    }
  }

  /**
   *
   * @param items - массив элементов
   * @param term - текст, который будет искаться в массивве
   * @returns {*} - весь массив или элементы, которые содержат искомое значение
   */
  search = (items, term) => {
    if (term.length === 0) {
      return items
    }
    return items.filter((el) => {
      // Вернет элементы, которые содержат искомое значение
      // Привожу строку поиска и данные в массиве в нижний регистр
      return el.label
        .toLowerCase()
        .indexOf(term.toLowerCase()) > -1
    })
  }


  render () {
    const { todoData, term, filter } = this.state
    /**
     * Cчитаю количество элементов со значением 'done'
     */
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    /**
     * Фильтрация элементов по названию и свойству filter
     */
    const visibleElements = this.filterItems(
      this.search(todoData, term), filter)

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSerachChange={this.onSerachChange}
          />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleElements}
        />
        <ItemAddForm onItemAdded={this.addItem}/>
      </div>
    );
  }
};