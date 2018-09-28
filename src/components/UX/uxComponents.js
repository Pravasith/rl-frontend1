import "../../assets/sass/ux_components.scss"

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