import React from "react"
import Head from 'next/head'
import Link from 'next/link'

// import '../../assets/sass/start_page.scss'

import { connect } from "react-redux"
import { bindActionCreators } from "redux"


import { hitApi, navBarLoadingAnimationShowHide } from "../../actions/generalActions"
import { getUserData } from "../../actions/userActions"

import LogoAnimation from "../animations/logoAnimation"
import Navbar from "../navbar/navbar"
import { Footer } from "../footer/footer"

import { FrontPageGraphic } from "../../assets/images";
import { GradientButton } from "../UX/uxComponents"
import { api } from "../../actions/apiLinks";
import { decryptData } from "../../factories/encryptDecrypt";


class StartPage extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',
            firstName: null,
        }
    }


    componentDidMount = () => {

        this.props.hitApi(
            api.GET_VENDOR_DATA,
            "GET"
        )
        .then(() => {
            let { responseData } = this.props

            let isUnauthorized = responseData.responsePayload.status === 401

            

            if(isUnauthorized){
                window.open("/home", "_self")
                // console.log("isUnauthorized")
            }

            else {
                //
                // DECRYPT REQUEST DATA
                //
                let decryptedData = {
                    ...decryptData(responseData.responsePayload.responseData)
                }
                //
                // DECRYPT REQUEST DATA
                //

                if(decryptedData.lifeCycleStage === 2){
                    window.open("/vendor/dashboard", "_self")
                }

                else if(decryptedData.lifeCycleStage === 1){
                    window.open("/vendor/profile-details", "_self")
                }

                
            }


            // if (responseData.responsePayload.message !== "User credentials not found") {

            //     //
            //     // DECRYPT REQUEST DATA
            //     //
            //     let decryptedData = {
            //         ...decryptData(responseData.responsePayload.responseData)
            //     }
            //     //
            //     // DECRYPT REQUEST DATA
            //     //

            //     console.log(decryptedData)

            // }

            // else{
            //     console.log("X")
            // }
        })
        
        // this.setState({
        //     loadingClass: 'loadingAnim hide',
        //     mainClass: 'mainClass',
        // })
    }   


    render() {
            
        return (
            <article className="homepageWrapper">
                
            

                <div className={this.state.loadingClass}>
                    <LogoAnimation text = "Bringing back the Art in Architecture."/>
                </div>

            </article>
        )
    }
}




const mapStateToProps = (state) => {
    return { userData: state.userData, responseData: state.responseDataFromAPI }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserData,
        hitApi,
        // navBarLoadingAnimationShowHide
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(StartPage)