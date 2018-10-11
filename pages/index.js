
import StartPage from "../src/components/common/startPage";
import Link from 'next/link'
import routeLinks from "../src/config/routeLinks"

const PostLink = (props) => (
    // <li>
        <Link 
            as={`/vendor/profile-details`}
            // as={`/vendor/${props.id}`}
            href={`/vendor-profile-details`}
            >
            <a></a>
        </Link>
    // </li>
)

const Index = () => (
    <section
        className = "bringingTheArtInArchitectureBigWrap"
        >
        <div className="outerWrapperIndexPage">
            <StartPage/>

            <ul>
                <PostLink id={routeLinks.VENDOR_DASHBOARD} />
            </ul>
        </div>
    </section>
)

export default Index


