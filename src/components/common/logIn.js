import React from "react"
import Link from 'next/link'

import { GoogleIcon, LinkedInIcon } from "../../assets/images/socialNetworkIcons";
import { RollingLogsTextLogoSmall, FurnitureVendorIcon } from "../../assets/images";
import Axios from "axios";
import { api } from "../../actions/apiLinks";
import LogoAnimation from "../animations/logoAnimation";
import { GradientButton, WhiteButton } from "../UX/uxComponents";

// import "../../assets/sass/sign_up_log_in.scss"
import { Footer } from "../footer/footer";
import { encryptData, decryptData } from "../../factories/encryptDecrypt";

export default class LogIn extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {

            userEmailText: null,
            userEmailClass: 'emailText hide',
            userEmailIsValid: false,

            passwordText: null,
            passwordClass: 'passwordText hide',
            passwordIsValid: false,

            checkingForTheFirstTime: false,
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',

            redirect: false
        }


        this.validatePassword = this.validatePassword.bind(this)
        this.validateEmail = this.validateEmail.bind(this)

    }

    validateAndSubmit = () => {

        if ((this.state.userEmailIsValid && this.state.passwordIsValid)) {
            this.setState({
                loadingClass: 'loadingAnim',
                mainClass: 'mainClass hide',
            })



            let rawData = {
                emailId: this.refs.emailAddress.value,
                password: this.refs.pWord.value,

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
                message: "User trying to log in"
            }

            Axios.post(api.USER_LOGIN, requestData,
                {
                    headers: {
                        'accept': 'application/json',
                        'Accept-Language': 'en-US,en;q=0.8',
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                })

                .then(res => {

                    //
                    // DECRYPT REQUEST DATA
                    // 
                    let decryptedData = decryptData(
                        res.data.responseData
                    )
                    //
                    // DECRYPT REQUEST DATA
                    //


                    if (!decryptedData.registered)
                        this.setState({
                            passwordText: "Sorry, you have not yet registered with us. Please sign-up",
                            passwordClass: 'passwordText',
                            passwordIsValid: true,
                            loadingClass: 'loadingAnim hide',
                            mainClass: 'mainClass',
                        })

                    if (!decryptedData.passwordRight)
                        this.setState({
                            passwordText: "Your password doesnot match the one in our records. Try logging in through google or linkedIn.",
                            passwordClass: 'passwordText',
                            passwordIsValid: true,
                            loadingClass: 'loadingAnim hide',
                            mainClass: 'mainClass',
                        })

                    if (decryptedData.passwordRight && decryptedData.registered) {
                        localStorage.setItem('loginThrough', 'form')

                        if (decryptedData.userType === "vendor"){

                            this.setState({
                                loadingClass: 'loadingAnim',
                                mainClass: 'mainClass hide',
                            })
                            window.open('/', '_self')
                        }
                        

                        else{
                            this.setState({
                                loadingClass: 'loadingAnim',
                                mainClass: 'mainClass hide',
                            })

                            window.open('/register')
                        }


                        // if(res.data.userType === "faculty")
                        // window.open('/faculty/profile-details', '_self')

                        // if (res.data.userType === "architect")
                        //     window.open('/architect/profile-details', '_self')
                    }

                })
                .catch(err => {
                    console.error('bad', err)
                    throw err
                })
        }

        else {
            if (this.refs.emailAddress.value === '')
                this.setState({
                    userEmailText: "You have to provide an email. It cannot be empty.",
                    userEmailClass: 'emailText',
                    userEmailIsValid: false,
                })

            if (this.refs.pWord.value === '')
                this.setState({
                    passwordText: "You have to give a password. It cannot be empty.",
                    passwordClass: 'passwordText',
                    passwordIsValid: false,
                })
        }
    }


    validateEmail(e) {

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

        else if (validEmail && theInput.includes('.')) {
            this.setState({
                userEmailText: null,
                userEmailClass: 'emailText hide',
                userEmailIsValid: true
            })
        }

        else {
            this.setState({
                userEmailText: "Please keep in mind, the email address has to be valid",
                userEmailClass: 'emailText',
                userEmailIsValid: false
            })
        }
    }

    validatePassword(e) {
        const { key } = e
        let theInput

        if (key !== 'Enter')
            theInput = e.target.value + key

        else
            theInput = e.target.value

        // const { key } = e
        // let theInput = e.target.value

        if (theInput.length < 6) {
            this.setState({
                passwordText: "Please keep in mind, the password has to be atleast 6 characters long.",
                passwordClass: 'passwordText',
                passwordIsValid: false
            })
        }
        else {
            this.setState({
                passwordText: null,
                passwordClass: 'passwordText hide',
                passwordIsValid: true
            })
        }

        if (key === "Enter") {
            this.validateAndSubmit()
        }

    }



    render() {




        return (


            <div className="bigWrapper">

                <div className={this.state.loadingClass}>
                    <LogoAnimation
                        text={"We're gonna be right there..."}
                    />
                </div>

                <div className={this.state.mainClass}>
                    <div className="signUpWrapper">

                        <div className="menuLogin">

                            <div className="logo flexRow" >
                                <Link href="/">
                                    <a>
                                        <div
                                            className="iconWrap"
                                            onClick = {() => {
                                                this.setstate=({
                                                    loadingClass: 'loadingAnim hide',
                                                    mainClass: 'mainClass'
                                                })
                                            }}
                                            >
                                            <RollingLogsTextLogoSmall />
                                        </div>
                                    </a>
                                </Link>
                            {/* onClick={() => {
                                    this.setState ({
                                        loadingClass: 'loadingAnim hide',
                                        mainClass: 'mainClass',
                                    })
                                window.open('/', '_self')
                                
                                }}>
                                <div className="iconWrap" >
                                    <RollingLogsTextLogoSmall />
                                </div> */}
                            </div>

                            <div className="loginButtons">

                                <Link href="/register">
                                    <a>
                                        <div
                                            onClick={() => {
                                                this.setState ({
                                                    loadingClass: 'loadingAnim',
                                                    mainClass: 'mainClass hide',    
                                                })
                                            }}
                                            >
                                            <WhiteButton>
                                                Sign up
                                            </WhiteButton>
                                        </div>
                                    </a>
                                </Link>
                               
                            </div>

                        </div>

                        <div className="topHeading">
                            <div className="personIcon">
                                <FurnitureVendorIcon />
                            </div>

                            <h1>Vendor log in</h1>
                        </div>



                        <div className="formsX flexRowDiv">
                            <div className="leftForm">

                                <h2>Either fill this form</h2>

                                <span></span>

                                <div className="inputWrapper">
                                    <input
                                        ref="emailAddress"
                                        type="email"
                                        placeholder="Type your email address here"
                                       

                                        onChange={(e) => this.validateEmail(e)}
                                    />
                                    <span className="InputSeparatorLine"> </span>
                                    {/* <div className="animationLine line">
                                        <div className="innerLine"></div>
                                    </div> */}
                                </div>
                                <p
                                    className={this.state.userEmailClass}
                                > {this.state.userEmailText} </p>

                                <span></span>

                                <div className="inputWrapper">
                                    <input
                                        ref="pWord"
                                        type="password"
                                        placeholder="Type your password here"
                                        onKeyPress={(e) => this.validatePassword(e)}
                                    />
                                    <span className="InputSeparatorLine"> </span>
                                </div>
                                <p
                                    className={this.state.passwordClass}
                                > {this.state.passwordText} </p>

                                <span></span>

                                <Link href="/log-in">
                                    <a>
                                        <div
                                            className="letsGoButton"
                                            onClick={() => this.validateAndSubmit()}
                                            >
                                            <GradientButton>
                                                Let me in!
                                            </GradientButton>
                                        </div>
                                    </a>
                                </Link>
                                
                                

                                <div 
                                    className="mediumBtn studentLoginBtn2" 
                                    // onClick={() => window.open('/register', '_self')} 
                                    onClick={() => {
                                        this.setState({
                                            loadingClass: 'loadingAnim',
                                            mainClass: 'mainClass hide',
                                        })
                                    }}
                                    >
                                    <Link href="/register">
                                        <a>
                                            If you are not yet registered, sign up by clicking here
                                        </a>
                                    </Link>
                                    {/* If you are not yet registered, sign up by clicking here */}
                                </div>

                            </div>

                            {/* <div className="orSplit"><h2>OR</h2></div> */}

                            <div className="socialNetworksForm">
                                <h2>or click one of these</h2>

                                <div
                                    className="googleConnect flexRowDiv"
                                    onClick={() => {
                                        localStorage.setItem("loginThrough", 'google')
                                        window.open(api.KNOCK_GOOGLE_VENDOR, '_self')
                                    }}
                                    >
                                    <div className="googleIcon">
                                        <GoogleIcon />
                                    </div>
                                    
                                    <span></span>

                                    <div className="socialNetworkText">Connect with Google</div>
                                </div>

                                <div
                                    className="linkedInConnect flexRowDiv"
                                    onClick={() => {
                                        localStorage.setItem("loginThrough", 'linkedin')
                                        window.open(api.KNOCK_LINKEDIN_VENDOR, '_self')
                                        
                                    }}
                                >
                                    <div className="linkedInIcon">
                                        <LinkedInIcon />
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



// {/* <div className="loginButtons">
// {/* // onClick={() => window.open('/register', '_self')} */}
//     <Link href="/register">
//         <a 
//             onClick={() => {
//                 this.setState ({
//                     loadingClass: 'loadingAnim',
//                     mainClass: 'mainClass hide',    
//                 })
            
            
//             }}
//         >
//         <div className="mediumBtn reddish" 
//             >
//             Sign up
//         </div>
//         </a>
//     </Link>
   
// </div> */}