import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/reducer/main';

const HocApp: React.FC = () => {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
};


export default HocApp;