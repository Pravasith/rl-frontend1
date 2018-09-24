import React, { Component } from 'react'
import Link from 'next/link'


class Navbar extends Component {
    constructor(props){
        super(props)
        this.props = props
    }

    render () {
        return (
            <nav>
                <div>
                    <Link href = "/about">
                        <a title = "About Next JS">
                            About
                        </a>
                    </Link>

                    <Link href = "/api">
                        <a title = "Our API">
                            THE API
                        </a>
                    </Link>


                </div>
            </nav>
        )
    }
}

export default Navbar



