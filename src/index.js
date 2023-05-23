import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36673095-e5e2632949512909003f8c0e7';
const simpleLightboxGallery = new SimpleLightbox('.gallery a');
const observerOptions = {
  root: null,
  rootMargin: '450px',
  threshold: 1.0,
};
let observer = new IntersectionObserver(observerCallback, observerOptions);
let queryToFetch = '';
let currentPage = 0;
let totalImgs;
const perPage = 40;

refs.form.addEventListener('submit', onSearchFormSbmt);

async function onSearchFormSbmt(evt) {
  evt.preventDefault();
  window.scroll({ top: 0 });

  const { searchQuery } = evt.currentTarget.elements;
  queryToFetch = getQuery(searchQuery.value);
  currentPage = 1;

  const response = await fetchImages(queryToFetch, currentPage);
  const { hits, totalHits } = response.data;
  totalImgs = totalHits;

  if (!hits.length) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.gallery.innerHTML = '';
    observer.unobserve(refs.target);
    return;
  }

  Notify.success(`Hooray! We found ${totalHits} images.`);
  refs.gallery.innerHTML = createMarkup(hits).join('');
  simpleLightboxGallery.refresh();

  if (currentPage * perPage >= totalHits) {
    return;
  }

  observer.observe(refs.target);
}

async function fetchImages(q, page) {
  const searchParams = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  });

  const response = await axios.get(`${URL}?${searchParams}`);
  return response;
}

function getQuery(string) {
  return string.trim().toLowerCase().split(' ').join('+');
}

function createMarkup(pictures) {
  const markup = pictures.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => {
      return `<a href="${largeImageURL}">
        <div class="photo-card">
          <img src="${webformatURL}" alt="${tags}" width="350px" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes: </b>${likes}
            </p>
            <p class="info-item">
              <b>Views: </b>${views}
            </p>
            <p class="info-item">
              <b>Comments: </b>${comments}
            </p>
            <p class="info-item">
              <b>Downloads: </b>${downloads}
            </p>
          </div>
        </div>
      </a>`;
    }
  );

  return markup;
}

async function observerCallback(evt) {
  if (!evt[0].isIntersecting) {
    return;
  }

  if (currentPage * perPage >= totalImgs) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    observer.unobserve(refs.target);
    return;
  }

  currentPage += 1;
  const response = await fetchImages(queryToFetch, currentPage);
  const { hits, totalHits } = response.data;
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup(hits).join(''));
  simpleLightboxGallery.refresh();
}
