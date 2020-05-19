import React, {useEffect} from 'react'
import {useMediaQuery} from '@material-ui/core'
import anime from 'animejs'

const Loader = () => {
    const isActive = useMediaQuery('(max-width: 960px)')

    useEffect(() => {
        anime ({
            targets: 'div.box',
            translateY: [
                {value: 200, duration: 500},
                {value: 0, duration: 800}
            ],
            // loop: true,
            rotate: {
                value: '1turn'
            },
            borderRadius: 50,
            direction: 'alternate',
            easing: 'easeInOutQuad',
            delay: function() {return anime.random(0, 1000);},
            loop: true,
            elasticity: 200
        });
    }, []);

    return (
        <div id="boxes" style={{width: isActive ? 'calc(100% - 54.4px)' : null, height: isActive ? '100vh' : null}}>
            <div className="box one"></div>
            <div className="box two"></div>
            <div className="box three"></div>
            <div className="box four"></div>
        </div>
    )
}

export default Loader
