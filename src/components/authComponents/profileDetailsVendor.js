import React from "react"

import "../../assets/sass/vendor_form.scss"

import Axios from "axios"
import { api } from "../../actions/apiLinks"


import { GoogleIcon, LinkedInIcon, TableIcon } from "../../assets/images/socialNetworkIcons";
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


 
