import "../../assets/sass/ux_components.scss"
import React from 'react'

export const GradientButton = (props) => {
    return (
        <div className="gradientButtonWrapper">
            {props.children}
        </div>
    )
}

export const WhiteButton = (props) => {
    return (
        <div className="whiteButtonWrapper">
            {props.children}
        </div>
    )
}

export class InputForm extends React.Component {

    constructor(props, context){
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

        if (validationType === "alphabetsAndSpecialCharacters"){
            const val = e.target.value

            this.setState({
                charCount: Number(this.props.characterCount) - val.length
            })


            if(this.props.isMandatory){
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
            

            if (val !== "" && /^[a-zA-Z]*$/g.test(val)){
                this.setState({
                    warningText: null,
                    warningClass: "warningClass hide",
                    fieldIsValid: true,
                })

                this
                    .props
                    .result (val)
            }
        }


        else if (validationType === "onlyNumbers") {
            const val = e.target.value

            this.setState({
                charCount: Number(this.props.characterCount) - val.length
            })

            if (this.props.isMandatory)
            if (val.length !== 10) {
                this.setState({
                    warningText: "Remember, your number has to be valid",
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

            if(this.props.isMandatory)
            if(val.length === 0)
                this.setState({
                    warningText: "This information is required",
                    warningClass: "warningClass",
                    fieldIsValid: false,
                })

            if (!this.props.isMandatory)
            if (val.length === 0)
                this.setState({
                    warningText: null,
                    warningClass: "warningClass hide",
                    fieldIsValid: true,
                })


            if (val.length === 10 && /^[0-9]+$/.test(val))
            this.setState({
                warningText: null,
                warningClass: "warningClass hide",
                fieldIsValid: true,
            })

        }

        else if (validationType === "alphabetsSpecialCharactersAndNumbers"){
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
        if(this.props.isMandatory)
        return (
            <div className="mandatorySection">
                <p>Mandatory</p>
            </div>
        )

        else
        return (
            <div className="mandatorySection">
            </div>
        )
    }

    render() {
        return (

            <div className="inputCommonWrapper">

                <div className="inputCategorySection" >



                    { this.returnMandatory() }

                    <div className="inputColumn">
                        <input
                            ref= { this.props.refName }
                            type= "text"
                            placeholder= { this.props.placeholder }
                            maxLength= { this.props.characterCount }
                            onKeyPress= { e => {
                                if (e.key === "Enter") {
                                    this.submitForm(e.target.value)
                                }
                            }}
                            onChange= { e => this.validateForm(e, this.props.validationType) }
                            defaultValue= {this.props.value ? this.props.value : ""}
                        />

                        <span class="InputSeparatorLine"> </span>

                        {/* <div className="animationLine line">
                            <div className="innerLine"></div>
                        </div> */}

                        <div className="warningSection">
                            <p
                                className= { this.state.warningClass }
                            >
                                { this.state.warningText }
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

