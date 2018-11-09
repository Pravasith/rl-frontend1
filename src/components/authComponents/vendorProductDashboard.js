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
import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon, PlusButtonIconWhite, AddNewProduct, VendorGraphic, ArrowMarkLong, BigCloseButton} from "../../assets/images";
import LogoAnimation from "../animations/logoAnimation";
import { GradientButton, InputForm, SelectList } from "../UX/uxComponents";
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

            contentType: "uploadedProducts",

            modalCondition: "whiteBackgroundForModal hide",
            vendorGraphicClass: "initialVendorGraphic",

            category: "",

            tagsAdded: [],
            tagName: "",

            dummyDataStructure: [],

            newProduct: {
                categoryName: '',
                categoryId: '',
            },



            options: [
                { categoryName: 'Category - 1', categoryId: 1 },
                { categoryName: 'Category - 2', categoryId: 2 },
                { categoryName: 'Category - 3', categoryId: 3 }
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
        // console.log('DM',this.state.dummyDataStructure[0].categoryName)
    }

    componentDidUpdate() {
        console.log('DU',this.state.dummyDataStructure);
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
                                (<div className={this.state.vendorGraphicClass}>
                                        <div>
                                        <div className="addProductClass">
                                            {dummyDataStructure.map((product, i) =>
                                                <div key={i} className="categoryCarousel">
                                                    <h3>
                                                        {product.categoryName}
                                                    </h3>
                                                    <GradientButton
                                                        runFunction={() => {
                                                            window.open("/vendor-dashboard-detail", "_self")
                                                        }}>
                                                        Add product in this category
                                                    </GradientButton>
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
            tagName: val
        })
    }

    addTagName = () => {

        let temp = this.state.tagName;

        if (temp !== "") {

            let dummyArray = [...this.state.tagsAdded]

            dummyArray.map(item => item.toUpperCase())

            if (!dummyArray.includes(temp.toUpperCase())) {
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
                                <CloseButton />
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

    displayProceedError = () => {
        const { categoryName } = this.state.newProduct;
        const { isProceedClicked } = this.state;

        if (isProceedClicked && categoryName === "") return <small> Please choose category to proceed.</small>;
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
                    < div className="whiteSquareForModal">
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

                        <SelectList
                            name={'category'}
                            options={options}
                            value={categoryName}
                            placeholder={'Choose Category'}
                            handleChange={this.onSelect}
                        />

                        <div>
                            <h5>Add tags <small>(optional)</small></h5>
                            <input
                                placeholder="For Ex. Sofa"
                                ref="tagInput"
                                type="text"
                                onChange={e => this.setTagName(e)}
                                onKeyPress={e => {
                                    if (e.key === "Enter") {
                                        this.setTagName(e)
                                        this.addTagName()
                                    }
                                }}
                            />

                            <div className="red">
                                {this.returnTagsAdded()}
                            </div>
                        </div>

                        <div className="proceedOrNotCheck">
                            <GradientButton
                                runFunction={() =>  this.proceedHandler()}>
                                Proceed
                            </GradientButton>

                            {this.displayProceedError()}
                        </div>

                        

                        {/* <div className="proceedBtnAlign">
                            <GradientButton
                                runFunction={() => {

                                    this.state.category.length !== 0
                                        ?
                                        this.setState({
                                            vendorGraphicClass: "initialVendorGraphic",
                                            modalCondition: "whiteBackgroundForModal hide",
                                        })
                                        :
                                        console.log('Please choose category to proceed');

                                    let categoryDetails = {
                                        categoryName: this.state.category,
                                        categoryId: "",
                                        productsArray: []
                                    }

                                    this.state.tempArr.push(categoryDetails)

                                    this.setState({
                                        dummyDataStructure: [...this.state.dummyDataStructure, ...this.state.tempArr],
                                        category: ''
                                    })
                                }}>
                                Proceed
                            </GradientButton>
                            <small> Please choose category to proceed. </small>
                        </div> */}

                    </div>

                    {/* <div
                        className="deleteButton"
                        onClick={() => this.setState({
                            modalCondition: "whiteBackgroundForModal hide",
                            vendorGraphicClass: "initialVendorGraphic",
                        })}
                    >
                    </div> */}
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