import React, { useState } from 'react';
import App from './App';
import { Provider, connect } from 'react-redux';
import store from './store/reducer/main';
import { View, TouchableHighlight, Text, ScrollView } from 'react-native';
import RestaurantModal from './_components/RestaurantModal';


const HocApp: React.FC = () => {
	const [activeRoute, setRoute] = useState(0);
	const [routeList] = useState(['home', 'restaurant']);
	const [param, setParam] = useState(-1);


	const changeRoute = (ne: string, param?: any) => {		
		window.scrollTo(0,0);
		setRoute(routeList.indexOf(ne));
		setParam(param);
	}


	const componentList = [<App Link={changeRoute}/>, 
	<RestaurantModal Link={changeRoute} selected={param}/>]


	return (
		<Provider store={store}>
			{componentList[activeRoute] !== undefined ? componentList[activeRoute] : () => setRoute(0)}

		</Provider>
	);
};


export default HocApp;