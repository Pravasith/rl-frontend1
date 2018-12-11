import React from "react"

import "../../../assets/sass/vendor_main_dashboard.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Navbar from "../../navbar/navbar"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";
import { getUserData } from "../../../actions/userActions"
import { encryptData, decryptData } from "../../../factories/encryptDecrypt";
import { Footer } from "../../footer/footer"

import { CloseButton, LogoLoadingAnimation, BigAnimatedCloseButton, TickSmallWhite, NavBarLoadingIcon } from "../../../assets/images"
import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon, PlusButtonIconWhite, AddNewProduct, VendorGraphic, ArrowMarkLong, BigCloseButton, SmallCloseButton } from "../../../assets/images";
import LogoAnimation from "../../animations/logoAnimation";
import { GradientButton, InputForm, SelectList, WhiteButton } from "../../UX/uxComponents";
import HtmlSlider from "../../UX/htmlSlider"
import Axios from "axios";
import { api } from "../../../actions/apiLinks";


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

            categoryName: '',
            tagName: '',
            tagsAdded: [],

            activeModalType: "categoryModal",

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

            categoriesSelected: []
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
                    professionalTitle: decryptedData.professionalTitle,
                    profilePicture: decryptedData.profilePicture,
                })

                this.props.hitApi(api.GET_VENDOR_DATA, "GET")
                .then((data) => {
                    let { responseData } = this.props

                    /// fake request
                    setTimeout(() => {
                        this.setState({
                            // recievedData: "Hello",
                            mainContentWrap: 'mainContentWrap',
                            internalLoaderClass: 'contentLoader hide',
                            sectionClass: 'newCategorySection',
                            contentWrapper: 'contentWrapper',
                        })
                    }, 1000)
                    /// fake request

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
                            companyProfilePicture : decryptedData.companyProfilePicture
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

    // componentDidUpdate() {
    //     console.log(this.state.categoriesSelected)
    // }

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

    deleteCategory = (index) => {
        this.state.categoriesSelected.splice(index, 1)

        let dummyArray = [...this.state.categoriesSelected]
        this.setState({
            categoriesSelected: dummyArray
        })
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
                                        <h3>Add new product</h3>
                                    </div>
                                </div>

                                <div className="subCategoryProductSection">
                                    <div className="subCategoryProductSectionInnerLayer">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                )
            })
        }


            

        if (categoriesSelected.length !== 0) {
            return(
                categoriesSelected.map((item, i) => {
                    // console.log(item)
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
                
                })
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
                                    })
                                }}
                            >
                                <div className="svgImageContainer">
                                    <PlusButtonIconWhite />
                                </div>
                                Add new category
                        </GradientButton>
                        </div>

                        <div className="populatedCategories">
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

                    // console.log(responseData)
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
        const { mainCategorySelection, subCategorySelection, categoriesSelected } = this.state
        let categoryAlreadySelected = false

        categoriesSelected.map((item, i) => {
            if(item.category.categoryId === mainCategorySelection.categoryId){
                categoryAlreadySelected = true

                item.subCategory.push(subCategorySelection)
                
            }
        })
        
        if(!categoryAlreadySelected){
            categoriesSelected.push({
                category: mainCategorySelection,
                subCategory: [subCategorySelection]
            })
        }

        let dummyArray = [...categoriesSelected]

        this.setState({
            categoriesSelected: dummyArray,
        })
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

        else if (categoryModalOrSubcategoryModal === "delete"){
           const  deleteCategory = (index) => {
                this.state.categoriesSelected.splice(index, 1)

                let dummyArray = [...this.state.categoriesSelected]
                this.setState({
                    categoriesSelected: dummyArray,
                    modalClass: "modalClass hide",
                    productManagerWrapperClass: "productManagerWrapperClass",
                    mainContentWrap: "mainContentWrap",
                    vendorInitialGraphic: 'vendorGraphicCenter',
                })
            }
            return(
                <div className="modalInnerLayer">
                    <div className="modalHeaderCloserSection">
                        <div className="modalHeaderContainer">
                            <h3>Are you sure you want to delete this?</h3>
                            <div className="line"></div>
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
                                onClick={() => deleteCategory(i)}>
                                <WhiteButton>
                                    Yes
                                </WhiteButton>
                            </div>
                        </div>
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
                                                            <h3>{this.state.firstName}</h3>
                                                            <div className="industryExperienceContainer">
                                                                <h3>has been in this business for<span> {this.state.responseExperience} years</span></h3>

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
                                            <WhiteButton
                                                runFunction={() => {
                                                    window.open("/vendor/profile-details", "_self")
                                                }}
                                            >
                                                Edit profile details
                                            </WhiteButton>
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