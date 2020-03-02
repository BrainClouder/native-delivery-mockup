import React, { Component, useState, useEffect } from "react";

import {
  Button, Image, StyleSheet, Text, View, ScrollView, TouchableHighlight,
  TextInput
} from "react-native";
import { connect } from 'react-redux';

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
  WIDTH: number;
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
      height: 125,
    }
  });

  const sliderBody = [];
  for (let i = 0; i < 5; i++) {
    sliderBody.push(<SlideShowCase Link={Link} key={i + 'slider'} filterType={i} />)
  }
  return (<>
    {/* <AppBar /> */}
    <View style={{ backgroundColor: '#eee', opacity: selectedRest !== -1 ? 0.5 : 1 }}>
      <ScrollView style={{ height: '88vh' }}>
        <View style={{
          alignItems: 'center'
        }}>
          <Image source={{ uri: `https://picsum.photos/1024/140` }} style={styles.bannerImage} />
        </View>
        {sliderBody}
      </ScrollView>
      <AppBar/>
    </View>

    {/* {selectedRest !== -1 ? <RestaurantModal /> : ''} */}
  </>);
}



const mapStateToProps = (state: TmainState) => {
  const t = state;
  return {
    selectedRest: t.selectedRestaurant,
    WIDTH: t.windowWidth,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    refreshWidth: () => dispatch({ type: ACTIONS.refreshWidth }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
