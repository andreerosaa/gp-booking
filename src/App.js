import { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import WeekDays from './models/WeekDays';
import TopBtn from './components/TopBtn';

function App() {
	// Days to be displayed from current to 14 days ahead
	const [displayDates, setDisplayDates] = useState([]);

	const listRef = useRef(null);

	useEffect(() => {
		// Get current Date
		const currentDate = new Date();

		// Compute days list from current Date
		const daysList = [];
		for (var i = 0; i < 15; i++) {
			let newDay = new Date();
			newDay.setDate(currentDate.getDate() + i);
			daysList.push(newDay);
		}

		// Set display dates state with dates list
		setDisplayDates(daysList);
	}, []);

	const handleNavigation = (index) => {
		// Find the corresponding list item based on the index
		const listItem = listRef.current.children[index];

		// Scroll to the list item
		listItem.scrollIntoView({ behavior: 'smooth' });
	};

	return (
		<div className='App'>
			<TopBtn />
			<Header />
			<nav class='navbar navbar-expand-lg bg-body-tertiary'>
				<div className='container-fluid'>
					{displayDates.length > 0 ? (
						displayDates.map((date, index) => {
							const weekDay = date.getDay();
							return (
								<div
									className='col-3'
									key={date.toDateString()}
									onClick={() => handleNavigation(index)}
								>{`${date.getDate()} ${WeekDays[weekDay]}`}</div>
							);
						})
					) : (
						<p>Loading...</p>
					)}
				</div>
			</nav>
			<ul ref={listRef}>
				{displayDates.length > 0 ? (
					displayDates.map((date) => {
						const weekDay = date.getDay();
						return (
							<li key={date.toDateString()}>
								{`${date.getDate()} ${WeekDays[weekDay]}`}
								<p>stuff</p>
							</li>
						);
					})
				) : (
					<p>no</p>
				)}
			</ul>
		</div>
	);
}

export default App;
