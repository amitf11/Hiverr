import { useState, useRef, useEffect } from "react"
import { HeroFilter } from "./HeroFilter.jsx"

export function Hero() {
    const interval = useRef()
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        interval.current = setInterval(() => {
            setCounter(prevCount => prevCount + 1)
        }, 3000)

        return () => {
            clearInterval(interval.current)
        }
    }, [])

    useEffect(() => {
        if (counter > 4) setCounter(0)
    }, [counter])

    // counterHandle()


    return (
        <>
            <div className="hero-wrapper">
                <div className="hero-backgrounds">
                    <div className="hero-jenny hero-background" style={{ opacity: (counter === 0) ? 1 : 0 }}></div>
                    <div className="hero-colin hero-background" style={{ opacity: (counter === 1) ? 1 : 0 }}></div>
                    <div className="hero-scarlett hero-background" style={{ opacity: (counter === 2) ? 1 : 0 }}></div>
                    <div className="hero-jordan hero-background" style={{ opacity: (counter === 3) ? 1 : 0 }}></div>
                    <div className="hero-christina hero-background" style={{ opacity: (counter === 4) ? 1 : 0 }}></div>
                </div>
            </div>



            {/* <h1 className="title">Find the right <i>freelance</i> <br />service, right away</h1>
                    <HeroFilter /> */}

            {/* <div className="home-page-slider">
                <div className="hero-container">
                <div className="hero-img flex">
                <div className="hero-title">
                        </div>
                    </div>
                </div>
            </div> */}
        </>

    )
}