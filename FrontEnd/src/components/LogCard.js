import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Modal,
    Backdrop,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// API
import { sendLog } from '../lib/api';

const useStyles = makeStyles(() => ({
    paper: {
        paddingBottom: "1rem",
        paddingTop: "1rem"
    },
    list: {
        overflow: "auto",
        maxHeight: "50vh"
    },
    listItem: {
        '&:hover': {
            background: "lightgrey",
        },
    },
    logBtnActive: {
        backgroundColor: "black",
        color: "white",
        '&:hover': {
            background: "darkgrey",
        },
    },
    logBtnSent: {
        backgroundColor: "black",
        color: "white",
        '&:hover': {
            background: "black",
            cursor: "pointer!important",
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const LogCard = ({ log, topics }) => {
    const classes = useStyles();
    const [showLog, setShowLog] = useState(false)
    const [showSend, setShowSend] = useState(true)
    const [loading, setLoading] = useState(false)
    const [showSent, setShowSent] = useState(false)
    const [open, setOpen] = useState(false);

    // Date and Time
    let dateArray = log.time.split('T');
    let date = dateArray[0];
    let timeStr = dateArray[1];
    let timeArray = timeStr.split(':');
    let time = timeArray[0] + ":" + timeArray[1];
    // Title (temp)
    let gameArray = log.game.split('|')
    let titleArray = gameArray[gameArray.length - 1].split(';');
    let title = titleArray[0] + ' ' + titleArray[titleArray.length - 1];


    const handleShowLog = () => {
        setShowLog(true)
        setOpen(true)
    }
    const handleHideLog = () => {
        setShowLog(false)
        setOpen(false)
    }
    const handleSendLog = async () => {
        setShowSend(false)
        setLoading(true)
        const res = await sendLog(log._id)
        if (res === 'Sent') {
            setLoading(false)
            setShowSent(true)
        } else {
            setLoading(false)
            console.log(res);
        }
    }

    return (
        <Grid item xs={6} sm={4}>
            <Paper elevation={2} className={classes.paper} >
                <Typography variant="h5" gutterBottom className={classes.title}>
                    {title}
                </Typography>
                {showLog ?
                    <Button variant="outlined" onClick={handleHideLog} className={classes.logBtnActive}>Hide Log</Button> :
                    <Button variant="outlined" onClick={handleShowLog} color="primary" className={classes.btn}>Show Log</Button>
                }
                <Modal
                    className={classes.modal}
                    open={open}
                    onClose={handleHideLog}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Paper>
                        <List className={classes.list}>
                            {log.data.map((log, index) => {
                                return <ListItem key={index} className={classes.listItem}>
                                    <ListItemText>{log}</ListItemText>
                                </ListItem>
                            })}
                        </List>
                    </Paper>
                </Modal>
                <Typography variant="subtitle1">
                    <b>Date:</b> {date}
                </Typography>
                <Typography variant="subtitle1">
                    <b>Time:</b> {time}
                </Typography>
                {
                    showSend &&
                    <Button variant="outlined" onClick={handleSendLog} className={classes.btn} color="primary" >Send Log</Button>
                }
                {
                    loading &&
                    <CircularProgress />
                }
                {
                    showSent &&
                    <Button variant="outlined" className={classes.logBtnSent} >Log Sent</Button>
                }
            </Paper>
        </Grid>
    )
}
export default LogCard;