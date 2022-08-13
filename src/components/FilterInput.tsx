import React from "react";
import { useState, useEffect } from "react";

const FilterInput = () => {

    const [filters, setfilters] = useState([{id: 'a', filter: 'spoilers'}]);
	const [filterItem, setfilterItem] = useState('');
	const [error, setError] = useState(false);
	const [duplicates, setDuplicates] = useState(false);
    const [removeLink, setRemoveLink] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault();
		if (filterItem) {
			setError(false);
			let uniqueId =
				new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
			let newfilterItem = {
				id: uniqueId,
				filter: filterItem
			};
			const duplicate = filters.find(filter => filter.filter === filterItem)
			if (duplicate) {
				setDuplicates(true)
				return
			}
			setDuplicates(false)
			setfilters([newfilterItem, ...filters]);
			setfilterItem('');
		} else {
			setError(true);
			setfilterItem('');
		}
	};

	const deletefilter = (id) => {
		let newfilters = filters.filter((filter) => filter.id !== id);
		setfilters([...newfilters]);
	};

    useEffect(() => {
		const filters = JSON.parse(localStorage.getItem('filters') as string);
		if (filters) {
			setfilters(filters);
		}
        const removeLink = JSON.parse(localStorage.getItem('removeLinks') as string);
        if (removeLink) {
            setRemoveLink(removeLink)
        }
	}, []);

    const handleToggle = (e) => {
       if (removeLink === true) {
        setRemoveLink(false)
       }

       else {
        setRemoveLink(true)
       }
    }

    useEffect(() => {
		localStorage.setItem('removeLinks', JSON.stringify(removeLink));
	}, [removeLink]);

	useEffect(() => {
		let adderror = setTimeout(() => {
			setError(false);
		}, 2000);
		return () => {
			clearTimeout(adderror);
		};
	}, [error]);

	useEffect(() => {
		localStorage.setItem('filters', JSON.stringify(filters));
	}, [filters]);

  return (
				<div className="filter-items">
                   <h2>Filter content</h2>
                   <p>Add words that you want hidden from your searches. <br/>
                   <small><a target="_blank" rel="noreferrer" href="https://github.com/cornetespoir/findtags-react/wiki/Filtering-Content">Learn more about this feature</a></small></p>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							value={filterItem}
							className={duplicates ? 'error-message' : ''}
							onChange={(e) => setfilterItem(e.target.value)}
							placeholder="Enter a filter"
						/>
						<button type="submit" className="btn">
							Add filter
						</button>
					</form>
					{duplicates 
						? (
							<p className='error-message'>This word is already being filtered!</p>
						)
						: ''}
			<div className="filter-container flex">
				{filters.map((filterItem) => {
					const { id, filter } = filterItem;
					return (
						<div key={id} className="filter-card">
							
							<p>{filter}</p>
							<button
								onClick={() => deletefilter(id)}><i className="fa fa-times"><span className="sr-text">delete</span></i></button>
						</div>
					);
				})}
			</div>
            <button className={`toggleNote remove-${removeLink}`} onClick={(e) => handleToggle(e)}> <i className="far fa-square"></i> Hide filtered post links</button>
		</div>
	);
};

export default FilterInput;