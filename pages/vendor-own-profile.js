const VendorName = (props) => (
    <div>
        Hi, <h1>{props.id}</h1>
    </div>
)

VendorName.getInitialProps = async function (context) {
    const {id} = context.query

    return {id}
}

export default VendorName