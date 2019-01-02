import React from "react"
import { Image } from 'cloudinary-react'

import "../../assets/sass/html_slider.scss"

import PublicId from '../../factories/cloudinaryFactory'
import LogoAnimation from "../animations/logoAnimation"
import { WhiteArrowLeft, WhiteArrowRight, TinyCloseButton, TinyEditButton } from "../../assets/images"



// Use component like this 

// <FixedSlides
//     categoryData = { item } // format of Item 
//     numberOfSlides = { 4 } // Change the css grid properties for responsiveness
//     textOnRibbon = { "TRENDING NOW" } // All caps
//     runFunction={(data) => ///} // onClick function
// />

// Format of Item

// { 
//     categoryName : "Water bodies",
//     imagesInCategory : [
//         {
//             itemCode : "WB12",
//             textOnRibbonSatisfied : true,
//             imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXk1JV3DCwbJU_lNhIur-A3jZD8NnU89SN8WY_7h5B0zdqRbYceg"
//         },
//         {
//             itemCode : "WB13",
//             textOnRibbonSatisfied : false,
//             imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRlNZc4WlFWnRym1Gpz9mzE8T-VpG_SqrKI2Ju1Ej6b0bmzjYrww"
//         },
//         {
//             itemCode : "WB14",
//             textOnRibbonSatisfied : false,
//             imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnFm-l4w9PMzZ_m-o60l7aL0YSb-xcs_xRh74aaVU_avdYgc0s7g"
//         },
//         {
//             itemCode : "WB15",
//             textOnRibbonSatisfied : false,
//             imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJk1dKAanCmnxn8w5mEsGWKgFRUwP1rXQNtiaJLe4-AjLM7OEYQ"
//         },
//     ]
// }, 


export default class HtmlSlider extends React.Component{

    constructor(props, context) {
        super(props, context)

        this.state = {

            loadingClass: 'loadingAnim hide',
            mainClass: 'mainClass ',
            firstName: null,

            imageNumberCount : 0,

            rightArrowClass : "rightArrowButton",
            leftArrowClass : "hide",

            imageCountFromProps : this.props.numberOfSlides

        }

        
    }

    adjustAndSetGridTemplateCols = (screenWidth) => {
        // return this.returnTemplateCols()

        if(screenWidth <= 1024) {
            this.setState({
                imageCountFromProps : 3
            })
        }
        else if(screenWidth <= 768){
            this.setState({
                imageCountFromProps : 2
            })
        }
    }

    updateDimensions = () => {

        let w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    
            // this.setState({width: width, height: height})

            this.adjustAndSetGridTemplateCols(width)

            // console.log(width)
            // if you are using ES2015 I'm pretty sure you can do this: this.setState({width, height});
    }


    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }

    componentDidMount = () => {

        window.addEventListener("resize",  this.updateDimensions);

        if(
            this.props.categoryData.imagesInCategory.length - this.state.imageNumberCount + 1
            <= 
            this.state.imageCountFromProps + 1
            ){

            this.setState({
                rightArrowClass : "hide",
            })
        }
    }

    

    showItems = (productDetailObject) => {

        const dummyArr = []
        let c = 0
        const numberOfSlidesToShow = productDetailObject.imagesInCategory.length >= this.state.imageCountFromProps   ? this.state.imageCountFromProps : productDetailObject.imagesInCategory.length 

        while(c < numberOfSlidesToShow){
            dummyArr.push(c)
            c++
        }

        const returnImagesInCategories = () => {

            const imageArray = productDetailObject.imagesInCategory.map((image, j) => {
                if(image.title){
                    return(
                        <div key={j} className="imageDetails">
                            <div className="imageDetailsDummyWrap">
                                <Image 
                                    cloudName="rolling-logs" 
                                    alt = {image.itemCode}
                                    publicId={PublicId(image.imageURL)} 
                                    // transformations
                                    width="300" 
                                    crop="scale"
                                    onClick={() => {
                                        this.props.runFunction(image)
                                    }}
                                />
                            </div>
    
                            <div className="imageTitleContainer">
                                <h3>
                                    { image.title ? image.title.charAt(0).toUpperCase() + image.title.slice(1) : "" }
                                </h3>
                            </div>
                        </div>
                    )
                }

                else{
                    return(
                        <div key={j} className="imageDetails">
                            <div className="imageDetailsDummyWrap noTitle">
                                <Image 
                                    cloudName="rolling-logs" 
                                    alt = {image.itemCode}
                                    publicId={PublicId(image.imageURL)} 
                                    // transformations
                                    width="300" 
                                    crop="scale"
                                    onClick={() => this.props.runFunction(image)} 
                                />
                            </div>
                        </div>
                    )
                }
                
            })

            return imageArray
        }

        const isTrendingArray = () => {
            const trendingArray = productDetailObject.imagesInCategory.map((image, j) => {
                return (
                    image.textOnRibbonSatisfied
                )
            })

            return trendingArray
        }

        return dummyArr.map((item, i) => {
            return (
                <div 
                    className="outerMostLayer"
                    key={i}
                    >

                    <div className="innerWrapperImage">

                        <div className="productCatalogueImage">
                            <div className="outerProductImageLayer">
                                <div className="innerImageLayer">
                                    <div className="imgConatiner">
                                        <div className="imgOuterLayer">
                                            { [...returnImagesInCategories()][this.state.imageNumberCount + i] }

                                            <div className="editAndDeleteButtons">
                                                <div className="editAndDeleteWrap">
                                                    {/* <TinyEditButton/> */}
                                                    {/* <TinyCloseButton/> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className = { [...isTrendingArray()][this.state.imageNumberCount + i] ? "tagContainer" : "hide"  }   >
                            <div className="textOnRibbon">
                                <p>{this.props.textOnRibbon}</p>
                            </div>

                            <div className="leftTriangle"></div>

                            <div className="rightTriangle">
                                <div className="topTriangle"></div>
                                <div className="botTriangle"></div>
                            </div>
                        </div>

                    </div>

                </div>
            )
        })

    }

    returnTemplateCols = () => {




        if(this.state.imageCountFromProps === 1){  
            return {
                gridTemplateColumns : "1fr"
            }
        }

        else if(this.state.imageCountFromProps === 2){
            return {
                gridTemplateColumns : "1fr 1fr"
            }
        }
        
        else if(this.state.imageCountFromProps === 3){
            return {
                gridTemplateColumns : "1fr 1fr 1fr"
            }
        }

        else if(this.state.imageCountFromProps === 4){
            return {
                gridTemplateColumns : "1fr 1fr 1fr 1fr"
            }
        }

        else
        return {
            gridTemplateColumns : "1fr 1fr 1fr"
        }
    }


    showNextOrPreviousImage = (nextOrPrev) => {

        if(nextOrPrev === "prev"){

            if(this.state.imageNumberCount > 0){
                this.setState({
                    imageNumberCount : this.state.imageNumberCount - 1,
                    rightArrowClass : "rightArrowButton"
                })
            }

            if(this.state.imageNumberCount <= 1){
                this.setState({
                    leftArrowClass : "hide"
                })
            }

            
        }

        else if(nextOrPrev === "next" ){

            // console.log(this.state.imageNumberCount, this.props.categoryData.imagesInCategory.length - this.state.imageNumberCount)
            if(this.props.categoryData.imagesInCategory.length - this.state.imageNumberCount 
                > 
                // 4
                this.state.imageCountFromProps
                ){
                this.setState({
                    imageNumberCount : this.state.imageNumberCount + 1,
                    leftArrowClass : "leftArrowButton"
                })
            }

            if(this.props.categoryData.imagesInCategory.length - this.state.imageNumberCount 
                <= 
                // 5
                this.state.imageCountFromProps + 1
                ){
                this.setState({
                    rightArrowClass : "hide"
                })
            }
        }

    }




    render(){

        return(
            <div className="productView">
                <div className="innerViewProductLayer">

                    <div className="arrowButtonContainer">
                        <div 
                            className = {this.state.leftArrowClass}
                            onClick = {() => {
                                this.showNextOrPreviousImage("prev")
                            }}
                            >
                            <WhiteArrowLeft/>
                        </div>
                    </div>
                    
                    <div 
                        className="imageContainerMiddleLayer"
                        style = {this.returnTemplateCols()}
                        >
                        { this.showItems(this.props.categoryData) }
                    </div>

                    <div className="arrowButtonContainer">
                        <div 
                            className = {this.state.rightArrowClass}
                            onClick = {() => {
                                this.showNextOrPreviousImage("next")
                            }}
                            >
                            <WhiteArrowRight/>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}