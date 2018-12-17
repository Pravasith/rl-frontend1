
import {Provider} from "react-redux"

import StartPage from "../src/components/common/startPage"
import Link from 'next/link'
import routeLinks from "../src/config/routeLinks"
import store from "../src/store"

const PostLink = (props) => (
    <div>
        <Link 
            as= {`/vendor/profile-details`}
            href= {`/vendor-profile-details`}
            >
            <a></a>
        </Link>

        <Link 
            as= {`/vendor/add-product/${props.sCId}`}
            href= {`/vendor-add-product-details?sCId=${props.sCId}`}
            >
            <a></a>
        </Link>

        <Link
            as={`/vendor/edit-product/${props.pId}`}
            href={`/vendor-edit-product-details?pId=${props.pId}`}
            >
            <a></a>
        </Link>

        <Link 
            as= {`/vendor/dashboard`}
            href= {`/vendor-main-dashboard`}
            >
            <a></a>
        </Link>
    </div>
    
)

const Index = () => (
    <Provider store={store} >
        <section
            className="bringingTheArtInArchitectureBigWrap"
            >
            <div className="outerWrapperIndexPage">
                <StartPage />
                <ul>
                    <PostLink 
                        // id={routeLinks.VENDOR_DASHBOARD} 
                    />
                </ul>
            </div>
        </section>
    </Provider>
)

export default Index


