import { Provider } from 'react-redux'
import { withRouter } from 'next/router'
import store from "../src/store"
// import "../src/assets/sass/add_product_details.scss"

import VendorProductList from "../src/components/authComponents/vendor/productList"


const Content = withRouter((props) => (
    <div>
        <VendorProductList
            pId={props.router.query.pId}
        />
    </div>
))


const ProductList = () => (

    <Provider store={store}>
        <section className="vendorProductsList">
            <Content />
        </section>
    </Provider>
)

export default ProductList