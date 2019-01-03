
import { Provider } from 'react-redux'
import store from "../src/store"

import "../src/assets/sass/profile_details.scss"

import ProfileDetailsVendor from "../src/components/authComponents/vendor/profileDetailsVendor"

const VendorProfileDetails = () => (

    <Provider store = { store }>
        <section className = "vendorProfileDetailsWrapper">
            <ProfileDetailsVendor/>
        </section>
    </Provider>
)

export default VendorProfileDetails