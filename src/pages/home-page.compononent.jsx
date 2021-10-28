import React from "react";
import { Grid } from "@material-ui/core";

import ProductTable from "../components/product-table/product-table.component";
import BookingButton from "../components/buttons/booking/booking-button.component";


export default function HomePage() {
    return (
        <Grid container justifyContent='center' alignItems='center'>
            <Grid item md={12}>
                <ProductTable />
            </Grid>
            <Grid item md={12}>
                <BookingButton />
            </Grid>
        </Grid>
    )
};