import PropTypes from 'prop-types';
import { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { Button } from 'components/Button/Button';
import css from './ImageGallery.module.css';

export class ImageGallery extends Component {
  state = {
    error: null,
    showModal: false,
    modalImg: '',
  };

  openModal = id => {
    this.setState({ showModal: true });
    const largeImageUrl = this.props.images.find(
      image => image.id === id
    ).largeImageURL;
    return this.setState({ modalImg: largeImageUrl });
  };
  toggleModal = () => {
    this.setState(prevState => {
      return { showModal: !prevState.showModal };
    });
  };

  render() {
    const { nameQuery, images, incrementPage } = this.props;
    const {  error, showModal } = this.state;
    return (
      <>
        {error && <h1>{error.message}</h1>}
        <ul className={css.gallery}>
          {images.map(image => {
            return (
              <ImageGalleryItem
                openModal={() => {
                  this.openModal(image.id);
                }}
                key={image.id}
                smallImg={image.webformatURL}
                tags={image.tags}
              />
            );
          })}
        </ul>

        {images.length > 0 && images.length <= 500 && (
          <Button incrementPage={incrementPage} nameQuery={nameQuery} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal} modalImg={this.state.modalImg} />
        )}
      </>
    );
  }
}
ImageGallery.propTypes = {
  nameQuery: PropTypes.string.isRequired,
  incrementPage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
