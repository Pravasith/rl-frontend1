import ProfileDetailsVendor from "../src/components/authComponents/profileDetailsVendor";
import { Provider } from 'react-redux'
import store from "../src/store"

const VendorProfileDetails = () => (

    <Provider store = { store }>
        <section className = "vendorProfileDetailsWrapper">
            <ProfileDetailsVendor/>
        </section>
    </Provider>
)

export default VendorProfileDetails