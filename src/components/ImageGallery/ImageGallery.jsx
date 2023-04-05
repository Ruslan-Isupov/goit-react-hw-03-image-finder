import PropTypes from 'prop-types';
import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';
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
    const { nameQuery, images, incrementPage, loader, totalHits } = this.props;
    const { error, showModal } = this.state;
    const showButton = images.length > 1 && totalHits > images.length;
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
        {loader && (
          <Blocks
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperClass={css.blocksWrapper}
          />
        )}
        {showButton && (
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
  loader: PropTypes.bool.isRequired,
  nameQuery: PropTypes.string.isRequired,
  incrementPage: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalHits: PropTypes.number.isRequired,
};
