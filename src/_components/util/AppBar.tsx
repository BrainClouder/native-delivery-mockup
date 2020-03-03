import React, { useState } from 'react';

import SearchDark from '../../imgs/png/search-dark.png';

import { Button, Image, StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput, TextInputBase } from "react-native";
import { connect } from 'react-redux';
import { TmainState, ACTIONS } from '../../store/actions/main';
import Emoji from './Emoji';

interface IAppBar {
  showMode: boolean;
  toggleShow: (e: boolean) => void;
}

const AppBar: React.FC<IAppBar> = ({ showMode, toggleShow }) => {
  const [modalState, setModal] = useState(-1);

  const [userInfo, setUser] = useState({

    name: 'Kevin Scott', age: 26, selectedAddress: 0,
    address: ['Loram apsum tower II, 77, Mars', 'Dinum bog resort, 42, Mars'],
    image: 'https://randomuser.me/api/portraits/men/25.jpg',

  });
  const [inputAddress, setAddress] = useState({ value: '', active: false });
  const [inputVal, setInput] = useState('');

  if (userInfo.address.length === 0 && modalState !== 1) setModal(1);

  const modalList = [
    <View>
      <Text>User Profile</Text>
      <Image
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginHorizontal: '0.5em',
        }} source={{ uri: userInfo.image }} />
      <Text>{userInfo.name}</Text>
      <Text>{userInfo.age} years</Text>
      <View>
        <TouchableHighlight onPress={() => setModal(1)}>
          <Text>
            <Emoji label="edit" emoji="can" />
          </Text>
        </TouchableHighlight>
        {userInfo.address.map((e: string) => <Text>{e}</Text>)}
      </View>
    </View>
    ,
    <View>
      {userInfo.address.length === 0 ? <Text>Please enter your address</Text> : <Text>Here you can manage your addresses</Text>}
      {userInfo.address.map((e: string, index: number) => <View style={{ flexDirection: 'row' }}><Text>{e}</Text> <TouchableHighlight onPress={() => {
        let a = [...userInfo.address];
        a.splice(index, 1)
        setUser((prevState) => {
          return {
            ...prevState,
            address: a
          }
        });
      }}>
        <Emoji label="remove" emoji="❌" />
      </TouchableHighlight></View>)}

      {inputAddress.active ? <View style={{ flexDirection: 'row' }}>
        <View>
          <TextInput value={inputVal} onChange={(text) => console.log(text)}></TextInput>
        </View>

        <TouchableHighlight>
          <View style={{ backgroundColor: '#222', borderRadius: 50, alignItems: 'center' }}>
            <Text style={{ color: '#eee', fontSize: 16 }}>+</Text>
          </View>

        </TouchableHighlight>

      </View>
        : <TouchableHighlight onPress={() => setAddress((prevState) => { return { ...prevState, active: true } })}>
          <Text><Emoji label="add" emoji={`🏠`} /></Text>
        </TouchableHighlight>}
    </View>
  ]
  // const iconSize = 50;
  return (<>
    <View style={{
      shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 4, shadowOffset: { width: 1, height: -5 },
      backgroundColor: '#670f18',
      height: '12vh', flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-evenly'
    }}>

      <TouchableHighlight onPress={() => setModal(0)}>
        <Image
          style={{
            width: 44,
            height: 44,
            borderRadius: 50,
            marginHorizontal: '0.5em',
          }} source={{ uri: userInfo.image }} />
      </TouchableHighlight>
      <TouchableHighlight onPress={() => setModal(1)}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', width: 180 }}>
          <Text style={{ fontSize: 22, opacity: 0.5 }}><Emoji emoji="🏠" label="address" /></Text>
          <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '800', color: '#eee' }}>Deliver to: {userInfo.address[userInfo.selectedAddress]}</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight>
        <View>
          <Text></Text>
        </View>
      </TouchableHighlight>
    </View>
    <View style={{
      position: 'absolute',
      alignItems: 'center', alignContent: 'center', width: '100%'
    }}>
      <TouchableHighlight onPress={() => toggleShow(!showMode)} style={{
        padding: 4, shadowColor: '#000', shadowOffset: { width: 1, height: 4 },
        backgroundColor: '#00000066', shadowRadius: 3, shadowOpacity: 0.2, borderRadius: 50,
        alignItems: 'center'
      }}>

        {showMode ? <Text style={{ fontSize: 24 }}><Emoji emoji="🍱" label="square view" /></Text> :
          <Text style={{ fontSize: 24, transform: [{ rotate: '120deg' }] }}><Emoji emoji="🥓" label="list view" /></Text>}

      </TouchableHighlight>
    </View>
    {modalList[modalState] !== undefined ? <>
      <TouchableHighlight onPress={() => setModal(-1)} style={{ backgroundColor: '#fff', position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0.6 }}>
        <View></View>
      </TouchableHighlight>
      <View style={{ position: 'absolute', top: '15%', width: '100%', left: 0 }}>
        <View style={{ flexDirection: 'column', backgroundColor: 'steelblue', alignItems: 'center' }}>
          {modalList[modalState]}

        </View>
      </View>

    </> : ''}
  </>
  );
};

// const styles = StyleSheet.create({
//     appToolBar: {
//       flexDirection: 'row',

//     },
//     appBar: {
//       padding: '0.5em',
//       backgroundColor: '#ffffffaa',
//       shadowColor: '#000',
//       shadowOffset: { width: 1, height: 5 },
//       shadowRadius: 5,
//       shadowOpacity: 0.5,
//       zIndex: 5
//     },
//     barElement: {
//       width: '44vw',
//       flexDirection: 'row',
//       alignItems: 'center',
//     },
//     app: {
//       marginHorizontal: "auto",
//       maxWidth: 500
//     },
//     appBarImg: {
//       width: 30,
//       height: 30,
//       marginHorizontal: '0.7em'
//     },
//   });

const mapStateToProps = (state: TmainState) => {
  const t = state;
  return {
    showMode: t.showMode,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleShow: (e: boolean) => dispatch({ type: ACTIONS.toggleShow, payload: e }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
