import React, { useEffect } from 'react'
import {useDispatch} from 'react-redux'
import classes from './ExistingChats.module.css'
import * as actions from '../../../store/actions/index'

const ExistingChats = props => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    const onFetchConnections = userId => dispatch(actions.getConnections(userId))

  
  
    useEffect(() => {
        onFetchConnections(userId)
    })


    return (
        <div className={classes.ExistingChats}>
            ExistingChats
        </div>
    )
}

export default ExistingChats;