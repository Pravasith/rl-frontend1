import React from 'react'
import { UploadImageIcon } from '../../assets/images';
import "../../assets/sass/image_uploader.scss"

export default class ImageUploader extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            pictureClass: "pictureContainer",
            smallLoaderClass: "loader hide"
        }
    }

    componentDidMount = () => {
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

                function generateRandomString() {
                    var text = ""
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

                    for (var i = 0; i < 32; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length))

                    return text
                }

                const newName = generateRandomString()

                fd.append('toxicData', theFile, newName)
                this.uploadImageToBackend(fd)
            }

            reader.readAsDataURL(theFile)
        }
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
                        <div className="uploadContainer">
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