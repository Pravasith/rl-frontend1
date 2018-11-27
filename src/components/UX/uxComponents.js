import "../../assets/sass/ux_components.scss"
import React from 'react'

export const GradientButton = (props) => {
    return (
        <div
            className="gradientButtonWrapper"
            onClick={() => {
                if (props.runFunction)
                    props.runFunction()
            }}
        >
            {props.children}
        </div>
    )
}

export const WhiteButton = (props) => {
    return (
        <div
            className="whiteButtonWrapper"
            onClick={() => {
                if (props.runFunction)
                    props.runFunction()
            }}
        >
            {props.children}
        </div>
    )
}

export class InputForm extends React.Component {

    // How to use this component -

    //     <InputForm
    //         refName="tagCategory"
    //         placeholder="For Ex. Sofa"
    //         isMandatory={false}
    //         validationType="alphabetsSpecialCharactersAndNumbers" 
    //         characterCount="20"
    //         value=""
    //         result={(val) => console.log(val)}
    //     />

    constructor(props, context) {
        super(props, context)

        this.state = {
            charCount: Number(this.props.characterCount),

            warningText: null,
            warningClass: "warningClass hide",
            fieldIsValid: false,
        }

    }

    componentDidMount = () => {

    }

    submitForm = (val) => {
        this
            .props
            .result(val)
    }

    validateForm = (e, validationType) => {

        if (validationType === "alphabetsAndSpecialCharacters") {
            const val = e.target.value

            this.setState({
                charCount: Number(this.props.characterCount) - val.length
            })

            if (this.props.isMandatory) {
                if (val === "")
                    this.setState({
                        warningText: "This information is required",
                        warningClass: "warningClass",
                        fieldIsValid: false,
                    })
            }

            if (!/^[a-zA-Z]*$/g.test(val))
                this.setState({
                    warningText: "Please enter english alphabets only.",
                    warningClass: "warningClass",
                    fieldIsValid: false,
                })

            if (val !== "" && /^[a-zA-Z]*$/g.test(val)) {
                this.setState({
                    warningText: null,
                    warningClass: "warningClass hide",
                    fieldIsValid: true,
                })

                this
                    .props
                    .result(val)
            }
        }

        else if (validationType === "alphabetsAndNumbers") {
            const val = e.target.value

            this.setState({
                charCount: Number(this.props.characterCount) - val.length
            })

            if (this.props.isMandatory) {
                if (val === "")
                    this.setState({
                        warningText: "This information is required",
                        warningClass: "warningClass",
                        fieldIsValid: false,
                    })
            }

            if (!/^[0-9a-zA-Z]*$/g.test(val))
                this.setState({
                    warningText: "Please enter alphabets or/and numbers only.",
                    warningClass: "warningClass",
                    fieldIsValid: false,
                })

            if (val !== "" && /^[0-9a-zA-Z]*$/g.test(val)) {
                this.setState({
                    warningText: null,
                    warningClass: "warningClass hide",
                    fieldIsValid: true,
                })

                this
                    .props
                    .result(val)
            }
        }


        else if (validationType === "onlyMobileNumbers") {
            const val = e.target.value

            this.setState({
                charCount: Number(this.props.characterCount) - val.length
            })

            // if (this.props.isMandatory)
            if (val.length !== Number(this.props.characterCount)) {
                this.setState({
                    warningText: "Remember, the number has to be valid",
                    warningClass: "warningClass",
                    fieldIsValid: false,
                })
            }


            if (!/^[0-9]+$/.test(val)) {
                this.setState({
                    warningText: "Numbers only",
                    warningClass: "warningClass",
                    fieldIsValid: false,
                })
            }

            if (this.props.isMandatory)
                if (val.length === 0) {
                    this.setState({
                        warningText: "This information is required",
                        warningClass: "warningClass",
                        fieldIsValid: false,
                    })
                }


            if (!this.props.isMandatory)
                if (val.length === 0) {
                    this.setState({
                        warningText: null,
                        warningClass: "warningClass hide",
                        fieldIsValid: true,
                    })
                }



            if (val.length === Number(this.props.characterCount) && /^[0-9]+$/.test(val)) {
                this.setState({
                    warningText: null,
                    warningClass: "warningClass hide",
                    fieldIsValid: true,
                })

                this
                    .props
                    .result(val)
            }


        }

        else if (validationType === "onlyNumbers") {
            const val = e.target.value

            this.setState({
                charCount: Number(this.props.characterCount) - val.length
            })

            // if (this.props.isMandatory)
            // if (val.length !== Number(this.props.characterCount)) {
            //     this.setState({
            //         warningText: "Remember, the number has to be valid",
            //         warningClass: "warningClass",
            //         fieldIsValid: false,
            //     })
            // }


            if (!/^[0-9]+$/.test(val)) {
                this.setState({
                    warningText: "Numbers only",
                    warningClass: "warningClass",
                    fieldIsValid: false,
                })
            }

            if (this.props.isMandatory)
                if (val.length === 0) {
                    this.setState({
                        warningText: "This information is required",
                        warningClass: "warningClass",
                        fieldIsValid: false,
                    })
                }


            if (!this.props.isMandatory)
                if (val.length === 0) {
                    this.setState({
                        warningText: null,
                        warningClass: "warningClass hide",
                        fieldIsValid: true,
                    })
                }



            if (val.length !== 0 && /^[0-9]+$/.test(val)) {
                this.setState({
                    warningText: null,
                    warningClass: "warningClass hide",
                    fieldIsValid: true,
                })

                this
                    .props
                    .result(val)
            }


        }

        else if (validationType === "alphabetsSpecialCharactersAndNumbers") {
            const val = e.target.value

            this.setState({
                charCount: Number(this.props.characterCount) - val.length
            })

            if (this.props.isMandatory)
                if (val === "")
                    this.setState({
                        warningText: "This information is required",
                        warningClass: "warningClass",
                        fieldIsValid: false,
                    })


            if (val !== "") {
                this.setState({
                    warningText: null,
                    warningClass: "warningClass hide",
                    fieldIsValid: true,
                })

                this
                    .props
                    .result(val)
            }
        }
    }

    returnMandatory = () => {
        if (this.props.isMandatory)
            return (
                <div className="mandatorySection">
                    <p>Mandatory</p>
                </div>
            )

        else
            return <div className="mandatorySection"></div>
    }

    render() {
        return (

            <div className="inputCommonWrapper">

                <div className="inputCategorySection" >

                    {this.returnMandatory()}

                    <div className="inputColumn">
                        <input
                            ref={this.props.refName}
                            type="text"
                            placeholder={this.props.placeholder}
                            maxLength={this.props.characterCount}
                            onKeyPress={e => {

                                if (e.key === "Enter") {
                                    e.preventDefault()
                                    this.submitForm(e.target.value)
                                }
                            }}
                            onChange={e => this.validateForm(e, this.props.validationType)}
                            defaultValue={this.props.value ? this.props.value : ""}
                        />

                        <span className="InputSeparatorLine"> </span>

                        {/* <div className="animationLine line">
                            <div className="innerLine"></div>
                        </div> */}

                        <div className="warningSection">
                            <p
                                className={this.state.warningClass}
                            >
                                {this.state.warningText}
                            </p>
                        </div>
                    </div>

                    <div className="countSection">
                        <p
                            ref="charCount"
                        >
                            {this.state.charCount}
                        </p>
                    </div>
                </div>

            </div>
        )
    }

}

export const SelectList = (props) => {
    // console.log(props)
    return(
        <div className="selectList">
            <label>{props.title}</label>
            <select
                id={props.categoryId}
                name={props.name}
                value={props.value}
                onChange={props.handleChange}
                className=""
            >
            <option value="" disabled>{props.placeholder}</option>
            {props.options.map(option => {
                return (
                    <option 
                        key={option.categoryId}
                        value={option.categoryName}
                        label={option.categoryName}>{option.value}</option>
                )
            })}
            </select>
        </div>
    )
}

export const RadioButton = (props) => {
    // console.log(props)
    return (
        <div className="radio-outline">
            <div className="radio-mid">
                {props.options.map(option => {
                    // console.log(option)
                    return (
                        <label key={option.id} className="radio-inline">
                            <input
                                id={option.id}
                                name={props.name}
                                onChange={props.onChange}
                                value={option.value}
                                checked={props.selectedOption ? props.selectedOption.indexOf(option.value) > -1 : false}
                                type="radio" 
                            />
                            <span className ="checkmark"></span>
                            <p>{option.value} years</p>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}

