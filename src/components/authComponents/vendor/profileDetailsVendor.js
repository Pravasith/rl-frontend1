import React from "react"

import "../../../assets/sass/vendor_form.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"


import LogoAnimation from "../../animations/logoAnimation"
import statesAndCities from "../../../lib/statesAndCities"

import { TableIcon, MinusImageIcon, PlusImageIcon,BigCloseButton,ErrorMsgSign, UploadImageIcon } from "../../../assets/images"
import { GradientButton, InputForm, RadioButton, WhiteButton } from "../../UX/uxComponents"

import Navbar from "../../navbar/navbar"
import { Footer } from "../../footer/footer"
import { getUserData } from "../../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../../actions/generalActions";
import { api } from "../../../actions/apiLinks";
import { encryptData, decryptData } from "../../../factories/encryptDecrypt"
import ImageUploader from "../../UX/imageUploader";

class ProfileDetailsVendor extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',

            redirect: false,

            firstName: null,
            lastName: null,

            warningClass: 'warningClass hide',
            warningText: null,

            modalClassToggle: "modalBackgroundMainOuterWrap blurClass",
            vendorFormOuterSectionClass: "vendorFormOuterSection",

            yearCount: 0,
            monthCount: 0,
            experienceCount: '',

            // state of chechAnswered
            // inputCountOne: 0,
            // inputCountTwo: 0,
            // inputCountThree: 0,
            // inputCountFour: 0,
            // inputCountFive: 0, 
            // inputCountSix: 0,
            // inputCountSeven: 0,
            // inputCountEight: 0,
            // inputCountNine: 0,

            expOptions: [
                {
                    id: 1,
                    value: "0-1"
                },
                {
                    id: 2,
                    value: "1-2"
                },
                {
                    id: 3,
                    value: "2-5"
                },
                {
                    id: 4,
                    value: "5-10"
                },
                {
                    id: 5,
                    value: "10-15"
                },
                {
                    id: 6,
                    value: "15-20"
                },
                {
                    id: 7,
                    value: "20-30"
                },
                {
                    id: 8,
                    value: "30+"
                }
            ],

            emptyField: [],

            companyName: null,

            modalClassToggle: "modalBackgroundMainOuterWrap hide",
        }
    }

    componentDidMount = () => {

        this.props.getUserData()
            .then((data) => {
                let { userData } = this.props

                //
                // DECRYPT REQUEST DATA
                // 
                let decryptedData = decryptData(
                    userData.responseData
                )
                //
                // DECRYPT REQUEST DATA
                //

                this.setState({
                    loadingClass: 'loadingAnim hide',
                    mainClass: 'mainClass',

                    firstName: decryptedData.firstName,
                    lastName: decryptedData.lastName,
                    mobileNo: decryptedData.mobileNo,
                    whatsappNo: decryptedData.whatsappNo
                })

                this.props.hitApi(api.GET_VENDOR_DATA, "GET")
                    .then((data) => {
                        let { responseData } = this.props

                        // console.log(responseData.responsePayload)

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

                            let gstInState = {}

                            const getIndividualGSTINs = () => {
                                if (decryptedData.GSTIN)
                                    decryptedData.GSTIN.split('-').map((item, i) => {
                                        gstInState["gstIn" + (i + 1)] = item
                                    })
                            }

                            if (decryptedData.GSTIN !== undefined || decryptedData.GSTIN !== null) {
                                getIndividualGSTINs()
                            }

                            // console.log("GSTIN STATE", gstInState)

                            console.log(decryptedData)

                            this.setState({

                                companyName: decryptedData.companyName,

                                // hNo: decryptedData.address.hNo,
                                // stNo: decryptedData.address.stNo,
                                detailedAddressLine1: decryptedData.address.detailedAddressLine1,
                                detailedAddressLine2: decryptedData.address.detailedAddressLine2,
                                state: decryptedData.address.state,
                                city: decryptedData.address.city,
                                pincode: decryptedData.address.pincode,

                                companyDescriptionLine1: decryptedData.companyDescriptionLine1,
                                companyDescriptionLine2: decryptedData.companyDescriptionLine2,

                                // yearCount: decryptedData.experience.years,
                                // monthCount: decryptedData.experience.months,
                                experienceCount: decryptedData.experience.years,

                                gstIn: decryptedData.GSTIN,
                                pan: decryptedData.PAN,

                                companyProfilePicture: decryptedData.companyProfilePicture,

                                ...gstInState
                            })
                        }
                    })
                    .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
            
    }

    // decreaseValue = (yearOrMonth) => {
    //     if (yearOrMonth === "year" && this.state.yearCount > 0){
    //         this.updateVendorData("experience.years", this.state.yearCount - 1)
    //         this.setState({
    //             yearCount : this.state.yearCount - 1
    //         })
    //     }

    //     if (yearOrMonth === "month" && this.state.monthCount > 0) {
    //         this.updateVendorData("experience.months", this.state.monthCount - 1)
    //         this.setState({
    //             monthCount: this.state.monthCount - 1
    //         })
    //     }
    // }

    // increaseValue = (yearOrMonth) => {
    //     if (yearOrMonth === "year" && this.state.yearCount < 100) {
    //         this.updateVendorData("experience.years", this.state.yearCount + 1)
    //         this.setState({
    //             yearCount: this.state.yearCount + 1
    //         })
    //     }

    //     if (yearOrMonth === "month" && this.state.monthCount < 12) {
    //         this.updateVendorData("experience.months", this.state.monthCount + 1)
    //         this.setState({
    //             monthCount: this.state.monthCount + 1
    //         })
    //     }
    // }

    // my code for checking answered questions
    // checkAnsweredOne = () => {
    //     if (this.state.firstName !== null && this.state.lastName !== null && this.state.inputCountOne !== 1) {
    //         console.log("Name wrks")
    //         this.setState({
    //             inputCountOne: this.state.inputCountOne + 1
    //         })
    //     } 
        
    //     return this.state.inputCountOne;
    // }

    // checkAnsweredTwo = () => {
    //     if (this.state.companyName !== null && this.state.inputCountTwo !== 1) {
    //         console.log("Comapny wrks")
    //         this.setState({
    //             inputCountTwo: this.state.inputCountTwo + 1
    //         })
    //     }

    //     return this.state.inputCountTwo;
    // }

    // checkAnsweredThree = () => {
    //     if (this.state.mobileNo !== null && this.state.inputCountThree !== 1) {
    //         console.log("Contact wrks")
    //         this.setState({
    //             inputCountThree: this.state.inputCountThree + 1
    //         })
    //     } 
        
    //     return this.state.inputCountThree;
    // }

    // checkAnsweredFour = () => {
    //     if (this.state.hNo !== null 
    //             && this.state.stNo !== null 
    //             && this.state.detailedAddressLine1 !== null 
    //             && this.state.state !== null
    //             && this.state.city !== null
    //             && this.state.pincode !== 0
    //             && this.state.inputCountFour !== 1) {

    //         console.log("Address wrks")
    //         this.setState({
    //             inputCountFour: this.state.inputCountFour + 1
    //         })
    //     } 
        
    //     return this.state.inputCountFour;
    // }

    // checkAnsweredFive = () => {
    //     if (this.state.companyDescriptionLine1 !== null && this.state.inputCountFive !== 1) {
    //         console.log("Company Desc wrks")
    //         this.setState({
    //             inputCountFive: this.state.inputCountFive + 1
    //         })
    //     } 
        
    //     return this.state.inputCountFive;
    // }

    // checkAnsweredSix = () => {
    //     if (this.state.yearCount !== 0 && this.state.monthCount !== 0 && this.state.inputCountSix !== 1) {
    //         console.log("Exp wrks")
    //         this.setState({
    //             inputCountSix: this.state.inputCountSix + 1
    //         })
    //     } 
        
    //     return this.state.inputCountSix;
    // }

    // checkAnsweredSeven = () => {
    //     if (this.state.gstIn !== null && this.state.inputCountSeven !== 1) {
    //         console.log("GST wrks")
    //         this.setState({
    //             inputCountSeven: this.state.inputCountSeven + 1
    //         })
    //     } 
        
    //     return this.state.inputCountSeven;
    // }

    // checkAnsweredEight = () => {
    //     if (this.state.pan !== null && this.state.inputCountEight !== 1) {
    //         console.log("Pan wrks")
    //         this.setState({
    //             inputCountEight: this.state.inputCountEight + 1
    //         })
    //     } 
        
    //     return this.state.inputCountEight;
    // }

    // checkAnsweredNine = () => {
    //     if (this.state.companyProfilePicture !== null && this.state.inputCountNine !== 1) {
    //         console.log("CompanyPP wrks")
    //         this.setState({
    //             inputCountNine: this.state.inputCountNine + 1
    //         })
    //     } 
        
    //     return this.state.inputCountNine;
    // }

    // my code
    // returnInputCount = () => {
    //     const {
    //         inputCountOne,
    //         inputCountTwo,
    //         inputCountThree,
    //         inputCountFour,
    //         inputCountFive,
    //         inputCountSix, 
    //         inputCountSeven,
    //         inputCountEight, 
    //         inputCountNine 
    //         } = this.state;
        
    //     let totalAnswered = inputCountOne + inputCountTwo + inputCountThree 
    //                         + inputCountFour + inputCountFive + inputCountSix 
    //                         + inputCountSeven + inputCountEight + inputCountNine ;

    //     return totalAnswered;
    // }


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

    


    onChangeGST = async (event, gstPart) => {
        const val = event.target.value;

        if (val.length === event.target.maxLength) {

            this.refs[gstPart].focus();

                const { gstIn1, gstIn2, gstIn3, gstIn4, gstIn5 } = this.refs;
                const gstIn = `${gstIn1.value}-${gstIn2.value}-${gstIn3.value}-${gstIn4.value}-${gstIn5.value}`;

                let gstInForCheck = `${gstIn1.value}${gstIn2.value}${gstIn3.value}${gstIn4.value}${gstIn5.value}`;
                    gstInForCheck = gstInForCheck.toUpperCase()
            
                // console.log(gstInForCheck.length)

                if (gstInForCheck.length === 15) {

                    if (/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstInForCheck)) {
                        
                        this.updateVendorData("GSTIN", gstIn)
                        this.setState({
                            gstIn: gstIn,
                            warningText: "please check and fill all the fields",
                            warningClass: 'warningClass hide'
                        })
                    }
                    else {
                        this.setState({
                            warningText: "please check your entered GST once",
                            warningClass: 'warningClass'
                        })
                    }
                }
                else if (gstInForCheck.length !== 15) {
                    this.setState({
                        warningText: "please check and fill all the fields",
                        warningClass: 'warningClass'
                    })
                }
            } 
        }  

    noSpaces = (e) => {
        // console.log("Wrks")
        if (e.target.value.match(/\s/g)) {
            this.setState({
                warningText: "Sorry, you are not allowed to enter any spaces",
                warningClass: 'warningClass'
            })
            e.target.value = e.target.value.replace(/\s/g, '');
        }
    }

    clearGSTfields = () => {
        this.refs.gstIn1.value = ""
        this.refs.gstIn2.value = ""
        this.refs.gstIn3.value = ""
        this.refs.gstIn4.value = ""
        this.refs.gstIn5.value = ""

        this.setState({
            gstIn: ""
        })
    }

    returnStatesOfIndia = () => {
        const array = [ ...statesAndCities ]

        return array.map((item, i) => (
            <option
                key={i}
                value={item.state}
                >
                { item.state }
            </option>
        ))
    }

    returnStateValue = () => {
        if(this.state.state)
            return this.state.state
        
        else
            return "548784154874648746"
    }

    returnCityValue = () => {
        if (this.state.city)
            return this.state.city

        else
            return "548784154874648746"
    }

    handleStateSelection = (e) => {
        const val = e.target.value

        this.changeCityList(val)
        this.updateVendorData("address.state", val)
    }

    handleCitySelection = (e) => {
        const val = e.target.value

        this.updateVendorData("address.city", val)
    }

    changeCityList = (theState) => {
        let statesArray = [...statesAndCities]

        let citiesArray = []

        statesArray.map((item, i) => {
            if (theState === item.state) {
                citiesArray = [...item.cities]
            }
        })

        this.setState({
            statesList: [...citiesArray]
        })

    }

    returnCitiesOfIndia = () => {
        if (this.state.statesList) {
            return [...this.state.statesList].map((item, i) => (
                <option
                    key={i}
                    value={item}
                    >
                    {item}
                </option>
            ))
        }

        else if (!this.state.statesList) {
            return <option
                value={"PLEASE_SELECT_STATE"}
                >
                Please select a state above
            </option>
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

                //
                // Decrypt data
                //
                const decryptedData = decryptData(this.props.responseData.responsePayload.responseData)
                //
                // Decrypt data
                //

                // console.log(decryptedData)

                this.setState({
                    firstName: decryptedData.firstName,
                    lastName: decryptedData.lastName,
                    mobileNo: decryptedData.mobileNo,
                    whatsappNo: decryptedData.whatsappNo
                })
            })

    }

    updateVendorData = (objectName, data) => {

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

        this
            .props
            .hitApi(api.UPDATE_VENDOR_DATA, "PUT",
                {
                    message: "Update vendor's data",
                    requestData: encryptedData
                }
            )
            .then(() => {
                this
                    .props
                    .navBarLoadingAnimationShowHide(false)

                //
                // Decrypt data
                //
                const decryptedData = decryptData(this.props.responseData.responsePayload.responseData)
                //
                // Decrypt data
                //

                console.log(decryptedData)

                this.setState({

                    companyName: decryptedData.companyName,

                    detailedAddressLine1: decryptedData.address.detailedAddressLine1,
                    detailedAddressLine2: decryptedData.address.detailedAddressLine2,
                    state: decryptedData.address.state,
                    city: decryptedData.address.city,
                    pincode: decryptedData.address.pincode,

                    companyDescriptionLine1: decryptedData.companyDescriptionLine1,
                    companyDescriptionLine2: decryptedData.companyDescriptionLine2,

                    experienceCount: decryptedData.experience.years,

                    gstIn: decryptedData.GSTIN,
                    pan: decryptedData.PAN,

                    companyProfilePicture: decryptedData.companyProfilePicture
                })
            })
            .catch(e => console.error(e))
    }


    returnImageUploader = () => {

        if(this.state.companyProfilePicture){
            // console.log("is not empty", this.state.companyProfilePicture)
            return (
                <ImageUploader
                    imageType = "regularImage" // regularImage || profileImage
                    resultData = {val => this.updateVendorData("companyProfilePicture", val.imageURL)}
                    showInitialImage = {this.state.companyProfilePicture}
                />
            )
        }

        else{
            // console.log("is empty", this.state.companyProfilePicture)
            return (
                <div>
                    <ImageUploader
                        imageType = "regularImage" // regularImage || profileImage
                        resultData = {val => this.updateVendorData("companyProfilePicture", val.imageURL)}
                        showInitialImage = {this.state.companyProfilePicture}
                    />
                </div>
            )
        }
        
    }

    handleRadiobutton = (e) => {
        const val = e.target.value;

        this.updateVendorData("experience.years", val)
        this.setState({ experienceCount: e.target.value })
    }

    proceedHandler = async () => {

        const fieldNames =  [
            { fieldName: 'first name', value: this.state.firstName },
            { fieldName: 'last name', value: this.state.lastName },
            { fieldName: 'mobile number', value: this.state.mobileNo },
            { fieldName: 'company name', value: this.state.companyName }, 
            { fieldName: "your company address", value: this.state.detailedAddressLine1 },
            { fieldName: 'state', value: this.state.state },
            { fieldName: 'city', value: this.state.city },
            { fieldName: 'pincode', value: this.state.pincode },
            { fieldName: 'description about your company', value: this.state.companyDescriptionLine1 },
            { fieldName: 'your experience in the industry', value: this.state.experienceCount },
            { fieldName: "your company's GST identification number", value: this.state.gstIn },
            { fieldName: "your company's PAN number", value: this.state.pan },
            { fieldName: "your company's logo", value: this.state.companyProfilePicture }
        ]


        console.log(fieldNames)


        await this.setState({
            emptyField : []
        })

        fieldNames.map(item => {
            // console.log(item.fieldName, item.value)
            if (item.value === null || item.value === "" || item.value === 0 || item.value === undefined) {
                if(!this.state.emptyField.includes(item.fieldName))
                        this.state.emptyField.push(item.fieldName)
            }
        })

        this.setState({
            emptyField: this.state.emptyField
        })

        this.modalClassToggle("show");

        if(this.state.emptyField.length === 0) {    

            this.modalClassToggle("dontShow");
            this.setState({
                loadingClass: 'loadingAnim',
                mainClass: 'mainClass hide',
            })
            
            const finalVendorDataToSend = {
                companyName : this.state.companyName,
                address : {
                    detailedAddressLine1 : this.state.detailedAddressLine1,
                    detailedAddressLine2 : this.state.detailedAddressLine2,
                    state : this.state.state,
                    city : this.state.city,
                    pincode : this.state.pincode,
                },
                companyDescriptionLine1: this.state.companyDescriptionLine1,
                companyDescriptionLine2: this.state.companyDescriptionLine2,
                experience : {
                    years : this.state.experienceCount,
                },
                GSTIN : this.state.gstIn,
                PAN: this.state.pan,
                companyProfilePicture: this.state.companyProfilePicture
            }

            const finalUserDataToSend = {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                mobileNo : this.state.mobileNo,
                whatsappNo : this.state.whatsappNo
            }

            // 
            // Encrypt data
            // 
            const encryptedUserData = encryptData(finalUserDataToSend)
            const encryptedVendorData = encryptData(finalVendorDataToSend)
            // 
            // Encrypt data
            // 

            this.props.hitApi(api.UPDATE_USER_DATA, "PUT", {
                message : "Update firstname, lastname, mobile number and whatsapp number",
                requestData : encryptedUserData
            })
            .then(() => {

                // 
                // Decrypt data
                // 
                const decryptedUserData = decryptData(this.props.responseData.responsePayload.responseData)
                // 
                // Decrypt data
                // 

                this.props.hitApi(api.UPDATE_VENDOR_DATA, "PUT", {
                    message : "Update vendor details",
                    requestData : encryptedVendorData
                })

                .then(() => {
                    // 
                    // Decrypt data
                    // 
                    const decryptedVendorData = decryptData(this.props.responseData.responsePayload.responseData)
                    // 
                    // Decrypt data
                    // 

                    window.open("/vendor-main-dashboard", "_self")
                })
                .catch (e => console.error(e))

                // this.setState({
                //     mainClass : "mainClass",
                //     loadingClass : "loadingClass hide"
                // })

                

                
            })
            .catch (e => console.error(e))

            // console.log(finalUserDataToSend, finalVendorDataToSend)          
            
        }
        

    }

    modalClassToggle = (showOrNot) => {
        if (showOrNot === "show")
            this.setState({
                modalClassToggle: "modalBackgroundMainOuterWrap",
                mainClass: "mainClass blurClass",
            })

        else if (showOrNot === "dontShow")
            this.setState({
                modalClassToggle: "modalBackgroundMainOuterWrap hide",
                mainClass: "mainClass",
            })
    }

    returnValidationModal = () => {
        const { emptyField } = this.state;

        if (emptyField.length !== 0) {
            return (
                <div className={this.state.modalClassToggle}>
                    <div className="dummyXClass">
                        <div className="whiteSquareForModal">
                            <div className="vendorProfileDetailsModal">
                                <div className="svgImageContainer">
                                    <ErrorMsgSign />
                                </div>
                                <div className="modalContentContainer">
                                    <div className="modalContentContainerInnerLayer">
                                        <div className="contentMissingValues">
                                            <h3>Please provide these details</h3>
                                            <div className="detailsToInput">
                                                <div className="detailsInputLayer">
                                                    {emptyField
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
                                <div className="closeModalContainer">
                                    <WhiteButton
                                        runFunction={() => {
                                            this.modalClassToggle("dontShow")
                                        }}
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

    render() {

        return (
            <div className="bigWrapper">

                <div className={this.state.loadingClass}>
                    <LogoAnimation 
                        text = "We're loading your page..."
                    />
                </div>

                <div className={this.state.mainClass}>
                    <div className="dummyLayer">
                        <article className="vendorProfileDetailsOuterwrapper">

                            <Navbar
                                userData={this.returnNavBarData()}
                            />

                            <header className="vendorHeaderClass">
                                <h3 className="vendorHeaderSection"> Okay, let's finish a simple form</h3>
                                <div className="line"></div>
                            </header>

                            <section className= "vendorFormOuterSection">

                                <div className="vendorInnerSection">
                                    <div className="leftSection">
                                            <div className="leftSectionInnerLayer">
                                                <div className="iconWrapper">
                                                    <TableIcon />
                                                </div>

                                            {/* <div className="formCompletionInfoSection">
                                                <div className="outerLayer">
                                                    <h3
                                                        
                                                    >
                                                        <span>{this.returnInputCount()}/9</span>Questions answered
                                                    </h3>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>

                                    <div className="rightFormSection">
                                        <div className="formSectionInnerLayer">

                                            <form action="" className="vendorForm">

                                            <div 
                                                className="formInputContainer"
                                                // onBlur={() => this.checkAnsweredOne()}
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>1</h3>
                                                        <p>Your name as you would like your customers to call you?</p>
                                                    </div>

                                                        <div className="firstNameWrap">
                                                            <InputForm
                                                                refName="firstName"
                                                                placeholder="First name"
                                                                isMandatory={true}
                                                                validationType="alphabetsAndSpecialCharacters"
                                                                characterCount="15"
                                                                value={this.state.firstName ? this.state.firstName : null}
                                                                result={(val) => this.hitTheAPI("firstName", val)}
                                                            />
                                                        </div>

                                                        <div className="lastNameWrap">
                                                            <InputForm
                                                                refName="lastName"
                                                                placeholder="Last name"
                                                                isMandatory={true}
                                                                validationType="alphabetsAndSpecialCharacters"
                                                                characterCount="15"
                                                                value={this.state.lastName ? this.state.lastName : null}
                                                                result={(val) => this.hitTheAPI("lastName", val)}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                                

                                            <div 
                                                className="formInputContainer"
                                                // onBlur={() => this.checkAnsweredTwo()}
                                            >
                                                <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3> 2 </h3>
                                                            <p> What should we call your company as? </p>
                                                        </div>

                                                        <div className="companyNameWrap">
                                                            <InputForm
                                                                refName="companyName"
                                                                placeholder="Type your company name here"
                                                                isMandatory={true}
                                                                validationType="alphabetsSpecialCharactersAndNumbers"
                                                                characterCount="50"
                                                                value={this.state.companyName}
                                                                result={(val) => this.updateVendorData("companyName", val)}
                                                            />
                                                        </div>
                                                    
                                                </div>
                                            </div>

                                            <div 
                                                className="formInputContainer"
                                                // onBlur={() => this.checkAnsweredThree()}
                                            >
                                                <div className="formInputInnerLayer">

                                                {/* <div className="formInputContainer">
                                                    <div className="formInputInnerLayer"> */}

                                                        <div className="formParaSection">
                                                            <h3>3</h3>
                                                            <p>Your phone number</p>
                                                        </div>

                                                        <div className="phoneNoWrap">
                                                            <InputForm
                                                                refName="phoneNo"
                                                                placeholder="10 digit Official contact number"
                                                                isMandatory={true}
                                                                validationType="onlyNumbers"
                                                                characterCount="10"
                                                                value={
                                                                    this.state.mobileNo
                                                                        ? this.state.mobileNo
                                                                        : null
                                                                }
                                                                result={(val) => this.hitTheAPI("mobileNo", val)}
                                                            />
                                                        </div>

                                                        <div className="whatsappNoWrap">
                                                            <InputForm
                                                                refName="whatsappNo"
                                                                placeholder="10 digit Whatsapp number"
                                                                isMandatory={false}
                                                                validationType="onlyNumbers"
                                                                characterCount="10"
                                                                value={
                                                                    this.state.whatsappNo
                                                                        ? this.state.whatsappNo
                                                                        : null
                                                                }
                                                                result={(val, isValid) => this.hitTheAPI("whatsappNo", val)}
                                                            />
                                                        </div>
                                                    </div>
                                            </div>

                                            <div 
                                                className="formInputContainer"
                                                // onBlur={() => this.checkAnsweredFour()}
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>4</h3>
                                                        <p>Tell us your company address. We’ll bill the customer with this address</p>
                                                    </div>
                                                

                                                {/* <div className="formInputContainer">
                                                    <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>4</h3>
                                                            <p>Tell us your company address. We’ll bill the customer with this address</p>
                                                        </div> */}

                                                        {/* <div className="houseNoWrap">
                                                            <InputForm
                                                                refName="houseNo"
                                                                placeholder="H.No/Flat no."
                                                                isMandatory={true}
                                                                validationType="alphabetsSpecialCharactersAndNumbers"
                                                                characterCount="15"
                                                                value={this.state.hNo ? this.state.hNo : null}
                                                                result={val => this.updateVendorData("address.hNo", val)}
                                                            />
                                                        </div>

                                                        <div className="StreetNoWrap">
                                                            <InputForm
                                                                refName="streetNo"
                                                                placeholder="Street No."
                                                                isMandatory={true}
                                                                validationType="alphabetsSpecialCharactersAndNumbers"
                                                                characterCount="15"
                                                                value={this.state.stNo ? this.state.stNo : null}
                                                                result={val => this.updateVendorData("address.stNo", val)}
                                                            />
                                                        </div> */}

                                                        <div className="detailedAddressLineWrap">
                                                            <InputForm
                                                                refName="detailedAddressLineOne"
                                                                placeholder="Detailed address - line 1"
                                                                isMandatory={true}
                                                                validationType="alphabetsSpecialCharactersAndNumbers"
                                                                characterCount="100"
                                                                value={this.state.detailedAddressLine1 ? this.state.detailedAddressLine1 : null}
                                                                result={val => this.updateVendorData("address.detailedAddressLine1", val)}
                                                            />
                                                        </div>

                                                        <div className="detailedAddressLineWrap">
                                                            <InputForm
                                                                refName="detailedAddressLineTwo"
                                                                placeholder="Detailed address - line 2"
                                                                isMandatory={false}
                                                                validationType="alphabetsSpecialCharactersAndNumbers"
                                                                characterCount="100"
                                                                value={this.state.detailedAddressLine2 ? this.state.detailedAddressLine2 : null}
                                                                result={val => this.updateVendorData("address.detailedAddressLine2", val)}
                                                            />
                                                        </div>

                                                        <div className="selectionInputCategory inputCategorySection">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>

                                                            <div className="customSelectOption">
                                                                <select
                                                                    name="statesOfIndia"
                                                                    id="statesOfIndia"
                                                                    defaultValue={this.returnStateValue()}
                                                                    onChange={(e) => this.handleStateSelection(e)}
                                                                >
                                                                    <option value="548784154874648746">Choose state</option>
                                                                    {this.returnStatesOfIndia()}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="selectionInputCategory inputCategorySection">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>

                                                            <div className="customSelectOption">
                                                                <select
                                                                    name="citiesOfIndia"
                                                                    id="citiesOfIndia"
                                                                    defaultValue= { this.returnCityValue() }
                                                                    onChange={(e) => this.handleCitySelection(e)}
                                                                >
                                                                    <option value="548784154874648746">Choose city</option>
                                                                    {this.returnCitiesOfIndia()}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="pinCodeWrap">
                                                            <InputForm
                                                                refName="Pincode"
                                                                placeholder="Pincode"
                                                                isMandatory={true}
                                                                validationType="onlyNumbers"
                                                                characterCount="6"
                                                                value={this.state.pincode ? this.state.pincode : null}
                                                                result={val => this.updateVendorData("address.pincode", val)}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>

                                            <div 
                                                className="formInputContainer"
                                                // onBlur={() => this.checkAnsweredFive()}
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>5</h3>
                                                        <p>Small Description about your company</p>
                                                    </div>
                                                    <div className="companyDescriptionWrap">
                                                        <InputForm
                                                            refName="companyDescriptionOne"
                                                            placeholder="You can show off a little here, write something great about your company"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            value={this.state.companyDescriptionLine1 ? this.state.companyDescriptionLine1 : null}
                                                            result={val => this.updateVendorData("companyDescriptionLine1", val)}
                                                        />
                                                    </div>
                                                    <div className="companyDescriptionWrap">
                                                        <InputForm
                                                            refName="companyDescriptionTwo"
                                                            placeholder="For example - We sell the toughest and most transparent glass panels in India"
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            value={this.state.companyDescriptionLine2 ? this.state.companyDescriptionLine2 : null}
                                                            result={val => this.updateVendorData("companyDescriptionLine2", val)}
                                                        />
                                                    </div>

                                                    </div>
                                                </div>

                                            <div 
                                                className="formInputContainer"
                                                // onClick={() => this.checkAnsweredSix()}
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>6</h3>
                                                        <p>How long have you been in this industry?</p>
                                                    </div>
                                                    <div className="experienceSection inputCategorySection">
                                                        <div className="mandatorySection">
                                                            <p>Mandatory</p>
                                                        </div>
                                                        <div className="radioButtonSelection">
                                                            <div className="radioButtonSelectionInnerLayer">
                                                                <RadioButton
                                                                    title="Testing"
                                                                    name={'experience'}
                                                                    options={this.state.expOptions}
                                                                    selectedOption={this.state.experienceCount}
                                                                    onChange={this.handleRadiobutton}
                                                                />
                                                            </div>
                                                        </div>  
                                                    </div>

                                                        
                                                        {/* <div className="industryTimeWrap">
                                                            <div className="timeWrap inputCategorySection">
                                                                <div className="mandatorySection">
                                                                    <p>Mandatory</p>
                                                                </div>

                                                                <div className="inputColumn">
                                                                    <div className="numberInputSection inputColumnInnerLayer">
                                                                        <div
                                                                            className="plusAndMinusWrap"
                                                                            onClick={() => this.decreaseValue("year")}
                                                                            >
                                                                            <MinusImageIcon />
                                                                        </div>

                                                                        <div className="numberSection">
                                                                            <p>{this.state.yearCount}</p>
                                                                        </div>

                                                                        <div
                                                                            className="plusAndMinusWrap"
                                                                            onClick={() => this.increaseValue("year")}
                                                                            >
                                                                            <PlusImageIcon />
                                                                        </div>

                                                                        <div className="yearSelectionCategory">
                                                                            <p>Years</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="timeWrap inputCategorySection">

                                                                <div className="inputColumn monthsColumn">
                                                                    <div className="numberInputSection inputColumnInnerLayer">
                                                                        <div
                                                                            className="plusAndMinusWrap"
                                                                            onClick={() => this.decreaseValue("month")}
                                                                        >
                                                                            <MinusImageIcon />
                                                                        </div>

                                                                        <div className="numberSection">
                                                                            <p>{this.state.monthCount}</p>
                                                                        </div>

                                                                        <div
                                                                            className="plusAndMinusWrap"
                                                                            onClick={() => this.increaseValue("month")}
                                                                        >
                                                                            <PlusImageIcon />
                                                                        </div>

                                                                        <div className="yearSelectionCategory">
                                                                            <p>Months</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div> */}

                                                    </div>
                                                </div>

                                            <div 
                                                    className="formInputContainer"
                                                    // onToggle={() => this.checkAnsweredSeven()}
                                                >
                                                    <div className="formInputInnerLayer">
                                                        <div className="cardInstructionPara formParaSection">
                                                            <h3>7</h3>
                                                            <p>Your company’s GST Identication number. <a href="https://cleartax.in/s/know-your-gstin#what"  target="_blank" >Click here</a>  if you want to know more about this.</p>
                                                        </div>

                                                        <div className="cardInputSection inputCategorySection">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>

                                                            <div className="inputColumn inputColumn1">
                                                                <input
                                                                    defaultValue = {this.state.gstIn1}
                                                                    type="text"
                                                                    placeholder="22"
                                                                    maxLength="2" 
                                                                    id="1"
                                                                    ref="gstIn1"
                                                                    onKeyUp={(e) => this.noSpaces(e)}
                                                                    onChange={(event) =>this.onChangeGST(event, "gstIn2")}
                                                                    
                                                                />
                                                                <span className="InputSeparatorLine"> </span>
                                                            </div>

                                                            <p>-</p>

                                                            <div className="inputColumn inputColumn2">
                                                                <input 
                                                                    // autoFocus="autofocus"
                                                                    defaultValue = {this.state.gstIn2}
                                                                    type="text" 
                                                                    id="2"
                                                                    placeholder="AAAAA0000A" 
                                                                    ref="gstIn2"
                                                                    maxLength="10" 
                                                                    onKeyUp={(e) => this.noSpaces(e)}
                                                                    onChange={(event) =>this.onChangeGST(event, "gstIn3")}
                                                                />
                                                                <span className="InputSeparatorLine"> </span>
                                                            </div>

                                                            <p>-</p>

                                                            <div className="inputColumn inputColumn1">
                                                                <input 
                                                                    type="text" 
                                                                    placeholder="1"
                                                                    defaultValue = {this.state.gstIn3}
                                                                    maxLength="1"
                                                                    ref="gstIn3"
                                                                    id="3"
                                                                    pattern="\d*"
                                                                    onKeyUp={(e) => this.noSpaces(e)} 
                                                                    onChange={(event) =>this.onChangeGST(event, "gstIn4")}
                                                                />
                                                                <span className="InputSeparatorLine"> </span>
                                                            </div>

                                                            <p>-</p>
                                                            <div className="inputColumn inputColumn1">
                                                                <input
                                                                    type="text"
                                                                    defaultValue={this.state.gstIn4}
                                                                    placeholder="Z"
                                                                    maxLength="1"
                                                                    ref="gstIn4"
                                                                    id="4"
                                                                    pattern="\d*"
                                                                    onKeyUp={(e) => this.noSpaces(e)}
                                                                    onChange={(event) => this.onChangeGST(event, "gstIn5")}
                                                                />
                                                                <span className="InputSeparatorLine"> </span>
                                                            </div>
                                                                
                                                  

                                                            <p>-</p>

                                                            <div className="inputColumn inputColumn1">
                                                                <input 
                                                                    type= "text" 
                                                                    defaultValue = {this.state.gstIn5}
                                                                    placeholder="5" 
                                                                    maxLength="1"
                                                                    ref="gstIn5"
                                                                    id="5"
                                                                    pattern="\d*"
                                                                    onKeyUp={(e) => this.noSpaces(e)} 
                                                                    onChange={(event) =>this.onChangeGST(event, "gstIn5")}
                                                                />
                                                                <span className="InputSeparatorLine"> </span>
                                                            </div>

                                                            <WhiteButton
                                                                runFunction={() => this.clearGSTfields()}
                                                            >
                                                                Clear
                                                            </WhiteButton>
                                                        </div>
                                                        <div className="gstInputSection warningSection">
                                                            <p 
                                                                className={this.state.warningClass}
                                                            >
                                                                {this.state.warningText}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div 
                                                    className="formInputContainer"
                                                    // onBlur={() => this.checkAnsweredEight()}
                                                >
                                                    <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>8</h3>
                                                            <p>Your company's PAN number</p>
                                                        </div>

                                                        <div className="panNumber">
                                                            <InputForm
                                                                refName="panNumber"
                                                                placeholder="AAAAA0000A"
                                                                isMandatory={true}
                                                                validationType="alphabetsAndNumbers"
                                                                characterCount="10"
                                                                value={this.state.pan ? this.state.pan : null}
                                                                // onKeyUp={(e) => this.noSpaces(e)}
                                                                result={val => this.updateVendorData("PAN", val)}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            

                                            <div className="formInputContainer"
                                            //    onLoad={() => this.checkAnsweredNine()} 
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>9</h3>
                                                        <p>Upload your company logo here. Max size 1mb.</p>
                                                    </div>
                                                    
                                                    <div className="imageOuterLayer">
                                                        {this.returnImageUploader()}
                                                    </div>
                                                </div>
                                            </div>

                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <div className="proceedButtonHandler">
                                <div className="formParaSection">
                                    <GradientButton
                                        // runFunction = {() => window.open('/vendor-main-dashboard', '_self')}
                                        runFunction = {() => this.proceedHandler()}
                                        >
                                        Save & Proceed
                                    </GradientButton>
                                </div>
                            </div>
                        
                            {/* {this.returnModal()} */}
                        </article>

                        <Footer />

                        
                     </div>
                </div>
            
                {
                    this.returnValidationModal()
                }
            </div>
        
        )
    }
}


const mapStateToProps = (state) => {
    return {
        userData: state.userData,
        responseData: state.responseDataFromAPI
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserData,
        hitApi,
        navBarLoadingAnimationShowHide
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileDetailsVendor)