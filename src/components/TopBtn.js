import React from 'react';
import { FaAngleUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const TopBtn = () => {
	const [showBtn, setShowBtn] = useState(false);

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 400) {
				setShowBtn(true);
			} else {
				setShowBtn(false);
			}
		});
	}, []);

	const goToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className='top-to-btn'>
			{' '}
			{showBtn && (
				<FaAngleUp className='icon-position icon-style' onClick={goToTop} />
			)}{' '}
		</div>
	);
};

export default TopBtn;
