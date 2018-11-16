import React from "react"

import "../../../assets/sass/vendor_products.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Navbar from "../../navbar/navbar"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";
import { getUserData } from "../../../actions/userActions"
import { decryptData } from "../../../factories/encryptDecrypt";
import { Footer } from "../../footer/footer"

import { CloseButton, LogoLoadingAnimation } from "../../../assets/images"
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
            modalClass: 'modalClass',
            mainContentWrap: 'mainContentWrap hide',

            // my code
            mainHeadingClass1: 'uploadedProducts active',
            mainHeadingClass2: 'clientData',

            contentType: "uploadedProducts",

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

            categoryName: '',
            tagName: '',
            tagsAdded: []

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

        // const getDataFromBackendAndShow = () => {
            setTimeout(() => {
                this.setState({
                    recievedData: "Hello",
                    mainContentWrap: 'mainContentWrap',
                    internalLoaderClass: 'contentLoader hide',
                })
            }, 4000)

        // }

    }

    returnContent = () => {

        {this.returnDataFromBackendAndShow()}

        return (
            <div className="contentWrapper">
                    <div className={this.state.mainContentWrap}>
                        <GradientButton
                            runFunction={() => {
                                this.setState({
                                    modalClass: 'modalClass'
                                })
                            }}
                            >
                            <div className="svgImageContainer">
                                <PlusButtonIconWhite />
                            </div>
                            Add new category
                        </GradientButton>
                        <div className="vendorGraphicCenter">
                            <div className="svgImageContainer">
                                <div className="arrowSvgImageContainer">
                                    <ArrowMarkLong/>
                                </div>
                                <div className="GraphicSvgImageContainer">
                                    <VendorGraphic/>
                                </div>
                            </div>
                        <small>Hey {} show your amazing products to your clients, start
                            by clicking Add new category button on the top.</small>
                        </div>

                        <div className="dfdfdf"></div>
                    </div>

                    <div
                        className= {this.state.internalLoaderClass}
                        >
                        <LogoLoadingAnimation />
                    </div> 
            </div>
            
        )
    }

    closeTag = (indexNumber) => {
        this.state.tagsAdded.splice(indexNumber, 1)
    }

    returnTags = () => {
        const tags = this.state.tagsAdded.map((item, i) => {
            return (
                <div key={i}>
                    <p>{item}</p>
                    <p
                        onClick = {() => this.closeTag(i)}
                        >
                        X
                    </p>
                </div>
                
            )
        })

        return tags
        
    }

    removeTag = (i) => {
        this.state.tagsAdded.splice(i, 1)
    }

    returnModal = () => {
        const { categoryName } = this.state;
        const { options } = this.state;

        return (
            <div className="modalOuterLayer">
                <div className="modalInnerLayer">
                    <h3>Details about the category</h3>
                    <div className="line"></div>
                    <div className="close">
                        <SmallCloseButton/>
                    </div>
                    <SelectList
                        name={'category'}
                        options={options}
                        value={categoryName}
                        placeholder={'Choose Category'}
                        handleChange={this.onSelect}
                    />
                    <h3>Add tags: </h3>
                    <input
                        placeholder="For Ex. Sofa"
                        ref="tagInput"
                        type="text"
                        maxLength="20"
                        onChange = {this.setTagName}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                this.setTagName(e)
                                this.addTagName()
                            }
                        }} />
                    <div className="addedTagsContainer">
                        {this.returnTags()}


                    </div>
                    <div className="proceedButton">
                        <GradientButton>
                            Proceed
                        </GradientButton>
                    </div>
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
                                </section>

                            </article>

                        </div>
                        
                        {this.returnContent()}

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