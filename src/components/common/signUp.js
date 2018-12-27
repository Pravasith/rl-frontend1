import React from "react"
import Link from 'next/link'

import "../../assets/sass/sign_up_log_in.scss"

import Axios from "axios"

import { api } from "../../actions/apiLinks"
import { GoogleIcon, LinkedInIcon } from "../../assets/images/socialNetworkIcons"
import { RollingLogsTextLogoSmall, FurnitureVendorIcon } from "../../assets/images"
import LogoAnimation from "../animations/logoAnimation"
import { encryptData, decryptData } from "../../factories/encryptDecrypt"
import { GradientButton,WhiteButton } from "../UX/uxComponents"
import { Footer } from "../footer/footer";


export default class SignUp extends React.Component{

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

    createUserRLId = (userType) => {

        function generateRandomString() {
            var text = ""
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length))

            return text
        }

        const prefixCode = generateRandomString()
        const suffixCode = generateRandomString()

        const date = new Date()

        let dateAndTime = {
            "DD": date.getDate(),
            "MM": date.getMonth() + 1,
            "YY": date.getFullYear(),

            "HRS": date.getHours(),
            "MINS": date.getMinutes(),
            "SECS": date.getSeconds(),
            "MILSECS": date.getMilliseconds(),

            "TIME": date.getTime()
        }

        let rLId =  prefixCode + dateAndTime.TIME + suffixCode
        

        if(userType === "architect"){
            rLId = "ARC-" + rLId
        }

        else if (userType === "vendor") {
            rLId = "VEN-" + rLId
        }

        else if(userType === "student"){
            rLId = "ARCSTU-" + rLId
        }

        else if (userType === "commonUser") {
            rLId = "CLI-" + rLId
        }

        return rLId

    }

    validateAndSubmit = () => {

        let rawData = {
            emailId : this.refs.emailAddress.value,
            password : this.refs.pWord.value,
            rLId: this.createUserRLId("vendor")
        }

        // 
        // Encrypt data
        // 
        const encryptedData = encryptData(rawData)
        // 
        // Encrypt data
        // 

        const requestData = {
            requestData: encryptedData,
            message: "create user data"
        }


        if(this.state.userEmailIsValid && this.state.passwordIsValid && this.state.confirmPasswordIsValid)
        {
            if(this.refs.pWord.value === this.refs.confirmPassword.value){
                // console.log("Valid")
                this.setState({
                    loadingClass: 'loadingAnim',
                    mainClass: 'mainClass hide',

                    confirmPasswordText : null,
                    confirmPasswordClass : 'confirmPasswordText hide',
                    confirmPasswordIsValid : true,
                })

                Axios.post(api.CREATE_USER, 
                    requestData,
                    {
                        headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        "Content-Type": "application/json",
                        },

                        withCredentials: true
                    }
                )
                .then( res => {
                    if( res.data.itsTaken ){
                        this.setState({
                            userEmailText : `Oops, the email ${this.refs.emailAddress.value.toLowerCase()} is already taken. Please login. Or try again with a different one.`,
                            userEmailClass : 'emailText',
                            // userEmailIsValid : false,
                            loadingClass: 'loadingAnim hide',
                            mainClass: 'mainClass',
                        })
                    }

                    else{
                        this.setState ({
                            loadingClass: 'loadingAnim hide',
                            mainClass: 'mainClass',
                        })

                        localStorage.setItem('loginThrough', 'form')

                        window.open('/vendor/profile-details', '_self')
                    }
                })
                .catch(err => {
                    console.error('bad', err)
                    throw err
                })
            }

            else{
                this.setState({
                    confirmPasswordText : "Passwords do not match",
                    confirmPasswordClass : 'confirmPasswordText',
                    confirmPasswordIsValid : false,
                })
            }
            
        }

        else{
            // console.log("Not valid")
            if(this.refs.emailAddress.value === '')
            this.setState({
                userEmailText : "You have to provide an email. It cannot be empty.",
                userEmailClass : 'emailText',
                userEmailIsValid : false,
            })

            if(this.refs.pWord.value === '')
            this.setState({
                passwordText : "You have to give a password. It cannot be empty.",
                passwordClass : 'passwordText',
                passwordIsValid : false,
            })

            if(this.refs.confirmPassword.value === '')
            this.setState({
                confirmPasswordText : "The above field cannot be empty",
                confirmPasswordClass : 'confirmPasswordText',
                confirmPasswordIsValid : false,
            })
        }
    }


    validateEmail(e){
        let theInput = e.target.value 

        let nameRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        let validEmail = nameRegex.test(theInput)

        if (!validEmail) {
            this.setState({
                userEmailText: "Please keep in mind, the email address has to be valid",
                userEmailClass: 'emailText',
                userEmailIsValid: false
            })
        }

        if (validEmail){
            if (theInput.includes('.')){
                this.setState({
                    userEmailText: null,
                    userEmailClass: 'emailText hide',
                    userEmailIsValid: true
                })

            }
        }
    }

    validatePassword(e){
        let theInput = e.target.value

        if(theInput.length < 6){
            this.setState({
                passwordText: "Please keep in mind, the password has to be atleast 6 characters long.",
                passwordClass: 'passwordText',
                passwordIsValid: false
            })
        }

        else{
            this.setState({
                passwordText: null,
                passwordClass: 'passwordText hide',
                passwordIsValid: true
            })

        }

    }

    validateConfirmPassword(e){
        let theInput = e.target.value

        if(theInput !== this.refs.pWord.value){
            this.setState({
                confirmPasswordText: "Keep in mind, both passwords should match",
                confirmPasswordClass: 'confirmPasswordText',
                confirmPasswordIsValid: false
            })
        }

        else{
            this.setState({
                confirmPasswordText: null,
                confirmPasswordClass: 'confirmPasswordText hide',
                confirmPasswordIsValid: true
            })
        }
    }

  
    render(){

       
        return(
            <div className="bigWrapper">

                <div className = {this.state.loadingClass}>
                    <LogoAnimation
                        text = {"We're gonna be right there..."}
                    />
                </div>

                <div className = {this.state.mainClass}>
                    <div className="signUpWrapper">
                        <div className="menuLogin">
                            <div 
                                className="logo flexRow" 
                                onClick = { () => {
                                    window.open('/' , '_self')
                                } }                                
                                >
                                

                                <div className="iconWrap" >
                                    <RollingLogsTextLogoSmall />
                                </div>
                            </div>

                            <div 
                                className="loginButtons"
                                onClick={() => {
                                    this.setState({
                                        loadingClass: 'loadingAnim',
                                        mainClass: 'mainClass hide',
                                    })
                                }}
                                >
                                <Link href="/log-in">
                                    <a>
                                        <WhiteButton>
                                            Login
                                        </WhiteButton>
                                    </a>
                                
                                </Link>
                                {/* <div 
                                    className = "mediumBtn studentLoginBtn" 
                                    onClick={() => {
                                        this.setState ({
                                            loadingClass: 'loadingAnim',
                                            mainClass: 'mainClass hide',
                                        })
                                        window.open('/log-in', '_self')
                                    
                                    }}
                                    // onClick = {() => window.open('/log-in', '_self')} 
                                    >
                                    Login
                                </div> */}
                            </div>
                        </div>

                        <div className="topHeading">
                            <div className="shakeHand">
                                <FurnitureVendorIcon/>
                            </div>

                            

                            <h1>Vendor sign up</h1>
                        </div>

                        <div className="formsX flexRowDiv">
                            <div className="leftForm">

                                <h2>You can either fill this form</h2>

                                <span></span>
                                
                                <div className="inputWrapper">
                                    <input
                                        ref="emailAddress"
                                        type="email"
                                        placeholder="Type your email address here"
                                        onKeyPress = { (e) => {
                                            if(e.key === "Enter"){
                                                if(this.state.userEmailIsValid){
                                                    this.setState({
                                                        userEmailText: null,
                                                        userEmailClass: 'emailText hide',
                                                        userEmailIsValid: true
                                                    })
                                                    this.validateAndSubmit()
                                                }

                                                else{
                                                    this.setState({
                                                        userEmailText: "This is not a valid email id.",
                                                        userEmailClass: 'emailText',
                                                        userEmailIsValid: false
                                                    })
                                                }
                                            }
                                        }}

                                        onChange = { (e) => this.validateEmail(e) }
                                    />
                                    <span className="InputSeparatorLine"> </span>
                                    {/* <div className="animationLine line">
                                                <div className="innerLine"></div>
                                    </div> */}
                                </div>
                                <p 
                                    className = {this.state.userEmailClass}
                                > { this.state.userEmailText } </p>

                                <span></span>
                                
                                <div className="inputWrapper">
                                    <input
                                        ref="pWord"
                                        type="password"
                                        placeholder="Type a new password here"
                                        onKeyPress = { (e) => {
                                            if(e.key === "Enter"){

                                                if(this.state.passwordIsValid){

                                                    this.setState({
                                                        passwordText: null,
                                                        passwordClass: 'passwordText hide',
                                                        passwordIsValid: true
                                                    })

                                                    this.validateAndSubmit()
                                                }

                                                else{
                                                    this.setState({
                                                        passwordText: "The password is less than 6 characters.",
                                                        passwordClass: 'passwordText',
                                                        passwordIsValid: false
                                                    })
                                                }
                                            }
                                        }}

                                        onChange = { (e) => this.validatePassword(e) }
                                    />
                                    <span className="InputSeparatorLine"> </span>
                                    {/* <div className="animationLine line">
                                                <div className="innerLine"></div>
                                    </div> */}
                                </div>
                                <p 
                                    className = {this.state.passwordClass}
                                > { this.state.passwordText } </p>
                                
                                <span></span>

                                <div className="inputWrapper">
                                    <input
                                        ref="confirmPassword"
                                        type="password"
                                        placeholder="Type the password again"
                                        onKeyPress = { (e) => {
                                            if(e.key === "Enter"){

                                                if(this.state.confirmPasswordIsValid){

                                                    this.setState({
                                                        confirmPasswordText: null,
                                                        confirmPasswordClass: 'confirmPasswordText hide',
                                                        confirmPasswordIsValid: true
                                                    })

                                                    this.validateAndSubmit()
                                                }

                                                else{
                                                    this.setState({
                                                        confirmPasswordText: "Passwords do not match!",
                                                        confirmPasswordClass: 'confirmPasswordText',
                                                        confirmPasswordIsValid: false
                                                    })
                                                }
                                            }
                                        }}

                                        onChange = { (e) => this.validateConfirmPassword(e) }
                                    />
                                    <span className="InputSeparatorLine"> </span>
                                    {/* <div className="animationLine line">
                                                <div className="innerLine"></div>
                                    </div> */}
                                </div>
                                <p 
                                    className = {this.state.confirmPasswordClass}
                                > { this.state.confirmPasswordText } </p>

                                <span></span>
                                
                                <div className="letsGoButtonContainer">
                                    <div 
                                        className= "letsGoButton"
                                        onClick= { () => this.validateAndSubmit() }
                                        >
                                        <GradientButton>
                                                Show me what you got
                                        </GradientButton>
                                    </div>

                                    <small>By clicking Show me what you got, you agree to our 
                                        <a
                                            href="https://s3.amazonaws.com/xi-upload/terms-conditions/Tscalehub-+Terms+and+Conditions+version+1.0.pdf"
                                            target="_blank"
                                        > Terms and Conditions</a>.
                                    </small>    
                                </div>

                                <div 
                                    className="mediumBtn studentLoginBtn2" 
                                    // onClick={() => window.open('/log-in', '_self')} 
                                    >
                                    <Link href="/log-in">
                                        <a>
                                            If you are already have an account, log in here
                                        </a>
                                    </Link>
                                    {/* If you are already have an account, log in here */}
                                </div>
                            </div>


                            <div className="socialNetworksForm">

                                <h2>Or click one of these</h2>

                                <div 
                                    className="googleConnect flexRowDiv"
                                    onClick = {() => {
                                        localStorage.setItem("loginThrough", 'google')
                                        window.open(api.KNOCK_GOOGLE_VENDOR, '_self')
                                    }}
                                    >

                                    <div className="googleIcon">
                                        <GoogleIcon/>
                                    </div>

                                    <span></span>

                                    <div 
                                        className="socialNetworkText"
                                        >
                                        Connect with Google
                                    </div>

                                </div>

                                <div
                                    className="linkedInConnect flexRowDiv"
                                    onClick = {() => {
                                        localStorage.setItem("loginThrough", 'linkedin')
                                        window.open(api.KNOCK_LINKEDIN_VENDOR , '_self')
                                    }}
                                    >

                                    <div className="linkedInIcon">
                                        <LinkedInIcon/>
                                    </div>

                                    <span></span>

                                    <div className="socialNetworkText">Connect with LinkedIn</div>
                                </div>  
                            </div>
                        </div>
                    </div>

                    <Footer/>
                </div>
            </div>
        )
    }
}


 
