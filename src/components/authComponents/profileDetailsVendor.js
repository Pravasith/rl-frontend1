import React from "react"

import "../../assets/sass/vendor_form.scss"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { TableIcon, MinusImageIcon, PlusImageIcon, UploadImageIcon } from "../../assets/images"
import LogoAnimation from "../animations/logoAnimation"
import { GradientButton, InputForm } from "../UX/uxComponents"
import statesAndCities from "../../lib/statesAndCities"
import { Footer } from "../footer/footer"
import Navbar from "../navbar/navbar"
import { getUserData } from "../../actions/userActions"


class ProfileDetailsVendor extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',

            firstNameCharCount: 15,
            lastNameCharCount: 15,
            companyNameCharCount: 50,
            phoneNoCharCount: 10,
            whatsappNoCharCount: 10,
            number: 0,
            count: 0,

            redirect: false
        }

        // setTimeout(()=> {
        //     console.log(this.refs.firstName.value)
        // },4000)

    }

<<<<<<< HEAD
=======
    componentDidMount = () => {
        this.props.getUserData()
    }

>>>>>>> 15884b164e77f07cd904cc9064f6552f492f2c2f
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


    validatePhoneNo = (e) => {
        const val = e.target.value

        this.setState({
            phoneNoCharCount: 10 - val.length
        })

        if (val.length !== 10) {
            this.setState({
                phoneNoText: "Remember, your number has to be valid",
                phoneNoClass: 'phoneNoText',
                phoneNoIsValid: false,
            })
        }

        if (!/^[0-9]+$/.test(val)) {
            this.setState({
                phoneNoText: "Numbers only",
                phoneNoClass: 'phoneNoText',
                phoneNoIsValid: false,
            })
        }

        if (val.length === 10 && /^[0-9]+$/.test(val))
            this.setState({
                phoneNoText: null,
                phoneNoClass: 'phoneNoText hide',
                phoneNoIsValid: true,
            })
    }

    validateWhatsappNo = (e) => {
        const val = e.target.value

        this.setState({
            whatsappNoCharCount: 10 - val.length
        })


        if (val.length !== 10) {
            this.setState({
                whatsappNoText: "Remember, your number has to be valid",
                whatsappNoClass: 'whatsappNoText',
                whatsappNoIsValid: false,
            })
        }

        if (!/^[0-9]+$/.test(val)) {
            this.setState({
                whatsappNoText: "Numbers only",
                whatsappNoClass: 'whatsappNoText',
                whatsappNoIsValid: false,
            })
        }

        if (val.length === 10 && /^[0-9]+$/.test(val))
            this.setState({
                whatsappNoText: null,
                whatsappNoClass: 'whatsappNoText hide',
                whatsappNoIsValid: true,
            })

    }

    validateFirstName = (e) => {

        const val = e.target.value

        this.setState({
            firstNameCharCount: 15 - val.length
        })

        if (val === "") {
            this.setState({
                firstNameText: "Please tell us your first name.",
                firstNameClass: 'firstNameText',
                firstNameIsValid: false,
            })
        }

        if (!/^[a-zA-Z]*$/g.test(val)) {
            this.setState({
                firstNameText: "Please enter english alphabets only.",
                firstNameClass: 'firstNameText',
                firstNameIsValid: false,
            })
        }

        if (val !== "" && /^[a-zA-Z]*$/g.test(val))
            this.setState({
                firstNameText: null,
                firstNameClass: 'firstNameText hide',
                firstNameIsValid: true,
            })
    }

    validateLastName = (e) => {
        const val = e.target.value

        this.setState({
            lastNameCharCount: 15 - val.length
        })

        if (val === "") {
            this.setState({
                lastNameText: "Please tell us your last name.",
                lastNameClass: 'lastNameText',
                lastNameIsValid: false,
            })
        }

        if (!/^[a-zA-Z]*$/g.test(val)) {
            this.setState({
                lastNameText: "Please enter english alphabets only.",
                lastNameClass: 'lastNameText',
                lastNameIsValid: false,
            })
        }

        if (val !== "" && /^[a-zA-Z]*$/g.test(val))
            this.setState({
                lastNameText: null,
                lastNameClass: 'lastNameText hide',
                lastNameIsValid: true,
            })

    }


    validateCompanyName = (e) => {

        const val = e.target.value

        this.setState({
            companyNameCharCount: 50 - val.length
        })

        if (val === "") 
        this.setState({
            companyNameText: "Please tell us your Company's name.",
            companyNameClass: 'companyNameText',
            companyNameIsValid: false,
        })

        if (val !== "")
        this.setState({
            companyNameText: null,
            companyNameClass: 'companyNameText hide',
            companyNameIsValid: true,
        })
    }

    submitForm = () => {

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
                            userData = {this.props.userData}
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
                                                            placeholder= "First Name"
                                                            isMandatory= {true}
                                                            validationType= "alphabetsAndSpecialCharacters"
                                                            characterCount= "15"
                                                            result= {(val) => this.setState({
                                                                firstName: val
                                                            })}
                                                        />
                                                    </div>

                                                    <div className="lastNameWrap">
                                                        <InputForm
                                                            refName= "lastName"
                                                            placeholder= "Last Name"
                                                            isMandatory= {true}
                                                            validationType= "alphabetsAndSpecialCharacters"
                                                            characterCount= "15"
                                                            result= {(val) => this.setState({
                                                                lastName: val
                                                            })}
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
                                                            result= {(val) => this.setState({
                                                                companyName: val
                                                            })}
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
                                                            result={(val) => this.setState({
                                                                phoneNumber: val
                                                            })}
                                                        />
                                                    </div>

                                                    <div className="whatsappNoWrap">
                                                        <InputForm
                                                            refName="whatsappNo"
                                                            placeholder="10 digit Whatsapp number"
                                                            isMandatory={false}
                                                            validationType="onlyNumbers"
                                                            characterCount="10"
                                                            result={(val) => this.setState({
                                                                whatsappNumber: val
                                                            })}
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
<<<<<<< HEAD
                                                                    <div className="VolumeCategory">
=======
                                                                    <div 
                                                                        className="VolumeCategory" 
                                                                        // onClick={this.decreaseValue.bind(this)}
                                                                        >
>>>>>>> 15884b164e77f07cd904cc9064f6552f492f2c2f
                                                                        <MinusImageIcon/>
                                                                    </div>

                                                                    <div className="numberSection">
                                                                        <p>{this.state.number}</p>
                                                                    </div>
<<<<<<< HEAD
                                                                    <div className="VolumeCategory">
=======

                                                                    <div 
                                                                        className="VolumeCategory" 
                                                                        // onClick={this.increaseValue.bind(this)}
                                                                        >
>>>>>>> 15884b164e77f07cd904cc9064f6552f492f2c2f
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
<<<<<<< HEAD
                                                                        <div className="VolumeCategory">
=======
                                                                        <div 
                                                                            className="VolumeCategory" 
                                                                            // onClick={this.decreaseCount.bind(this)}
                                                                            >
>>>>>>> 15884b164e77f07cd904cc9064f6552f492f2c2f
                                                                            <MinusImageIcon />
                                                                        </div>

                                                                        <div className="numberSection">
                                                                            <p>{this.state.count}</p>
                                                                        </div>

<<<<<<< HEAD
                                                                        <div className="VolumeCategory">
=======
                                                                        <div 
                                                                            className="VolumeCategory" 
                                                                            // onClick={this.increaseCount.bind(this)}
                                                                            >
>>>>>>> 15884b164e77f07cd904cc9064f6552f492f2c2f
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
                                                            <input type="text" placeholder="22" />

                                                            <div className="animationLine line">
                                                                <div className="innerLine"></div>
                                                            </div>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="AAAAA0000A" />
                                                            <div className="animationLine line">
                                                                <div className="innerLine"></div>
                                                            </div>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="1" />
                                                            <div className="animationLine line">
                                                                <div className="innerLine"></div>
                                                            </div>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="Z" />
                                                            <div className="animationLine line">
                                                                <div className="innerLine"></div>
                                                            </div>
                                                        </div>

                                                        <p>-</p>

                                                        <div className="inputColumn">
                                                            <input type="text" placeholder="5" />
                                                            <div className="animationLine line">
                                                                <div className="innerLine"></div>
                                                            </div>
                                                        </div>
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
        userData: state.userData
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserData
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ProfileDetailsVendor)