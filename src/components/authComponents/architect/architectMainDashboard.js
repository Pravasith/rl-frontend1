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
            menuDrop: "dummyWrapper hide",

            categories: [
                {
                    categoryName : "Furniture",
                    categoryId : "1",
                    subCategories : [
                        {
                            subCategoryName: "Sofas and Armchairs",
                            subCategoryId : "1",
                            productTypes: [
                                "Sofas",
                                "Armchairs",
                                "Easy chairs",
                                "Lounge Chairs",
                                "Day Beds",
                                "Small Sofas",
                                "Poufs",
                                "Footstools"
                            ] 
                        },
                        {
                            subCategoryName: "Tables and Chairs",
                            subCategoryId: "1",
                            productTypes: [
                                "Chairs",
                                "Stools",
                                "Indoor benches",
                                "Tables",
                                "Coffee Tables",
                                "Console Tables",
                                "Game tables",
                                "Writing Desks",
                                "Secretary desks"
                            ] 
                        },
                        {
                            subCategoryName: "Storage Systems and Units3",
                            subCategoryId: "1",
                            productTypes: [
                                "Bookcases",
                                "Storage walls",
                                "Sideboards",
                                "TV cabinets",
                                "Highboards",
                                "Display Cabinets",
                                "Hallway units",
                                "More..."
                            ] 
                        },
                        {
                            subCategoryName: "Sleeping area and children's bedrooms",
                            subCategoryId: "1",
                            productTypes: [
                                "Beds",
                                "Bedside tables",
                                "Wardrobes",
                                "Chests of drawers",
                                "Walk -in wardrobes",
                                "Headboards",
                                "Dressing tables",
                                "Kids' bedroom sets",
                                "More..."
                            ] 
                        },
                        {
                            subCategoryName: "Furniture components and hardware",
                            subCategoryId: "1",
                            productTypes: [
                                "Drawers",
                                "Cabinet doors",
                                "Table Tops",
                                "Table bases",
                                "More..."
                            ] 
                        }
                    ]
                },
                // {
                //     categoryName: "Category - 2",
                //     categoryId: "2",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 2/1",
                //             subCategoryId: "2"
                //         },
                //         {
                //             subCategoryName: "subCategory - 2/2",
                //             subCategoryId: "2"
                //         },
                //         {
                //             subCategoryName: "subCategory - 2/3",
                //             subCategoryId: "2"
                //         },
                //         {
                //             subCategoryName: "subCategory - 2/4",
                //             subCategoryId: "2"
                //         },
                //         {
                //             subCategoryName: "subCategory - 2/5",
                //             subCategoryId: "2"
                //         }
                //     ]
                // },
                // {
                //     categoryName: "Category - 3",
                //     categoryId: "3",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 3/1",
                //             subCategoryId: "3"
                //         },
                //         {
                //             subCategoryName: "subCategory - 3/2",
                //             subCategoryId: "1"
                //         },
                //         {
                //             subCategoryName: "subCategory - 3/3",
                //             subCategoryId: "1"
                //         },
                //         {
                //             subCategoryName: "subCategory - 3/4",
                //             subCategoryId: "1"
                //         },
                //         {
                //             subCategoryName: "subCategory - 3/5",
                //             subCategoryId: "1"
                //         }
                //     ]
                // },
                // {
                //     categoryName: "Category - 4",
                //     categoryId: "4",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 4/1",
                //             subCategoryId: "4"
                //         },
                //         {
                //             subCategoryName: "subCategory - 4/2",
                //             subCategoryId: "4"
                //         },
                //         {
                //             subCategoryName: "subCategory - 4/3",
                //             subCategoryId: "4"
                //         },
                //         {
                //             subCategoryName: "subCategory - 4/4",
                //             subCategoryId: "4"
                //         },
                //         {
                //             subCategoryName: "subCategory - 4/5",
                //             subCategoryId: "4"
                //         }
                //     ]
                // },
                // {
                //     categoryName: "Category - 5",
                //     categoryId: "5",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 5/1",
                //             subCategoryId: "5"
                //         },
                //         {
                //             subCategoryName: "subCategory - 5/2",
                //             subCategoryId: "5"
                //         },
                //         {
                //             subCategoryName: "subCategory - 5/3",
                //             subCategoryId: "5"
                //         },
                //         {
                //             subCategoryName: "subCategory - 5/4",
                //             subCategoryId: "5"
                //         },
                //         {
                //             subCategoryName: "subCategory - 5/5",
                //             subCategoryId: "5"
                //         }
                //     ]
                // },
                // {
                //     categoryName: "Category - 6",
                //     categoryId: "6",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 6/1",
                //             subCategoryId: "6"
                //         },
                //         {
                //             subCategoryName: "subCategory - 6/2",
                //             subCategoryId: "6"
                //         },
                //         {
                //             subCategoryName: "subCategory - 6/3",
                //             subCategoryId: "6"
                //         },
                //         {
                //             subCategoryName: "subCategory - 6/4",
                //             subCategoryId: "6"
                //         },
                //         {
                //             subCategoryName: "subCategory - 6/5",
                //             subCategoryId: "6"
                //         }
                //     ]
                // },
                // {
                //     categoryName: "Category - 7",
                //     categoryId: "7",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 7/1",
                //             subCategoryId: "7"
                //         },
                //         {
                //             subCategoryName: "subCategory - 7/2",
                //             subCategoryId: "7"
                //         },
                //         {
                //             subCategoryName: "subCategory - 7/3",
                //             subCategoryId: "7"
                //         },
                //         {
                //             subCategoryName: "subCategory - 7/4",
                //             subCategoryId: "7"
                //         },
                //         {
                //             subCategoryName: "subCategory - 7/5",
                //             subCategoryId: "7"
                //         }
                //     ]
                // },
                // {
                //     categoryName: "Category - 8",
                //     categoryId: "8",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 8/1",
                //             subCategoryId: "8"
                //         },
                //         {
                //             subCategoryName: "subCategory - 8/2",
                //             subCategoryId: "8"
                //         },
                //         {
                //             subCategoryName: "subCategory - 8/3",
                //             subCategoryId: "8"
                //         },
                //         {
                //             subCategoryName: "subCategory - 8/4",
                //             subCategoryId: "8"
                //         },
                //         {
                //             subCategoryName: "subCategory - 8/5",
                //             subCategoryId: "8"
                //         }
                //     ]
                // },
                // {
                //     categoryName: "Category - 9",
                //     categoryId: "9",
                //     subCategories: [
                //         {
                //             subCategoryName: "subCategory - 9/1",
                //             subCategoryId: "9"
                //         },
                //         {
                //             subCategoryName: "subCategory - 9/2",
                //             subCategoryId: "9"
                //         },
                //         {
                //             subCategoryName: "subCategory - 9/3",
                //             subCategoryId: "9"
                //         },
                //         {
                //             subCategoryName: "subCategory - 9/4",
                //             subCategoryId: "9"
                //         },
                //         {
                //             subCategoryName: "subCategory - 9/5",
                //             subCategoryId: "9"
                //         }
                //     ]
                // }
            ],

            categorySelected: ""
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
    //     console.log(this.state.menuDrop, this.state.categorySelected)
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

    returnFooter = () => {
        if (this.props.userData) {
            return (

                <div className="menuDropWrap"
                    onMouseEnter={() => {
                        this.setState({
                            menuDrop: "dummyWrapper"
                        })
                    }}

                    onMouseLeave={() => {
                        this.setState({
                            menuDrop: "dummyWrapper hide"
                        })
                    }}
                >

                    <div 
                        className="menuItemsFullWrap"
                        >
                        {this.state.categories.map((item,i) => {
                            return (
                                <div
                                    key={i}
                                    className="productsCategory"
                                    onMouseEnter={() => {
                                        this.setState({
                                            categorySelected: item.categoryId
                                        })
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

                    <div className={this.state.menuDrop}>
                        <div
                            className="dropdownModal"
                            >
                            <div className="gridWrapper">
                                {this.returnCategoryMenu()}
                            </div>
                            
                        </div>
                    </div>

                </div>
            )
        }
    }
    

    returnCategoryMenu = () => {
        const {categories, categorySelected} = this.state;

        return categories.map(item => {
            if (item.categoryId === categorySelected) {
                return item.subCategories.map((subItem, i) => {
                    
                    return (
                        <div key={i} className="subCategoryList">
                            <div className="subCategoryNameHead">
                                {subItem.subCategoryName}
                                <div className="productTypes">
                                        {subItem.productTypes.map((product, i) => {
                                            return (
                                                <div key={i} className="productNames">
                                                    {product}
                                                </div>
                                            )}
                                        )}
                                </div>
                            </div>
                        </div>
                    )
                })
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