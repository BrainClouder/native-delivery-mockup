const selectRestaurant: string = 'SELECT-RESTAURANT';
const refreshWidth: string = 'REFRESH-WIDTH';
const toggleShow: string = 'TOGGLE-SHOW';
const cartRemoveItem: string = 'CART-REMOVE-ITEM';
const cartAdd: string = 'ADD-CART-ITEM';
const updateUser: string = 'UPDATE-USER';
const clearCart: string = 'CLEAR-CART';

const changeSelectedItem: string ='CHANGE-ITEM-SELECTED';



export const ACTIONS = {
    selectRestaurant, refreshWidth, toggleShow, cartRemoveItem, cartAdd,
    updateUser, changeSelectedItem, clearCart
}

export type TmainState = {
    restFeed: {
        name: string,
        category: string,
        rating: number,
        image: number,
        imageAttribution: string,
        deliveryFee: number,
        promo: boolean,
        isOpen: boolean,
      }[],
    selectedRestaurant: number,
    showMode: boolean,
    itemSelected: {name: string, desc: string, prices: number[]},
    cartList: {name: string, desc: string, price: number, restaurant: number}[] | [],
    userInfo:{
        name: string, 
        age: number, 
        selectedAddress: number, 
        address: string[],
        image: string, 
        deliveries: number    
      },
}