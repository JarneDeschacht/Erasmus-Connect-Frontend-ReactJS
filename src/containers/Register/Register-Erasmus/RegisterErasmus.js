import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../store/actions/index';
import classes from './RegisterErasmus.module.css';
import Input from '../../../components/UI/Input/Input';
import {
    updateObject,
    checkValidity
} from '../../../shared/utility';
import FilePicker from '../../../components/UI/Input/FilePicker/FilePicker';
import { generateBase64FromImage } from '../../../shared/image';
import ImagePreview from '../../../components/UI/ImagePreview/ImagePreview';
import Button from '../../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';

const RegisterErasmus = props => {

    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);

    const onNavbarDisplaySwitch = useCallback(
        () => dispatch(actions.navbarSwitchDisplay()),
        [dispatch]
    );

    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);
    const [registerForm, setRegisterForm] = useState({
        homeCourse: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Course"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        erasmusCourse: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Course"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        homeUniversityName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "University"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        erasmusUniversityName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "University"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        homeCityName: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "City"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        erasmusCity: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "City"
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        homeCityZipcode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Zipcode"
            },
            value: "",
            validation: {
                required: true,
                isNumeric: true
            },
            valid: false,
            touched: false
        },
        erasmusCityZipcode: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Zipcode"
            },
            value: "",
            validation: {
                required: true,
                isNumeric: true
            },
            valid: false,
            touched: false
        }
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    let [allControlsAreValid, setAllControlsAreValid] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const inputChangedHandler = (event, controlName) => {
        let enteredValue = event.target.value;

        const updatedControls = updateObject(registerForm, {
            [controlName]: updateObject(registerForm[controlName], {
                value: enteredValue,
                valid: checkValidity(
                    enteredValue,
                    registerForm[controlName].validation
                ),
                touched: true
            })
        });

        let valid = true;

        for (let inputIdentifier in updatedControls) {
            valid = updatedControls[inputIdentifier].valid && valid;
        }

        setAllControlsAreValid(valid);
        setRegisterForm(updatedControls);
    };

    let formElementsArray = [];
    //creating an array with an object for each form control
    for (let key in registerForm) {
        formElementsArray.push({
            id: key,
            config: registerForm[key]
        });
    }

    let errorMessage = null;
    let regForm = null;
    let redirect = null;

    if (shouldRedirect) {
        redirect = <Redirect to="/" />
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
                elementConfig={el.config.elementConfig}
                changed={(event) => { inputChangedHandler(event, el.id) }}
                shouldValidate={el.config.validation}
                errorMessage={"Please enter a valid " + el.config.elementConfig.placeholder}
                touched={el.config.touched}
                value={el.config.value}
            />
        );
    });

    const fileSelectedHandler = (input, value, files) => {
        if (files) {
            generateBase64FromImage(files[0])
                .then(b64 => {
                    setImagePreview(b64);
                })
                .catch(e => {
                    setImagePreview(null);
                });
        }
    }

    formInputs.unshift((<h2 key="subtitleErasmus" className={classes.SubTitle}>Erasmus</h2>));
    formInputs.unshift((<h2 key="subtitleHome" className={classes.SubTitle}>Home</h2>));

    regForm = (
        <form className={classes.Form}>
            <div>
                <div className={classes.ImagePreview}>
                    {!imagePreview && <p>Please choose an image.</p>}
                    {imagePreview && (
                        <ImagePreview imageUrl={imagePreview} />
                    )}
                </div>
                <FilePicker
                    id="image"
                    label="Upload Profile Picture"
                    control="input"
                    onChange={fileSelectedHandler}
                    onBlur={() => { }}
                    valid={true}
                    touched={true}
                />
            </div>
            <div className={classes.RegisterErasmusForm}>{formInputs}</div>
            <div />
            <div className={classes.ButtonRow}>
                <Button
                    clicked={() => { }}
                    disabled={!allControlsAreValid}
                >Save</Button>
                <p onClick={() => setShouldRedirect(true)}>Or Complete Later</p>
            </div>
        </form>
    );

    return (
        <div className={classes.RegisterErasmus}>
            {redirect}
            <h1>Your Erasmus Program</h1>
            {errorMessage}
            {regForm}
        </div>
    );
}

export default RegisterErasmus;