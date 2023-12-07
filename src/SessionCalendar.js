import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';

const today = new Date();

const localizer = momentLocalizer(moment);

const SessionCalendar = () => {
	const [userBookings, setUserBookings] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [selectedSession, setSelectedSession] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [userData, setUserData] = useState({ name: '', phoneNumber: '' });

	// Function to generate recurring sessions
	const generateRecurringSessions = () => {
		const recurringSessions = [];
		const startTime = moment().set({
			hour: 8,
			minute: 40,
			second: 0,
			millisecond: 0,
		});
		const lunchStartTime = moment().set({
			hour: 12,
			minute: 0,
			second: 0,
			millisecond: 0,
		});
		const lunchEndTime = moment().set({
			hour: 13,
			minute: 0,
			second: 0,
			millisecond: 0,
		});

		while (startTime.isBefore(lunchStartTime)) {
			const endTime = startTime.clone().add(1, 'hour');

			recurringSessions.push({
				id: recurringSessions.length + 1,
				title: 'Available',
				start: startTime.toDate(),
				end: endTime.toDate(),
			});

			startTime.add(70, 'minutes');
		}

		// Restart logic at 13:00
		startTime.set({ hour: 13, minute: 0 });

		while (startTime.isBefore(lunchStartTime)) {
			const endTime = startTime.clone().add(1, 'hour');

			recurringSessions.push({
				id: recurringSessions.length + 1,
				title: 'Available',
				start: startTime.toDate(),
				end: endTime.toDate(),
			});

			startTime.add(10, 'minutes');
		}

		setSessions(recurringSessions);
	};

	useEffect(() => {
		generateRecurringSessions();
	}, []);

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
				min={
					new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8)
				}
				max={
					new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20)
				}
				defaultView='week'
				views={['week', 'day']}
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
