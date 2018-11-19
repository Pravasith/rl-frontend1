import VendorMainDashboard from "../src/components/authComponents/vendor/vendorMainDashboard";
import {Provider} from 'react-redux'
import store from "../src/store"

const ProductDashboard = () => (

    <Provider store={store}>
        <section className="productDashboaard">
                <VendorMainDashboard/>
        </section>
   </Provider>
)

export default ProductDashboard