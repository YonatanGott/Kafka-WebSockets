import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
    BrowserRouter as Router,
    NavLink,
    Switch, Route
} from "react-router-dom";
import Home from './Home';
import GameLogs from './GameLogs';
import Analytics from './Analytics';
import Graphs from './Graphs';

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    link: {
        flexGrow: 1,
    },
}));

const activeLink = {
    color: "white",

}
const Navbar = () => {
    const classes = useStyles();


    return (
        <div className={classes.root}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <NavLink exact to="/" className={classes.link} activeStyle={activeLink} >
                            <Typography variant="h6" className={classes.title}>
                                Home
                        </Typography>
                        </NavLink>
                        <NavLink to="/graphs" className={classes.link} activeStyle={activeLink} >
                            <Typography variant="h6" className={classes.title}>
                                Real Time Graphs
                        </Typography>
                        </NavLink>
                        <NavLink to="/analytics" className={classes.link} activeStyle={activeLink} >
                            <Typography variant="h6" className={classes.title}>
                                Analytics
                        </Typography>
                        </NavLink>
                        <NavLink to="/gameLogs" className={classes.link} activeStyle={activeLink} >
                            <Typography variant="h6" className={classes.title}>
                                Game Logs
                        </Typography>
                        </NavLink>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/gameLogs">
                        <GameLogs />
                    </Route>
                    <Route path="/analytics">
                        <Analytics />
                    </Route>
                    <Route path="/graphs">
                        <Graphs />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default Navbar;