import React, { Component, useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput } from "react-native";
import { Provider, connect } from 'react-redux';
import store from './store/reducer/main';

import MenuDark from './imgs/png/menu-dark.png';
import MenuLight from './imgs/png/menu-light.png';
import SearchDark from './imgs/png/search-dark.png';
import SearchLight from './imgs/png/search-light.png';
import ChatDark from './imgs/png/chat-dark.png';
import ChatLight from './imgs/png/chat-light.png';
import SlideShowCase from "./_components/util/SlideShowCase";
import { TmainState, ACTIONS } from "./store/actions/main";
import AppBar from "./_components/util/AppBar";
import RestaurantModal from "./_components/RestaurantModal";

interface IApp {
  selectedRest: number;
  refreshWidth: () => void;
}


const Link = (props: any) => (
  <Text
    {...props}
    accessibilityRole="link"
    style={StyleSheet.compose(
      styles.link,
      props.style
    )}
  />
);


const App: React.FC<IApp> = ({selectedRest, refreshWidth}) => {
  useEffect(() => {
    window.addEventListener('resize', refreshWidth);
    return () => {
      window.removeEventListener('resize', refreshWidth);
    }
  }, [refreshWidth]);

  const sliderBody = [];
  for (let i = 0; i < 5; i++) {
    sliderBody.push(<SlideShowCase key={i + 'slider'} filterType={i} />)
  }
  return (<>
  <View style={{ backgroundColor: '#eee', opacity: selectedRest !== -1 ? 0.5 : 1, height:  selectedRest !== -1 ? 0 : '' }}>
    <AppBar />
    <ScrollView>
      <View>
        <View style={styles.bannerView}>
          <Image source={{ uri: `https://picsum.photos/${window.innerWidth}/140` }} style={styles.bannerImage} />
        </View>

      </View>
      {sliderBody}
    </ScrollView>
  </View>
  {selectedRest !== -1 ? <RestaurantModal/> : ''}
  </>);
}

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
    flex: 1,
    alignItems: 'center'
  },
  bannerImage: {
    width: window.innerWidth,
    height: 125,
  }
});

const mapStateToProps = (state: TmainState) => {
  const t = state;
  return {
    selectedRest: t.selectedRestaurant,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshWidth: () => dispatch({type: ACTIONS.refreshWidth}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
