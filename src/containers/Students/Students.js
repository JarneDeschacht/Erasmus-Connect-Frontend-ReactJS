import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import { NavLink } from 'react-router-dom';
import classes from './Students.module.css';
import SearchResult from '../../components/Student/Search-Result/Search-Result';
import Spinner from '../../components/UI/Spinner/Spinner';

const Students = props => {

    const dispatch = useDispatch();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const onNavbarDisplaySwitch = useCallback(() => dispatch(actions.navbarSwitchDisplay()), [dispatch]);
    const students = useSelector(state => state.student.students);
    const isLoading = useSelector(state => state.student.loading);
    const onFetchStudents = useCallback((token, userId) => dispatch(actions.fetchStudents(token, userId)), [dispatch]);


    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

    useEffect(() => {
        onFetchStudents(token, userId);
    }, [onFetchStudents, token, userId]);

    const studentSelectHandler = (id) => {
        props.history.push({ pathname: '/students/' + id });
    }

    let results = <Spinner />

    if (!isLoading) {
        const searchResults = students.map(student => (
            <SearchResult
                key={student.id}
                clicked={() => studentSelectHandler(student.id)}
                student={{
                    name: `${student.firstName} ${student.lastName}`,
                    school: student.erasmusUniversity.name || '-----',
                    location: `${student.erasmusUniversity.city.name || '-----'}, ${student.erasmusUniversity.city.country.name || '-----'} (${student.erasmusUniversity.city.country.code || '-----'})`,
                    imageUrl: student.imageUrl
                }}
            />
        ))
        results = (
            <div className={classes.SearchResults}>
                {searchResults}
            </div>);
    }
    return (
        <div className={classes.Students}>
            <NavLink className={classes.GoBack} to="/">Go back</NavLink>
            <h1>Search results</h1>
            {
                results
            }
        </div>
    )
}

export default Students;