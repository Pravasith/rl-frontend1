import React from "react"
import Link from 'next/link'

// import "../../../assets/sass/vendor_main_dashboard.scss"
import { Image } from 'cloudinary-react'
import PublicId from '../../../factories/cloudinaryFactory'

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Head from 'next/head'

import Navbar from "../../navbar/navbar"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions"
import { getUserData } from "../../../actions/userActions"
import { encryptData, decryptData } from "../../../factories/encryptDecrypt"
import { Footer } from "../../footer/footer"

import productsCategories from "../../../lib/productsCategory"

import { CloseButton, LogoLoadingAnimation, BigAnimatedCloseButton, TickSmallWhite, NavBarLoadingIcon, LocationTag } from "../../../assets/images"
import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon, PlusButtonIconWhite, AddNewProduct, VendorGraphic, ArrowMarkLong, BigCloseButton, SmallCloseButton, CopyLinkicon, ShareLink } from "../../../assets/images"
import LogoAnimation from "../../animations/logoAnimation"
import { GradientButton, InputForm, Modal, SelectList, WhiteButton } from "../../UX/uxComponents"
import HtmlSlider from "../../UX/htmlSlider"
import Axios from "axios"
import { api } from "../../../actions/apiLinks"
import YouTube from "../../UX/youTubeUploader";


class VendorMainDashboard extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',

            linkModal: 'linkModalContainer hide',

            contentClass: 'contentClass hide',
            internalLoaderClass: 'contentLoader',
            modalClass: 'modalClass hide',
            mainContentWrap: 'mainContentWrap hide',
            contentWrapper: 'contentWrapper hide',
            sectionClass: 'newCategorySection hide',
            vendorInitialGraphic: 'vendorGraphicCenter',

            productManagerWrapperClass: "productManagerWrapperClass",

            // my code
            mainHeadingClass1: 'productManager active',
            mainHeadingClass2: 'salesManager',
            firstName: null,

            contentType: "productManager",

            categoryErrorClass: "errorMessageWrap hide",
            categoryErrorMessage: "",
            subCategoryDataExists: false,

            categoryName: '',
            tagName: '',
            tagsAdded: [],

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
            youTubeURL: [],
            featuresAdded: [],
            categoryStylesAdded: [],

            activeModalType: "categoryModal",
            confirmationButtonContainer: "confirmationButtonContainer hide",

            categoryArray: [...productsCategories],

            subCategoryArray: [],

            categoriesSelected: [],

            deleteLoading : false,

            isShowing: false,

            tool_tip_content: '',
        }

    }
 
    componentDidMount = async () => {

        // window.addEventListener("resize",  this.updateDimensions);

        await Promise.all([
            this.props.getUserData(),
            this.props.hitApi(api.GET_VENDOR_DATA, "GET")
        ])

        .then(() => {
            
            let { userData, responseData } = this.props,
                { responsePayload } = responseData;

                // console.log(responsePayload)

            if (responsePayload.message !== "User credentials not found") {

                let decryptedData = {
                    ...decryptData(userData.responseData),
                    ...responsePayload
                }

                this.convertVendorDataAndSave(decryptedData.products)

                this.setState({
                    rLId: decryptedData.rLId,
                    firstName: decryptedData.firstName,
                    lastName: decryptedData.lastName,
                    professionalTitle: decryptedData.professionalTitle,
                    profilePicture: decryptedData.profilePicture,

                    ////////
                    responseCompanyName : decryptedData.companyName,
                    responseCompanyDescription : decryptedData.companyDescriptionLine1 
                                                    + " " +
                                                (
                                                    decryptedData.companyDescriptionLine2 
                                                        ?
                                                    decryptedData.companyDescriptionLine2 
                                                        :
                                                    ""
                                                ),
                    responseExperience : decryptedData.experience ? decryptedData.experience.years : "",
                    companyProfilePicture : decryptedData.companyProfilePicture,

                    state: decryptedData.address.state,
                    city: decryptedData.address.city,
                    
                    ////////
                    loadingClass: 'loadingAnim hide',
                    mainClass: 'mainClass',
                })
            }
        })

        .catch((err) => {
            if (err.response) {
                if (err.response.status === 401){
                    console.error(err.response)
                    window.open('/log-in', "_self")
                }
                    
            }

            else
                console.error(err)
        })

    }

    convertVendorDataAndSave = (productsRaw) => {

        let finalData = [], categoryExists = false


        productsRaw.map((item, i) => {
            const categoryId = item.productId.split("-")[0]
            const subCategoryId = item.productId.split("-")[0] + "-" + item.productId.split("-")[1]
            const { subCategoryName, productName, productId, thumb } = item
            let category

            this.state.categoryArray.map((categoryState, j) => {
                if (categoryState.categoryId === categoryId){
                    category = categoryState
                }
            })

            if(finalData.length !== 0){
                finalData.map((theItem, j) => {

                    if (theItem.category.categoryId === categoryId) {
                        categoryExists = true

                        let subCategoryExists = false

                        theItem.subCategory.map((subCat, k) => {
                            
                            if (subCat.subCategoryId === subCategoryId){
                                subCategoryExists = true

                                subCat.productImages.push({
                                    productId,
                                    productName,
                                    thumb
                                })
                            }
                        })

                        if(!subCategoryExists){
                            theItem.subCategory.push({
                                subCategoryId: subCategoryId,
                                subCategoryName: subCategoryName,
                                productImages: [
                                    {
                                        productId,
                                        productName,
                                        thumb
                                    }
                                ]
                            })
                        }

                        else {
                            subCategoryExists = false
                        }

                    }

                    else {
                        categoryExists = false
                    }
                })

                if(!categoryExists){

                    let secondCheckForCategorysExistance = false

                    finalData.map((secondItem) => {
                        if(secondItem.category.categoryId === categoryId){
                            secondCheckForCategorysExistance = true
                        }
                    })

                    if(!secondCheckForCategorysExistance)
                    finalData.push({
                        category,
                        subCategory: [
                            {
                                subCategoryId: subCategoryId,
                                subCategoryName: subCategoryName,
                                productImages : [
                                    {
                                        productId,
                                        productName,
                                        thumb
                                    }
                                ]
                            }
                        ]
                    })
                }


            }

            else{
                finalData.push({
                    category,
                    subCategory: [
                        {
                            subCategoryId: subCategoryId,
                            subCategoryName: subCategoryName,
                            productImages: [
                                {
                                    productId,
                                    productName,
                                    thumb
                                }
                            ]
                        }
                    ]
                })
            }

        })

        this.setState({
            mainContentWrap: 'mainContentWrap',
            internalLoaderClass: 'contentLoader hide',
            sectionClass: 'newCategorySection',
            contentWrapper: 'contentWrapper',
            categoriesSelected : [...finalData]
        })

        
    }

    onSelect = (e) => {
        this.setState({
            categoryName: e.target.value
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

    hitTheAPI = async (objectName, data) => {

        this
            .props
            .navBarLoadingAnimationShowHide(true)

        let rawData = {}

        rawData[objectName] = data

        await this
            .props
            .hitApi(api.UPDATE_USER_DATA, "PUT",
                {
                    message: "Update user's data",
                    requestData: rawData
                }
            )

            .then(() => {

                this
                    .props
                    .navBarLoadingAnimationShowHide(false)

            })
            .catch((err) => console.error(err))

    }

    toggleHeaderClass = (type) => {
        if (type === 'productManager') {
            if (this.state.mainHeadingClass1 === type) {
                this.setState({
                    mainHeadingClass1: type + ' active',
                    mainHeadingClass2: 'salesManager',
                })
            }
            else if (this.state.mainHeadingClass1 === type + ' active') {
                this.setState({
                    mainHeadingClass1: type
                })
            }
        }
        else if (type === 'salesManager') {
            if (this.state.mainHeadingClass2 === type) {
                this.setState({
                    mainHeadingClass2: type + ' active',
                    mainHeadingClass1: 'productManager',
                })
            }
            else if (this.state.mainHeadingClass2 === type + ' active') {
                this.setState({
                    mainHeadingClass2: type
                })
            }
        }
    }

    deleteCategory = (categoryType, index) => {
        const { categoriesSelected } = this.state;

        if (categoryType === "main") {
            categoriesSelected.splice(index, 1)

            let dummyArray = [...categoriesSelected]


            this.setState({
                categoriesSelected: dummyArray,
                modalClass: "modalClass hide",
                productManagerWrapperClass: "productManagerWrapperClass",
                mainContentWrap: "mainContentWrap",
                vendorInitialGraphic: 'vendorGraphicCenter',
            })
        }

        else if (categoryType === "sub") {

        }
    }

    fetchProductData = (productId) => {

        // create request

        const rawData = { productId }



        // GET PRODUCT DATA
        this.props.hitApi(api.GET_PRODUCT_DATA, "POST",
            {
                requestData: rawData,
                message: "Requesting dispatch products"
            }
        )
            .then(() => {

                let { responsePayload } = this.props.responseData;

                // console.log(decryptedData)

                this.setState({

                    productSelected : productId,

                    /// PLACE HERE ////
                    productName: responsePayload.productName,
                    productCode: responsePayload.productCode,
                    productPrice: responsePayload.basePrice,
                    productGST: responsePayload.gstPercentage,
                    productMaterials: responsePayload.productMaterials,
                    featuresAdded: responsePayload.features,
                    productFinishes: responsePayload.finishingOptions,
                    colorArray: responsePayload.colorOptions,
                    productDimensions: responsePayload.sizesAvailable,
                    productMinQuantity: responsePayload.minQuantity,
                    productMaxQuantity: responsePayload.maxQuantity,
                    productDescription: responsePayload.productDescription,
                    categoryStylesAdded: responsePayload.designStyles,
                    tagsAdded: responsePayload.tags,
                    productAvailability: responsePayload.availability,
                    productAvailabilityBool: responsePayload.availability,
                    productDiscount: responsePayload.discount,
                    productImagesObject: {
                        categoryName: "",
                        imagesInCategory: responsePayload.productImages
                    },
                    productThumbImage: responsePayload.productThumbImage,
                    youTubeURL: responsePayload.youTubeAdVideos ? responsePayload.youTubeAdVideos : [],
                    brandName: responsePayload.brandName,
                    brandImage: responsePayload.brandImage, 
                    productInstallers: responsePayload.productInstallers,
                    productInstallationAvailability: responsePayload.productInstallationAvailability,
                    productInstallationServiceCost: responsePayload.productInstallationServiceCost,
                    installationServiceCostType: responsePayload.installationServiceCostType,

                    subCategoryDataExists: true,

                    // productId

                })
            })

            .catch((err) => {
                if (err.response) {


                    if (err.response.status === 401)
                        window.open('/log-in', "_self")

                    else {
                        // window.open('/vendor/dashboard', "_self")
                    }
                }

                else {
                    console.error(err)
                    // window.open('/vendor/dashboard', "_self")
                }

            })
    }


    copyToClipBoard = () => {
        // console.log(this.refs.toolTip.value)

        this.refs.toolTip.select();
        document.execCommand('copy');
        this.setState({ tool_tip_content: 'Copied to clipboard!' });

    };

    returnSubCategoryProducts = (productImages, title) => {
        if(productImages){
            if (productImages.length !== 0) {

                let dummyArray = productImages.map((item, i) => {
                    return {
                        itemCode: item.productId,
                        textOnRibbonSatisfied: false,
                        imageURL: item.thumb,
                        title: item.productName
                    }
                })

                const dataObject = {
                    categoryName: title,
                    imagesInCategory: [...dummyArray]
                }
                
                // console.log(dataObject);

                return (
                    <div className="imageSliderWrap">
                        <HtmlSlider
                            categoryData={dataObject} // format of Item 
                            numberOfSlides={4} // Change the css grid properties for responsiveness
                            textOnRibbon={"BEST SELLER"} // All caps
                            // runFunction={(data) => { 
                            //     window.open("/vendor/edit-product/" + data.itemCode, "_self")
                            //  }}
                            runFunction={(data) => {
                                this.fetchProductData(data.itemCode)
                                this.setState({
                                    modalClass: 'modalClass',
                                    productManagerWrapperClass: "productManagerWrapperClass blurClass",
                                    activeModalType: "subCategoryDetailedPreview",
                                    itemCode: data.itemCode
                                })
                            }}
                        />

                    </div>
                )
            }
        }

    }

    returnSubCategoryProductsModal = (productImages, title) => {

        if(productImages){
            if (productImages.length !== 0) {

                let dummyArray = productImages.map((item, i) => {
                    return {
                        itemCode: item.productId,
                        textOnRibbonSatisfied: false,
                        imageURL: item.thumb,
                        title: item.productName
                    }
                })

                const dataObject = {
                    categoryName: title,
                    imagesInCategory: [...dummyArray]
                }
                
                // console.log(dataObject.categoryName)

                return (
                        
                        dataObject.imagesInCategory.map((item, i) => {
                            // console.log(item)
                            return (
                                <div 
                                    key={i}
                                    className="imageSliderWrap"
                                    onClick={(data) => {
                                        this.fetchProductData(item.itemCode)
                            
                                        this.setState({
                                            modalClass: 'modalClass',
                                            productManagerWrapperClass: "productManagerWrapperClass blurClass",
                                            activeModalType: "subCategoryDetailedPreview",
                                            itemCode: item.itemCode
                                            
                                        })
                                    }}    
                                >
                                
                                    <div 
                                        className="productImageGallery"
                                        key={i}>
                                        <Image 
                                            cloudName="rolling-logs" 
                                            alt = ""
                                            publicId={PublicId(item.imageURL)} 
                                            // transformations
                                            // width="300" 
                                            // crop="fit"
                                            width="200" 
                                            height = "140"
                                            crop="lpad"
                                        />
                                        <div className="paragraphClass"><p>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</p></div>
                                    </div>
                                </div>
                            )
                        }
                    )
                )
            }
        }
    }

    returnCategoryInModal = () => {
        // const { categoriesSelected } = this.state
        const categoriesSelected = [...this.state.categoriesSelected];


        const returnSubCategories = (subcategories) => {

            return subcategories.subCategory.map((item, i) => {
                let subCatProducts = [];
                if(item.subCategoryId === this.state.subCatId){
                    subCatProducts = item.productImages
                }
                // console.log(subCatProducts);
                return (
                    <div 
                        className = "subCategoryHead"
                        key = { "subCat" + i }
                        >
                        {
                            this.returnSubCategoryProductsModal(
                                subCatProducts,
                                item.subCategoryName
                            )
                        }
                    </div>
                )
            })
        }


        return(
            categoriesSelected.map((item, i) => {

                    return (
                        <div 
                            key = {i} 
                            className="categorisedProductsDisplay"
                        >
                            <div className="categorisedProductDisplayInnerLayer">
                                {returnSubCategories(item)}
                            </div>
                        </div>
                    )
                }
            )
        )

    }

    returnCategorisedProducts = () => {
        const { categoriesSelected } = this.state

        const returnSubCategories = (subcategories) => {
            
            return subcategories.subCategory.map((subcategory, i) => {
                let subCatProducts = []

                if(subcategory.productImages){
                    subCatProducts = [...subcategory.productImages]
                }
                
                
                return (
                    <div 
                        className="subCategoryHead"
                        key = { "subCat" + i }
                        >
                        <div className="subCategoryHeadInnerSection">
                            <div className="headerSection">
                                <div className="subCategoryHeaderSection">
                                    <div className="subCategoryHeaderNumberSection">
                                        <h3>{subcategory.subCategoryName}</h3>
                                        <h3 className="numberCount">({subCatProducts.length})</h3>
                                    </div>
                                    <div className="line"></div>
                                </div>
                                <div 
                                    className="deleteCategoryContainer"
                                    // onClick={() => this.deleteCategory(i)}
                                    onClick={() => {
                                        // console.log(subcategory);
                                        this.setState({
                                            mainCategoryIndex: i,
                                            modalClass: 'modalClass',
                                            productManagerWrapperClass: "productManagerWrapperClass blurClass",
                                            activeModalType: "uploaded",
                                            subCatId: subcategory.subCategoryId
                                        })
                                    }}
                                >
                                    {subCatProducts.length >= 1 ? 
                                       (<WhiteButton>
                                           Show All
                                        </WhiteButton>)
                                        :
                                        (<div></div>)
                                    }
                                </div>
                            </div>
                            <div className="addProductCategorySection">
                                <div 
                                    className="addNewProductButton"
                                    onClick = {() => {
                                        this.setState({
                                            mainClass : "mainClass hide",
                                            loadingClass : "loadingAnim"
                                        })

                                        window.open("/vendor/add-product/" + subcategory.subCategoryId.toLowerCase(), "_self")
                                    }}
                                    >
                                    <div className="addNewProductButtonInnerLayer">
                                        <div className="svgImageSection">
                                            <AddNewProduct />
                                        </div>
                                        <h3>Add new</h3>
                                    </div>
                                </div>

                                <div className="subCategoryProductSection">
                                    <div className="subCategoryProductSectionInnerLayer">
                                        {
                                            this.returnSubCategoryProducts(subCatProducts, subcategory.subCategoryName)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }


        if (categoriesSelected.length !== 0) {
            return(
                categoriesSelected.map((item, i) => {
                    return (
                        <div 
                            key = {i} 
                            className="categorisedProductsDisplay"
                        >
                            <div className="categorisedProductDisplayInnerLayer">
                                <div className="mainCategoryHead">
                                    <div className="categoryMainHeaderContainer">
                                        <h3>{item.category.categoryName}</h3>
                                        <div className="line"></div>
                                    </div>
                                </div>

                                {returnSubCategories(item)}
                            </div>
                        </div>
                    )
                  }
                )
            )
        }

        else {
            return (
                <div className="vendorInitialGraphic">
                    <div className="svgImageContainer">
                        <div className="graphicSvgImageContainer">
                            <VendorGraphic />
                            <div className="vendorGraphicInnerContainer">
                                <div className="vendorGraphicParaInnerLayer">
                                    <h3>Hey <span>{this.state.firstName}</span>, show your amazing products to your clients, start
                                        by clicking "Add new category" button on the top.</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }


    returnContent = () => {
        let { contentType } = this.state;

        if (contentType === 'productManager'){

            // return(
            //         <div className="add">
            //             <div className={this.state.contentWrapper}>
            //                 <div className="addProductButton">
            //                     <GradientButton
            //                         runFunction={() => {

            //                             // this.selectCategoryAndSubCategory()
            //                             this.setState({
            //                                 modalClass: 'modalClass ',
            //                                 productManagerWrapperClass : "productManagerWrapperClass blurClass",
            //                                 vendorInitialGraphic: 'hide',
            //                             })
            //                         }}
            //                         >
            //                         <div className="svgImageContainer">
            //                             <PlusButtonIconWhite />
            //                         </div>
            //                         Add new category
            //                     </GradientButton>
            //                 </div>

            return (
                <div className="add">
                    
                    <div className={this.state.contentWrapper}>
                        <div className="addProductButton">
                            <GradientButton
                                runFunction={() => {

                                    // this.selectCategoryAndSubCategory()
                                    this.setState({
                                        modalClass: 'modalClass ',
                                        productManagerWrapperClass: "productManagerWrapperClass blurClass",
                                        vendorInitialGraphic: 'hide',
                                        activeModalType: 'categoryModal'
                                    })
                                }}
                            >
                                <div className="svgImageContainer">
                                    <PlusButtonIconWhite />
                                </div>
                                Add new category
                            </GradientButton>

                            <WhiteButton
                                runFunction={() => {
                                    this.setState({
                                        // linkModal: 'linkModalContainer',
                                        // isShowing: true
                                        modalClass: 'modalClass ',
                                        productManagerWrapperClass: "productManagerWrapperClass blurClass",
                                        vendorInitialGraphic: 'hide',
                                        activeModalType: 'shareLinkModal'
                                    })
                                }}
                            >
                                Share your product catalogue
                            </WhiteButton>


                            

                            {/* <Link href="/vendor/profile-details">
                                <a
                                    onClick={() => {
                                        this.setState = ({
                                            loadingClass: 'loadingAnim',
                                            mainClass: 'mainClass hide'
                                        })
                                    }}
                                >
                                    <WhiteButton>
                                        Edit profile details
                                    </WhiteButton>
                                </a>
                            </Link> */}

                        </div>

                        <div 
                            className="populatedCategories"
                            >
                            <div className="populatedCategoriesInnerLayer">
                                {this.returnCategorisedProducts()}
                            </div>
                        </div>

                    </div>

                    <div
                        className={this.state.internalLoaderClass}
                    >
                        <LogoLoadingAnimation />
                    </div>
                </div>
            )
        }
        else if (contentType === 'salesManager') {
            return (
                <div className="clientProductWrap">
                    <div className="clientSectionInnerWrap">
                        Coming Soon
                    </div>
                </div>
            )
        }
    }

    closeTag = (indexNumber) => {
        this.state.tagsAdded.splice(indexNumber, 1)
    }

    returnTags = () => {
        const tags = this.state.tagsAdded.map((item, i) => {
            return (
                <div
                    className="tagsContainer"
                    key={i}
                >
                    <div className="tagWrapInnerLayer">
                        <p>
                            {item}
                        </p>

                        <div
                            className="closeTagContainer"
                            onClick={() => this.closeTag(i)}
                        >
                            <SmallCloseButton />
                        </div>
                    </div>
                </div>
            )
        })
        return tags
    }

    removeTag = (i) => {
        this.state.tagsAdded.splice(i, 1)
    }

    returnCategoryNames = () => {
        const { categoryArray, mainCategorySelection } = this.state
        let catIndex

        if (mainCategorySelection) {
            categoryArray.map((item, i) => {
                if (item.categoryId === mainCategorySelection.categoryId) {
                    catIndex = i
                }
            })
        }

        const selectThisCheckBoxAndDeselectOtherCheckBox = (i) => {
            const tl = new TimelineLite()

            categoryArray.map((item, j) => {
                if (i !== j) {
                    tl.set(
                        ".CAT" + j,
                        {
                            background: "#FFFFFF"
                        }
                    )
                }
            })

            tl.set(".CAT" + i,
                {
                    background: "#ff2c6b"
                })

            this.setState({
                mainCategorySelection: categoryArray[i]
            })
        }

        return categoryArray.map((item, i) => {
            return (
                <div
                    className="categorySelectionContainer"
                    key={i}
                    onClick={() => {
                        selectThisCheckBoxAndDeselectOtherCheckBox(i)
                    }}
                >
                    <div className="categorySelectionInnerLayer">
                        <div
                            className="inputCategoryValue"
                        >

                            <div className="categoryImageAndText">
                                <div className="svgCategoryImageContainer">
                                    <img src={item.categoryImage} alt="" />
                                </div>

                                <div className="categoryHeadingSection">
                                    <p>{item.categoryName}</p>
                                </div>

                                <div className="categoryCheckBox">
                                    <div className="checkBoxDummyWrap">
                                        <div
                                            className={"checkBoxSelect " + "CAT" + i}
                                            style={{ background: catIndex === i ? "#ff2c6b" : "#ffffff" }}
                                        >
                                            <div className="iconWrap">
                                                <TickSmallWhite />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

    }

    returnSubCategoryNames = () => {
        const { subCategoryArray } = this.state

        const selectThisCheckBoxAndDeselectOtherCheckBox = (i) => {
            const tl = new TimelineLite()

            subCategoryArray.map((item, j) => {
                if (i !== j) {
                    tl.set(
                        ".SUB-CAT" + j,
                        {
                            background: "#FFFFFF"
                        }
                    )
                }
            })

            tl.set(".SUB-CAT" + i,
                {
                    background: "#ff2c6b"
                })

            this.setState({
                subCategorySelection: subCategoryArray[i]
            })
        }




        return subCategoryArray.map((item, i) => {
            return (
                <div
                    className="categorySelectionContainer"
                    key={i}
                    onClick={() => {
                        selectThisCheckBoxAndDeselectOtherCheckBox(i)
                    }}
                >
                    <div className="categorySelectionInnerLayer">
                        <div
                            className="inputCategoryValue subInputCategoryValue"
                        >

                            <div className="subCategoryImageAndText">
                                {/* <div className="svgCategoryImageContainer">
                                    <img src={item.categoryImage} alt=""/>
                                    </div> */}

                                <div className="categoryHeadingSection">
                                    <p>{item.subCategoryName}</p>
                                </div>

                                <div className="subCategoryCheckBox">
                                    <div className="checkBoxDummyWrap">
                                        <div
                                            className={"checkBoxSelect " + "SUB-CAT" + i}
                                        >
                                            <div className="iconWrap">
                                                <TickSmallWhite />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )
        })
    }

    handleCategorySelections = () => {
        const { mainCategorySelection } = this.state

        this.setState({
            subCategoryArray: []
        })

        if (mainCategorySelection === undefined || mainCategorySelection === null) {
            this.setState({
                categoryErrorClass: "errorMessageWrap",
                categoryErrorMessage: "You have to select one category",
            })
        }

        else if (mainCategorySelection !== undefined && mainCategorySelection !== null) {

            const theData = {
                categoryId: mainCategorySelection.categoryId
            }



            // send request
            this.props.hitApi(api.GET_SUB_CATEGORIES, "POST",
                {
                    requestData: theData,
                    message: "Requesting dispatch sub-categories"
                }
            )
                .then(() => {
                    let { responsePayload } = this.props.responseData

                    this.setState({
                        subCategoryArray: responsePayload.subCategoriesArray
                    })

                })
                .catch(e => {
                    console.error(e)
                })

            this.setState({
                categoryErrorClass: "errorMessageWrap hide",
                activeModalType: "subcategoryModal"
               
            })
        }
    }

    handleProceedForNewProduct = async () => {
        const { mainCategorySelection, subCategorySelection, categoriesSelected } = this.state;

        let categoryAlreadySelected = false;
        let subCategoryAlreadySelected = false;

        categoriesSelected.map((item, i) => {

            if (item.category.categoryId === mainCategorySelection.categoryId) {

                categoryAlreadySelected = true;

                item.subCategory.map((subItem, i) => {

                    if (subItem.subCategoryId === subCategorySelection.subCategoryId) {

                        subCategoryAlreadySelected = true

                        this.setState({
                            modalClass: 'modalClass',
                            productManagerWrapperClass: "productManagerWrapperClass blurClass",
                            activeModalType: "subCategoryExistWarning"
                        })

                    }
                })

                if (subCategoryAlreadySelected === false) {
                    item.subCategory.push(subCategorySelection)
                }
            }
        })
        
        if (categoryAlreadySelected === false) {
            categoriesSelected.push({
                category: mainCategorySelection,
                subCategory: [subCategorySelection]
            })
        }

        let dummyArray = [...categoriesSelected]

        this.setState({
            categoriesSelected: dummyArray,
            subCategorySelection : null,
            mainCategorySelection : null
        })
    }


    returnChargeType = (installerCostType) => {

        if (installerCostType === 1) return "square feet";
        else if (installerCostType === 2) return "running feet";
        else if (installerCostType === 3) return "piece";
        else if (installerCostType === 4) return "hour";
    };

    returnArrayFields = (fieldName) => {
        const {
            productPrice,
            productMaterials,
            featuresAdded,
            productFinishes,
            colorArray,
            productDimensions,
            categoryStylesAdded,
            tagsAdded,
            productImagesObject,
            youTubeURL,
            productInstallationAvailability,
            productInstallers,
            productInstallationServiceCost,
            installationServiceCostType
        } = this.state;

        // const productInstallersDetail = 

        if(fieldName === "materials") {
            return (
                productMaterials.map((item, i) => {
                    return (
                        <div 
                            key={i} 
                            className="modalContainerUpperContainer">
                            <div className="modalContainer">
                                {/* <div className="subImageOrDivIfAny">
                                    <img src="https://s3.ap-south-1.amazonaws.com/rolling-logs/images/vendor/regular-images/regularImage-VEN-DmcsOdIT7SQIWhx-FS9DC9tT9e-1544707923492.jpeg" alt=""/>
                                </div> */}

                                <div className="modalContainerInnerLayer">
                                    <div className="modalHeadingText">
                                        {/* <h3>Name: </h3> <p>{item.materialName}</p> */}
                                        <p>{item.materialName}</p>
                                    </div>

                                    <div className="modalSubText">
                                        {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}
                                        <p>{item.materialGrade}</p>
                                    </div>

                                    <div className="modalSubText">
                                        {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}
                                        {
                                            Number(item.materialCost) > 0 
                                            ?
                                            <p>Costs <span>Rs. { item.materialCost }</span> extra per piece</p>
                                            :
                                            <p>No extra cost</p>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            )
        }

        else if (fieldName === "features") {
            if (featuresAdded.length !== 0) {
                return (
                    featuresAdded.map((item, i) => {
                        return (
                            <div 
                                key={i} 
                                className="modalContainerUpperContainer">
                                <div className="modalContainer">
                                    {/* <div className="subImageOrDivIfAny">
                                        <img src="https://s3.ap-south-1.amazonaws.com/rolling-logs/images/vendor/regular-images/regularImage-VEN-DmcsOdIT7SQIWhx-FS9DC9tT9e-1544707923492.jpeg" alt=""/>
                                    </div> */}

                                    <div className="modalContainerInnerLayer">
                                        

                                        <div className="modalHeadingText">
                                            {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}
                                            <p><span>{item}</span></p>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }

            else {
                return (
                    <div className="productSubHeading">
                        <p>N/A</p>
                    </div>
                )
            }
        }

        else if (fieldName === "finishes") {
            if (productFinishes.length !== 0) {
                return (
                    productFinishes.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="modalContainerUpperContainer">
                                <div className="modalContainer">
                                    <div className="subImageOrDivIfAny">
                                        <img
                                            src={item.finishImage}
                                            alt=""
                                        />
                                    </div>

                                    <div className="modalContainerInnerLayer">
                                        <div className="modalHeadingText">
                                            {/* <h3>Name: </h3> <p>{item.materialName}</p> */}
                                            <p>{item.finishName}</p>
                                        </div>

                                        <div className="modalSubText">
                                            {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}
                                            <p>{item.finishCode}</p>
                                        </div>

                                        <div className="modalSubText">

                                            {
                                                Number(item.finishCost) > 0
                                                    ?
                                                    <p>Costs <span>Rs. {item.finishCost}</span> extra per piece</p>
                                                    :
                                                    <p>No extra cost</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }

            else {
                return <p>N/A</p>
            }
        }

        else if (fieldName === "colors") {
            if (colorArray.length !== 0) {
                return (
                    colorArray.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="modalContainerUpperContainer">
                                <div className="modalContainer">
                                    <div className="subImageOrDivIfAny">
                                        <div style={{ background: item.colorCode }} ></div>
                                    </div>

                                    <div className="modalContainerInnerLayer">
                                        <div className="modalHeadingText">
                                            {/* <h3>Name: </h3> <p>{item.materialName}</p> */}
                                            <p>{item.colorName}</p>
                                        </div>
                                        <div className="modalSubText">
                                            {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}
                                            <p>{item.colorCode}</p>
                                        </div>
                                        <div className="modalSubText">
                                            {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}

                                            {
                                                Number(item.colorCost) > 0
                                                    ?
                                                    <p>Costs <span>Rs. {item.colorCost}</span> extra per piece</p>
                                                    :
                                                    <p>No extra cost</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }

            else {
                return <p>N/A</p>
            }
        }

        else if (fieldName === "dimensions") {
            if (productDimensions.length !== 0) {
                return (
                    productDimensions.map((item, i) => {

                        return (
                            <div
                                key={i}
                                className="modalContainerUpperContainer">
                                <div className="modalContainer">


                                    <div className="modalContainerInnerLayer">
                                        <div className="modalHeadingText">
                                            {/* <h3>Name: </h3> <p>{item.materialName}</p> */}
                                            <p>{item.sizeName}</p>
                                        </div>

                                        <div className="modalSubText">

                                            {
                                                Number(item.sizeCost) > 0
                                                    ?
                                                    <p>Costs <span>Rs. {item.sizeCost}</span> extra per piece</p>
                                                    :
                                                    <p>No extra cost</p>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )


                    })
                )
            }

            else {
                return <p>N/A</p>
            }
        }

        else if (fieldName === "styles") {
            return (
                categoryStylesAdded.map((item, i) => {
                    return (
                        <div 
                            key={i} 
                            className="modalContainerUpperContainer">
                            <div className="modalContainer">
                                {/* <div className="subImageOrDivIfAny">
                                    <img src="https://s3.ap-south-1.amazonaws.com/rolling-logs/images/vendor/regular-images/regularImage-VEN-DmcsOdIT7SQIWhx-FS9DC9tT9e-1544707923492.jpeg" alt=""/>
                                </div> */}

                                <div className="modalContainerInnerLayer">
                                    

                                    <div className="modalHeadingText">
                                        {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}
                                        <p>{item.styleName}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                    
                })
            )
        }

        else if (fieldName === "tags") {
            return (
                tagsAdded.map((item, i) => {

                    return (
                        <div 
                            key={i} 
                            className="modalContainerUpperContainer">
                            <div className="modalContainer">
                                {/* <div className="subImageOrDivIfAny">
                                    <img src="https://s3.ap-south-1.amazonaws.com/rolling-logs/images/vendor/regular-images/regularImage-VEN-DmcsOdIT7SQIWhx-FS9DC9tT9e-1544707923492.jpeg" alt=""/>
                                </div> */}

                                <div className="modalContainerInnerLayer">
                                    

                                    <div className="modalHeadingText">
                                        {/* <h3>Price:</h3> <p>Rs. {item.materialCost}</p> */}
                                        <p>{item}</p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )


                })
            )
        }

        else if (fieldName === "images") {

            return (
                <div className="productImagesContainer">
                    <HtmlSlider
                        categoryData={productImagesObject} // format of Item 
                        numberOfSlides={4} // Change the css grid properties for responsiveness
                        textOnRibbon={"TRENDING NOW"} // All caps
                        runFunction={(data) => { }}
                    />
                </div>
            )
        }

        else if (fieldName === "youTube") {
            if (youTubeURL.length !== 0) {
                return youTubeURL.map((item, i) => {
                    return (
                        <div className="youTubeContainer" key={i}>
                            <YouTube video={item} autoplay="0" rel="0" modest="1" />
                        </div>
                    );
                })
            }

            else{
                return <p>N/A</p>
            }
        }

        else if (fieldName === "installationService") {
            if (productInstallationAvailability === 1) {
                return <p>Yes, we install this product for free of cost (No extra installation charges).</p>
            } 

            else if (productInstallationAvailability === 2) {
                return <p>Yes, we install this product for an extra cost at Rs. {productInstallationServiceCost}/{this.returnChargeType(installationServiceCostType)} .</p>
            }

            else if (productInstallationAvailability === 3) {
                return <p>This is a ready to use product. No installation services applicable.</p>
            }

            else if (productInstallationAvailability === 4) {
                return <p>No, we don’t provide installation services.</p>
            }

            else if (productInstallationAvailability === 5) {

                const populateProductInstallers = () => productInstallers.map((item, i) => {
                    return (
                        <div 
                            key={i}
                            className="modalContainerUpperContainer"
                            >
                            <div className="modalContainer">
                                <div className="modalContainerInnerLayer">
                                    <div className="modalHeadingText">
                                        <p>{item.installerName}</p>
                                    </div>
    
                                    <div className="modalSubText">
                                        <p>+91 {item.installerContactNo}</p>
                                    </div>
    
                                    <div className="modalSubText">
                                        {
                                            Number(item.installerCharges) > 0 
                                            ?
                                                <p>Charges <span>Rs. {item.installerCharges}</span> / {this.returnChargeType(item.installerChargeType)}</p>
                                            :
                                            <p>Installer cost not specified</p>
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })

                if(productInstallers.length !== 0) {
                    return (
                        // <div className="gridItemsContainer productSubContainers">
                        
                        // </div>
                        <div className="gridOuterBox">
                            {populateProductInstallers()}
                        </div> 
                    )
                }
            }
        }
    }

    returnSubCategoryDetails = () => {

        const { 
            productName,
            productCode,
            productPrice,
            productGST,
            productMinQuantity,
            productMaxQuantity,
            productDescription,
            
            productAvailability,
            productDiscount,
            productThumbImage,
            brandName,
            brandImage
        } = this.state;

        if (this.state.subCategoryDataExists) {
            return (
                <div className="subCategoryDeatilsInnerLayer">
                    <div className="productImageCategoryOuterLayer">
                        {/* <div className="productImageCategoryInnerLayer">
                            <div className="productThumbImageCategoryContainer">
                                <div className="productName">
                                    <h3>Name: </h3> 
                                    <p>{productName}</p>
                                </div>
                                <div className="productCode">
                                    <h3>Code: </h3>
                                    <p>{productCode}</p>
                                </div>
                                <div className="productPrice">
                                    <h3>Price: </h3> 
                                    <p>Rs.{productPrice}</p> 
                                </div>
                            </div>
                            <div className="productThumbImage">
                                <h3>Thumbnail Image: </h3>
                                <img
                                    src={productThumbImage}
                                    alt=""
                                />
                            </div>
                            
                        </div> */}
                    </div>
                    <div className="productPreviewInformationColumn">

                        
                                
                        <div className="productsInformationInnerLayer">

                            <div className="alignedSubjects">
                                <div className="leftAligned">
                                    <div className="productSubHeading">
                                        <h3>Name </h3>
                                        <p>{productName}</p>
                                    </div>

                                    <div className="productSubHeading">
                                        <h3>Code </h3>
                                        <p>{ productCode }</p>
                                    </div>

                                    <div className="productSubHeading">
                                        <h3>Unit price </h3>
                                        { 
                                            productPrice !== 1 
                                            ? 
                                            <p>
                                                Rs. {productPrice}<br/>
                                                {/* <span>(Here per unit can mean per set also if applicable. Please request quote to get detailed price clarity)</span> */}
                                            </p> 
                                            : 
                                            <p>Not specified</p> 
                                        }

                                    </div>

                                    <div className="productSubHeading">
                                        <h3>GST </h3>
                                        <p>{productGST} %</p>
                                    </div>
                                </div>

                                <div className="rightAligned">
                                    <div className="productThumbImage">
                                        {/* <img
                                            src={productThumbImage}
                                            alt=""
                                        /> */}
                                        <Image 
                                            cloudName="rolling-logs" 
                                            alt = ""
                                            publicId={PublicId(productThumbImage)} 
                                            // transformations
                                            width="200" 
                                            height = "140"
                                            crop="lpad"

                                            // zoom="0.05"
                                            // aspect_ratio="1.5"
                                        />
                                    </div>
                                </div>

                            </div>

                            

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Material choices </h3>
                                <div className="gridOuterBox">
                                    {this.returnArrayFields("materials")}
                                </div>                            
                            </div>

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Features / specifications </h3>
                                <div className="gridOuterBox">
                                    {this.returnArrayFields("features")}
                                </div>                            
                            </div>

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Finishes</h3>
                                <div className="gridOuterBox">
                                    {this.returnArrayFields("finishes")}
                                </div>                            
                            </div>

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Colors</h3>
                                <div className="gridOuterBox">
                                    {this.returnArrayFields("colors")}
                                </div>                            
                            </div>

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Sizes available </h3>
                                <div className="gridOuterBox">
                                    {this.returnArrayFields("dimensions")}
                                </div>                            
                            </div>

                            <div className="productSubHeading">
                                <h3>Min Quantity  </h3> 
                                <p>{productMinQuantity}</p> 
                            </div>

                            <div className="productSubHeading">
                                <h3>Max Quantity  </h3> 
                                <p>{productMaxQuantity}</p> 
                            </div>
                            
                            <div className="productSubHeading">
                                <h3>Product description  </h3> 
                                <p>{productDescription}</p> 
                            </div>

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Design Styles </h3>
                                <div className="gridOuterBox">
                                    {this.returnArrayFields("styles")}
                                </div>                            
                            </div>

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Tags</h3>
                                <div className="gridOuterBox">
                                    {this.returnArrayFields("tags")}
                                </div>                            
                            </div>
                            
                            

                            <div className="productSubHeading">
                                <h3>Product Availability</h3>
                                <p>{productAvailability === false ? "No, the product is not available" : "Yes, the product is available"}</p>
                            </div>

                            <div className="productSubHeading">
                                <h3>Product discount</h3>
                                <p>{Number(productDiscount) > 0 ? productDiscount : "No discount available on this product"}</p>
                            </div>

                            <div className="productSubHeading imageWrapper">
                                <h3>Product Images</h3>
                                
                                <div className="productImagesOuterContainer">
                                    {this.returnArrayFields("images")}
                                </div>
                            </div>

                            <div className="productSubHeading imageWrapper">
                                <h3>Product videos</h3>
                                
                                <div className="productVideosOuterContainer">
                                    {this.returnArrayFields("youTube")}
                                </div>
                            </div>

                            <div className="productSubHeading">
                                <h3>Brand Name</h3>
                                <p>{brandName ? brandName : "N/A"}</p>
                            </div>

                            <div className="productSubHeading">
                                <h3>Brand Logo</h3>
                                <div className="productImagesOuterContainer">
                                    {
                                        brandImage 
                                        ?
                                        <div className="productImagesContainer">
                                            {/* <img 
                                                className = "individualImage" 
                                                src={brandImage} 
                                                alt="" 
                                            /> */}
                                            <Image
                                                cloudName="rolling-logs" 
                                                alt = ""
                                                publicId={PublicId(brandImage)} 
                                                // transformations
                                                width="100" 
                                                crop="fit"
                                            />
                                        </div>
                                        : 
                                        <p>N/A</p> 
                                    }
                                </div>
                            </div>

                            <div className="gridItemsContainer productSubContainers">
                                <h3>Installation Service Option</h3>
                                {/* <div className="productImagesOuterContainer"> */}
                                    {this.returnArrayFields("installationService")}
                                {/* </div> */}
                                
                            </div>
                            
                        </div>
                   </div>

                    <div className="confirmationButtonContainer">
                        <div className="closeButtonContainer">
                            <GradientButton
                                runFunction={() => {
                                    window.open("/vendor/edit-product/" + this.state.itemCode.toLowerCase(), "_self")
                                }}
                            >
                                Edit {productName}
                            </GradientButton>
                        </div>
                        <div className="removeButtonContainer">
                            <WhiteButton
                                // runFunction={() => {
                                //     this.deleteCategory("sub", this.state.productId)
                                // }}
                                runFunction={() => {
                                    this.setState({
                                        modalClass: 'modalClass',
                                        productManagerWrapperClass: "productManagerWrapperClass blurClass",
                                        activeModalType: "delete"
                                    })
                                }}
                            >
                                Delete
                             </WhiteButton>
                        </div>
                    </div>

                </div>
            )
        }

        else{
            return (
                <div className="loadingButton">
                    <NavBarLoadingIcon />
                </div>
            )
        }
    }

    modifyRLId = (rLId) => {
        return rLId.split("-")[1].split("").reverse().join("")
    }

    returnModalContent = (categoryModalOrSubcategoryModal) => {

        if (categoryModalOrSubcategoryModal === "categoryModal") {

            let tl = new TimelineLite()

            let { categoryArray, mainCategorySelection } = this.state
            let i

            if (mainCategorySelection) {
                categoryArray.map((item, j) => {
                    if (item.categoryId === mainCategorySelection.categoryId) {
                        i = j
                    }
                })

                tl.set(".CAT" + i,
                    {
                        background: "#ff2c6b"
                    })
            }


            return (
                <div className="modalInnerLayer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeaderContainer">
                            <h3>Select one category</h3>
                            <div className="line"></div>
                        </div>

                        <div
                            className="close"
                            onClick={() => this.setState({
                                modalClass: "modalClass hide",
                                productManagerWrapperClass: "productManagerWrapperClass",
                                mainContentWrap: "mainContentWrap",
                                vendorInitialGraphic: 'vendorGraphicCenter',
                            })}
                        >
                            <BigCloseButton />
                        </div>
                    </div>

                    <div className="subHeadingSection">
                        <h3>1/2</h3>
                        <p>Pick one from the options given below</p>
                    </div>

                    <div className="dummyContainer">
                        <div className="categoryPopulation">
                            {this.returnCategoryNames()}
                        </div>
                    </div>

                    <div className={this.state.categoryErrorClass}>
                        <p>{this.state.categoryErrorMessage}</p>
                    </div>

                    <div className="proceedButton">
                        <GradientButton
                            runFunction={() => this.handleCategorySelections()}
                            >
                            Proceed
                        </GradientButton>
                    </div>
                </div>
            )
        }

        else if (categoryModalOrSubcategoryModal === "subcategoryModal") {
            return (
                <div className="modalInnerLayer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeaderContainer">
                            <h3>Details about the category</h3>
                            <div className="line"></div>
                        </div>
                        <div
                            className="close"
                            onClick={() => this.setState({
                                modalClass: "modalClass hide",
                                mainContentWrap: "mainContentWrap",
                                productManagerWrapperClass: "productManagerWrapperClass",
                                vendorInitialGraphic: 'vendorGraphicCenter',
                            })
                            }
                        >
                            <BigCloseButton />
                        </div>
                    </div>

                    <div className="subHeadingSection">
                        <h3>2/2</h3>
                        <p>Choose sub-category</p>
                    </div>

                    <div className="dummyContainer dummySub">

                        {
                            this.state.subCategoryArray.length !== 0
                                ?
                                <div className="categoryPopulation">
                                    {this.returnSubCategoryNames()}
                                </div>
                                :
                                <div className="subCategoryLoader">
                                    {/* <LogoAnimation
                                            text = "Getting subcategories"
                                        /> */}
                                    <NavBarLoadingIcon />
                                </div>

                        }

                    </div>

                    <div className={this.state.categoryErrorClass}>
                        <p>{this.state.categoryErrorMessage}</p>
                    </div>


                    <div className="proceedButton">
                        <WhiteButton
                            runFunction={() => this.setState({
                                activeModalType: "categoryModal"
                            })}
                            >
                            Go back
                        </WhiteButton>
                        <GradientButton
                            runFunction={() => {
                                this.setState({
                                    modalClass: "modalClass hide",
                                    productManagerWrapperClass: "productManagerWrapperClass",
                                })

                                this.handleProceedForNewProduct()
                             }}
                            >
                            Proceed
                        </GradientButton>
                    </div>
                </div>
            )
        }

        else if (categoryModalOrSubcategoryModal === "uploaded") {
            if(this.state.deleteLoading){
                return (
                    <div className="modalCategoryDeleteContainer">
                        <div className="loadingAnimationDelete">
                            <NavBarLoadingIcon/>
                        </div>
                    </div>
                )
            }
            else{
                
                return (
                    <div className="modalCategoryUploadedContainer">
                        <div className="modalHeaderCloserSection">
                            <div className="modalHeaderContainer">
                                <h3>Uploaded products</h3>
                                <div className="line"></div>
                            </div>
                            <div 
                                className="close"
                                onClick={() => this.setState({
                                    modalClass: "modalClass hide",
                                    productManagerWrapperClass: "productManagerWrapperClass",
                                    mainContentWrap: "mainContentWrap",
                                    vendorInitialGraphic: 'vendorGraphicCenter',
                                })}
                            >
                            <BigCloseButton/>
                            </div>
                        </div>
                        <div className="uploadedProductsContainer">
                            <div className="productImagesContainer">
                                 {this.returnCategoryInModal()}
                            </div>
                        </div>
                    </div>
                )
            }
        }

        else if (categoryModalOrSubcategoryModal === "delete") {

            if(this.state.deleteLoading){
                return (
                    <div className="modalCategoryDeleteContainer">
                        <div className="loadingAnimationDelete">
                            <NavBarLoadingIcon/>
                        </div>
                    </div>
                )
            }

            else{
                
                return (
                    <div className="modalCategoryDeleteContainer">
                        <div className="modalHeaderCloserSection">
                            <div className="modalHeaderContainer">
                                <h3>Are you sure you want to delete this ?</h3>
                                <div className="line"></div>
                            </div>
                        </div>
                        <div className="confirmationButtonContainer">
                            <div className="noContainer">
                                <WhiteButton
                                    runFunction={() => this.setState({
                                        modalClass: "modalClass hide",
                                        productManagerWrapperClass: "productManagerWrapperClass",
                                        mainContentWrap: "mainContentWrap",
                                        vendorInitialGraphic: 'vendorGraphicCenter',
                                    })}  
                                >
                                No
                                </WhiteButton>
                            </div>
                            <div className="yesContainer">
                                <WhiteButton
                                    runFunction={() => {
                                        this.setState({
                                            deleteLoading : true, 
                                        })

                                       
                                        this.props.hitApi(api.DELETE_PRODUCT + "?pId=" + this.state.productSelected, "DELETE", 
                                            // {
                                            //     message: "Houston, destroy product",
                                            //     requestData: encryptedData
                                            // }
                                        )
                                        .then(() => {

                                            window.open("/vendor/dashboard", "_self")

                                            this.setState({
                                                deleteLoading : false,
                                                modalToShow : "success",
                                                modalClass: "modalClass hide",
                                                productManagerWrapperClass: "productManagerWrapperClass",
                                            })
                        
                                        })
                                        .catch(e => {
                                            console.error(e)
                                            this.setState({
                                                deleteLoading : false,
                                                modalToShow : "failure",
                                                modalClass: "modalClass hide",
                                                productManagerWrapperClass: "productManagerWrapperClass",
                                            })
                                            window.open("/vendor/dashboard", "_self")
                                        })
                                        
                                    }}
                                    >
                                    Yes
                                 </WhiteButton>
                            </div>
                        </div>
                    </div>
                )
            }
           
        }

        else if (categoryModalOrSubcategoryModal === "subCategoryExistWarning") {
            return (
                <div className="modalCategoryDeleteContainer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeaderContainer">
                            <h3>Sub-category you choose already exists in your dashboard</h3>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className="confirmationButtonContainer">
                        <div className="closeButtonContainer">
                            <WhiteButton
                                runFunction={() => this.setState({
                                    modalClass: "modalClass hide",
                                    productManagerWrapperClass: "productManagerWrapperClass",
                                    mainContentWrap: "mainContentWrap",
                                    vendorInitialGraphic: 'vendorGraphicCenter',
                                })}
                            >
                                Okay
                            </WhiteButton>
                        </div>
                    </div>
                </div>
            )
        }

        else if (categoryModalOrSubcategoryModal === "subCategoryDetailedPreview") {
            return (
                <div className="modalEditCategoryContainer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeaderContainer productPreview">
                            <h3>Product preview</h3>
                            <div className="line"></div>
                            {/* <small>(N/A - Not Applicable)</small> */}
                        </div>
                        <div
                            className="close"
                            onClick={() => this.setState({
                                modalClass: "modalClass hide",
                                mainContentWrap: "mainContentWrap",
                                productManagerWrapperClass: "productManagerWrapperClass",
                                subCategoryDataExists: false,
                                vendorInitialGraphic: 'vendorGraphicCenter',
                            })
                            }
                        >
                            <BigCloseButton />
                        </div>
                    </div>
                    <div className="productEditInformationContainer">
                        {this.returnSubCategoryDetails()}
                    </div>
                </div>
            )
        }
        else if (categoryModalOrSubcategoryModal === "shareLinkModal"){
            return(
                <div className="modalCategoryLinkContainer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeader">
                            <h3>Share this link in your social media accounts to showcase your portfolio of products and increase your sales</h3>
                            <div className="line"></div>
                        </div>
                        <div 
                            className="modalClose"
                            onClick={() => this.setState({
                                modalClass: "modalClass hide",
                                mainContentWrap: "mainContentWrap",
                                productManagerWrapperClass: "productManagerWrapperClass",
                                subCategoryDataExists: false,
                                vendorInitialGraphic: 'vendorGraphicCenter',
                            })
                            }
                            >
                            <BigCloseButton/>
                        </div>
                    </div>
                    <div className="shareLinkInfoContainer">
                        <div className="linkModal">

                    <div className="linkComponent">
                        <div className="shareLinkSvgComponent">
                            <ShareLink className="shareLinkLogo" />
                        </div>
                        <div className="shareInputSection">
                            <input
                                className="shareLinkInput"
                                readOnly
                                ref="toolTip"
                                value={`https://rollinglogs.com/vendor/${this.state.firstName.toLowerCase()}-${this.state.lastName.toLowerCase()}/${this.modifyRLId(this.state.rLId) }`}
                            />
                        </div>
                        <div className="shareLinkButtonContainer">
                            <div
                                className="toolTip"
                                onClick={() => this.copyToClipBoard()}
                            >
                                <CopyLinkicon />
                                <span className="tooltipone">Copy</span>
                            </div>
                        </div>

                    </div>
                    {this.state.tool_tip_content.length > 0 && <span className="up-arrow">{this.state.tool_tip_content} </span>}
                </div>
                    </div>
                </div>
            )
        }
    }

    // returnShareLinkModal = () => {
    //     return (

    //         <Modal
    //             className="modal"
    //             show={this.state.isShowing}
    //             header={"Share this link in your social media for showing your portfolio of products"}
    //             close={() => this.setState({
    //                 isShowing: false
    //             })}
    //         >
    //             <div className="linkModal">

    //                 <div className="linkComponent">
    //                     <div className="shareLinkSvgComponent">
    //                         <ShareLink className="shareLinkLogo" />
    //                     </div>
    //                     <div className="shareInputSection">
    //                         <input
    //                             className="shareLinkInput"
    //                             readOnly
    //                             ref="toolTip"
    //                             value={`https://rollinglogs.com/vendor-profile/${this.state.firstName}-${this.state.lastName}/${this.state.rLId}`}
    //                         />
    //                     </div>
    //                     <div className="shareLinkButtonContainer">
    //                         <div
    //                             className="toolTip"
    //                             onClick={() => this.copyToClipBoard()}
    //                         >
    //                             <CopyLinkicon />
    //                             <span className="tooltipone">Copy</span>
    //                         </div>
    //                     </div>

    //                 </div>
    //                 {this.state.tool_tip_content.length > 0 && <span className="up-arrow">{this.state.tool_tip_content} </span>}
    //             </div>
    //         </Modal>
    //     )
    // }


    returnModal = () => {
        return (
            <div className={this.state.modalClass}>
                <div className="modalOuterLayer">
                    {this.returnModalContent(this.state.activeModalType)}
                </div>
            </div>
        )
    }

    setTagName = (e) => {
        const val = e.target.value

        this.setState({
            charCount: 20 - val.length
        })

        this.setState({
            tagName: val
        })
    }

    addTagName = () => {

        let temp = this.state.tagName;

        if (temp !== "") {

            let dummyArray = [...this.state.tagsAdded]

            dummyArray = dummyArray.map(item => item.toLowerCase())

            if (!dummyArray.includes(temp.toLowerCase())) {
                this.state.tagsAdded.push(temp)
            }

            this.setState({
                tagsAdded: this.state.tagsAdded.length !== 0 ? this.state.tagsAdded : [this.state.tagName]
            })

            this.refs.tagInput.value = ""
        }

    }

    render() {
        return (
            <div className="vendorProductDashboard">

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
                    <title>Products dashboard for vendors - Rolling Logs</title>
                </Head>
                <div className={this.state.loadingClass}>
                    <LogoAnimation
                        text="We are loading..."
                    />
                </div>

                <div className={this.state.mainClass}>
                    <div className="maskLayer">
                        <Navbar
                            userData={this.returnNavBarData()}
                        />

                        <div className={this.state.productManagerWrapperClass}>
                            <div className="productManagerWrapperInnerLayerClass">

                                <div className="vendorDetailsLeftContainer">
                                    <div className="vendorInformationInnerLayer">

                                        <div className="vendorDashboardInfoConatiner">

                                            <div className="vendorDashboardCompanyLogo">
                                                <div className="logoImageContainer">
                                                    <div className="logoImageContainerInnerLayer">
                                                        {/* <img src={
                                                            this.state.companyProfilePicture ? this.state.companyProfilePicture : ""
                                                        } alt="" /> */}

                                                        {/* {console.log(this.state.companyProfilePicture)} */}
                                                        <Image
                                                            cloudName="rolling-logs" 
                                                            alt = ""
                                                            // src = {this.state.companyProfilePicture ? this.state.companyProfilePicture : ""}
                                                            publicId={PublicId(this.state.companyProfilePicture ? this.state.companyProfilePicture : "")} 
                                                            // transformations
                                                            width="300" 
                                                            crop="fit"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="vendorDashboardCompanyInfoConatiner">
                                                <div className="companyInfoContainer">
                                                    <div className="companyInfoUpperConatiner">
                                                        <div className="companyTitleConatiner">
                                                            <h3>{this.state.responseCompanyName}</h3>
                                                        </div>
                                                        
                                                        <div className="line"></div>
                                                    </div>
                                                    <div className="companyInfoLowerContainer">
                                                        <p>
                                                            {this.state.responseCompanyDescription}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="vendorInfoConatiner">
                                                    <div className="vendorTitleContainer">
                                                        <h3>Proprietor</h3>
                                                        <div className="line"></div>
                                                    </div>
                                                    <div className="vendorInfoDownContainer">
                                                        <div className="vendorPictureContainer">
                                                            <div className="vendorProfilePicture">
                                                                <div className="vendorProfilePictureInnerLayer">
                                                                    <img src={
                                                                        this.state.profilePicture ? this.state.profilePicture : ""
                                                                    } alt="" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="vendorPersonalInfoContainer">
                                                            <h3>{this.state.firstName + " " + this.state.lastName } </h3>
                                                            <div className="industryExperienceContainer">
                                                                <h3>has been in this business for<span> {this.state.responseExperience} years</span></h3>

                                                            </div>
                                                            <div className="locationData">
                                                                <div className="locationTagContainer">
                                                                    <LocationTag/>
                                                                </div>
                                                                <div className="locationContainer">
                                                                    <h3>{this.state.city + ", " + this.state.state}</h3>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="companyCaptionConatiner">
                                                        <p>{this.state.professionalTitle}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="profileEditContainer">
                                            <Link href = "/vendor/profile-details">
                                                <a
                                                    onClick={() => {
                                                        this.setState=({
                                                            loadingClass: 'loadingAnim',
                                                            mainClass: 'mainClass hide'
                                                        })
                                                    }}
                                                >
                                                    <WhiteButton>
                                                        Edit profile details
                                                    </WhiteButton>
                                                </a>
                                            </Link>
                                            {/* <WhiteButton
                                                runFunction={() => {
                                                    window.open("/vendor/profile-details", "_self")
                                                }}
                                            >
                                                Edit profile details
                                            </WhiteButton> */}
                                        </div>
                                    </div>
                                </div>
                                <article className="vendorProductOuterLayer">

                                    <header className="productHeadingSection">

                                        <div
                                            className={"firstHeadingComponent " + this.state.mainHeadingClass1}
                                            onClick={() => {
                                                if (this.state.mainHeadingClass1 !== "productManager active") {
                                                    this.toggleHeaderClass('productManager')
                                                }

                                                this.setState({
                                                    contentType: 'productManager'
                                                })
                                            }}
                                        >
                                            <h3 className="headingClass">
                                                Simple Product Manager
                                            </h3>
                                            <div className="line"></div>
                                        </div>

                                        <div
                                            className={"firstHeadingComponent " + this.state.mainHeadingClass2}
                                            onClick={() => {
                                                if (this.state.mainHeadingClass2 !== "salesManager active") {
                                                    this.toggleHeaderClass('salesManager')
                                                }

                                                this.setState({
                                                    contentType: 'salesManager'
                                                })
                                            }}
                                        >
                                            <h3 className="headingClass">
                                                Simple Sales Manager
                                            </h3>
                                            <div className="line"></div>
                                        </div>

                                    </header>

                                    <section className={this.state.sectionClass}>

                                        {this.returnContent()}


                                    </section>

                                    {/* {this.returnShareLinkModal()} */}

                                </article>

                            </div>
                        </div>

                        {/* <Footer /> */}

                         {/* {this.returnShareLinkModal()} */}

                        {this.returnModal()}
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

export default connect(mapStateToProps, matchDispatchToProps)(VendorMainDashboard)