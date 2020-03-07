import React, { useEffect } from 'react';
import { View, Text, Image, TouchableHighlight, Button, BackHandler, StyleSheet, TextInput, ScrollView } from 'react-native';
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
    const [inputAddress, setInputAddress] = React.useState('');
    const [payToggle, setPay] = React.useState(false);
    const [paymode, selectPayment] = React.useState(-1);
    const [paymentSelected, selectPaymentMode] = React.useState('');
    const [orderLevel, setOrder] = React.useState(0);
    const restRef = restaurantInfo[selected];
    const list = [...cartList];

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => setModal(-1));
        return () => {
            BackHandler.addEventListener('hardwareBackPress', () => setModal(-1));
        }
    }, [setModal])

    if (list.length <= 0) setModal(-1);
    let totalPrice = 0;
    for (let item in cartList) {
        const el = cartList[item];
        totalPrice = el.price * el.units + totalPrice;
    }
    return (
        <View style={{
            alignContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
        }}>
            <View>
                <Text style={{ color: '#111', textAlign: 'center', fontWeight: '800', fontSize: 16, margin: 4 }}>
                    Your Order
            </Text>
            </View>
            <ScrollView style={{ maxHeight: '95vh' }}>

                {!payToggle ?
                    <>
                        <View style={{ maxWidth: 500, minWidth: 280 }}>
                            <View style={{ alignContent: 'center', alignItems: 'center' }}>
                                <Image source={require(`../imgs/png/food/${restRef.image}.png`)}
                                    style={{ width: 100, height: 100, borderRadius: 50, margin: 8 }} />
                                <Text style={styles.baseModalText}>
                                    {restRef.name}
                                </Text>
                                <Text style={styles.baseModalText}>
                                    <Emoji emoji="⭐" label="rating star" /> {restRef.rating.toFixed(1)}
                                </Text>

                                <Text style={styles.baseModalText}>
                                    (xx)-xxxx-xxxx
                            </Text>
                            </View>
                        </View>
                    </>
                    : ''}
                {orderLevel === 0 ? <View>
                    <View>
                        <Text style={styles.baseModalText}>
                            Delivery time: {restRef.time} minutes
                            </Text>
                    </View>
                    <View style={styles.itemRowContainer}>
                        <Text style={styles.baseModalText}>
                            item
                            </Text>
                        <Text style={styles.baseModalText}>
                            unit price
                            </Text>
                        <Text style={styles.baseModalText}>
                            quantity
                            </Text>
                        <Text style={styles.baseModalText}>
                            delete
                            </Text>
                    </View>
                    {
                        list.map((item: any, index: number) => <View style={{
                            flexDirection: 'column', justifyContent: 'center'
                        }}>
                            <View
                                style={styles.itemRowContainer}>
                                <Text style={[styles.baseModalText, { color: '#222' }]}>
                                    {item.units} {item.name} for ${item.price} each
                                </Text>
                                <View>
                                    {
                                        item.opts.length > 1 ? <TouchableHighlight onPress={() => index === itemDetail ? showDetail(-1) : showDetail(index)}>
                                            <Text style={index !== itemDetail ? styles.touchablePrice : [styles.touchablePrice, styles.activeDetailTouchable]}>
                                                price info
                                        </Text>
                                        </TouchableHighlight>
                                            : ''
                                    }
                                </View>
                                <Button title="X" color="crimson" onPress={() => {
                                    removeItem(index);
                                    showDetail(-1);
                                }} />
                            </View>
                            {itemDetail === index && item.opts.length > 1 ? <View style={{
                                flexWrap: 'wrap', flexDirection: 'row',
                                maxWidth: '90%', margin: 4, justifyContent: 'center'
                            }}>
                                <View style={[styles.itemRowContainer, {
                                    flexWrap: 'wrap', justifyContent: 'center'
                                }]}>
                                    {
                                        item.opts.map((array: [string, number], i: number) => i !== 0 ? (<View style={{
                                            margin: 3, opacity: 0.7
                                        }}>
                                            <Text style={[styles.baseModalText, { color: '#333' }]}>
                                                {item.numberOpts[i]} {array[0]} for ${array[1] * item.numberOpts[i]}
                                            </Text>
                                        </View>) : '')
                                    }
                                </View>
                            </View> : ''
                            }
                        </View>)
                    }
                    <View style={styles.priceContainer}>
                        <Text style={styles.baseModalText}>
                            subtotal price: ${totalPrice.toFixed(2)}
                        </Text>
                        <Text style={{ color: restRef.deliveryFee === 0 ? 'limegreen' : 'crimson', textAlign: 'center' }}>
                            {restRef.deliveryFee === 0 ? 'FREE DELIVERY' : `+ $${(restRef.deliveryFee).toFixed(2)} delivery fee`}
                        </Text>
                        <Text style={styles.baseModalText}>
                            Total: ${(totalPrice + restRef.deliveryFee).toFixed(2)}
                        </Text>
                    </View>
                </View>
                    : ''
                }


                {
                    !payToggle ?
                        <View style={styles.buttonContainer}>
                            <Button title="I'm done!" color="crimson" onPress={() => setPay(!payToggle)} />
                            <Button title="go back" color="royalblue" onPress={() => setModal(-1)} />
                        </View>
                        :
                        <View>
                            {
                                [
                                    <View style={{ margin: 8 }}>
                                        {
                                            !manageAddress ?
                                                <View>
                                                    <Text style={[styles.baseModalText]}>
                                                        Deliver to:
                                                </Text>
                                                    <Button title={selectedAddress} 
                                                    color="crimson"
                                                    onPress={() => setAnotherAddress(!manageAddress)} />
                                                </View>
                                                :
                                                <View>
                                                    <Text style={[styles.baseModalText, styles.textTitleMargin]}>
                                                        Click below to select an address:
                                                    </Text>
                                                    <View style={{margin: 4}}>
                                                    {
                                                        userInfo.address.map((el: string) => 
                                                        <View style={{marginBottom: 4}}>
                                                            <Button title={el} 
                                                            color={el === selectedAddress ? 'crimson' : 'royalblue'}
                                                            onPress={() => {
                                                                setAnotherAddress(false);
                                                                setAddress(el);
                                                            }} />
                                                        </View>

                                                        )}
                                                        </View>                                                 

                                                </View>}
                                        <View>
                                            <Text style={styles.baseModalText}>
                                                Select a payment method:
                                        </Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                justifyContent: 'space-evenly',
                                                width: '80vw',
                                                margin: 4,
                                                padding: 8,
                                                borderRadius: 10,
                                                backgroundColor: '#dedede',
                                            }}>
                                                {
                                                    ['📱 pay online ', 'pay on delivery 🛵'].map((e: string, i: number) =>
                                                        <View style={{
                                                            margin: 4,
                                                            transform: [{ scale: paymode !== -1 ? paymode === i ? 1.25 : 0.8 : 1 }]
                                                        }}>
                                                            <Button title={e}
                                                                color={paymode === i ? 'crimson' : 'dimgray'}

                                                                onPress={() => {
                                                                    selectPayment(i);
                                                                    selectPaymentMode('');
                                                                }} />
                                                        </View>)
                                                }
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center',
                                                width: '80vw',
                                                margin: 4,
                                                padding: 8,
                                                borderRadius: 10,
                                                backgroundColor: paymode !== -1 ? '#dedede' : ''
                                            }}>
                                                {
                                                    paymode === 0 ? <TouchableHighlight style={paymentSelected === 'credit card' ? [styles.customButton, styles.selectedPayment] :
                                                        [styles.customButton, styles.unselectedPayment]}
                                                        onPress={() => selectPaymentMode('credit card')}>
                                                        <Text style={styles.customButtonText}>
                                                            <Emoji emoji="💳" label="cardpay" /> my credit card (99XX)
                                                    </Text>
                                                    </TouchableHighlight> : paymode === 1 ?
                                                            <View style={{
                                                                flexWrap: 'wrap', flexDirection: 'row', width: '70vw', justifyContent: 'center'
                                                            }}>
                                                                {
                                                                    ['credit', 'debit', 'cash'].map(
                                                                        (element: string, i: number) => <View style={{
                                                                            margin: 4,
                                                                            transform: [{ scale: paymentSelected.length > 0 ? paymentSelected === element ? 1.15 : 0.8 : 1 }]
                                                                        }}>
                                                                            <Button color={paymentSelected === element ? 'crimson' : 'dimgrey'}
                                                                                title={`${['💳', '💳', '💵'][i]} ${element}`}
                                                                                onPress={() => selectPaymentMode(element)} />
                                                                        </View>
                                                                    )
                                                                }
                                                            </View> : ''
                                                }
                                            </View>
                                            {paymentSelected.length > 0 ? 
                                            <View>
                                                <Button title="checkout" onPress={() => setOrder(1)} color="orangered" />
                                            </View>
                                            : ''}
                                        </View>
                                    </View>
                                    ,
                                    <View>
                                        <Text style={styles.baseModalText}>
                                            Please, review your order.
                                        </Text>
                                        <Text style={styles.baseModalText}>
                                            Deliver to the address: {selectedAddress}
                                        </Text>
                                        <Text style={styles.baseModalText}>
                                            {paymode === 0 ? 'pay online' : 'pay on delivery'} with {paymentSelected}
                                        </Text>
                                        <Text style={styles.baseModalText}>
                                            You will be charged with ${(totalPrice + restRef.deliveryFee).toFixed(2)}
                                        </Text>
                                        <Text style={styles.baseModalText}>
                                            If there is no problem with your order, confirm below:
                                    </Text>
                                        <View style={{margin: 4}}>
                                            <Button title="finish my order" color="crimson" onPress={() => setOrder(2)} />
                                        </View>
                                        <View style={{margin: 4}}>
                                            <Button title="change something" onPress={() => setOrder(0)} />
                                        </View>
                                    </View>,
                                    <View>
                                        <Text style={styles.baseModalText}>
                                            Awesome! Now, it's up with the restaurant. Your order will be confirmed after they confirm!
                                        </Text>
                                    </View>
                                ][orderLevel]
                            }</View>
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    priceTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemRowContainer: {
        flexDirection: 'row',
        margin: 2,
        width: '80vw',
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
    textTitleMargin: {
        margin: 4,
        fontWeight: '700',
    },
    customButton: {
        margin: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: 'royalblue',
        alignItems: 'center',
        borderRadius: 8,
    },
    customButtonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'justify'
    },
    selectedPayment: {
        backgroundColor: 'crimson',
        transform: [{ scale: 1.15 }]
    },
    unselectedPayment: {
        backgroundColor: 'dimgray',
        transform: [{ scale: 0.8 }]
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
        margin: 2,
        padding: 6,
        backgroundColor: '#cecece',
        display: 'flex',
    },
    baseModalText: {
        color: '#333',
        textAlign: 'center'
    },
    payDefault: {
        backgroundColor: 'dimgray'
    },
    paySelected: {
        backgroundColor: 'steelblue',
        transform: [{ scale: 1.25 }]
    },
    payUnselected: {
        backgroundColor: 'dimgray',
        opactity: 0.9,
        transform: [{ scale: 0.8 }]
    },
    textInput: {
        backgroundColor: '#eee',
        borderRadius: 5,
        margin: 4,
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