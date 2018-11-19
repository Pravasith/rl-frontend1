import React from "react"

import "../../assets/sass/vendor_form.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"


import LogoAnimation from "../animations/logoAnimation"
import statesAndCities from "../../lib/statesAndCities"

import { TableIcon, MinusImageIcon, PlusImageIcon, UploadImageIcon } from "../../assets/images"
import { GradientButton, InputForm } from "../UX/uxComponents"

import Navbar from "../navbar/navbar"
import { Footer } from "../footer/footer"
import { getUserData } from "../../actions/userActions"
import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions";
import { api } from "../../actions/apiLinks";
import { encryptData, decryptData } from "../../factories/encryptDecrypt"
import ImageUploader from "../UX/imageUploader";

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

            yearCount: 0,
            monthCount: 0,

            // my code
            inputCount: 0,

            companyName: null,
           
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

                            this.setState({

                                companyName: decryptedData.companyName,

                                hNo: decryptedData.address.hNo,
                                stNo: decryptedData.address.stNo,
                                detailedAddressLine1: decryptedData.address.detailedAddressLine1,
                                detailedAddressLine2: decryptedData.address.detailedAddressLine2,
                                state: decryptedData.address.state,
                                city: decryptedData.address.city,
                                pincode: decryptedData.address.pincode,

                                companyDescriptionLine1: decryptedData.companyDescriptionLine1,
                                companyDescriptionLine2: decryptedData.companyDescriptionLine2,

                                yearCount: decryptedData.experience.years,
                                monthCount: decryptedData.experience.months,

                                pan: decryptedData.PAN,

                                companyProfilePicture: decryptedData.companyProfilePicture
                            })
                        }
                    })
                    .catch(e => console.error(e))
            })
            .catch(e => console.error(e))
    }


    decreaseValue = (yearOrMonth) => {
        if (yearOrMonth === "year" && this.state.yearCount > 0){
            this.updateVendorData("experience.years", this.state.yearCount - 1)
            this.setState({
                yearCount : this.state.yearCount - 1
            })
        }

        if (yearOrMonth === "month" && this.state.monthCount > 0) {
            this.updateVendorData("experience.months", this.state.monthCount - 1)
            this.setState({
                monthCount: this.state.monthCount - 1
            })
        }
    }

    increaseValue = (yearOrMonth) => {
        if (yearOrMonth === "year" && this.state.yearCount < 100) {
            this.updateVendorData("experience.years", this.state.yearCount + 1)
            this.setState({
                yearCount: this.state.yearCount + 1
            })
        }

        if (yearOrMonth === "month" && this.state.monthCount < 12) {
            this.updateVendorData("experience.months", this.state.monthCount + 1)
            this.setState({
                monthCount: this.state.monthCount + 1
            })
        }
    }

    // my code

    validateInput = (oneOrTwo) => {
        if(oneOrTwo === "one"){
            this.setState({
                inputCount: 1
            })
        }
        if(oneOrTwo === "two"){
            this.setState({
                inputCount: 2
            })
        }
    }

    // my code


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

    


    onChange(event) {
        if (event.target.value.length === event.target.maxLength) {
          this.refs[parseInt(event.target.id, 10) + 1].focus();
        }
    }

    validateCard(e) {
        const { key } = e
        let theInput
        

        if (key !== 'Enter')
            theInput = e.target.value + key

        if (theInput.length > 2) {
            this.setState({
                warningText: "it must have only two values",
                warningClass: 'warningClass',
                passwordIsValid: false
            })
           
        }
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

                // console.log(this.props.responseData)
            })

    }

    updateVendorData = async (objectName, data) => {

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
            .hitApi(api.UPDATE_VENDOR_DATA, "PUT",
                {
                    message: "Update vendor's data",
                    requestData: encryptedData
                }
            )

            .catch(e => console.error(e))

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
            })



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


    render() {

        return (
            <div className="bigWrapper">

                <div className={this.state.loadingClass}>
                    <LogoAnimation />
                </div>

                <div className={this.state.mainClass}>
                    <article className="vendorProfileDetailsOuterwrapper">

                        <Navbar
                            userData={this.returnNavBarData()}
                        />

                        <header className="vendorHeaderClass">
                            <h3 className="vendorHeaderSection"> Okay, let's finish a simple form</h3>
                            <div className="line"></div>
                        </header>

                        <section className="vendorFormOuterSection">

                            <div className="vendorInnerSection">
                                <div className="leftSection">
                                    <div className="leftSectionInnerLayer">
                                        <div className="iconWrapper">
                                            <TableIcon />
                                        </div>

                                        <div className="formCompletionInfoSection">
                                            <div className="outerLayer">
                                                <h3
                                                    
                                                >
                                                    <span>{this.state.inputCount}/9</span>Questions answered
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rightFormSection">
                                    <div className="formSectionInnerLayer">

                                        <form action="" className="vendorForm">

                                            <div 
                                                className="formInputContainer"
                                                onClick={() => this.validateInput("one")}
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
                                                onClick={() => this.validateInput("two")}
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
                                                            value={this.state.companyName ? this.state.companyName : null}
                                                            result={(val) => this.updateVendorData("companyName", val)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">

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

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>4</h3>
                                                        <p>Tell us your company address. We’ll bill the customer with this address</p>
                                                    </div>

                                                    <div className="houseNoWrap">
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
                                                    </div>

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

                                            <div className="formInputContainer">
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
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            value={this.state.companyDescriptionLine2 ? this.state.companyDescriptionLine2 : null}
                                                            result={val => this.updateVendorData("companyDescriptionLine2", val)}
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>6</h3>
                                                        <p>How long have you been in this industry?</p>
                                                    </div>

                                                    <div className="industryTimeWrap">
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
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>

                                                            <div className="inputColumn">
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

                                                    </div>

                                                </div>
                                            </div>

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="cardInstructionPara formParaSection">
                                                        <h3>7</h3>
                                                        <p>Your company’s GST Identication number. <a href="">Click here</a>  if you want to know more about this.</p>
                                                    </div>

                                                    <div className="cardInputSection inputCategorySection">
                                                        <div className="mandatorySection">
                                                            <p>Mandatory</p>
                                                        </div>

                                                        <div className="inputColumn">
                                                            <input
                                                                // autoFocus="autofocus"
                                                                type="text"
                                                                placeholder="22"
                                                                maxLength="2" 
                                                                id="1"
                                                                ref="1"
                                                                onKeyPress={(e) => this.validateCard(e)}
                                                                onChange={(event) =>this.onChange(event)}
                                                                
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input 
                                                                autoFocus="autofocus"
                                                                type="text" 
                                                                id="2"
                                                                placeholder="AAAAA0000A" 
                                                                ref="2"
                                                                maxLength="10" 
                                                                onChange={(event) =>this.onChange(event)}
                                                                
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input 
                                                                type="text" 
                                                                placeholder="1"
                                                                maxLength="1"
                                                                ref="3"
                                                                id="3"
                                                                pattern="\d*" 
                                                                onChange={(event) =>this.onChange(event)}
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input 
                                                                type="text" 
                                                                placeholder="Z"
                                                                pattern="[A-Z]{1}" 
                                                                ref="4"
                                                                id="4"
                                                                maxLength="1"
                                                                onChange={(event) =>this.onChange(event)}
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input 
                                                                type="text" 
                                                                placeholder="5" 
                                                                maxLength="1"
                                                                ref="5"
                                                                id="5"
                                                                pattern="\d*" 
                                                                onChange={(event) =>this.onChange(event)}
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>
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

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>8</h3>
                                                        <p>PAN number</p>
                                                    </div>

                                                    <div className="panNumber">
                                                        <InputForm
                                                            refName="panNumber"
                                                            placeholder="AAAAA0000A"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="10"
                                                            value={this.state.pan ? this.state.pan : null}
                                                            result={val => this.updateVendorData("PAN", val)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="formInputContainer">
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

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <GradientButton
                                                            runFunction = {() => window.open('/vendor-main-dashboard')}
                                                            >
                                                            Proceed
                                                        </GradientButton>
                                                    </div>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>

                    <Footer />
                </div>
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