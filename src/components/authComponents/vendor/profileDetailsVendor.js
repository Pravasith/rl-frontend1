import React from "react"

import "../../../assets/sass/profile_details.scss"

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

            emptyField: [],

            companyName: null,

            modalClassToggle: "modalBackgroundMainOuterWrap hide",
        }
    }

    componentDidMount = async () => {


        await Promise.all([
            this.props.getUserData(),
            this.props.hitApi(api.GET_VENDOR_DATA, "GET")
        ])

        .then((data) => {
            let { userData, responseData } = this.props


            if (responseData.responsePayload.message !== "User credentials not found") {

                //
                // DECRYPT REQUEST DATA
                //
                let decryptedData = {
                    ...decryptData(userData.responseData),
                    ...decryptData(responseData.responsePayload.responseData)
                }
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

                this.setState({

                    firstName: decryptedData.firstName,
                    lastName: decryptedData.lastName,
                    profilePicture: decryptedData.profilePicture,
                    mobileNo: decryptedData.mobileNo,
                    whatsappNo: decryptedData.whatsappNo,

                    /////////

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

                    companyProfilePicture: decryptedData.companyProfilePicture,

                    ...gstInState,

                    //////////

                    loadingClass: 'loadingAnim hide',
                    mainClass: 'mainClass',

                })
            }
        })

        .catch((err) => {
            if (err.response) {
                if (err.response.status === 401)
                    window.open('/log-in', "_self")
            }

            else
                console.error(err)
        })




        this.props.getUserData()
            .then((data) => {
                // let { userData } = this.props

                // //
                // // DECRYPT REQUEST DATA
                // // 
                // let decryptedData = decryptData(
                //     userData.responseData
                // )
                // //
                // // DECRYPT REQUEST DATA
                // //

                // this.setState({
                //     loadingClass: 'loadingAnim hide',
                //     mainClass: 'mainClass',

                //     firstName: decryptedData.firstName,
                //     lastName: decryptedData.lastName,
                //     profilePicture: decryptedData.profilePicture,
                //     mobileNo: decryptedData.mobileNo,
                //     whatsappNo: decryptedData.whatsappNo
                // })

                this.props.hitApi(api.GET_VENDOR_DATA, "GET")
                    .then((data) => {
                        let { responseData } = this.props


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

                                companyProfilePicture: decryptedData.companyProfilePicture,

                                ...gstInState
                            })
                        }
                    })
                    .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
            
    }

    componentDidUpdate() {
        console.log(this.state.firstName, this.state.lastName, this.state.companyName, this.state.detailedAddressLine1)
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

    onChangeGST = async (event, gstPart) => {
        const val = event.target.value

        if (val.length === event.target.maxLength) {

            this.refs[gstPart].focus()

                const { gstIn1, gstIn2, gstIn3, gstIn4, gstIn5 } = this.refs;
                const gstIn = `${gstIn1.value}-${gstIn2.value}-${gstIn3.value}-${gstIn4.value}-${gstIn5.value}`;

                let gstInForCheck = `${gstIn1.value}${gstIn2.value}${gstIn3.value}${gstIn4.value}${gstIn5.value}`;
                gstInForCheck = gstInForCheck.toUpperCase()

                if (gstInForCheck.length === 15) {
                    if (/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gstInForCheck)) {
                        // this.updateVendorData("GSTIN", gstIn)
                        this.setState({
                            gstIn: gstIn,
                            warningText: "please check and fill all the fields",
                            warningClass: 'warningClass hide'
                        })
                    }
                    else {
                        this.setState({
                            warningText: "oops, the GSTIN you have entered seems wrong, please clear the field and try again",
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
        // this.updateVendorData("address.state", val)
        this.setState({
            state: val
        })
    }

    handleCitySelection = (e) => {
        const val = e.target.value

        // this.updateVendorData("address.city", val)
        this.setState({
            city: val
        })
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

                this.setState({
                    firstName: decryptedData.firstName,
                    lastName: decryptedData.lastName,
                    mobileNo: decryptedData.mobileNo,
                    whatsappNo: decryptedData.whatsappNo,
                    profilePicture: decryptedData.profilePicture
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



                    companyProfilePicture: decryptedData.companyProfilePicture,
                    
                })
            })
            .catch(e => console.error(e))
    }


    returnCompanyLogoUploader = () => {

        if(this.state.companyProfilePicture){
            return (
                <ImageUploader
                    imageType = "regularImage" // regularImage || profileImage
                    resultData={val => {
                        // this.updateVendorData("companyProfilePicture", val.imageURL)
                        this.setState({
                            companyProfilePicture: val.imageURL
                        })
                    }}
                    showInitialImage = {this.state.companyProfilePicture}
                    imageClassName= "companyProfilePictureClass"
                />
            )
        }

        else{
            return (
                <div>
                    <ImageUploader
                        imageType = "regularImage" // regularImage || profileImage
                        resultData={val => {
                            // this.updateVendorData("companyProfilePicture", val.imageURL)
                            this.setState({
                                companyProfilePicture: val.imageURL
                            })
                        }}
                        showInitialImage = {this.state.companyProfilePicture}
                        imageClassName="companyProfilePictureClass"
                    />
                </div>
            )
        }
        
    }

    returnProfileImageUploader = () => {

        if (this.state.profilePicture) {
            return (
                <ImageUploader
                    imageType="profileImage" // regularImage || profileImage
                    resultData={val => {
                        // this.hitTheAPI("profilePicture", val.imageURL)
                        this.setState({
                            profilePicture: val.imageURL
                        })
                    }}
                    showInitialImage={this.state.profilePicture}
                    imageClassName="profilePictureClass"
                />
            )
        }

        else {
            return (
                <div>
                    <ImageUploader
                        imageType="profileImage" // regularImage || profileImage
                        resultData={val => {
                            // this.hitTheAPI("profilePicture", val.imageURL)
                            this.setState({
                                profilePicture: val.imageURL
                            })
                        }}
                        // showInitialImage={this.state.profilePicture}
                        imageClassName="profilePictureClass"
                    />
                </div>
            )
        }

    }

    returnExperienceOptions = () => {
        return(
            [
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
            ]
        )
    }

    handleRadiobutton = (e) => {
        const val = e.target.value;

        // this.updateVendorData("experience.years", val)
        this.setState({ experienceCount: val })
    }

    proceedHandler = async () => {

        const fieldNames =  [
            { fieldName: 'first name', value: this.state.firstName },
            { fieldName: 'last name', value: this.state.lastName },
            { fieldName: "your profile picture", value: this.state.profilePicture },
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


        await this.setState({
            emptyField : []
        })

        fieldNames.map(item => {
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
                GSTIN : this.state.gstIn.toUpperCase(),
                PAN: this.state.pan.toUpperCase(),
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

                    window.open("/vendor/dashboard", "_self")
                })
                .catch (e => console.error(e))
            })
            .catch (e => console.error(e))      
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
                                        </div>
                                    </div>

                                    <div className="rightFormSection">
                                        <div className="formSectionInnerLayer">

                                            <form action="" className="vendorForm">

                                            <div 
                                                className="formInputContainer"
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
                                                            result={(val) => {
                                                                // this.hitTheAPI("firstName", val)

                                                                this.setState({
                                                                    firstName : val
                                                                })
                                                            }}
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
                                                                result={(val) => {
                                                                    // this.hitTheAPI("lastName", val)
                                                                    this.setState({ lastName: val })
                                                                }}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                                
                                                <div className="formInputContainer"
                                                >
                                                    <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>2</h3>
                                                            <p>Upload your profile picture here. Max size 1mb.</p>
                                                        </div>

                                                        <div className="imageOuterLayer">
                                                            {this.returnProfileImageUploader()}
                                                        </div>
                                                    </div>
                                                </div>


                                            <div 
                                                className="formInputContainer"
                                            >
                                                <div className="formInputInnerLayer">
                                                
                                                    <div className="formParaSection">
                                                        <h3>3</h3>
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
                                                            result={(val) => {

                                                                // this.updateVendorData("companyName", val)
                                                                this.setState({
                                                                    companyName : val
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    
                                                </div>
                                            </div>

                                            <div 
                                                className="formInputContainer"
                                            >
                                                <div className="formInputInnerLayer">

                                                        <div className="formParaSection">
                                                            <h3>4</h3>
                                                            <p>Your phone number</p>
                                                        </div>

                                                        <div className="phoneNoWrap">
                                                            <InputForm
                                                                refName="phoneNo"
                                                                placeholder="10 digit Official contact number"
                                                                isMandatory={true}
                                                                validationType="onlyMobileNumbers"
                                                                characterCount="10"
                                                                value={
                                                                    this.state.mobileNo
                                                                        ? this.state.mobileNo
                                                                        : null
                                                                }
                                                                result={(val) => {
                                                                    // this.hitTheAPI("mobileNo", val)
                                                                    this.setState({
                                                                        mobileNo: val
                                                                    })
                                                                }}
                                                            />
                                                        </div>

                                                        <div className="whatsappNoWrap">
                                                            <InputForm
                                                                refName="whatsappNo"
                                                                placeholder="10 digit Whatsapp number"
                                                                isMandatory={false}
                                                                validationType="onlyMobileNumbers"
                                                                characterCount="10"
                                                                value={
                                                                    this.state.whatsappNo
                                                                        ? this.state.whatsappNo
                                                                        : null
                                                                }
                                                                result={(val, isValid) => {
                                                                    // this.hitTheAPI("whatsappNo", val)
                                                                    this.setState({
                                                                        whatsappNo: val
                                                                    })
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                            </div>

                                            <div 
                                                className="formInputContainer"
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>5</h3>
                                                        <p>Tell us your company address. We’ll bill the customer with this address</p>
                                                    </div>

                                                        <div className="detailedAddressLineWrap">
                                                            <InputForm
                                                                refName="detailedAddressLineOne"
                                                                placeholder="Detailed address - line 1"
                                                                isMandatory={true}
                                                                validationType="alphabetsSpecialCharactersAndNumbers"
                                                                characterCount="100"
                                                                value={this.state.detailedAddressLine1 ? this.state.detailedAddressLine1 : null}
                                                                result={val => {
                                                                    // this.updateVendorData("address.detailedAddressLine1", val)
                                                                    this.setState({ 
                                                                        detailedAddressLine1: val
                                                                    })
                                                                }}
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
                                                                result={val => {
                                                                    // this.updateVendorData("address.detailedAddressLine2", val)
                                                                    this.setState({
                                                                        detailedAddressLine2: val
                                                                    })
                                                                }}
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
                                                                validationType="onlyMobileNumbers"
                                                                characterCount="6"
                                                                value={this.state.pincode ? this.state.pincode : null}
                                                                result={val => {
                                                                    // this.updateVendorData("address.pincode", val)
                                                                    this.setState({
                                                                        pincode: val
                                                                    })
                                                                }}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>

                                            <div 
                                                className="formInputContainer"
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>6</h3>
                                                        <p>Small Description about your company</p>
                                                    </div>
                                                    <div className="companyDescriptionWrap">
                                                        <InputForm
                                                            refName="companyDescriptionOne"
                                                            placeholder="You can show off a little here, write something great about your company"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="300"
                                                            value={this.state.companyDescriptionLine1 ? this.state.companyDescriptionLine1 : null}
                                                            result={val => {
                                                                // this.updateVendorData("companyDescriptionLine1", val)
                                                                this.setState({
                                                                    companyDescriptionLine1: val
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="companyDescriptionWrap">
                                                        <InputForm
                                                            refName="companyDescriptionTwo"
                                                            placeholder="For example - We sell the toughest and most transparent glass panels in India"
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="300"
                                                            value={this.state.companyDescriptionLine2 ? this.state.companyDescriptionLine2 : null}
                                                            result={val => {
                                                                // this.updateVendorData("companyDescriptionLine2", val)
                                                                this.setState({
                                                                    companyDescriptionLine2: val
                                                                })
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div 
                                                className="formInputContainer"
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>7</h3>
                                                        <p>How long have you been in this industry?</p>
                                                    </div>
                                                    <div className="experienceSection inputCategorySection">
                                                        <div className="mandatorySection">
                                                            <p>Mandatory</p>
                                                        </div>
                                                        <div className="radioButtonSelection">
                                                            <div className="radioButtonSelectionInnerLayer">
                                                                <RadioButton
                                                                    title="Experience"
                                                                    name={'experience'}
                                                                    suffix="years"
                                                                    options={this.returnExperienceOptions()}
                                                                    selectedOption={this.state.experienceCount}
                                                                    onChange={(e) => this.handleRadiobutton(e)}
                                                                />
                                                            </div>
                                                        </div>  
                                                    </div>

                                                    </div>
                                                </div>

                                            <div 
                                                    className="formInputContainer"
                                                >
                                                    <div className="formInputInnerLayer">
                                                        <div className="cardInstructionPara formParaSection">
                                                            <h3>8</h3>
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
                                                >
                                                    <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>9</h3>
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
                                                                result={val => {
                                                                    // this.updateVendorData("PAN", val)
                                                                    this.setState({
                                                                        pan: val
                                                                    })
                                                                }}
                                                            />
                                                        </div>

                                                    </div>
                                                </div>
                                            

                                            <div className="formInputContainer"
                                            >
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>10</h3>
                                                        <p>Upload your company logo here. Max size 1mb.</p>
                                                    </div>
                                                    
                                                    <div className="imageOuterLayer">
                                                        {this.returnCompanyLogoUploader()}
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
                                        runFunction = {() => this.proceedHandler()}
                                        >
                                        Save & Proceed
                                    </GradientButton>
                                </div>
                            </div>
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