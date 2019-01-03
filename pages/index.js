
import {Provider} from "react-redux"
import { Head } from "next/document"
import Link from 'next/link'
import routeLinks from "../src/config/routeLinks"
import store from "../src/store"

import "../src/assets/sass/start_page.scss"
import StartPage from "../src/components/common/startPage"

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


const checkAndReturnRelevantPage = () => {
    setTimeout(() => {
        window.open("/register", "_self")
    }, 3000)
}

const Index = () => (
    <Provider store={store} >
        
        <section
            className="bringingTheArtInArchitectureBigWrap"
            >

            {/* <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />

                
                
            </Head> */}

            {/* {checkAndReturnRelevantPage()} */}

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


