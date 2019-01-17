import App, { Container } from 'next/app'
import React from 'react'


class MyApp extends App {
  

    render () {
        const { Component, pageProps } = this.props
        
        return (
        <Container>

                <header>
                    <title></title>
                    <meta charSet="UTF-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
                    <link rel="icon" href="/favicon.ico" type="image/x-icon"/>           
                </header>

                <section>
                    {/* <Main />
                    <NextScript /> */}
                    <Component {...pageProps} />
                </section>

            {/* <html lang="en">
                
            </html> */}
            
        </Container>
        )
    }
}

export default (MyApp)