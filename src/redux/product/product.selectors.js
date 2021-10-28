import { createSelector } from 'reselect';

const selectProduct = state => state.product;

export const selectProductItems = createSelector(
    [selectProduct],
    (product) => product.items
);

export const selectProductBooking = createSelector(
    [selectProduct],
    (product) => product.booking
);
