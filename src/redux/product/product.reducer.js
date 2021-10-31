import { productActionTypes } from './product.types';
import productJsonData from '../../data/product-data.json';
import { calculateCredentialOfCart, removeItemFromBooking } from './product.utils';

const INITIAL_STATE = {
    items : productJsonData,
    cart: null,
    bookings: []
}

const productReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case productActionTypes.ADD_ITEM_FOR_BOOKING:
            return {
                ...state,
                cart: calculateCredentialOfCart(state.items, action.payload)
            }
        case productActionTypes.CONFIRM_ITEM_FOR_BOOKING:
            return {
                ...state,
                bookings: [...state.bookings, action.payload]
            }
        case productActionTypes.REMOVE_ITEM_FROM_BOOKING:
            return {
                ...state,
                bookings: removeItemFromBooking(state.bookings, action.payload)
            }
        default:
            return state;
    }
};

export default productReducer;