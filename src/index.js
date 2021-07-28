import ApiService from './js/service-API';
import ImageSource from './js/imageSource';
import grid from './tmp/grid.hbs'
import SimpleLightbox from "simplelightbox";
import axios from 'axios';
import Notiflix from "notiflix";
import './sass/main.scss';
import { func } from 'assert-plus';

const imagesApiService = new ApiService();
const imageSource = new ImageSource();

const refs = {
	searchForm: document.querySelector('#search-form'),
	gallery: document.querySelector('.gallery'),
	btnLoadMore: document.querySelector('.load-more'),
	backdrop: document.querySelector('.backdrop'),
	close: document.querySelector('.close-btn'),
	left: document.querySelector('.switch__btn--left'),
	right: document.querySelector('.switch__btn--right')
};


refs.searchForm.addEventListener('submit',  onSubmitFetchImages);
refs.btnLoadMore.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onClickOpenImageCard);
refs.close.addEventListener('click', onClickCloseImageCard);


refs.btnLoadMore.classList.add('js-btn-hidden');

function onSubmitFetchImages(e) {
e.preventDefault();
	imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();
	
		imagesApiService.resetPage();

		
		imagesApiService.fetchImages().then(res => {
		imagesApiService.incrementPage();
			clearContainer();
			
			renderImagesGrid(res.data);

			if (res.data.totalHits === 0) {
				Notiflix.Notify.failure('could not enter the correct name');
				} else{
				Notiflix.Notify.success(`Yeah, we found ${res.data.totalHits} images.`);
				}
			
	})
			.catch(error => { console.dir(error); });
	
}


function renderImagesGrid(data) {
	const { webformatURL, largeImageURL, tags, likes, views, comments, downloads, ...rest } = data.hits;

	const markupImagesGrid = data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
	return grid({ webformatURL, largeImageURL, tags, likes, views, comments, downloads })
	}).join('');
	
	refs.gallery.insertAdjacentHTML('beforeend', markupImagesGrid);

	refs.btnLoadMore.classList.remove('js-btn-hidden');

}


function onLoadMore(e) {
	imagesApiService.fetchImages().then(res => {
		imagesApiService.incrementPage();
		renderImagesGrid(res.data);
		console.log(res.data)
		console.log(imagesApiService.page)
		if (res.data.totalHits / (imagesApiService.page - 1) < 40) {
			Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
			e.target.classList.add('js-btn-hidden');
		}
	})
		.catch(error => { console.dir(error);});
	
	}

function clearContainer() {
	refs.gallery.innerHTML = '';
}

function onClickOpenImageCard(e) {
	imageSource.imgSource = e.target.src;
	const largeImg = e.target.closest('.grid-item').dataset.source;
	const imgContainer = refs.backdrop.querySelector('.imgContainer');
	
	if (!e.target.classList.contains('img')) {
   	return
	}

	refs.backdrop.classList.remove('is-hidden');

	imgContainer.innerHTML = '';
	
	e.target.src = largeImg;
		
	imgContainer.insertAdjacentElement('beforeend', e.target);

}	

function onClickCloseImageCard(e) {
	refs.backdrop.classList.add('is-hidden');
	}




