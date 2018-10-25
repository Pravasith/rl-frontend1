import React from "react"

import "../../assets/sass/vendor_dashboard.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions";

import { PlusButtonIcon, CloseButton } from "../../assets/images"
import LogoAnimation from "../animations/logoAnimation"
import { InputForm, WhiteButton } from "../UX/uxComponents"
import HtmlSlider from "../UX/htmlSlider"
import Navbar from "../navbar/navbar"
import { decryptData } from "../../factories/encryptDecrypt";


class VendorDashboardDetails extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',
            redirect: false,

            materialsAdded: []
        }

    }

    returnVariationColors = () => {
        return (
            {
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
            }
        )
    }

    returnVariationImages = () => {
        return (
            {
                categoryName: "Water bodies",
                imagesInCategory: [
                    {
                        itemCode: "WB12",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXk1JV3DCwbJU_lNhIur-A3jZD8NnU89SN8WY_7h5B0zdqRbYceg"
                    },
                    {
                        itemCode: "WB13",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlNZc4WlFWnRym1Gpz9mzE8T-VpG_SqrKI2Ju1Ej6b0bmzjYrww"
                    },
                    {
                        itemCode: "WB14",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    },
                    {
                        itemCode: "WB15",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    },

                    {
                        itemCode: "WB14",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    },
                    {
                        itemCode: "WB15",
                        textOnRibbonSatisfied: false,
                        imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
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
            }
        )
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

    addMaterialName = () => {
        let temp = this.state.materialName

        let dummyArray = [...this.state.materialsAdded]

        dummyArray.map(item => item.toLowerCase())

        if (!dummyArray.includes(temp.toLowerCase())) {
            this.state.materialsAdded.push(temp)
        }

        this.setState({
            materialsAdded: this.state.materialsAdded.length !== 0 ? this.state.materialsAdded : [this.state.materialName]
        })

        this.refs.materialInput.value = ""
    }

    removeMaterials = (index) => {

        this
            .state
            .materialsAdded
            .splice(index, 1)

        this.setState({
            materialsAdded: this.state.materialsAdded.length !== 0 ? this.state.materialsAdded : []
        })

    }

    setMaterialName = (e) => {
        const val = e.target.value

        this.setState({
            materialName: val
        })
    }

    returnMaterialsAdded = () => {
        return (
            this
                .state
                .materialsAdded
                .map((item, i) => {
                    return (
                        <div
                            className="materialWrap"
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
                                onClick={() => this.removeMaterials(i)}
                            >
                                <CloseButton />
                            </div>
                        </div>
                    )
                })
        )
    }

    render() {
        return (
            <div className="vendorDashboardWrapper">

                <div className={this.state.loadingClass}>
                    <LogoAnimation />
                </div>

                <div className={this.state.mainClass}>

                    <Navbar
                        userData={this.returnNavBarData()}
                    />

                    <article className="vendorDashboardOuterLayer">
                        <section className="vendorDashboardInnerLayer">
                            <div className="uploadSectionLeftWrapper">
                                <article className="leftWrapperInnerLayer">
                                    <section className="imageUploadBigContainer">

                                        <div className="imageUploadUpperSection">
                                            <div className="upperSectionInnerLayer">
                                                <img
                                                    src="https://i.pinimg.com/originals/50/69/bd/5069bd3b995a9e7b50e42ad1c08d1e8e.jpg"
                                                    alt=""
                                                    className="imageContainer"
                                                />
                                            </div>
                                        </div>

                                        <div className="imageUploadDownSection">

                                            <header className="uploadedHeaderSection">
                                                <div className="headingArea">
                                                    <h3 className="headingColumn">Uploaded images</h3>

                                                    <div className="line"></div>
                                                </div>
                                            </header>

                                            <div className="downSectionInnerLayer">
                                                <HtmlSlider
                                                    categoryData={this.returnVariationImages()} // format of Item 
                                                    numberOfSlides={4} // Change the css grid properties for responsiveness
                                                    textOnRibbon={"TRENDING NOW"} // All caps
                                                />
                                            </div>

                                        </div>

                                    </section>
                                </article>
                            </div>

                            <div className="uploadSectionRightWrapper">

                                <article className="rightWrapperInnerLayer">

                                    <header className="vendorFormHeading">

                                        <div className="headingArea">
                                            <h3 className="headingClass">Add new product</h3>

                                            <div className="line"></div>
                                        </div>

                                    </header>

                                    <section className="vendorUploadFormSection">

                                        <div className="vendorUploadFormInnerContainer">
                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Material variations available </p>
                                                </div>

                                                <div className="materialHolder" >
                                                    {this.returnMaterialsAdded()}
                                                </div>

                                                <div className="materialNameColumn">

                                                    <div className="inputWrap">
                                                    <input
                                                        placeholder="Type material's name here"
                                                        ref="materialInput"
                                                        type="text"
                                                        onChange={e => this.setMaterialName(e)}
                                                        onKeyPress={e => {
                                                            if (e.key === "Enter") {
                                                                this.setMaterialName(e)
                                                                this.addMaterialName()
                                                            }
                                                        }}
                                                    />
                                                    <span className="InputSeparatorLine"> </span>
                                                    </div>

                                                    <WhiteButton
                                                        runFunction={this.addMaterialName}
                                                    >
                                                        Add
                                                    </WhiteButton>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Finishing / color options </p>
                                                </div>

                                                <div className="colorVariantSliderContainer">
                                                    <HtmlSlider
                                                        categoryData={this.returnVariationColors()} // format of Item 
                                                        numberOfSlides={4} // Change the css grid properties for responsiveness
                                                        textOnRibbon={"TRENDING NOW"} // All caps
                                                    />
                                                </div>

                                                <div className="buttonContainer">
                                                    <div className="mediumBtn vendorDashboardBtn">
                                                        <div className="svgImageContainer">
                                                            <PlusButtonIcon />
                                                        </div>
                                                            Add new finish/color
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Sizes available </p>
                                                </div>

                                                <div className="mentionedSizeContainer">
                                                    <ul className="addedProductSizeContainer">
                                                        <li className="mentionedProductSizeList">Small - 4ft x 3ft - price - Rs 25000 excl. Taxes</li>
                                                    </ul>
                                                </div>

                                                <div className="buttonContainer">
                                                    <div className="mediumBtn vendorDashboardBtn">
                                                        <div className="svgImageContainer">
                                                            <PlusButtonIcon />
                                                        </div>
                                                        Add new size
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Features of the product </p>
                                                </div>

                                                <div className="materialInfoColumn">
                                                    <InputForm
                                                        refName="companyName"
                                                        placeholder="Type something good about the product"
                                                        isMandatory={false}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="100"
                                                        result={(val) => this.setState({
                                                            materialName: val
                                                        })}
                                                    />
                                                </div>

                                                <div className="materialInfoColumn">
                                                    <InputForm
                                                        refName="companyName"
                                                        placeholder="Ex. Space Saving Compact Design"
                                                        isMandatory={false}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="100"
                                                        result={(val) => this.setState({
                                                            materialName: val
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                        </div>

                                    </section>

                                </article>

                            </div>

                        </section>

                    </article>
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

export default connect(mapStateToProps, matchDispatchToProps)(VendorDashboardDetails)