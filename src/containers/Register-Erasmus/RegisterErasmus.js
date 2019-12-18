import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';
import classes from './RegisterErasmus.module.css';
import Input from '../../components/UI/Input/Input';
import {
    updateObject,
    checkValidity
} from '../../shared/utility';
import FilePicker from '../../components/UI/Input/FilePicker/FilePicker';
import Button from '../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const RegisterErasmus = props => {

    const dispatch = useDispatch();
    const isNavbarVisible = useSelector(state => state.navbar.showNavbar);
    const error = useSelector(state => state.student.error);

    const onNavbarDisplaySwitch = useCallback(
        () => dispatch(actions.navbarSwitchDisplay()),
        [dispatch]
    );

    useEffect(() => {
        if (isNavbarVisible) {
            onNavbarDisplaySwitch();
        }
    }, [onNavbarDisplaySwitch, isNavbarVisible]);

    const onRegisterErasmus = (token, userId, formData) => dispatch(actions.registerErasmus(token, userId, formData));
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const countries = useSelector(state => state.country.countries);
    const onFetchCountries = useCallback(
        () => dispatch(actions.fetchCountries()),
        [dispatch]
    );

    useEffect(() => {
        onFetchCountries();
    }, [onFetchCountries]);

    const [registerForm, setRegisterForm] = useState({
        //index 0 - h2 - home
        homeCourse: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Course",
                autoFocus: 'focus'
            },
            value: "",
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        homeCountry: {
            elementType: "select",
            value: "",
            elementConfig: {
                placeholder: "Country"
            },
            validation: {},
            valid: true,
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
        //index 5 - h2 - erasmus
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
        erasmusCountry: {
            elementType: "select",
            value: "",
            elementConfig: {
                placeholder: "Country"
            },
            validation: {},
            valid: true,
            touched: false
        },
        erasmusCityName: {
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
        }
    });
    const [shouldRedirect, setShouldRedirect] = useState(false);
    let [allControlsAreValid, setAllControlsAreValid] = useState(false);

    //vars for image crop
    const [crop, setCrop] = useState({
        unit: '%',
        width: 100,
        aspect: 1 / 1,
        keepSelection: true
    });
    const [src, setSrc] = useState(null);
    const [file, setFile] = useState(null);
    const [type, setType] = useState(null);
    const [, setCroppedImageUrl] = useState(null);
    const [imageRef, setImageRef] = useState(null);
    let tempImageRef = null;

    const [fileUrl, setFileUrl] = useState(null);


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

        valid = updatedControls.homeCountry.value !== "" && valid;
        valid = updatedControls.erasmusCountry.value !== "" && valid;

        setAllControlsAreValid(valid);
        setRegisterForm(updatedControls);
    };

    let formElementsArray = [];
    for (let key in registerForm) {
        formElementsArray.push({
            id: key,
            config: registerForm[key]
        });
    }

    let errorMessage = null;
    let regForm = null;
    let redirect = null;

    if (error) {
        errorMessage = <p className={classes.ErrorMessage}>{error}</p>;
    }

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
                elementConfig={el.id.includes('Country') ? { 'options': countries } : el.config.elementConfig}
                changed={(event) => { inputChangedHandler(event, el.id) }}
                shouldValidate={el.config.validation}
                errorMessage={"Please enter a valid " + el.config.elementConfig.placeholder}
                touched={el.config.touched}
                value={el.config.value}
            />
        );
    });

    const fileSelectedHandler = (input, value, files) => {
        setType(files[0].type);
        if (files) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setSrc(reader.result);
            }
            );
            reader.readAsDataURL(files[0]);
        }
    }

    //methods for image crop
    const onImageLoaded = image => {
        tempImageRef = image;
        setImageRef(image);
    };

    const onCropComplete = crop => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop, percentCrop) => {
        setCrop(crop);
    };

    const makeClientCrop = async (crop) => {
        if ((imageRef || tempImageRef) && crop.width && crop.height) {
            const imageR = imageRef ? imageRef : tempImageRef;
            const croppedImageUrl = await getCroppedImg(
                imageR,
                crop,
                'newFile.jpeg'
            );
            setCroppedImageUrl(croppedImageUrl);
        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(fileUrl);
                setFileUrl(window.URL.createObjectURL(blob));
                let file = new File([blob], "profilePicture.jpg", { type: type });
                setFile(file);
                resolve(fileUrl);
            }, 'image/jpeg');
        });
    }

    const onSubmit = event => {
        event.preventDefault();
        const formData = new FormData();
        if (file) {
            formData.append('image', file);
        }
        formData.append('homeCourse', registerForm.homeCourse.value);
        formData.append('erasmusCourse', registerForm.erasmusCourse.value);
        formData.append('homeCountryId', registerForm.homeCountry.value);
        formData.append('erasmusCountryId', registerForm.homeCountry.value);
        formData.append('homeCity', registerForm.homeCityName.value);
        formData.append('erasmusCity', registerForm.erasmusCityName.value);
        formData.append('homeUniversity', registerForm.homeUniversityName.value);
        formData.append('erasmusUniversity', registerForm.erasmusUniversityName.value);
        onRegisterErasmus(token, userId, formData);
        setShouldRedirect(true);
    }


    formInputs.splice(0, 0, <h2 key="subtitleHome" className={classes.SubTitle}>Home</h2>)
    formInputs.splice(5, 0, <h2 key="subtitleErasmus" className={classes.SubTitle}>Erasmus</h2>)

    // formInputs.unshift((<h2 key="subtitleErasmus" className={classes.SubTitle}>Erasmus</h2>));
    // formInputs.unshift((<h2 key="subtitleHome" className={classes.SubTitle}>Home</h2>));

    regForm = (
        <form className={classes.Form}>
            <div className={classes.ImageUpload}>
                <div className={classes.ImagePreview}>
                    {src && (
                        <ReactCrop
                            src={src}
                            crop={crop}
                            ruleOfThirds
                            onImageLoaded={onImageLoaded}
                            onComplete={onCropComplete}
                            onChange={onCropChange}
                            className={classes.Crop}
                        />
                    )}
                    {!src && 
                        <p>Please choose an image.</p>
                    }
                    

                </div>
                <FilePicker
                    id="image"
                    label="Upload Profile Picture"
                    control="input"
                    onChange={fileSelectedHandler}
                />
            </div>
            <div className={classes.RegisterErasmusForm}>{formInputs}</div>
            <div />
            <div className={classes.ButtonRow}>
                <Button
                    clicked={(event) => { onSubmit(event) }}
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