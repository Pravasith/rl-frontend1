import React, { Component } from 'react'
import Link from 'next/link'
import { RollingLogsLogo } from '../../assets/images';
import { GradientButton, WhiteButton } from '../UX/uxComponents';


class Navbar extends Component {
    constructor(props){
        super(props)
        this.props = props
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

                    <article></article>

                    <footer
                        className = "loginAndSignUpButtons"
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
                    
                </div>
            </nav>
        )
    }
}

export default Navbar



