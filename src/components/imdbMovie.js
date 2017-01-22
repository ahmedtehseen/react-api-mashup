import React from 'react';

const ImdbMovie = ({movie}) => {
	if(!movie){
		return(
			<div>Loading...</div>
		);
	}

	const title= movie.Title;
	const released= movie.Released;
	const discription= movie.Plot;
	const imageSrc= movie.Poster;
	const director= movie.Director;

	return(
	<div className="row">
		<div className="media">
			<div className="media-left">
				<img className="media-object" src={imageSrc} alt={title} />
			</div>
			<div className="media-body movie-details">
				<h2 className="media-heading"><b>Title:</b> {title}</h2>
				<p><b>Director: </b>{director}</p>
				<p><b>Release Date:</b> {released}</p>
				<p><b>Discription: </b>{discription}</p>
			</div>
		</div>
	</div>
	);
};


export default ImdbMovie;