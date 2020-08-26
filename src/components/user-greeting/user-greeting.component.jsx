import React from 'react';

const UserGreeting = props => {
	const { user } = props;

	return (
		<div>
			<h1>Hello, {user}!</h1>
		</div>
	);
};

export default UserGreeting;
