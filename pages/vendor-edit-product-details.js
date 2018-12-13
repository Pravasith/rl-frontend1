
import {Provider} from 'react-redux'
import {withRouter} from 'next/router'
import store from "../src/store"
import VendorEditProduct from "../src/components/authComponents/vendor/editProductDetails"


const Content = withRouter((props) => (
    <div>
      <VendorEditProduct
        pId = {props.router.query.pId}
      />
    </div>
  ))
  

const VendorAddProductDetails = () => (

    <Provider store={store}>
        <section className="vendorAddProducts">
            {/*  */}
            <Content/>
            {/* <VendorEditProduct/> */}
        </section>
    </Provider>
)

export default VendorAddProductDetails