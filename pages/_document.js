import Document, { Head, Main, NextScript } from "next/document"



export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en">
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                <link rel="icon" type="image/x-icon" href="../static/favicon.ico" />

                {/* "/_next/static/css/styl */}
                
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
            </html>
        )
    }
}