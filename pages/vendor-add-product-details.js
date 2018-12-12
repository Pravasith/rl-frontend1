
import {Provider} from 'react-redux'
import {withRouter} from 'next/router'
import store from "../src/store"
import AddProductDetails from "../src/components/authComponents/vendor/addProductDetails"


const Content = withRouter((props) => (
    <div>
      <AddProductDetails
        sCId = {props.router.query.sCId}
      />
    </div>
  ))
  

const VendorAddProductDetails = () => (

    <Provider store={store}>
        <section className="vendorAddProducts">
            {/*  */}
            <Content/>
        </section>
    </Provider>
)

export default VendorAddProductDetails