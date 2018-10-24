import VendorDashboardDetails from "../src/components/authComponents/vendorDashboardDetails";
import {Provider} from 'react-redux'
import store from "../src/store"

const VendorDashboard = () => (

    <Provider store={store}>
        <section className="vendorDashboaard">
            <VendorDashboardDetails />
        </section>
    </Provider>
)

export default VendorDashboard