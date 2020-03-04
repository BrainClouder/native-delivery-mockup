import React, { } from "react";

import {
  Image, StyleSheet, View, ScrollView
} from "react-native";
import { connect } from 'react-redux';

import SlideShowCase from "./_components/SlideShowCase";
import { TmainState, ACTIONS } from "./store/actions/main";
import AppBar from "./_components/AppBar";

interface IApp {
  selectedRest: number;
  Link: (e: string) => void;
}

const App: React.FC<IApp> = ({ selectedRest, Link }) => {

  const styles = StyleSheet.create({
    scrollRoot: {
    },
    footBar: {
      position: "absolute",
      bottom: 0,
      flex: 1,
      flexDirection: 'column',
      marginLeft: '2em',
      marginBottom: '0.5em',
      backgroundColor: "#888888",
      width: '',
      left: '',
    },
    app: {
      marginHorizontal: "auto",
      maxWidth: 500
    },
    link: {
      color: "#1B95E0",
      textAlign: "center"
    },
    code: {
      fontFamily: "monospace, monospace"
    },
    bannerView: {
    },
    bannerImage: {
      width: '100%',
      height: 150,
    }
  });

  const sliderBody = [];
  for (let i = 0; i < 5; i++) {
    sliderBody.push(<SlideShowCase Link={Link} key={i + 'slider'} filterType={i} />)
  }
  return (<>
    {/* <AppBar /> */}
    <View style={{ backgroundColor: '#eee', opacity: selectedRest !== -1 ? 0.5 : 1 }}>
      <AppBar Link={Link} />
      <ScrollView style={{ height: '100vh', width: '100vw' }}>
        <View style={{
          alignItems: 'center'
        }}>
          <Image source={{ uri: `https://picsum.photos/1024/160` }} style={styles.bannerImage} />
          
          {/* <Image source={require('./imgs/png/food/0.png')} style={styles.bannerImage} /> */}
        </View>
        {sliderBody}
      </ScrollView>
    </View>

    {/* {selectedRest !== -1 ? <RestaurantModal /> : ''} */}
  </>);
}



const mapStateToProps = (state: TmainState) => {
  const t = state;
  return {
    selectedRest: t.selectedRestaurant,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshWidth: () => dispatch({ type: ACTIONS.refreshWidth }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
