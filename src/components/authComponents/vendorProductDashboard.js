import React from "react"

import "../../assets/sass/vendor_products.scss"

import { WhiteArrowLeft, WhiteArrowRight, UploadImageIcon,PlusButtonIcon } from "../../assets/images";
import LogoAnimation from "../animations/logoAnimation";
import { GradientButton, InputForm } from "../UX/uxComponents";
import HtmlSlider from "../UX/htmlSlider"


export default class VendorProductDashboard extends React.Component{

    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass',
            redirect: false
        }

    }

    render(){

        return(
            <div className="vendorProductDashboard">

                <div className={this.state.loadingClass}>
                    <LogoAnimation />
                </div>

                <div className={this.state.mainClass}>

                    <article className="vendorProductOuterLayer">
                        vendor-product-mangement-page
                    </article>

                </div>

            </div>
    
        )

    }

}