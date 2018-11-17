import React from "react"

import "../../../assets/sass/add_product_details.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";

import { PlusButtonIcon, CloseButton, BigCloseButton,SmallCloseButton,SmallModalCloseButton } from "../../../assets/images"
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

            modalType : null,
            tempArr: [],
            dummyDataStructure: [],

            colorName: '',
            colorCode: '',
            sizeName: '',
            sizeCost: '',

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

    returnProductDimensions = () => {
        return (
            this
                .state
                .productDimensions
                .map((item, i) => {
                    return (
                        <div
                            className="productWrap"
                            key={i}
                            >
                            <ul>
                                
                                <li>
                                    <p>Size nomenclature</p>
                                    <p key={i}>
                                        {item.sizeName}
                                    </p>
                                </li>

                                <li>
                                    <p>Cost over base price</p>
                                    <p key={i}>
                                        {item.sizeCost}
                                    </p>
                                </li>
                            </ul>
                            
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
                    )
                })
        )
    }

    editProductDimensions = (index) => {
        console.log(this.state.productDimensions[index].sizeName, this.state.productDimensions[index].sizeCost);
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


    displayError = (modalType) => {
        if (modalType === "color") {
            if(this.state.colorIsValid === false){
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInColor === "colorName" ? "color name" : "color code" }</p>
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

    
    proceedHandler = (typeOfButtonClicked) => {

        let isColorValid = false;
        let isSizeValid = false;
        let emptyField;

        const validateColorModal = (colorName, colorCode) => {
            if(colorName !== "" && colorCode !== ""){
                isColorValid = true
            } 
            
            else if (colorName === "" && colorCode === "") {
                emptyField = "colorName"
            }

            else {
                if (colorName === "") 
                    emptyField = "colorName"

                if (colorCode === "")
                    emptyField = "colorCode"
            }

            const validationData = {
                isColorValid,
                emptyField
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
                
                this.setState({
                    colorIsValid: true,
                    emptyFieldInColor: null
                })

                // save data

                this.refs.colorCode.value = ""
                this.refs.colorName.value = ""

                this.setState({
                    modalType : null
                })

                this.modalClassToggle("dontShow")
            }

            else{
                
                this.setState({
                    colorIsValid : false,
                    emptyFieldInColor : validatedData.emptyField
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
                        productDimensions: this.state.productDimensions.length !== 0 ? 
                                                        this.state.productDimensions : null
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

                                {/* <div className="inputFormContainer">
                                    <div className="formParaSection">
                                        <p className="pargraphClass">Name of the color</p>
                                    </div>
                                    <div className="productColorInfoSection">
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
                                        {/* <div className="modalMandatorySection">
                                            <p className="madatoryHighlight">Mandatory</p>
                                        </div>
                                        <div className="modalInputCategory">
                                            <input 
                                                type="text"
                                                name="colorName"
                                                placeholder="Ex. Orange"
                                                // value= {this.state.colorName}
                                                onChange= {this.onChange}
                                                ref = "colorName"
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div>  */}

                            
                                    <div className="colorCategorySection">
                                        <div className="selectedColorSection">
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
                                                            value={this.state.colorName}
                                                            onChange={this.onChange}
                                                        />
                                                        <span className="InputSeparatorLine"> </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Color Code (hex)</p>
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
                                                            // value={this.state.colorCode}
                                                            onChange={this.onChange}
                                                            ref = "colorCode"
                                                        />
                                                        <span className="InputSeparatorLine"> </span>
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

                                                {this.displayError("color")}
                                            </div>
                                    
                                        </div>

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

                                    {this.displayError("size")}
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
                        <div className="modalOuterWrap">
                            
                            <article className="modalContentWrap">
                                {returnModalContent()}
                            </article>
                            <header className="closeHeaderSection">
                                <div className="closeButtonContainer"
                                    onClick = {() => {
                                        this.modalClassToggle("dontShow")
                                    }}
                                    >
                                        <SmallModalCloseButton/>
                                </div>
                            </header>
                            <footer>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="vendorDashboardWrapper">
                <div className={this.state.loadingClass}>
                    <LogoAnimation />
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
                                                        <div className="productUploadHeaderSection">
                                                            <p>Please upload an image with size lesser than 500kb </p>
                                                        </div>

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
                                                {/* <div className="upperSectionInnerLayer">
                                                <img
                                                    src="https://i.pinimg.com/originals/50/69/bd/5069bd3b995a9e7b50e42ad1c08d1e8e.jpg"
                                                    alt=""
                                                    className="imageContainer"
                                                />
                                            </div> */}


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
                                                        <p className="pargraphClass"> Color options </p>
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
                                                            runFunction={() => {
                                                                    // console.log('hit')
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
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Sizes available</p>
                                                    </div>
                                                    <div className="productSizeDescriptionOuterLayer">
                                                        <div className="productSizeDescriptionInnerLayer">
                                                            <div className="productSizeDetails">
                                                                <div className="sizeCostCartWrap">
                                                                    <h3>Size nomenclature</h3>
                                                                    <p>Small - 4ft * 3ft</p>
                                                                </div>
                                                                <div className="sizeCostCartWrap">
                                                                    <h3>Cost over base price</h3>
                                                                    <p>Rs.20</p>
                                                                </div>
                                                            </div>
                                                            <div className="sizeEditingButtons">
                                                                <div className="editButton">
                                                                    <WhiteButton>
                                                                        Edit
                                                                </WhiteButton>
                                                                </div>
                                                                <div className="deleteButton">
                                                                    <WhiteButton>
                                                                        Delete
                                                                </WhiteButton>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                        <div className="prodDimensionHolder" >
                                                            {this.returnProductDimensions()}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Min.quantity</p>
                                                    </div>
                                                    <div className="ProductQuantitySection">
                                                        <InputForm
                                                            refName="productMinQuantity"
                                                            placeholder="Ex. 20"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="20"
                                                            result={(val) => this.setState({
                                                                produtMinQunatity: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Max.quantity</p>
                                                    </div>
                                                    <div className="ProductQuantitySection">
                                                        <InputForm
                                                            refName="productMaxQuantity"
                                                            placeholder="Ex. 20"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="20"
                                                            result={(val) => this.setState({
                                                                produtMinQunatity: val
                                                            })}
                                                        />
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
                                                        <GradientButton>
                                                            Proceed
                                                    </GradientButton>
                                                    </div>
                                                </div>


                                            </div>
                                        </section>
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