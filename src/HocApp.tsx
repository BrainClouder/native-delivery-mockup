import React, { useState } from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/reducer/main';
import RestaurantModal from './_components/RestaurantModal';
import LogoutPage from './_components/LogoutPage';


const HocApp: React.FC = () => {
	const [activeRoute, setRoute] = useState(0);
	const [routeList] = useState(['home', 'restaurant', 'logout']);
	const [param, setParam] = useState(-1);

	const changeRoute = (ne: string, param?: any) => {		
		window.scrollTo(0,0);
		setRoute(routeList.indexOf(ne));
		setParam(param);
	}

	const componentList = [<App Link={changeRoute}/>, 
	<RestaurantModal Link={changeRoute} selected={param}/>,
	<LogoutPage Link={changeRoute} />]

	return (<>
		<Provider store={store}>
			{componentList[activeRoute] !== undefined ? componentList[activeRoute] : () => setRoute(0)}
		</Provider>
		</>
	);
};


export default HocApp;