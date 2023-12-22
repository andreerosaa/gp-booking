// import SessionCalendar from './components/SessionCalendar';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import WeekDays from './models/WeekDays';

function App() {
	// Days to be displayed from current to 14 dayes ahead
	const [displayDates, setDisplayDates] = useState([]);

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

	return (
		<div className='App'>
			<Header />
			{/* <SessionCalendar /> */}
			{displayDates.length > 0 ? (
				displayDates.map((date) => {
					const weekDay = date.getDay();
					return <li key={date.toDateString()}>{`${date.getDate()} ${WeekDays[weekDay]}`}</li>;
				})
			) : (
				<p>no</p>
			)}
		</div>
	);
}

export default App;
