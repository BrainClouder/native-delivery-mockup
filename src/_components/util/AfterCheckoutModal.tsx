import React, { useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { TmainState, ACTIONS } from '../../store/actions/main';
import { connect } from 'react-redux';
import Emoji from './Emoji';

interface IAfterCheckoutModal {
    Link: (e: number) => void;
    clearCart: () => void;
    activeOrder: any;
    restFeed: any;
}

const AfterCheckoutModal: React.FC<IAfterCheckoutModal> = ({ activeOrder, restFeed, Link, clearCart }) => {
    useEffect(() => {
        return () => {
            clearCart();
        }
    }, [clearCart])
    const restaurant = restFeed[activeOrder.restaurantIndex];
    return (
        <View style={{ alignItems: 'center' }}>
            <View>
                <Text>
                    Nice! Now we wait for the restaurant confirmation!
               </Text>
                <Text style={{ fontSize: 42, textAlign: 'center' }}>
                    <Emoji emoji="🏍" label="moto" />
                </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', margin: 8 }}>
                <Image style={{ width: 80, height: 80, borderRadius: 50 }}
                    source={require(`../../imgs/png/food/${restaurant.image}.png`)} />
                <Text>
                    {restaurant.name} {restaurant.rating.toFixed(1)} <Emoji emoji="⭐" label="star" />
                </Text>
                <Text>
                    {restaurant.time} minutes
               </Text>
                <Text>
                    Status: {activeOrder.restaurantConfirmed ? 'confirmed' : 'pending'}
                </Text>
                <Text>
                    Your order will be confirmed after the restaurant response, so, stay strong!
               </Text>
                <View style={{ margin: 4 }}>
                    <Button title="go back" color="crimson" onPress={() => Link(-1)} />
                </View>
                <View style={{ margin: 4, transform: [{ scale: 0.8 }] }}>
                    <Button title="my orders" color="royalblue" onPress={() => console.log('ahoy')} />
                </View>
            </View>
        </View>
    )
}


const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        activeOrder: t.activeOrder,
        restFeed: t.restFeed,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeItem: (e: number) => dispatch({ type: ACTIONS.cartRemoveItem, payload: e }),
        clearCart: () => dispatch({ type: ACTIONS.clearCart })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AfterCheckoutModal);