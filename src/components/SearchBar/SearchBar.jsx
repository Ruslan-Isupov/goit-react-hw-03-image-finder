import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './SearchBar.module.css';
import { BiSearchAlt2 } from 'react-icons/bi';
export class SearchBar extends Component {
  state = {
    query: '',
  };
  getValue = e => {
    const inputValue = e.target.value;
    this.setState({ query: inputValue });
  };
  saveNameQuery = e => {
    e.preventDefault();
    if (this.state.query.trim() === '') {
      alert('Field is empty!');
      return;
    }
    this.props.onSaveNameQuery(this.state.query);
    this.resetForm();
  };
  resetForm = () => {
    this.setState({ query: '' });
  };
  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.formBar} onSubmit={this.saveNameQuery}>
          <button type="submit" className={css.buttonBar}>
            <span className="button-label">
              <BiSearchAlt2 />
            </span>
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.getValue}
            required
          />
        </form>
      </header>
    );
  }
}
SearchBar.propTypes = {
  onSaveNameQuery: PropTypes.func.isRequired,
};
