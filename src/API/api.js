import Notiflix from 'notiflix';
const KEY = '34886676-216aa5272081537bbb6585f7b';

export function getFetchSearch(nameQuery, numberPage) {
  return fetch(
    ` https://pixabay.com/api/?q=${nameQuery}&page=${numberPage.toString()}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Images with this name ${nameQuery} don't exist.Try again!`)
      );
    })
    .then(images => {
      if (images.totalHits === 0) {
        Notiflix.Notify.failure('We do not have coresponding images!');
      }
      return images;
    });
}
