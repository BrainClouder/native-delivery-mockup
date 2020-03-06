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
            <ScrollView>
                <View>
                    <Text style={{ color: '#eee', textAlign: 'center', fontWeight: '800', fontSize: 16, margin: 4 }}>
                        Your Order
            </Text>
                </View>
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
                    list.map((item: any, index: number) => <View>
                        <View
                            style={styles.itemRowContainer}>
                            <Text style={styles.baseModalText}>
                                {item.name}
                            </Text>
                            <View>
                                <TouchableHighlight onPress={() => showDetail(index)}>
                                    <Text style={index !== itemDetail ? styles.touchablePrice : [styles.touchablePrice, styles.activeDetailTouchable]}>
                                        ${item.price}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                            <Text style={styles.baseModalText}>
                                {item.units}
                            </Text>
                            <Button title="X" color="crimson" onPress={() => removeItem(index)} />
                        </View>
                        {itemDetail === index ? <View style={{
                            flexWrap: 'wrap', flexDirection: 'row',
                            maxWidth: '90%', margin: 4, justifyContent: 'center'
                        }}>
                            {item.opts.map((array: [string, number], i: number) => i !== 0 ? (<View style={{
                                margin: 3, opacity: 0.7
                            }}>
                                <Text style={styles.baseModalText}>
                                    {item.numberOpts[i]} {array[0]} for ${array[1] * item.numberOpts[i]}
                                </Text>

                            </View>) : '')}
                        </View> : ''}
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
                <View style={styles.buttonContainer}>
                    <Button title="checkout" color={payToggle ? 'royalblue' : 'dimgray'} onPress={() => setPay(!payToggle)} />
                    <Button title="go back" color="crimson" onPress={() => setModal(-1)} />
                </View>

                {
                    payToggle ?
                        <View>
                            {
                                [<View style={{ margin: 8 }}>
                                    {
                                        !manageAddress ?
                                            <View>
                                                <Text style={[styles.baseModalText, styles.textTitleMargin]}>
                                                    Deliver to:
                                            </Text>
                                                <TouchableHighlight onPress={() => setAnotherAddress(!manageAddress)} style={styles.customButton}>
                                                    <Text style={styles.customButtonText}>
                                                        {selectedAddress}
                                                    </Text>

                                                </TouchableHighlight>
                                            </View>
                                            :
                                            <View>
                                                <Text style={[styles.baseModalText, styles.textTitleMargin]}>
                                                    Click any below to select an address:
                                            </Text>
                                                {userInfo.address.map((e: string) => <TouchableHighlight style={styles.customButton}
                                                    onPress={() => {
                                                        setAnotherAddress(false);
                                                        setAddress(e);
                                                    }}>
                                                    <Text style={styles.customButtonText}>
                                                        {e}
                                                    </Text>

                                                </TouchableHighlight>

                                                )}
                                                <Text style={[styles.baseModalText, styles.textTitleMargin]}>
                                                    You can also type a new address:
                                            </Text>
                                                <TextInput style={styles.textInput} onChangeText={setInputAddress} value={inputAddress} />
                                                <TouchableHighlight style={styles.customButton}>
                                                    <Text style={styles.customButtonText}>
                                                        Select
                                                    </Text>
                                                </TouchableHighlight> 
                                            </View>}
                                    <View>
                                        <Text style={{ color: '#eee', fontSize: 16 }}>
                                            Select a payment method:
                                    </Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-evenly',
                                            width: '70vw',
                                            margin: 8
                                        }}>
                                            <TouchableHighlight onPress={() => {
                                                selectPayment(0);
                                                selectPaymentMode('');
                                            }}>
                                                <Text style={{ color: '#eee', padding: 8, borderRadius: 5, backgroundColor: paymode === 0 ? 'royalblue' : 'dimgrey' }}>
                                                    online payment
                                    </Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight onPress={() => {
                                                selectPayment(1);
                                                selectPaymentMode('');
                                            }}>
                                                <Text style={{ color: '#eee', padding: 8, borderRadius: 5, backgroundColor: paymode === 1 ? 'royalblue' : 'dimgrey' }}>
                                                    pay on delivery
                                </Text>
                                            </TouchableHighlight>
                                        </View>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                            {
                                                paymode === 0 ? <TouchableHighlight onPress={() => {
                                                    selectPaymentMode('credit card');
                                                    // setOrder(orderLevel + 1);
                                                }}>
                                                    <Text style={paymentSelected === 'credit card' && paymode === 0 ? [styles.customButton, styles.selectedPayment] : [styles.customButton, styles.unselectedPayment]}>
                                                        <Emoji emoji="💳" label="cardpay" /> my credit card (99XX)
                                    </Text>
                                                </TouchableHighlight> : paymode === 1 ?
                                                        <>
                                                            <TouchableHighlight style={paymentSelected === 'credit card' && paymode === 1 ? [styles.customButton, styles.selectedPayment] : [styles.customButton, styles.unselectedPayment]}
                                                                onPress={() => {
                                                                    selectPaymentMode('credit card');
                                                                }}>
                                                                <Text style={styles.baseModalText}>
                                                                    <Emoji emoji="💳" label="cardpay" /> Credit card
                                            </Text>
                                                            </TouchableHighlight>
                                                            <TouchableHighlight style={paymentSelected === 'cash' && paymode === 1 ? [styles.customButton, styles.selectedPayment] : [styles.customButton, styles.unselectedPayment]}
                                                                onPress={() => {
                                                                    selectPaymentMode('cash');
                                                                }}>
                                                                <Text style={styles.baseModalText}>
                                                                    <Emoji emoji="💵" label="cashpay" /> Cash
                                            </Text>
                                                            </TouchableHighlight>
                                                            <TouchableHighlight style={paymentSelected === 'debit card' && paymode === 1 ? [styles.customButton, styles.selectedPayment] : [styles.customButton, styles.unselectedPayment]}
                                                                onPress={() => {
                                                                    selectPaymentMode('debit card');
                                                                }}>
                                                                <Text style={styles.baseModalText}>
                                                                    <Emoji emoji="💳" label="debitpay" /> Debit card
                                            </Text>
                                                            </TouchableHighlight>
                                                        </> : ''
                                            }
                                        </View>
                                        {paymentSelected.length > 0 ? <TouchableHighlight
                                            onPress={() => setOrder(orderLevel + 1)}
                                            style={styles.customButton}>
                                            <Text style={styles.customButtonText}>
                                                Checkout
                                            </Text>
                                        </TouchableHighlight> : ''}
                                    </View>
                                </View>,
                                <View>
                                    <Text style={styles.baseModalText}>
                                        Please, review your order.
                                </Text>
                                    <TouchableHighlight onPress={() => setOrder(orderLevel - 1)}>
                                        <>
                                        <Text style={styles.baseModalText}>
                                            Deliver to the address: {selectedAddress}
                                        </Text>
                                        <Text style={styles.baseModalText}>
                                            {paymode === 0 ? 'pay online' : 'pay on delivery'} with {paymentSelected}
                                        </Text>
                                        </>
                                    </TouchableHighlight>
                                    <Text style={styles.baseModalText}>
                                        You will be charged with ${(totalPrice + restRef.deliveryFee).toFixed(2)}
                                    </Text>
                                    <Text style={styles.baseModalText}>
                                            If there is no problem with your order, confirm below:
                                    </Text>
                                    <TouchableHighlight style={[styles.customButton, {backgroundColor: 'rebeccapurple'}]}>
                                        <Text style={styles.customButtonText}>
                                            Give me the food!
                                        </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={[styles.customButton, {backgroundColor: 'crimson'}]}>
                                        <Text style={styles.customButtonText}>
                                            I want to go back...
                                        </Text>
                                    </TouchableHighlight>

                                </View>
                                ][orderLevel]
                            }</View> : ''
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
        margin: 8,
        fontWeight: '600',
    },
    customButton: {
        margin: 8,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'royalblue',
        alignItems: 'center',
        borderRadius: 8,
    },
    customButtonText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'justify'
    },
    selectedPayment: {
        backgroundColor: 'goldenrod',
    },
    unselectedPayment: {
        backgroundColor: 'dimgray'
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
    },
    baseModalText: {
        color: '#eee',
        textAlign: 'center'
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