import React from "react"

import "../../../assets/sass/add_product_details.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";

import {
    PlusButtonIcon,
    CloseButton,
    BigCloseButton,
    ModalCloseButton,
    ErrorMsgSign,
    SmallCloseButton,
    SmallModalCloseButton,
    MinusImageIcon,
    PlusImageIcon
} from "../../../assets/images";

import LogoAnimation from "../../animations/logoAnimation"
import { GradientButton, InputForm, WhiteButton } from "../../UX/uxComponents"
import HtmlSlider from "../../UX/htmlSlider"
import Navbar from "../../navbar/navbar"
import { decryptData } from "../../../factories/encryptDecrypt"
import ImageUploader from "../../UX/imageUploader"

class AddProductDetails extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',
            redirect: false,

            // for features start //
            featuresAdded: [],
            // for features end //

            // dynamincally toggle classes to flip styles //
            vendorDashboardOuterClass: "vendorDashboardOuterLayer",
            modalClassToggle: "modalBackgroundMainOuterWrap hide",
            modalColor: "modalContentClass",
            modalFinish: "modalFinishClass",
            modalSize: "modalSizeClass",
            // dynamincally toggle classes to flip styles //

            minQuantityPara: "minQuantityPara hide",
            maxQuantityPara: "maxQuantityPara hide",

            modalType : null,
            tempArr: [],
            dummyDataStructure: [],

            colorName: '',
            colorCode: '',
            sizeName: '',
            sizeCost: '',

            colorArray: [],

            productMinQuantity: '',
            productMaxQuantity: '',

            productDimensions: [],

            isProceedClicked: false,

            erorrs: {}
        }
    }

    // componentDidUpdate() {
    //     console.log(this.state.productDimensions)
    // }


    modalClassToggle = (showOrNot) => {
        if(showOrNot === "show")
            this.setState({
                modalClassToggle: "modalBackgroundMainOuterWrap",
                vendorDashboardOuterClass: "vendorDashboardOuterLayer blurClass",
            })

        else if (showOrNot === "dontShow")
            this.setState({
                modalClassToggle: "modalBackgroundMainOuterWrap hide", 
                vendorDashboardOuterClass: "vendorDashboardOuterLayer",
            })
    }


    returnVariationColors = () => {
        return (

            {
                categoryName: "Water bodies",
                imagesInCategory: [
                    {
                        itemCode: "CL12",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://www.hcsupplies.co.uk/public/images/products/3/clear-maple.jpg"
                    },

                    {
                        itemCode: "WB13",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://images.pexels.com/photos/935875/pexels-photo-935875.jpeg?auto=compress&cs=tinysrgb&h=350"
                    },

                    {
                        itemCode: "WB14",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://image.freepik.com/free-vector/wood-texture_1083-21.jpg"
                    },

                    {
                        itemCode: "WB15",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://www.hcsupplies.co.uk/public/images/products/3/clear-maple.jpg"
                    },

                    {
                        itemCode: "WB14",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFxp7lUM2L4lF4aGcpv4K0ToCdZGXJHxwCzHsrV0ro-sGkN5evQ"
                    },

                    {
                        itemCode: "WB15",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://i.ebayimg.com/images/g/xe0AAOSwiBJaAuOT/s-l300.jpg"
                    },

                    // {
                    //     itemCode : "WB15",
                    //     textOnRibbonSatisfied : false,
                    //     imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    // },

                    // {
                    //     itemCode : "WB14",
                    //     textOnRibbonSatisfied : false,
                    //     imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    // },

                    // {
                    //     itemCode : "WB15",
                    //     textOnRibbonSatisfied : false,
                    //     imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    // },
                ]
            }
        )
    }

    returnVariationImages = () => {
        return (
            {
                categoryName: "Water bodies",
                imagesInCategory: [
                    {
                        itemCode: "WB12",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXk1JV3DCwbJU_lNhIur-A3jZD8NnU89SN8WY_7h5B0zdqRbYceg"
                    },
                    {
                        itemCode: "WB13",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlNZc4WlFWnRym1Gpz9mzE8T-VpG_SqrKI2Ju1Ej6b0bmzjYrww"
                    },
                    {
                        itemCode: "WB14",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    },
                    {
                        itemCode: "WB15",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    },

                    {
                        itemCode: "WB14",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    },
                    {
                        itemCode: "WB15",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    },

                    // {
                    //     itemCode : "WB15",
                    //     textOnRibbonSatisfied : false,
                    //     imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    // },

                    // {
                    //     itemCode : "WB14",
                    //     textOnRibbonSatisfied : false,
                    //     imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    // },

                    // {
                    //     itemCode : "WB15",
                    //     textOnRibbonSatisfied : false,
                    //     imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    // },
                ]
            }
        )
    }

    componentDidMount = () => {
        this
            .props
            .getUserData()

            .then((data) => {
                let { userData } = this.props

                //
                // DECRYPT REQUEST DATA
                //
                let decryptedData = decryptData(userData.responseData)
                //
                // DECRYPT REQUEST DATA
                //

                this.setState({
                    loadingClass: 'loadingAnim hide',
                    mainClass: 'mainClass',
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
            // console.log(this.state.productName)
    }


    returnNavBarData = () => {
        if (this.props.userData.responseData) {
            //
            // DECRYPT REQUEST DATA
            // 
            let decryptedData = decryptData(
                this.props.userData.responseData
            )
            //
            // DECRYPT REQUEST DATA
            //

            return decryptedData
        }

        else {
            return null
        }
    }

    addFeatureName = () => {
        let temp = this.state.featureName

        if (temp !== "") {
            let dummyArray = [...this.state.featuresAdded]

            dummyArray.map(item => item.toLowerCase())

            if (!dummyArray.includes(temp.toLowerCase())) {
                this.state.featuresAdded.push(temp)
            }

            this.setState({
                featuresAdded: this.state.featuresAdded.length !== 0 ? this.state.featuresAdded : [this.state.featureName]
            })

            this.refs.featureInput.value = ""
        }

    }

    removeFeature = (index) => {
        this
            .state
            .featuresAdded
            .splice(index, 1)

        this.setState({
            featuresAdded: this.state.featuresAdded.length !== 0 ? this.state.featuresAdded : []
        })

    }

    setfeatureName = (e) => {
        const val = e.target.value

        this.setState({
            featureName: val
        })
    }

    returnfeaturesAdded = () => {
        return (
            this
                .state
                .featuresAdded

                .map((item, i) => {
                    return (
                        <div
                            className="featureWrap"
                            key={i}
                            >
                            <ul>
                                <li>
                                    <p key={i}>
                                        {item}
                                    </p>
                                </li>
                            </ul>

                            <div
                                className="deleteIcon"
                                onClick={() => this.removeFeature(i)}
                                >
                                <CloseButton />
                            </div>
                        </div>
                    )
                })
        )
    }

    returnColorModule = () => {
            console.log(this.state.colorArray)
        return (
            this.state.colorArray
            .map((item, i) => {
                return (
                    <div
                        className="colorDescriptionOuterLayer"
                        key={i}
                    >
                        <div className="colorDescriptionInnerLayer">
                            <div 
                                className="colorDetails"
                                style = {{background : item.colorCode}}
                            >
                                <div className="closeButtonContainer"
                                    onClick={() => {
                                        this.removeColor()
                                    }}
                                >
                                    <CloseButton />
                                </div>
                                <p>{item.colorCode}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
        
    returnProductDimensions = () => {
        return (
            this
                .state
                .productDimensions
                .map((item, i) => {
                    return (
                        <div
                            className="productSizeDescriptionOuterLayer"
                            key={i}
                            >
                            <div className="productSizeDescriptionInnerLayer">
                                <div className="productSizeDetails">
                                    <div className="sizeCostCartWrap">
                                        <h3>Size nomenclature</h3>
                                        <p key={i}
                                            >{item.sizeName}</p>
                                    </div>
                                    <div className="sizeCostCartWrap">
                                        <h3>Cost over base price</h3>
                                        <p key={i}>Rs. {item.sizeCost}</p>
                                    </div>
                                </div>
                                <div className="sizeEditingButtons">
                                    <div className="editButton">
                                        <WhiteButton 
                                            runFunction={() => this.editProductDimensions(i)}
                                            >
                                            Edit
                                        </WhiteButton>
                                    </div>
                                    <div 
                                        className="deleteButton"
                                        onClick={() => this.removeProductDimensions(i)}
                                        >
                                        <WhiteButton>
                                            Delete
                                        </WhiteButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        )
    }

    editProductDimensions = async (index) => {
        const sizeName = this.state.productDimensions[index].sizeName;
        const sizeCost = this.state.productDimensions[index].sizeCost;

        const setSyncState = async () => {
            await this.setState({
                modalType: "size",
            })
        }

        await setSyncState()

        this.modalClassToggle("show")

        this.refs.sizeName.value = sizeName
        this.refs.sizeCost.value = sizeCost

    }

    removeProductDimensions = (index) => {
        this
            .state
            .productDimensions
            .splice(index, 1)

        this.setState({
            productDimensions: this.state.productDimensions.length !== 0 ? this.state.productDimensions : []
        })
    }

    removeColor = (index) => {
        this.state.colorArray.splice(index, 1)

        this.setState({
            colorArray: this.state.colorArray.length !== 0 ? this.state.colorArray : []
        })
    }

    displayError = (modalType, message) => {
        if (modalType === "color") {
            if(this.state.colorIsValid === false){

                const {emptyFieldInColor} = this.state
 
                const  returnError = () => {
                    if(emptyFieldInColor === "colorName"){
                        return <p>{this.state.errorMessage}</p>
                    }

                    else if(emptyFieldInColor === "colorCode"){
                        return (
                            <p>{this.state.errorMessage}</p>
                        )
                    }

                    else{
                        return <p>Oops, something is not right, please reload and try again</p>
                    }
                }


                return (
                    <div className="errorMessage">
                        {returnError()}
                    </div>
                )
            }
        }

        else if (modalType === "size") {
            if(this.state.sizeIsValid === false){
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInSize}</p>
                    </div>
                )
            }
        }
    }

    handleQuantity = async (e, minOrMax) => {

        if (minOrMax === "min") {
            const productMinQuantity = (e.target.validity.valid) ? e.target.value : this.state.productMinQuantity;

            await this.setState({ productMinQuantity });

            if (this.state.productMinQuantity === "") await this.setState({ minQuantityPara: "minQuantityPara" });
            else this.setState({ minQuantityPara: "minQuantityPara hide" });
        }

        else if (minOrMax === "max") {
            const productMaxQuantity = (e.target.validity.valid) ? e.target.value : this.state.productMaxQuantity;

            await this.setState({ productMaxQuantity });

            if (this.state.productMaxQuantity === "") this.setState({ maxQuantityPara: "maxQuantityPara" });
            else this.setState({ maxQuantityPara: "maxQuantityPara hide" });
        }
    }

    proceedHandler = (typeOfButtonClicked) => {

        let isColorValid = false
        let isSizeValid = false
        let emptyField
        let errorMessage

        const validateColorModal = (colorName, colorCode) => {
            if(colorName !== "" && colorCode !== "") {
                if(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCode)){

                    let alreadyExistingColorName
                    const { colorArray } = this.state

                    if(colorArray.length === 0){
                        isColorValid = true
                        colorArray.push({
                            colorName : colorName.toLowerCase(),
                            colorCode : colorCode.toLowerCase()
                        })
                    }

                    else{
                        let colorDoesntExist = true

                        // console.log("---------------------------------------------------")
                        colorArray.map((item, i) => {

                            // console.log("item.colorName, item.colorCode, colorCode", item.colorName, item.colorCode, colorCode, i)
                            colorCode = colorCode.toLowerCase()

                            // console.log(item.colorCode !== colorCode)

                            if(item.colorCode === colorCode){
                                colorDoesntExist = false
                            }

                            else{
                                alreadyExistingColorName = item.colorName
                            }
                        })
                        // console.log("---------------------------------------------------")
    
                        if(colorDoesntExist === true){
                            isColorValid = true
                            colorArray.push({
                                colorName : colorName.toLowerCase(),
                                colorCode : colorCode.toLowerCase()
                            })
                        }

                        else if(colorDoesntExist === false){
                            isColorValid = false
                            emptyField = "colorCode"
                            errorMessage = `You have already entered this color code with the name "${alreadyExistingColorName}"`
                        }
                    }                
                }

                else{
                    isColorValid = false
                    emptyField = "colorCode"
                    errorMessage = "The color code is not right, please retry. See if you forgot to enter the '#' at the beginning."
                }

            } 
            
            else if (colorName === "" && colorCode === "") {
                emptyField = "colorName"
                errorMessage = "please enter color name"
            }

            else {
                if (colorName === "") {
                    emptyField = "colorName"
                    errorMessage = "Please enter color name"
                }
                    

                if (colorCode === ""){
                    emptyField = "colorCode"
                    errorMessage = "Please enter color code"
                }
                    
            }

            const validationData = {
                isColorValid,
                emptyField,
                errorMessage
            }

            return validationData
        }


        const validateSizeModal = (sizeName, sizeCost) => {
            if(sizeName !== "" && sizeCost !== ""){
                isSizeValid = true;
            }

            else if (sizeName === "" && sizeCost === "") {
                emptyField = "sizeName"
            } 

            else {
                if (sizeName === "")
                    emptyField = "sizeName"
                if (sizeCost === "")
                    emptyField = "sizeCost"
            }

            const validationData = {
                isSizeValid,
                emptyField
            }

            return validationData;
        }

        if(typeOfButtonClicked === "color"){
            const colorCode = this.refs.colorCode.value
            const colorName = this.refs.colorName.value

            let validatedData = validateColorModal(colorName, colorCode)

            if(validatedData.isColorValid){

                // let temp = {
                //     colorCode: this.state.colorCode,
                //     colorName: this.state.colorName
                // }

                // console.log("temp:", temp);

                // if (temp !== "") {
                //     let dummyColorArray = [...this.state.colorArray]

                //     if (!dummyColorArray.includes(temp)) {
                //         this.state.colorArray.push(temp)
                //     }
                // }
                
                this.setState({
                    colorIsValid: true,
                    emptyFieldInColor: null,
                    modalType: null,
                    colorArray: this.state.colorArray.length !== 0 ? this.state.colorArray : null
                })

                // save data

                this.refs.colorCode.value = ""
                this.refs.colorName.value = ""

                this.modalClassToggle("dontShow")
            }

            else{
                
                this.setState({
                    colorIsValid : false,
                    emptyFieldInColor : validatedData.emptyField,
                    errorMessage : validatedData.errorMessage
                })
            }
        }

        else if (typeOfButtonClicked === "size") {
            const sizeName = this.refs.sizeName.value;
            const sizeCost = this.refs.sizeCost.value;

            

            let validatedData = validateSizeModal(sizeName, sizeCost);

            if (validatedData.isSizeValid) {
                let temp = {
                    sizeName: this.state.sizeName,
                    sizeCost: this.state.sizeCost
                }

                if(temp !== "") {
                    let dummyArray = [...this.state.productDimensions]

                    if(!dummyArray.includes(temp)){
                        this.state.productDimensions.push(temp)
                    }
                }

                this.setState({
                    sizeIsValid: true,
                    emptyFieldInSize: null,
                    modalType: null,
                    productDimensions: this.state.productDimensions.length !== 0 ? this.state.productDimensions : null
                })

                this.refs.sizeCost.value = ""
                this.refs.sizeName.value = ""

                this.modalClassToggle("dontShow")
            }

            else {
                this.setState({
                    sizeIsValid: false,
                    emptyFieldInSize: validatedData.emptyField
                })
            }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleColorInput = (e, colorInputType) => {
        this.setState({
            colorPreview : e.target.value
        })
    }

    returnModal = () => {
        const { modalType } = this.state;

        const returnModalContent = () => {
            if(modalType === "finish") {
                return (
                <div className={this.state.modalFinish}>
                    <div className="dummyXClass">
                        <div className="whiteSquareForModal">
                            {/* <div className="closeUpImg">
                                <h3>Add a close-up image thumbnail for this finish</h3>
                                <div className="line"></div>
                                <p>Example: The image thumbnail for Pinewood finish looks like this</p>
                                <div className="uploadedImgThumbnail">
                                    <img className="uploadedImage" src="" alt="" />
                                    <ImageUploader />
                                </div>
                            </div> */}
                            <div className="vendorDashboardModal">
                                <div className="modalHeader finsihModalHeader">
                                    <h3>Add a close-up image thumbnail for this finish</h3>
                                    <div className="line"></div>
                                </div>
                            </div>
                            <div className="inputFormContainer">
                                <div className="formParaSection finishInputParaContainer">
                                    <p className="pargraphClass">Example: The image thumbnail for Pinewood finish looks like this</p>
                                    <div className="exampleUploadedImgThumbnail">
                                        <img className="uploadedImage" src="https://res.cloudinary.com/wnbcloud/image/upload/h_300,w_400/v1467638340/ash2_wqnx4x.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="imageUploaderContainer">
                                <div className="imageUploaderInnerLayer">
                                    <ImageUploader />
                                </div>
                            </div>
                        </div>
                        <div className="whiteSquareForModal">
                            <div className="uploadedImg">
                                <h3>You have uploaded this image</h3>
                                <div className="line"></div>
                                <div className="uploadedImgThumbnail">
                                    <img className="uploadedImage" src="" alt="" />
                                    <ImageUploader />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                )       
            }

            else if (modalType === "color") {
                return (
                    <div className={this.state.modalColor}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="vendorDashboardModal">
                                    <div className="modalHeader">
                                        <h3>Enter a color code</h3>
                                        <div className="line"></div>
                                    </div>
                                </div>

                                <div className="colorCategorySection">

                                    <div className="colorCategoryInnerLayerContainer">
                                        <div 
                                            className="selectedColorSection"
                                            ref = "colorPreview"
                                            style = {{background : this.state.colorPreview}}
                                            >
                                        </div>
                                        <div className="colorInputFormSection">

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Name of the color</p>
                                                </div>
                                                <div className="productInputInfoSection">
                                                    {/* <InputForm
                                                        refName="colorName"
                                                        placeholder="Ex. Orange"
                                                        isMandatory={true}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="6"
                                                        value={this.state.colorName}
                                                        result={(val) => this.setState({
                                                            colorName: val
                                                        })}
                                                    /> */}
                                                    <div className="modalMandatorySection">
                                                        <p className="madatoryHighlight">Mandatory</p>
                                                    </div>
                                                    <div className="modalInputCategory">
                                                        <input 
                                                            type="text"
                                                            name="colorName"
                                                            placeholder="Ex. Orange"
                                                            ref = "colorName"
                                                            maxLength = "30"
                                                            onChange={this.onChange}
                                                        />
                                                        <span className="InputSeparatorLine"> </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">
                                                        Enter the color hex-code (<a href="https://www.google.co.in/search?q=color+selector&rlz=1C1CHBF_enIN822IN822&oq=color+selector&aqs=chrome..69i57.641j0j1&sourceid=chrome&ie=UTF-8" target="_blank">click here</a> to get one)
                                                    </p>
                                                </div>
                                                <div className="productInputInfoSection">
                                                    <div className="modalMandatorySection">
                                                        <p className="madatoryHighlight">Mandatory</p>
                                                    </div>
                                                    <div className="modalInputCategory">
                                                        <input
                                                            type="text"
                                                            name="colorCode"
                                                            placeholder="Ex. #29abe2"
                                                            onChange={(e) => this.handleColorInput(e, "colorCode")}
                                                            maxLength = "7"
                                                            ref = "colorCode"
                                                        />
                                                        <span className="InputSeparatorLine"> </span>

                                                        <p>Don't forget the # before the code</p> 
                                                    </div>
                                                </div> 
                                            </div>

                                        </div>
                                    </div>
                                    <div className="proceedOrNotCheck">
                                        <GradientButton
                                            runFunction={() => {
                                                this.proceedHandler("color")
                                            }}>
                                            Proceed
                                        </GradientButton>
                                    </div>
                                    {this.displayError("color")}

                                </div>
                            </div>
                         </div>
                    </div>
                )
            }

            else if (modalType === "size") {
                return (

                    <div className={this.state.modalSize}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="vendorDashboardModal">
                                    <div className="modalHeader">
                                        <h3>Size details</h3>
                                        <div className="line"></div>
                                    </div>
                                </div>

                                <div className="inputFormContainer">
                                    <div className="formParaSection">
                                        <p className="pargraphClass">Size name</p>
                                    </div>
                                    <div className="productInputInfoSection productSizeName">
                                        {/* <InputForm
                                            refName="sizeName"
                                            placeholder="Ex. Small-2ft x 2ft"
                                            isMandatory={true}
                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                            characterCount="30"
                                            result={(val) => this.setState({
                                                sizeName: val
                                            })}
                                        /> */}
                                        <div className="modalMandatorySection">
                                            <p className="madatoryHighlight">Mandatory</p>
                                        </div>
                                        <div className="modalInputCategory">
                                            <input
                                                type="text"
                                                name="sizeName"
                                                placeholder="Ex. Small-2ft x 2ft"
                                                // value={this.state.sizeName}
                                                onChange={this.onChange}
                                                ref="sizeName"
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="inputFormContainer">
                                    <div className="formParaSection">
                                        <p className="pargraphClass">Extra cost for size(over base price)</p>
                                    </div>
                                    <div className="productInputInfoSection productCostForSize">
                                        {/* <InputForm
                                            refName="sizeCost"
                                            placeholder="Ex. 20"
                                            isMandatory={true}
                                            validationType="onlyNumbers"
                                            characterCount="5"
                                            result={(val) => this.setState({
                                                sizeCost: val
                                            })}
                                        /> */}
                                        {/* <div className="modalMandatorySection">
                                            <p className="madatoryHighlight">Mandatory</p>
                                        </div> */}
                                        <div className="modalInputCategory">
                                            <input
                                                type="text"
                                                name="sizeCost"
                                                placeholder="Ex. 20"
                                                // value={this.state.sizeCost}
                                                onChange={this.onChange}
                                                ref="sizeCost"
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => this.proceedHandler("size")}>
                                        Proceed
                                    </GradientButton> 
                                </div>
                                {this.displayError("size")}
                            </div>
                        </div>
                    </div>

                )
            }

            else if (modalType === "validation") {
                return (
                    <div className={this.state.modalClassToggle}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="addProductDetailsModal">
                                    <div className="svgImageContainer">
                                        <ErrorMsgSign />
                                    </div>
                                    <div className="modalContentContainer">
                                        <div className="modalContentContainerInnerLayer">
                                            <div className="content">
                                                <h3>Please enter:</h3>
                                                <div className="detailsToInput">
                                                    <div className="detailsInputLayer">
                                                        <h3>{this.state.emptyField
                                                            .map((item, i) =>
                                                                <div
                                                                    className="errorFieldMessage"
                                                                    key={i}>
                                                                        <ul>
                                                                            <li>{item}</li>
                                                                        </ul>
                                                                </div>
                                                            )}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="closeModalContainer">
                                        <WhiteButton
                                            runFunction={() => this.modalClassToggle("dontShow")}
                                        >
                                            Sure, I’ll do that
                                        </WhiteButton>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div className={this.state.modalClassToggle}>
                <div className="modalBackgroundDummyClass">
                    <div className="modalBackgroundInnerWrap">
                            <header className="closeHeaderSection">
                                <div className="closeButtonContainer"
                                    onClick = {() => {
                                        this.modalClassToggle("dontShow")
                                    }}
                                    >
                                        <ModalCloseButton />
                                </div>
                            </header>
                        <div className="modalOuterWrap">
                            
                            <article className="modalContentWrap">
                                {returnModalContent()}
                            </article>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

   validateProceedHandler = async () => {
       const fieldNames = [
           { fieldName: 'Product Name', value: this.state.productName },
           { fieldName: 'Product Code', value: this.state.productCode },
           { fieldName: 'Best price of this product', value: this.state.productPrice },
           { fieldName: 'Material', value: this.state.productMaterial },
           { fieldName: 'Min. quantity', value: this.state.productMinQuantity},
           { fieldName: 'Max. quantity', value: this.state.productMaxQuantity }
       ]

       await this.setState({
           emptyField: []
       })

       fieldNames.map(item => {
        //    console.log(item.fieldName, item.value)
           if (item.value === undefined || item.value === "") {
            //    console.log(`${item.fieldName} is in-valid`)
               if (!this.state.emptyField.includes(item.fieldName))
                   this.state.emptyField.push(item.fieldName)
           }
       })

       this.setState({
           emptyField: this.state.emptyField
       })

    //    console.log(this.state.emptyField)
       this.modalClassToggle("show");
   }

    render() {
        return (
            <div className="vendorDashboardWrapper">
                <div className={this.state.loadingClass}>
                    <LogoAnimation
                        text="We are loading..."
                    />
                </div>

                <div className={this.state.mainClass}>
                    <Navbar
                        userData={this.returnNavBarData()}
                    />

                    <div className="vendorDummyContainer">
                        <article className={this.state.vendorDashboardOuterClass}>
                            <section className="vendorDashboardInnerLayer">

                                <div className="uploadSectionLeftWrapper">
                                    <article className="leftWrapperInnerLayer">
                                        <section className="imageUploadBigContainer">

                                            <div className="imageUploadUpperSection">
                                                <div className="imageUploadInnerLayer">

                                                    <div className="imageContainerInnerSection">

                                                        <div className="imageUploadComponent">
                                                            <header className="vendorImageUploadHeaderComponent">
                                                                <div className="headingArea">
                                                                    <h3 className="headingClass">Product image</h3>
                                                                    <div className="line"></div>
                                                                </div>
                                                            </header>
                                                            <ImageUploader />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="imageUploadDownSection">

                                                <header className="uploadedHeaderSection">
                                                    <div className="headingArea">
                                                        <h3 className="headingColumn">Uploaded images</h3>

                                                        <div className="line"></div>
                                                    </div>
                                                </header>

                                                <div className="downSectionInnerLayer">
                                                    <HtmlSlider
                                                        categoryData={this.returnVariationImages()} // format of Item 
                                                        numberOfSlides={4} // Change the css grid properties for responsiveness
                                                        textOnRibbon={"TRENDING NOW"} // All caps
                                                        runFunction={(data) => this.getData(data)}
                                                    />
                                                </div>

                                            </div>

                                        </section>
                                    </article>
                                </div>

                                <div className="uploadSectionRightWrapper">
                                    <article className="rightWrapperInnerLayer">

                                        <header className="vendorFormHeading">

                                            <div className="headingArea">
                                                <h3 className="headingClass">Add new product</h3>

                                                <div className="line"></div>
                                            </div>

                                        </header>

                                        <section className="vendorUploadFormSection">
                                            <div className="vendorUploadFormInnerContainer">
                                                
                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Name of the product</p>
                                                    </div>
                                                    <div className="materialInformationColumn">
                                                        <InputForm
                                                            refName="productName"
                                                            placeholder="Ex.Vertical Moss"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="30"
                                                            result={(val) => this.setState({
                                                                productName: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Product Code</p>
                                                    </div>
                                                    <div className="productCode">
                                                        <InputForm
                                                            refName="productName"
                                                            placeholder="Type here"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="30"
                                                            result={(val) => this.setState({
                                                                productCode: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Different Code (if any)</p>
                                                    </div>
                                                    <div className="productDifferentCode">
                                                        <InputForm
                                                            refName="differentCode"
                                                            placeholder="Type here"
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="30"
                                                            result={(val) => this.setState({
                                                                productDiffCode: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Best price of this product</p>
                                                    </div>
                                                    <div className="PricingSection">
                                                        <InputForm
                                                            refName="productPrice"
                                                            placeholder="Type here (in Rupees)"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="30"
                                                            result={(val) => this.setState({
                                                                productPrice: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Material</p>
                                                    </div>
                                                    <div className="ProductMaterialSection">
                                                        <InputForm
                                                            refName="productMaterial"
                                                            placeholder="Type here"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="30"
                                                            result={(val) => this.setState({
                                                                productMaterial: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Features </p>
                                                    </div>

                                                    <div className="featureHolder" >
                                                        {this.returnfeaturesAdded()}
                                                    </div>

                                                    <div className="featureNameColumn">

                                                        <div className="inputWrap">
                                                            <input
                                                                placeholder="Type the value-add features about this product"
                                                                ref="featureInput"
                                                                type="text"
                                                                onChange={e => this.setfeatureName(e)}
                                                                onKeyPress={e => {
                                                                    if (e.key === "Enter") {
                                                                        this.setfeatureName(e)
                                                                        this.addFeatureName()
                                                                    }
                                                                }}
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <WhiteButton
                                                            runFunction={this.addFeatureName}
                                                        >
                                                            Add
                                                        </WhiteButton>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Finishing options </p>
                                                    </div>

                                                    <div className="colorVariantSliderContainer">
                                                        <HtmlSlider
                                                            categoryData={this.returnVariationColors()} // format of Item 
                                                            numberOfSlides={4} // Change the css grid properties for responsiveness
                                                            textOnRibbon={"TRENDING NOW"} // All caps
                                                            runFunction={(data) => this.getData(data)}
                                                        />
                                                    </div>

                                                    <div className="buttonContainer">

                                                        <WhiteButton
                                                            className="vendorDashboardBtn"
                                                            runFunction= {() => {
                                                                this.modalClassToggle("show")
                                                                this.setState({
                                                                    modalType : "finish"
                                                                })
                                                            }}
                                                            >
                                                            <div className="svgImageContainer">
                                                                <PlusButtonIcon />
                                                            </div>
                                                            Add new finish
                                                        </WhiteButton>

                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p 
                                                            className="pargraphClass"
                                                            // onClick = {() => console.log(this.state.colorArray)}
                                                            > Color options </p>
                                                    </div>

                                                    <div className="colorSelectionContainer">
                                                        {/* <HtmlSlider
                                                            categoryData={this.returnVariationColors()} // format of Item 
                                                            numberOfSlides={4} // Change the css grid properties for responsiveness
                                                            textOnRibbon={"TRENDING NOW"} // All caps
                                                            runFunction={(data) => this.getData(data)}
                                                        /> */}
                                                        <div className="addColorDummyContainer">
                                                            <div className="addColorDummyContainerInnerLayer">
                                                                <div 
                                                                    className="addButtonContainer"
                                                                    onClick={() => {
                                                                        // console.log('hit')
                                                                            this.modalClassToggle("show")
                                                                            this.setState({
                                                                                modalType : "color"
                                                                            }
                                                                        )}
                                                                    }
                                                                    >
                                                                            {/* <WhiteButton */}
                                                                            {/* runFunction={() => {
                                                                                // console.log('hit')
                                                                                    this.modalClassToggle("show")
                                                                                    this.setState({
                                                                                        modalType : "color"
                                                                                    }
                                                                                )}
                                                                            } */}


                                                                        
                                                                        <div className="svgImageContainer">
                                                                            <PlusButtonIcon />
                                                                        </div>

                                                                        <p>Add new</p>
                                                                    {/* </WhiteButton> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {this.returnColorModule()}
                                                    </div>

                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Sizes available</p>
                                                    </div>
                                                    <div className="productSizeDescriptionOuterLayer">

                                                        {this.returnProductDimensions()}

                                                    </div>

                                                    <div className="buttonContainer">

                                                        <WhiteButton
                                                            runFunction={() => {
                                                                this.modalClassToggle("show")
                                                                this.setState({
                                                                    modalType : "size"
                                                                })
                                                            }}
                                                        >
                                                            <div className="svgImageContainer">
                                                                <PlusButtonIcon />
                                                            </div>
                                                            Add new size
                                                        </WhiteButton>

                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Min. Quantity</p>
                                                    </div>
                                                    
                                                    <div className="productQunatityWrap inputCategorySection">
                                                        <div className="productInputInnerLayer">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>
                                                            <div className="inputColumn">
                                                                <div className="numberInputSection inputColumnInnerLayer">
                                                                    <input
                                                                        type="text"
                                                                        ref="productMinQuantity"
                                                                        pattern="[0-9]*"
                                                                        placeholder="Ex. 5"
                                                                        value={this.state.productMinQuantity}
                                                                        onChange={(e) => this.handleQuantity(e, "min")}
                                                                    />
                                                                    <span className="InputSeparatorLine"> </span>
                                                                    <div className={this.state.minQuantityPara}>
                                                                        <p>This information is required (in numbers)</p>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Max. Quantity</p>
                                                    </div>
                                                    
                                                    <div className="productQunatityWrap inputCategorySection">
                                                        <div className="productInputInnerLayer">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>

                                                          
                                                            <div className="inputColumn">
                                                                <div className="numberInputSection inputColumnInnerLayer">
                                                                    <input
                                                                        type="text"
                                                                        ref="productMinQuantity"
                                                                        pattern="[0-9]*"
                                                                        placeholder="Ex. 999"
                                                                        value={this.state.productMaxQuantity}
                                                                        onChange={(e) => this.handleQuantity(e, "max")}
                                                                    />
                                                                    <span className="InputSeparatorLine"> </span>  
                                                                    <div className={this.state.maxQuantityPara}>
                                                                        <p>This information is required (in numbers)</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Product description </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <InputForm
                                                            refName="productDescription"
                                                            placeholder="Type something good about the product"
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            result={(val) => this.setState({
                                                                featureName: val
                                                            })}
                                                        />
                                                    </div>

                                                    {/* <div className="materialInfoColumn">
                                                    <InputForm
                                                        refName="companyName"
                                                        placeholder="Ex. Space Saving Compact Design"
                                                        isMandatory={false}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="100"
                                                        result={(val) => this.setState({
                                                            featureName: val
                                                        })}
                                                    />
                                                </div> */}

                                                </div>

                                                <div className="inputFormContainer">

                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Features / specifications of the product </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <InputForm
                                                            refName="companyName"
                                                            placeholder="Type here"
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            result={(val) => this.setState({
                                                                featureName: val
                                                            })}
                                                        />
                                                    </div>

                                                </div>
                                           
                                                <div className="inputFormContainer">
                                                        
                                                    <div className="formParaSection">
                                                        <h3 className="pargraphClass"> Choose the product’s design style </h3>
                                                    </div>

                                                    <div className="designStylesOuterLayer">
                                                        <div className="designStylesInnerLayer">

                                                            <div className="productStyleContainer">
                                                                <header className="productStyleHeadingSection">
                                                                    <div className="titleCategory">
                                                                        <h3>Modern</h3>
                                                                        <div className="line"></div>
                                                                    </div>
                                                                    <div className="checkboxCategory">
                                                                        <label className="container">
                                                                            <input type="checkbox"/>
                                                                            <span className="checkmark"></span>
                                                                        </label>
                                                                    </div>
                                                                </header>
                                                                <div className="productStyleContentSection">
                                                                    <div className="productStyleContentSectionInnerLayer">
                                                                        <div className="imageCategorySection">
                                                                            <img src="https://cf.ltkcdn.net/interiordesign/images/std/203112-662x450-moderninterior.jpg" alt=""/>
                                                                        </div>
                                                                        <div className="styleCategorySection">
                                                                            <p>

                                                                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                                                Vitae quis iusto id impedit nisi molestiae aut possimus
                                                                                maxime a quos, aliquid culpa repellendus modi sunt cumque, 
                                                                                perspiciatis praesentium minima. Asperiores consequatur. 
                                                                                Cum placeat quibusdam quis, eaque, fugit distinctio ab 
                                                                                aperiam nulla expedita adipisci? Accusamus corporis,  
                                                                                voluptatum id laboriosam tenetur et esse cupiditate 
                                                                                optio iusto asperiores porro praesentium distinctio  
                                                                                soluta natus, nihil dignissimos vero dolor! Suscipit 
                                                                                nesciunt molestias omnis veritatis alias quod odit ,
                                                                                ipsa illum nemo eius doloremque maiores hic explicabo.

                                                                            </p>
                                                                            
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </section>

                                        <div className="formButtonContainer">
                                            <div className="buttonContainer">
                                                <GradientButton
                                                    runFunction={() => 
                                                        { this.validateProceedHandler()
                                                            this.modalClassToggle("show")
                                                            this.setState({
                                                                modalType : "validation"
                                                            })                    
                                                        }}>
                                                    Proceed
                                                </GradientButton>
                                            </div>
                                        </div>

                                    </article>

                                </div>

                            </section>

                        </article>

                        {
                            this.returnModal()
                        }

                    </div>
                </div>
            </div>
        )
    }

}

// AddProductDetails.propTypes = {
//     errors: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => {
    return ({ 
            userData: state.userData,
            responseData: state.responseDataFromAPI 
        })
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserData,
        hitApi,
        navBarLoadingAnimationShowHide
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddProductDetails)




{/* <div className="buttonContainer">
<WhiteButton
    runFunction={() => {
            this.modalClassToggle("show")
            this.setState({
                modalType : "color"
            }
        )}
    }
>
    <div className="svgImageContainer">
        <PlusButtonIcon />
    </div>
    Add new color
</WhiteButton>
</div> */}