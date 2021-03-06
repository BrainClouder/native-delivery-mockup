import React, { useState } from 'react';
import { Image, Text, View, TouchableHighlight, TextInput, StyleSheet, Linking, Button } from "react-native";
import Emoji from './util/Emoji';
import GitHubLight from '../imgs/png/GitHub-Mark-Light-32px.png';
import { TmainState, ACTIONS } from '../store/actions/main';
import { connect } from 'react-redux';
import { Link } from 'react-router-native';
import UserModal from './UserModal';
import AddressModal from './AddressModal';
import OrderHistoryModal from './OrderHistoryModal';
import PaymentUserModal from './PaymentUserModal';

interface IAppBar {
  showMode: boolean;
  userInfo: {
    name: string,
    age: number,
    selectedAddress: number,
    address: string[],
    image: string,
    deliveries: number
  };
  toggleShow: (e: boolean) => void;
  Link: (e: string) => void;
  updateUser: (e: any) => void;
}

const AppBar: React.FC<IAppBar> = ({ showMode, toggleShow, Link, userInfo, updateUser }) => {
  const [modalState, setModal] = useState(-1);

  const [addressButton, setAButton] = useState(true);

  if (userInfo.address.length === 0 && modalState !== 1) setModal(1);

  if (userInfo.address[userInfo.selectedAddress] === undefined && userInfo.address.length > 0) {
    let a = userInfo;
    a.selectedAddress--;
    updateUser(a);
  }

  const modalList = [
    <UserModal Link={Link} setModal={setModal} />
    ,
    <AddressModal Link={Link} />
    ,
    <OrderHistoryModal setModal={setModal} />
    ,
    <PaymentUserModal setModal={setModal} />

  ]

  return (<>
    {/* <View style={{
      position: 'absolute', zIndex: 5, top: 0, right: 5, backgroundColor: '#111', padding: 4, borderRadius: 20
    }}>
      <TouchableHighlight onPress={() => Linking.openURL('https://github.com/BrainClouder/native-delivery-mockup')}>
        <View>
          <Image source={{ uri: GitHubLight }} style={{ width: 32, height: 32 }} />
        </View>
      </TouchableHighlight>
    </View> */}

    <View style={{
      position: 'absolute',
      alignItems: 'center',
      width: '100%',
      zIndex: 5,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    }}>      
      <View style={{
        justifyContent: 'center', backgroundColor: '#111', borderRadius: 50,
      }}>
        <TouchableHighlight onPress={() => setModal(0)}>
          <Image style={[{ width: 40, height: 40 }, styles.avatarImage]}
            source={{ uri: userInfo.image }} />
        </TouchableHighlight>
      </View>

      <View style={{
        borderRadius: 50,
        backgroundColor: "#dedede",
        alignItems: 'center'
      }}>
        <Button title="🔔" onPress={() => console.log('open notifications')} color="transparent"
        />
      </View>

      
      <View style={{
        backgroundColor: '#111', padding: 4, borderRadius: 20
      }}>
        <TouchableHighlight onPress={() => Linking.openURL('https://github.com/BrainClouder/native-delivery-mockup')}>
          <View>
            <Image source={{ uri: GitHubLight }} style={{ width: 32, height: 32 }} />
          </View>
        </TouchableHighlight>
      </View>

    </View>

    <View style={{
      position: 'absolute', alignItems: 'center', zIndex: 5,
      bottom: 0, right: 20,
        backgroundColor: '#111', borderTopLeftRadius: 10,
        borderTopRightRadius: 10, flexDirection: 'row', padding: 12
      }}>
        <TouchableHighlight onPress={() => setAButton(!addressButton)}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>
              <Emoji emoji="🛵" label="address" />
            </Text>
          </View>
        </TouchableHighlight>
        <View>
          {addressButton ? <TouchableHighlight onPress={() => setModal(1)}>
            <Text style={styles.addressBarText}>
              {userInfo.address[userInfo.selectedAddress]}
            </Text>
          </TouchableHighlight> : ''}
        </View>
        
      </View>

    {/* <View style={{
      position: 'absolute', zIndex: 5, top: 0, left: 5,
      justifyContent: 'center', backgroundColor: '#111', borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50
    }}>
      <TouchableHighlight onPress={() => setModal(0)}>
        <Image style={[{ width: 40, height: 40 }, styles.avatarImage]}
          source={{ uri: userInfo.image }} />
      </TouchableHighlight>
    </View> */}
    {/* 
    <View style={{
      position: 'absolute', 
      left: 90, zIndex: 5,
      borderRadius: 50,
      backgroundColor: "#dedede"
    }}>
      <Button title="🔔" onPress={() => console.log('open notifications')} color="transparent"
      />
    </View> */}

    <View style={{
      position: 'absolute', top: 60, left: 6, zIndex: 5, alignItems: 'center'
    }}>
      <TouchableHighlight onPress={() => toggleShow(!showMode)} style={{
        borderColor: '#222', borderWidth: 4,
        padding: 4, backgroundColor: 'crimson', borderRadius: 50, alignItems: 'center',
        shadowColor: '#000', shadowOffset: { width: 1, height: 4 }, shadowRadius: 3, shadowOpacity: 0.5,
      }}>
        <Text style={{ fontSize: 24 }}>
          <Emoji emoji={showMode ? '🍱' : '🥓'} label={showMode ? 'square view' : 'list view'} />
        </Text>
      </TouchableHighlight>
    </View>

    {/* <View style={{
      position: 'absolute', zIndex: 5, top: 0, right: 50, maxHeight: 75,
      backgroundColor: '#111', borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10, flexDirection: 'row', padding: 12
    }}>
      <TouchableHighlight onPress={() => setAButton(!addressButton)}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>
            <Emoji emoji="🛵" label="address" />
          </Text>
        </View>
      </TouchableHighlight>
      <View>
        {addressButton ? <TouchableHighlight onPress={() => setModal(1)}>
          <Text style={styles.addressBarText}>
            {userInfo.address[userInfo.selectedAddress]}
          </Text>
        </TouchableHighlight> : ''}
      </View>
    </View> */}
    {modalList[modalState] !== undefined ? <>
      <TouchableHighlight onPress={() => setModal(-1)} style={{ backgroundColor: '#222', zIndex: 5, position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, opacity: 0.6 }}>
        <View></View>
      </TouchableHighlight>
      <View style={{ position: 'absolute', top: '15%', width: '100%', left: 0, alignItems: 'center', zIndex: 5 }}>
        <View style={{
          borderRadius: 8,
          flexDirection: 'column', backgroundColor: '#222',
          alignItems: 'center', width: '95%', margin: 8
        }}>
          {modalList[modalState]}
        </View>
      </View>
    </> : ''}
  </>
  );
};

const styles = StyleSheet.create({
  avatarImage: {
    borderRadius: 50,
    margin: 6
  },
  addressBarStyle: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'crimson',
    padding: 4,
    borderColor: '#222',
    borderWidth: 4,
    borderRadius: 50
  },
  addressBarText: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '800',
    color: '#eee',
    marginHorizontal: 4,
    paddingHorizontal: 4,
    maxWidth: 120,
  },
  profileText: {
    color: '#eee',
    fontSize: 14,
    margin: 2
  },
  profileTitle: {
    fontWeight: '800',
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  profileAge: {
    fontSize: 12,
    color: '#ccc',
  },
  profileDeliveries: {
    fontSize: 12,
    color: 'crimson',
    fontWeight: '600',
  }
});

const mapStateToProps = (state: TmainState) => {
  const t = state;
  return {
    showMode: t.showMode,
    userInfo: t.userInfo,
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    toggleShow: (e: boolean) => dispatch({ type: ACTIONS.toggleShow, payload: e }),
    updateUser: (e: any) => dispatch({ type: ACTIONS.updateUser, payload: e })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppBar);
