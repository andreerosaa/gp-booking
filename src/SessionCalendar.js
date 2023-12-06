import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment);

const SessionCalendar = () => {
	const [sessions, setSessions] = useState([
		{
			id: 1,
			title: 'Available',
			start: new Date(2023, 11, 6, 9, 0, 0),
			end: new Date(2023, 11, 6, 10, 0, 0),
		},
		// Add more session objects as needed
	]);

	const [userBookings, setUserBookings] = useState([]);
	const [selectedSession, setSelectedSession] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [userData, setUserData] = useState({ name: '', phoneNumber: '' });

	const handleBooking = (event) => {
		const clickedSession = sessions.find((session) => session.id === event.id);

		if (clickedSession.title === 'Available') {
			setSelectedSession(clickedSession);
			setModalIsOpen(true);
		}
	};

	const handleModalClose = () => {
		setModalIsOpen(false);
		setUserData({ name: '', phoneNumber: '' });
	};

	const handleReservation = () => {
		// Add logic to handle reservation, e.g., send data to the server
		// Update the session title and add booking to userBookings as before

		// ...

		// Close the modal
		handleModalClose();
	};

	return (
		<div>
			<Calendar
				localizer={localizer}
				events={sessions}
				startAccessor='start'
				endAccessor='end'
				titleAccessor='title'
				onSelectEvent={(event) => handleBooking(event)}
			/>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={handleModalClose}
				contentLabel='Reservation Modal'
			>
				<h2>Reservation Details</h2>
				<p>
					Session: {selectedSession && selectedSession.start.toLocaleString()}
				</p>

				<label>
					Name:
					<input
						type='text'
						value={userData.name}
						onChange={(e) => setUserData({ ...userData, name: e.target.value })}
					/>
				</label>

				<label>
					Phone Number:
					<input
						type='text'
						value={userData.phoneNumber}
						onChange={(e) =>
							setUserData({ ...userData, phoneNumber: e.target.value })
						}
					/>
				</label>

				<button onClick={handleReservation}>Reserve</button>
				<button onClick={handleModalClose}>Cancel</button>
			</Modal>
		</div>
	);
};

export default SessionCalendar;
