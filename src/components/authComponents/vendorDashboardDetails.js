import React from "react"

import "../../assets/sass/vendor_dashboard.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions";

import { PlusButtonIcon, CloseButton, BigCloseButton } from "../../assets/images"
import LogoAnimation from "../animations/logoAnimation"
import { GradientButton,InputForm, WhiteButton } from "../UX/uxComponents"
import HtmlSlider from "../UX/htmlSlider"
import Navbar from "../navbar/navbar"
import { decryptData } from "../../factories/encryptDecrypt";
import ImageUploader from "../UX/imageUploader";



class VendorDashboardDetails extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',
            redirect: false,

            modalCondition: "whiteBackgroundForModal hide",
            modalSize: "whiteBackgroundForModal hide",
            modalColor: "whiteBackgroundForModal hide",

            materialsAdded: [],
            materialName: "",

            tempArr: [],
            dummyDataStructure: [],

            colorName: '',
            colorCode: '',
            sizeName: '',
            sizeCost: '',

            isProceedClicked: false
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

            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        window.open('/log-in', "_self")
                }

                else
                    console.error(err)
            })

    }

    componentDidUpdate() {
        console.log(this.state.dummyDataStructure);
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

        if(temp !== ""){

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

    getData = (data) => {
        console.log(data)
    }

    

    returnModal = () => {
        if(this.state.activeModal === "color"){
            return (

                <div className={this.state.modalColor}>
                    <div className="dummyXClass">
                        < div className="whiteSquareForModal">
                            <div className="vendorDashboardModal">
                                <div className="modalHeader">
                                    <h3>Enter a color code</h3>
                                    <div className="line"></div>
                                </div>
                                <div
                                    className="deleteButton"
                                    onClick={() => this.setState({
                                        modalColor: "whiteBackgroundForModal hide"
                                    })}
                                >
                                    <div className="deleteButtonSvgSection">
                                        <BigCloseButton />
                                    </div>
                                </div>
                            </div>

                            <div className="inputFormContainer">
                                <div className="formParaSection">
                                    <p className="pargraphClass">Name of the color</p>
                                </div>
                                <div className="productColorName">
                                    <InputForm
                                        refName="colorName"
                                        placeholder="Ex. Orange"
                                        isMandatory={true}
                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                        characterCount="6"
                                        result={(val) => this.setState({
                                            colorName: val
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="inputFormContainer">
                                <div className="formParaSection">
                                    <p className="pargraphClass">Color code (hex)</p>
                                </div>
                                <div className="productColorCode">
                                    <InputForm
                                        refName="colorCode"
                                        placeholder="Ex. #29abe2"
                                        isMandatory={true}
                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                        characterCount="6"
                                        result={(val) => this.setState({
                                            colorCode: val
                                        })}
                                    />
                                    <p>You can get the hexcode of the desired color <a href="https://www.google.com/">here</a></p>
                                </div>
                            </div>

                            <div className="proceedOrNotCheck">
                                <GradientButton
                                    runFunction={() => {
                                        this.proceedHandler()
                                        }}>
                                    Proceed
                                </GradientButton>

                                {this.displayProceedErrorColor()}
                            </div>
                        </div>
                    </div>
                </div>

            )
        }

        else if (this.state.activeModal === "size") {
            return(
                <div className={this.state.modalSize}>
                    <div className="dummyXClass">
                        < div className="whiteSquareForModal">
                            <div className="vendorDashboardModal">
                                <div className="modalHeader">
                                    <h3>Size details</h3>
                                    <div className="line"></div>
                                </div>
                                <div
                                    className="deleteButton"
                                    onClick={() => this.setState({
                                        modalSize: "whiteBackgroundForModal hide"
                                    })}
                                >
                                    <div className="deleteButtonSvgSection">
                                        <BigCloseButton />
                                    </div>
                                </div>
                            </div>

                            <div className="inputFormContainer">
                                <div className="formParaSection">
                                    <p className="pargraphClass">Size name</p>
                                </div>
                                <div className="productSizeName">
                                    <InputForm
                                        refName="sizeName"
                                        placeholder="Ex. Small-2ft x 2ft"
                                        isMandatory={true}
                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                        characterCount="30"
                                        result={(val) => this.setState({
                                            sizeName: val
                                        })}
                                    />
                                </div>
                            </div>

                            <div className="inputFormContainer">
                                <div className="formParaSection">
                                    <p className="pargraphClass">Extra cost for size(over base price)</p>
                                </div>
                                <div className="productCostForSize">
                                    <InputForm
                                        refName="sizeCost"
                                        placeholder="Ex. 20"
                                        isMandatory={true}
                                        validationType="onlyNumbers"
                                        characterCount="5"
                                        result={(val) => this.setState({
                                            sizeCost: val
                                        })}
                                    />
                                </div>
                            </div>

                            {/* <div className="inputFormContainer">
                            <div className="formParaSection">
                                <p className="pargraphClass">Extra cost for size(over base price)</p>
                            </div>
                            <div className="productCostForSize">
                                <InputForm
                                    refName="sizeCost"
                                    placeholder="Ex. 20"
                                    isMandatory={true}
                                    validationType="onlyNumbers"
                                    characterCount="5"
                                    result={(val) => console.log(val)}
                                />
                            </div>
                        </div> */}

                            <div className="proceedOrNotCheck">
                                <GradientButton
                                    runFunction={() => this.proceedHandler()}>
                                    Proceed
                            </GradientButton>

                                {this.displayProceedErrorSize()}
                            </div>
                        </div>
                    </div>
                </div>

            )
        }
    }

    displayProceedErrorColor = () => {
        const { colorName } = this.state;
        const { colorCode } = this.state;
        const { isProceedClicked } = this.state;

        if (isProceedClicked && colorName ==="") {
            return <small> Please enter color name</small>;
        } else if (isProceedClicked && colorCode ==="") {
            return <small>Please enter color code</small>
        } 
    }

    displayProceedErrorSize = () => {
        const { sizeName } = this.state;
        const { sizeCost } = this.state;
        const { isProceedClicked } = this.state;

        if (isProceedClicked && sizeName === "") {
            return <small>Please enter size name</small>
        } else if (isProceedClicked && sizeCost === "") {
            return <small>Please enter size cost</small>
        }
    }

    proceedHandler = () => {
        const { colorName } = this.state;
        const { colorCode } = this.state;
        const { sizeName } = this.state;
        const { sizeCost } = this.state;

        console.log(colorName, colorCode, sizeName, sizeCost);

        if (colorName.length !== 0 && colorCode.length !== 0) {
            console.log("heyy")

            let colorDetails = {
                colorName,
                colorCode
            }

            this.state.dummyDataStructure.push(colorDetails);

            this.setState({
                modalColor: "whiteBackgroundForModal hide",
                colorName: '',
                colorCode: '',
            })
        } 
        
        else if (sizeName.length !== 0 && sizeCost.length !== 0) {

            let sizeDetails = {
                sizeName,
                sizeCost
            }

            this.state.dummyDataStructure.push(sizeDetails);

            this.setState({
                modalSize: "whiteBackgroundForModal hide",
                sizeName: '',
                sizeCost: '',
                activeModal: "size",
            })
        }

        else {
            this.setState({
                isProceedClicked: true
            })
        }
    }

    render() {
        // const colorModal = ();

        // const sizeModal = ();

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
                                            <div className="imageUploadInnerLayer">

                                                <div className="imageContainerInnerSection">
                                                    <div className="productUploadHeaderSection">
                                                        <p>Please upload an image with size lesser than 500kb </p>
                                                    </div>

                                                    <div className="imageUploadComponent">
                                                        <header className="vendorImageUploadHeaderComponent">
                                                            <div className="headingArea">
                                                                <h3 className="headingClass">Product image</h3>
                                                                <div className="line"></div>
                                                            </div>
                                                        </header>
                                                        <ImageUploader/>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            {/* <div className="upperSectionInnerLayer">
                                                <img
                                                    src="https://i.pinimg.com/originals/50/69/bd/5069bd3b995a9e7b50e42ad1c08d1e8e.jpg"
                                                    alt=""
                                                    className="imageContainer"
                                                />
                                            </div> */}


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
                                                    runFunction={(data) => this.getData(data)}
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
                                                    <p className="pargraphClass">Name of the product</p>
                                                </div>
                                                <div className="materialInformationColumn">
                                                    <InputForm
                                                        refName="productName"
                                                        placeholder="Ex.Vertical Moss"
                                                        isMandatory={true}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="30"
                                                        result={(val) => this.setState({
                                                            productName: val
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Product Code</p>
                                                </div>
                                                <div className="productCode">
                                                    <InputForm
                                                        refName="productName"
                                                        placeholder="Type here"
                                                        isMandatory={true}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="30"
                                                        result={(val) => this.setState({
                                                            productCode: val
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Different Code (if any)</p>
                                                </div>
                                                <div className="productDifferentCode">
                                                    <InputForm
                                                        refName="differentCode"
                                                        placeholder="Type here"
                                                        isMandatory={false}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="30"
                                                        result={(val) => this.setState({
                                                            productDiffCode: val
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Best price of this product</p>
                                                </div>
                                                <div className="PricingSection">
                                                    <InputForm
                                                        refName="productPrice"
                                                        placeholder="Type here (in Rupees)"
                                                        isMandatory={true}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="30"
                                                        result={(val) => this.setState({
                                                            productPrice: val
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Material</p>
                                                </div>
                                                <div className="ProductMaterialSection">
                                                    <InputForm
                                                        refName="productMaterial"
                                                        placeholder="Type here"
                                                        isMandatory={true}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="30"
                                                        result={(val) => this.setState({
                                                            productMaterial: val
                                                        })}
                                                    />
                                                </div>
                                            </div>
                                        
                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Features </p>
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
                                                    <p className="pargraphClass"> Finishing options </p>
                                                </div>

                                                <div className="colorVariantSliderContainer">
                                                    <HtmlSlider
                                                        categoryData={this.returnVariationColors()} // format of Item 
                                                        numberOfSlides={4} // Change the css grid properties for responsiveness
                                                        textOnRibbon={"TRENDING NOW"} // All caps
                                                        runFunction={(data) => this.getData(data)}
                                                    />
                                                </div>

                                                <div className="buttonContainer">
                                                    <div className="mediumBtn vendorDashboardBtn">
                                                        <div className="svgImageContainer">
                                                            <PlusButtonIcon />
                                                        </div>
                                                            Add new finish
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Color options </p>
                                                </div>

                                                <div className="colorVariantSliderContainer">
                                                    <HtmlSlider
                                                        categoryData={this.returnVariationColors()} // format of Item 
                                                        numberOfSlides={4} // Change the css grid properties for responsiveness
                                                        textOnRibbon={"TRENDING NOW"} // All caps
                                                        runFunction={(data) => this.getData(data)}
                                                    />
                                                </div>

                                                <div className="buttonContainer">
                                                    <WhiteButton
                                                        runFunction={() =>
                                                            // console.log('hit')
                                                            this.setState({
                                                                modalColor: "whiteBackgroundForModal"
                                                            })
                                                        }
                                                    >
                                                        <div className="svgImageContainer">
                                                            <PlusButtonIcon />
                                                        </div>
                                                        Add new color
                                                    </WhiteButton>
                                                </div>
                                            </div>


                                            {/* <div className="addProductButton">
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
                                            </div> */}

                                            {/* <div className="inputFormContainer">
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
                                            </div> */}

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Sizes available</p>
                                                </div> 
                                                <div className="productSizeDescriptionOuterLayer">
                                                    <div className="productSizeDescriptionInnerLayer">
                                                        <div className="productSizeDetails">
                                                            <div className="sizeCostCartWrap">
                                                                <h3>Size nomenclature</h3>
                                                                <p>Small - 4ft * 3ft</p>
                                                            </div>
                                                            <div className="sizeCostCartWrap">
                                                                <h3>Cost over base price</h3>
                                                                <p>Rs.20</p>
                                                            </div>
                                                        </div>
                                                        <div className="sizeEditingButtons">
                                                           <div className="editButton">
                                                                 <WhiteButton>
                                                                    Edit
                                                                </WhiteButton>
                                                           </div> 
                                                           <div className="deleteButton">
                                                                 <WhiteButton>
                                                                    Delete
                                                                </WhiteButton>
                                                           </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="buttonContainer">
                                                    <WhiteButton
                                                        runFunction={() =>
                                                            // console.log('hit')
                                                            this.setState({
                                                                modalSize: "whiteBackgroundForModal"
                                                            })
                                                        }
                                                    >
                                                        <div className="svgImageContainer">
                                                            <PlusButtonIcon />
                                                        </div>
                                                        Add new size
                                                    </WhiteButton>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Min.quantity</p>
                                                </div>
                                                <div className="ProductQuantitySection">
                                                    <InputForm
                                                        refName="productMinQuantity"
                                                        placeholder="Ex. 20"
                                                        isMandatory={true}
                                                        validationType="onlyNumbers"
                                                        characterCount="20"
                                                        result={(val) => this.setState({
                                                            produtMinQunatity: val
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">Max.quantity</p>
                                                </div>
                                                <div className="ProductQuantitySection">
                                                    <InputForm
                                                        refName="productMaxQuantity"
                                                        placeholder="Ex. 20"
                                                        isMandatory={true}
                                                        validationType="onlyNumbers"
                                                        characterCount="20"
                                                        result={(val) => this.setState({
                                                            produtMinQunatity: val
                                                        })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Product description </p>
                                                </div>

                                                <div className="materialInfoColumn">
                                                    <InputForm
                                                        refName="productDescription"
                                                        placeholder="Type something good about the product"
                                                        isMandatory={false}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="100"
                                                        result={(val) => this.setState({
                                                            materialName: val
                                                        })}
                                                    />
                                                </div>

                                                {/* <div className="materialInfoColumn">
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
                                                </div> */}

                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass"> Features / specifications of the product </p>
                                                </div>

                                                <div className="materialInfoColumn">
                                                    <InputForm
                                                        refName="companyName"
                                                        placeholder="Type here"
                                                        isMandatory={false}
                                                        validationType="alphabetsSpecialCharactersAndNumbers"
                                                        characterCount="100"
                                                        result={(val) => this.setState({
                                                            materialName: val
                                                        })}
                                                    />
                                                </div>

                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <GradientButton>
                                                        Proceed
                                                    </GradientButton>
                                                </div>
                                            </div>
                                            {
                                                this.returnModal()
                                            }
                                            {/* {colorModal}
                                            {sizeModal} */}
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