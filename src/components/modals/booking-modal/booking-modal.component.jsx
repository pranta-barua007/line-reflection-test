import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, FormHelperText, FormControl, Select, Button } from '@material-ui/core';

import { connect } from 'react-redux';
import { addItemForBooking } from '../../../redux/product/product.actions';
import { createStructuredSelector } from 'reselect';
import { selectProductItems, selectProductBooking } from '../../../redux/product/product.selectors';

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

function BookingModal({ productItems, productBooking, addItem }) {
  const classes = useStyles();
  const [category, setcategory] = useState('');
  const [updateToday, setUpdateToday] = useState('');
  const [updateTomorrow, setUpdateTomorrow] = useState('');
  const [productCode, setProductCode] = useState('');

  const today = new Date().toISOString().split("T")[0];
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1 || productBooking?.minimum_rent_period);
  tomorrow = tomorrow.toISOString().split("T")[0];

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const diffInTime = new Date(updateTomorrow ? updateTomorrow : tomorrow).getTime() - new Date(updateToday ? updateToday : today).getTime();
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    addItem({ productCode: productCode, 
      rentPeriod: diffInDays});
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl className={classes.formControl}>
        <Select
          value={category}
          onChange={(e) => {
            handleChange(e);
            setProductCode(e.target.value);
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
            onChange={(event) => setUpdateToday(event.target.value)}
          />
          <span>to</span>
          <input type="date" id="launch-day" name="launch-day" min={tomorrow} max="2040-12-31" defaultValue={tomorrow} 
            onChange={(event) => setUpdateTomorrow(event.target.value)}
          />
        </div>
        <div>
         {productBooking && `Product's price is $${productBooking?.rentalFee}`}
        </div>
        <Button type='submit' variant="contained" color="primary">Submit</Button>
      </FormControl>
    </form>
  );
};

const mapStateToProps = createStructuredSelector(
  {
    productItems: selectProductItems,
    productBooking: selectProductBooking
  }
);

const mapDispatchToProps = dispatch => (
  {
    addItem: (item) => dispatch(addItemForBooking(item))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);