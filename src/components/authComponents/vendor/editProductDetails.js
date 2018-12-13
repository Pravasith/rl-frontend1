import React from "react"

import "../../../assets/sass/add_product_details.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";

import {
    LargePlusButtonIcon,
    PlusButtonIcon,
    CloseButton,
    BigCloseButton,
    ModalCloseButton,
    ErrorMsgSign,
    TickSmallWhite,
    SmallCloseButton,
    SmallModalCloseButton,
    MinusImageIcon,
    PlusImageIcon,
    LogoLoadingAnimation,
    NavBarLoadingIcon,
    SadFace
} from "../../../assets/images";

import LogoAnimation from "../../animations/logoAnimation"
import architectureStyles from "../../../lib/styleCategory"
import { GradientButton, InputForm, WhiteButton, RadioButton } from "../../UX/uxComponents"
import HtmlSlider from "../../UX/htmlSlider"
import Navbar from "../../navbar/navbar"
import { decryptData, encryptData } from "../../../factories/encryptDecrypt"
import ImageUploader from "../../UX/imageUploader"
import { api } from "../../../actions/apiLinks";
import { createClient } from "http";

class EditProductDetails extends React.Component {

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
            modalFinishDetails: "modalFinishDetailsClass",
            modalSize: "modalSizeClass",
            modalMaterial: "modalMaterialClass",
            // dynamincally toggle classes to flip styles //

            modalType : null,
            tempArr: [],
            dummyDataStructure: [],

            colorName: '',
            colorCode: '',
            sizeName: '',
            sizeCost: '',

            colorArray: [],

            // productMinQuantity: undefined,
            // productMaxQuantity: "",

            productDimensions: [],
            productMaterials: [],
            productFinishes: [],
            productImagesObject: {
                categoryName: "",
                imagesInCategory: []
            },

            tagsAdded: [],

            charCount: 20,

            // checked: undefined,

            isChecked: false,
            extraCostInput: 'extraCostInput hide',

            materialCost: '',

            productDescription : "",

            productDiscount: undefined,

            productFinishImage: "",
            productImage: "",

            isProceedClicked: false,
            inputFormContainer: "inputFormContainer",
            proceedOrNotCheck: "proceedOrNotCheck hide",

            // my code
            checkBoxSelect: "checkBoxSelect",
            categoryStylesAdded: [],

            erorrs: {},

            warningText: null,
            warningClass: "warningClass hide",
            fieldIsValid: false,

            checkBoxClass1: "checkBox",
            checkBoxClass2: "checkBox",

            // displayError: "displayError",
            displayError: "displayError hide",
            productQuantityErrorMessage: "productQuantityErrorMessage hide",
            productMinQuantityError: "productMinQuantityError hide",

            materialCostIsValid: false,
            sizeCostIsValid: false,
            finishCostIsValid: false,

            spliceOnEdit: true,
            finishModalTitle: "Add a close-up image thumbnail for this finish",

            finishModalContentPart: 1,
            showFinalProceed: "hide",

            architectureStyles : architectureStyles,

            finalProceed : "saveAndProceed",
            productTypes : [],

            
        }
    }



    componentDidMount = () => {
       

        this
            .props
            .getUserData()

            .then((data) => {
                let { userData, pId } = this.props

                // console.log(pId)

                //
                // DECRYPT REQUEST DATA
                //
                let decryptedData = decryptData(userData.responseData)
                //
                // DECRYPT REQUEST DATA
                //

                const rawData = { productId : pId }
                // console.log(rawData)
                
                //
                // Encrypt data
                //
                const encryptedData = encryptData(rawData)
                //
                // Encrypt data
                //
 

                // GET PRODUCT TYPES
                this.props.hitApi(api.GET_PRODUCT_DATA,"POST",
                    {
                        requestData : encryptedData,
                        message : "Requesting dispatch products"
                    }
                )
                .then(() => {

                    //
                    // DECRYPT REQUEST DATA
                    //
                    let decryptedData = decryptData(
                        this.props.responseData.responsePayload.responseData
                    )
                    //
                    // DECRYPT REQUEST DATA
                    //

                    console.log(decryptedData)

                    this.setState({
                        loadingClass: 'loadingAnim hide',
                        mainClass: 'mainClass',
                        // productTypes : decryptedData,


                        /// PLACE HERE ////
                        productName: decryptedData.productName,
                        productCode: decryptedData.productCode,
                        productPrice: decryptedData.basePrice,
                        productMaterials: decryptedData.productMaterials,
                        featuresAdded: decryptedData.features,
                        productFinishes: decryptedData.finishingOptions,
                        colorArray: decryptedData.colorOptions,
                        productDimensions: decryptedData.sizesAvailable,
                        productMinQuantity: decryptedData.minQuantity,
                        productMaxQuantity: decryptedData.maxQuantity,
                        productDescription : decryptedData.productDescription,
                        categoryStylesAdded: decryptedData.designStyles,
                        tagsAdded: decryptedData.tags,
                        // productType : decryptedData.productType,
                        productAvailability: decryptedData.availability,
                        productDiscount: decryptedData.discount,
                        productImagesObject: {
                            categoryName: "",
                            imagesInCategory: decryptedData.productImages
                        },
                        productThumbImage: decryptedData.productThumbImage

                    })
    
                    // console.log(this.props.pId)
                    this.discountAvailabilityChecked()
                })

                .catch((err) => {
                    if (err.response) {

                        // console.log(err.response)
                        if (err.response.status === 401)
                            window.open('/log-in', "_self")

                        else{
                            // window.open('/vendor/dashboard', "_self")
                        }
                    }
    
                    else{
                        console.error(err)
                        // window.open('/vendor/dashboard', "_self")
                    }
                        
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

    discountAvailabilityChecked = () => {
        if (this.state.productDiscount) {
            this.setState({
                checkBoxClass1: "checkBox color",
                checkBoxClass2: "checkBox"
            })
        } 

        else {
            this.setState({
                checkBoxClass1: "checkBox",
                checkBoxClass2: "checkBox color"
            })
        }
    }

    // componentDidUpdate() {
    //     let { productName,
    //         productCode,
    //         productPrice,
    //         productMaterials,
    //         productFinishes,
    //         colorArray,
    //         productDimensions,
    //         productMinQuantity,
    //         productMaxQuantity,
    //         categoryStylesAdded,
    //         tagsAdded,
    //         // productType,
    //         productAvailability,
    //         productDiscount,
    //         productImagesObject,
    //         productThumbImage } = this.state

    //     console.log(
    //         "productName:", productName,
    //         "productCode:", productCode,
    //         "productPrice:", productPrice,
    //         "productMaterials:", productMaterials,
    //         "productFinishes", productFinishes,
    //         "colorArray", colorArray,
    //         "productDimensions", productDimensions,
    //         "productMinQuantity", productMinQuantity,
    //         "productMaxQuantity", productMaxQuantity,
    //         "categoryStylesAdded", categoryStylesAdded,
    //         "tagsAdded", tagsAdded,
    //         // productType,
    //         "productAvailability", productAvailability,
    //         "productDiscount", productDiscount,
    //         "productImagesObject", productImagesObject,
    //         "productThumbImage", productThumbImage)
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
        let temp = this.state.featureName;

        if (temp !== undefined) {
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
        else {
            return ;
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

    removeStyles = (styleId) => {
        const styleArray = [...this.state.categoryStylesAdded]
        let indexOfStyle, styleName, indexToRemove

        const animationTimeLine = new TimelineLite()

        styleArray.map((item, i) => {
            if(item.styleId === styleId){
                indexOfStyle = i
                styleName = item.styleName
            }    
        })

        this
            .state
            .categoryStylesAdded
            .splice(indexOfStyle, 1)

            this.state.architectureStyles.map((item, i) => {
                if (item.styleTitle === styleName){
                    indexToRemove = i
                }
            })

            animationTimeLine.set(
                ".checkBoxNumber" + indexToRemove,
                {
                    "background" : "#FFFFFF"
                }
            )

            // if(this
            //     .state
            //     .categoryStylesAdded.map(item,index))
            // animationTimeLine.set(
            //     ".checkBoxNumber" + index,
            //     {
            //         "background" : "#FFFFFF"
            //     }
            // )

            this.setState({
                categoryStylesAdded: this.state.categoryStylesAdded.length !== 0 ? this.state.categoryStylesAdded : []
            })
    }

    handleStyleSelection = (styleDataIndex,styleData) => {

        const animationTimeLine = new TimelineLite()

        let { categoryStylesAdded } = this.state
        let styleDoesntExist = true

        animationTimeLine.set(
            ".checkBoxNumber" + styleDataIndex,
            {
                "background" : "#ff2c6b"
            }
        )

        // console.log(categoryStylesAdded)

        if(categoryStylesAdded.length === 0){
            styleDoesntExist = true
        }
        
        // if(categoryStylesAdded.length !== 0){
            else
            categoryStylesAdded.map((item, i) => {

                console.log(item.styleName, styleData.styleTitle)
                if(item.styleName === styleData.styleTitle){
                    styleDoesntExist = false
                }
            })
        // }
        
        if(styleDoesntExist){
            categoryStylesAdded.push({
                styleName: styleData.styleTitle,
                styleId: styleDataIndex
            })
        }
        

        let dummyArray = [...categoryStylesAdded]
        
        this.setState({
            categoryStylesAdded : dummyArray
        })
       
    }


    returnCategoryContent = () => {

        const {architectureStyles} = this.state
        return (
            architectureStyles
                .map((item , i) => {
                return(                    
                    <div 
                        className={"productStyleContainer " + i }
                        key = {i}
                        onClick = {() => {
                            this.handleStyleSelection(i,item)
                        }}
                        >
                        <header className="productStyleHeadingSection">
                            <div className="titleCategory">
                                <h3
                                >
                                    {item.styleTitle}
                                </h3>
                                <div className="line"></div>
                            </div>
                            <div
                                key = {i}
                                className= {"checkBoxSelect " + "checkBoxNumber" + i}
                                >
                                <div className="iconWrap">
                                    <TickSmallWhite/>
                                </div>
                            </div>
                        </header>
                        
                        <div className="productStyleContentSection">
                            <div className="productStyleContentSectionInnerLayer">
                                <div className="imageCategorySection">
                                    <img          
                                        src={item.styleImageUrl} 
                                        alt=""
                                    />
                                </div>
                                <div className="styleCategorySection">
                                    <p>
                                        {item.styleContent}
                                    </p>             
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }

    returnStyleContentAdded = () => {
        return(
            this
                .state
                .categoryStylesAdded
                .map((item,i) => {
                    return(
                        <div 
                            className="tagContainer"
                            key = {i}
                            >
                            <div 
                                className="tagConatinerInnerLayer">
                                <p>
                                    {item.styleName}
                                </p>

                                <div 
                                    className ="svgImageSection"
                                    onClick = {() => this.removeStyles(item.styleId)}
                                    >
                                    <SmallCloseButton />
                                </div>
                            </div>
                        </div> 
                    )
                })
           )
    }
 
    returnProductType = () => {
        return this.state.productTypes.map((item, i) => {
            return {
                id : item.productTypeId,
                value : item.productType,
            }
        })
    }

    returnProductAvailability = () => {
        return(
            [{
                id: 1,
                value: "Yes, it is available"
            },
            {
                id: 2,
                value: "No, it is not available"
            }]
        )
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
                            onClick={(i) => this.removeFeature(i)}
                            >
                            <CloseButton />
                        </div>
                    </div>
                )
            })
        )
    }

    returnColorModule = () => {
        return (
            this.state.colorArray
            .map((item, i) => {
                return (
                    <div
                        className="colorDescriptionOuterLayer"
                        key={i}
                    >
                        <div className="colorDescriptionInnerLayer">
                            <div className="contentColorContainer">
                                <div 
                                    className="colorDetails"
                                    style={{background : item.colorCode}}
                                >
                                </div>
                            </div>
                            <div className="contentColorValuesContainer">
                                <div className="colorNameContainer">
                                    <p>Color: <span>{item.colorName}</span> </p>
                                </div>
                                <div className="colorHexCodeContainer">
                                    <p>Color code: <span>{item.colorCode}</span> </p>
                                </div>
                                <div className="colorExtraCostContainer">
                                    <p key={i}>Rs. <span>{item.colorCost}</span> extra cost over base price</p>
                                </div>
                            </div>
                            <div
                                className="closeButtonContainer"
                                onClick={() => {
                                    this.removeColor(i)
                                }}
                            >
                                <CloseButton />
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
                                    {/* <div className="editButton">
                                        <WhiteButton 
                                            runFunction={() => this.editProductDimensions(i)}
                                            >
                                            Edit
                                        </WhiteButton>
                                    </div> */}
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

    // editProductDimensions = async (index) => {
    //     const sizeName = this.state.productDimensions[index].sizeName;
    //     const sizeCost = this.state.productDimensions[index].sizeCost; 

    //     if (sizeCost !== 0) {
    //         this.setState({
    //             isChecked: true,
    //             extraCostInput: "extraCostInput"
    //         })
    //     }

    //     const setSyncState = async () => {
    //         await this.setState({
    //             modalType: "size",
    //         })
    //     }

    //     await setSyncState()

    //     console.log(this.refs.sizeCost.value, this.refs.sizeName.value)
    //     console.log(sizeCost, sizeName)

    //     this
    //         .state
    //         .productDimensions
    //         .splice(index, 1)

    //     await this.setState({
    //         productDimensions: this.state.productDimensions.length !== 0 ? this.state.productDimensions : [],
    //         editButtonClicked: true
    //     })

    //     this.refs.sizeName.value = sizeName
    //     this.refs.sizeCost.value = sizeCost

    //     this.modalClassToggle("show")

    // }

    removeProductDimensions = (index) => {
        this
            .state
            .productDimensions
            .splice(index, 1)

        this.setState({
            productDimensions: this.state.productDimensions.length !== 0 ? this.state.productDimensions : []
        })
    }

    returnProductMaterials = () => {
        return (
            this
                .state
                .productMaterials
                .map((item, i) => {
                    return (
                        <div
                            className="productMaterialDescriptionOuterLayer"
                            key={i}
                        >
                            <div className="productMaterialDescriptionInnerLayer">
                                <div className="productMaterialDetails">
                                    <div className="materialCostCartWrap">
                                        <h3>Material nomenclature</h3>
                                        <p key={i}
                                        >{item.materialName}</p>
                                    </div>
                                    <div className="materialCostCartWrap">
                                        <h3>Cost over base price</h3>
                                        <p key={i}>Rs. {item.materialCost}</p>
                                    </div>
                                </div>
                                <div className="materialEditingButtons">
                                    {/* <div className="editButton">
                                        <WhiteButton
                                            runFunction={() => this.editProductMaterials(i)}
                                        >
                                            Edit
                                        </WhiteButton>
                                    </div> */}
                                    <div
                                        className="deleteButton"
                                        onClick={() => this.removeProductMaterials(i)}
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

    // editProductMaterials = async (index) => {
    //     const materialName = this.state.productMaterials[index].materialName;
    //     const materialCost = this.state.productMaterials[index].materialCost;

    //     const setSyncState = async () => {
    //         await this.setState({
    //             modalType: "material",
    //         })
    //     }

    //     await setSyncState()

    //     this
    //         .state
    //         .productMaterials
    //         .splice(index, 1)

    //     await this.setState({
    //         productMaterials: this.state.productMaterials.length !== 0 ? this.state.productMaterials : []
    //     })

    //     this.modalClassToggle("show")

    //     this.refs.materialName.value = materialName
    //     this.refs.materialCost.value = materialCost
    // }

    removeProductMaterials = (index) => {
        this
            .state
            .productMaterials
            .splice(index, 1)

        this.setState({
            productMaterials: this.state.productMaterials.length !== 0 ? this.state.productMaterials : []
        })
    }

    returnFinishCode = (finish) => {
        if (finish.finishCode !== "") {
            return (
                <div className="finishCodeCartWrapReturn">
                    <h3>Finish code </h3>
                    <p>{finish.finishCode}</p>
                </div>
            )
        }
    }

    returnProductFinishes = () => {

        return (
            this
                .state
                .productFinishes
                .map((item, i) => {
                    return (
                        <div
                            className="productFinishDescriptionOuterLayer"
                            key={i}
                        >
                            <div className="productFinishDescriptionInnerLayer">
                                <div className="finishImageContainer">
                                    <img
                                        key={i}
                                        src={item.finishImage}
                                        alt=""
                                    />
                                </div>

                                <div className="productFinishDetails">
                                    <div className="productFinishDetailsInnerLayer">
                                        <div className="finsihingOptionContent">
                                            <div className="finishCostCartWrap">
                                                <h3>Finish nomenclature</h3>
                                                <p key={i}>{item.finishName}</p>
                                            </div>
                                            <div className="finishCostCartWrap">
                                                <h3>Cost over base price</h3>
                                                <p key={i}>Rs. {item.finishCost}</p>
                                            </div>
                                            <div className="finishCodecartwrap" >
                                                {this.returnFinishCode(item)}
                                            </div>
                                        </div>
                                    
                                        <div className="finishEditingButtons">
                                            <div
                                                className="deleteButton"
                                                onClick={() => this.removeproductFinishes(i)}
                                            >
                                                <WhiteButton>
                                                    Delete
                                                </WhiteButton>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    )
                })
        )
    }

    // editproductFinishes = async (index) => {
    //     const finishName = this.state.productFinishes[index].finishName;
    //     const finishCost = this.state.productFinishes[index].finishCost;

    //     const setSyncState = async () => {
    //         await this.setState({
    //             modalType: "finish",
    //         })
    //     }

    //     await setSyncState()

    //     this
    //         .state
    //         .productFinishes
    //         .splice(index, 1)

    //     await this.setState({
    //         productFinishes: this.state.productFinishes.length !== 0 ? this.state.productFinishes : []
    //     })

    //     this.modalClassToggle("show")

    //     this.refs.finishName.value = finishName
    //     this.refs.finishCost.value = finishCost
    // }

    removeproductFinishes = (index) => {
        this
            .state
            .productFinishes
            .splice(index, 1)

        this.setState({
            productFinishes: this.state.productFinishes.length !== 0 ? this.state.productFinishes : []
        })
    }

    removeColor = (index) => {
        this.state.colorArray.splice(index, 1)

        this.setState({
            colorArray: this.state.colorArray.length !== 0 ? this.state.colorArray : []
        })
    }

    displayErrorModal = (modalType) => {
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

                    else if (emptyFieldInColor === "colorCost") {
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

        else if (modalType === "material") {
            if (this.state.materialIsValid === false) {
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInMaterial}</p>
                    </div>
                )
            }
        }

        else if (modalType === "finish") {
            if (this.state.finishDetailsIsValid === false) {
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInFinishDetails}</p>
                    </div>
                )
            }
        }
    }

    handleDefaultValues = (fieldName) => {
        const { 
            productName,
            productCode,
            productPrice,
            productMaterials,
            productFinishes,
            productMinQuantity,
            productMaxQuantity,
            productDescription,
            // productType,
            productAvailability,
            productDiscount,
            productThumbImage } = this.state

        if(fieldName === "ProductName") {
            if (productName) return productName;
        }

        else if (fieldName === "ProductCode") {
            if (productCode) return productCode;
        }

        else if (fieldName === "ProductPrice") {
            if (productPrice) return productPrice;
        }

        else if (fieldName === "ProductMaterials") {
            if (productMaterials) return productMaterials;
        }

        else if (fieldName === "ProductFinishes") {
            if (productFinishes) return productFinishes;
        }

        else if (fieldName === "ProductMinQuantity") {
            if (productMinQuantity) return productMinQuantity;
        }

        else if (fieldName === "ProductMaxQuantity") {
            if (productMaxQuantity) return productMaxQuantity;
        }

        else if (fieldName === "ProductDescription") {
            if (productDescription) return productDescription;
        }

        else if (fieldName === "ProductAvailability") {
            if (productAvailability) return productAvailability;
        }

        else if (fieldName === "DiscountInput") {
            if (productDiscount) return productDiscount;
        }

        else if (fieldName === "ProductThumbImage") {
            if (productThumbImage) return productThumbImage;
        }
    }

    checkTypeNumber = (e, checkFor) => {

        const val = e.target.value;
        const regEx = /^[0-9\b]+$/;

        console.log(val)

        if (val !== "") {
            if (regEx.test(val) === true) {
                if (checkFor === "discount") { 
                    this.setState({
                        productDiscount: val,
                        displayError: "displayError hide"
                    })
                }

                else if (checkFor === "color") {
                    this.setState({
                        colorCost: val,
                        displayError: "displayError hide"
                    })
                }

                else if (checkFor === "material") {
                    this.setState({
                        materialCost: val,
                        displayError: "displayError hide",
                        materialCostIsValid: true
                    })
                }

                else if (checkFor === "size") {
                    this.setState({
                        sizeCost: val,
                        displayError: "displayError hide",
                        sizeCostIsValid: true
                    })
                }

                else if (checkFor === "finish") {
                    this.setState({
                        finishCost: val,
                        displayError: "displayError hide",
                        finishCostIsValid: true
                    })
                }
            }

            else if (regEx.test(val) === false) {
                if (checkFor === "discount") {
                    this.setState({
                        productDiscount: "",
                        displayError: "displayError"
                    })
                }

                else if (checkFor === "color") {
                    this.setState({
                        colorCost: "",
                        displayError: "displayError"
                    })
                }

                else if (checkFor === "material") {
                    this.setState({
                        materialCost: "",
                        displayError: "displayError",
                        materialCostValid: false
                    })
                }

                else if (checkFor === "size") {
                    this.setState({
                        sizeCost: "",
                        displayError: "displayError",
                        sizeCostIsValid: false
                    })
                }

                else if (checkFor === "finish") {
                    this.setState({
                        finishCost: "",
                        displayError: "displayError",
                        finishCostIsValid: false
                    })
                }
            }
        }

        else if (val === "") {
            this.setState({
                displayError: "displayError hide"
            })
        }
    }

    productImageUpload = () => {
        let { productImage, productImagesObject } = this.state;

        let temp = {
            itemCode: this.state.productCode,
            textOnRibbonSatisfied: false,
            imageURL: productImage
        }

        if (temp.imageURL !== "") {
            let dummyArray = productImagesObject.imagesInCategory ? productImagesObject.imagesInCategory : [];

            if(!dummyArray.includes(temp)) {
                dummyArray.push(temp)
            }

            this.setState({
                productImagesObject: {
                    categoryName : "",
                    imagesInCategory : [...dummyArray]
                },
                productImage: ""
            })
        }
    }

    returnHtmlSliderforproductImagesObject = () => {
        if(this.state.productImagesObject.imagesInCategory.length !== 0) {
            return (
                <div className ="imageSliderParentWrap" >
                    {
                        /* 
                        <header className="uploadedHeaderSection">
                            <div className="headingArea">
                                <h3 className="headingColumn">Uploaded images</h3>
                                <div className="line"></div>
                            </div>
                        </header>
                        */
                    }

                    <div className="downSectionInnerLayer">
                        <HtmlSlider
                            categoryData={this.state.productImagesObject} // format of Item 
                            numberOfSlides={3} // Change the css grid properties for responsiveness
                            textOnRibbon={"TRENDING NOW"} // All caps
                            runFunction={(data) => {}}
                        />
                    </div>
                </div>
            )
        }
    }

    proceedHandler = (typeOfButtonClicked) => {

        const { colorArray,
                isChecked, 
                productDimensions,
                productFinishes,
                productMaterials,
                materialCostIsValid,  
                sizeCostIsValid,
                finishCostIsValid } = this.state;

        let isMaterialValid = false
        let isColorValid = false
        let isSizeValid = false
        let isFinishDetailsValid = false
        let emptyField
        let errorMessage

        const validateMaterialModal = (materialName, materialCost) => {

            if (materialName !== "") {
                if (isChecked) {
                    if (materialCost !== "") {
                        if (materialCostIsValid) {
                            isMaterialValid = true;
                        }
                        else {
                            emptyField = "Material Cost in Numbers";
                        }
                    }

                    else {
                        emptyField = "Material Cost";
                    }
                }

                else if (materialCost === 0) {
                    isMaterialValid = true;
                }
            }

            else if (materialName === "") {
                emptyField = "Material Name"
            }


            const validationData = {
                isMaterialValid,
                emptyField
            }

            return (
                validationData
            )
            
        }

        const validateColorModal = (colorName, colorCode, colorCost) => {
            if (colorName !== "" && colorCode !== "") {
                if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCode)) {

                    let alreadyExistingColorName = ""
                    const { colorArray } = this.state

                    if (colorArray.length === 0) {

                        // make an extra check here for colorCost
                        
                        if(isChecked === true){
                            if (colorCost !== "") {
                                if (!isNaN(colorCost)) {
                                    isColorValid = true
                                    colorArray.push({
                                        colorName: colorName.toLowerCase(),
                                        colorCode: colorCode.toLowerCase(),
                                        colorCost: parseInt(colorCost)
                                    })

                                    emptyField = ""
                                    errorMessage = ""

                                    this.setState({
                                        isChecked : false,
                                    })

                                    this.refs.colorName.value = ""
                                    this.refs.colorCode.value = ""
                                    this.refs.colorCost.value = ""
                                }

                                else if (isNaN(colorCost)) {
                                    isColorValid = false
                                    emptyField = "colorCost"
                                    errorMessage = "Please enter color cost only in numbers"
                                }
                            }

                            else {
                                isColorValid = false
                                emptyField = "colorCost"
                                errorMessage = `Please fill in the extra cost for the color`
                            }
                        }

                        else{
                            isColorValid = true
                            colorArray.push({
                                colorName: colorName.toLowerCase(),
                                colorCode: colorCode.toLowerCase(),
                                colorCost: parseInt(colorCost)
                            })
                        }

                    }

                    else {
                        let colorDoesntExist = true

                        colorArray.map((item, i) => {

                            colorCode = colorCode.toLowerCase()

                            if (item.colorCode === colorCode) {
                                alreadyExistingColorName = item.colorName
                                colorDoesntExist = false
                            }

                            else {
                                colorDoesntExist = true
                            }
                        })

                        if (colorDoesntExist === true) {

                            //// start color cost check ////

                            if (isChecked === true) {
                                if (colorCost !== "") {
                                    if (!isNaN(colorCost)) {
                                        isColorValid = true
                                        colorArray.push({
                                            colorName: colorName.toLowerCase(),
                                            colorCode: colorCode.toLowerCase(),
                                            colorCost: parseInt(colorCost)
                                        })

                                        emptyField = ""
                                        errorMessage = ""

                                        this.setState({
                                            isChecked: false,
                                        })

                                        this.refs.colorName.value = ""
                                        this.refs.colorCode.value = ""
                                        this.refs.colorCost.value = ""

                                    }

                                    else if (isNaN(colorCost)) {
                                        isColorValid = false
                                        emptyField = "colorCost"
                                        errorMessage = "Please enter color cost only in numbers"
                                    }
                                }

                                else {
                                    isColorValid = false
                                    emptyField = "colorCost"
                                    errorMessage = `Please fill in the extra cost for the color`
                                }
                            }

                            else {
                                isColorValid = true
                                colorArray.push({
                                    colorName: colorName.toLowerCase(),
                                    colorCode: colorCode.toLowerCase(),
                                    colorCost: parseInt(colorCost)
                                })
                            }
                        }

                        else if (colorDoesntExist === false) {
                            isColorValid = false
                            emptyField = "colorCode"
                            errorMessage = `You have already entered this color code with the name "${alreadyExistingColorName}"`
                        }
                    }
                }

                else {
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


                if (colorCode === "") {
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
            if(sizeName !== "") {
                if(isChecked){
                    if(sizeCost !== ""){
                        if(sizeCostIsValid){
                            isSizeValid = true;
                        }
                        else{
                            emptyField = "Size Cost in Numbers";
                        }
                    }

                    else{
                        emptyField = "Size Cost";
                    }
                }

                else{
                    if (sizeCost === 0){
                        isSizeValid = true;
                    }
                }
            }

            else if (sizeName === "") {
                emptyField = "Size Name"
            } 

            const validationData = {
                isSizeValid,
                emptyField
            }

            return validationData;
        }

        const validateFinishModal = (finishName, finishCost) => {
            if (finishName !== "") {
                if (isChecked) {
                    if (finishCost !== "") {
                        if (finishCostIsValid) {
                            isFinishDetailsValid = true;
                        }
                        else {
                            emptyField = "Finish Cost in Numbers";
                        }
                    }

                    else {
                        emptyField = "Finish Cost";
                    }
                }

                else {
                    if (finishCost === 0) {
                        isFinishDetailsValid = true;
                    }
                }
            }

            else if (finishName === "") {
                emptyField = "Finish Name"
            }

            const validationData = {
                isFinishDetailsValid,
                emptyField
            }

            return validationData;
        }

        if (typeOfButtonClicked === "color") {
            const colorCode = this.refs.colorCode.value
            const colorName = this.refs.colorName.value
            const colorCost = isChecked === true ? this.refs.colorCost.value : 0

            let validatedData = validateColorModal(colorName, colorCode, colorCost)

            if (validatedData.isColorValid) {

                this.setState({
                    colorIsValid: true,
                    emptyFieldInColor: null,
                    modalType: null,
                    isChecked: false,
                    colorArray: colorArray.length !== 0 ? colorArray : null,
                    extraCostInput: "extraCostInput hide",
                    displayError: "displayError hide"
                })

                // save data

                this.refs.colorCode.value = ""
                this.refs.colorName.value = ""

                this.modalClassToggle("dontShow")
            }

            else {

                this.setState({
                    colorIsValid: false,
                    emptyFieldInColor: validatedData.emptyField,
                    errorMessage: validatedData.errorMessage
                })
            }
        }

        else if (typeOfButtonClicked === "size") {

            const sizeName = this.refs.sizeName.value;
            const sizeCost = isChecked ? this.refs.sizeCost.value : 0;

            let validatedData = validateSizeModal(sizeName, sizeCost);

            if (validatedData.isSizeValid) {
                let temp = {
                    sizeName,
                    sizeCost
                }

                if(temp !== "") {
                    let dummyArray = [...productDimensions]

                    if(!dummyArray.includes(temp)){
                        productDimensions.push(temp)
                    }

                    this.setState({
                        sizeIsValid: true,
                        emptyFieldInSize: null,
                        modalType: null,
                        isChecked: false,
                        productDimensions: productDimensions.length !== 0 ? productDimensions : null,
                        extraCostInput: "extraCostInput hide",
                        displayError: "displayError hide"
                    })
                }

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

        else if (typeOfButtonClicked === "material") {
            
            const materialName = this.refs.materialName.value;
            const materialCost = isChecked ? this.refs.materialCost.value : 0 ;

            let validatedData = validateMaterialModal(materialName, materialCost);

            if (validatedData.isMaterialValid) {
                let temp = {
                    materialCost,
                    materialName
                }

                if (temp.materialName !== "") {
                    let dummyArray = [...productMaterials]

                    if (!dummyArray.includes(temp)) {
                        productMaterials.push(temp)

                        this.setState({
                            materialIsValid: true,
                            emptyFieldInMaterial: null,
                            modalType: null,
                            isChecked: false, 
                            productMaterials: productMaterials.length !== 0 ? productMaterials : null,
                            extraCostInput: "extraCostInput hide",
                            displayError: "displayError hide"
                        })
                    }
                }

                this.refs.materialCost.value = ""
                this.refs.materialName.value = ""

                this.modalClassToggle("dontShow")
            }

            else {
                this.setState({
                    materialIsValid: false,
                    emptyFieldInMaterial: validatedData.emptyField
                })
            }
        }

        else if (typeOfButtonClicked === "finish") {
            const finishName = this.refs.finishName.value;
            const finishCost = isChecked ? this.refs.finishCost.value : 0;
            const finishImage =  this.state.productFinishImage;
            const finishCode = this.refs.finishCode.value;

            let validatedData = validateFinishModal(finishName, finishCost);

            if (validatedData.isFinishDetailsValid) {
                let temp = {
                    finishName,
                    finishCost,
                    finishImage,
                    finishCode
                }

                if (temp !== "") {
                    let dummyArray = [...productFinishes]

                    if (!dummyArray.includes(temp)) {
                        productFinishes.push(temp)
                    }

                    this.setState({
                        finishDetailsIsValid: true,
                        emptyFieldInFinishDetails: null,
                        modalType: null,
                        isChecked: false,
                        productFinishes: productFinishes.length !== 0 ? productFinishes : null,
                        extraCostInput: "extraCostInput hide",
                        displayError: "displayError hide",
                        productFinishImage: "",
                        finishModalTitle: "Add a close - up image thumbnail for this finish",
                        finishModalContentPart: 1
                    })
                }

                this.refs.finishCost.value = ""
                this.refs.finishName.value = ""
                this.refs.finishCode.value = ""

                this.modalClassToggle("dontShow")
            }

            else {
                this.setState({
                    finishDetailsIsValid: false,
                    emptyFieldInFinishDetails: validatedData.emptyField
                })
            }
        }
    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleColorInput = (e) => {
        this.setState({
            colorPreview : e.target.value
        })
    }


    setTagName = (e) => {
        const val = e.target.value

        this.setState({
            charCount: 20 - val.length,
            tagName: val
        })
    }

    addTagName = () => {

        let temp = this.state.tagName;

        if (temp !== undefined) {

            let dummyTagsArray = [...this.state.tagsAdded]

            dummyTagsArray = dummyTagsArray.map(item => item.toLowerCase())

            if (!dummyTagsArray.includes(temp.toLowerCase())) {
                this.state.tagsAdded.push(temp)
            }

            this.setState({
                tagsAdded: this.state.tagsAdded.length !== 0 ? this.state.tagsAdded : [this.state.tagName]
            })

            this.refs.tagInput.value = ""
        }

    }

    returnTagsAdded = () => {
        return (
            this
                .state
                .tagsAdded
                .map((item, i) => {
                    return (
                        <div
                            className="tagWrap"
                            key={i}
                        >
                            <div className="tagWrapInnerLayer">
                                <ul>
                                    <li>
                                        <p key={i}>
                                            {item}
                                        </p>
                                    </li>
                                </ul>
                                <div
                                    className="deleteIcon"
                                    onClick={() => this.removeTags(i)}
                                >
                                    <SmallCloseButton />
                                </div>
                            </div>


                        </div>
                    )
                })
        )
    }

    removeTags = (index) => {

        this
            .state
            .tagsAdded
            .splice(index, 1)

        this.setState({
            tagsAdded: this.state.tagsAdded.length !== 0 ? this.state.tagsAdded : []
        })

    }

    handleRadiobutton = async (e, type) => {
        const { productTypes } = this.state;
        const val = e.target.value;


        if (type === "productAvailability") {

            let productAvailability
            if(val.toLowerCase() === "yes, it is available"){
                productAvailability = true
            }
            else if(val.toLowerCase() === "no, it is not available"){
                productAvailability = false
            }

            // console.log(productAvailability)
            
            this.setState({ 
                productAvailability: val,
                productAvailabilityBool : productAvailability
            })
        }

        else if(type === "productType") {
            productTypes.map((item, i) => {
                if (item.productType === val) {
                    this.setState({ 
                        productType: item.productTypeId,
                        productTypeChecked: val
                    })
                }
            })
        }
    }

    returnExtraCost = (type) => {
        const { extraCostInput } = this.state;

        if(type === "color") {
            return (
                <div className={extraCostInput}>
                    <input
                        type="text"
                        name="colorCost"
                        placeholder="Ex. 20"
                        onChange={(e) => this.checkTypeNumber(e, "color")}
                        ref="colorCost"
                    />
                    <span className="InputSeparatorLine"> </span>
                </div>
            )
        }

        else if(type === "size") {
            return (
                <div className={extraCostInput}>
                    <input
                        type="text"
                        name="sizeCost"
                        placeholder="Ex. 20"
                        onChange={(e) => this.checkTypeNumber(e, "size")}
                        ref="sizeCost"
                    />
                    <span className="InputSeparatorLine"> </span>
                </div>
            )
        }

        else if(type === "material") {
            return (
                <div className={extraCostInput}>
                    <input
                        type="text"
                        name="materialCost"
                        placeholder="Ex. 20"
                        onChange={(e) => this.checkTypeNumber(e, "material")}
                        ref="materialCost"
                    />
                    <span className="InputSeparatorLine"> </span>
                </div>
            )
        }

        else if (type === "finish") {
            return (
                <div className={extraCostInput}>
                    <input
                        type="text"
                        name="finishCost"
                        placeholder="Ex. 20"
                        onChange={(e) => this.checkTypeNumber(e, "finish")}
                        ref="finishCost"
                    />
                    <span className="InputSeparatorLine"> </span>
                </div>
            )
        }
    }

    returnProductFinishUploadedImage = () => {
        return (
            <div className="whiteSquareForModal">
                <div className="whiteSquareModalUpperContainer">
                    <div className="vendorDashboardModal">
                        <div className="modalHeader finsihModalHeader">
                            <h3>{this.state.finishModalTitle}</h3>
                            <div className="line"></div>
                        </div>
                    </div>

                    <div className={this.state.inputFormContainer}>
                        <div className="formParaSection finishInputParaContainer">
                            <div className="exampleUploadedImgThumbnail">
                                <img className="uploadedImage" src="https://res.cloudinary.com/wnbcloud/image/upload/h_300,w_400/v1467638340/ash2_wqnx4x.jpg" alt="" />
                            </div>
                            <p className="pargraphClass">Example: The image thumbnail for Pinewood finish looks like this</p>
                        </div>
                    </div>

                    <div className="imageUploaderContainer">
                        <div className="imageUploaderInnerLayerContainer">
                            <div className="imageUploaderOuterLayer">
                                <ImageUploader
                                    imageType="regularImage" // regularImage || profileImage
                                    resultData={(data) => {
                                        this.setState({ 
                                            productFinishImage: data.imageURL,
                                            inputFormContainer: "inputFormContainer hide",
                                            proceedOrNotCheck: "proceedOrNotCheck",
                                            finishModalTitle: "Image preview"
                                        })
                                    }}
                                    showInitialImage={this.state.productFinishImage} // image src link // optional
                                    imageClassName="productFinishImageClass"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className={this.state.proceedOrNotCheck}>
                    <GradientButton
                        runFunction={() => {
                            this.modalClassToggle("show")
                            this.setState({
                                finishModalContentPart: 2,
                                inputFormContainer: "inputFormContainer",
                                proceedOrNotCheck: "proceedOrNotCheck hide",
                                finishModalTitle: "Image preview"
                            })
                        }}
                    >
                        Proceed
                    </GradientButton>
                </div>
            </div>
        )
    }

    sendProductsDataToBackend = () => {
        this.setState({
            finalProceed : "sendRequest"
        })

        const finalDataToSend = {
            productName : this.state.productName,
            productCode : this.state.productCode,
            basePrice : this.state.productPrice,
            productMaterials : this.state.productMaterials,
            finishingOptions : this.state.productFinishes,
            colorOptions :  this.state.colorArray,
            sizesAvailable : this.state.productDimensions,
            minQuantity : this.state.productMinQuantity,
            maxQuantity : this.state.productMaxQuantity,
            productDescription : this.state.productDescription,
            features : this.state.featuresAdded,
            designStyles : this.state.categoryStylesAdded,
            productTypeId : this.state.productType,
            tags : this.state.tagsAdded,
            availability : this.state.productAvailabilityBool,
            discount : this.state.productDiscount,
            productImages : this.state.productImagesObject.imagesInCategory,
            productThumbImage : this.state.productImageThumbnail

            // this.state.productName
            // this.state.productCode
            // this.state.productPrice
            // this.state.productMaterials
            // this.state.productFinishes
            // this.state.colorArray
            // this.state.productDimensions
            // this.state.productMinQuantity
            // this.state.productMaxQuantity
            // this.state.categoryStylesAdded
            // this.state.tagsAdded
            // this.state.productType
            // this.state.productAvailability
            // this.state.productDiscountAvailablity
            // this.state.productDiscount
            // this.state.productImagesObject
        }


        //
        // Encrypt data
        //
        const encryptedData = encryptData(finalDataToSend)
        //
        // Encrypt data
        //


        // GET PRODUCT TYPES
        this.props.hitApi(api.ADD_NEW_PRODUCT,"POST",
            {
                requestData : encryptedData,
                message : "Delivering new product, foxtrot"
            }
        )
        .then(() => {

            //
            // DECRYPT REQUEST DATA
            //
            let decryptedData = decryptData(
                this.props.responseData.responsePayload.responseData
            )
            //
            // DECRYPT REQUEST DATA
            //

            // console.log(decryptedData)

            window.open("/vendor/dashboard", "_self")
        })

        .catch((err) => {
            if (err.response) {

                // console.log(err.response)
                if (err.response.status === 401)
                    window.open('/log-in', "_self")

                else{
                    // window.open('/vendor/dashboard', "_self")
                }
            }

            else{
                this.setState({
                    finalProceed : "errorScreen"
                })
                // window.open('/vendor/dashboard', "_self")
            }
                
        })


        // console.log(finalDataToSend)
    }

    returnProductsContent = () => {
        if(this.state.finalProceed === "saveAndProceed")
        return (
            <div className="content">
                <h3>Final step - Choose a thumb image for your product</h3>
                <div className="line"></div>
                <div className="detailsToInput">
                    <div className="imageInput">
                        <HtmlSlider
                            categoryData={this.state.productImagesObject} // format of Item 
                            numberOfSlides={3} // Change the css grid properties for responsiveness
                            textOnRibbon={""} // All caps
                            runFunction={(data) => {
                                this.setState({
                                    productImageThumbnail: data.imageURL,
                                    showFinalProceed : "showFinalProceed",
                                    // finalProceed: "sendRequest"
                                })
                            }}
                        />
                    </div>
                </div>

                <div className= {this.state.showFinalProceed}>
                    <img 
                        src={this.state.productImageThumbnail} 
                        alt=""
                        style={{ width: "5em", height: "5em" }}
                    />

                    <GradientButton
                        runFunction={() => {
                            this.sendProductsDataToBackend()
                        }}>
                        Proceed
                    </GradientButton>
                </div>
            </div>
        )

        else if(this.state.finalProceed === "sendRequest"){
            return(
                <div className="loadingWrapperProducts">
                    <NavBarLoadingIcon/>
                    <h3 className="loadingHeader">
                        Saving your product...
                    </h3>
                </div>
            )
        }

        else if(this.state.finalProceed === "errorScreen"){
            return(
                <div className="loadingWrapperProducts">
                    <SadFace/>
                    <h3 className="loadingHeader">
                        Oops, there has been an error in saving your product, 
                        <span
                            onClick = {() => {
                                this.setState({
                                    finalProceed : "saveAndProceed"
                                })
                            }}
                            >click here</span> to try again
                    </h3>
                </div>
            )
        }

        
    }

    returnModal = () => {
        const { modalType, finishModalContentPart } = this.state;

        const returnModalContent = () => {
            if(modalType === "finish") {

                if (finishModalContentPart === 1){
                    return (
                        <div className={this.state.modalFinish}>
                            <div className="dummyXClass">
                                {this.returnProductFinishUploadedImage()}
                            </div>
                        </div>
                    )     
                }

                else if (finishModalContentPart === 2){
                    return (
                        <div className={this.state.modalFinishDetails}>
                            <div className="dummyXClass">
                                <div className="whiteSquareForModal">
                                    <div className="whiteSquareModalUpperContainer">
                                        <div className="vendorDashboardModal">
                                            <div className="modalHeader">
                                                <h3>Finish details</h3>
                                                <div className="line"></div>
                                            </div>
                                        </div>
                                        <div className="finishEndModal">
                                            <div>
                                                <img
                                                    src={this.state.productFinishImage}
                                                    alt=""
                                                    style={{ width: "5em", height: "5em" }}
                                                />
                                            </div>
                                            <div className="finsihingDetails">
                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Name of the finish</p>
                                                    </div>
                                                    <div className="productInputInfoSection productFinishName">
                                                        <div className="modalMandatorySection">
                                                            <p className="madatoryHighlight">Mandatory</p>
                                                        </div>
                                                        <div className="modalInputCategory">
                                                            <input
                                                                type="text"
                                                                name="finishName"
                                                                placeholder="Ex. Glass reinforced concrete"
                                                                onChange={this.onChangeHandler}
                                                                ref="finishName"
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="switchContainer">
                                                    <div className="labelUpperColumn">
                                                        <div className="switchContainerParagraph">
                                                            <p>Is there an extra cost over base price ?</p>
                                                        </div>
                                                        <label className="switch">
                                                            <input
                                                                ref="switch"
                                                                checked={this.state.isChecked}
                                                                onChange={() => this.onToggleSwitch()}
                                                                className="switch"
                                                                type="checkbox" />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                    <div className="returnInputColumn">
                                                        {this.returnExtraCost("finish")}
                                                    </div>
                                                </div>
                                                <div className="errorContent">
                                                    <p className={this.state.isChecked ? this.state.displayError : "displayError hide"}>
                                                        Numbers Only
                                                    </p>
                                                </div>
                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Finish code (if any)</p>
                                                    </div>
                                                    <div className="modalInputCategory">
                                                        <input
                                                            type="text"
                                                            name="finishCode"
                                                            placeholder="Ex. #4erfd, 8fds@ etc."
                                                            onChange={this.onChangeHandler}
                                                            ref="finishCode"
                                                        />
                                                        <span className="InputSeparatorLine"> </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="proceedOrNotCheck">
                                        <GradientButton
                                            runFunction={() => this.proceedHandler("finish")}
                                        >
                                            Proceed
                                        </GradientButton>
                                        {this.displayErrorModal("finish")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
   
            }

            else if (modalType === "color") {
                return (
                    <div className={this.state.modalColor}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="whiteSquareModalUpperContainer">
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
                                                                onChange={this.onChangeHandler}
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">
                                                            Enter the color hex-code (<a href="https://www.google.co.in/search?rlz=1C1CHBF_enIN822IN822&ei=aE0GXKaEO4norQG06bjgAw&q=color+selector+tool&oq=color+selector+&gs_l=psy-ab.1.0.0j0i67j0l8.1356.1356..2888...0.0..0.168.168.0j1......0....1..gws-wiz.......0i71.SepRdDVz0P4" target="_blank">click here</a> to get one)
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

                                                <div className="switchContainer">
                                                    <div className="labelUpperColumn">
                                                        <div className="switchContainerParagraph">
                                                            <p>Is there an extra cost over base price ?</p>
                                                        </div>
                                                        <label className="switch">
                                                            <input 
                                                                ref="switch"
                                                                checked={this.state.isChecked}
                                                                onChange={() => this.onToggleSwitch()}
                                                                className="switch"
                                                                type="checkbox"/>
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                    <div className="returnInputColumn">
                                                        {this.returnExtraCost("color")}
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="errorContent">
                                            <p className={this.state.isChecked ? this.state.displayError : "displayError hide"}>
                                                Numbers Only
                                            </p>
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

                                    {this.displayErrorModal("color")}
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
                                <div className="whiteSquareModalUpperContainer">
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
                                            <div className="modalMandatorySection">
                                                <p className="madatoryHighlight">Mandatory</p>
                                            </div>
                                            <div className="modalInputCategory">
                                                <input
                                                    type="text"
                                                    name="sizeName"
                                                    placeholder="Ex. Small / Extra-large / 2ftx3ft"
                                                    onChange={this.onChangeHandler}
                                                    ref="sizeName"
                                                />
                                                <span className="InputSeparatorLine"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="switchContainer">
                                        <div className="labelUpperColumn">
                                            <div className="switchContainerParagraph">
                                                <p>Is there an extra cost over base price ?</p>
                                            </div>
                                            <label className="switch">
                                                <input 
                                                    ref="switch"
                                                    checked={this.state.isChecked}
                                                    onChange={() => this.onToggleSwitch()}
                                                    className="switch"
                                                    type="checkbox"/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                        <div className="returnInputColumn">
                                            {this.returnExtraCost("size")}
                                        </div>
                                    </div>

                                    <div className="errorContent">
                                    <p className={this.state.isChecked ? this.state.displayError : "displayError hide"}>
                                        Numbers Only
                                    </p>
                                </div>
                                </div>
                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => this.proceedHandler("size")}>
                                        Proceed
                                    </GradientButton> 
                                    {this.displayErrorModal("size")}
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }

            else if (modalType === "material") {
                return (
                    <div className={this.state.modalMaterial}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="whiteSquareModalUpperContainer">
                                    <div className="vendorDashboardModal">
                                        <div className="modalHeader">
                                            <h3>Material details</h3>
                                            <div className="line"></div>
                                        </div>
                                    </div>

                                    <div className="inputFormContainer">
                                        <div className="formParaSection">
                                            <p className="pargraphClass">Material name</p>
                                        </div>
                                        <div className="productInputInfoSection productMaterialName">
                                            <div className="modalMandatorySection">
                                                <p className="madatoryHighlight">Mandatory</p>
                                            </div>
                                            <div className="modalInputCategory">
                                                <input
                                                    type="text"
                                                    name="materialName"
                                                    placeholder="Ex. Glass reinforced concrete"
                                                    onChange={this.onChangeHandler}
                                                    ref="materialName"
                                                />
                                                <span className="InputSeparatorLine"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="switchContainer">
                                        <div className="labelUpperColumn">
                                            <div className="switchContainerParagraph">
                                                <p>Is there an extra cost over base price ?</p>
                                            </div>
                                            <label className="switch">
                                                <input 
                                                    ref="switch"
                                                    checked={this.state.isChecked}
                                                    onChange={() => this.onToggleSwitch()}
                                                    className="switch"
                                                    type="checkbox"/>
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                        <div className="returnInputColumn">
                                            {this.returnExtraCost("material")}
                                        </div>
                                    </div>

                                    <div className="errorContent">
                                    <p className={this.state.isChecked ? this.state.displayError : "displayError hide"}>
                                        Numbers Only
                                    </p>
                                </div>
                                </div>
                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => this.proceedHandler("material")}
                                        >
                                        Proceed
                                    </GradientButton>
                                    {this.displayErrorModal("material")}
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }

            else if (modalType === "validation") {
                if (this.state.emptyField.length !== 0) {
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
                                                    <h3>Please provide the following details</h3>
                                                    <div className="detailsToInput">
                                                        <div className="detailsInputLayer">
                                                            <div className="notFilledSection">
                                                                {this
                                                                    .state
                                                                    .emptyField
                                                                    .map((item, i) =>
                                                                        <div
                                                                            className="errorFieldMessage"
                                                                            key={i}>
                                                                            <ul>
                                                                                <li>
                                                                                    <p>{item}</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    )}
                                                            </div>
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

                else if (this.state.emptyField.length === 0) {
                    return (
                        <div className={this.state.modalClassToggle}>
                            <div className="dummyXClass">
                                <div className="whiteSquareForModal">
                                    <div className="addProductDetailsModal">
                                        <div className="modalContentContainer">
                                            <div className="modalContentContainerInnerLayer">
                                                {this.returnProductsContent()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
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
                                    this.setState({ 
                                        spliceOnEdit: false,
                                        isChecked: false, 
                                        extraCostInput: "extraCostInput hide",
                                        displayError: "displayError hide",
                                        colorIsValid: true,
                                        sizeIsValid: true,
                                        materialIsValid: true,
                                        finishDetailsIsValid: true
                                    })
                                    this.handleClearExtraCostInput()
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

    handleClearExtraCostInput = () => {
        if (this.state.modalType === "color") {
            if (this.refs.colorCost.value !== "") return this.refs.colorCost.value = "";
        }
            
        else if (this.state.modalType === "size") {
            if (this.refs.sizeCost.value !== "") return this.refs.sizeCost.value = "";
        }

        else if (this.state.modalType === "finish") {
            if (this.refs.finishCost) {
                if (this.refs.finishCost.value !== "") return this.refs.finishCost.value = "";
            }
        }

        else if (this.state.modalType === "material") {
            if (this.refs.materialCost.value !== "") return this.refs.materialCost.value = "";
        }
    }


    onToggleSwitch = async () => {
        await this.setState({ isChecked: !this.state.isChecked });

        if (this.state.isChecked === true) this.setState({ extraCostInput: "extraCostInput" });
        else if(this.state.isChecked === false) this.setState({ extraCostInput: "extraCostInput hide" });
    }

    validateProceedHandler = async () => {
       const fieldNames = [
           { fieldName: 'Product Name', value: this.state.productName },
           { fieldName: 'Product Code', value: this.state.productCode },
           { fieldName: 'Base price of this product', value: this.state.productPrice },
           { fieldName: 'Material', value: this.state.productMaterials },
           { fieldName: 'Finishing Options', value: this.state.productFinishes },
           { fieldName: 'Color Options', value: this.state.colorArray },
           { fieldName: 'Sizes Available', value: this.state.productDimensions },
           { fieldName: 'Min. quantity', value: this.state.productMinQuantity },
           { fieldName: 'Max. quantity', value: this.state.productMaxQuantity },
           { fieldName: 'Product Design', value: this.state.categoryStylesAdded },
           { fieldName: 'Product Tags', value: this.state.tagsAdded },
           { fieldName: 'Product Type', value: this.state.productType },
           { fieldName: 'Product Availability', value: this.state.productAvailability },
           { fieldName: `${this.state.productDiscountAvailablity === "yes" ? 
                                (this.state.productDiscount === undefined ?
                                    'Product Discount Value'  : null) : 
                                    'Product Discount Availability'}`, 
                                        value: this.state.productDiscount },
           { fieldName: 'Product Image', value: this.state.productImagesObject.imagesInCategory }

       ]

       await this.setState({
           emptyField: []
       })

       fieldNames.map(item => {
           if (item.value === undefined || item.value === null || item.value.length === 0) {
               if (!this.state.emptyField.includes(item.fieldName))
                   this.state.emptyField.push(item.fieldName)
           }
       })

       this.setState({
           emptyField: this.state.emptyField
       })

       this.modalClassToggle("show");
    }

    toggleOptions = (yesOrNo) => {

        if(yesOrNo === "yes"){
            this.setState({
                checkBoxClass1 : "checkBox color",
                checkBoxClass2: "checkBox",
                productDiscountAvailablity: "yes",
                productDiscount: undefined
            })
        }

        else if(yesOrNo === "no"){
            this.setState({
                checkBoxClass1: "checkBox",
                checkBoxClass2 : "checkBox color",
                displayError: "displayError hide",
                productDiscountAvailablity: "no",
                productDiscount: 0
            })

            this.refs.discountInput.value = "";
        }
    }
    
    focus = () => {
        this.refs.discountInput.focus();
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

                                                            <div className="productImageUploaderRender">
                                                                {
                                                                    this.state.productImage === "" 
                                                                    ? 
                                                                    <div className="productImageUploaderClass">
                                                                        <ImageUploader
                                                                            imageType="regularImage" // regularImage || profileImage
                                                                            resultData={(data) => {
                                                                                this.setState({
                                                                                    productImage: data.imageURL
                                                                                })
                                                                                this.productImageUpload();
                                                                            }}
                                                                            showInitialImage={this.state.productImage !== "" ? this.state.productImage : ""}
                                                                            imageClassName="productImageClass"
                                                                        />
                                                                    </div>
                                                                    :
                                                                    <div className="productImageUploaderClass"></div>
                                                                
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            
                                            <div className="imageUploadDownSection">
                                                {this.returnHtmlSliderforproductImagesObject()}
                                            </div>

                                        </section>
                                    </article>
                                </div>

                                <div className="uploadSectionRightWrapper">
                                    <article className="rightWrapperInnerLayer">

                                        <header className="vendorFormHeading">

                                            <div className="headingArea">
                                                <h3 className="headingClass">Product Manager</h3>

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
                                                            value={this.handleDefaultValues("ProductName")}
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
                                                            refName="productCode"
                                                            placeholder="Type here"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="30"
                                                            value={this.handleDefaultValues("ProductCode")}
                                                            result={(val) => this.setState({
                                                                productCode: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>


                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Base price of this product</p>
                                                    </div>
                                                    <div className="PricingSection">
                                                        <InputForm
                                                            refName="productPrice"
                                                            placeholder="Type here (in Rupees)"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="30"
                                                            value={this.handleDefaultValues("ProductPrice")}
                                                            result={(val) => {
                                                                this.setState({
                                                                    productPrice: val
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Material</p>
                                                    </div>
                                                    <div className="productMaterialSection">

                                                        {this.returnProductMaterials()}

                                                    </div>

                                                    <div className="buttonContainer">

                                                        <WhiteButton
                                                            runFunction={() => {
                                                                this.modalClassToggle("show")
                                                                this.setState({
                                                                    modalType: "material"
                                                                })
                                                            }}
                                                        >
                                                            <div className="svgImageContainer">
                                                                <PlusButtonIcon />
                                                            </div>
                                                            Add new material
                                                        </WhiteButton>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Features / specifications of the product </p>
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

                                                    <div className="productFinishSection">

                                                        {this.returnProductFinishes()}

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
                                                        >
                                                            Color options 
                                                        </p>
                                                    </div>

                                                    <div className="colorSelectionContainer">
                                                        <div className="addColorDummyContainer">
                                                            <div className="addColorDummyContainerInnerLayer">
                                                                <div 
                                                                    className="addButtonContainer"
                                                                    onClick={() => {
                                                                            this.modalClassToggle("show")
                                                                            this.setState({
                                                                                modalType : "color"
                                                                            }
                                                                        )}
                                                                    }
                                                                >

                                                                    <div className="svgImageContainer">
                                                                        <LargePlusButtonIcon />
                                                                    </div>

                                                                    <h3>Add new color</h3>
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
                                                         <p className="pargraphClass">Min.quantity</p>
                                                     </div>
                                                     <div className="ProductQuantitySection">
                                                         <InputForm
                                                            refName="productMinQuantity"
                                                            placeholder="Ex. 5"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="20"
                                                            value={this.handleDefaultValues("ProductMinQuantity")}
                                                            // value={this.state.productMinQuantity ? this.state.productMinQuantity : null}
                                                            result={(val) => {
                                                                this.setState({
                                                                    productMinQuantity: val
                                                                })
                                                            }}
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
                                                            placeholder="Ex. 99999"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="20"
                                                            value={this.handleDefaultValues("ProductMaxQuantity")}
                                                            result={(val) => {
                                                                this.setState({
                                                                    productMaxQuantity: val
                                                                })
                                                        }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={this.state.productQuantityErrorMessage}>
                                                    <p>Max. quantity should be greater than Min. quantity</p>
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
                                                            value={this.handleDefaultValues("ProductDescription")}
                                                            result={(val) => this.setState({
                                                                productDescription: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="inputFormContainer">

                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Features / specifications of the product </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <InputForm
                                                            refName="featureName"
                                                            placeholder="Type here"
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            result={(val) => this.setState({
                                                                featureName: val
                                                            })}
                                                        />
                                                    </div>

                                                </div> */}
                                           
                                                
                                                <div className="inputFormContainer">
                                                        
                                                    <div className="formParaSection">
                                                        <h3 className="pargraphClass"> Choose the product’s design style </h3>
                                                    </div>

                                                    {/* <div className="designStyleCategoryTagsContainer">
                                                        <div className="designStyleTagsInnerLayer">
                                                            {this.returnStyleContentAdded()}
                                                        </div>
                                                    </div> */}

                                                    <div className="designStylesOuterLayer">

                                                        <div className="designStyleCategoryTagsContainer">
                                                            <div className="designStyleTagsInnerLayer">
                                                                {this.returnStyleContentAdded()}
                                                            </div>
                                                        </div>

                                                        <div className="designStylesInnerLayer">
                                                            <div className="dummyInnerLayer">
                                                                 {this.returnCategoryContent()} 
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Add tags for your product </p>
                                                    </div>

                                                    <div className="inputCategoryTagSection">
                                                        <div className="tagInputContainer">
                                                        <div className="modalMandatorySection">
                                                            <p className="madatoryHighlight">Mandatory</p>
                                                        </div>
                                                            <div className="materialInfoColumn">
            
                                                                <input
                                                                    placeholder="For Ex. Sofa"
                                                                    ref="tagInput"
                                                                    type="text"
                                                                    maxLength="20"
                                                                    onChange={e => this.setTagName(e)}
                                                                    onKeyPress={e => {
                                                                        if (e.key === "Enter") {
                                                                            this.setTagName(e)
                                                                            this.addTagName()
                                                                        }
                                                                    }}
                                                                />
                                                                <span className="InputSeparatorLine"> </span>
                                                            </div>

                                                            <WhiteButton
                                                                runFunction={this.addTagName}
                                                            >
                                                                Add
                                                            </WhiteButton>
                                                        </div>


                                                        <div className="productTagsCategory">
                                                            <div className="productTagsCategoryInnerLayer">
                                                                {this.returnTagsAdded()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">

                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Choose the product type </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <RadioButton
                                                            title="Product Design"
                                                            name={'productType'}
                                                            options={this.returnProductType()}
                                                            selectedOption={this.state.productTypeChecked}
                                                            onChange={(e) => this.handleRadiobutton(e, "productType")}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="inputFormContainer">

                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Is the product available? </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <RadioButton
                                                            title="Product Availability"
                                                            name={'availability'}
                                                            options={this.returnProductAvailability()}
                                                            selectedOption={this.state.productAvailability === true ? 
                                                                                    "Yes, it is available" : "No, it is not available"}
                                                            onChange={(e) => this.handleRadiobutton(e, "productAvailability")}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Is there a discount on this product now? </p>
                                                    </div>

                                                    <div 
                                                        className="materialInfoColumn"
                                                        >

                                                        <div 
                                                            className="optionDiv"
                                                            onClick = {() => {
                                                                this.toggleOptions("yes")
                                                                this.focus()
                                                            }}
                                                            >
                                                            <div className={this.state.checkBoxClass1}></div>
                                                            <div className="contentForOptionSelection">
                                                                <div className="nonErrorContent">
                                                                    <p>Yes, we are offering a discount of</p>
                                                                    <div className="inputSection">
                                                                        <input 
                                                                            type="text" 
                                                                            ref="discountInput"
                                                                            maxLength="2" 
                                                                            defaultValue={this.handleDefaultValues("DiscountInput")}
                                                                            onChange={(e) => this.checkTypeNumber(e, "discount")}
                                                                        />
                                                                        <p>%</p>
                                                                    </div>
                                                                </div>
                                                                <div className="errorContent">
                                                                    <p className={this.state.displayError}>
                                                                        Numbers Only
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div 
                                                            className="optionDiv"
                                                            onClick={() => {
                                                                this.toggleOptions("no")

                                                            }}
                                                            >
                                                            <div className={this.state.checkBoxClass2}></div>
                                                            <div className="contentForOptionSelection">
                                                                <p>No, there is no discount</p>
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
                                                        {   
                                                            // this.checkForValue()
                                                            this.validateProceedHandler()
                                                            this.modalClassToggle("show")
                                                            this.setState({
                                                                modalType : "validation"
                                                            })                  
                                                        }}>
                                                    Save and Proceed
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

export default connect(mapStateToProps, matchDispatchToProps)(EditProductDetails)



    // handleStyleSelection = (styleData) => {
    //     this.state.categoryStylesAdded.push(styleData.styleTitle)
    //     let dummyArray = [...new Set(this.state.categoryStylesAdded.map(item => item))]

    //     this.setState({
    //         categoryStylesAdded : dummyArray
    //     })
    // }
