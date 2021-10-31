import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, FormHelperText, FormControl, Select, Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { addItemForBooking, confirmItemForBooking } from '../../../redux/product/product.actions';
import { createStructuredSelector } from 'reselect';
import { selectProductItems, selectProductCart } from '../../../redux/product/product.selectors';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    color: 'black',
    backgroundColor: 'white'
  },
  dateArea: {
    width: 320,
    marginTop: '20px',
    marginBottom: '20px',
    outline: 'none',
    fontSize: '18px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  formTextHelper: {
      color: '#ffffff'
  }
}));

function BookingModal({ productItems, productCart, addItem, submitItem, isModelOpen }) {
  const classes = useStyles();
  const [category, setcategory] = useState('');
  const [updateToday, setUpdateToday] = useState('');
  const [updateTomorrow, setUpdateTomorrow] = useState('');
  const [productCode, setProductCode] = useState('');

  const today = new Date().toISOString().split("T")[0];
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow = tomorrow.toISOString().split("T")[0];

  React.useEffect(() => {
    setUpdateToday(today);
    setUpdateTomorrow(tomorrow);
  },[]);

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const calcRentPeriod = (todayForCalc, tomorrowForCalc) => {
    const diffInTime = new Date(tomorrowForCalc).getTime() - new Date(todayForCalc).getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(productCart && productCart.minimum_rent_period < calcRentPeriod(updateToday, updateTomorrow)) {
      submitItem(productCart);
      return true;
    }else {
      return false;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className={classes.formControl}>
        <Select
          value={category}
          onChange={(e) => {
            handleChange(e);
            setProductCode(e.target.value);
            const rentPeriod = calcRentPeriod(updateToday, updateTomorrow);
            addItem({ productCode: e.target.value,
               rentPeriod, 
               rent_start_date: updateToday, 
               rent_expiry_date: updateTomorrow});
          }}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
          required
        >
          <MenuItem value="" disabled>
            Select Category
          </MenuItem>
          {
            productItems
              .filter((data => data.availability === true))
              .map((data, idx) => (
              <MenuItem 
                key={idx} 
                value={data.code}
              >
                {data.name} / {data.code}
              </MenuItem>
            ))
          }
        </Select>
        <FormHelperText className={classes.formTextHelper}>Select your desired category</FormHelperText>
        <div className={classes.dateArea}>
          <input type="date" id="launch-day" name="launch-day" min={today} max="2040-12-31" defaultValue={today} 
            onChange={(event) => {
              setUpdateToday(event.target.value);
              const rentPeriod = calcRentPeriod(event.target.value, updateTomorrow);
              addItem({ productCode, 
                rentPeriod, 
                rent_start_date: updateToday, 
                rent_expiry_date: updateTomorrow});
            }}
          />
          <span>to</span>
          <input type="date" id="launch-day" name="launch-day" min={tomorrow} max="2040-12-31" defaultValue={tomorrow} 
            onChange={(event) => {
              setUpdateTomorrow(event.target.value);
              const rentPeriod = calcRentPeriod(updateToday, event.target.value);
              addItem({ productCode, 
                rentPeriod, 
                rent_start_date: updateToday, 
                rent_expiry_date: updateTomorrow});
            }}
          />
        </div>
        <div>
          {
            productCart && productCart?.code === productCode && `Product's price is $${productCart?.rentalFee}`
          }
        </div>
        <div>
          {
            productCart && productCart.minimum_rent_period < calcRentPeriod(updateToday, updateTomorrow) && `Product is ready fo Rent`
          }
        </div>
        <Button 
          type='submit' 
          variant={
            productCart && productCart.minimum_rent_period < calcRentPeriod(updateToday, updateTomorrow)
            ? "contained" 
            : "outlined"
          }
          color={
            productCart && productCart.minimum_rent_period < calcRentPeriod(updateToday, updateTomorrow)
            ? "primary" 
            : "secondary"
          }
          >
            <b>
              {
                productCart && productCart.minimum_rent_period < calcRentPeriod(updateToday, updateTomorrow) 
                  ? 'Submit' 
                  : 'Please Extend your rent period!'
              }
            </b>
          </Button>
      </FormControl>
    </form>
  );
};

const mapStateToProps = createStructuredSelector(
  {
    productItems: selectProductItems,
    productCart: selectProductCart
  }
);

const mapDispatchToProps = dispatch => (
  {
    addItem: (item) => dispatch(addItemForBooking(item)),
    submitItem: (item) => dispatch(confirmItemForBooking(item))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);