const selectRestaurant: string = 'SELECT-RESTAURANT';
const refreshWidth: string = 'REFRESH-WIDTH';
const toggleShow: string = 'TOGGLE-SHOW';
const cartRemoveItem: string = 'CART-REMOVE-ITEM';
const cartAdd: string = 'ADD-CART-ITEM';
const updateUser: string = 'UPDATE-USER';
const clearCart: string = 'CLEAR-CART';

const changeSelectedItem: string = 'CHANGE-ITEM-SELECTED';



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
    time: string,
    promo: boolean,
    isOpen: boolean,
  }[],
  showMode: boolean,
  itemSelected: { name: string, desc: string, prices: number[] },
  cartList: TcartList,
  userInfo: {
    name: string,
    age: number,
    selectedAddress: number,
    address: string[],
    image: string,
    deliveries: number
  },
}

export type TcartList = {
  name: string,
  desc: string,
  price: number,
  units: number,
  opts: [string, number][],
  numberOpts: number[],
  comment: string,
}[];
