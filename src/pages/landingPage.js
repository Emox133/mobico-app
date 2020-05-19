import React from 'react'
import Loader from './../utils/Loader'

import {useSelector, shallowEqual} from 'react-redux'

const LandingPage = () => {
    const {loading} = useSelector(state => ({
        loading: state.user.loading
    }), shallowEqual)

    let placeholder = !loading ? 
        <div className="landing__page">
            <div className="content__wrapper">
                <div className="left__side">
                    <div className="left__side-content">
                        <h2 className="left__side-title">Left side</h2>
                        <p className="left__side-text">Lorem ipsum dolor sit amet, amco laboris enderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        <a href="/signup"><button className="btn btn-white">Try</button></a>
                    </div>
                </div>

                <div className="right__side">
                    <div className="right__side-content">
                        <h2 className="right__side-title">Right side</h2>
                        <p className="right__side-text">Lorem ipsum dolor sit amet, amco laboris enderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                        <a href="/signup"><button className="btn btn-white">Try</button></a>
                    </div>
                </div>
            </div>
        </div>
     : <Loader />

    return placeholder
}

export default LandingPage
