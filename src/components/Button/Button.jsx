import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Button.module.css';
export class Button extends Component {
  loadNextPage = () => {
    this.props.incrementPage(this.props.nameQuery);
  };
  render() {
    return (
      <button
        type="button"
        className={css.buttonPagination}
        onClick={this.loadNextPage}
      >
        Load more
      </button>
    );
  }
}
Button.propTypes = {
  nameQuery: PropTypes.string.isRequired,
  incrementPage: PropTypes.func.isRequired,
};
