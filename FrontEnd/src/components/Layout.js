import React from 'react'
import { makeStyles } from '@material-ui/core'
import Navbar from './Navbar'

const useStyles = makeStyles({
    page: {
        width: '100%'
    }
})

export default function Layout({ children }) {
    const classes = useStyles()

    return (
        <div>
            {/* Navbar */}
            <Navbar />
            {/* side drawer */}
            {/* main content */}
            <div className={classes.page}>
                {children}
            </div>
        </div>
    )
}