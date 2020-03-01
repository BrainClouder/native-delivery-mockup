const selectRestaurant: string = 'SELECT-RESTAURANT';
const refreshWidth: string = 'REFRESH-WIDTH';

export const ACTIONS = {
    selectRestaurant, refreshWidth
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

}