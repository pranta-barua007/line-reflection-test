import {productActionTypes} from './product.types';

export const addItemForBooking = item => {
    return (
        {
            type: productActionTypes.ADD_ITEM_FOR_BOOKING,
            payload: item
        }
    )
};

export const confirmItemForBooking = item => {
    return (
        {
            type: productActionTypes.CONFIRM_ITEM_FOR_BOOKING,
            payload: item
        }
    )
};

export const returnItemFromBooking = item => {
    return (
        {
            type: productActionTypes.REMOVE_ITEM_FROM_BOOKING,
            payload: item
        }
    )
}