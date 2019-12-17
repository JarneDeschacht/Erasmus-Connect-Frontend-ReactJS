import React from 'react'
import classes from './PageNotFound.module.css'
import { NavLink } from 'react-router-dom'

const PageNotFound = (props) => {
    const token = localStorage.getItem("token");

    if(!token)
    {
        props.history.push("/");
    }
    return (
        <div className={classes.PNF}>
            <div>
                <h1>Page not found</h1>
                <p>It looks like you did an oopsie</p>
                <p>Go back <NavLink className={classes.Link} to="/" exact>home</NavLink></p>
            </div>
        </div>
    )
}

export default PageNotFound
