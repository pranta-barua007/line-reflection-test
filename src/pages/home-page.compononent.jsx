import React from "react";
import { Container, Grid } from "@material-ui/core";
import AddCircleOutlineIconon from '@material-ui/icons/AddCircleOutline';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectProductBookings } from "../redux/product/product.selectors";

import BookingModal from '../components/modals/booking-modal/booking-modal.component';
import ReturnModal from "../components/modals/return-modal/return-modal.component";
import ProductTable from "../components/product-table/product-table.component";
import CustomPopUpButton from "../components/buttons/custom-popup-button.component";

function HomePage({ bookingItems }) {
    return (
        <Container>
            <Grid container justifyContent='center' alignItems='center' spacing={1}>
                <Grid item md={12}>
                    <ProductTable />
                </Grid>
                <Grid item align='right' md={10}>
                    <CustomPopUpButton PopUpModal={BookingModal} CustomIcon={AddCircleOutlineIconon} buttonName={'Book Item'}/>
                </Grid>
                <Grid item align='right' md={2}>
                    <CustomPopUpButton 
                        PopUpModal={ReturnModal} 
                        CustomIcon={KeyboardReturnIcon} 
                        buttonName={'Return Item'}
                        disabled={bookingItems.length > 0 ? false : true}
                    />
                </Grid>
            </Grid>
        </Container>
    )
};

const mapStateToProps = createStructuredSelector(
    {
        bookingItems : selectProductBookings
    }
);

export default connect(mapStateToProps, null)(HomePage);