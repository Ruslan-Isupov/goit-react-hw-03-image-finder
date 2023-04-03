import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  state = {
    modalImg: '',
  };

  openModal = id => {
    this.setState({ showModal: true });
    const largeImageUrl = this.state.images.find(
      image => image.id === id
    ).largeImageURL;
    return this.setState({ modalImg: largeImageUrl });
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModalEscape);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModalEscape);
  }
  closeModalEscape = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  closeModalBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { modalImg } = this.props;
    return (
      <div className={css.overlay} onClick={this.closeModalBackdrop}>
        <div className={css.modal}>
          <img src={modalImg} alt="" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  modalImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
