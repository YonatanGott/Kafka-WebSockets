import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core'
import {
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Drawer,
    Typography,
    AppBar, Toolbar, IconButton
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom'
import ClearAllIcon from '@material-ui/icons/ClearAll';
import NotesIcon from '@material-ui/icons/Notes';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles({
    page: {
        width: '100%',
    },
    drawer: {
        width: "250px"
    },
    appBar: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: "2rem",
    },
    pageTitle: {
        fontWeight: 500,
    },
    listTitle: {
        marginTop: '1rem'
    },
    listItem: {
        '&:hover': {
            background: "cyan",
        },
    },
    active: {
        background: 'lightgrey',
        color: 'black,'
    },
})

export default function Layout({ children }) {
    const classes = useStyles()
    const history = useHistory()
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState('Home')
    const [openDrawer, setOpenDrawer] = useState(false)

    const menuItems = [
        {
            text: 'Home',
            icon: <HomeIcon />,
            path: '/'
        },
        {
            text: 'Real Time Graphs',
            icon: <ShowChartIcon />,
            path: '/graphs'
        },
        {
            text: 'Analytics',
            icon: <EqualizerIcon />,
            path: '/analytics'
        },
        {
            text: 'Game Logs',
            icon: <NotesIcon />,
            path: '/gameLogs'
        },
    ];
    return (
        <div>
            {/* Navbar */}
            <AppBar
                position="sticky"
                className={classes.appBar}
                color="primary"
            >
                <Toolbar>
                    <IconButton edge="start" onClick={() => setOpenDrawer(true)} className={classes.menuButton} color="inherit" aria-label="menu">
                        <ClearAllIcon />
                    </IconButton>
                    <Typography className={classes.pageTitle} variant="h5">
                        {currentPage}
                    </Typography>
                </Toolbar>
            </AppBar>
            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <div>
                    <Typography variant="h5" className={classes.listTitle}>
                        Dashboard
                    </Typography>
                </div>
                {/* links/list section */}
                <List className={classes.drawer}>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            value={item.text}
                            onClick={() => {
                                setCurrentPage(item.text);
                                history.push(item.path);
                                setOpenDrawer(false);
                            }}
                            className={location.pathname === item.path ? classes.active : classes.listItem}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {/* main content */}
            <div className={classes.page}>
                {children}
            </div>
        </div>
    )
}