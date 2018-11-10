
import {Provider} from 'react-redux'
import store from "../src/store"
import AddProductDetails from "../src/components/authComponents/addProductDetails";

const VendorAddProductDetails = () => (

    <Provider store={store}>
        <section className="vendorAddProducts">
            <AddProductDetails />
        </section>
    </Provider>
)

export default VendorAddProductDetails