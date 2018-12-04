

// class Switch extends React.Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             isChecked: null
//         }
//     }

//     componentWillMount() {
//         this.setState({ isChecked: this.props.isChecked });
//     }


//     render() {

//         return (
//             <div className="switch-container">
//                 <label>
//                     <input 
//                         ref="switch" 
//                         checked={this.state.isChecked} 
//                         onChange={this._handleChange} 
//                         className="switch" 
//                         type="checkbox" />
//                         <div>

//                         <div></div>
//                     </div>
//                 </label>
//             </div>
//         );
//     }


//     _handleChange() {
//         this.setState({ isChecked: !this.state.isChecked });
//     }

// }


                // if(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorCode)) {

                //     let alreadyExistingColorName;

                //     if(colorArray.length === 0){
                //         isColorValid = true
                //         colorArray.push({
                //             colorName : colorName.toLowerCase(),
                //             colorCode : colorCode.toLowerCase()
                //         })
                //     }

                //     else{
                //         let colorDoesntExist = true

                //         // console.log("---------------------------------------------------")
                //         colorArray.map((item, i) => {

                //             // console.log("item.colorName, item.colorCode, colorCode", item.colorName, item.colorCode, colorCode, i)
                //             colorCode = colorCode.toLowerCase()

                //             // console.log(item.colorCode !== colorCode)

                //             if(item.colorCode === colorCode){
                //                 colorDoesntExist = false
                //             }

                //             else{
                //                 alreadyExistingColorName = item.colorName
                //             }
                //         })
                //         // console.log("---------------------------------------------------")

                //         if(colorDoesntExist === true){
                //             isColorValid = true
                //             colorArray.push({
                //                 colorName : colorName.toLowerCase(),
                //                 colorCode : colorCode.toLowerCase()
                //             })
                //         }

                //         else if(colorDoesntExist === false){
                //             isColorValid = false
                //             emptyField = "colorCode"
                //             errorMessage = `You have already entered this color code with the name "${alreadyExistingColorName}"`
                //         }
                //     }                
                // }