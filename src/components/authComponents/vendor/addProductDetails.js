import React from "react"

import "../../../assets/sass/add_product_details.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { getUserData } from "../../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";

import {
    PlusButtonIcon,
    CloseButton,
    BigCloseButton,
    ModalCloseButton,
    ErrorMsgSign,
    TickSmallWhite,
    SmallCloseButton,
    SmallModalCloseButton,
    MinusImageIcon,
    PlusImageIcon
} from "../../../assets/images";

import LogoAnimation from "../../animations/logoAnimation"
import { GradientButton, InputForm, WhiteButton, RadioButton } from "../../UX/uxComponents"
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
            modalMaterial: "modalMaterialClass",
            // dynamincally toggle classes to flip styles //

            // minQuantityPara: "minQuantityPara hide",
            // maxQuantityPara: "maxQuantityPara hide",

            modalType : null,
            tempArr: [],
            dummyDataStructure: [],

            colorName: '',
            colorCode: '',
            sizeName: '',
            sizeCost: '',

            colorArray: [],

            // productMinQuantity: undefined,
            // productMaxQuantity: undefined,

            productDimensions: [],
            productMaterials: [],
            tagsAdded: [],
            charCount: 20,
            checked: undefined,

            isChecked: false,
            extraCostInput: 'extraCostInput hide',
            materialCost: '',

            productDiscount: undefined,

            isProceedClicked: false,

            // my code
            checkBoxSelect: "checkBoxSelect",
            categoryStylesAdded: [],

            categoryArray: [
                {
                    styleId: 1,
                    styleTitle: "Modern",
                    styleImageUrl: "https://cf.ltkcdn.net/interiordesign/images/std/203112-662x450-moderninterior.jpg",
                    styleContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
                {
                    styleId: 2,
                    styleTitle: "Contemporary",
                    styleImageUrl: "data:image/jpeg;base64,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",
                    styleContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
                {
                    styleId: 3,
                    styleTitle: "Classic",
                    styleImageUrl: "https://antonovich-design.ae/uploads/page/2017/4/2017A0m7AWXJpFHR.jpg",
                    styleContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
                {
                    styleId: 4,
                    styleTitle: "Traditional",
                    styleImageUrl: "https://i.pinimg.com/originals/33/e1/08/33e10894bfb64043f3004561b081d157.jpg",
                    styleContent: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                },
            ],

            erorrs: {},

            warningText: null,
            warningClass: "warningClass hide",
            fieldIsValid: false,

            checkBoxClass1: "checkBox",
            checkBoxClass2: "checkBox",

            // displayError: "displayError",
            displayError: "displayError hide",
            materialCostIsValid: false
            
        }
    }

    // componentDidUpdate() {
    //     console.log(this.state.productDiscount)
    // }


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

     handleStyleSelection = (styleData) => {

        this.state.categoryStylesAdded.push(styleData.styleTitle)
        let dummyArray = [...this.state.categoryStylesAdded]

        this.setState({
            categoryStylesAdded : dummyArray
        })
    }

    removeCategory = (index) => {
        this
            .state
            .categoryStylesAdded
            .splice(index, 1)

            this.setState({
                categoryStylesAdded: this.state.categoryStylesAdded.length !== 0 ? this.state.categoryStylesAdded : []
            })
    }



    returnCategoryContent = () => {
        return (
            this.
                state.
                categoryArray.
                map((item , i) => {
                return(                    
                    <div 
                        className="productStyleContainer"
                        key = {i}
                        onClick = {() => {
                            this.handleStyleSelection(item)
                        }}
                        >
                        <header className="productStyleHeadingSection">
                            <div className="titleCategory">
                                <h3>
                                    {item.styleTitle}
                                </h3>
                                <div className="line"></div>
                            </div>

                            <div
                                className= {this.state.checkBoxSelect}
                                >
                                <div className="iconWrap">
                                    <TickSmallWhite/>
                                </div>
                            </div>
                        </header>
                        
                        <div className="productStyleContentSection">
                            <div className="productStyleContentSectionInnerLayer">
                                <div className="imageCategorySection">
                                    <img          
                                        src={item.styleImageUrl} 
                                        alt=""
                                    />
                                </div>
                                <div className="styleCategorySection">
                                    <p>
                                        {item.styleContent}
                                    </p>             
                                </div>
                            </div>
                        </div>
                    
                    </div>
                )
            })
        )
    }

    returnStyleContentAdded = () => {
        return(
            this
                .state
                .categoryStylesAdded
                .map((item,i) => {
                    return(
                        <div 
                            className="tagContainer"
                            key = {i}
                            >
                            <div 
                                className="tagConatinerInnerLayer">
                                <p>
                                    {item}
                                </p>

                                <div 
                                    className ="svgImageSection"
                                    onClick = {() => this.removeCategory(i)}
                                    >
                                    <SmallCloseButton />
                                </div>
                            </div>
                        </div> 
                    )
                })
           )
    }
 
    returnProductType = () => {
        return(
             [{
                id: 1,
                value: "Pendant lamps 1"
            },
            {
                id: 2,
                value: "Pendant lamps 2"
            },
            {
                id: 3,
                value: "Pendant lamps 3"
            },
            {
                id: 4,
                value: "Pendant lamps 4"
            }]
        )
    }

    returnProductAvailability = () => {
        return(
            [{
                id: 1,
                value: "Yes, it is available"
            },
            {
                id: 2,
                value: "No, it is not available"
            }]
        )
    }

    returnProductDiscount = () => {
        return (
            [{
                id: 1,
                value: 'Pendant lamps'
            },
            {
                id: 2,
                value: 'Pendant lamps'
            },
            {
                id: 3,
                value: 'Pendant lamps'
            },
            {
                id: 4,
                value: 'Pendant lamps'
            }]
        )
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
                                onClick={() => this.removeFeature(index)}
                                >
                                <CloseButton />
                            </div>
                        </div>
                    )
                })
        )
    }

    returnColorModule = () => {
        return (
            this.state.colorArray
            .map((item, i) => {
                return (
                    <div
                        className="colorDescriptionOuterLayer"
                        key={i}
                    >
                        <div className="colorDescriptionInnerLayer">
                            <div 
                                className="colorDetails"
                                style = {{background : item.colorCode}}
                            >
                                <div className="closeButtonContainer"
                                    onClick={() => {
                                        this.removeColor(i)
                                    }}
                                >
                                    <CloseButton />
                                </div>
                                <p>{item.colorCode}</p>
                            </div>
                        </div>
                    </div>
                )
            })
        )
    }
        
    returnProductDimensions = () => {
        return (
            this
                .state
                .productDimensions
                .map((item, i) => {
                    return (
                        <div
                            className="productSizeDescriptionOuterLayer"
                            key={i}
                            >
                            <div className="productSizeDescriptionInnerLayer">
                                <div className="productSizeDetails">
                                    <div className="sizeCostCartWrap">
                                        <h3>Size nomenclature</h3>
                                        <p key={i}
                                            >{item.sizeName}</p>
                                    </div>
                                    <div className="sizeCostCartWrap">
                                        <h3>Cost over base price</h3>
                                        <p key={i}>Rs. {item.sizeCost}</p>
                                    </div>
                                </div>
                                <div className="sizeEditingButtons">
                                    <div className="editButton">
                                        <WhiteButton 
                                            runFunction={() => this.editProductDimensions(i)}
                                            >
                                            Edit
                                        </WhiteButton>
                                    </div>
                                    <div 
                                        className="deleteButton"
                                        onClick={() => this.removeProductDimensions(i)}
                                        >
                                        <WhiteButton>
                                            Delete
                                        </WhiteButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        )
    }

    editProductDimensions = async (index) => {
        const sizeName = this.state.productDimensions[index].sizeName;
        const sizeCost = this.state.productDimensions[index].sizeCost;

        const setSyncState = async () => {
            await this.setState({
                modalType: "size",
            })
        }

        await setSyncState()

        this.modalClassToggle("show")

        this.refs.sizeName.value = sizeName
        this.refs.sizeCost.value = sizeCost

    }

    removeProductDimensions = (index) => {
        this
            .state
            .productDimensions
            .splice(index, 1)

        this.setState({
            productDimensions: this.state.productDimensions.length !== 0 ? this.state.productDimensions : []
        })
    }

    returnProductMaterials = () => {
        return (
            this
                .state
                .productMaterials
                .map((item, i) => {
                    // console.log(item)
                    return (
                        <div
                            className="productMaterialDescriptionOuterLayer"
                            key={i}
                        >
                            <div className="productMaterialDescriptionInnerLayer">
                                <div className="productMaterialDetails">
                                    <div className="MaterialCostCartWrap">
                                        <h3>Material nomenclature</h3>
                                        <p key={i}
                                        >{item.materialName}</p>
                                    </div>
                                    <div className="MaterialCostCartWrap">
                                        <h3>Cost over base price</h3>
                                        <p key={i}>Rs. {item.materialCost}</p>
                                    </div>
                                </div>
                                <div className="MaterialEditingButtons">
                                    <div className="editButton">
                                        <WhiteButton
                                            runFunction={() => this.editProductMaterials(i)}
                                        >
                                            Edit
                                        </WhiteButton>
                                    </div>
                                    <div
                                        className="deleteButton"
                                        onClick={() => this.removeProductMaterials(i)}
                                    >
                                        <WhiteButton>
                                            Delete
                                        </WhiteButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
        )
    }

    editProductMaterials = async (index) => {
        const materialName = this.state.productMaterials[index].materialName;
        const materialCost = this.state.productMaterials[index].materialCost;

        const setSyncState = async () => {
            await this.setState({
                modalType: "material",
            })
        }

        await setSyncState()

        this.modalClassToggle("show")

        this.refs.materialName.value = materialName
        this.refs.materialCost.value = materialCost


        this.setState({
            materialName,
            materialCost
        })
    }

    removeProductMaterials = (index) => {
        this
            .state
            .productMaterials
            .splice(index, 1)

        this.setState({
            productMaterials: this.state.productMaterials.length !== 0 ? this.state.productMaterials : []
        })
    }

    removeColor = (index) => {
        this.state.colorArray.splice(index, 1)

        this.setState({
            colorArray: this.state.colorArray.length !== 0 ? this.state.colorArray : []
        })
    }

    displayError = (modalType, message) => {
        if (modalType === "color") {
            if(this.state.colorIsValid === false){

                const {emptyFieldInColor} = this.state
 
                const  returnError = () => {
                    if(emptyFieldInColor === "colorName"){
                        return <p>{this.state.errorMessage}</p>
                    }

                    else if(emptyFieldInColor === "colorCode"){
                        return (
                            <p>{this.state.errorMessage}</p>
                        )
                    }

                    else{
                        return <p>Oops, something is not right, please reload and try again</p>
                    }
                }


                return (
                    <div className="errorMessage">
                        {returnError()}
                    </div>
                )
            }
        }

        else if (modalType === "size") {
            if(this.state.sizeIsValid === false){
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInSize}</p>
                    </div>
                )
            }
        }

        else if (modalType === "material") {
            if (this.state.materialIsValid === false) {
                return (
                    <div className="errorMessage">
                        <p>Please enter the {this.state.emptyFieldInMaterial}</p>
                    </div>
                )
            }
        }
    }

    handleQuantity = async (e, minOrMax) => {

        if (minOrMax === "min") {
            const productMinQuantity = (e.target.validity.valid) ? e.target.value : this.state.productMinQuantity;

            await this.setState({ productMinQuantity });

            if (this.state.productMinQuantity === "") await this.setState({ minQuantityPara: "minQuantityPara" });
            else this.setState({ minQuantityPara: "minQuantityPara hide" });
        }

        else if (minOrMax === "max") {
            const productMaxQuantity = (e.target.validity.valid) ? e.target.value : this.state.productMaxQuantity;

            await this.setState({ productMaxQuantity });

            if (this.state.productMaxQuantity === "") this.setState({ maxQuantityPara: "maxQuantityPara" });
            else this.setState({ maxQuantityPara: "maxQuantityPara hide" });
        }
    }

    checkTypeNumber = (e, checkFor) => {

        const val = e.target.value;
        const regEx = /^[0-9\b]+$/;

        console.log(val)

        if (regEx.test(val) === true) {
            if (checkFor === "discount") {
                this.setState({
                    productDiscount: val,
                    displayError: "displayError hide",
                    
                })
            } 
            
            else if (checkFor === "material") {
                this.setState({
                    materialCost: val,
                    displayError: "displayError hide",
                    materialCostIsValid: true
                })
                console.log("Wrks")
            }
        }
        
        else if (!regEx.test(val)) {
            this.setState({
                displayError: "displayError",
                materialCostIsValid: false
            })
        }
    }

    proceedHandler = (typeOfButtonClicked) => {

        let isMaterialValid = false
        let isColorValid = false
        let isSizeValid = false
        let emptyField
        let errorMessage

        const validateMaterialModal = (materialName, materialCost) => {
            const { isChecked, materialCostIsValid } = this.state;

            if (materialName !== "") {
                if(isChecked && materialCost !== "") {
                    materialCostIsValid ? isMaterialValid = true : emptyField = "Material Cost in Numbers";
                } 
                else if (isChecked && materialCost === "") {
                    emptyField = "Material Cost"
                } 
                else if (isChecked === false && materialCost === 0) { 
                    isMaterialValid = true;
                }
            }

            else if (materialName === "") {
                emptyField = "Material Name"
            }


            const validationData = {
                isMaterialValid,
                emptyField
            }

            // console.log(validationData);

            return (
                validationData
            )
            
        }

        const validateColorModal = (colorName, colorCode) => {
            if(colorName !== "" && colorCode !== "") {
                if(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCode)){

                    let alreadyExistingColorName
                    const { colorArray } = this.state

                    if(colorArray.length === 0){
                        isColorValid = true
                        colorArray.push({
                            colorName : colorName.toLowerCase(),
                            colorCode : colorCode.toLowerCase()
                        })
                    }

                    else{
                        let colorDoesntExist = true

                        // console.log("---------------------------------------------------")
                        colorArray.map((item, i) => {

                            // console.log("item.colorName, item.colorCode, colorCode", item.colorName, item.colorCode, colorCode, i)
                            colorCode = colorCode.toLowerCase()

                            // console.log(item.colorCode !== colorCode)

                            if(item.colorCode === colorCode){
                                colorDoesntExist = false
                            }

                            else{
                                alreadyExistingColorName = item.colorName
                            }
                        })
                        // console.log("---------------------------------------------------")
    
                        if(colorDoesntExist === true){
                            isColorValid = true
                            colorArray.push({
                                colorName : colorName.toLowerCase(),
                                colorCode : colorCode.toLowerCase()
                            })
                        }

                        else if(colorDoesntExist === false){
                            isColorValid = false
                            emptyField = "colorCode"
                            errorMessage = `You have already entered this color code with the name "${alreadyExistingColorName}"`
                        }
                    }                
                }

                else{
                    isColorValid = false
                    emptyField = "colorCode"
                    errorMessage = "The color code is not right, please retry. See if you forgot to enter the '#' at the beginning."
                }

            } 
            
            else if (colorName === "" && colorCode === "") {
                emptyField = "colorName"
                errorMessage = "please enter color name"
            }

            else {
                if (colorName === "") {
                    emptyField = "colorName"
                    errorMessage = "Please enter color name"
                }
                    

                if (colorCode === ""){
                    emptyField = "colorCode"
                    errorMessage = "Please enter color code"
                }
                    
            }

            const validationData = {
                isColorValid,
                emptyField,
                errorMessage
            }

            return validationData
        }


        const validateSizeModal = (sizeName, sizeCost) => {
            if(sizeName !== "" && sizeCost !== ""){
                isSizeValid = true;
            }

            else if (sizeName === "" && sizeCost === "") {
                emptyField = "Size Name"
            } 

            else {
                if (sizeName === "")
                    emptyField = "Size Name"
                if (sizeCost === "")
                    emptyField = "Size Cost"
            }

            const validationData = {
                isSizeValid,
                emptyField
            }

            return validationData;
        }


        if(typeOfButtonClicked === "color"){
            const colorCode = this.refs.colorCode.value
            const colorName = this.refs.colorName.value

            let validatedData = validateColorModal(colorName, colorCode)

            if(validatedData.isColorValid){
                
                this.setState({
                    colorIsValid: true,
                    emptyFieldInColor: null,
                    modalType: null,
                    colorArray: this.state.colorArray.length !== 0 ? this.state.colorArray : []
                })

                // save data

                this.refs.colorCode.value = ""
                this.refs.colorName.value = ""

                this.modalClassToggle("dontShow")
            }

            else{
                
                this.setState({
                    colorIsValid : false,
                    emptyFieldInColor : validatedData.emptyField,
                    errorMessage : validatedData.errorMessage
                })
            }
        }

        else if (typeOfButtonClicked === "size") {
            const sizeName = this.refs.sizeName.value;
            const sizeCost = this.refs.sizeCost.value;

            let validatedData = validateSizeModal(sizeName, sizeCost);

            if (validatedData.isSizeValid) {
                let temp = {
                    sizeName: this.state.sizeName,
                    sizeCost: this.state.sizeCost
                }

                if(temp !== "") {
                    let dummyArray = [...this.state.productDimensions]

                    if(!dummyArray.includes(temp)){
                        this.state.productDimensions.push(temp)
                    }
                }

                this.setState({
                    sizeIsValid: true,
                    emptyFieldInSize: null,
                    modalType: null,
                    productDimensions: this.state.productDimensions.length !== 0 ? this.state.productDimensions : null
                })

                this.refs.sizeCost.value = ""
                this.refs.sizeName.value = ""

                this.modalClassToggle("dontShow")
            }

            else {
                this.setState({
                    sizeIsValid: false,
                    emptyFieldInSize: validatedData.emptyField
                })
            }
        }

        else if (typeOfButtonClicked === "material") {
            
            const materialName = this.refs.materialName.value;
            const materialCost = this.state.isChecked ? this.refs.materialCost.value : 0 ;

            let validatedData = validateMaterialModal(materialName, materialCost);

            if (validatedData.isMaterialValid) {
                let temp = {
                    materialCost: materialCost,
                    materialName: materialName
                }

                // console.log("temp:", temp)

                if (temp.materialName !== "") {
                    let dummyArray = [...this.state.productMaterials]

                    if (!dummyArray.includes(temp)) {
                        this.state.productMaterials.push(temp)

                        this.setState({
                            materialIsValid: true,
                            emptyFieldInMaterial: null,
                            modalType: null,
                            isChecked: false, 
                            productMaterials: this.state.productMaterials.length !== 0 ? this.state.productMaterials : null,
                            extraCostInput: "extraCostInput hide"
                        })
                    }
                }

                this.refs.materialCost.value = ""
                this.refs.materialName.value = ""

                this.modalClassToggle("dontShow")
            }

            else {
                this.setState({
                    materialIsValid: false,
                    emptyFieldInMaterial: validatedData.emptyField
                })
            }
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleColorInput = (e) => {
        this.setState({
            colorPreview : e.target.value
        })
    }

    setTagName = (e) => {
        const val = e.target.value

        this.setState({
            charCount: 20 - val.length,
            tagName: val
        })
        // this.setState({
        //     tagName: val
        // })
    }

    addTagName = () => {

        let temp = this.state.tagName;

        if (temp !== "") {

            let dummyTagsArray = [...this.state.tagsAdded]

            dummyTagsArray = dummyTagsArray.map(item => item.toLowerCase())

            if (!dummyTagsArray.includes(temp.toLowerCase())) {
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
                                    <CloseButton />
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

    handleRadiobutton = async (e, type) => {
        const val = e.target.value;

        if (type === "productAvailability") {
            this.setState({ productAvailability: val })
        }

        else if(type === "productType") {
            this.setState({ productType: val })
        }
    }

    returnExtraCost = (type) => {
        const { extraCostInput, isChecked, materialCost, productPrice } = this.state;

        if(type === "material") {
            return (
                <div className={extraCostInput}>
                    <input
                        type="text"
                        name="materialCost"
                        placeholder="Ex. 20"
                        onChange={(e) => this.checkTypeNumber(e, "material")}
                        ref="materialCost"
                    />
                    <span className="InputSeparatorLine"> </span>
                </div>
            )
        }
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

                                    <div className="colorCategoryInnerLayerContainer">
                                        <div 
                                            className="selectedColorSection"
                                            ref = "colorPreview"
                                            style = {{background : this.state.colorPreview}}
                                            >
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
                                                            ref = "colorName"
                                                            maxLength = "30"
                                                            onChange={this.onChange}
                                                        />
                                                        <span className="InputSeparatorLine"> </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="inputFormContainer">
                                                <div className="formParaSection">
                                                    <p className="pargraphClass">
                                                        Enter the color hex-code (<a href="https://www.google.co.in/search?q=color+selector&rlz=1C1CHBF_enIN822IN822&oq=color+selector&aqs=chrome..69i57.641j0j1&sourceid=chrome&ie=UTF-8" target="_blank">click here</a> to get one)
                                                    </p>
                                                </div>
                                                <div className="productInputInfoSection">
                                                    <div className="modalMandatorySection">
                                                        <p className="madatoryHighlight">Mandatory</p>
                                                    </div>
                                                    <div className="modalInputCategory">
                                                        <input
                                                            type="text"
                                                            name="colorCode"
                                                            placeholder="Ex. #29abe2"
                                                            onChange={(e) => this.handleColorInput(e, "colorCode")}
                                                            maxLength = "7"
                                                            ref = "colorCode"
                                                        />
                                                        <span className="InputSeparatorLine"> </span>

                                                        <p>Don't forget the # before the code</p> 
                                                    </div>
                                                </div> 
                                            </div>

                                        </div>
                                    </div>
                                    <div className="proceedOrNotCheck">
                                        <GradientButton
                                            runFunction={() => {
                                                this.proceedHandler("color")
                                            }}>
                                            Proceed
                                        </GradientButton>
                                    </div>
                                    {this.displayError("color")}

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
                                                placeholder="Ex. Small / Extralarge / 2ftx3ft / any custon name"
                                                // value={this.state.sizeName}
                                                onChange={this.onChange}
                                                ref="sizeName"
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
                                                onChange={this.onChange}
                                                ref="sizeCost"
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => this.proceedHandler("size")}>
                                        Proceed
                                    </GradientButton> 
                                </div>
                                {this.displayError("size")}
                            </div>
                        </div>
                    </div>

                )
            }


            else if (modalType === "material") {
                return (

                    <div className={this.state.modalMaterial}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="vendorDashboardModal">
                                    <div className="modalHeader">
                                        <h3>Material details</h3>
                                        <div className="line"></div>
                                    </div>
                                </div>

                                <div className="inputFormContainer">
                                    <div className="formParaSection">
                                        <p className="pargraphClass">Material name</p>
                                    </div>
                                    <div className="productInputInfoSection productMaterialName">
                                        <div className="modalMandatorySection">
                                            <p className="madatoryHighlight">Mandatory</p>
                                        </div>
                                        <div className="modalInputCategory">
                                            <input
                                                type="text"
                                                name="materialName"
                                                placeholder="Ex. Glass reinforced concrete"
                                                onChange={this.onChange}
                                                ref="materialName"
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="inputFormContainer">
                                    <div className="formParaSection">
                                        <p className="pargraphClass">Extra cost for the material(over base price)</p>
                                    </div>
                                    <div className="productInputInfoSection productCostForMaterial">
                                        <div className="modalInputCategory">
                                            <input
                                                type="text"
                                                name="materialCost"
                                                placeholder="Ex. 20"
                                                onChange={this.onChange}
                                                ref="materialCost"
                                            />
                                            <span className="InputSeparatorLine"> </span>
                                        </div>
                                    </div>
                                </div> */}

                                <div className="switchContainer">
                                    <div className="labelUpperColumn">
                                        <div className="switchContainerParagraph">
                                            <p>Is there an extra cost over base price ?</p>
                                        </div>
                                        <label class="switch">
                                            <input 
                                                ref="switch"
                                                checked={this.state.isChecked}
                                                onChange={() => this.onToggleSwitch()}
                                                className="switch"
                                                type="checkbox"/>
                                            <span class="slider round"></span>
                                        </label>
                                    </div>
                                    <div className="returnInputColumn">
                                        {this.returnExtraCost("material")}
                                    </div>
                                </div>

                                <div className="errorContent">
                                    <p className={this.state.displayError}>
                                        Numbers Only
                                    </p>
                                </div>

                                <div className="proceedOrNotCheck">
                                    <GradientButton
                                        runFunction={() => this.proceedHandler("material")}
                                        >
                                        Proceed
                                    </GradientButton>
                                </div>
                                {this.displayError("material")}
                            </div>
                        </div>
                    </div>

                )
            }


            else if (modalType === "validation") {
                return (
                    <div className={this.state.modalClassToggle}>
                        <div className="dummyXClass">
                            <div className="whiteSquareForModal">
                                <div className="addProductDetailsModal">
                                    <div className="svgImageContainer">
                                        <ErrorMsgSign />
                                    </div>
                                    <div className="modalContentContainer">
                                        <div className="modalContentContainerInnerLayer">
                                            <div className="content">
                                                <h3>Please provide the following details</h3>
                                                <div className="detailsToInput">
                                                    <div className="detailsInputLayer">
                                                        <div className="notFilledSection">
                                                            {this
                                                                .state
                                                                .emptyField
                                                                .map((item, i) =>
                                                                <div
                                                                    className="errorFieldMessage"
                                                                    key={i}>
                                                                        <ul>
                                                                            <li>{item}</li>
                                                                        </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="closeModalContainer">
                                        <WhiteButton
                                            runFunction={() => this.modalClassToggle("dontShow")}
                                        >
                                            Sure, I’ll do that
                                        </WhiteButton>
                                    </div>

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
                            <header className="closeHeaderSection">
                                <div className="closeButtonContainer"
                                    onClick = {() => {
                                        this.modalClassToggle("dontShow")
                                    }}
                                    >
                                        <ModalCloseButton />
                                </div>
                            </header>
                        <div className="modalOuterWrap">
                            
                            <article className="modalContentWrap">
                                {returnModalContent()}
                            </article>
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    onToggleSwitch = async () => {
        await this.setState({ isChecked: !this.state.isChecked });

        if (this.state.isChecked === true) this.setState({ extraCostInput: "extraCostInput" });
        else if(this.state.isChecked === false) this.setState({ extraCostInput: "extraCostInput hide" });
    }

    validateProceedHandler = async () => {
       const fieldNames = [
           { fieldName: 'Product Name', value: this.state.productName },
           { fieldName: 'Product Code', value: this.state.productCode },
           { fieldName: 'Base price of this product', value: this.state.productPrice },
           { fieldName: 'Material', value: this.state.productMaterials },
           { fieldName: 'Finishing Otpions', value: this.state.finishArray },
           { fieldName: 'Color Options', value: this.state.colorArray },
           { fieldName: 'Sizes Available', value: this.state.productDimensions },
           { fieldName: 'Min. quantity', value: this.state.productMinQuantity },
           { fieldName: 'Max. quantity', value: this.state.productMaxQuantity },
           { fieldName: 'Product Design', value: this.state.productDesign },
           { fieldName: 'Product Type', value: this.state.productType },
           { fieldName: 'Product Tags', value: this.state.productTags },
           { fieldName: 'Product Availability', value: this.state.productAvailability },
           { fieldName: 'Product Discount Value', value: this.state.productDiscount }
       ]

       await this.setState({
           emptyField: []
       })

       fieldNames.map(item => {
        //    console.log(item.fieldName, typeof(item.value))
           if (item.value === undefined || item.value === null || item.value.length === 0) {
               console.log(`${item.fieldName} is in-valid`)
               if (!this.state.emptyField.includes(item.fieldName))
                   this.state.emptyField.push(item.fieldName)
           }
       })

       this.setState({
           emptyField: this.state.emptyField
       })

    //    console.log(this.state.emptyField)
       this.modalClassToggle("show");
    }

    toggleOptions = (yesOrNo) => {
        // const {} =this.refs.

        if(yesOrNo === "yes"){
            this.setState({
                checkBoxClass1 : "checkBox color",
                checkBoxClass2 : "checkBox"
            })
        }

        else if(yesOrNo === "no"){
            this.setState({
                checkBoxClass2 : "checkBox color",
                checkBoxClass1 : "checkBox",
                displayError: "displayError hide",
                productDiscount: ""
            })

            this.refs.discountInput.value = "";
        }
    }
    
    focus = () => {
        this.refs.discountInput.focus();
    }

    render() {
        return (
            <div className="vendorDashboardWrapper">
                <div className={this.state.loadingClass}>
                    <LogoAnimation
                        text="We are loading..."
                    />
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
                                                        <p className="pargraphClass">Base price of this product</p>
                                                    </div>
                                                    <div className="PricingSection">
                                                        <InputForm
                                                            refName="productPrice"
                                                            placeholder="Type here (in Rupees)"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="30"
                                                            result={(val) => {
                                                                this.setState({
                                                                    productPrice: val
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="inputFormContainer">
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
                                                </div> */}

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Material</p>
                                                    </div>
                                                    <div className="ProductMaterialSection">

                                                        {this.returnProductMaterials()}

                                                    </div>

                                                    <div className="buttonContainer">

                                                        <WhiteButton
                                                            runFunction={() => {
                                                                this.modalClassToggle("show")
                                                                this.setState({
                                                                    modalType: "material"
                                                                })
                                                            }}
                                                        >
                                                            <div className="svgImageContainer">
                                                                <PlusButtonIcon />
                                                            </div>
                                                            Add new material
                                                        </WhiteButton>
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
                                                        <p 
                                                            className="pargraphClass"
                                                            // onClick = {() => console.log(this.state.colorArray)}
                                                            > Color options </p>
                                                    </div>

                                                    <div className="colorSelectionContainer">
                                                        <div className="addColorDummyContainer">
                                                            <div className="addColorDummyContainerInnerLayer">
                                                                <div 
                                                                    className="addButtonContainer"
                                                                    onClick={() => {
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

                                                                    <p>Add new</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {this.returnColorModule()}
                                                    </div>

                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Sizes available</p>
                                                    </div>
                                                    <div className="productSizeDescriptionOuterLayer">

                                                        {this.returnProductDimensions()}

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
                                                        {/* <div className="prodDimensionHolder">
                                                            {this.returnProductDimensions()}
                                                        </div> */}
                                                    </div>
                                                </div>

                                                 <div className="inputFormContainer">
                                                     <div className="formParaSection">
                                                         <p className="pargraphClass">Min.quantity</p>
                                                     </div>
                                                     <div className="ProductQuantitySection">
                                                         <InputForm
                                                            refName="productMinQuantity"
                                                            placeholder="Ex. 5"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="20"
                                                            value={this.state.productMinQuantity ? this.state.productMinQuantity : null}
                                                            result={(val) => this.setState({
                                                                productMinQuantity: val
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
                                                            placeholder="Ex. 99999"
                                                            isMandatory={true}
                                                            validationType="onlyNumbers"
                                                            characterCount="20"
                                                            result={(val) => this.setState({
                                                                productMaxQuantity: val
                                                            })}
                                                        />
                                                    </div>
                                                </div>

                                                
                                                {/* <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Min. Quantity</p>
                                                    </div>
                                                    
                                                    <div className="productQunatityWrap inputCategorySection">
                                                        <div className="productInputInnerLayer">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>
                                                            <div className="inputColumn">
                                                                <div className="numberInputSection inputColumnInnerLayer">
                                                                    <input
                                                                        type="text"
                                                                        ref="productMinQuantity"
                                                                        pattern="[0-9]*"
                                                                        placeholder="Ex. 5"
                                                                        value={this.state.productMinQuantity}
                                                                        onChange={(e) => this.handleQuantity(e, "min")}
                                                                    />
                                                                    <span className="InputSeparatorLine"> </span>
                                                                    <div className={this.state.minQuantityPara}>
                                                                        <p>This information is required (in numbers)</p>
                                                                    </div>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass">Max. Quantity</p>
                                                    </div>
                                                    
                                                    <div className="productQunatityWrap inputCategorySection">
                                                        <div className="productInputInnerLayer">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>

                                                          
                                                            <div className="inputColumn">
                                                                <div className="numberInputSection inputColumnInnerLayer">
                                                                    <input
                                                                        type="text"
                                                                        ref="productMinQuantity"
                                                                        pattern="[0-9]*"
                                                                        placeholder="Ex. 999"
                                                                        value={this.state.productMaxQuantity}
                                                                        onChange={(e) => this.handleQuantity(e, "max")}
                                                                    />
                                                                    <span className="InputSeparatorLine"> </span>  
                                                                    <div className={this.state.maxQuantityPara}>
                                                                        <p>This information is required (in numbers)</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                </div> */}

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
                                                        refName="featureName"
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
                                                            refName="featureName"
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
                                                        <h3 className="pargraphClass"> Choose the product’s design style </h3>
                                                    </div>

                                                    <div className="designStyleCategoryTagsContainer">
                                                        <div className="designStyleTagsInnerLayer">
                                                            {this.returnStyleContentAdded()}
                                                        </div>
                                                    </div>

                                                    <div className="designStylesOuterLayer">
                                                        <div className="designStylesInnerLayer">
                                                            {this.returnCategoryContent()} 
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Add tags for your product </p>
                                                    </div>

                                                    <div className="inputCategoryTagSection">
                                                        <div className="tagInputContainer">

                                                            <div className="materialInfoColumn">
                                                                <input
                                                                    placeholder="For Ex. Sofa"
                                                                    ref="tagInput"
                                                                    type="text"
                                                                    maxLength="20"
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


                                                        <div className="productTagsCategory">
                                                            <div className="productTagsCategoryInnerLayer">
                                                                {this.returnTagsAdded()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Choose the product type </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <RadioButton
                                                            title="Product Design"
                                                            name={'productType'}
                                                            options={this.returnProductType()}
                                                            selectedOption={this.state.productType}
                                                            onChange={(e) => this.handleRadiobutton(e, "productType")}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Is the product available? </p>
                                                    </div>

                                                    <div className="materialInfoColumn">
                                                        <RadioButton
                                                            title="Product Availability"
                                                            name={'availability'}
                                                            options={this.returnProductAvailability()}
                                                            selectedOption={this.state.productAvailability}
                                                            onChange={(e) => this.handleRadiobutton(e, "productAvailability")}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="inputFormContainer">
                                                    <div className="formParaSection">
                                                        <p className="pargraphClass"> Is there a discount on this product now? </p>
                                                    </div>

                                                    <div 
                                                        className="materialInfoColumn"
                                                        >

                                                        <div 
                                                            className="optionDiv"
                                                            onClick = {() => {
                                                                this.toggleOptions("yes")
                                                                this.focus()
                                                            }}
                                                            >
                                                            <div className={this.state.checkBoxClass1}></div>
                                                            <div className="contentForOptionSelection">
                                                                <div className="nonErrorContent">
                                                                    <p>Yes, we are offering a discount of</p>
                                                                    <div className="inputSection">
                                                                        <input 
                                                                            type="text" 
                                                                            ref="discountInput"
                                                                            maxLength="2"
                                                                            value={this.state.value} 
                                                                            onChange={(e) => this.checkTypeNumber(e, "discount")}
                                                                        />
                                                                        <p>%</p>
                                                                    </div>
                                                                </div>
                                                                <div className="errorContent">
                                                                    {/* <p className={this.state.displayError}>
                                                                        Some error text to be.Some error text to be.Some error text to be.
                                                                    </p> */}
                                                                    <p className={this.state.displayError}>
                                                                        Numbers Only
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div 
                                                            className="optionDiv"
                                                            onClick={() => {
                                                                this.toggleOptions("no")

                                                            }}
                                                            >
                                                            <div className={this.state.checkBoxClass2}></div>
                                                            <div className="contentForOptionSelection">
                                                                <p>No, there is no discount</p>
                                                            </div>
                                                        </div>
                                                    </div>
    
                                                </div>
                                            </div>
                                        </section>

                                        <div className="formButtonContainer">
                                            <div className="buttonContainer">
                                                <GradientButton
                                                    runFunction={() => 
                                                        { this.validateProceedHandler()
                                                            this.modalClassToggle("show")
                                                            this.setState({
                                                                modalType : "validation"
                                                            })                    
                                                        }}>
                                                    Proceed
                                                </GradientButton>
                                            </div>
                                        </div>

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