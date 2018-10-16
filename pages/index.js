
import {Provider} from "react-redux"

import StartPage from "../src/components/common/startPage"
import Link from 'next/link'
import routeLinks from "../src/config/routeLinks"
import store from "../src/store"

const PostLink = (props) => (
    <Link 
        as= {`/vendor/profile-details`}
        href= {`/vendor-profile-details`}
        >
        <a></a>
    </Link>
)

const Index = () => (
    <Provider store={store} >
        <section
            className="bringingTheArtInArchitectureBigWrap"
        >
            <div className="outerWrapperIndexPage">
                <StartPage />

                <ul>
                    <PostLink id={routeLinks.VENDOR_DASHBOARD} />
                </ul>
            </div>
        </section>
    </Provider>
)

export default Index


