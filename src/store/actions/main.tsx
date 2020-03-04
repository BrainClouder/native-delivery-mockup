const selectRestaurant: string = 'SELECT-RESTAURANT';
const refreshWidth: string = 'REFRESH-WIDTH';
const toggleShow: string = 'TOGGLE-SHOW';
const cartRemoveItem: string = 'CART-REMOVE-ITEM';
const cartAdd: string = 'ADD-CART-ITEM';
const updateUser: string = 'UPDATE-USER';


export const ACTIONS = {
    selectRestaurant, refreshWidth, toggleShow, cartRemoveItem, cartAdd,
    updateUser, 
}

export type TmainState = {
    restFeed: {
        name: string,
        category: string,
        rating: number,
        image: string,
        deliveryFee: number,
        promo: boolean,
        isOpen: boolean,
      }[],
    selectedRestaurant: number,
    showMode: boolean,
    cartList: {name: string, desc: string, price: number, restaurant: number}[] | [],
    userInfo:{
        name: string, 
        age: number, 
        selectedAddress: number, 
        address: string[],
        image: string, 
        deliveries: number    
      },
      imageRepo: [string, string][]

}