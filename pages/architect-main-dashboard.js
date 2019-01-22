import { Provider } from 'react-redux'
import { withRouter } from 'next/router'

import store from "../src/store"

// import "../src/assets/sass/architect_main_dashboard.scss"

import ArchitectMainDashboard from "../src/components/authComponents/architect/architectMainDashboard";

const ArchitectDashboard = withRouter((props) => (

    <Provider store={store}>
        <section className="productDashboaard">
            <ArchitectMainDashboard />
        </section>
    </Provider>
))

export default ArchitectDashboard