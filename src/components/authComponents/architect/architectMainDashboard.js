import React, { Component } from 'react';

import "../../../assets/sass/architect_main_dashboard.scss"

import Navbar from "../../navbar/navbar";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import LogoAnimation from "../../animations/logoAnimation"

import {hitApi, navBarLoadingAnimationShowHide} from "../../../actions/generalActions"
import {getUserData} from "../../../actions/userActions"
import { api } from '../../../actions/apiLinks';
import { decryptData } from '../../../factories/encryptDecrypt';

class ArchitectMainDashboard extends Component {



    constructor(props, context) {
        super(props, context)

        this.state = {
            loadingClass: 'loadingAnim',
            mainClass: 'mainClass hide',
            menuDrop: "menuDrop hide",

            categories: [
                {
                    categoryName : "Category - 1",
                    categoryId : "1",
                    subCategories : {
                        subCategoryName: "subCategory - 1",
                        subCategoryId : "1"
                    }
                },
                {
                    categoryName: "Category - 2",
                    categoryId: "2",
                    subCategories: {
                        subCategoryName: "subCategory - 2",
                        subCategoryId: "2"
                    }
                },
                {
                    categoryName: "Category - 3",
                    categoryId: "3",
                    subCategories: {
                        subCategoryName: "subCategory - 3",
                        subCategoryId: "3"
                    }
                },
                {
                    categoryName: "Category - 4",
                    categoryId: "4",
                    subCategories: {
                        subCategoryName: "subCategory - 4",
                        subCategoryId: "4"
                    }
                },
                {
                    categoryName: "Category - 5",
                    categoryId: "5",
                    subCategories: {
                        subCategoryName: "subCategory - 5",
                        subCategoryId: "5"
                    }
                },
                {
                    categoryName: "Category - 6",
                    categoryId: "6",
                    subCategories: {
                        subCategoryName: "subCategory - 6",
                        subCategoryId: "6"
                    }
                },
                {
                    categoryName: "Category - 7",
                    categoryId: "7",
                    subCategories: {
                        subCategoryName: "subCategory - 7",
                        subCategoryId: "7"
                    }
                },
                {
                    categoryName: "Category - 8",
                    categoryId: "8",
                    subCategories: {
                        subCategoryName: "subCategory - 8",
                        subCategoryId: "8"
                    }
                },
                {
                    categoryName: "Category - 9",
                    categoryId: "9",
                    subCategories: {
                        subCategoryName: "subCategory - 9",
                        subCategoryId: "9"
                    }
                }
            ]
        }

    }



    componentDidMount = async () => {

        await Promise.all([
            this.props.getUserData(),
        ])

            .then(() => {

                let { userData } = this.props

                if (userData.message !== "User credentials not found") {

                    //
                    // DECRYPT REQUEST DATA
                    //
                    let decryptedData = {
                        ...decryptData (userData.responseData),
                    }
                    //
                    // DECRYPT REQUEST DATA
                    //

                    this.setState({
                        firstName: decryptedData.firstName,
                        lastName: decryptedData.lastName,
                        professionalTitle: decryptedData.professionalTitle,
                        profilePicture: decryptedData.profilePicture,

                        

                        ////////
                        loadingClass: 'loadingAnim hide',
                        mainClass: 'mainClass',
                    })
                }
            })

            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401)
                        window.open('/log-in', "_self")
                }

                else
                    console.error(err)
            })

    }

    // componentDidUpdate = () => {
    //     console.log(this.state.firstName)
    // }
    

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

    
    toggleClass = (categoryMenu) => {

        if (categoryMenu === 'toggleMenu') {
            if (this.state.menuDrop === "menuDrop") {
                this.setState({
                    menuDrop: "menuDrop hide"
                })
            }

            if (this.state.menuDrop === "menuDrop hide") {
                this.setState({
                    menuDrop: "menuDrop"
                })
            }
        }

    }

    returnFooter = () => {
        if (this.props.userData) {
            return (

                <div className="menuDropWrap">

                    <div className="menuItemsFullWrap">
                        {this.state.categories.map(item => {
                            return (
                                <div
                                    key={item.categoryId}
                                    className="productsCategory"
                                    onMouseEnter={() => {
                                        this.toggleClass('toggleMenu')
                                        this.setState({
                                            categorySelected: item.categoryId
                                        })
                                    }}
                                    onMouseLeave={() => {
                                        this.toggleClass('toggleMenu')
                                    }}
                                >
                                    <ul>
                                        <li>
                                            {item.categoryName}
                                        </li>
                                    </ul>

                                </div>
                            )
                            }
                        )}


                    </div>

                    <div className="dropdownModal">
                        {this.returnCategoryMenu()}
                    </div>

                </div>
            )
        }
    }
    
    handleCategoryMenu = (categoryName) => {
        if(categoryName === "category - 1") {
            console.log(categoryName)
            this.setState({
                categorySelected: categoryName
            })
        }
    }

    returnCategoryMenu = () => {
        const {categories, categorySelected} = this.state;

        return categories.map(item => {
            if (item.categoryId === categorySelected) {
                return(
                    <div key={item.subCategories.subCategoryId} className="categoryDropDownMenu">
                        <p>{item.subCategories.subCategoryName}</p>
                    </div>
                )
            }
        })
    }

    render() {
        return (
        <div className="architectDashboard">
                <div className={this.state.loadingClass}>
                    <LogoAnimation
                        text="We are loading..."
                    />
                </div>      
                <div className={this.state.mainClass}>
                    <div className="maskLayer">
                        <Navbar
                            userData={this.returnNavBarData()}
                        />
                    </div>
                </div>
                <div
                    style = {{width : "100%", height : "5em", background : "yellow"}}
                >
                </div>
                <div className="productCategoriesWrapper">
                    {this.returnFooter()}
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
        getUserData,
        hitApi,
        navBarLoadingAnimationShowHide
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(ArchitectMainDashboard)