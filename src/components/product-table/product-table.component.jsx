import React from 'react';
import MaterialTable from '@material-table/core';
import { Container } from '@material-ui/core';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProductItems } from '../../redux/product/product.selectors';

import { tableIcons } from '../../utils/material-table/material-table.config';

function ProductTable({ productItems }) {
    return (
      <Container>  
        <MaterialTable
            style={{borderRadius: '10px', boxShadow: '0 0 28px rgb(0 0 0 / 8%)'}}
            title="Product Table"
            icons={tableIcons}
            columns={[
            { title: 'Code', field: 'code' },
            { title: 'Name', field: 'name' },
            { title: 'Type', field: 'type' },
            { title: 'Availability', field: 'availability' },
            { title: 'Needing repair', field: 'needing_repair' },
            { title: 'Durability', field: 'durability' },
            { title: 'Max Durability', field: 'max_durability' },
            { title: 'Mileage', field: 'mileage' },
            { title: 'Price', field: 'price' },
            { title: 'Minimum rent period', field: 'minimum_rent_period' },
            ]}
            data={ 
              productItems?.map((dataObj) => {
                return {...dataObj}
              })
            }        
            options={{
                selection: true,
                pageSize: 20,
                padding: 'dense',
            }}
            actions={[
            {
                tooltip: 'Remove All Selected Users',
                icon: tableIcons.Delete,
                onClick: (evt, data) => {
                  alert('You want to delete ' + data.length + ' rows');
                  console.log(data)
                }
            }
            ]}
        />
      </Container>
    )
};

const mapStateToProps = createStructuredSelector(
  {
    productItems: selectProductItems
  }
);

export default connect(mapStateToProps, null)(ProductTable);
  