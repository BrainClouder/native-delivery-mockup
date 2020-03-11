import React from 'react';
import { View, Text, Button } from 'react-native';
import { TmainState, ACTIONS } from '../../store/actions/main';
import { connect } from 'react-redux';

interface ICheckoutModal {
    Link: (e: number) => void;
    confirmOrder: (e: any) => void;
    selected: number;
    checkoutCart: any;
    cartList: any;
    
}

const CheckoutModal: React.FC<ICheckoutModal> = ({Link,  confirmOrder, checkoutCart, cartList, selected})  => {
    console.log(checkoutCart)
    return (
        <View>
            <View>
                {cartList.map((e: any) => <Text>
                   {e.units} {e.name}  {e.opts.length > 0 ? '+ addons ' : ''}for ${e.price}
                </Text>)}                
            </View>
            <View>
                <Text>
                    You will be charged with: ${checkoutCart.totalPrice}
                </Text>
                <Text>
                    Payment method: {checkoutCart.paymentCategory} with {checkoutCart.paymentMethod}
                </Text>
                <Text>
                    Deliver to address: {checkoutCart.address}
                </Text>
            </View>
            <Button title="finish my order" color="crimson" onPress={() => {
                let a = checkoutCart;
                a.checkout = true;
                confirmOrder(a);
                Link(2);
            }} />
            <Button title="go back" color="royalblue" onPress={() => Link(0)} />
        </View>
    )
}


const mapStateToProps = (state: TmainState) => {
    const t = state;
    return {
        cartList: t.cartList,
        checkoutCart: t.activeOrder,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        removeItem: (e: number) => dispatch({ type: ACTIONS.cartRemoveItem, payload: e }),
        confirmOrder: (e: any) => dispatch({type: ACTIONS.setCheckoutCart, payload: e}),
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);