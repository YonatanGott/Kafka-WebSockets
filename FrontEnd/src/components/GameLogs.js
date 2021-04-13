import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    LinearProgress,
} from '@material-ui/core';
import LogCard from './LogCard';
// API
import { getAllLogs } from '../lib/api'
import { makeStyles } from '@material-ui/core/styles';
import Pagination from "@material-ui/lab/Pagination";


const useStyles = makeStyles(() => ({
    logs: {
        marginTop: "2rem",
    }
}));


const GameLogs = () => {
    const classes = useStyles();
    const [logs, setLogs] = useState([])
    const [pages, setPages] = useState(0)
    //const [pageItems, setPageItems] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [showPagination, setShowPagination] = useState(true);
    const [loading, setLoading] = useState(false);

    const getLogs = async () => {
        const data = await getAllLogs()
        setLogs(data.logs);
        let pages = Math.floor(data.numLogs / 12);
        setPages(pages)
        if (pages > 1) {
            setShowPagination(true)
        }
    };

    // Pagination
    const handleChangePage = (event, value) => {
        setLoading(true);
        setCurrentPage(value);
        setLoading(false);
    };

    useEffect(() => {
        getLogs();
    }, [])
    return (
        <Container>
            <Grid
                className={classes.logs}
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
            >
                {
                    loading &&
                    <LinearProgress />
                }
                {
                    logs.map((log) => {
                        return <LogCard log={log} key={log._id} />
                    })
                }
                {showPagination && (
                    <Pagination
                        count={pages}
                        page={currentPage}
                        variant="outlined"
                        shape="rounded"
                        onChange={handleChangePage}
                    />
                )}
            </Grid>
        </Container>
    )
}
export default GameLogs;