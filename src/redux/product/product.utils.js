export const calculateRentalFee = (productList, item) => {
    const { productCode, rentPeriod } = item;
    const productExist = productList.find(item => item.code === productCode);

    let rentalFee;
    if(productExist) {
        rentalFee = Number(productExist.price) * rentPeriod;
    }

    return {...productExist, rentalFee: rentalFee};
}