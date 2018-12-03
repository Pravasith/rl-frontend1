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
        // console.log('DM',this.state.modalDeleteClass)
    }

    onSelect = (e) => {
        // console.log(e.target.value)
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

    returnDataFromBackendAndShow = () => {
        setTimeout(() => {
            this.setState({
                recievedData: "Hello",
                mainContentWrap: 'mainContentWrap',
                internalLoaderClass: 'contentLoader hide',
                sectionClass: 'newCategorySection',
                contentWrapper:'contentWrapper',
            })
        }, 1000)
    }

    returnContent = () => {
        let { contentType } = this.state;

        // {this.returnDataFromBackendAndShow()}

        if (contentType === 'uploadedProducts'){

            {
                this.returnDataFromBackendAndShow()
            }

            return(
                    <div className="add">
                        <div className={this.state.contentWrapper}>
                        {/* <div className={this.state.mainContentWrap}> */}
                            <div className="addProductButton">
                                <GradientButton
                                    runFunction={() => {
                                        this.setState({
                                            modalClass: 'modalClass',
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
                            <div className={this.state.vendorInitialGraphic}>
                                <div className="svgImageContainer">
                                    {/* <div className="arrowSvgImageContainer">
                                        <ArrowMarkLong/>
                                    </div> */}
                                    <div className="graphicSvgImageContainer">
                                        <VendorGraphic/>
                                        <div className="vendorGraphicInnerContainer">
                                            <div className="vendorGraphicParaInnerLayer">
                                                <h3>Hey <span>{this.state.firstName}</span>, show your amazing products to your clients, start
                                                by clicking Add new category button on the top.</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        const categoryArray = [
            {   
                categoryName: 'Lighting', 
                categoryId: 1, 
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/lighting.jpg"
            },

            {
                categoryName: 'Furniture',
                categoryId: 2,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/furniture.jpg"
            },

            {
                categoryName: 'Outdoor',
                categoryId: 3,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/outdoor.png",
            },
            {
                categoryName: 'Bathroom',
                categoryId: 4,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/bathroom.jpg",
            },
            {
                categoryName: 'Kitchen',
                categoryId: 5,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/kitchen.jpg",
            },
            {
                categoryName: 'Office',
                categoryId: 6,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/office.jpg",
            },

            {
                categoryName: 'Wellness',
                categoryId: 7,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/wellness.jpg",
            },
            {
                categoryName: 'Decor',
                categoryId: 8,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/decor.jpg",
            },
            {
                categoryName: 'Finishes',
                categoryId: 9,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/finishes.jpg",
            },
            {
                categoryName: 'Construction',
                categoryId: 10,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/construction.jpg",
            },
            {
                categoryName: 'Safety and security', 
                categoryId: 11,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/safety-and-security.jpg",
               
            },
            {
                categoryName: 'Home automation', 
                categoryId: 12,
                categoryImage: "https://s3.ap-south-1.amazonaws.com/rolling-logs/app-data/vendor-categories/home-automation.jpg",
            },
           
        ]
        

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
                // categoryErrorMessage : "You have to select one category",
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

                        <div className="productManagerWrapperClass">
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
                        
                        <Footer />

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