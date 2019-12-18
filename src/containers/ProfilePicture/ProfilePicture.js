import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import classes from './ProfilePicture.module.css'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/index';
import FilePicker from '../../components/UI/Input/FilePicker/FilePicker';
import DefaultPhoto from '../../assets/images/default.png'
import Spinner from "../../components/UI/Spinner/Spinner"

const ProfilePicture = props => {

    const dispatch = useDispatch();
    const uploadingProfilePicture = useSelector(state => state.student.uploadingProfilePicture);

    const onImageUpload = (token, formData) => dispatch(actions.uploadProfilePicture(token, formData));

    const [crop, setCrop] = useState({
        unit: '%',
        width: 100,
        aspect: 1 / 1,
        keepSelection: true
    });
    const [src, setSrc] = useState(null);
    const [file, setFile] = useState(null);
    const [type, setType] = useState(null);
    const [submittedPicture, setSubmittedPicture] = useState(false);
    const [, setCroppedImageUrl] = useState(null);
    const [imageRef, setImageRef] = useState(null);

    const [fileUrl, setFileUrl] = useState(null);

    useEffect(() => {
        if (!uploadingProfilePicture && submittedPicture) {
            props.history.replace('/my-profile');
        }
    }, [uploadingProfilePicture, submittedPicture, props.history])

    const onSelectFile = (input, value, files) => {
        setType(files[0].type);
        if (files) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                setSrc(reader.result);
            }
            );
            reader.readAsDataURL(files[0]);
        }
    };

    const onImageLoaded = image => {
        setImageRef(image);
    };

    const onCropComplete = crop => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop, percentCrop) => {
        setCrop(crop);
    };

    const onUploadImage = () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        let formData = new FormData();

        formData.append('image', file);
        formData.append('userId', userId);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
            console.log(pair[1]);
        }
        onImageUpload(token, formData);
        setSubmittedPicture(true);
    };

    const makeClientCrop = async (crop) => {
        console.log(imageRef, crop.width, crop.height);
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.jpeg'
            );
            setCroppedImageUrl(croppedImageUrl);
        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        console.log(crop);
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
                console.log(file);
                setFile(file);
                resolve(fileUrl);
            }, 'image/jpeg');
        });
    }
    
    let content = null;
    if (uploadingProfilePicture && src) {
        content = <Spinner />
    } else {
        content = (
            <div className={classes.ProfilePicture}>
                <div>
                    <h1 style={{ fontSize: '2.3em' }}>Upload your profile picture</h1>
                    <div>
                        <FilePicker
                            id="image"
                            label="Upload Picture"
                            control="input"
                            onChange={onSelectFile}
                            halfSize
                        />
                    </div>
                    <h3 style={{ textAlign: 'center', textDecoration: 'underline', marginTop: '2em' }}>Preview</h3>
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
                    {!src && (
                        <img className={classes.Crop} src={DefaultPhoto} alt="Profile default" />
                    )}
                    <div className={classes.Submit}>
                        <Button clicked={() => onUploadImage()} disabled={crop.width === 0 || !src}>Upload Picture</Button>
                    </div>
                </div>
            </div>
        )
    }

    return content;
}

export default ProfilePicture