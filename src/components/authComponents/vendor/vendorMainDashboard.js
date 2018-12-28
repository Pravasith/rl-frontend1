import React from "react"
import Link from 'next/link'

import "../../../assets/sass/vendor_main_dashboard.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Navbar from "../../navbar/navbar"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions"
import { getUserData } from "../../../actions/userActions"
import { encryptData, decryptData } from "../../../factories/encryptDecrypt"
import { Footer } from "../../footer/footer"

import { CloseButton, LogoLoadingAnimation, BigAnimatedCloseButton, TickSmallWhite, NavBarLoadingIcon, LocationTag } from "../../../assets/images"
import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon, PlusButtonIconWhite, AddNewProduct, VendorGraphic, ArrowMarkLong, BigCloseButton, SmallCloseButton } from "../../../assets/images"
import LogoAnimation from "../../animations/logoAnimation"
import { GradientButton, InputForm, SelectList, WhiteButton } from "../../UX/uxComponents"
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
            productImagesObject: {
                categoryName: "",
                imagesInCategory: []
            },
            youTubeURL: [],
            featuresAdded: [],
            categoryStylesAdded: [],

            activeModalType: "categoryModal",
            confirmationButtonContainer: "confirmationButtonContainer hide",

            categoryArray: [
                {
                    categoryName: 'Barrier free products',
                    categoryId: "CAT0000",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/barrier-free-products.jpg"
                },

                {
                    categoryName: 'Bathroom products',
                    categoryId: "CAT0001",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/bathroom-products.jpg"
                },

                {
                    categoryName: 'Ceiling related',
                    categoryId: "CAT0002",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/ceiling.jpg",
                },
                {
                    categoryName: 'Construction site equipment',
                    categoryId: "CAT0003",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/construction-site-equipment.jpg",
                },
                {
                    categoryName: 'Décor',
                    categoryId: "CAT0004",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/decor.jpeg",
                },
                {
                    categoryName: 'Doors',
                    categoryId: "CAT0005",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/doors.JPG",
                },

                {
                    categoryName: 'Electricals',
                    categoryId: "CAT0006",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/electricals.jpg",
                },
                {
                    categoryName: 'External facades and fenestration',
                    categoryId: "CAT0007",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/external-facades-and-fenestration.jpg",
                },
                {
                    categoryName: 'Fences and perimeter enclosures',
                    categoryId: "CAT0008",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/fences-and-perimeter-enclosures.jpg",
                },
                {
                    categoryName: 'Finishing',
                    categoryId: "CAT0009",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/finishing.jpg",
                },
                {
                    categoryName: 'Fire prevention and safety',
                    categoryId: "CAT0010",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/fire-prevention-and-safety.png",

                },
                {
                    categoryName: 'Flooring',
                    categoryId: "CAT0011",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/flooring.PNG",
                },
                {
                    categoryName: 'Furniture',
                    categoryId: "CAT0012",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/furniture.jpg",
                },
                {
                    categoryName: 'Hardware and fastners',
                    categoryId: "CAT0013",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/hardware-and-fastners.jpg",
                },
                {
                    categoryName: 'Heating ventillation and air conditioning',
                    categoryId: "CAT0014",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/heating-ventillation-and-air-conditioning.jpg",
                },
                {
                    categoryName: 'Home automations',
                    categoryId: "CAT0015",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/home-automation.jpg",
                },
                {
                    categoryName: 'Insulation',
                    categoryId: "CAT0016",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/insulation.jpg",
                },
                {
                    categoryName: 'Kitchen',
                    categoryId: "CAT0017",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/kitchen.jpg",
                },
                {
                    categoryName: 'Lifts and escalators',
                    categoryId: "CAT0018",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/lifts-and-escalators.jpg",
                },
                {
                    categoryName: 'Lighting',
                    categoryId: "CAT0019",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/lighting.jpg",
                },
                {
                    categoryName: 'Office',
                    categoryId: "CAT0020",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/office.jpg",
                },
                {
                    categoryName: 'Outdoor',
                    categoryId: "CAT0021",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/outdoor.jpg",
                },
                {
                    categoryName: 'Partitions',
                    categoryId: "CAT0022",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/partitions.jpg",
                },
                {
                    categoryName: 'Plumbing',
                    categoryId: "CAT0023",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/plumbing.jpg",
                },
                {
                    categoryName: 'Renewable energy system',
                    categoryId: "CAT0024",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/renewable-energy-system.jpg",
                },
                {
                    categoryName: 'Roofs',
                    categoryId: "CAT0025",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/roofs.jpg",
                },
                {
                    categoryName: 'Safety and security',
                    categoryId: "CAT0026",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/safety-and-security.jpg",
                },
                {
                    categoryName: 'Stairs',
                    categoryId: "CAT0027",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/stairs.jpg",
                },
                {
                    categoryName: 'Waterproofing',
                    categoryId: "CAT0028",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/waterproofing.jpg",
                },
                {
                    categoryName: 'Water system',
                    categoryId: "CAT0029",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/water-system.jpg",
                },
                {
                    categoryName: 'Wellness',
                    categoryId: "CAT0030",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/wellness.jpg",
                },
                {
                    categoryName: 'Windows',
                    categoryId: "CAT0031",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/windows.jpg",
                },
                {
                    categoryName: 'Wood',
                    categoryId: "CAT0032",
                    categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/wood.jpg",
                },
            ],

            subCategoryArray: [],

            categoriesSelected: [],

            subCategoryProducts: {
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
            },

            productInstallers: [
                {
                    installerName: "rakshith",
                    installerContactNo: 9972223737,
                    installerCharges: 1500,
                    installerCostType: 1
                }
            ],

            productInstallationAvailability: 5
        }

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

                    firstName: decryptedData.firstName,
                    lastName: decryptedData.lastName,
                    professionalTitle: decryptedData.professionalTitle,
                    profilePicture: decryptedData.profilePicture,
                })

                this.props.hitApi(api.GET_VENDOR_DATA, "GET")
                .then((data) => {
                    let { responseData } = this.props

                    if (responseData.responsePayload.message !== "User credentials not found") {

                        //
                        // DECRYPT REQUEST DATA
                        //
                        let decryptedData = decryptData(
                            responseData.responsePayload.responseData
                        )
                        //
                        // DECRYPT REQUEST DATA
                        //

                        this.convertVendorDataAndSave(decryptedData.products)

                        this.setState({
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

                            //
                        })
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

    convertVendorDataAndSave = (productsRaw) => {

        let finalData = [], categoryExists = false

        // console.log("LENGTH = " + productsRaw.length )

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
                                // console.log(subCat.subCategoryId, subCategoryId)
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

        // console.log(finalData)
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

        // 
        // Encrypt data
        // 
        const encryptedData = encryptData(rawData)
        // 
        // Encrypt data
        // 

        await this
            .props
            .hitApi(api.UPDATE_USER_DATA, "PUT",
                {
                    message: "Update user's data",
                    requestData: encryptedData
                }
            )

            .then(() => {

                this
                    .props
                    .navBarLoadingAnimationShowHide(false)

            })

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
            // console.log(index)
        }
    }

    fetchProductData = (productId) => {

        // create request

        const rawData = { productId }

        //
        // Encrypt data
        //
        const encryptedData = encryptData(rawData)
        //
        // Encrypt data
        //



        // GET PRODUCT DATA
        this.props.hitApi(api.GET_PRODUCT_DATA, "POST",
            {
                requestData: encryptedData,
                message: "Requesting dispatch products"
            }
        )
            .then(() => {

                //
                // DECRYPT RESPONSE DATA
                //
                let decryptedData = decryptData(
                    this.props.responseData.responsePayload.responseData
                )
                //
                // DECRYPT RESPONSE DATA
                //


                this.setState({



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
                    productDescription: decryptedData.productDescription,
                    categoryStylesAdded: decryptedData.designStyles,
                    tagsAdded: decryptedData.tags,
                    productAvailability: decryptedData.availability,
                    productAvailabilityBool: decryptedData.availability,
                    productDiscount: decryptedData.discount,
                    productImagesObject: {
                        categoryName: "",
                        imagesInCategory: decryptedData.productImages
                    },
                    productThumbImage: decryptedData.productThumbImage,
                    youTubeURL: decryptedData.youTubeAdVideos,
                    brandName: decryptedData.brandName,
                    brandImage: decryptedData.brandImage, 

                    subCategoryDataExists: true,

                    // productId

                })
            })

            .catch((err) => {
                if (err.response) {

                    // console.log(err.response)
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

    returnSubCategoryProducts = (productImages, title) => {
        if(productImages){
            if (productImages.length !== 0) {
                // console.log(this.state.subCategoryProducts)

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

    returnCategorisedProducts = () => {
        const { categoriesSelected } = this.state

        const returnSubCategories = (subcategories) => {
            return subcategories.subCategory.map((subcategory, i) => {
                return (
                    <div 
                        className="subCategoryHead"
                        key = { "subCat" + i }
                        >
                        <div className="subCategoryHeadInnerSection">
                            <div className="subCategoryHeaderSection">
                                <h3>{subcategory.subCategoryName}</h3>
                                <div className="line"></div>
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
                                            this.returnSubCategoryProducts(subcategory.productImages, subcategory.subCategoryName)
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
                        <div key = {i} className="categorisedProductsDisplay">
                            <div className="categorisedProductDisplayInnerLayer">
                                <div className="mainCategoryHead">
                                    <div className="categoryMainHeaderContainer">
                                        <h3>{item.category.categoryName}</h3>
                                        <div className="line"></div>
                                    </div>
                                    <div 
                                        className="deleteCategoryContainer"
                                        // onClick={() => this.deleteCategory(i)}
                                        onClick={() => {
                                            this.setState({
                                                mainCategoryIndex: i,
                                                modalClass: 'modalClass',
                                                productManagerWrapperClass: "productManagerWrapperClass blurClass",
                                                activeModalType: "delete"
                                            })
                                        }}
                                    >
                                        <CloseButton />
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
                        </div>

                        <div 
                            className="populatedCategories"
                            // onScroll = {() => {
                            //     console.log("Scrolled")
                            // }}
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

    returnChargeType = (installerCostType) => {

        if (installerCostType === 1) return "square feet";
        else if (installerCostType === 2) return "piece";
        else if (installerCostType === 3) return "hour";
    };


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

            // 
            // Encrypt data
            // 
            const encryptedData = encryptData(theData)
            // 
            // Encrypt data
            // 


            // send request
            this.props.hitApi(api.GET_SUB_CATEGORIES, "POST",
                {
                    requestData: encryptedData,
                    message: "Requesting dispatch sub-categories"
                }
            )
                .then(() => {
                    // 
                    // Decrypt data
                    // 
                    const responseData = decryptData(this.props.responseData.responsePayload.responseData)
                    // 
                    // Decrypt data
                    // 

                    this.setState({
                        subCategoryArray: responseData.subCategoriesArray
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
            productInstallers,
            productInstallationAvailability
        } = this.state;

        const productInstallersDetail = productInstallers.map((item, i) => {
            return (
                <div className="productInstallerDescriptionOuterLayer" key={i}>
                  <div className="productInstallerDescriptionInnerLayer">
                    <div className="productInstallerDetails">
                      <div className="productInstallerNameWrap">
                        {/* <h3>Installer nomenclature</h3> */}
                        <h3 key={i}>{item.installerName}</h3>
                      </div>
    
                      <div className="productInstallerContactNoWrap">
                        <p key={i}>+91 {item.installerContactNo}</p>
                      </div>
    
                      <div className="productInstallerChargesWrap">
                        <small>Charges </small>
                        <p key={i}>
                          Rs. {item.installerCharges} / {this.returnChargeType(item.installerCostType)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
        }) 

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
                                        {
                                            Number(item.materialCost) > 0 
                                            ?
                                            <p>Costs <span>Rs. { item.materialCost }</span> extra</p>
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
                                            <p>Costs <span>Rs. { item.finishCost }</span> extra</p>
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

        else if (fieldName === "colors") {
            return (
                colorArray.map((item, i) => {

                    return (
                        <div 
                            key={i} 
                            className="modalContainerUpperContainer">
                            <div className="modalContainer">
                                <div className="subImageOrDivIfAny">
                                    <div style = {{background : item.colorCode}} ></div>
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
                                            <p>Costs <span>Rs. { item.colorCost }</span> extra</p>
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

        else if (fieldName === "dimensions") {
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
                                            <p>Costs <span>Rs. { item.sizeCost }</span> extra</p>
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
        }

        else if (fieldName === "installationService") {
            if (productInstallationAvailability === 1) {
                return <p>Yes, we install this product for free of cost (No extra installation charges).</p>
            } 

            else if (productInstallationAvailability === 2) {
                return <p>Yes, we install this product for an extra cost.</p>
            }

            else if (productInstallationAvailability === 3) {
                return <p>This is a ready to use product. No installation services applicable.</p>
            }

            else if (productInstallationAvailability === 4) {
                return <p>No, we don’t provide installation services.</p>
            }

            else if (productInstallationAvailability === 5) {
                return (
                    <div>
                        <p>Installation cost cannot be zero, If you wish
                        not to offer installation service, please
                        select the option accordingly.</p>
                        {productInstallers.length !== 0 ? productInstallersDetail : null}
                    </div>
                )
            }
        }
    }

    returnSubCategoryDetails = () => {

        const { 
            productName,
            productCode,
            productPrice,
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

                                {/* <div className="productThumbImage">
                                    <img
                                        src={productThumbImage}
                                        alt=""
                                    />
                                </div> */}
                        <div className="productsInformationInnerLayer">
                            
                            <div className="productSubHeading">
                                <h3>Name </h3> 
                                <p>{productName}</p>
                            </div>

                            <div className="productSubHeading">
                                <h3>Code </h3>
                                <p>{productCode}</p>
                            </div>

                            <div className="productSubHeading">
                                <h3>Price </h3> 
                                <p>Rs. {productPrice} per piece</p> 
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

                                    {brandImage ?
                                        < img src={brandImage} alt="" />
                                        : <p>"N/A"</p> }
                                </div>
                                
                            </div>

                            <div className="productSubHeading">
                                <h3>Installation Service Option</h3>
                                {this.returnArrayFields("installationService")}
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
                                runFunction={() => {
                                    this.deleteCategory("sub", this.state.productId)
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

        else if (categoryModalOrSubcategoryModal === "delete") {
            return (
                <div className="modalCategoryDeleteContainer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeaderContainer">
                            <h3>Are you sure you want to delete this ?</h3>
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
                                No
                                </WhiteButton>
                        </div>
                        <div className="yesContainer"
                            onClick={() => this.deleteCategory("main", this.state.mainCategoryIndex)}>
                            <WhiteButton>
                                Yes
                             </WhiteButton>
                        </div>
                    </div>
                </div>
            )
        }

        else if (categoryModalOrSubcategoryModal === "subCategoryExistWarning") {
            return (
                <div className="modalCategoryDeleteContainer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeaderContainer">
                            <h3>Sub-category you chose already exists in your dashboard</h3>
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
                            <h3>Details of the product</h3>
                            <div className="line"></div>
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
    }

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
                                                        <img src={
                                                            this.state.companyProfilePicture ? this.state.companyProfilePicture : ""
                                                        } alt="" />
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

                                        {
                                            this.returnContent()
                                        }

                                    </section>

                                </article>

                            </div>
                        </div>

                        {/* <Footer /> */}

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