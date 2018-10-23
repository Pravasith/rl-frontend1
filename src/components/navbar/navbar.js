import React, { Component } from 'react'
import Link from 'next/link'

import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { RollingLogsLogo, ProfilePictureIcon, DropDownIcon, ProfilePageIcon, SignOutIcon, NavBarLoadingIcon } from '../../assets/images'
import { GradientButton, WhiteButton } from '../UX/uxComponents'

import { navBarLoadingAnimationShowHide, hitApi } from '../../actions/generalActions'

import "../../assets/sass/navbar.scss"
import { api } from '../../actions/apiLinks';

class Navbar extends Component {
    constructor(props){
        super(props)
        this.props = props

        this.state = {
            menuDrop: "menuDrop hide",
            triangle: "dropDownIcon",
        }
    }

    componentDidMount = () => {
        
    }
    

    toggleClass = (theIcon) => {

        if (theIcon === 'cornerMenu') {
            if (this.state.menuDrop === "menuDrop") {
                this.setState({
                    menuDrop: "menuDrop hide",
                    triangle: "dropDownIcon"
                })
            }

            if (this.state.menuDrop === "menuDrop hide") {
                this.setState({
                    menuDrop: "menuDrop",
                    triangle: "dropDownIcon rotated"
                })
            }
        }

    }

    returnProfilePicture = () => {

        // console.log(this.props.userData)

        if(this.props.userData.profilePicture )
            return <img src={this.props.userData.profilePicture} alt="" />

        else
            return <ProfilePictureIcon />
    }


    returnFooter = () => {

        if(this.props.userData){
            return (
                <footer>
                    <div className="menu"
                        tabIndex={0}

                        onMouseEnter={() => {
                            this.toggleClass('cornerMenu')
                        }}

                        onMouseLeave={() => {
                            this.toggleClass('cornerMenu')
                        }}
                    >

                        <div className="profilePicTiny">
                            <div className="innerWrap">
                                { this.returnProfilePicture() }
                            </div>
                        </div>

                        <div className={this.state.triangle}>
                            <DropDownIcon />
                        </div>

                        <div className="menuDropWrap">

                            <div className={this.state.menuDrop}>
                                <div className="dummyWrap"></div>

                                <div className="menuItemsFullWrap">
                                    <div
                                        className="menuItem"
                                        onClick={() => {
                                            window.open('/profile-view/' + this.props.userData._id, '_self')
                                        }}
                                    >

                                        <div className="icon">
                                            <ProfilePageIcon />
                                        </div>

                                        <p>My profile</p>
                                    </div>

                                    <Link
                                        href = {api.USER_SIGN_OUT}
                                        >
                                        <a>
                                            <div
                                                className="menuItem"
                                            // onClick={() => this.signOut()}
                                            >

                                                <div className="icon">
                                                    <SignOutIcon />
                                                </div>
                                                <p>Sign out</p>
                                            </div>
                                        </a>
                                        
                                    </Link>
                                  
                                </div>

                            </div>
                        </div>


                    </div>

                </footer>
            )
        }

        else{
            return (
                <footer
                    className="loginAndSignUpButtons"
                >

                    <section className="signUpButton">
                        <Link href="/register">
                            <a >
                                <GradientButton>
                                    Sign up
                                </GradientButton>
                            </a>
                        </Link>
                    </section>

                    <section className="logInButton">
                        <Link href="/log-in">
                            <a >
                                <WhiteButton>
                                    Log in
                                </WhiteButton>
                            </a>
                        </Link>
                    </section>

                </footer>
            )
        }
       
    }

    render () {
        return (
            <nav>
                <div className = "navbarHeaderClass">

                    <header 
                        className = {this.props.hideLogo ? "hide" : "rollingLogsLogo"}
                        >

                        <Link href="/">
                            <a
                                title="Architects, Interior Designers Marketplace in India"
                                >
                                <RollingLogsLogo />
                            </a>
                        </Link>

                    </header>

                    <article>
                        <div
                            // className= { this.state.loadingAnimation } 
                            className= {this.props.navBarLoadingClass.loadingAnimationClass}
                            >
                            <div className="loadingIcon"
                                >
                                <NavBarLoadingIcon />
                            </div>

                        </div>
                    </article>

                    { this.returnFooter() }

                </div>
            </nav>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        navBarLoadingClass: state.navBarLoadingClass,
        responseData: state.responseDataFromAPI
    }
}

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        navBarLoadingAnimationShowHide,
        hitApi
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Navbar)
