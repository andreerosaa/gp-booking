import React from 'react';

const Header = () => {
	return (
		<header className='Header'>
			<a>
				<img
					className='Logo'
					src={require('../assets/gp-logo.png')}
					alt='Ginásio Palmeiras Logotype'
				/>
			</a>
		</header>
	);
};

export default Header;
