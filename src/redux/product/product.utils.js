export const calculateCredentialOfCart = (productList, item) => {
    const { productCode, rentPeriod, rent_start_date, rent_expiry_date } = item;
    const productExist = productList.find(item => item.code === productCode);

    let rentalFee, calcMilage;
    if(productExist) {
        rentalFee = Number(productExist.price) * rentPeriod;
        calcMilage = rentPeriod*10;

        if(productExist.mileage !== null) {
            calcMilage = productExist.mileage + calcMilage;
        }
    }

    return {
        ...productExist, 
        rentalFee, 
        rentPeriod, 
        rent_start_date, 
        rent_expiry_date, 
        mileage: calcMilage
    };
};

export const removeItemFromBooking = (bokkings, productCode) => {
    return bokkings.filter(item => item.code !== productCode);
};