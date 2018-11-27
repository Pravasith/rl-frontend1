
import {Provider} from 'react-redux'
import store from "../src/store"
import VendorDashboardDetails from "../src/components/authComponents/vendorDashboardDetails"

const VendorAddProductDetails = () => (

    <Provider store={store}>
        <section className="vendorAddProducts">
            <VendorDashboardDetails />
        </section>
    </Provider>
)

export default VendorAddProductDetails