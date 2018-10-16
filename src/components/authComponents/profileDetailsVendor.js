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
            value: '',

            companyName: null,

            value: ""

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

                firstName : decryptedData.firstName,
                lastName: decryptedData.lastName,
                mobileNo: decryptedData.mobileNo,
                whatsappNo: decryptedData.whatsappNo
            })
        })

        this.props.hitApi(api.GET_VENDOR_DATA, "GET")
            .then((data) => {

                let { responseData } = this.props

                if (responseData.responsePayload.message !== "User credentials not found"){

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
                    })
                }

            })

        .catch(e => console.error(e))
    }


    returnNavBarData = () => {
        if(this.props.userData.responseData){

            // console.log(this.props.userData.responseData)

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

        else{
            return null
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
    // handlechange = ({target: {value}}) => this.setState(state => value.length <= 6 && !isNaN(Number(value)) && {value} || state)
    
    //  this.setState(state => value.length <= 6 && !isNaN(Number(value)) && {value} || state)

    returnStatesOfIndia = () => {

        const array = [ ...statesAndCities ]
       
        return array.map((item,i) => (
                <option
                    key= {i}
                    value= {item.state}
                    >
                    {item.state} 
                </option>
            )
        )

    }

    handleStateSelection = (e) => {
        const val = e.target.value
        
        this.changeCityList(val)
    }

    changeCityList = (theState) => {
        let statesArray = [...statesAndCities]

        let citiesArray = []

        statesArray.map((item, i) => {
            if(theState === item.state){
                citiesArray = [...item.cities]
            }
        })

        this.setState({
            statesList : [ ...citiesArray ]
        })
 
    }

    returnCitiesOfIndia = () => {
        if (this.state.statesList){
            return [...this.state.statesList].map((item, i) => (
                <option
                    key = { i }
                    value = { item }
                    >
                    { item }
                </option>
            ))
        }

        else if (!this.state.statesList) {
            return <option
                value= {"PLEASE_SELECT_STATE"}
                >
                Please select a state above
            </option>
        }
    }

    hitTheAPI = (objectName, data) => {

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
            .hitApi(api.UPDATE_USER_DATA, "PUT", 
                {
                    message : "Update user's data",
                    requestData : encryptedData
                }
            )

            .then(() => {

                this
                    .props
                    .navBarLoadingAnimationShowHide(false)

                // console.log(this.props.responseData)
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
                // console.log(this.props.responseData.responsePayload)
                // console.log(decryptedData)
                //
                // Decrypt data
                //
            })
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
                            userData= { this.returnNavBarData() }
                        />

                        <header className="vendorHeaderClass">
                            <h3 className="vendorHeaderSection">Okay, very quickly we'll just finish off a simple details form</h3>
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
                                                <h3>
                                                    <span>4/9</span> Questions answered</h3>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="rightFormSection">
                                    <div className="formSectionInnerLayer">

                                        <form action="" className="vendorForm">

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3>1</h3>
                                                        <p>Your name as you would like your customers to call you?</p>
                                                    </div>

                                                    <div className= "firstNameWrap">
                                                        <InputForm
                                                            refName= "firstName"
                                                            placeholder= "First name"
                                                            isMandatory= {true}
                                                            validationType= "alphabetsAndSpecialCharacters"
                                                            characterCount= "15"
                                                            value={this.state.firstName ? this.state.firstName : null }
                                                            result={(val) => this.hitTheAPI("firstName", val)}
                                                        />
                                                    </div>

                                                    <div className="lastNameWrap">
                                                        <InputForm
                                                            refName= "lastName"
                                                            placeholder= "Last name"
                                                            isMandatory= { true }
                                                            validationType= "alphabetsAndSpecialCharacters"
                                                            characterCount= "15"
                                                            value={this.state.lastName ? this.state.lastName : null}
                                                            result={(val) => this.hitTheAPI("lastName", val)}
                                                        />
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <h3> 2 </h3>

                                                        <p> What should we call your company as? </p>
                                                    </div>

                                                    <div className= "companyNameWrap">
                                                        <InputForm
                                                            refName= "companyName"
                                                            placeholder= "Type your company name here"
                                                            isMandatory= {true}
                                                            validationType= "alphabetsSpecialCharactersAndNumbers"
                                                            characterCount= "50"
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
                                                            result={(val) => this.setState({
                                                                houseNumber: val
                                                            })}
                                                        />
                                                    </div>

                                                    <div className="StreetNoWrap">
                                                        <InputForm
                                                            refName="streetNo"
                                                            placeholder="Street No."
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="15"
                                                            result={(val) => this.setState({
                                                                streetNumber : val
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="detailedAddressLineWrap">
                                                        <InputForm
                                                            refName="detailedAddressLineOne"
                                                            placeholder="Detailed address - line 1"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            result={(val) => this.setState({
                                                                detailedAddressLineOne : val
                                                            })}
                                                        />
                                                    </div>

                                                    <div className="detailedAddressLineWrap">
                                                        <InputForm
                                                            refName="detailedAddressLineTwo"
                                                            placeholder="Detailed address - line 2"
                                                            isMandatory={false}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            result={(val) => this.setState({
                                                                detailedAddressLineTwo : val
                                                            })}
                                                        />
                                                    </div>

                                                    <div className="selectionInputCategory inputCategorySection">
                                                        <div className="mandatorySection">
                                                            <p>Mandatory</p>
                                                        </div>

                                                        <div className="customSelectOption">
                                                            <select
                                                                name= "statesOfIndia" 
                                                                id= "statesOfIndia"
                                                                defaultValue= "548784154874648746"
                                                                onChange={(e) => this.handleStateSelection(e)}
                                                                >
                                                                <option value="548784154874648746">Choose state</option>
                                                                { this.returnStatesOfIndia() }
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
                                                                defaultValue="548784154874648746"
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
                                                            result={(val) => this.setState({
                                                                pincode : val
                                                            })}
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
                                                            placeholder="You can show off a little here"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="60"
                                                            result={(val) => this.setState({
                                                                companyDescription : val
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="companyDescriptionWrap">
                                                        <InputForm
                                                            refName="companyDescriptionTwo"
                                                            placeholder="For example - We sell the toughest and most transparent glass panels in India"
                                                            isMandatory={true}
                                                            validationType="alphabetsSpecialCharactersAndNumbers"
                                                            characterCount="100"
                                                            result={(val) => this.setState({
                                                                city : val
                                                            })}
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
                                                                        className="VolumeCategory" 
                                                                        // onClick={this.decreaseValue.bind(this)}
                                                                        >
                                                                        <MinusImageIcon/>
                                                                    </div>

                                                                    <div className="numberSection">
                                                                        <p>{this.state.number}</p>
                                                                    </div>

                                                                    <div 
                                                                        className="VolumeCategory" 
                                                                        // onClick={this.increaseValue.bind(this)}
                                                                        >
                                                                        <PlusImageIcon/>
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
                                                                            className="VolumeCategory" 
                                                                            // onClick={this.decreaseCount.bind(this)}
                                                                            >
                                                                            <MinusImageIcon />
                                                                        </div>

                                                                        <div className="numberSection">
                                                                            <p>{this.state.count}</p>
                                                                        </div>

                                                                        <div 
                                                                            className="VolumeCategory" 
                                                                            // onClick={this.increaseCount.bind(this)}
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
                                                                type="text" 
                                                                placeholder="22" 
                                                                // maxLength="2" 
                                                                onKeyPress={(e) => this.validateCard(e)}                                                            
                                                            />
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="AAAAA0000A" maxLength="10"/>
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="1" maxLength="1" pattern="\d*"/>
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="Z" pattern="[A-Z]{1}" maxLength="1"/>
                                                            <span className="InputSeparatorLine"> </span>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="5" maxLength="1" pattern="\d*"/>
                                                            <span className="InputSeparatorLine"> </span>
                                                            {/* <div className="animationLine line">
                                                                <div className="innerLine"></div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <div className="warningSection">
                                                        <p 
                                                            className={this.state.warningClass}
                                                        >
                                                            { this.state.warningText }
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
                                                            result={(val) => this.setState({
                                                                City : val
                                                            })}
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

                                                    <div className="imageCategorySection inputCategorySection">
                                                        <div className="inputColumn">
                                                            <div className="imageUploadIconSection">
                                                                <UploadImageIcon />
                                                            </div>
                                                            <div className="uploadInstructionSection">
                                                                <p>Click here to upload an image. Formats allowed are .jpeg, .jpg, .png</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                    <div className="formParaSection">
                                                        <GradientButton>
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

                    <Footer/>
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