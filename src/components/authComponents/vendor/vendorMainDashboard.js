import React from "react"

import "../../../assets/sass/vendor_main_dashboard.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Navbar from "../../navbar/navbar"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";
import { getUserData } from "../../../actions/userActions"
import { decryptData } from "../../../factories/encryptDecrypt";
import { Footer } from "../../footer/footer"

import { CloseButton, LogoLoadingAnimation, BigAnimatedCloseButton, TickSmallWhite } from "../../../assets/images"
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
            contentWrapper:'contentWrapper hide',
            sectionClass: 'newCategorySection hide',
            vendorInitialGraphic: 'vendorGraphicCenter',

            productManagerWrapperClass : "productManagerWrapperClass",

            // my code
            mainHeadingClass1: 'uploadedProducts active',
            mainHeadingClass2: 'clientData',
            firstName: null,

            contentType: "uploadedProducts",

            categoryErrorClass : "errorMessageWrap hide",
            categoryErrorMessage : "",

            categoryName: '',
            tagName: '',
            tagsAdded: [],

            activeModalType : "categoryModal",

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
                    professionalTitle : decryptedData.professionalTitle,
                    profilePicture : decryptedData.profilePicture,
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

                        // console.log(decryptedData)

                        this.setState({
                            responseCompanyName : decryptedData.companyName,
                            responseCompanyDescription : decryptedData.companyDescriptionLine1 + " " + decryptedData.companyDescriptionLine2,
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
        if (type === 'uploadedProducts') {
            if (this.state.mainHeadingClass1 === type) {
                this.setState({
                    mainHeadingClass1: type + ' active',
                    mainHeadingClass2: 'clientData',
                })
            }
            else if (this.state.mainHeadingClass1 === type + ' active') {
                this.setState({
                    mainHeadingClass1: type
                })
            }
        }
        else if (type === 'clientData') {
            if (this.state.mainHeadingClass2 === type) {
                this.setState({
                    mainHeadingClass2: type + ' active',
                    mainHeadingClass1: 'uploadedProducts',
                })
            }
            else if (this.state.mainHeadingClass2 === type + ' active') {
                this.setState({
                    mainHeadingClass2: type
                })
            }
        }
    }


    returnCategorisedProducts = () => {
        const { mainCategorySelection, subCategorySelection } = this.state;

        if (mainCategorySelection) {
            if (subCategorySelection) {
                return (
                    <div className="categorisedProductsDisplay">
                        <div className="categorisedProductDisplayInnerLayer">
                            <div className="mainCategoryHead">
                                <div className="categoryMainHeaderContainer">
                                    <h3>{"categoryName"}</h3>
                                    <div className="line"></div>
                                </div>
                                <div className="deleteCategoryContainer">
                                    <CloseButton />
                                </div>
                            </div>
                            <div className="subCategoryHead">
                                <div className="subCategoryHeadInnerSection">
                                    <div className="subCategoryHeaderSection">
                                        <h3>{"subCategoryName"}</h3>
                                        <div className="line"></div>
                                    </div>
                                    <div className="addProductCategorySection">
                                        <div className="addNewProductButton">
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
                            </div>
                        </div>
                    </div>
                )
            }
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

        if (contentType === 'uploadedProducts'){

            {
                this.returnDataFromBackendAndShow()
            }

            return(
                    <div className="add">
                        <div className={this.state.contentWrapper}>
                            <div className="addProductButton">
                                <GradientButton
                                    runFunction={() => {
                                        this.setState({
                                            modalClass: 'modalClass ',
                                            productManagerWrapperClass : "productManagerWrapperClass blurClass",
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

                            {/* <div className={this.state.vendorInitialGraphic}>
                                <div className="svgImageContainer">
                                    <div className="graphicSvgImageContainer">
                                        <VendorGraphic/>
                                        <div className="vendorGraphicInnerContainer">
                                            <div className="vendorGraphicParaInnerLayer">
                                                <h3>Hey <span>{this.state.firstName}</span>, show your amazing products to your clients, start
                                                by clicking "Add new category" button on the top.</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>                               
                            </div>  */}
                            
                            <div className="populatedCategories">
                                {this.returnCategorisedProducts()}
                            </div>
                            
                        </div>

                        <div
                            className= {this.state.internalLoaderClass}
                            >
                            <LogoLoadingAnimation />
                        </div> 
                    </div>
            )
        }
        else if (contentType === 'clientData') {
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
                    className= "tagsContainer" 
                    key= {i}
                    >
                    <div className="tagWrapInnerLayer">
                        <p>
                            {item}
                        </p>

                        <div 
                            className="closeTagContainer"
                            onClick = {() => this.closeTag(i)}
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
        const {categoryArray, mainCategorySelection} =  this.state
        let catIndex

        if(mainCategorySelection){
            categoryArray.map((item, i) => {
                if(item.categoryId === mainCategorySelection.categoryId){
                    catIndex = i
                }
            })
        }        

        const selectThisCheckBoxAndDeselectOtherCheckBox = (i) => {
            const tl = new TimelineLite()

            categoryArray.map((item, j) => {
                if( i !== j ){
                    tl.set(
                        ".CAT" + j,
                        {
                            background : "#FFFFFF"
                        }
                    )
                }
            })

            tl.set(".CAT" + i,
            {
                background : "#ff2c6b"
            })

            this.setState({
                mainCategorySelection : categoryArray[i]
            })
        }

        return categoryArray.map((item, i) => {
            return (
                <div 
                    className="categorySelectionContainer"
                    key = {i}
                    onClick = {() => {
                        selectThisCheckBoxAndDeselectOtherCheckBox(i)
                    }}
                    >
                    <div className="categorySelectionInnerLayer">
                        <div 
                            className="inputCategoryValue"
                            >

                            <div className="categoryImageAndText">
                                <div className="svgCategoryImageContainer">
                                    <img src={item.categoryImage} alt=""/>
                                </div>

                                <div className="categoryHeadingSection">
                                    <p>{item.categoryName}</p>
                                </div>

                                <div className="categoryCheckBox">
                                    <div className="checkBoxDummyWrap">
                                        <div 
                                            className={"checkBoxSelect " + "CAT" + i}
                                            style = {{background : catIndex === i ? "#ff2c6b" : "#ffffff"}}
                                            >
                                            <div className="iconWrap">
                                                <TickSmallWhite/>
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
        const {subCategoryArray} = this.state



        const selectThisCheckBoxAndDeselectOtherCheckBox = (i) => {
            const tl = new TimelineLite()

            subCategoryArray.map((item, j) => {
                if( i !== j ){
                    tl.set(
                        ".SUB-CAT" + j,
                        {
                            background : "#FFFFFF"
                        }
                    )
                }
            })

            tl.set(".SUB-CAT" + i,
            {
                background : "#ff2c6b"
            })

            this.setState({
                subCategorySelection : subCategoryArray[i]
            })
        }



  
        return subCategoryArray.map((item, i) => {
            return (
                <div 
                    className="categorySelectionContainer"
                    key = {i}
                    onClick = {() => {
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
                                                <TickSmallWhite/>
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

        if(mainCategorySelection === undefined || mainCategorySelection === null ){
            this.setState({
                categoryErrorClass : "errorMessageWrap",
                categoryErrorMessage : "You have to select one category",
            })
        }

        else if(mainCategorySelection !== undefined && mainCategorySelection !== null ){
            this.setState({
                categoryErrorClass : "errorMessageWrap hide",
                activeModalType : "subcategoryModal"
            })
        }
    }

    returnModalContent = (categoryModalOrSubcategoryModal) => {

        if(categoryModalOrSubcategoryModal === "categoryModal"){
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
                                productManagerWrapperClass : "productManagerWrapperClass",
                                mainContentWrap: "mainContentWrap",
                                vendorInitialGraphic: 'vendorGraphicCenter',
                            })
                        }
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
                            runFunction = {() => this.handleCategorySelections()}
                            >
                            Proceed
                        </GradientButton>
                    </div>
                </div>
            )
        }

        else if(categoryModalOrSubcategoryModal === "subcategoryModal"){

            // this.props.hitApi(api.REGISTER_GOOGLE_USER, "GET", {

            // })
            
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
                                vendorInitialGraphic: 'vendorGraphicCenter',
                            })
                        }
                        >
                            <BigCloseButton />
                        </div>
                    </div>
                    <div className="subHeadingSection">
                        <h3>2/4</h3>
                        <p>Choose sub-category</p>
                    </div>
                    <div className="categorySelectionContainer">
                        <div className="categorySelectionInnerLayer">
                            <div className="inputCategoryValue">
                                <div className="categoryCheckSecondBox">
                                    <div className="categoryCheckBoxInnerLayer">
                                        <label className="container">
                                            <input type="checkbox"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div> 
                                <div className="categoryHeadingSection">
                                    <p>Interior Lighting</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="proceedButton">
                        <WhiteButton>
                            Go back
                        </WhiteButton>
                        <GradientButton>
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
                                                        } alt=""/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="vendorDashboardCompanyInfoConatiner">
                                                <div className="companyInfoContainer">
                                                    <div className="companyInfoUpperConatiner">
                                                        <div className="companyTitleConatiner">
                                                            <h3>{this.state.responseCompanyName}</h3>
                                                        </div>
                                                        <div className="companyCaptionConatiner">
                                                            <p>{this.state.professionalTitle}</p>
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
                                                                    } alt=""/>
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
                                                </div>
                                            </div>
                                        </div>
                                            <div className="profileEditContainer">
                                                <WhiteButton
                                                    runFunction = {() => {
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
                                            this.toggleHeaderClass('uploadedProducts')
                                            this.setState({
                                                contentType: 'uploadedProducts'
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
                                            this.toggleHeaderClass('clientData')
                                            this.setState({
                                                contentType: 'clientData'
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