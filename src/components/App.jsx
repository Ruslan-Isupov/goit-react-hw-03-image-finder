import { Component } from 'react';
import { Blocks } from 'react-loader-spinner';
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
  };
  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.nameQuery;
    const nextName = this.state.nameQuery;

    if (prevName !== nextName) {
      this.incrementPage(nextName);
    }
    // else if (prevName === nextName && prevState.images.length<=0)
    //   {
    //  return alert("Same  name of query.Try again!")
      
    // }
    // else {return}
  }
  incrementPage = nameQuery => {
    this.setState({ loader: true });
    const { numberPage} = this.state;
return getFetchSearch(nameQuery, numberPage)
      .then(listOfImages =>
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...listOfImages],
            numberPage: prevState.numberPage + 1,
          };
        })
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loader: false }));
  };
  saveNameQuery = (nameQuery) => {
    
    return this.setState((prevState) => {
      if (prevState.nameQuery === nameQuery) { return Notiflix.Notify.failure('Same  name of query.Try again!'); }
    else { return { nameQuery: nameQuery, images: [], numberPage: 1 } }
      }
    );

  };

  render() {
    const { nameQuery, images, loader } = this.state;

    return (
      <>
        <SearchBar onSaveNameQuery={this.saveNameQuery} />
        <div className={css.container}>
          {loader && (
            <Blocks
              visible={true}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperClass={css.blocksWrapper}
            />
          )}

          <ImageGallery
            images={images}
            incrementPage={this.incrementPage}
            nameQuery={nameQuery}
          />
        </div>
      </>
    );
  }
}
