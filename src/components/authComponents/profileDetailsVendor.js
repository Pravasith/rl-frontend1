import React from "react"

import "../../assets/sass/vendor_form.scss"

import Axios from "axios"
import { api } from "../../actions/apiLinks"


import { GoogleIcon, LinkedInIcon, TableIcon, MinusImageIcon, PlusImageIcon, UploadImageIcon } from "../../assets/images/socialNetworkIcons";
import { RollingLogsTextLogoSmall, FurnitureVendorIcon } from "../../assets/images";
import LogoAnimation from "../animations/logoAnimation";


export default class ProfileDetailsVendor extends React.Component{

    constructor(props, context) {
        super(props, context)

        this.state = {
            userEmailText : null,
            userEmailClass : 'emailText hide',
            userEmailIsValid : false,

            passwordText : null,
            passwordClass : 'passwordText hide',
            passwordIsValid : false,

            confirmPasswordText : null,
            confirmPasswordClass : 'confirmPasswordText hide',
            confirmPasswordIsValid : false,

            finalCheckWrapperClass : 'finalCheckWrapper hide',

            checkingForTheFirstTime: false,

            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',

            redirect : false
        }

    }

    returnCustomSelectOptions = () => {

        const array = [
            "Karnataka",
            "Delhi",
            "TamilNadu",
            "Rajasthan"
        ]

        return array.map((item, i) =>  <option value= {i+1} >{item}</option>)
    }


    render(){

        return(
            <div className="bigWrapper">

                <div className = {this.state.loadingClass}>
                    <LogoAnimation/>
                </div>

                <div className = {this.state.mainClass}>
                    <article className="vendorProfileDetailsOuterwrapper">
                        <header className="vendorHeaderClass">
                            <h3 className="vendorHeaderSection">Okay. Very quickly we'll just finish off a small profile details form.</h3>
                            <div className="line"></div>
                        </header>
                        <section className="vendorFormOuterSection">
                            <div className="vendorInnerSection">
                                <div className="leftSection">
                                    <div className="leftSectionInnerLayer">
                                        <div className="iconWrapper">
                                            <TableIcon/>
                                        </div>
                                        <div className="formCompletionInfoSection">
                                            <div className="outerLayer">
                                                <h3><span>4/9</span> Questions answered</h3>
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
                                                        <div className="inputCategorySection">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>
                                                            <div className="inputColumn">
                                                                <input type="text" placeholder="First Name"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div>
                                                            </div>
                                                            <div className="numberCountSection">
                                                                <p>15</p>
                                                            </div>
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>
                                                            <div className="inputColumn">
                                                                <input type="text" placeholder="Last Name"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            <div className="numberCountSection">
                                                                <p>15</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>2</h3>
                                                            <p>What should we call your company as?</p>
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>
                                                            <div className="companyNameSection inputColumn">
                                                                <input type="text" placeholder="Company Name"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div>
                                                            </div>
                                                            <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>3</h3>
                                                            <p>Your phone number</p>
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="contactSection inputColumn">
                                                                <input type="text" placeholder="Official contact number"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="contactSection inputColumn">
                                                                <input type="text" placeholder="Whatsapp number"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>4</h3>
                                                            <p>Tell us your company address. We’ll bill the customer with this address</p>
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSection inputColumn">
                                                                <input type="text" placeholder="H.No./Flat No"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSection inputColumn">
                                                                <input type="text" placeholder="Street No."/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSectionExtended inputColumn">
                                                                <input type="text" placeholder="Detailed address - line 1"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSectionExtended inputColumn">
                                                                <input type="text" placeholder="Detailed address - line 2"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSection inputColumn">
                                                                <input type="text" placeholder="City"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="selectionInputCategory inputCategorySection">
                                                             <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> 
                                                            <div className="cutomSelectOption">
                                                                <select name="" id="">
                                                                    <option value="0">Choose state</option>
                                                                    {this.returnCustomSelectOptions()}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSection inputColumn">
                                                                <input type="text" placeholder="Pincode"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                <div className="formInputContainer">
                                                <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>5</h3>
                                                            <p>Small Description about your company</p>
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSectionExtended inputColumn">
                                                                <input type="text" placeholder="You can show off a little here"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSectionExtended inputColumn">
                                                                <input type="text" placeholder="For example - We sell the toughest and most transparent glass panels in India. "/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
                                                        </div>

                                                        </div>           
                                                </div>
                                                <div className="formInputContainer">
                                                    <div className="formInputInnerLayer">
                                                        <div className="formParaSection">
                                                            <h3>6</h3>
                                                            <p>How long have you been in this industry?</p>
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div>
                                                            <div className="inputColumn">
                                                                <div className="numberInputSection inputColumnInnerLayer">
                                                                    <div className="VolumeCategory">
                                                                        <MinusImageIcon/>
                                                                    </div>
                                                                    <div className="numberSection">
                                                                        <p>2</p>
                                                                    </div>
                                                                    <div className="VolumeCategory">
                                                                        <PlusImageIcon/>
                                                                    </div>
                                                                    <div className="yearSelectionCategory">
                                                                        <p>Years</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                           
                                                        </div>
                                                        <div className="inputCategorySection">
                                                            
                                                            <div className="numberSectionExtended inputColumn">
                                                                <div className="numberInputSection inputColumnInnerLayer">
                                                                    <div className="VolumeCategory">
                                                                        <MinusImageIcon/>
                                                                    </div>
                                                                    <div className="numberSection">
                                                                        <p>2</p>
                                                                    </div>
                                                                    <div className="VolumeCategory">
                                                                        <PlusImageIcon/>
                                                                    </div>
                                                                    <div className="yearSelectionCategory">
                                                                        <p>Months</p>
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
                                                            <div className="inputColumn">
                                                                <input type="text" placeholder="22"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                
                                                                </div>
                                                                
                                                            </div>
                                                            <p>-</p>
                                                            <div className="inputColumn">
                                                                <input type="text" placeholder="AAAAA0000A"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                
                                                                </div>
                                                                
                                                            </div>
                                                            <p>-</p>
                                                            <div className="inputColumn">
                                                                <input type="text" placeholder="1"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                
                                                                </div>
                                                                
                                                            </div>
                                                            <p>-</p>
                                                            <div className="inputColumn">
                                                                <input type="text" placeholder="Z"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                
                                                                </div>
                                                                
                                                            </div>
                                                            <p>-</p>
                                                            <div className="inputColumn">
                                                                <input type="text" placeholder="5"/>
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
                                                        <div className="inputCategorySection">
                                                            {/* <div className="mandatorySection">
                                                                <p>Mandatory</p>
                                                            </div> */}
                                                            <div className="addressSection inputColumn">
                                                                <input type="text" placeholder="AAAAA0000A"/>
                                                                <div className="animationLine line">
                                                                    <div className="innerLine"></div>
                                                
                                                                </div>
                                                                {/* <div className="warningSection">
                                                                    <p>Sorry! Numbers are not allowed please enter english alphabets</p>
                                                                </div> */}
                                                            </div>
                                                            {/* <div className="numberCountSection">
                                                                <p>50</p>
                                                            </div> */}
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
                                                                    <UploadImageIcon/>
                                                                </div>
                                                                <div className="uploadInstructionSection">
                                                                    <p>Click here to upload an image. Formats allowed are .jpeg, .jpg, .png</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="formInputContainer"></div>
                                                
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>
            </div>
        )
    }
}


 
