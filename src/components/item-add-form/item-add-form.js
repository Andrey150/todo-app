import React, {Component} from 'react';

import './item-add-form.css'

export default class ItemAddForm extends Component {

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    //Записываю в state значение, которое получаю в input
    this.setState({
      label: e.target.value
    })
  }

  /**
   * Позволяет добавлять задание с помощью enter и кнопки
   */
  onSubmit = (e) => {
    // Отменить стандартное поведение для onSubmit
    e.preventDefault()
    // Проверить label на наличие букв или цифр
    if  (this.state.label.match(/[A-Za-zА-Яа-яЁё0-9]/)) {
      // Меняю состояние label
      this.props.onItemAdded(this.state.label)
    }
    this.setState({
      label: ''
    })
  }

  render() {
    // const { addItem } = this.props
    return (
      <form className='item-add-form d-flex'
        onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          onChange={this.onLabelChange}
          placeholder="Что нужно сделать"
          //Делаю элемент контролируемым
          value={this.state.label}
        />
        <button className='btn btn-outline-secondary'>
          Добавить элемент
        </button>
      </form>
    )
  }
}