import React from 'react';
import {
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    table: {
        maxHeight: "90vh"
    },
}));


const AnalyticsData = ({ stream, topic }) => {
    const classes = useStyles();


    return (
        <Grid item xs  >
            <TableContainer component={Paper}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                    {topic}
                </Typography>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stream &&
                            stream.slice(0).reverse().map((stream, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">{stream.data}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}
export default AnalyticsData;