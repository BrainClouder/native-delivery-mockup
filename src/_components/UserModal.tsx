import React from 'react';
import { Image, Text, View, TouchableHighlight, Button, StyleSheet } from "react-native";
import Emoji from './util/Emoji';
import { Link } from 'react-router-native';
import { connect } from 'react-redux';
import { TmainState } from '../store/actions/main';

interface IUserModal {
    userInfo: {
        name: string,
        age: number,
        selectedAddress: number,
        address: string[],
        image: string,
        deliveries: number
    },
    Link: (e: string) => void;
    setModal: (e: number) => void;
}

const UserModal: React.FC<IUserModal> = ({ userInfo, Link, setModal }) => {

    return (
        <View style={{ alignItems: 'center', width: '100%' }}>
            <View style={{ backgroundColor: '#ddd', width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                <Text style={[styles.profileText, styles.profileTitle]}>User Profile</Text>
            </View>
            <View style={{ position: 'relative' }}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        margin: 8,
                        borderRadius: 50,
                        marginHorizontal: '0.5em',
                    }} source={{ uri: userInfo.image }} />
                <View style={{
                    position: 'absolute', bottom: 10, right: 10
                }}>
                </View>
            </View>
            <Text style={styles.profileText}>
                {userInfo.name}
            </Text>
            <Text style={[styles.profileText, styles.profileDeliveries]}>
                Deliveries requested: {userInfo.deliveries}
            </Text>
            <Text style={[styles.profileText, styles.profileAge]}>
                {userInfo.age} years old
      </Text>
            <View style={{ flexDirection: 'row' }}>
                {['🏠', '🍴', '💳'].map((e: string, i: number) => <TouchableHighlight onPress={() => setModal(i + 1)}
                    style={{
                        backgroundColor: ['limegreen', 'goldenrod', 'steelblue'][i],
                        margin: 4, width: 30, height: 30, justifyContent: 'center',
                    }}>
                    <Text style={{
                        fontSize: 18, textAlign: 'center'
                    }}>
                        <Emoji emoji={e} label={['addresses', 'orders', 'payment'][i]} />
                    </Text>
                </TouchableHighlight>)}
            </View>
            <Text style={styles.profileText}>
                Address{userInfo.address.length > 1 ? 'es' : ''}:
      </Text>
            <View style={{ alignItems: 'center', marginBottom: 8 }}>
                {userInfo.address.map((e: string, index: number) => <View style={{ flexDirection: 'row-reverse', alignContent: 'center' }}>
                    <Text style={{ color: 'limegreen', paddingHorizontal: 4 }}>{userInfo.selectedAddress === index ? 'active' : ''}</Text>
                    <Text style={styles.profileText}>
                        {e}
                    </Text>
                </View>)}
            </View>
            <View style={{ marginBottom: 8 }}>
                <Button title="logout" onPress={() => Link('logout')} color="crimson"></Button>
            </View>
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
        userInfo: t.userInfo
    }
}

export default connect(mapStateToProps)(UserModal);