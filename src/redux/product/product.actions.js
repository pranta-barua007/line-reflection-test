import {productActionTypes} from './product.types';

export const addItemForBooking = item => {
    return (
        {
            type: productActionTypes.ADD_ITEM_FOR_BOOKING,
            payload: item
        }
    )
};