
import {Provider} from 'react-redux'
import store from "../src/store"

import "../src/assets/sass/vendor_main_dashboard.scss"

import VendorMainDashboard from "../src/components/authComponents/vendor/vendorMainDashboard";

const ProductDashboard = () => (

    <Provider store={store}>
        <section className="productDashboaard">
                <VendorMainDashboard/>
        </section>
   </Provider>
)

export default ProductDashboard