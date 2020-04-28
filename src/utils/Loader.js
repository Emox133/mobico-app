import React, {useEffect} from 'react'
import anime from 'animejs'

const Loader = () => {
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
        <div id="boxes">
            <div class="box one"></div>
            <div class="box two"></div>
            <div class="box three"></div>
            <div class="box four"></div>
        </div>
    )
}

export default Loader
