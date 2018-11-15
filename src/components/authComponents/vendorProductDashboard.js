import React from "react"

import "../../assets/sass/vendor_products.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Navbar from "../navbar/navbar"
import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions";
import { getUserData } from "../../actions/userActions"
import { decryptData } from "../../factories/encryptDecrypt";
import { Footer } from "../footer/footer"

import { CloseButton } from "../../assets/images"
import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon, PlusButtonIconWhite, AddNewProduct, VendorGraphic, ArrowMarkLong, BigCloseButton, SmallCloseButton } from "../../assets/images";
import LogoAnimation from "../animations/logoAnimation";
import { GradientButton, InputForm, SelectList, WhiteButton } from "../UX/uxComponents";
import HtmlSlider from "../UX/htmlSlider"


class VendorProductDashboard extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',


          
            // my code
            mainHeadingClass1: 'uploadedProducts active',
            mainHeadingClass2: 'clientData',
            charCount: 20,
            

            contentType: "uploadedProducts",
            

            modalCondition: "whiteBackgroundForModal hide",
            vendorGraphicClass: "initialVendorGraphic",
            vendorGraphicClassWrap: "addedProductWrap",
            modalClass: "whiteSquareForModal",
            modalDeleteClass: "deleteClass",

            messageWrap:"messageWrap hide",

            
            

            category: "",

            tagsAdded: [],
            tagName: "",

            dummyDataStructure: [],

            newProduct: {
                categoryName: '',
                categoryId: '',
            },



            options: [
                { categoryName: 'Lighting', categoryId: 1 },
                { categoryName: 'Roofing', categoryId: 2 },
                { categoryName: 'Furniture', categoryId: 3 },
                { categoryName: 'Bathroom', categoryId: 4 },
                { categoryName: 'Gardens', categoryId: 5 },
                { categoryName: 'Switches', categoryId: 6 },
                { categoryName: 'Decorative Fans', categoryId: 7 },
                { categoryName: 'Home Decor', categoryId: 8 },
                { categoryName: 'Wooden Flooring', categoryId: 9 },
                { categoryName: 'Wardrobes', categoryId: 10 },
                { categoryName: 'Staircases', categoryId: 11 },
                { categoryName: 'Flooring', categoryId: 12 },
                { categoryName: 'Glasses', categoryId: 13 },
                { categoryName: 'Doors and Windows', categoryId: 14 },
                { categoryName: 'Lift and Elevators', categoryId: 15 },
                { categoryName: 'Wall Finishers', categoryId: 16 },
                { categoryName: 'Architectural Meshes', categoryId: 17 },
                { categoryName: 'Kitchen', categoryId: 18 },
                { categoryName: 'Ceiling', categoryId: 19 },
                { categoryName: 'IOT Solutions', categoryId: 20 },
                { categoryName: 'Kids', categoryId: 21 },
                { categoryName: 'Carpets and Rugs', categoryId: 22 },
                { categoryName: 'Sculpture & Stone art', categoryId: 23 },
                { categoryName: 'Curtains and Blinds', categoryId: 24 },
                { categoryName: 'Industrial', categoryId: 25 },
                { categoryName: 'Security Systems', categoryId: 26 },
                { categoryName: 'Services', categoryId: 27 }
            ],

            tempArr: [],

            redirect: false,

            isProceedClicked: false,
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
                })
            })
        // console.log('DM',this.state.modalDeleteClass)
    }

    componentDidUpdate() {
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


    returnContent = () => {
        let { contentType } = this.state;
        let { dummyDataStructure } = this.state;

        if (contentType === 'uploadedProducts') {

            return (

                <div className="add">

                    <div className="addProductButton">
                        <GradientButton

                            runFunction={() => this.setState({
                                vendorGraphicClass: "initialVendorGraphic hide",
                                modalCondition: "whiteBackgroundForModal",
                                modalClass: "whiteSquareForModal",
                                modalDeleteClass: "deleteClass hide",
                               
                            })}
                        >
                            <div className="svgImageContainer">
                                <PlusButtonIconWhite />
                            </div>
                            Add new category
                        </GradientButton>
                    </div>

                    <div className="addedProductSectionCategoryOuterLayer">

                        <div className="addedProductSectionCategoryInnerLayer">

                            {dummyDataStructure.categoryName === "" ?
                                (<div className={this.state.vendorGraphicClass}>
                                        <div className="arrowSvgSection">
                                            <ArrowMarkLong />
                                        </div>

                                        <div className="vendorSvgSection">
                                            <VendorGraphic />
                                        </div>
                                    </div>)
                                : 
                                (<div className={this.state.vendorGraphicClassWrap}>
                                        <div className="vendorProductAddingWrap">
                                            <div className="addProductClass">
                                                {dummyDataStructure.map((product, i) =>
                                                    <div 
                                                        key={i} className="categoryCarousel">
                                                        <div className="productCategoryName">
                                                            <h3>
                                                                {product.categoryName}
                                                            </h3>
                                                            <div 
                                                                // onClick = {()=> this.removeCategory(i)}
                                                                onClick ={()=> this.setState({
                                                                    vendorGraphicClassWrap: "addedProductWrap hide",
                                                                    modalCondition: "whiteBackgroundForModal",
                                                                    modalClass: "whiteSquareForModal hide",
                                                                    modalDeleteClass: "deleteClass",
                                                                })}
                                                                className="deleteOption">
                                                                <CloseButton />
                                                            </div>
                                                        </div>
                                                        <div className="line"></div>
                                                        <div className="gradientButtonOuterLayer">
                                                            <GradientButton
                                                                runFunction={() => {
                                                                    window.open("/vendor-dashboard-detail", "_self")
                                                                }}>
                                                                <div className="svgImageContainer">
                                                                    <AddNewProduct/>
                                                                </div>
                                                                Add product in this category
                                                            </GradientButton>
                                                            <div className="addedProductSectionContainer">
                                                                <div className="addedProductSectionInnerLayer">
                                                                
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>)}
                                            </div>
                                        </div>
                                </div>)}

                        </div>

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


    onSelect = (e) => {
    
        let val = e.target.value;
        
        this.setState({
            newProduct: {
                categoryName: val
            }
        })
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

            dummyArray.map(item => item.toLowerCase())

            if (!dummyArray.includes(temp.toLowerCase())) {
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

    removeCategory = (i) => {

        this.state.dummyDataStructure.splice(i, 1)

        this.setState({
            dummyDataStructure: this.state.dummyDataStructure.length !== 0 ? this.state.dummyDataStructure : [],
            vendorGraphicClassWrap: "addedProductWrap",
            modalCondition: "whiteBackgroundForModal hide"
        })
    }

    displayProceedError = () => {
        const { categoryName } = this.state.newProduct;
        const { isProceedClicked } = this.state;

        if (isProceedClicked && categoryName === "") return <p> Please choose category to proceed.</p>;
    }

    proceedHandler = () => {
        const { categoryName } = this.state.newProduct;
        console.log(categoryName.length);
        if (categoryName.length !== 0 && categoryName.length !== "") {
            // console.log(this.state.category + "inside")

            let categoryDetails = {
                categoryName: this.state.newProduct.categoryName,
                categoryId: this.state.newProduct.categoryId,
                productsArray: []
            }

            this.state.tempArr.push(categoryDetails);

            this.setState({
                vendorGraphicClass: "initialVendorGraphic",
                modalCondition: "whiteBackgroundForModal hide",
                dummyDataStructure: [...this.state.tempArr],
                newProduct: {
                    categoryName: '',
                    categoryId: '',
                }
            })

        }

        else{
            this.setState({
                isProceedClicked: true
            })
        }

        // let categoryDetails = {
        //     categoryName: this.state.newProduct.categoryName,
        //     categoryId: this.state.newProduct.categoryId,
        //     productsArray: []
        // }

        // this.state.tempArr.push(categoryDetails)

        // this.setState({
        //     dummyDataStructure: [...this.state.tempArr],
        //     newProduct: {
        //         categoryName: '',
        //         categoryId: '',
        //     }
        //     })
    }

    render() {
        const { categoryName } = this.state.newProduct;
        const { options } = this.state;


        const tagsModal = (
            <div className={this.state.modalCondition}>
                <div className="dummyXClass">

                    <div className={this.state.modalClass}>

                            <div className="vendorDashboardModal">
                                <div className="modalHeader">
                                    <h3>Details about the category</h3>
                                    <div className="line"></div>
                                </div>
                                <div
                                    className="deleteButton"
                                    onClick={() => this.setState({
                                        modalCondition: "whiteBackgroundForModal hide",
                                        vendorGraphicClass: "initialVendorGraphic",
                                    })}
                                >
                                    <div className="deleteButtonSvgSection">
                                        <BigCloseButton/>
                                    </div>
                                </div>
                            </div>

                            <div className="vendorCategorySelection">        
                                <SelectList
                                    name={'category'}
                                    options={options}
                                    value={categoryName}
                                    placeholder={'Choose Category'}
                                    handleChange={this.onSelect}
                                />
                            </div>

                            <div className="vendorTagCategory">
                                <div className="vendorHeadingSection">
                                    <h3>Add tags <span className="vendorHeaderSpanClass">(optional)</span></h3>
                                </div>
                                <div className="inputCategorySection">
                                    <div className="vendorInput">
                                        <input
                                            placeholder="For Ex. Sofa"
                                            ref="tagInput"
                                            type="text"
                                            maxLength = "20"
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
                                    <div className="charCount">
                                        <p ref="charCount">
                                            {this.state.charCount}
                                        </p>
                                    </div>
                                    
                                </div>

                                <div className="vendorSelectedCategory">
                                    <div className="vendorSelectedCategoryInnerLayer">
                                        {this.returnTagsAdded()}
                                    </div>
                                </div>
                            </div>

                            <div className="proceedOrNotCheck">
                                <GradientButton
                                    runFunction={() =>  this.proceedHandler()}>
                                    Proceed
                                </GradientButton>

                                {this.displayProceedError()}
                            </div>
                    </div>

                    
                    <div className = {this.state.modalDeleteClass}>
                        <div className="deletClassInnerLayer">
                        
                            <header className="deleteHeaderSection">
                                <h3>Are you sure you want to delete this?</h3>
                            </header>
                            <div className="buttonCategorySection">
                                <div className="proceedButtonCategory">
                                    <WhiteButton
                                        runFunction = {(i) =>this.removeCategory(i)}
                                    >
                                        Yes
                                    </WhiteButton>
                                </div>
                                <div className="proceedButtonCategory">
                                    <WhiteButton
                                        runFunction={() => this.setState({
                                            vendorGraphicClassWrap: "addedProductWrap",
                                            modalCondition: "whiteBackgroundForModal hide",
                                        })}
                                    >
                                        No
                                    </WhiteButton>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        );

        return (
            <div className="vendorProductDashboard">

                <div className={this.state.loadingClass}>
                    <LogoAnimation />
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

                                <section className="newCategorySection">

                                    {
                                        this.returnContent()
                                    }

                                </section>

                            </article>

                        </div>

                        <Footer />

                        {tagsModal}

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

export default connect(mapStateToProps, matchDispatchToProps)(VendorProductDashboard)