const selectRestaurant: string = 'SELECT-RESTAURANT';
const refreshWidth: string = 'REFRESH-WIDTH';
const toggleShow: string = 'TOGGLE-SHOW';

export const ACTIONS = {
    selectRestaurant, refreshWidth, toggleShow
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
    windowWidth: number,
    showMode: boolean,

}