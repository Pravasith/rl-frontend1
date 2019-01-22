import React from "react"
import Head from 'next/head'
import Link from 'next/link'

// import '../../assets/sass/start_page.scss'



import LogoAnimation from "../animations/logoAnimation"
import Navbar from "../navbar/navbar"
import { Footer } from "../footer/footer"


import { GradientButton } from "../UX/uxComponents"



export default class ArchitectHome extends React.Component {

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

                <section 
                    className = {this.state.mainClass}
                    >
                    <div className="mainBackgroundGradient">
                        
                    </div>

                </section>
            </article>
        )
    }
}




