import React from 'react';
import { View, Text, Image, TouchableHighlight, Button, BackHandler, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { TmainState, TcartList, ACTIONS } from '../store/actions/main';
import Emoji from './util/Emoji';



interface IRestaurantCart {
    cartList: TcartList;
    userInfo: {
        name: string,
        age: number,
        selectedAddress: number,
        address: string[],
        image: string,
        deliveries: number
    };
    restaurantInfo: {
        name: string,
        category: string,
        rating: number,
        image: number,
        imageAttribution: string,
        deliveryFee: number,
        time: string,
        promo: boolean,
        isOpen: boolean
    }[];
    selected: number;
    setModal: (e: number) => void;
    removeItem: (e: number) => void;
}

const RestaurantCartModal: React.FC<IRestaurantCart> = ({ userInfo, setModal, cartList, removeItem, restaurantInfo, selected }) => {
    const [itemDetail, showDetail] = React.useState(-1);
    const [selectedAddress, setAddress] = React.useState(userInfo.address[userInfo.selectedAddress]);
    const [manageAddress, setAnotherAddress] = React.useState(false);
    const [payToggle, setPay] = React.useState(false);
    const [paymode, selectPayment] = React.useState(-1);
    const [inputAddress, setInputAddress] = React.useState('');
    const restRef = restaurantInfo[selected];
    const list = [...cartList];
    if (list.length <= 0) setModal(-1);
    let totalPrice = 0;
    for (let item in cartList) {
        const el = cartList[item];
        totalPrice = el.price * el.units + totalPrice;
    }
    return (
        <View style={{
            width: '90%', alignContent: 'center'
        }}>
            <View>
                <Text style={{ color: '#eee', textAlign: 'center', fontWeight: '800', fontSize: 16, margin: 4 }}>
                    Your Order
            </Text>
            </View>
            <View style={{ width: '100%' }}>
                <View style={{ alignContent: 'center', alignItems: 'center' }}>
                    <Image source={require(`../imgs/png/food/${restRef.image}.png`)}
                        style={{ width: 100, height: 100, borderRadius: 50, margin: 8 }} />
                    <Text style={{ color: '#eee', textAlign: 'center' }}>
                        {restRef.name}
                    </Text>
                    <Text style={{ color: '#eee', textAlign: 'center' }}>
                        <Emoji emoji="⭐" label="rating star" /> {restRef.rating.toFixed(1)}
                    </Text>

                    <Text style={{ color: '#eee', textAlign: 'center' }}>
                        (xx)-xxxx-xxxx
                    </Text>
                    <Text style={{ color: '#eee', textAlign: 'center' }}>
                        Delivery time: {restRef.time} minutes
                    </Text>

                </View>
                <View style={styles.itemRowContainer}>
                    <Text style={{ color: '#eee' }}>
                        item
                        </Text>
                    <Text style={{ color: '#eee' }}>
                        unit price
                        </Text>
                    <Text style={{ color: '#eee' }}>
                        quantity
                        </Text>
                    <Text style={{ color: '#eee' }}>
                        delete
                        </Text>
                </View>
                {
                    list.map((item: any, index: number) => <View>
                        <View
                            style={styles.itemRowContainer}>
                            <Text style={{ color: '#eee' }}>
                                {item.name}
                            </Text>
                            <TouchableHighlight onPress={() => showDetail(index)}>
                                <Text style={index !== itemDetail ? styles.touchablePrice : [styles.touchablePrice, styles.activeDetailTouchable]}>
                                    ${item.price}
                                </Text>
                            </TouchableHighlight>
                            <Text style={{ color: '#eee' }}>
                                {item.units}
                            </Text>
                            <Button title="X" color="crimson" onPress={() => removeItem(index)} />
                        </View>
                        {itemDetail === index ? <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            {item.opts.map((array: [string, number], i: number) => i !== 0 ? (<View style={{
                                flexDirection: 'row', margin: 3, justifyContent: 'space-evenly', marginTop: 0,
                                opacity: 0.7
                            }}>
                                <Text style={{ color: '#ddd' }}>{array[0]}</Text>
                                <Text style={{ color: '#ddd', marginHorizontal: 4 }}>${array[1]}</Text>
                                <Text style={{ color: '#ddd' }}>quantity: {item.numberOpts[i]}</Text>
                            </View>) : '')}
                        </View> : ''}
                    </View>)
                }
            </View>
            <View style={styles.priceContainer}>
                <Text style={{ color: '#eee' }}>
                    subtotal price: ${totalPrice.toFixed(2)}
                </Text>
                <Text style={{ color: restRef.deliveryFee === 0 ? 'limegreen' : 'crimson' }}>
                    {restRef.deliveryFee === 0 ? 'FREE DELIVERY' : `+ $${(restRef.deliveryFee).toFixed(2)} delivery fee`}
                </Text>
                <Text style={{ color: '#eee' }}>
                    Total: ${(totalPrice + restRef.deliveryFee).toFixed(2)}
                </Text>

            </View>
            <View style={styles.buttonContainer}>
                <Button title="checkout" color={payToggle ? 'dimgray' : 'crimson'} onPress={() => setPay(!payToggle)} />
                <Button title="go back" color="royalblue" onPress={() => setModal(-1)} />
            </View>
            {
                payToggle ? <View>
                    <Text style={{color: '#eee', fontSize: 16 }}>
                        PLease, select a payment:
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                        <TouchableHighlight onPress={() => selectPayment(0)}>
                            <Text style={{ color: '#eee', padding: 8, borderRadius: 5, backgroundColor: paymode === 0 ? 'royalblue' :'dimgrey' }}>
                                <Emoji emoji="💳" label="card" /> My card XXXX
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => selectPayment(1)}>
                            <Text style={{ color: '#eee', padding: 8, borderRadius: 5, backgroundColor: paymode === 1 ? 'royalblue' :'dimgrey'  }}>
                                <Emoji emoji="💵" label="cash" /> Cash
                            </Text>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={() => setAnotherAddress(!manageAddress)}>
                            <Text style={{ color: '#eee' }}>
                                deliver to: {selectedAddress}
                            </Text>
                        </TouchableHighlight>
                        {
                            manageAddress ? <View>
                                <Text style={{ color: '#eee' }}>
                                    Click to select an address
                                </Text>
                                {userInfo.address.map((e: string) => <TouchableHighlight onPress={() => {
                                    setAnotherAddress(false);
                                    setAddress(e);
                                }}>
                                    <Text style={{ color: '#eee' }}>
                                        {e}
                                    </Text>
                                </TouchableHighlight>)}
                                <Text style={{ color: '#eee' }}>
                                    Or type a new address:
                                </Text>
                                <TextInput style={{
                                    backgroundColor: '#eee',
                                    color: '#333'
                                }} onChangeText={setInputAddress} value={inputAddress} />
                                <Button title="select" color='royalblue' onPress={() => setAddress(inputAddress)} />
                            </View> : ''
                        }
                    </View>
                </View> : ''
            }
            {
                paymode !== -1 ? 
                <View>
                    <Button title="aaa" color="crimson" onPress={() => console.log('do the magic and gimme the food')} />
                </View> 
                : ''
            }
        </View>
    )
}

const styles = StyleSheet.create({
    itemRowContainer: {
        flexDirection: 'row',
        margin: 2,
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center'
    },
    touchablePrice: {
        color: '#fff',
        fontWeight: '800',
        backgroundColor: 'royalblue',
        padding: 4,
        borderRadius: 4
    },
    activeDetailTouchable: {
        backgroundColor: 'firebrick'
    },
    buttonContainer: {
        flexDirection: 'row',
        margin: 16,
        justifyContent: 'space-evenly'
    },
    priceContainer: {
        margin: 4,
        padding: 2
    }
})

const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        cartList: t.cartList,
        restaurantInfo: t.restFeed,
        userInfo: t.userInfo,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeItem: (e: number) => dispatch({ type: ACTIONS.cartRemoveItem, payload: e })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RestaurantCartModal);