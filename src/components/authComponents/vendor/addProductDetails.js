import React from "react"

import "../../../assets/sass/add_product_details.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";

import { PlusButtonIcon, CloseButton, BigCloseButton,SmallCloseButton,SmallModalCloseButton } from "../../../assets/images"
import LogoAnimation from "../../animations/logoAnimation"
import { GradientButton, InputForm, WhiteButton } from "../../UX/uxComponents"
import HtmlSlider from "../../UX/htmlSlider"
import Navbar from "../../navbar/navbar"
import { decryptData } from "../../../factories/encryptDecrypt"
import ImageUploader from "../../UX/imageUploader"

class AddProductDetails extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',
            redirect: false,

            // for features start //
            featuresAdded: [],
            // for features end //

            // dynamincally toggle classes to flip styles //
            vendorDashboardOuterClass: "vendorDashboardOuterLayer",
            modalClassToggle: "modalBackgroundMainOuterWrap hide",
            modalColor: "modalContentClass",
            modalFinish: "modalFinishClass",
            modalSize: "modalSizeClass",
            // dynamincally toggle classes to flip styles //

            modalType : null,
            tempArr: [],
            dummyDataStructure: [],

            colorName: '',
            colorCode: '',
            sizeName: '',
            sizeCost: '',

            isProceedClicked: false,

            erorrs: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    modalClassToggle = (showOrNot) => {
        if(showOrNot === "show")
            this.setState({
                modalClassToggle: "modalBackgroundMainOuterWrap",
                vendorDashboardOuterClass: "vendorDashboardOuterLayer blurClass",
            })

        else if (showOrNot === "dontShow")
            this.setState({
                modalClassToggle: "modalBackgroundMainOuterWrap hide", 
                vendorDashboardOuterClass: "vendorDashboardOuterLayer",
            })

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
        console.log(this.state.colorName);
        console.log(this.state.colorCode)
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

    addFeatureName = () => {
        let temp = this.state.featureName

        if (temp !== "") {
            let dummyArray = [...this.state.featuresAdded]

            dummyArray.map(item => item.toLowerCase())

            if (!dummyArray.includes(temp.toLowerCase())) {
                this.state.featuresAdded.push(temp)
            }

            this.setState({
                featuresAdded: this.state.featuresAdded.length !== 0 ? this.state.featuresAdded : [this.state.featureName]
            })

            this.refs.featureInput.value = ""
        }

    }

    removeFeature = (index) => {
        this
            .state
            .featuresAdded
            .splice(index, 1)

        this.setState({
            featuresAdded: this.state.featuresAdded.length !== 0 ? this.state.featuresAdded : []
        })

    }

    setfeatureName = (e) => {
        const val = e.target.value

        this.setState({
            featureName: val
        })
    }

    returnfeaturesAdded = () => {
        return (
            this
                .state
                .featuresAdded

                .map((item, i) => {
                    return (
                        <div
                            className="featureWrap"
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
                                onClick={() => this.removeFeature(i)}
                                >
                                <CloseButton />
                            </div>
                        </div>
                    )
                })
        )
    }

        displayProceedError = () => {
            const { colorName } = this.state;
            const { colorCode } = this.state;
            const { sizeName } = this.state;
            const { sizeCost } = this.state;
            const { isProceedClicked } = this.state;

            if (isProceedClicked && colorName === "") {
                return <small> Please enter color name</small>;
            } else if (isProceedClicked && colorCode === "") {
                return <small>Please enter color code</small>
            } else if (isProceedClicked && sizeName === "") {
                return <small>Please enter size name</small>
            } else if (isProceedClicked && sizeCost === "") {
                return <small>Please enter size cost</small>
            }
        }

    // displayProceedErrorColor = () => {
    //     const { colorName } = this.state;
    //     const { colorCode } = this.state;
    //     const { isProceedClicked } = this.state;

    //     if (isProceedClicked && colorName === "") {
    //         return <small> Please enter color name</small>;
    //     } else if (isProceedClicked && colorCode === "") {
    //         return <small>Please enter color code</small>
    //     }
    // }

    // displayProceedErrorSize = () => {
    //     const { sizeName } = this.state;
    //     const { sizeCost } = this.state;
    //     const { isProceedClicked } = this.state;

    //     if (isProceedClicked && sizeName === "") {
    //         return <small>Please enter size name</small>
    //     } else if (isProceedClicked && sizeCost === "") {
    //         return <small>Please enter size cost</small>
    //     }
    // }
    
        proceedHandler = () => {
            const { colorName } = this.state;
            const { colorCode } = this.state;
            const { sizeName } = this.state;
            const { sizeCost } = this.state;

            console.log('colorName:', colorName, 
                        'colorCode:', colorCode, 
                        'sizeName:', sizeName, 
                        'sizeCost:', sizeCost);

            if (colorName.length !== 0 && colorCode.length !== 0) {
                console.log("heyy")

                let colorDetails = {
                    colorName,
                    colorCode
                }

                this.state.dummyDataStructure.push(colorDetails);

                this.setState({
                    modalClassToggle: "modalBackgroundMainOuterWrap hide",
                    vendorDashboardOuterClass : "vendorDashboardOuterLayer",
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
                    modalClassToggle: "modalBackgroundMainOuterWrap hide",
                    vendorDashboardOuterClass: "vendorDashboardOuterLayer",
                    sizeName: '',
                    sizeCost: ''
                })
            }

            else {
                this.setState({
                    isProceedClicked: true
                })
            }
        }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    returnModal = () => {
        const { modalType } = this.state;

        const returnModalContent = () => {
            if(modalType === "finish") {
                return (
                <div className={this.state.modalFinish}>
                    <div className="dummyXClass">
                        <div className="whiteSquareForModal">
                            {/* <div className="closeUpImg">
                                <h3>Add a close-up image thumbnail for this finish</h3>
                                <div className="line"></div>
                                <p>Example: The image thumbnail for Pinewood finish looks like this</p>
                                <div className="uploadedImgThumbnail">
                                    <img className="uploadedImage" src="" alt="" />
                                    <ImageUploader />
                                </div>
                            </div> */}
                            <div className="vendorDashboardModal">
                                <div className="modalHeader finsihModalHeader">
                                    <h3>Add a close-up image thumbnail for this finish</h3>
                                    <div className="line"></div>
                                </div>
                            </div>
                            <div className="inputFormContainer">
                                <div className="formParaSection finishInputParaContainer">
                                    <p className="pargraphClass">Example: The image thumbnail for Pinewood finish looks like this</p>
                                    <div className="exampleUploadedImgThumbnail">
                                        <img className="uploadedImage" src="https://res.cloudinary.com/wnbcloud/image/upload/h_300,w_400/v1467638340/ash2_wqnx4x.jpg" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="imageUploaderContainer">
                                <div className="imageUploaderInnerLayer">
                                    <ImageUploader />
                                </div>
                            </div>
                        </div>
                        <div className="whiteSquareForModal">
                            <div className="uploadedImg">
                                <h3>You have uploaded this image</h3>
                                <div className="line"></div>
                                <div className="uploadedImgThumbnail">
                                    <img className="uploadedImage" src="" alt="" />
                                    <ImageUploader />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
                )       
            }

            else if (modalType === "color") {
                return (
                    <div className={this.state.modalColor}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="vendorDashboardModal">
                                    <div className="modalHeader">
                                        <h3>Enter a color code</h3>
                                        <div className="line"></div>
                                    </div>
                                </div>

                                <div className="colorCategorySection">
                                    <div className="selectedColorSection">

                                    </div>
                                    <div className="colorInputFormSection">

                                        <div className="inputFormContainer">
                                            <div className="formParaSection">
                                                <p className="pargraphClass">Name of the color</p>
                                            </div>
                                            <div className="productInputInfoSection">
                                                {/* <InputForm
                                                    refName="colorName"
                                                    placeholder="Ex. Orange"
                                                    isMandatory={true}
                                                    validationType="alphabetsSpecialCharactersAndNumbers"
                                                    characterCount="6"
                                                    value={this.state.colorName}
                                                    result={(val) => this.setState({
                                                        colorName: val
                                                    })}
                                                /> */}
                                                <div className="modalMandatorySection">
                                                    <p className="madatoryHighlight">Mandatory</p>
                                                </div>
                                                <div className="modalInputCategory">
                                                    <input 
                                                        type="text"
                                                        name="colorName"
                                                        placeholder="Ex. Orange"
                                                        value={this.state.colorName}
                                                        onChange={this.onChange}
                                                    />
                                                    <span className="InputSeparatorLine"> </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="inputFormContainer">
                                            <div className="formParaSection">
                                                <p className="pargraphClass">Color code (hex)</p>
                                            </div>
                                            <div className="productInputInfoSection">
                                                {/* <InputForm
                                                    refName="colorCode"
                                                    placeholder="Ex. #29abe2"
                                                    isMandatory={true}
                                                    validationType="alphabetsSpecialCharactersAndNumbers"
                                                    characterCount="6"
                                                    result={(val) => this.setState({
                                                        colorCode: val
                                                    })}
                                                /> */}
                                                <div className="modalMandatorySection">
                                                    <p className="madatoryHighlight">Mandatory</p>
                                                </div>
                                                <div className="modalInputCategory">
                                                    <input
                                                        type="text"
                                                        name="colorCode"
                                                        placeholder="Ex. Orange"
                                                        value={this.state.colorCode}
                                                        onChange={this.onChange}
                                                    />
                                                    <span className="InputSeparatorLine"> </span>
                                                </div>
                                                
                                            </div>
                                            <div className="colorLinkSection">
                                                    <p>You can get the hexcode of the desired color 
                                                    <a href="https://www.google.com/"> here</a></p>
                                            </div>
                                        </div>

                                        <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => {
                                            this.proceedHandler()
                                        }}>
                                        Proceed
                                    </GradientButton>

                                    {this.displayProceedError()}
                                </div>
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

            else if (modalType === "size") {
                return (

                    <div className={this.state.modalSize}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="vendorDashboardModal">
                                    <div className="modalHeader">
                                        <h3>Size details</h3>
                                        <div className="line"></div>
                                    </div>
                                </div>

                                <div className="inputFormContainer">
                                    <div className="formParaSection">
                                        <p className="pargraphClass">Size name</p>
                                    </div>
                                    <div className="productInputInfoSection productSizeName">
                                        {/* <InputForm
                                            refName="sizeName"
                                            placeholder="Ex. Small-2ft x 2ft"
                                            isMandatory={true}
                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                            characterCount="30"
                                            result={(val) => this.setState({
                                                sizeName: val
                                            })}
                                        /> */}
                                        <div className="modalMandatorySection">
                                            <p className="madatoryHighlight">Mandatory</p>
                                        </div>
                                        <div className="modalInputCategory">
                                            <input
                                                type="text"
                                                name="sizeName"
                                                placeholder="Ex. Small-2ft x 2ft"
                                                value={this.state.sizeName}
                                                onChange={this.onChange}
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="inputFormContainer">
                                    <div className="formParaSection">
                                        <p className="pargraphClass">Extra cost for size(over base price)</p>
                                    </div>
                                    <div className="productInputInfoSection productCostForSize">
                                        {/* <InputForm
                                            refName="sizeCost"
                                            placeholder="Ex. 20"
                                            isMandatory={true}
                                            validationType="onlyNumbers"
                                            characterCount="5"
                                            result={(val) => this.setState({
                                                sizeCost: val
                                            })}
                                        /> */}
                                        {/* <div className="modalMandatorySection">
                                            <p className="madatoryHighlight">Mandatory</p>
                                        </div> */}
                                        <div className="modalInputCategory">
                                            <input
                                                type="text"
                                                name="sizeCost"
                                                placeholder="Ex. 20"
                                                value={this.state.sizeCost}
                                                onChange={this.onChange}
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => this.proceedHandler()}>
                                        Proceed
                                    </GradientButton>

                                    {this.displayProceedError()}
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }
        }

        return (
            <div className={this.state.modalClassToggle}>
                <div className="modalBackgroundDummyClass">
                    <div className="modalBackgroundInnerWrap">
                        <div className="modalOuterWrap">
                            
                            <article className="modalContentWrap">
                                {returnModalContent()}
                            </article>
                            <header className="closeHeaderSection">
                                <div className="closeButtonContainer"
                                    onClick = {() => {
                                        this.modalClassToggle("dontShow")
                                    }}
                                    >
                                        <SmallModalCloseButton/>
                                </div>
                            </header>
                            <footer>
                                {/* <GradientButton>
                                    Proceed
                                </GradientButton> */}
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
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

                    <div className="vendorDummyContainer">
                        <article className={this.state.vendorDashboardOuterClass}>
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
                                                            <ImageUploader />
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

                                                    <div className="featureHolder" >
                                                        {this.returnfeaturesAdded()}
                                                    </div>

                                                    <div className="featureNameColumn">

                                                        <div className="inputWrap">
                                                            <input
                                                                placeholder="Type the value-add features about this product"
                                                                ref="featureInput"
                                                                type="text"
                                                                onChange={e => this.setfeatureName(e)}
                                                                onKeyPress={e => {
                                                                    if (e.key === "Enter") {
                                                                        this.setfeatureName(e)
                                                                        this.addFeatureName()
                                                                    }
                                                                }}
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <WhiteButton
                                                            runFunction={this.addFeatureName}
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

                                                        <WhiteButton
                                                            className="vendorDashboardBtn"
                                                            runFunction= {() => {
                                                                this.modalClassToggle("show")
                                                                this.setState({
                                                                    modalType : "finish"
                                                                })
                                                            }}
                                                            >
                                                            <div className="svgImageContainer">
                                                                <PlusButtonIcon />
                                                            </div>
                                                            Add new finish
                                                        </WhiteButton>

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
                                                            runFunction={() => {
                                                                    // console.log('hit')
                                                                    this.modalClassToggle("show")
                                                                    this.setState({
                                                                        modalType : "color"
                                                                    }
                                                                )}
                                                            }
                                                        >
                                                            <div className="svgImageContainer">
                                                                <PlusButtonIcon />
                                                            </div>
                                                            Add new color
                                                    </WhiteButton>
                                                    </div>
                                                </div>

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
                                                            runFunction={() => {
                                                                this.modalClassToggle("show")
                                                                this.setState({
                                                                    modalType : "size"
                                                                })
                                                            }}
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
                                                                featureName: val
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
                                                            featureName: val
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
                                                                featureName: val
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


                                            </div>
                                        </section>
                                    </article>
                                </div>
                            </section>
                        </article>

                        {
                            this.returnModal()
                        }
                    </div>

                    
                </div>
            </div>
        )
    }

}

// AddProductDetails.propTypes = {
//     errors: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => {
    return ({ 
            userData: state.userData,
            responseData: state.responseDataFromAPI 
        })
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserData,
        hitApi,
        navBarLoadingAnimationShowHide
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(AddProductDetails)