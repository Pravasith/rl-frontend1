import { Provider } from 'react-redux'
import store from "../src/store"

// import "../src/assets/sass/architect_main_dashboard.scss"

import ArchitectFrontPage from "../src/components/authComponents/architect/architectFrontPage";

const ArchitectHomePage = () => (

    <Provider store={store}>
        <section className="productDashboaard">
            <ArchitectFrontPage />
        </section>
    </Provider>
)

export default ArchitectHomePage