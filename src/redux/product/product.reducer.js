import { productActionTypes } from './product.types';
import productJsonData from '../../data/product-data.json';
import { calculateRentalFee } from './product.utils';

const INITIAL_STATE = {
    items : productJsonData,
    booking: null,
}

const productReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case productActionTypes.ADD_ITEM_FOR_BOOKING:
            return {
                ...state,
                booking: calculateRentalFee(state.items, action.payload)
            }
        default:
            return state;
    }
};

export default productReducer;