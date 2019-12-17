import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import classes from './ProfilePicture.module.css'
import Button from '../../components/UI/Button/Button'
import * as actions from '../../store/actions/index';
import FilePicker from '../../components/UI/Input/FilePicker/FilePicker';
import DefaultPhoto from '../../assets/images/default.png'
import Spinner from "../../components/UI/Spinner/Spinner"

class ProfilePicture extends PureComponent {

    state = {
        src: null,
        crop: {
            unit: '%',
            width: 100,
            aspect: 1 / 1,
            keepSelection: true
        },
        file: null,
        type: null,
        submittedPicture: false
    };

    componentDidUpdate() {
        if (!this.props.uploadingProfilePicture && this.state.src && this.state.submittedPicture) {
            this.props.history.push('/my-profile');
        }
    }


    originalFile = null;

    onSelectFile = (input, value, files) => {
        this.setState({ type: files[0].type });
        if (files) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ src: reader.result })
            }
            );
            reader.readAsDataURL(files[0]);
        }
    };

    // If you setState the crop in here you should return false.
    onImageLoaded = image => {
        this.imageRef = image;
    };

    onCropComplete = crop => {
        this.makeClientCrop(crop);
    };

    onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        this.setState({ crop });
        console.log(crop.width);
    };

    onUploadImage = () => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");

        let formData = new FormData();

        formData.append('image', this.state.file);
        formData.append('userId', userId);

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
            console.log(pair[1]);
        }
        this.props.onImageUpload(token, formData);
        this.setState({ submittedPicture: true });
    };

    async makeClientCrop(crop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                crop,
                'newFile.jpeg'
            );
            this.setState({ croppedImageUrl });
        }
    }

    getCroppedImg(image, crop, fileName) {
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
            // this.setState({file : canvas.toDataURL("image/png")});
            canvas.toBlob(blob => {
                if (!blob) {
                    //reject(new Error('Canvas is empty'));
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                let file = new File([blob], "profilePicture.jpg", { type: this.state.type });
                // this.formData.append('image', file);
                this.setState({ file: file });
                resolve(this.fileUrl);
            }, 'image/jpeg');
        });
    }

    render() {
        const { crop, src } = this.state;

        let content = null;
        if (this.props.uploadingProfilePicture && this.state.src) {
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
                                onChange={this.onSelectFile}
                                halfSize
                            />
                        </div>
                        <h3 style={{textAlign: 'center', textDecoration: 'underline', marginTop: '2em'}}>Preview</h3>
                        {src && (
                            <ReactCrop
                                src={src}
                                crop={crop}
                                ruleOfThirds
                                onImageLoaded={this.onImageLoaded}
                                onComplete={this.onCropComplete}
                                onChange={this.onCropChange}
                                className={classes.Crop}
                            />
                        )}
                        {!src && (
                            <img className={classes.Crop} src={DefaultPhoto} alt="Profile default" />
                        )}
                        <div className={classes.Submit}>
                            <Button clicked={() => this.onUploadImage()} disabled={this.state.crop.width === 0 || !this.state.src}>Upload Picture</Button>
                        </div>
                    </div>
                </div>
            )
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
        uploadingProfilePicture: state.student.uploadingProfilePicture
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onImageUpload: (token, userId, file) => dispatch(actions.uploadProfilePicture(token, userId, file)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePicture)