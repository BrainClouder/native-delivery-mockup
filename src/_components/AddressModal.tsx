import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, TextInput, StyleSheet, Linking, Button } from "react-native";
import Emoji from './util/Emoji';
import { connect } from 'react-redux';
import { TmainState, ACTIONS } from '../store/actions/main';

interface IUserModal {
    userFeed: {
        name: string,
        age: number,
        selectedAddress: number,
        address: string[],
        image: string,
        deliveries: number
    },
    Link: (e: string) => void;
    updateUser: (e: any) => void;
}


const AddressModal: React.FC<IUserModal> = ({userFeed, updateUser}) => {
    const [inputVal, setInput] = useState('');
    const [showAdd, setAdd] = useState(false);
    const [userInfo, setUser] = useState(userFeed);

    useEffect(() => {
        updateUser(userInfo)
    },[userInfo])

    const handlerAddAddress = () => {
        const a = [...userInfo.address];
        if (a.indexOf(inputVal) === -1 && inputVal.length > 2) {
          a.push(inputVal);
          setUser((prevState) => {
            return {
              ...prevState,
              address: a,
            }
          });
        }
      }
    
      const handlerRemoveAddress = (index: number) => {
        let a = [...userInfo.address];
        a.splice(index, 1)
        setUser((prevState) => {
          return {
            ...prevState,
            address: a
          }
        });
      }
    
      const handlerSelectAddress = (index: number) => {
        setUser((prevState) => {
          return {
            ...prevState,
            selectedAddress: index
          }
        })
      }

    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
      <View style={{ backgroundColor: '#ddd', width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
        <Text style={[styles.profileText, styles.profileTitle]}>
          Addresses
          </Text>
      </View>
      <Text style={[styles.profileText, { padding: 8 }]}>
        {userInfo.address.length === 0 ? 'Please enter your address 🛵' : 'Manage your addresses 💒'}
      </Text>
      <View style={{ width: '100%', marginBottom: 16 }}>
        {userInfo.address.map((e: string, index: number) => <View style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          margin: 4, backgroundColor: '#333',
        }}>
          <View style={{ padding: 8, maxWidth: '80%' }}>
            <Text style={{ color: 'limegreen' }}>
              {index === userInfo.selectedAddress ? 'deliver to:' : ''}
            </Text>
            <TouchableHighlight onPress={() => handlerSelectAddress(index)}>
              <Text style={{
                textAlign: 'center',
                fontWeight: index === userInfo.selectedAddress ? '700' : '500', color: '#eee',
                fontSize: 12
              }}>
                {e}
              </Text>
            </TouchableHighlight>
          </View>
          <View>
            <TouchableHighlight onPress={() => handlerRemoveAddress(index)}>
              <Text style={{
                color: '#fff', fontWeight: '900', paddingHorizontal: 8, paddingVertical: 4, margin: 4,
                backgroundColor: 'crimson'
              }}>
                X
            </Text>
            </TouchableHighlight>
          </View>
        </View>)}
      </View>

      {showAdd ?
        <View style={{
          width: '90%', flexDirection: 'column', alignItems: 'center', margin: 8, padding: 4, borderRadius: 4,
          justifyContent: 'center'
        }}>
          <View style={{ width: '70%' }}>
            <TextInput autoCompleteType='street-address' style={{ 
                backgroundColor: '#eee', 
                borderRadius: 4, 
                borderColor: '#aaa', 
                borderWidth: 2 
                }} onChangeText={(text) => setInput(text)}>
            </TextInput>
          </View>
          <TouchableHighlight onPress={handlerAddAddress}>
            <View style={{ backgroundColor: 'crimson', borderRadius: 50, alignItems: 'center', margin: 8 }}>
              <Text style={{ color: '#eee', fontSize: 16, fontWeight: '900', paddingVertical: 4, paddingHorizontal: 8 }}>
                add
            </Text>
            </View>
          </TouchableHighlight>

        </View>
        : ''}



      <TouchableHighlight style={{ margin: 8 }} onPress={() => setAdd(!showAdd)}>
        <Text style={{ color: '#444', backgroundColor: showAdd ? '#666' : '#eee', fontWeight: '600', padding: 8, borderRadius: 50 }}>
          Enter a new delivery address <Emoji label="add" emoji={`🛵`} />
        </Text>
      </TouchableHighlight>

    </View>
    )
}

const styles = StyleSheet.create({
    avatarImage: {
      borderRadius: 50,
      marginHorizontal: '0.5em',
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
        userFeed: t.userInfo
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        updateUser: (e: any) => dispatch({type: ACTIONS.updateUser, payload: e}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressModal);

  