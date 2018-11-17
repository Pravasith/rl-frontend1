import React from "react"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import axios from "axios"

import { getUserData } from "../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions";

import { UploadImageIcon } from '../../assets/images';
import "../../assets/sass/image_uploader.scss"
import { decryptData } from "../../factories/encryptDecrypt";
import { api } from "../../actions/apiLinks";
import { TimelineLite } from "gsap";


// use this component like this
//
// <ImageUploader
//     type = "regularImage" // regularImage || profileImage
//     resultData = {(data) => console.log(data)}
// />

class ImageUploader extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            pictureClass: "pictureContainer",
            smallLoader: "smallLoader hide",

            message : "Click here to upload an image.Formats allowed are.jpeg,.jpg,.png (Max. 1 MB)",

            uploadIconClass: "uploadIconWrap",
            imageClass: "imageCover hide",

            imageURL: ""

            // uploadImageClass: "uploadContainer",
            // selectedImageClass: "hide"
        }
    }

    componentDidMount = () => {
        this
            .props
            .getUserData()
            .then(() => {
                let { userData } = this.props

                console.log(userData)
                //
                // DECRYPT REQUEST DATA
                //
                let decryptedData = decryptData(userData.responseData)
                //
                // DECRYPT REQUEST DATA
                //

                this.setState({
                    userData : decryptedData
                })
            })

            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        window.open('/log-in', "_self")
                }

                else
                    console.error(err)
            })

    }

    pictureUploader = (e) => {
        if (e.target.files[0]) 
            this.uploadHandler(e.target.files[0])
    }

    uploadHandler = (theFile) => {
        if (theFile) {
            this.setState({
                pictureClass: "pictureContainer hide",
                smallLoader: "smallLoader",
            })


            // const theFile = theFile
            const reader = new FileReader()

            reader.onloadend = () => {
                const fd = new FormData()

                const getExtensionOfFile = () => {
                    const fileExtention = '.' + theFile.type.split('/')[1]
                    return fileExtention
                }

                const generateRandomString = () => {
                    let text = ""
                    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

                    for (var i = 0; i < 10; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length))

                    const randomString = this.props.imageType + "-" + this.state.userData.rLId + "-" + text  + "-" + Date.now() 
                    return randomString
                }

                const newName =  generateRandomString() + getExtensionOfFile()

                fd.append('toxicData', theFile, newName)
                this.uploadImageToBackend(fd)
            }

            reader.readAsDataURL(theFile)
        }

    }

    progressTrack = (progressEvent) => {

        const tl = new TimelineLite()

        let progress = (progressEvent.loaded / progressEvent.total * 100)

        tl.to('.innerLoadingBar', 0.2, {
            width : progress + "%"
        })
        
        // console.log( "Progress : " + ( progressEvent.loaded / progressEvent.total * 100 ) + '%' )
    }

    
    uploadImageToBackend = (theFile) => {

        // uploads image to backend. From there 
        // the image is written to an s3 bucket

        axios.post(api.UPLOAD_IMAGE, theFile, 
            {
                headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': 'image/png' || 'image/jpg' || 'image/jpeg' || 'image/gif'                    
                },

                withCredentials: true,

                onUploadProgress: this.progressTrack 
            })

        .then(res => {
            // console.log(res.data)
            this.setState({
                // image : res.data.imageURL,
                pictureClass : "pictureContainer",
                smallLoader: "smallLoader hide",
                message: "You have uploaded this one. Click to change.",

                uploadIconClass: "uploadIconWrap hide",
                imageClass: "imageCover",

                imageURL: res.data.imageURL
            })

            const tl = new TimelineLite()
            tl.set('.innerLoadingBar', {
                width : 0 + "%"
            })

            this.props.resultData(res.data)

        })
        .catch(err => {
            console.error(err)
            throw err
        })
    }


    render() {
        return (
            <div className="imageUploaderWrap">
                <div className="pictureUpload">

                    <div className="inputContainer">
                        <input
                            onInput={(e) => this.pictureUploader(e)}
                            onClick={(event) => {
                                event.target.value = null
                            }}
                            ref="uploadLabel"
                            style={{ display: "none" }}
                            type="file"
                            name="uploadImage"
                            id="uploadImageInput"
                            accept="image/*"
                        />

                        <label 
                            htmlFor="uploadImageInput" 
                            className={this.state.pictureClass}
                            >

                            <div className= "uploadContainer" >
                                <div className={this.state.uploadIconClass}>
                                    <UploadImageIcon />
                                </div>

                                <div className={this.state.imageClass}>
                                    <img src={this.state.imageURL} alt=""/>
                                </div>

                                <h3>
                                    {this.state.message}
                                </h3>
                            </div>

                        </label>

                        <div className={this.state.smallLoader}>
                            <div className="outerLoadingBar">
                                <div className="innerLoadingBar">
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return { userData: state.userData, responseData: state.responseDataFromAPI }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserData,
        hitApi,
        navBarLoadingAnimationShowHide
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ImageUploader)