import React, {Component} from 'react';

import './search-panel.css';

export default class SearchPanel extends Component{
  state = {
    term: '',
  }

  /**
   * Нужна функция-стрелка, т.к передаем как event listener,
   * поэтому нужно следить за this
   */
  onSerachChangeInput = (e) => {
    // Текущее значение input
    const term = e.target.value;
    // Передать в state значение из term
    this.setState({term});
    // Вызываю event listener, который передал App
    this.props.onSerachChange(term)
  }

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={this.state.term}
        onChange={this.onSerachChangeInput}
      />
    );
  }
}