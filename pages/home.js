
import "../src/assets/sass/start_page.scss"
import {Provider} from 'react-redux'
import HomePage from "../src/components/common/homePage";
import store from "../src/store"

const Home = () => (

    <Provider store={store}>
        <section
            className="bringingTheArtInArchitectureBigWrap"
            >

            <div className="outerWrapperIndexPage">
                <HomePage />
            </div>
        </section>
    </Provider>
)

export default Home