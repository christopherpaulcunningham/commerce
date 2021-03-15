import React from 'react';

import { Navbar } from './components';

import './main.scss';

const App = () => {
	return (
		<div className="App">
			<Navbar totalItems={2} />
		</div>
	);
};

export default App;
