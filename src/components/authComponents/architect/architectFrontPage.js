import React, { Component } from 'react';

import "../../../assets/sass/architect_front_page.scss"

import Head from 'next/head'

import Navbar from "../../navbar/navbar";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import LogoAnimation from "../../animations/logoAnimation"


class ArchitectFrontPage extends Component {

    constructor(props, context){
        super(props, context);

        this.state ={
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass'
        }
    }


componentDidMount = async () => {

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

render() {
    return(
        <div className="archtectHomePage">
            <div className={this.state.loadingClass}>
                <LogoAnimation
                    text="We are loading..."
                />
            </div>
            <div className={this.state.mainClass}>
                <div className="sliderClass one">One</div>
                <div className="sliderClass two">Two</div>
                <div className="sliderClass three">Three</div>
                <div className="sliderClass four">Four</div>
            </div>
        </div>
    )
}

}
const mapStateToProps = (state) => {
    return {userData: state.userData, responseData: state.responseDataFromAPI}
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        // getUserData,
        // hitApi,
        // navBarLoadingAnimationShowHide
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ArchitectFrontPage)