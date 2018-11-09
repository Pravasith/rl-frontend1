import React from "react"

import "../../assets/sass/vendor_products.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import Navbar from "../navbar/navbar"
import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions";
import { getUserData } from "../../actions/userActions"
import { decryptData } from "../../factories/encryptDecrypt";
import { Footer } from "../footer/footer"

import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon,PlusButtonIconWhite, AddNewProduct } from "../../assets/images";
import LogoAnimation from "../animations/logoAnimation";
import { GradientButton, InputForm } from "../UX/uxComponents";
import HtmlSlider from "../UX/htmlSlider"



class VendorProductDashboard extends React.Component{

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',

            // my code
            mainHeadingClass1 : 'uploadedProducts active',
            mainHeadingClass2 : 'clientData',

            contentType: 'uploadedProducts',
           

            redirect: false
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
        if( type === 'uploadedProducts' ){
            if( this.state.mainHeadingClass1 === type ){
                this.setState({
                    mainHeadingClass1 : type + ' active',
                    mainHeadingClass2 : 'clientData',
                })
            }
            else if( this.state.mainHeadingClass1 === type + ' active' ) {
                this.setState({
                    mainHeadingClass1 : type
                })
            }
        }
        else if( type === 'clientData' ){
            if( this.state.mainHeadingClass2 === type ){
                this.setState({
                    mainHeadingClass2 : type + ' active',
                    mainHeadingClass1 : 'uploadedProducts',
                })
            }
            else if( this.state.mainHeadingClass2 === type + ' active' ) {
                this.setState({
                    mainHeadingClass2 : type
                })
            }
        }
    }

    returnContent = () => {
        let { contentType } = this.state

        if(contentType === 'uploadedProducts'){
            
            return(

                <div className="add">

                    <div className="addProductButton">
                        <GradientButton>
                            <div className="svgImageContainer">
                                <PlusButtonIconWhite />
                            </div>
                            Add new category
                        </GradientButton>
                    </div>

                    <div className="addedProductSectionCategoryOuterLayer">

                        <div className="addedProductSectionCategoryInnerLayer">

                            <div className="productCategory">

                                <div className="productHeadingSection">
                                    <h3 className="productHeader">Planters(wall hanging)</h3>
                                    <div className="line"></div>
                                </div>

                                <div className="productPictureSection">
                                    <div className="productPictureInnerLayer">
                                        <div className="addProductSectionOuterLayer">
                                            <div className="addProductSectionInnerLayer">
                                                <div className="addProductGradientLayer">
                                                    <div className="svgImageSection">
                                                        <AddNewProduct/>
                                                    </div>
                                                    <div className="paraSection">
                                                        <h3 className="addToCategory">Add product in this category</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>

                    </div> 

                </div>
            )
        }

        else if(contentType === 'clientData'){
            return (
                <div className="clientProductWrap">
                    <div className="clientSectionInnerWrap">
                        Coming Soon
                    </div>
                </div>
            )
        }
    }


    render(){

        return(
            <div className="vendorProductDashboard">

                <div className={this.state.loadingClass}>
                    <LogoAnimation />
                </div>

                <div className={this.state.mainClass}>

                     <Navbar
                        userData={this.returnNavBarData()}
                    />
                   

                    <article className="vendorProductOuterLayer">
                       
                        <header className = "productHeadingSection">

                            <div 
                                className= { "firstHeadingComponent " + this.state.mainHeadingClass1 }
                                onClick = {() => {
                                    this.toggleHeaderClass('uploadedProducts')
                                    this.setState({
                                        contentType : 'uploadedProducts'
                                    })
                                }}
                            >
                                <h3 className="headingClass">
                                    Simple Product Manager
                                </h3>
                                <div className="line"></div>
                            </div>

                            <div 
                                className= { "firstHeadingComponent " + this.state.mainHeadingClass2 }
                                onClick = {() => {
                                    this.toggleHeaderClass('clientData')
                                    this.setState({
                                        contentType : 'clientData'
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
                            
                    <Footer />

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