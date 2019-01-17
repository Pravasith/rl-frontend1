import { Provider } from 'react-redux'
import store from "../src/store"

// import "../src/assets/sass/architect_main_dashboard.scss"

import ArchitectMainDashboard from "../src/components/authComponents/architect/architectMainDashboard";

const ArchitectDashboard = () => (

    <Provider store={store}>
        <section className="productDashboaard">
            <ArchitectMainDashboard />
        </section>
    </Provider>
)

export default ArchitectDashboard