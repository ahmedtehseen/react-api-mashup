import _ from 'lodash';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';
import ImdbMovie from './components/imdbMovie';
import axios from 'axios';

const API_KEY= 'AIzaSyBI8U3f_eRqAKGRUfUeZHFHEfSinMi3Igw';


class App extends Component {
	constructor(props){
		super(props);
		this.state={
			videos:[],
			selectedVideo:null,
			movie:{}
		};

		this.videoSearch('Transformers trailor');
		this.getMovie('Transformers');
	}

	videoSearch(term){
		YTSearch({key: API_KEY, term:term+" trailor"},(videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0] 
			});
		});
	}

	getMovie(term){
		const ROOT_URL= 'http://www.omdbapi.com/?r=json&t=';
		const movieTerm = term;
		const movie = axios.get(`${ROOT_URL}${movieTerm}`);
		movie.then(movie => {this.setState({movie:movie.data})})
	}


	render(){
		const videoSearch= _.debounce((term)=>{this.videoSearch(term)},300);
		const MovieSearch= _.debounce((term)=>{this.getMovie(term)},600);
		return (
			<div>
				<SearchBar onSearchTermChange={videoSearch} getMovie={MovieSearch}/>
				<div className="row">
					<VideoDetail video={this.state.selectedVideo}/>
					<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos}/>
				</div>
				<ImdbMovie movie={this.state.movie}/>
			</div>
		);
	}
}

ReactDOM.render(<App/>,document.querySelector('.container'));