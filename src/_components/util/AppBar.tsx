import React from 'react';

import SearchDark from '../../imgs/png/search-dark.png';

import { Button, Image, StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput } from "react-native";

const AppBar = () => {
	const iconSize = 50;
	return (
		<View style={styles.appBar}>
			<View style={styles.appToolBar}>
				<View style={styles.barElement}>
					<Image
						style={{
							width: iconSize,
							height: iconSize,
							borderRadius: 50,
							marginHorizontal: '0.2em',
						}}
						source={{ uri: 'https://randomuser.me/api/portraits/men/25.jpg' }}
					/>
					<Text style={{ fontSize: 16, marginHorizontal: '0.2em' }}>
						Welcome back, Kelvin!
					</Text>
				</View>

				<View style={styles.barElement}>
					<TextInput editable maxLength={40} />
					<Image style={styles.appBarImg} source={{ uri: SearchDark }} />
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
    appToolBar: {
      flexDirection: 'row',
  
    },
    appBar: {
      padding: '0.5em',
      backgroundColor: '#ffffffaa',
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 5 },
      shadowRadius: 5,
      shadowOpacity: 0.5,
      zIndex: 5
    },
    barElement: {
      // width: 'auto',
      // display: 'flex',
      width: '44vw',
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
    },
    app: {
      marginHorizontal: "auto",
      maxWidth: 500
    },
    appBarImg: {
      width: 30,
      height: 30,
      marginHorizontal: '0.7em'
    },
    // link: {
    //   color: "#1B95E0",
    //   textAlign: "center"
    // },
    // code: {
    //   fontFamily: "monospace, monospace"
    // },
    // bannerView: {
    //   flex: 1,
    //   alignItems: 'center'
    // },
    // bannerImage: {
    //   width: window.innerWidth,
    //   height: 125,
    // }
  });

export default AppBar;
