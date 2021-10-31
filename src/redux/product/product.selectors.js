import { createSelector } from 'reselect';

const selectProduct = state => state.product;

export const selectProductItems = createSelector(
    [selectProduct],
    (product) => product.items
);

export const selectProductCart = createSelector(
    [selectProduct],
    (product) => product.cart
);

export const selectProductBookings = createSelector(
    [selectProduct],
    (product) => product.bookings
);
