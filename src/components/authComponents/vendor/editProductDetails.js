import React from "react"

import "../../../assets/sass/add_product_details.scss"

import Head from 'next/head'

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";

import {
    LargePlusButtonIcon,
    PlusButtonIcon,
    ColorPlusButtonIcon,
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
    SadFace,
    HappyFace
} from "../../../assets/images";

import LogoAnimation from "../../animations/logoAnimation"
import architectureStyles from "../../../lib/styleCategory"
import { GradientButton, InputForm, WhiteButton, RadioButton, SelectList } from "../../UX/uxComponents"
import HtmlSlider from "../../UX/htmlSlider"
import Navbar from "../../navbar/navbar"
import { decryptData, encryptData } from "../../../factories/encryptDecrypt"
import ImageUploader from "../../UX/imageUploader"
import YouTube from "../../UX/youTubeUploader"
import { api } from "../../../actions/apiLinks"
import { createClient } from "http";
import { typesOfPriceNotation, typesOfCharge, installerChargeType } from "../../../lib/productNotations";

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
            modalImagePreview: "modalImagePreviewClass",
            modalAlertForDelete: "modalAlertForDeleteClass",
            modalThirdPartyDetails: "modalThirdPartyDetailsClass",
            // dynamincally toggle classes to flip styles //

            modalType : null,
            tempArr: [],
            dummyDataStructure: [],

            colorName: '',
            colorCode: '',
            sizeName: '',
            sizeCost: '',
            installerName: "",
            installerContactNo: "",
            installerCharges: "",

            colorArray: [],

            // productMinQuantity: undefined,
            // productMaxQuantity: "",

            productDimensions: [],
            productMaterials: [],
            productFinishes: [],
            productInstallers: [],
            productImagesObject: {
                categoryName: "",
                imagesInCategory: []
            },
            quantityType: 0,

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
            productImageThumbnail: "",

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

            checkBoxProductDiscountClass1: "checkBox",
            checkBoxProductDiscountClass2: "checkBox",
            
            checkBoxProductInstallationClass1: "checkBox",
            checkBoxProductInstallationClass2: "checkBox",
            checkBoxProductInstallationClass3: "checkBox",
            checkBoxProductInstallationClass4: "checkBox",
            checkBoxProductInstallationClass5: "checkBox",

            inputSection: "inputSection hide",

            // displayError: "displayError",
            displayError: "displayError hide",
            displayProductPriceValueError: "displayProductPriceValueError hide",
            displayDiscountValueValidationError: "displayError hide",
            displayGSTValueValidationError: "displayError hide",
            displayInstallationValueValidationError: "displayError hide",

            displayValueError: "displayValueError hide",
            displayGSTValueError: "displayGSTValueError hide",
            displayDiscountValueError: "displayDiscountValueError hide",
            displayInstallationValueError: "displayInstallationValueError hide",
            displayQuantityValueError: "displayQuantityValueError hide",

            Validation: "Validation hide",

            materialCostIsValid: false,
            sizeCostIsValid: false,
            finishCostIsValid: false,

            spliceOnEdit: true,
            finishModalTitle: "Add a close-up image thumbnail for this finish",

            finishModalContentPart: 1,
            showDeleteButton: "hide",
            showFinalProceed: "hide",

            architectureStyles : architectureStyles,

            finalProceed: "saveAndProceed",
            productTypes : [],
            dummyToggle : "x",
            
            youTube: "",
            youTubeURL: [],
            youTubeClass: "youTubeClass hide",
            youTubeError: "youTubeError hide",

            emptyField: [],

            installerCostType: 1,
            installationServiceCostType: 1,

            theProductTypesArray : [],

            // productInstallers: [
            //     {
            //         installerName: "rakshith",
            //         installerContactNo: 9972223737,
            //         installerCharges: 1500,
            //         installerChargeType: 2
            //     }
            // ],

            // productInstallationAvailability: 5,
            // productInstallationServiceCost: 1500,
            // installationServiceCostType: 3

            
        }
    }

    componentDidMount = async () => {

        let { pId } = this.props

        const rawData = { productId : pId.toUpperCase() }


        await Promise.all([
            this.props.getUserData(),

            // GET PRODUCT DATA
            this.props.hitApi(
                api.GET_PRODUCT_DATA,
                "POST",
                {
                    requestData: rawData,
                    message : "Requesting dispatch products"
                }
            ),
        ])

        .then((data) => {
            let { responsePayload } = this.props.responseData;

            console.log(responsePayload);

            this.setState({

                /// PLACE HERE ////
                productName: responsePayload.productName,
                productCode: responsePayload.productCode,
                productPrice: responsePayload.basePrice,
                priceNotation: responsePayload.priceNotation,
                productGST: responsePayload.gstPercentage,
                productMaterials: responsePayload.productMaterials,
                featuresAdded: responsePayload.features,
                productFinishes: responsePayload.finishingOptions,
                colorArray: responsePayload.colorOptions,
                productDimensions: responsePayload.sizesAvailable,
                productMinQuantity: responsePayload.minQuantity,
                productMaxQuantity: responsePayload.maxQuantity,
                productDescription : responsePayload.productDescription,
                categoryStylesAdded: responsePayload.designStyles,
                tagsAdded: responsePayload.tags,
                productType : responsePayload.productType,
                // productAvailability: responsePayload.availability,
                productAvailabilityBool : responsePayload.availability,
                productDiscount: responsePayload.discount,
                productImagesObject: {
                    categoryName: "",
                    imagesInCategory: responsePayload.productImages
                },
                productThumbImage: responsePayload.productThumbImage,
                youTubeURL: responsePayload.youTubeAdVideos,
                brandName: responsePayload.brandName,
                brandImage: responsePayload.brandImage,
                productInstallers: responsePayload.productInstallers,
                productInstallationAvailability: responsePayload.productInstallationAvailability,
                productInstallationServiceCost: responsePayload.productInstallationServiceCost,
                installationServiceCostType: responsePayload.installationServiceCostType,

                ///////

                loadingClass: 'loadingAnim hide',
                mainClass: 'mainClass',

                ///////
                // productTypes : theProductTypesArray

            })

            this.handleDefaultChecked(
                responsePayload.discount,
                responsePayload.productInstallationAvailability
            )
        
        })

        .catch((err) => {
            if (err.response) {
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
    }

    handleDefaultChecked = ( productDiscount, productInstallationAvailability ) => {
        // const { productDiscount, productInstallationAvailability } = this.state;

        if (productDiscount !== 0) {
            this.setState({
                checkBoxProductDiscountClass1: "checkBox color",
                checkBoxProductDiscountClass2: "checkBox",
                productDiscountAvailablity: "yes"
            });
        } 

         else if (productDiscount === 0) {
            this.setState({
                checkBoxProductDiscountClass1: "checkBox",
                checkBoxProductDiscountClass2: "checkBox color",
                productDiscountAvailablity: "no"
            })
        }

        if (productInstallationAvailability === 1) {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox color",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox",
            })   
        }

        else if (productInstallationAvailability === 2) {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox color",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox",
                inputSection: "inputSection",
                // productInstallationServiceCost
            })
        }

        else if (productInstallationAvailability === 3) {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox color",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox",
            })
        }

        else if (productInstallationAvailability === 4) {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox color",
                checkBoxProductInstallationClass5: "checkBox",
            })
        }

        else if (productInstallationAvailability === 5) {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox color",
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

    removeFeature = index => {
        this.state.featuresAdded.splice(index, 1);

        this.setState({
            featuresAdded:
                this.state.featuresAdded.length !== 0 ? this.state.featuresAdded : []
        });
    };

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

        if(categoryStylesAdded.length === 0){
            styleDoesntExist = true
        }

        else{
            categoryStylesAdded.map((item, i) => {
                if(item.styleName === styleData.styleTitle){
                    styleDoesntExist = false
                }
            })
        }
        
        
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
        return this.state.featuresAdded.map((item, i) => {
            return (
                <div className="featureWrap" key={i}>
                    <ul>
                        <li>
                            <p key={i}>{item}</p>
                        </li>
                    </ul>

                    <div className="deleteIcon"
                        onClick={() => {
                            this.removeFeature(i);
                        }}
                    >
                        <CloseButton />
                    </div>
                </div>
            );
        });
    };

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
                                        <h3>Extra cost over base price</h3>
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
        return this.state.productMaterials.map((item, i) => {
            return (
                <div className="productMaterialDescriptionOuterLayer" key={i}>
                    <div className="productMaterialDescriptionInnerLayer">
                        <div className="productMaterialDetails">
                            <div className="materialCostCartWrap">
                                <h3>Material nomenclature</h3>
                                <p key={i}>{item.materialName}</p>
                            </div>
                            <div className="materialCostCartWrap">
                                <h3>Extra cost over base price</h3>
                                <p key={i}>Rs. {item.materialCost}</p>
                            </div>
                            {/* <div className="materialCostCartWrap"> */}
                            {this.returnMiscellaneousField("materialGrade", item)}
                            {/* </div> */}
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
                                <WhiteButton>Delete</WhiteButton>
                            </div>
                        </div>
                    </div>
                </div>
            );
        });
    };

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

    removeProductInstallers = index => {
        this.state.productInstallers.splice(index, 1);

        this.setState({
            productInstallers:
                this.state.productInstallers.length !== 0
                    ? this.state.productInstallers
                    : []
        });
    };

    returnMiscellaneousField = (field, item) => {
        if (field === "finishCode") {
            if (item.finishCode !== "") {
                return (
                    <div className="finishCodeCartWrapReturn">
                        <h3>Finish code </h3>
                        <p>{item.finishCode}</p>
                    </div>
                );
            }
        }

        else if (field === "materialGrade") {
            if (item.materialGrade !== "") {
                return (
                    <div className="materialCostCartWrap">
                        <h3>Material Grade </h3>
                        <p>{item.materialGrade}</p>
                    </div>
                );
            }
        }
    };

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
                                                <h3>Extra cost over base price</h3>
                                                <p key={i}>Rs. {item.finishCost}</p>
                                            </div>
                                            <div className="finishCodecartwrap" >
                                                {this.returnMiscellaneousField("finishCode", item)}
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

    displayErrorModal = modalType => {
        if (modalType === "color") {
            if (this.state.colorIsValid === false) {
                const { emptyFieldInColor } = this.state;

                const returnError = () => {
                    if (emptyFieldInColor === "colorName") {
                        return <p>{this.state.errorMessage}</p>;
                    } else if (emptyFieldInColor === "colorCode") {
                        return <p>{this.state.errorMessage}</p>;
                    } else if (emptyFieldInColor === "colorCost") {
                        return <p>{this.state.errorMessage}</p>;
                    } else {
                        return (
                            <p>Oops, something is not right, please reload and try again</p>
                        );
                    }
                };

                return <div className="errorMessage">{returnError()}</div>;
            }
        } else if (modalType === "size") {
            if (this.state.sizeIsValid === false) {
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInSize}</p>
                    </div>
                );
            }
        } else if (modalType === "material") {
            if (this.state.materialIsValid === false) {
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInMaterial}</p>
                    </div>
                );
            }
        } else if (modalType === "finish") {
            if (this.state.finishDetailsIsValid === false) {
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInFinishDetails}</p>
                    </div>
                );
            }
        } else if (modalType === "installer") {
            if (this.state.installerIsValid === false) {
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInInstaller}</p>
                    </div>
                );
            }
        }
    };

    handleDefaultValues = (fieldName) => {
        const { 
            productName,
            productCode,
            productPrice,
            productGST,
            productMaterials,
            productFinishes,
            productMinQuantity,
            productMaxQuantity,
            productDescription,
            productAvailability,
            productDiscount,
            productThumbImage,
            brandName
         } = this.state

        if(fieldName === "ProductName") {
            if (productName) return productName;
        }

        else if (fieldName === "ProductCode") {
            if (productCode) return productCode;
        }

        else if (fieldName === "ProductPrice") {
            if (productPrice) return productPrice;
        }

        else if (fieldName === "ProductGST") {
            if (productGST) return productGST;
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

        else if (fieldName === "BrandName") {
            if (brandName) return brandName;
        }
    }

    setYouTubeURL = (e) => {
      const val = e.target.value;
      const regEx = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

      if (val !== "") {
        if (regEx.test(val) === true) {
          this.setState({ 
            youTube: val,
            youTubeError: "youTubeError hide"
           });
        }

        else if (!regEx.test(val) === true) {
          this.setState({
            youTubeError: "youTubeError"
          });
        }
      }

      else if (val === "") {
        this.setState({
          youTubeError: "youTubeError hide"
        });
      }
    }

    addYouTubeURL = async () => {

      const { youTube, youTubeURL } = this.state;

      let isItURL = ""

      if (youTube !== "") {
        isItURL = youTube.split("/")[2].toLowerCase() === "www.youtube.com" ? true : false
      }


      let temp = youTube.split("").reverse().join("")
      let youtubeId = ""

      if (isItURL) {
        youtubeId = temp.split("=")[0].split("").reverse().join("")

        this.setState({ youtubeId })
      }

      else {
        youtubeId = temp.split("/")[0].split("").reverse().join("")

        this.setState({ youtubeId })
      }


      let dummyArray = [...youTubeURL];

      if (youtubeId !== "") {
        if (!dummyArray.includes(youtubeId)) {
            youTubeURL.push(youtubeId);

            this.setState({
                youTube: "",
                youtubeId: "",
                youTubeURL: youTubeURL.length !== 0 ? youTubeURL : [],
                youTubeClass: "youTubeClass",
                youTubeError: "youTubeError hide"
            });
        
            this.refs.youTube.value = "";
        }

        else if (dummyArray.includes(youtubeId)){
            this.setState({
                youTube: "",
                youtubeId: "",
                youTubeError: "youTubeError",
                youTubeUrlErrorStatement: "This video has been already uploaded, please add new."
            })
        }
      }

      else if (youtubeId === "") {
            this.setState({
                youTubeError: "youTubeError",
                youTubeUrlErrorStatement: "please check and enter valid YouTube URL."
            });
        }
    }

    returnYouTubeInput = () => {
        const { youTubeURL } = this.state;

        if (youTubeURL.length !== 0) {
            return youTubeURL.map((item, i) => {
                return (
                    <div className="youTubeContainer" key={i}>
                        <YouTube 
                            video={item} 
                            autoplay="0" 
                            rel="0" 
                            modest="1" />
                        <div className="deleteIcon" onClick={() => this.removeyouTubeURL(i)}>
                            <CloseButton />
                        </div>
                    </div>
                )
            })
        }
    };

    removeyouTubeURL = (index) => {
        const { youTubeURL } = this.state;

        youTubeURL.splice(index, 1)

        this.setState({
            youTubeURL: youTubeURL.length !== 0 ? youTubeURL : []
        });
    }

    checkTypeNumber = (e, checkFor) => {
        const val = e.target.value;
        const regEx = /^[0-9\b]+$/;

        if (val !== 0) {
            if (regEx.test(val) === true) {
                if (checkFor === "discount") {
                    this.setState({
                        productDiscount: Number(val),
                        displayDiscountValueValidationError: "displayError hide"
                    });
                } else if (checkFor === "GST") {
                    this.setState({
                        productGST: Number(val),
                        displayGSTValueValidationError: "displayError hide",
                    });
                } else if (checkFor === "installation") {
                    this.setState({
                        productInstallationServiceCost: Number(val),
                        displayInstallationValueValidationError: "displayError hide"
                    });
                } else if (checkFor === "installer") {
                    this.setState({
                        installerCharges: Number(val),
                        displayError: "displayError hide",
                        installerChargeIsValid: true
                    });
                } else if (checkFor === "color") {
                    this.setState({
                        colorCost: val,
                        displayError: "displayError hide"
                    });
                } else if (checkFor === "material") {
                    this.setState({
                        materialCost: val,
                        displayError: "displayError hide",
                        materialCostIsValid: true
                    });
                } else if (checkFor === "size") {
                    this.setState({
                        sizeCost: val,
                        displayError: "displayError hide",
                        sizeCostIsValid: true
                    });
                } else if (checkFor === "finish") {
                    this.setState({
                        finishCost: val,
                        displayError: "displayError hide",
                        finishCostIsValid: true
                    });
                }
            } else if (regEx.test(val) === false) {
                if (checkFor === "discount") {
                    this.setState({
                        productDiscount: "",
                        displayDiscountValueValidationError: "displayError"
                    });
                } else if (checkFor === "GST") {
                    this.setState({
                        productGST: "",
                        displayGSTValueValidationError: "displayError"
                    });
                } else if (checkFor === "installation") {
                    this.setState({
                        productInstallationServiceCost: "",
                        displayInstallationValueValidationError: "displayError"
                    });
                } else if (checkFor === "installer") {
                    this.setState({
                        installerCharges: "",
                        displayError: "displayError",
                        installerChargeIsValid: false
                    });
                } else if (checkFor === "color") {
                    this.setState({
                        colorCost: "",
                        displayError: "displayError"
                    });
                } else if (checkFor === "material") {
                    this.setState({
                        materialCost: "",
                        displayError: "displayError",
                        materialCostIsValid: false
                    });
                } else if (checkFor === "size") {
                    this.setState({
                        sizeCost: "",
                        displayError: "displayError",
                        sizeCostIsValid: false
                    });
                } else if (checkFor === "finish") {
                    this.setState({
                        finishCost: "",
                        displayError: "displayError",
                        finishCostIsValid: false
                    });
                }
            }
        }

        else if (val === "") {
            this.setState({
                displayError: "displayError hide",
                displayValueError: "displayValueError hide"
            });
        }
    };

    toggleClassDummy = () => {
        if(this.state.dummyToggle === 'x'){
            this.setState({
                dummyToggle : 'y'
            })
        }

        else if(this.state.dummyToggle === 'y'){
            this.setState({
                dummyToggle : 'x'
            })
        }
    }

    addProductImage = () => {
        let { productImage, productImagesObject } = this.state;

        let temp = {
            itemCode: this.state.productCode,
            textOnRibbonSatisfied: false,
            imageURL: productImage
        }

        if (temp.imageURL !== "") {
            let dummyArray = productImagesObject.imagesInCategory ? productImagesObject.imagesInCategory : [];

            // if(!dummyArray.includes(temp)) {
                dummyArray.push(temp)
            // }

            this.toggleClassDummy()

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
        if (this.state.productImagesObject.imagesInCategory.length !== 0) {
            if (this.state.dummyToggle === "x") {
                return (
                    <div className="imageSliderParentWrap">
                        <div className={"downSectionInnerLayer "}>
                            <HtmlSlider
                                categoryData={this.state.productImagesObject} // format of Item
                                numberOfSlides={3} // Change the css grid properties for responsiveness
                                textOnRibbon={"TRENDING NOW"} // All caps
                                runFunction={data => {
                                    this.modalClassToggle("show");
                                    this.setState({ modalType: "imagePreview" });
                                }}
                            />
                        </div>
                    </div>
                );
            } else if (this.state.dummyToggle === "y") {
                return (
                    <div className="imageSliderWrap2">
                        <div className="imageSliderParentWrap">
                            <div className={"downSectionInnerLayer "}>
                                <HtmlSlider
                                    categoryData={this.state.productImagesObject} // format of Item
                                    numberOfSlides={3} // Change the css grid properties for responsiveness
                                    textOnRibbon={"TRENDING NOW"} // All caps
                                    runFunction={data => {
                                        this.modalClassToggle("show");
                                        this.setState({ modalType: "imagePreview" });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                );
            }
        }
    };

    proceedHandler = typeOfButtonClicked => {
        const {
            colorArray,
            isChecked,
            productDimensions,
            productFinishes,
            productMaterials,
            productInstallers,
            installerContactNo,
            materialCostIsValid,
            sizeCostIsValid,
            finishCostIsValid,
            installerChargeIsValid
        } = this.state;

        let isMaterialValid = false;
        let isColorValid = false;
        let isSizeValid = false;
        let isInstallerValid = false;
        let isFinishDetailsValid = false;
        let emptyField;
        let errorMessage;

        const validateMaterialModal = (materialName, materialCost) => {
            if (materialName !== "") {
                if (isChecked) {
                    if (materialCost !== "") {
                        if (materialCostIsValid) {
                            isMaterialValid = true;
                        } else {
                            emptyField = "Material Cost in Numbers";
                        }
                    } else {
                        emptyField = "Material Cost";
                    }
                } else if (materialCost === 0) {
                    isMaterialValid = true;
                }
            } else if (materialName === "") {
                emptyField = "Material Name";
            }

            const validationData = {
                isMaterialValid,
                emptyField
            };

            return validationData;
        };

        const validateColorModal = (colorName, colorCode, colorCost) => {
            if (colorName !== "" && colorCode !== "") {
                if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCode)) {
                    let alreadyExistingColorName = "";
                    const { colorArray } = this.state;

                    if (colorArray.length === 0) {
                        // make an extra check here for colorCost

                        if (isChecked === true) {
                            if (colorCost !== "") {
                                if (!isNaN(colorCost)) {
                                    isColorValid = true;
                                    colorArray.push({
                                        colorName: colorName.toLowerCase(),
                                        colorCode: colorCode.toLowerCase(),
                                        colorCost: parseInt(colorCost)
                                    });

                                    emptyField = "";
                                    errorMessage = "";

                                    this.setState({
                                        isChecked: false
                                    });

                                    this.refs.colorName.value = "";
                                    this.refs.colorCode.value = "";
                                    this.refs.colorCost.value = "";
                                } else if (isNaN(colorCost)) {
                                    isColorValid = false;
                                    emptyField = "colorCost";
                                    errorMessage = "Please enter color cost only in numbers";
                                }
                            } else {
                                isColorValid = false;
                                emptyField = "colorCost";
                                errorMessage = `Please fill in the extra cost for the color`;
                            }
                        } else {
                            isColorValid = true;
                            colorArray.push({
                                colorName: colorName.toLowerCase(),
                                colorCode: colorCode.toLowerCase(),
                                colorCost: parseInt(colorCost)
                            });
                        }
                    } else {
                        let colorDoesntExist = true;

                        colorArray.map((item, i) => {
                            colorCode = colorCode.toLowerCase();

                            if (item.colorCode === colorCode) {
                                alreadyExistingColorName = item.colorName;
                                colorDoesntExist = false;
                            } else {
                                colorDoesntExist = true;
                            }
                        });

                        if (colorDoesntExist === true) {
                            //// start color cost check ////

                            if (isChecked === true) {
                                if (colorCost !== "") {
                                    if (!isNaN(colorCost)) {
                                        isColorValid = true;
                                        colorArray.push({
                                            colorName: colorName.toLowerCase(),
                                            colorCode: colorCode.toLowerCase(),
                                            colorCost: parseInt(colorCost)
                                        });

                                        emptyField = "";
                                        errorMessage = "";

                                        this.setState({
                                            isChecked: false
                                        });

                                        this.refs.colorName.value = "";
                                        this.refs.colorCode.value = "";
                                        this.refs.colorCost.value = "";
                                    } else if (isNaN(colorCost)) {
                                        isColorValid = false;
                                        emptyField = "colorCost";
                                        errorMessage = "Please enter color cost only in numbers";
                                    }
                                } else {
                                    isColorValid = false;
                                    emptyField = "colorCost";
                                    errorMessage = `Please fill in the extra cost for the color`;
                                }
                            } else {
                                isColorValid = true;
                                colorArray.push({
                                    colorName: colorName.toLowerCase(),
                                    colorCode: colorCode.toLowerCase(),
                                    colorCost: parseInt(colorCost)
                                });
                            }
                        } else if (colorDoesntExist === false) {
                            isColorValid = false;
                            emptyField = "colorCode";
                            errorMessage = `You have already entered this color code with the name "${alreadyExistingColorName}"`;
                        }
                    }
                } else {
                    isColorValid = false;
                    emptyField = "colorCode";
                    errorMessage =
                        "The color code is not right, please retry. See if you forgot to enter the '#' at the beginning.";
                }
            } else if (colorName === "" && colorCode === "") {
                emptyField = "colorName";
                errorMessage = "please enter color name";
            } else {
                if (colorName === "") {
                    emptyField = "colorName";
                    errorMessage = "Please enter color name";
                }

                if (colorCode === "") {
                    emptyField = "colorCode";
                    errorMessage = "Please enter color code";
                }
            }

            const validationData = {
                isColorValid,
                emptyField,
                errorMessage
            };

            return validationData;
        };

        const validateSizeModal = (sizeName, sizeCost) => {
            if (sizeName !== "") {
                if (isChecked) {
                    if (sizeCost !== "") {
                        if (sizeCostIsValid) {
                            isSizeValid = true;
                        } else {
                            emptyField = "Size Cost in Numbers";
                        }
                    } else {
                        emptyField = "Size Cost";
                    }
                } else {
                    if (sizeCost === 0) {
                        isSizeValid = true;
                    }
                }
            } else if (sizeName === "") {
                emptyField = "Size Name";
            }

            const validationData = {
                isSizeValid,
                emptyField
            };

            return validationData;
        };

        const validateFinishModal = (finishName, finishCost) => {
            if (finishName !== "") {
                if (isChecked) {
                    if (finishCost !== "") {
                        if (finishCostIsValid) {
                            isFinishDetailsValid = true;
                        } else {
                            emptyField = "Finish Cost in Numbers";
                        }
                    } else {
                        emptyField = "Finish Cost";
                    }
                } else {
                    if (finishCost === 0) {
                        isFinishDetailsValid = true;
                    }
                }
            } else if (finishName === "") {
                emptyField = "Finish Name";
            }

            const validationData = {
                isFinishDetailsValid,
                emptyField
            };

            return validationData;
        };

        const validateInstallerModal = (installerName, installerCharges) => {
            if (installerName !== "") {
                if (installerContactNo !== "") {
                    if (installerCharges !== "") {
                        if (installerChargeIsValid) {
                            isInstallerValid = true;
                        }
                        else if (!installerChargeIsValid) {
                            if (installerCharges !== 0) {
                                isInstallerValid = true;
                                emptyField = "Installer charges in number";
                            }
                            else {
                                isInstallerValid = true;
                            }
                        }
                    }

                    else if (installerCharges === "") {
                        isInstallerValid = true;
                    }

                } else {
                    emptyField = "Installer mobile number";
                }
            } else if (installerName === "") {
                emptyField = "Installer name";
            }

            const validationData = {
                isInstallerValid,
                emptyField
            };

            return validationData;
        };

        if (typeOfButtonClicked === "color") {
            const colorCode = this.refs.colorCode.value;
            const colorName = this.refs.colorName.value;
            const colorCost = isChecked === true ? this.refs.colorCost.value : 0;

            let validatedData = validateColorModal(colorName, colorCode, colorCost);

            if (validatedData.isColorValid) {
                this.setState({
                    colorIsValid: true,
                    emptyFieldInColor: null,
                    modalType: null,
                    isChecked: false,
                    colorArray: colorArray.length !== 0 ? colorArray : null,
                    extraCostInput: "extraCostInput hide",
                    displayError: "displayError hide"
                });

                // save data

                this.refs.colorCode.value = "";
                this.refs.colorName.value = "";

                this.modalClassToggle("dontShow");
            } else {
                this.setState({
                    colorIsValid: false,
                    emptyFieldInColor: validatedData.emptyField,
                    errorMessage: validatedData.errorMessage
                });
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
                };

                if (temp !== "") {
                    let dummyArray = [...productDimensions];

                    if (!dummyArray.includes(temp)) {
                        productDimensions.push(temp);
                    }

                    this.setState({
                        sizeIsValid: true,
                        emptyFieldInSize: null,
                        modalType: null,
                        isChecked: false,
                        productDimensions:
                            productDimensions.length !== 0 ? productDimensions : null,
                        extraCostInput: "extraCostInput hide",
                        displayError: "displayError hide"
                    });
                }

                this.refs.sizeCost.value = "";
                this.refs.sizeName.value = "";

                this.modalClassToggle("dontShow");
            } else {
                this.setState({
                    sizeIsValid: false,
                    emptyFieldInSize: validatedData.emptyField
                });
            }
        }

        else if (typeOfButtonClicked === "material") {
            const materialName = this.refs.materialName.value;
            const materialCost = isChecked ? this.refs.materialCost.value : 0;
            const materialGrade = this.refs.materialGrade.value;

            let validatedData = validateMaterialModal(materialName, materialCost);

            if (validatedData.isMaterialValid) {
                let temp = {
                    materialCost,
                    materialName,
                    materialGrade
                };

                if (temp.materialName !== "") {
                    let dummyArray = [...productMaterials];

                    if (!dummyArray.includes(temp)) {
                        productMaterials.push(temp);

                        this.setState({
                            materialIsValid: true,
                            emptyFieldInMaterial: null,
                            modalType: null,
                            isChecked: false,
                            productMaterials:
                                productMaterials.length !== 0 ? productMaterials : null,
                            extraCostInput: "extraCostInput hide",
                            displayError: "displayError hide"
                        });
                    }
                }

                this.refs.materialCost.value = "";
                this.refs.materialName.value = "";

                this.modalClassToggle("dontShow");
            } else {
                this.setState({
                    materialIsValid: false,
                    emptyFieldInMaterial: validatedData.emptyField
                });
            }
        } 

        else if (typeOfButtonClicked === "finish") {
            const finishName = this.refs.finishName.value;
            const finishCost = isChecked ? this.refs.finishCost.value : 0;
            const finishImage = this.state.productFinishImage;
            const finishCode = this.refs.finishCode.value;

            let validatedData = validateFinishModal(finishName, finishCost);

            if (validatedData.isFinishDetailsValid) {
                let temp = {
                    finishName,
                    finishCost,
                    finishImage,
                    finishCode
                };

                if (temp !== "") {
                    let dummyArray = [...productFinishes];

                    if (!dummyArray.includes(temp)) {
                        productFinishes.push(temp);
                    }

                    this.setState({
                        finishDetailsIsValid: true,
                        emptyFieldInFinishDetails: null,
                        modalType: null,
                        isChecked: false,
                        productFinishes:
                            productFinishes.length !== 0 ? productFinishes : null,
                        extraCostInput: "extraCostInput hide",
                        displayError: "displayError hide",
                        productFinishImage: "",
                        finishModalTitle:
                            "Add a close - up image thumbnail for this finish",
                        finishModalContentPart: 1
                    });
                }

                this.refs.finishCost.value = "";
                this.refs.finishName.value = "";
                this.refs.finishCode.value = "";

                this.modalClassToggle("dontShow");
            } else {
                this.setState({
                    finishDetailsIsValid: false,
                    emptyFieldInFinishDetails: validatedData.emptyField
                });
            }
        }

        else if (typeOfButtonClicked === "installer") {
            const installerName = this.refs.installerName.value;
            const installerContactNo = this.state.installerContactNo;
            const installerCharges = this.refs.installerCharges.value !== "" ? this.refs.installerCharges.value : 0;
            const installerChargeType = this.state.installerCostType;

            let validatedData = validateInstallerModal(
                installerName,
                installerCharges
            );

            if (validatedData.isInstallerValid) {
                let temp = {
                    installerCharges,
                    installerName,
                    installerContactNo,
                    installerChargeType
                };

                if (temp.installerName !== "") {
                    if (temp.installerContactNo !== "") {
                        let dummyArray = [...productInstallers];

                        if (!dummyArray.includes(temp)) {
                            productInstallers.push(temp);

                            this.setState({
                                installerContactNo: "",
                                installerIsValid: true,
                                installerCostType: 1,
                                emptyFieldInInstaller: null,
                                modalType: null,
                                isChecked: false,
                                productInstallers:
                                    productInstallers.length !== 0 ? productInstallers : [],
                                displayError: "displayError hide"
                            });
                        }
                    }
                }

                this.refs.installerName.value = "";
                this.refs.installerCharges.value = "";

                this.modalClassToggle("dontShow");
            }

            else {
                this.setState({
                    installerIsValid: false,
                    emptyFieldInInstaller: validatedData.emptyField
                });
            }
        }
    };

    onChangeHandler = (e, typeOf) => {
        if (typeOf === "installerCost" || typeOf === "installationServiceCost" || typeOf === "quantityType") {
            this.setState({ [e.target.name]: Number(e.target.value) });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

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
                        maxLength="8"
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
                        maxLength="8"
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
                        maxLength="8"
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
                        maxLength="8"
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

    returnProductInstallers = () => {
    const { checkBoxProductInstallationClass5, productInstallers } = this.state;

    if (checkBoxProductInstallationClass5 === "checkBox color") {
      if (productInstallers.length !== 0) {
        return productInstallers.map((item, i) => {
          return (
            <div className="productInstallerDescriptionOuterLayer" key={i}>
              <div className="productInstallerDescriptionInnerLayer">
                <div className="productInstallerDetails">
                    <div className="productInstallerNameWrap">
                        {/* <h3>Installer nomenclature</h3> */}
                        <h3 key={i}>{item.installerName}</h3>
                    </div>

                    <div className="productInstallerContactNoWrap">
                        <p key={i}>+91 <span>{item.installerContactNo}</span></p>
                    </div>

                    <div className={item.installerCharges !== "" ?
                        (item.installerCharges !== 0 ? "productInstallerChargesWrap" : "hide") : "hide"} >
                        <p>Charges </p>
                        <span key={i}>
                            Rs. {item.installerCharges} / {installerChargeType(item.installerChargeType)}
                        </span>
                    </div>
                </div>
                <div className="materialEditingButtons">
                    {/* S */}
                    <div
                        className="deleteButton"
                        onClick={() => this.removeProductInstallers(i)}
                    >
                        <WhiteButton>Delete</WhiteButton>
                    </div>
                </div>
              </div>
            </div>
          );
        });
      }
    }
  };

    returnBrandImage = () => {
        if (this.state.brandImage !== undefined) {
            return (
                <div className="brandImageUploaderRender">
                    <div className="brandImageUploaderClass">
                        <ImageUploader
                            imageType="regularImage" // regularImage || profileImage
                            resultData={data => {
                                this.setState({
                                    brandImage: data.imageURL
                                });
                            }}
                            showInitialImage={this.state.brandImage}
                            imageClassName="brandImageClass"
                        />
                    </div>
                </div>
            )
        }
    }

    updateProductsDataInBackend = () => {
        this.setState({
            finalProceed : "sendRequest"
        })

        const handlePriceNotation = (quantityType) => {
            if (quantityType !== 0) return quantityType;
            else return this.state.priceNotation;
        }

        const finalDataToSend = {
            productName : this.state.productName,
            productCode : this.state.productCode,
            basePrice: this.state.productPrice,
            priceNotation: handlePriceNotation(this.state.quantityType),
            gstPercentage: this.state.productGST,
            productMaterials : this.state.productMaterials,
            finishingOptions : this.state.productFinishes,
            colorOptions :  this.state.colorArray,
            sizesAvailable : this.state.productDimensions,
            minQuantity : this.state.productMinQuantity,
            maxQuantity : this.state.productMaxQuantity,
            productDescription : this.state.productDescription,
            features : this.state.featuresAdded,
            designStyles : this.state.categoryStylesAdded,
            // productTypeId : this.state.productType,
            productId : this.props.pId.toUpperCase(),
            tags : this.state.tagsAdded,
            availability : this.state.productAvailabilityBool,
            youTubeAdVideos: this.state.youTubeURL,
            discount : this.state.productDiscount,
            productImages : this.state.productImagesObject.imagesInCategory,
            productThumbImage : this.state.productImageThumbnail,
            brandName: this.state.brandName,
            brandImage: this.state.brandImage,

            productInstallers: this.state.productInstallers,
            productInstallationAvailability: this.state.productInstallationAvailability,
            productInstallationServiceCost: this.state.productInstallationServiceCost,
            installationServiceCostType: this.state.installationServiceCostType

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


        //  UPDATE PRODUCT 

        this.props.hitApi(api.UPDATE_PRODUCT, "PUT", 
            {
                requestData : finalDataToSend,
                message : "Update product, foxtrot"
            } 
        )

        .then(() => {
            this.setState({
                finalProceed : "successScreen"
            })

            // window.open("/vendor/dashboard", "_self")
        })

        .catch((err) => {
            if (err.response) {

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
                            this.updateProductsDataInBackend()
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

        
        else if(this.state.finalProceed === "successScreen"){
            return(
                <div className="loadingWrapperProducts">
                    <HappyFace />
                    <h3 className="loadingHeader">
                        Yaayy! The product has been Updated successfully.                        
                    </h3>

                    <div className="goToDashboard">
                        <WhiteButton
                            runFunction={() => {
                                window.open("/vendor/dashboard", "_self")
                            }}
                            >
                            Go to dashboard
                        </WhiteButton>
                    </div>
                </div>
            )
        }


        
    }

    filterByImageURL = index => {
        const { imagesInCategory } = this.state.productImagesObject;

        if (imagesInCategory.length > 1) {
            imagesInCategory.splice(index, 1);
        } else if (imagesInCategory.length === 1) {
            this.setState({ modalType: "alertForDelete" });
        }

        this.setState({
            productImageThumbnail: "",
            productImagesObject: {
                categoryName: "",
                imagesInCategory: imagesInCategory.length !== 0 ? imagesInCategory : []
            }
        });
    };

    removeProductImage = () => {
        this.state.productImagesObject.imagesInCategory.map((item, i) => {
            if (this.state.productImageThumbnail === item.imageURL) {
                this.filterByImageURL(i);
            }
        });
    };

    returnModal = () => {
        const { modalType, finishModalContentPart } = this.state;

        const returnModalContent = () => {
            if (modalType === "finish") {
                if (finishModalContentPart === 1) {
                    return (
                        <div className={this.state.modalFinish}>
                            <div className="dummyXClass">
                                {this.returnProductFinishUploadedImage()}
                            </div>
                        </div>
                    );
                } else if (finishModalContentPart === 2) {
                    return (
                        <div className={this.state.modalFinishDetails}>
                            <div className="dummyXClass">
                                <div className="whiteSquareForModal">
                                    <div className="whiteSquareModalUpperContainer">
                                        <div className="vendorDashboardModal">
                                            <div className="modalHeader">
                                                <h3>Finish details</h3>
                                                <div className="line" />
                                            </div>
                                        </div>
                                        <div className="finishEndModal">
                                            <div className="finishImageContainer">
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
                                                                maxLength="30"
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
                                                                className="switch-input"
                                                                type="checkbox"
                                                            />
                                                            <span
                                                                className="switch-label"
                                                                data-on="Yes"
                                                                data-off="No"
                                                            />
                                                            <span className="switch-handle" />
                                                        </label>
                                                    </div>
                                                    <div className="returnInputColumn">
                                                        {this.returnExtraCost("finish")}
                                                    </div>
                                                </div>
                                                <div className="errorContent">
                                                    <p
                                                        className={
                                                            this.state.isChecked
                                                                ? this.state.displayError
                                                                : "displayError hide"
                                                        }
                                                    >
                                                        Numbers Only
                                                    </p>
                                                </div>
                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">
                                                            Finish code (if any)
                                                        </p>
                                                    </div>
                                                    <div className="modalInputCategory">
                                                        <input
                                                            type="text"
                                                            name="finishCode"
                                                            placeholder="Ex. #4erfd, 8fds@ etc."
                                                            onChange={this.onChangeHandler}
                                                            maxLength="30"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            } else if (modalType === "color") {
                return (
                    <div className={this.state.modalColor}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="whiteSquareModalUpperContainer">
                                    <div className="vendorDashboardModal">
                                        <div className="modalHeader">
                                            <h3>Enter a color code</h3>
                                            <div className="line" />
                                        </div>
                                    </div>

                                    <div className="colorCategorySection">
                                        <div className="colorCategoryInnerLayerContainer">
                                            <div
                                                className="selectedColorSection"
                                                ref="colorPreview"
                                                style={{ background: this.state.colorPreview }}
                                            />
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
                                                                ref="colorName"
                                                                maxLength="30"
                                                                onChange={this.onChangeHandler}
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">
                                                            Enter the color hex-code (
                                                            <a
                                                                href="https://www.google.co.in/search?rlz=1C1CHBF_enIN822IN822&ei=aE0GXKaEO4norQG06bjgAw&q=color+selector+tool&oq=color+selector+&gs_l=psy-ab.1.0.0j0i67j0l8.1356.1356..2888...0.0..0.168.168.0j1......0....1..gws-wiz.......0i71.SepRdDVz0P4"
                                                                target="_blank"
                                                            >
                                                                click here
                                                            </a>{" "}
                                                            to get one)
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
                                                                onChange={e =>
                                                                    this.handleColorInput(e, "colorCode")
                                                                }
                                                                maxLength="7"
                                                                ref="colorCode"
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
                                                                className="switch-input"
                                                                type="checkbox"
                                                            />
                                                            <span
                                                                className="switch-label"
                                                                data-on="Yes"
                                                                data-off="No"
                                                            />
                                                            <span className="switch-handle" />
                                                        </label>
                                                    </div>
                                                    <div className="returnInputColumn">
                                                        {this.returnExtraCost("color")}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="errorContent">
                                            <p
                                                className={
                                                    this.state.isChecked
                                                        ? this.state.displayError
                                                        : "displayError hide"
                                                }
                                            >
                                                Numbers Only
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => {
                                            this.proceedHandler("color");
                                        }}
                                    >
                                        Proceed
                                    </GradientButton>

                                    {this.displayErrorModal("color")}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (modalType === "size") {
                return (
                    <div className={this.state.modalSize}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="whiteSquareModalUpperContainer">
                                    <div className="vendorDashboardModal">
                                        <div className="modalHeader">
                                            <h3>Size details</h3>
                                            <div className="line" />
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
                                                    maxLength="30"
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
                                                    className="switch-input"
                                                    type="checkbox"
                                                />
                                                <span
                                                    className="switch-label"
                                                    data-on="Yes"
                                                    data-off="No"
                                                />
                                                <span className="switch-handle" />
                                            </label>
                                        </div>
                                        <div className="returnInputColumn">
                                            {this.returnExtraCost("size")}
                                        </div>
                                    </div>

                                    <div className="errorContent">
                                        <p
                                            className={
                                                this.state.isChecked
                                                    ? this.state.displayError
                                                    : "displayError hide"
                                            }
                                        >
                                            Numbers Only
                                        </p>
                                    </div>
                                </div>
                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => this.proceedHandler("size")}
                                    >
                                        Proceed
                                    </GradientButton>
                                    {this.displayErrorModal("size")}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (modalType === "material") {
                return (
                    <div className={this.state.modalMaterial}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="whiteSquareModalUpperContainer">
                                    <div className="vendorDashboardModal">
                                        <div className="modalHeader">
                                            <h3>Material details</h3>
                                            <div className="line" />
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
                                                    maxLength="60"
                                                    ref="materialName"
                                                />
                                                <span className="InputSeparatorLine"> </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="inputFormContainer">
                                        <div className="formParaSection">
                                            <p className="pargraphClass">
                                                Material built Grade (if any)
                                            </p>
                                        </div>
                                        <div className="productInputInfoSection productMaterialName">
                                            <div className="modalInputCategory">
                                                <input
                                                    type="text"
                                                    name="materialGrade"
                                                    placeholder="Ex. ISI, ISO etc"
                                                    onChange={this.onChangeHandler}
                                                    maxLength="30"
                                                    ref="materialGrade"
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
                                                    className="switch-input"
                                                    type="checkbox"
                                                />
                                                <span
                                                    className="switch-label"
                                                    data-on="Yes"
                                                    data-off="No"
                                                />
                                                <span className="switch-handle" />
                                            </label>
                                        </div>
                                        <div className="returnInputColumn">
                                            {this.returnExtraCost("material")}
                                        </div>
                                    </div>

                                    <div className="errorContent">
                                        <p
                                            className={
                                                this.state.isChecked
                                                    ? this.state.displayError
                                                    : "displayError hide"
                                            }
                                        >
                                            Numbers Only
                                        </p>
                                    </div>
                                </div>
                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => {
                                            this.proceedHandler("material")
                                            // this.checkForZero()
                                        }}
                                    >
                                        Proceed
                                    </GradientButton>
                                    {this.displayErrorModal("material")}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (modalType === "validation") {
                if (this.state.emptyField.length !== 0) {
                    return (
                        <div className={this.state.modalClassToggle}>
                            <div className="dummyXClass">
                                <div className="whiteSquareForModal">
                                    <div className="whiteSquareModalUpperContainer">
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
                                                                    {this.state.emptyField.map((item, i) => (
                                                                        <div className="errorFieldMessage" key={i}>
                                                                            <ul>
                                                                                <li>
                                                                                    <p>{item}</p>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
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
                    );
                } else if (this.state.emptyField.length === 0) {
                    return (
                        <div className={this.state.modalClassToggle}>
                            <div className="dummyXClass">
                                <div className="whiteSquareForModal">
                                    <div className="whiteSquareModalUpperContainer">
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
                        </div>
                    );
                }
            } else if (modalType === "imagePreview") {
                return (
                    <div className={this.state.modalImagePreview}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="whiteSquareModalUpperContainer">
                                    <div className="vendorDashboardModal">
                                        <div className="modalHeader">
                                            <h3>Image Preview</h3>
                                            <div className="line" />
                                        </div>
                                    </div>
                                    <div className="content">
                                    

                                        <div className="selectedPreviewImageContainer">
                                            <div className="imgContainer">
                                                <p
                                                    className={
                                                        this.state.productImageThumbnail !== ""
                                                            ? "previewImageText hide"
                                                            : "previewImageText"
                                                    }
                                                >
                                                    Click on the image to view
                                                </p>
                                                <img src={this.state.productImageThumbnail} alt="" />
                                            </div>
                                            <div className={this.state.showDeleteButton}>
                                                <WhiteButton
                                                    runFunction={() => {
                                                        this.removeProductImage();
                                                        this.setState({
                                                            showDeleteButton: "showDeleteButton hide"
                                                        });
                                                    }}
                                                >
                                                    Delete
                                                </WhiteButton>
                                            </div>
                                        </div>
                                        <div className="detailsToInput">
                                            <div className="imageInput">
                                                <HtmlSlider
                                                    categoryData={this.state.productImagesObject} // format of Item
                                                    numberOfSlides={3} // Change the css grid properties for responsiveness
                                                    textOnRibbon={""} // All caps
                                                    runFunction={data => {
                                                        this.setState({
                                                            productImageThumbnail: data.imageURL,
                                                            showDeleteButton: "showDeleteButton"
                                                            // finalProceed: "sendRequest"
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (modalType === "alertForDelete") {
                return (
                    <div className={this.state.modalAlertForDelete}>
                        <div className="whiteSquareModalUpperContainer">
                            <div className="vendorDashboardModal">
                                <div className="modalHeader">
                                    <h3>Are you sure, you want to delete this?</h3>
                                    <div className="line" />
                                </div>
                                <div className="confirmationButtonContainer">
                                    <WhiteButton
                                        runFunction={() => {
                                            this.state.productImagesObject.imagesInCategory.splice(
                                                0,
                                                1
                                            );
                                            this.modalClassToggle("dontShow");
                                        }}
                                    >
                                        Yes
                                    </WhiteButton>
                                    <WhiteButton
                                        runFunction={() =>
                                            this.setState({ modalType: "imagePreview" })
                                        }
                                    >
                                        No
                                    </WhiteButton>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            } else if (modalType === "installer") {
                return (
                    <div className={this.state.modalThirdPartyDetails}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="whiteSquareModalUpperContainer">
                                    <div className="vendorDashboardModal">
                                        <div className="modalHeader">
                                            <h3>Third party installer details</h3>
                                            <div className="line" />
                                        </div>
                                    </div>
                                    {/* <div className="finishEndModal">
                                        <div className="thirdPartyDetails"> */}
                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Installer's name</p>
                                                </div>
                                                <div className="productInputInfoSection productFinishName">
                                                    <div className="modalMandatorySection">
                                                        <p className="madatoryHighlight">Mandatory</p>
                                                    </div>
                                                    <div className="modalInputCategory">
                                                        <input
                                                            type="text"
                                                            name="installerName"
                                                            placeholder="Type name here"
                                                            onChange={this.onChangeHandler}
                                                            maxLength="30"
                                                            ref="installerName"
                                                        />
                                                        <span className="InputSeparatorLine"> </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">
                                                        Installer's 10 digit mobile
                                                    </p>
                                                </div>

                                                <div className="phoneNoWrap">
                                                    <InputForm
                                                        refName="installerContactNo"
                                                        placeholder="10 digit Official contact number"
                                                        isMandatory={true}
                                                        validationType="onlyMobileNumbers"
                                                        characterCount="10"
                                                        value={
                                                            this.state.installerContactNo
                                                                ? this.state.installerContactNo
                                                                : ""
                                                        }
                                                        result={val =>
                                                            this.setState({ installerContactNo: val })
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">
                                                        Installation charges (in INR)
                                                    </p>
                                                </div>
                                                <div className="installationCostInputSection">
                                                    <div className="inputCategory">
                                                        <input
                                                            type="text"
                                                            name="installerCharges"
                                                            placeholder="Ex. 20"
                                                            onChange={e => this.checkTypeNumber(e, "installer")}
                                                            maxLength="8"
                                                            ref="installerCharges"
                                                        />
                                                        <span className="InputSeparatorLine"> </span>  
                                                    </div>
                                                    <p> / </p>
                                                    <div className="selectionCategory">
                                                        <SelectList
                                                            name="installerCostType"
                                                            value={this.state.installerCostType}
                                                            onChange={e =>
                                                                this.onChangeHandler(e, "installerCost")
                                                            }
                                                            options={typesOfCharge}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="errorContent">
                                                    <p className={this.state.displayInstallationValueValidationError}>
                                                        Numbers Only
                                                    </p>
                                                </div>
                                            </div>
                                        {/* </div> */}
                                    {/* </div> */}
                                </div>

                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => {
                                            this.proceedHandler("installer");
                                        }}
                                    >
                                        Proceed
                                     </GradientButton>
                                    {this.displayErrorModal("installer")}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div className={this.state.modalClassToggle}>
                <div className="modalBackgroundDummyClass">
                    <div className="modalBackgroundInnerWrap">
                        <header className="closeHeaderSection">
                            <div
                                className={this.returnModalCloseButton()}
                                onClick={() => {
                                    this.modalClassToggle("dontShow");
                                    // this.setState({
                                    //   spliceOnEdit: false,
                                    //   isChecked: false,
                                    //   extraCostInput: "extraCostInput hide",
                                    //   displayError: "displayError hide",
                                    //   colorIsValid: true,
                                    //   sizeIsValid: true,
                                    //   materialIsValid: true,
                                    //   finishDetailsIsValid: true
                                    // });
                                    this.handleStates();
                                    this.handleClearExtraCostInput();
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
        );
    };

    returnModalCloseButton = () => {
        if (this.state.finalProceed === "successScreen" || this.state.finalProceed === "errorScreen") {
            return "closeButtonContainer hide"
        }
        else {
            return "closeButtonContainer"
        }
    }

    handleStates = () => {
        if (this.state.finalProceed === "saveAndProceed") {
            this.setState({
                productImageThumbnail: "",
                installerCostType: 1,
                showFinalProceed: "hide",
                spliceOnEdit: false,
                isChecked: false,
                extraCostInput: "extraCostInput hide",
                displayError: "displayError hide",
                colorIsValid: true,
                sizeIsValid: true,
                materialIsValid: true,
                finishDetailsIsValid: true
            })
        }

        else if (this.state.finalProceed === "successScreen") {
            this.setState({
                productImageThumbnail: "",
                showFinalProceed: "hide",
                finalProceed: "saveAndProceed"
            })
        }
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

    handleMultiValidation = fieldName => {
        const {
            productPrice,
            productDiscountAvailablity,
            productDiscount,
            productGST,
            productMinQuantity,
            productMaxQuantity,
            productInstallationAvailability,
            productInstallationServiceCost,
            productInstallers,
            priceNotation,
            quantityType
        } = this.state;

        if (fieldName === "Max. quantity") {
            if (productMaxQuantity !== undefined) {
                if (
                    productMaxQuantity === productMinQuantity ||
                    productMaxQuantity < productMinQuantity
                ) {
                    this.setState({
                        displayQuantityValueError: "displayQuantityValueError"
                    });

                    return "Max. quantity value";
                } else
                    this.setState({
                        displayQuantityValueError: "displayQuantityValueError hide"
                    });
            } else return "Max. qunatity";
        }

        else if (fieldName === "Base price of this product & quantity type") {
            if (productPrice !== undefined) {
              if (productPrice === 0) {
                this.setState({
                  displayProductPriceValueError: "displayProductPriceValueError"
                });
      
                return "Base price value";
              } else {
                  if (quantityType !== 0 || priceNotation !== 0) {
                    this.setState({
                      displayProductPriceValueError: "displayProductPriceValueError hide",
                      displayBasePriceQuantityTypeError: "displayBasePriceQuantityTypeError hide"
                    })
                  }
        
                  else if (quantityType === 0 && priceNotation === 0) {
                    this.setState({
                      displayProductPriceValueError: "displayProductPriceValueError hide",
                      displayBasePriceQuantityTypeError: "displayBasePriceQuantityTypeError"
                    });
                    
                    return "Quantity type of base price"
                  }
      
              }
            } 
            
            else if (productPrice === undefined) {
              return "Base price of this product & quantity type";
            }
        }

        else if (fieldName === "Product GST") {
            if (productGST !== undefined) {
                if (productGST === 0) {
                    this.setState({
                        displayGSTValueError: "displayGSTValueError"
                    });

                    return "Product GST Value";
                } else {
                    this.setState({
                        displayGSTValueError: "displayGSTValueError hide"
                    });
                }
            } else if (productGST === undefined) {
                return "Product GST";
            }
        }

        else if (fieldName === "Product Discount") {
            if (productDiscountAvailablity === "yes") {
                if (productDiscount !== undefined) {
                    if (productDiscount === 0) {
                        this.setState({
                            displayDiscountValueError: "displayDiscountValueError"
                        });

                        return "Product Discount Value";
                    } else
                        this.setState({
                            displayDiscountValueError: "displayDiscountValueError hide"
                        });
                } else if (productDiscount === undefined) {
                    return "Product Discount Value";
                }
            } else return "Product Discount Availability";
        }

        else if (fieldName === "Product Installation") {
            if (productInstallationAvailability === 2) {
                if (productInstallationServiceCost !== undefined) {
                    if (this.refs.installationCost.value !== "") {
                        if (productInstallationServiceCost === 0) {
                            this.setState({
                                displayInstallationValueError: "displayInstallationValueError"
                            });

                            return "Product Installation Cost";
                        }

                        else
                            this.setState({
                                displayInstallationValueError:
                                    "displayInstallationValueError hide"
                            });
                    }

                    else if (this.refs.installationCost.value === "") {
                        return "Product Installation Cost";
                    }
                }

                else if (productInstallationServiceCost === undefined) {
                    return "Product Installation Cost";
                }
            }

            else if (productInstallationAvailability === 5) {
                if (productInstallers.length === 0) {
                    return "Product Installer Details"
                }
            }

            else return "Product Installation Service";
        }
    };

    validateProceedHandler = async () => {
        const fieldNames = [
            { fieldName: "Product Name", value: this.state.productName },
            { fieldName: "Product Code", value: this.state.productCode },
            {
              fieldName: `${this.handleMultiValidation("Base price of this product & quantity type")}`,
              value: this.state.productPrice
            },
            {
                fieldName: `${this.handleMultiValidation("Product GST")}`,
                value: this.state.productGST
            },
            { fieldName: "Material", value: this.state.productMaterials },
            // { fieldName: "Finishing Options", value: this.state.productFinishes },
            // { fieldName: "Color Options", value: this.state.colorArray },
            // { fieldName: "Sizes Available", value: this.state.productDimensions },
            { fieldName: "Min. quantity", value: this.state.productMinQuantity },
            {
                fieldName: `${this.handleMultiValidation("Max. quantity")}`,
                value: this.state.productMaxQuantity
            },
            {
                fieldName: "Product Description",
                value: this.state.productDescription
            },
            { fieldName: "Product Design", value: this.state.categoryStylesAdded },
            { fieldName: "Product Tags", value: this.state.tagsAdded },
            {
                fieldName: `${this.handleMultiValidation("Product Discount")}`,
                value: this.state.productDiscount
            },
            {
                fieldName: "Product Image",
                value: this.state.productImagesObject.imagesInCategory
            },

            {
                fieldName: `${this.handleMultiValidation("Product Installation")}`,
                value: this.state.productInstallationServiceCost
            }
        ];

        await this.setState({
            emptyField: []
        });

        fieldNames.map(item => {
            if (
                item.value === undefined ||
                item.value === null ||
                item.value.length === 0 ||
                item.fieldName === "Product GST Value" ||
                item.fieldName === "Max. quantity value" ||
                item.fieldName === "Product Discount Value" ||
                item.fieldName === "Product Installation Cost" ||
                item.fieldName === "Product Installer Details" ||
                item.fieldName === "Base price value" || 
                item.fieldName === "Quantity type of base price"
            ) {
                if (!this.state.emptyField.includes(item.fieldName)) {
                    this.state.emptyField.push(item.fieldName);
                }
            }
        });

        this.setState({
            emptyField: this.state.emptyField
        });

        this.modalClassToggle("show");
    };

    toggleOptions = option => {
        if (option === "yesDiscountAvailable") {
            this.setState({
                checkBoxProductDiscountClass1: "checkBox color",
                checkBoxProductDiscountClass2: "checkBox",
                productDiscountAvailablity: "yes",
                productDiscount: undefined
            });
        } 
        
        else if (option === "noDiscount") {
            this.setState({
                checkBoxProductDiscountClass1: "checkBox",
                checkBoxProductDiscountClass2: "checkBox color",
                displayError: "displayError hide",
                productDiscountAvailablity: "no",
                productDiscount: 0,
                displayDiscountValueError: "displayDiscountValueError hide"
            });

            this.refs.discountInput.value = "";
        } 
        
        else if (option === "yesInstallationFree") {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox color",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox",
                inputSection: "inputSection hide",
                productInstallationAvailability: 1,
                productInstallationServiceCost: 0,
                installationServiceCostType: 1,
                displayInstallationValueError: "displayInstallationValueError hide"
            });
            this.refs.installationCost.value = ""
        } 
        
        else if (option === "yesInstallationExtraCost") {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox color",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox",
                inputSection: "inputSection",
                productInstallationAvailability: 2,
                // productInstallationServiceCost: 
            });
        } 
        
        else if (option === "readyInstallation") {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox color",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox",
                inputSection: "inputSection hide",
                productInstallationAvailability: 3,
                productInstallationServiceCost: 0,
                installationServiceCostType: 1,
                displayInstallationValueError: "displayInstallationValueError hide"
            });
            this.refs.installationCost.value = ""
        } 
        
        else if (option === "noInstallationService") {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox color",
                checkBoxProductInstallationClass5: "checkBox",
                inputSection: "inputSection hide",
                productInstallationAvailability: 4,
                productInstallationServiceCost: 0,
                installationServiceCostType: 1,
                displayInstallationValueError: "displayInstallationValueError hide"
            });
            this.refs.installationCost.value = ""
        } 
        
        else if (option === "noInstallationButRecommendInstaller") {
            this.setState({
                checkBoxProductInstallationClass1: "checkBox",
                checkBoxProductInstallationClass2: "checkBox",
                checkBoxProductInstallationClass3: "checkBox",
                checkBoxProductInstallationClass4: "checkBox",
                checkBoxProductInstallationClass5: "checkBox color",
                inputSection: "inputSection hide",
                productInstallationAvailability: 5,
                productInstallationServiceCost: 0,
                installationServiceCostType: 1,
                displayInstallationValueError: "displayInstallationValueError hide"
            });
            this.refs.installationCost.value = ""
        }
    };
    
    focus = () => {
        this.refs.discountInput.focus();
    }

    render() {
        return (
            <div className="vendorDashboardWrapper">
                <Head>
                    <meta name="description" content="Architectural process from Rolling Logs, start building your dream home without any hassle in India." />
                    <meta name="robots" content="noodp" />
                    <link rel="canonical" href="https://www.rollinglogs.com/architecture/" />
                    <link rel = "next" href = "https://www.rollinglogs.com/architecture/page/2/" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="object" />
                    <meta property="og:description" content="Architects, Interior Designers Marketplace in India" />
                    <meta property="og:url" content="https://www.rollinglogs.com/architecture/" />
                    <meta property="og:site_name" content="RollingLogs" />
                    <meta property="og:image" content="http://static.dezeen.com/assets/images/logo-magazine.png" />
                    <title>Showcase your products to architect and interior designers - Rolling Logs</title>
                </Head>
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

                                <div className="uploadSectionUpperContainer">
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
                                                                                    this.addProductImage();
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
                                </div>

                                <div className="uploadSectionRightWrapper">
                                    <article className="rightWrapperInnerLayer">

                                        <header className="vendorFormHeading">

                                            <div className="headingArea">
                                                <h3 className="headingClass">Edit product</h3>

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
                                                            characterCount="60"
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
                                                        <p className="pargraphClass">Base price of this product (Excl. GST)</p>
                                                    </div>
                                                    <div className="PricingSection">
                                                        <InputForm
                                                            refName="productPrice"
                                                            placeholder="Type here (in Rupees)"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="8"
                                                            value={this.handleDefaultValues("ProductPrice")}
                                                            result={(val) => {
                                                                this.setState({
                                                                    productPrice: Number(val)
                                                                })
                                                            }}
                                                        />
                                                        <SelectList
                                                            name="quantityType"
                                                            // defaultValue={this.state.priceNotation}
                                                            onChange={e => this.onChangeHandler(e, "quantityType")}
                                                            options={typesOfPriceNotation}
                                                            value={this.state.quantityType !== 0 ? this.state.quantityType : this.state.priceNotation}
                                                        />
                                                    </div>

                                                    {/* {console.log(this.handleDefaultValues("PriceNotation"))} */}
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">
                                                        GST applicable for this product
                                                        </p>
                                                    </div>
                                                    <div className="materialInformationColumn">
                                                        <div className="modalMandatorySection">
                                                            <p className="madatoryHighlight">Mandatory</p>
                                                        </div>

                                                        <div className="inputColumn">
                                                            <input
                                                                type="text"
                                                                ref="GSTInput"
                                                                maxLength="2"
                                                                placeholder="Ex. 18, 12 etc"
                                                                defaultValue={this.handleDefaultValues("ProductGST")}
                                                                onChange={e =>
                                                                    this.checkTypeNumber(e, "GST")
                                                                }
                                                            />
                                                            <span className="InputSeparatorLine"></span>
                                                        </div>
                                                        
                                                        <p>%</p>
                                                    </div>


                                                    <div className="errorContent">
                                                        <p className={this.state.displayGSTValueValidationError}>
                                                        Numbers only
                                                        </p>
                                                        <p
                                                        className={
                                                            this.state.displayGSTValueError
                                                        }
                                                        >
                                                        GST cannot be zero, please check and enter it.
                                                        </p>
                                                    </div>
                                                </div>


                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Material</p>
                                                        <div className="modalMandatorySection">
                                                            <p className="madatoryHighlight">Mandatory</p>
                                                        </div>
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
                                                                maxLength="200"
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
                                                            characterCount="8"
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
                                                            characterCount="8"
                                                            value={this.handleDefaultValues("ProductMaxQuantity")}
                                                            result={(val) => {
                                                                this.setState({
                                                                    productMaxQuantity: Number(val)
                                                                })
                                                        }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className={this.state.displayQuantityValueError}>
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
                                                            characterCount="500"
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
                                                        <div className="modalMandatorySection">
                                                            <p className="madatoryHighlight">Mandatory</p>
                                                        </div>
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
                                                                    maxLength="40"
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

                                                {/* <div className="inputFormContainer">

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

                                                </div> */}

                                                <div className="inputFormContainer">

                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Is the product available? </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <RadioButton
                                                            title="Product Availability"
                                                            name={'availability'}
                                                            options={this.returnProductAvailability()}
                                                            selectedOption={this.state.productAvailabilityBool === true ? 
                                                                                    "Yes, it is available" : "No, it is not available"}
                                                            onChange={(e) => this.handleRadiobutton(e, "productAvailability")}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Product ad/demo video YouTube link(if any) </p>
                                                    </div>
                                                    
                                                    <div className="inputCategoryYoutubeSection">
                                                        <div className="youtubeUrlInputSection">
                                                            <div className="urlInputSection">
                                                                <input
                                                                    title="youTube Url"
                                                                    type="text"
                                                                    name="youTube"
                                                                    placeholder="Enter your product Ad/demo YouTube URL"
                                                                    ref="youTube"
                                                                    maxLength="1000"
                                                                    onChange={(e) => this.setYouTubeURL(e)}
                                                                    onKeyUp={e => {
                                                                    if (e.key === "Enter") {
                                                                        this.addYouTubeURL(e)
                                                                    }
                                                                    }}
                                                                />
                                                            <span className="InputSeparatorLine"> </span>
                                                                <div className={this.state.youTubeError}>
                                                                    <p>{this.state.youTubeUrlErrorStatement}</p>
                                                                </div>
                                                            </div>

                                                        <WhiteButton runFunction={this.addYouTubeURL}>
                                                            Add
                                                        </WhiteButton>
                                                    </div>
                                                </div>
                            
                            <div className={this.state.youTubeURL.length !== 0 ? "youTubeClass" : "youTubeClass hide"}>
                                <div className="youtubeContentInnerLayer">
                                  {this.returnYouTubeInput()}
                                </div>
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
                                                                this.toggleOptions("yesDiscountAvailable");
                                                                this.focus()
                                                            }}
                                                            >
                                                            <div className={this.state.checkBoxProductDiscountClass1}></div>
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
                                                                    <p className={this.state.displayDiscountValueValidationError}>
                                                                        Numbers Only
                                                                    </p>
                                                                    <p className={this.state.displayDiscountValueError}>
                                                                        Discount cannot be zero, If you wish to offer no discount,
                                                                        please select the option below.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div 
                                                            className="optionDiv"
                                                            onClick={() => {
                                                                this.toggleOptions("noDiscount");
                                                            }}
                                                            >
                                                            <div className={this.state.checkBoxProductDiscountClass2}></div>
                                                            <div className="contentForOptionSelection">
                                                                <p>No, there is no discount</p>
                                                            </div>
                                                        </div>
                                                    </div>    
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Brand Name</p>
                                                    </div>
                                                    <div className="brandNameInputSection">
                                                        <InputForm
                                                            refName="brandName"
                                                            placeholder="Ex.Greenply / Legrand etc."
                                                            value={this.handleDefaultValues("BrandName")}
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="30"
                                                            result={val =>
                                                                this.setState({
                                                                    brandName: val
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Product's brand logo (if any) </p>
                                                    </div>
                                                    
                                                    <p
                                                        style = {{marginBottom : "1em"}}
                                                        >
                                                        Note: Don't worry if the image doesn't appear properly, it will be properly displayed later
                                                    </p>

                                                    {this.returnBrandImage()}
                                                    
                                                </div>

                                                <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">
                                                    Do you offer installation services for this
                                                    product ?
                                                    </p>
                                                </div>

                                                <div className="materialInfoColumn">
                                                    <div
                                                    className="optionDiv"
                                                    onClick={() => {
                                                        this.toggleOptions("yesInstallationFree");
                                                    }}
                                                    >
                                                    <div
                                                        className={
                                                        this.state.checkBoxProductInstallationClass1
                                                        }
                                                    />
                                                    <div className="contentForOptionSelection">
                                                        <div className="nonErrorContent">
                                                        <p>
                                                            Yes, we install this product for free of
                                                            cost (No extra installation charges).
                                                        </p>
                                                        </div>
                                                    </div>
                                                    </div>

                                                    <div
                                                    className="optionDiv"
                                                    onClick={() => {
                                                        this.toggleOptions("yesInstallationExtraCost");
                                                    }}
                                                    >
                                                    <div
                                                        className={
                                                        this.state.checkBoxProductInstallationClass2
                                                        }
                                                    />
                                                    <div className="installationCostContent">
                                                    <div className="contentForOptionSelection">
                                                        <p>
                                                        Yes, we install this product for an extra
                                                        cost.
                                                        </p>
                                                    </div>
                                                    <div className={this.state.inputSection}>
                                                    <div className="installationCostOuterContent">
                                                                <header>
                                                                    <p>Installation cost (in INR)</p>
                                                                    <div className="line"></div>
                                                                </header>
                                                                <div className="installationCostInputSection">
                                                                    <div className="inputCategory">
                                                                    <input
                                                                        type="text"
                                                                        ref="installationCost"
                                                                        maxLength="5"
                                                                        placeholder="EX. 20"
                                                                        defaultValue={this.state.productInstallationServiceCost}
                                                                        onChange={e =>
                                                                            this.checkTypeNumber(e, "installation")
                                                                        }
                                                                        />
                                                                        <span className="InputSeparatorLine"> </span>
                                                                    </div>
                                                                    <p>/</p>
                                                                    <div className="selectionCategory">
                                                                        <SelectList
                                                                        name="installationServiceCostType"
                                                                        defaultValue={this.state.installationServiceCostType}
                                                                        onChange={e =>
                                                                            this.onChangeHandler(
                                                                            e,
                                                                            "installationServiceCost"
                                                                            )
                                                                        }
                                                                        options={typesOfCharge}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="errorContent">
                                                                    <p className={this.state.displayError}>
                                                                    Numbers Only
                                                                    </p>
                                                                    <p
                                                                    className={
                                                                        this.state.displayInstallationValueError
                                                                    }
                                                                    >
                                                                    Installation cost cannot be zero, If you wish
                                                                    not to offer installation service, please
                                                                    select the option accordingly.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        
                                                        {/* <input
                                                        type="text"
                                                        ref="installationCost"
                                                        maxLength="5"
                                                        placeholder="EX. 20"
                                                        defaultValue={this.state.productInstallationServiceCost !== 0 ? this.state.productInstallationServiceCost : ""}
                                                        onChange={e =>
                                                            this.checkTypeNumber(e, "installation")
                                                        }
                                                        />
                                                        <span className="InputSeparatorLine"> </span>
                                                        <p>/</p>
                                                        <SelectList
                                                        name="installationServiceCostType"
                                                        value={this.state.installationServiceCostType}
                                                        onChange={e =>
                                                            this.onChangeHandler(
                                                            e,
                                                            "installationServiceCost"
                                                            )
                                                        }
                                                        options={typesOfCharge}
                                                        /> */}
                                                    </div>
                                                    <div className="errorContent">
                                                        <p className={this.state.displayError}>
                                                        Numbers Only
                                                        </p>
                                                        <p
                                                        className={
                                                            this.state.displayInstallationValueError
                                                        }
                                                        >
                                                        Installation cost cannot be zero, If you wish
                                                        not to offer installation service, please
                                                        select the option accordingly.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </div>

                                                    <div
                                                    className="optionDiv"
                                                    onClick={() => {
                                                        this.toggleOptions("readyInstallation");
                                                    }}
                                                    >
                                                    <div
                                                        className={
                                                        this.state.checkBoxProductInstallationClass3
                                                        }
                                                    />
                                                    <div className="contentForOptionSelection">
                                                        <p>
                                                        This is a ready to use product. No
                                                        installation services applicable.
                                                        </p>
                                                    </div>
                                                    </div>

                                                    <div
                                                    className="optionDiv"
                                                    onClick={() => {
                                                        this.toggleOptions("noInstallationService");
                                                    }}
                                                    >
                                                    <div
                                                        className={
                                                        this.state.checkBoxProductInstallationClass4
                                                        }
                                                    />
                                                    <div className="contentForOptionSelection">
                                                        <p>
                                                        No, we don’t provide installation services.
                                                        </p>
                                                    </div>
                                                    </div>

                                                    <div
                                                    className="optionDiv"
                                                    onClick={() => {
                                                        this.toggleOptions(
                                                        "noInstallationButRecommendInstaller"
                                                        );
                                                    }}
                                                    >
                                                    <div
                                                        className={
                                                        this.state.checkBoxProductInstallationClass5
                                                        }
                                                    />
                                                    <div className="installationCostContent">
                                                        <div className="contentForOptionSelection">
                                                            <p>
                                                            No, we don’t offer installation services for
                                                            this product but I can recommend others who
                                                            can install it (this option increases the
                                                            chances of product purchase).
                                                            </p>
                                                        </div>
                                                        {this.state.checkBoxProductInstallationClass5 === "checkBox color" ?
                                                        <WhiteButton
                                                        runFunction={() => {
                                                            this.modalClassToggle("show");
                                                            this.setState({
                                                            modalType: "installer"
                                                            });
                                                        }}
                                                        >
                                                            <ColorPlusButtonIcon />
                                                                Add installer
                                                            </WhiteButton>
                                                        : null }
                                                         {this.returnProductInstallers()}
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

                                            <div className="buttonContainer">
                                                <WhiteButton
                                                    runFunction={() => 
                                                        {   
                                                            window.open("/vendor/dashboard", "_self")            
                                                        }}>
                                                    Cancel
                                                </WhiteButton>
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

export default connect(mapStateToProps, matchDispatchToProps)(EditProductDetails);
