import React from 'react';
import { View } from 'react-native';
import { TmainState, ACTIONS } from '../../store/actions/main';
import { connect } from 'react-redux';

interface ICheckoutModal {
    Link: (e: number) => void;
    
}

const CheckoutModal: React.FC<ICheckoutModal> = ({Link})  => {

    return (
        <View>
            
        </View>
    )
}


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


export default connect(mapStateToProps, mapDispatchToProps)(CheckoutModal);