import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {MenuItem, FormHelperText, FormControl, Select, Button, Typography } from '@material-ui/core';

import { connect } from 'react-redux';
import { returnItemFromBooking } from '../../../redux/product/product.actions';
import { createStructuredSelector } from 'reselect';
import { selectProductBookings } from '../../../redux/product/product.selectors';

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

function ReturnModal({ productBookings, removeBookedItem }) {
  const classes = useStyles();
  const [category, setcategory] = useState('');
  const [productCode, setProductCode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  React.useEffect(() => {
    setSelectedProduct(productBookings.filter(item => item.code === productCode)[0]);
  }, [productBookings, productCode])

  const handleChange = (event) => {
    setcategory(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    removeBookedItem(productCode);
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
            productBookings
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
        <Typography variant='h6' style={{color: 'white'}}>
          Mileage Used {selectedProduct && `${selectedProduct.mileage}`}
        </Typography>
        <Button 
          type='submit' 
          variant="contained"
          color="secondary"
        >
          <b>
              Submit
          </b>
        </Button>
      </FormControl>
    </form>
  );
};

const mapStateToProps = createStructuredSelector(
  {
    productBookings: selectProductBookings
  }
);

const mapDispatchToProps = dispatch => (
  {
    removeBookedItem: (item) => dispatch(returnItemFromBooking(item))
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(ReturnModal);