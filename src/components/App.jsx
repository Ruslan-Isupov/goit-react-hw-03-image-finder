import { Component } from 'react';
import { getFetchSearch } from 'API/api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import css from './common.module.css';
import Notiflix from 'notiflix';

export class App extends Component {
  state = {
    images: [],
    numberPage: 1,
    nameQuery: '',
    loader: false,
    totalHits: 0,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.nameQuery;
    const nextName = this.state.nameQuery;

    if (prevName !== nextName) {
      this.incrementPage(nextName);
    }
  }

  incrementPage = nameQuery => {
    this.setState({ loader: true });
    const { numberPage } = this.state;
    return getFetchSearch(nameQuery, numberPage)
      .then(listOfImages =>
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...listOfImages.hits],
            numberPage: prevState.numberPage + 1,
            totalHits: listOfImages.totalHits,
          };
        })
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loader: false }));
  };
  saveNameQuery = nameQuery => {
   
    return this.setState(prevState => {
      if (prevState.nameQuery === nameQuery ) {
        return Notiflix.Notify.failure('Same  name of query.Try again!');
      }
   else {
        return { nameQuery: nameQuery, images: [], numberPage: 1 };
      }
    });
  };

  render() {
    const { nameQuery, images, loader, totalHits } = this.state;
    return (
      <>
        <SearchBar onSaveNameQuery={this.saveNameQuery} />
        <div className={css.container}>
          <ImageGallery
            images={images}
            incrementPage={this.incrementPage}
            nameQuery={nameQuery}
            loader={loader}
            totalHits={totalHits}
          />
        </div>
      </>
    );
  }
}
