import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html lang="en">

                <Head>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                    <title> Everything Architecture</title>
                    {/* <link rel = "stylesheet" href = "/_next/static/style.css" /> */}
                </Head>

                <body>
                    <Main/>
                    <NextScript/>                
                </body>

            </html>
        )
    }
}