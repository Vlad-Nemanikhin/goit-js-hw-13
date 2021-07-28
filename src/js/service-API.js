import axios from 'axios';
export default class ApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
	}

	async fetchImages() {
		try {
			const url = `https://pixabay.com/api/?key=22618153-8524b8eed44fdb0c9dc65d80e&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&lang=en&lang=ru&per_page=40&page=${this.page}`;
			const res = await axios.get(url);
			console.log(res)
			return res;
		}
		catch {
			if (!res.ok) {
				throw new Error(res.status);
			}
		}
		// return fetch(url)
			//.then(response => {
				//if (!response.ok) {
				//	throw new Error(response.status);
			//	}
			//	return response.json();
			//})
		}

	incrementPage() {
		this.page += 1;
	}

	resetPage() {
		this.page = 1;
	}
	
	get query() {
		return this.searchQuery;
	}

	set query(newQuery) {
		this.searchQuery = newQuery;
	}
}

