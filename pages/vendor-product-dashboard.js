import VendorProductDashboard from "../src/components/authComponents/vendorProductDashboard";
import {Provider} from 'react-redux'
import store from "../src/store"

const ProductDashboard = () => (

    <Provider store={store}>
        <section className="productDashboaard">
                <VendorProductDashboard/>
        </section>
   </Provider>
)

export default ProductDashboard