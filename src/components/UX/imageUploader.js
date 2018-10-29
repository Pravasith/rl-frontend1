import React from "react"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions";

import { UploadImageIcon } from '../../assets/images';
import "../../assets/sass/image_uploader.scss"
import { decryptData } from "../../factories/encryptDecrypt";

class ImageUploader extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            pictureClass: "pictureContainer",
            smallLoaderClass: "loader hide",

            uploadImageClass: "uploadContainer",
            selectedImageClass: "hide"
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

        if (e.target.files[0]) {

            // console.log(e.target.files[0], e.target.files[0].size)
            this.setState({
                pictureClass: "pictureContainer hide",
                smallLoaderClass: "loader"
            })



            this.uploadHandler(e.target.files[0])
        }
    }

    uploadHandler = (theFile) => {
        if (theFile) {
            // const theFile = theFile
            const reader = new FileReader()

            reader.onloadend = () => {
                const fd = new FormData()

                // console.log(theFile.name)

                const generateRandomString = () => {
                    let text = ""
                    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

                    for (var i = 0; i < 10; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length))

                    const randomString = text + "-" + this.state.userData.rLId + "-" + Date.now()
                    return randomString
                }

                const newName = generateRandomString()

                fd.append('toxicData', theFile, newName)
                this.uploadImageToBackend(fd)

            }

            reader.readAsDataURL(theFile)
        }

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

                // onUploadProgress: progressEvent => {
                //     let progress = (progressEvent.loaded / progressEvent.total * 100) 
                //     console.log( "Progress : " + ( progressEvent.loaded / progressEvent.total * 100 ) + '%' )
                // }
            })
        .then(res => {
            // console.log(res.data)
            this.setState({
                image : res.data.imageURL,
                pictureClass : "pictureContainer",
                smallLoaderClass : "loader hide"
            })

            let temp = [...this.state.assignmentTempArr]
            temp.push(
                {
                    imageOrText : "image",
                    imageURL : res.data.imageURL
                }
            )

            this.setState({
                assignmentTempArr : [...temp]
            })

            // console.log(document.getElementsByClassName('previewContainer3') )
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

                    <label htmlFor="uploadImageInput" className={this.state.pictureClass}  >
                        <div className= {this.state.uploadImageClass} >
                            <div className="uploadIconWrap">
                                <UploadImageIcon />
                            </div>

                            <h3>
                                Click here to upload an image.Formats allowed are.jpeg,.jpg,.png (Max.500 kb)
                            </h3>
                        </div>
                    </label>

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