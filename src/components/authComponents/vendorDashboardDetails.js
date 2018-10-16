import React from "react"

import "../../assets/sass/vendor_dashboard.scss"


import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon,PlusButtonIcon } from "../../assets/images";
import LogoAnimation from "../animations/logoAnimation";
import { GradientButton, InputForm } from "../UX/uxComponents";
import HtmlSlider from "../UX/htmlSlider"


export default class VendorDashboardDetails extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',
            redirect: false
        }

    }

    returnVariationColors = () => {
        return (
            { 
                categoryName : "Water bodies",
                imagesInCategory : [
                    {
                        itemCode : "CL12",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://www.hcsupplies.co.uk/public/images/products/3/clear-maple.jpg"
                    },
                    {
                        itemCode : "WB13",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://images.pexels.com/photos/935875/pexels-photo-935875.jpeg?auto=compress&cs=tinysrgb&h=350"
                    },
                    {
                        itemCode : "WB14",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://image.freepik.com/free-vector/wood-texture_1083-21.jpg"
                    },
                    {
                        itemCode : "WB15",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://www.hcsupplies.co.uk/public/images/products/3/clear-maple.jpg"
                    },

                    {
                        itemCode : "WB14",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPFxp7lUM2L4lF4aGcpv4K0ToCdZGXJHxwCzHsrV0ro-sGkN5evQ"
                    },
                    {
                        itemCode : "WB15",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://i.ebayimg.com/images/g/xe0AAOSwiBJaAuOT/s-l300.jpg"
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
                categoryName : "Water bodies",
                imagesInCategory : [
                    {
                        itemCode : "WB12",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXk1JV3DCwbJU_lNhIur-A3jZD8NnU89SN8WY_7h5B0zdqRbYceg"
                    },
                    {
                        itemCode : "WB13",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlNZc4WlFWnRym1Gpz9mzE8T-VpG_SqrKI2Ju1Ej6b0bmzjYrww"
                    },
                    {
                        itemCode : "WB14",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    },
                    {
                        itemCode : "WB15",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
                    },

                    {
                        itemCode : "WB14",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
                    },
                    {
                        itemCode : "WB15",
                        textOnRibbonSatisfied : false,
                        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
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

    render(){
        return(
            <div className="vendorDashboardWrapper">

                <div className={this.state.loadingClass}>
                    <LogoAnimation />
                </div>

                <div className={this.state.mainClass}>
                    <article className="vendorDashboardOuterLayer">

                        <section className="vendorDashboardInnerLayer">

                            <div className="uploadSectionLeftWrapper">

                                <article className="leftWrapperInnerLayer">

                                    <section className="imageUploadBigContainer">

                                        <div className="imageUpoloadUpperSection">
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
                                                    categoryData = { this.returnVariationImages() } // format of Item 
                                                    numberOfSlides = { 4 } // Change the css grid properties for responsiveness
                                                    textOnRibbon = { "TRENDING NOW" } // All caps
                                                />
                                            </div>

                                        </div>

                                    </section>

                                </article>

                            </div>

                            <div className="uploadSectionRightWrapeer">

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
                                                        <p className="pargraphClass"> Material </p>
                                                    </div>

                                                    <div className="materialNameColumn">
                                                        <InputForm
                                                            refName= "companyName"
                                                            placeholder= "Type material name"
                                                            isMandatory= {false}
                                                            validationType= "alphabetsSpecialCharactersAndNumbers"
                                                            characterCount= "50"
                                                            result= {(val) => this.setState({
                                                                materialName: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Finishing / color options </p>
                                                    </div> 
                                                    <div className="colorVariantSliderContainer">
                                                        <HtmlSlider
                                                            categoryData = { this.returnVariationColors() } // format of Item 
                                                            numberOfSlides = { 4 } // Change the css grid properties for responsiveness
                                                            textOnRibbon = { "TRENDING NOW" } // All caps
                                                        />
                                                    </div>
                                                    <div className="buttonContainer">
                                                        <div className="mediumBtn vendorDashboardBtn">
                                                            <div className="svgImageContainer">
                                                                <PlusButtonIcon/>
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
                                                                <PlusButtonIcon/>
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
                                                            refName= "companyName"
                                                            placeholder= "Type something good about the product"
                                                            isMandatory= {false}
                                                            validationType= "alphabetsSpecialCharactersAndNumbers"
                                                            characterCount= "100"
                                                            result= {(val) => this.setState({
                                                                materialName: val
                                                            })}
                                                        />
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <InputForm
                                                            refName= "companyName"
                                                            placeholder= "Ex. Space Saving Compact Design"
                                                            isMandatory= {false}
                                                            validationType= "alphabetsSpecialCharactersAndNumbers"
                                                            characterCount= "100"
                                                            result= {(val) => this.setState({
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