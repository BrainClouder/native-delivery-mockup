import React from 'react';

import SearchDark from '../../imgs/png/search-dark.png';

import { Button, Image, StyleSheet, Text, View, ScrollView, TouchableHighlight, TextInput } from "react-native";
import { connect } from 'react-redux';
import { TmainState, ACTIONS } from '../../store/actions/main';

interface IAppBar {
  showMode: boolean;
  toggleShow: (e: boolean) => void;
}

const AppBar: React.FC<IAppBar> = ({showMode, toggleShow}) => {
  const iconSize = 50;
  return (
    <View style={{
      shadowColor: '#000', shadowOpacity: 0.4, shadowRadius: 4, shadowOffset: { width: 1, height: -5 },
      backgroundColor: '#670f18',
      height: '12vh', flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-evenly'
    }}>

      <TouchableHighlight>
        <Image
          style={{
            width: 44,
            height: 44,
            borderRadius: 50,
            borderColor: '#333',
            marginHorizontal: '0.5em',
          }} source={{ uri: 'https://randomuser.me/api/portraits/men/25.jpg' }} />
      </TouchableHighlight>
      
      <TouchableHighlight>
      <View style={{ flexDirection: 'row-reverse', alignItems: 'center', width: 180 }}>
        <Text style={{ fontSize: 22, opacity: 0.5 }}>🏠</Text>
        <Text style={{ fontSize: 12, textAlign: 'center', fontWeight: '800', color: '#eee' }}>Deliver to: Loram apsum tower II, 77, Mars</Text>
      </View>
      </TouchableHighlight>
      <TouchableHighlight onPress={() => toggleShow(!showMode)}>
        {showMode ? <Text style={{ fontSize: 24 }}>🍱</Text> : <Text style={{ fontSize: 24, transform: [{rotate: '120deg'}] }}>🥓</Text>}
      </TouchableHighlight>
    </View>
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
    toggleShow: (e: boolean) => dispatch({type: ACTIONS.toggleShow, payload: e}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
