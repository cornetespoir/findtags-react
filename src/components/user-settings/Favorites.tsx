import React from "react";
import { useState, useEffect } from "react";

const Favorites = ({ stateChanger, setLoading }) => {

	const [favorites, setfavorites] = useState([{ id: '', filter: 'example tag' }]);
	const [filterItem, setfilterItem] = useState('');
	const [duplicates, setDuplicates] = useState(false);


	const handleSubmit = (e) => {
		e.preventDefault();
		if (filterItem) {
			let uniqueId =
				new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
			let newfilterItem = {
				id: uniqueId,
				filter: filterItem
			};
			const duplicate = favorites.find(filter => filter.filter === filterItem)
			if (duplicate) {
				setDuplicates(true)
				return
			}
			setDuplicates(false)
			setfavorites([newfilterItem, ...favorites]);
			setfilterItem('');
		}
	};

	const handleTag = (filter, e) => {
		e.preventDefault()
		setLoading('loading')
		window.scroll({ top: 0, left: 0, behavior: "auto" });
		(document.getElementById("query-setter") as HTMLInputElement).value = filter;
		stateChanger(filter)

	}

	const deletefilter = (id) => {
		let newfavorites = favorites.filter((filter) => filter.id !== id);
		setfavorites([...newfavorites]);
	};

	useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') as string);
		if (favorites) {
			setfavorites(favorites);
		}
	}, []);


	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites));
	}, [favorites]);

	return (
		<div className="filter-items">
			<h2>Favorite tags</h2>
			<p>Quick search your favorite tags</p>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={filterItem}
					className={duplicates ? 'error-message' : ''}
					onChange={(e) => setfilterItem(e.target.value)}
					placeholder="Enter a favorite tag"
				/>
				<button type="submit" className="btn">
					Add Tag
				</button>
			</form>
			{duplicates
				? (
					<p className='error-message'>This tag is already saved!</p>
				)
				: ''}
			<div className="filter-container flex">
				{favorites.map((filterItem) => {
					const { id, filter } = filterItem;
					return (
						<div key={id} className="filter-card">
							<button onClick={(e) => handleTag(filter, e)} className='favorites'>{filter}</button>
							<button
								onClick={() => deletefilter(id)}><i className="fa fa-times"><span className="sr-text">delete</span></i></button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export { Favorites };