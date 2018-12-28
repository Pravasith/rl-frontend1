import React from "react"

import "../../assets/sass/html_slider.scss"

import LogoAnimation from "../animations/logoAnimation";
import { WhiteArrowLeft, WhiteArrowRight, TinyCloseButton, TinyEditButton } from "../../assets/images";

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

        }

        
    }

    componentDidMount = () => {

        if(
            this.props.categoryData.imagesInCategory.length - this.state.imageNumberCount + 1
            <= 
            this.props.numberOfSlides + 1
            ){

            this.setState({
                rightArrowClass : "hide",
            })
        }
    }

    

    showItems = (productDetailObject) => {

        const dummyArr = []
        let c = 0
        const numberOfSlidesToShow = productDetailObject.imagesInCategory.length >= this.props.numberOfSlides   ? this.props.numberOfSlides : productDetailObject.imagesInCategory.length 

        while(c < numberOfSlidesToShow){
            dummyArr.push(c)
            c++
        }

        const returnImagesInCategories = () => {

            
            const imageArray = productDetailObject.imagesInCategory.map((image, j) => {

                if(image.title){
                    return (

                        //     <img 
                        //     key={j} 
                        //     src={image.imageURL} 
                        //     alt={image.itemCode} 
                        //     onClick={() => this.props.runFunction(image)}
                        // />
                            <div className="imageDetails">
                                <div className="imageDetailsDummyWrap">
                                    <img 
                                        key={j} 
                                        src={image.imageURL} 
                                        alt={image.itemCode} 
                                        onClick={() => this.props.runFunction(image)}
                                    />
                                </div>
        
                                <div className="imageTitleContainer">
                                    <p>
                                        { image.title ? image.title.charAt(0).toUpperCase() + image.title.slice(1) : "" }
                                    </p>
                                </div>
                            </div>
                        )
                }

                else
                return (

                    //     <img 
                    //     key={j} 
                    //     src={image.imageURL} 
                    //     alt={image.itemCode} 
                    //     onClick={() => this.props.runFunction(image)}
                    // />
                        <div className="imageDetails">
                            <div className="imageDetailsDummyWrap noTitle">
                                <img 
                                    key={j} 
                                    src={image.imageURL} 
                                    alt={image.itemCode} 
                                    onClick={() => this.props.runFunction(image)}
                                />
                            </div>
    
                            
                        </div>
                    )
                // console.log(image)
                
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
        if(this.props.numberOfSlides === 1){  
            return {
                gridTemplateColumns : "1fr"
            }
        }

        else if(this.props.numberOfSlides === 2){
            return {
                gridTemplateColumns : "1fr 1fr"
            }
        }
        
        else if(this.props.numberOfSlides === 3){
            return {
                gridTemplateColumns : "1fr 1fr 1fr"
            }
        }

        else if(this.props.numberOfSlides === 4){
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
                this.props.numberOfSlides
                ){
                this.setState({
                    imageNumberCount : this.state.imageNumberCount + 1,
                    leftArrowClass : "leftArrowButton"
                })
            }

            if(this.props.categoryData.imagesInCategory.length - this.state.imageNumberCount 
                <= 
                // 5
                this.props.numberOfSlides + 1
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
                    
                    <div className="imageContainerMiddleLayer">
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