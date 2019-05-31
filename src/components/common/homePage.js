import React from "react"
import Head from 'next/head'
import Link from 'next/link'

// import '../../assets/sass/start_page.scss'



import LogoAnimation from "../animations/logoAnimation"
import Navbar from "../navbar/navbar"
import { Footer } from "../footer/footer"

import { FrontPageGraphic } from "../../assets/images";
import { GradientButton } from "../UX/uxComponents"
import { api } from "../../actions/apiLinks";
import { decryptData } from "../../factories/encryptDecrypt";


export default class HomePage extends React.Component {

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',
            firstName: null,
        }
    }


    componentDidMount = () => {

        this.setState({
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',
        })
    }   


    render() {
            
        return (
            <article className="homepageWrapper">
                <Head>
                    <meta name="description" content="Architectural process from Rolling Logs, start building your dream home without any hassle in India." />
                    <meta name="robots" content="noodp" />
                    <link rel="canonical" href="https://www.rollinglogs.com/architecture/" />
                    <link rel = "next" href = "https://www.rollinglogs.com/architecture/page/2/" />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="object" />
                    <meta property="og:description" content="Architects, Interior Designers Marketplace in India" />
                    <meta property="og:url" content="https://www.rollinglogs.com/architecture/" />
                    <meta property="og:site_name" content="RollingLogs" />
                    {/* <meta property="og:image" content="http://static.dezeen.com/assets/images/logo-magazine.png" /> */}
                    <title>Start building your dream home without any hassle in India - Rolling Logs</title>
                </Head>

            

                <div className={this.state.loadingClass}>
                    <LogoAnimation text = "Bringing back the Art in Architecture."/>
                </div>

                <section className = {this.state.mainClass}>
                    <header>
                        <div className="wrapperForNavbar">
                            <Navbar 
                                hideLogo = {true} 
                            />
                        </div>
                    </header>
                    <section className="mainContentSection">
                        <div className="contentSectionInnerLayer">
                            <header className="vendorMainHeaderSection">
                                <h3>Showcase and sell your products/materials
                                    to architects and interior designers</h3>
                                <div className="line"></div>
                            </header>
                            <div className="architectureFrontContent">
                                <div className="architectureFrontContentInnerLayer">

                                    <div className="frontPageLeftSection">
                                        <div className="svgImageInnerLayer">
                                            <FrontPageGraphic />
                                        </div>
                                    </div>

                                    

                                    <div className="frontPageRightSection">
                                        <div className="rightSectionInnerLayer">
                                            <div className="rightSectionContentWrapper">
                                                <div className="rightSectionContentWrapperInnerLayer">
                                                    <ul>
                                                        <h3 className="one">
                                                            <li>Build your profile, share it on social media</li>
                                                        </h3>
                                                        <h3 className="two">
                                                            <li>Upload and manage your products on an
                                                            amazingly user friendly dashboard</li>
                                                        </h3>
                                                        <h3 className="three">
                                                            <li>Send quotes to architects, negotiate,
                                                            deliver and get paid online!</li>
                                                        </h3>
                                                    </ul>
                                                </div>
                                                <div className="ProceedButtonContainer">
                                                    <Link href="/register">
                                                        <a 
                                                            onClick={() => {
                                                                this.setState ({
                                                                    loadingClass: 'loadingAnim',
                                                                    mainClass: 'mainClass hide',    
                                                                })
                                                            }}
                                                        >
                                                            <GradientButton>
                                                                Get started
                                                            </GradientButton>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                <Footer />
            </article>
        )
    }
}




