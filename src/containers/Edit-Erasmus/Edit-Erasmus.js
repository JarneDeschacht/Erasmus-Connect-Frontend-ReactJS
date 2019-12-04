import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import { Redirect } from "react-router-dom";
import {
    checkValidity,
    updateObject,
} from "../../shared/utility";
import classes from './Edit-Erasmus.module.css';

const EditErasmus = () => {

    let [shouldRedirect, setShouldRedirect] = useState(false);
    let [allControlsAreValid, setAllControlsAreValid] = useState(true);
    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const onNavbarDisplaySwitch = useCallback(
        () => dispatch(actions.navbarSwitchDisplay()),
        [dispatch]
    );
    const profile = useSelector(state => state.student.profile);
    const countries = useSelector(state => state.country.countries);
    const onFetchCountries = useCallback(
        () => dispatch(actions.fetchCountries()),
        [dispatch]
    );
    const token = localStorage.getItem('token');
    const onEditErasmus = data => dispatch(actions.editErasmus(token, data));


    const [editErasmusForm, setEditErasmusForm] = useState({
        homeCourse: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Course"
            },
            value: profile.homeCourse,
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        erasmusCourse: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Course"
            },
            value: profile.erasmusCourse,
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        homeCountry: {
            elementType: "select",
            value: profile.homeUniversity.city.country.id,
            elementConfig: {
                placeholder: "Country"
            },
            validation: {},
            valid: true,
            touched: true
        },
        erasmusCountry: {
            elementType: "select",
            value: profile.erasmusUniversity.city.country.id,
            elementConfig: {
                placeholder: "Country"
            },
            validation: {},
            valid: true,
            touched: true
        },
        homeCityName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "City"
            },
            value: profile.homeUniversity.city.name,
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        erasmusCityName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "City"
            },
            value: profile.erasmusUniversity.city.name,
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        homeUniversityName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "University"
            },
            value: profile.homeUniversity.name,
            validation: {
                required: true
            },
            valid: true,
            touched: true
        },
        erasmusUniversityName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "University"
            },
            value: profile.erasmusUniversity.name,
            validation: {
                required: true
            },
            valid: true,
            touched: true
        }
    });

    useEffect(() => {
        onFetchCountries();
    }, [onFetchCountries]);

    useEffect(() => {
        if (!isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);


    let formElementsArray = [];
    let editForm = null;
    for (let key in editErasmusForm) {
        formElementsArray.push({
            id: key,
            config: editErasmusForm[key]
        });
    }

    const inputChangedHandler = (event, controlName) => {
        let enteredValue = event.target.value;

        const updatedControls = updateObject(editErasmusForm, {
            [controlName]: updateObject(editErasmusForm[controlName], {
                value: enteredValue,
                valid: checkValidity(
                    enteredValue,
                    editErasmusForm[controlName].validation
                ),
                touched: true
            })
        });

        let valid = true;

        for (let inputIdentifier in updatedControls) {
            valid = updatedControls[inputIdentifier].valid && valid;
        }

        valid = updatedControls.homeCountry.value !== "" && valid;
        valid = updatedControls.erasmusCountry.value !== "" && valid;

        setAllControlsAreValid(valid);
        setEditErasmusForm(updatedControls);
    };

    const onSubmit = event => {
        event.preventDefault();

        const data = {
            homeCourse: editErasmusForm.homeCourse.value,
            erasmusCourse: editErasmusForm.erasmusCourse.value,
            homeCountryId: editErasmusForm.homeCountry.value.toString(),
            erasmusCountryId: editErasmusForm.erasmusCountry.value.toString(),
            homeCity: editErasmusForm.homeCityName.value,
            erasmusCity: editErasmusForm.erasmusCityName.value,
            homeUniversity: editErasmusForm.homeUniversityName.value,
            erasmusUniversity: editErasmusForm.erasmusUniversityName.value
        }
        onEditErasmus(data);
        setShouldRedirect(true) //has to be improved
    };

    let redirect = null;
    if (shouldRedirect) {
        redirect = <Redirect to="/my-profile" />
    }

    let formInputs = formElementsArray.map((el, index) => {
        return (
            <Input
                label={el.config.elementConfig.placeholder}
                className={classes.RegisterElement}
                key={el.id}
                id={el.id}
                invalid={!el.config.valid}
                elementType={el.config.elementType}
                elementConfig={el.id.includes('Country') ? { 'options': countries } : el.config.elementConfig}
                changed={(event) => { inputChangedHandler(event, el.id) }}
                shouldValidate={el.config.validation}
                errorMessage={"Please enter a valid " + el.config.elementConfig.placeholder}
                touched={el.config.touched}
                value={el.config.value}
            />
        );
    });

    formInputs.unshift((<h2 key="subtitleErasmus" className={classes.SubTitle}>Erasmus</h2>));
    formInputs.unshift((<h2 key="subtitleHome" className={classes.SubTitle}>Home</h2>));

    editForm = (
        <form className={classes.Form}>
            <div className={classes.EditErasmusForm}>{formInputs}</div>
            <div className={classes.ButtonRow}>
                <Button
                    clicked={(event) => { onSubmit(event) }}
                    disabled={!allControlsAreValid}
                >Update Erasmus
                </Button>
            </div>
        </form>
    );

    return (
        <div className={classes.EditErasmus}>
            {redirect}
            <h1>Edit Your Erasmus Program</h1>
            {/* {errorMessage} */}
            {editForm}
        </div>
    );
}

export default EditErasmus;