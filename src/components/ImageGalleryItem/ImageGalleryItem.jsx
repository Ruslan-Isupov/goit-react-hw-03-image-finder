import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
export const ImageGalleryItem = ({ openModal, smallImg, tags }) => {
  return (
    <li className={css.galleryItem} onClick={openModal}>
      <img src={smallImg} alt={tags} />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  };
