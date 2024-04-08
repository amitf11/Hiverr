import { useState, useRef, useEffect } from "react"
import { HeroFilter } from "./HeroFilter.jsx"

export function Hero() {
    const interval = useRef()
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        interval.current = setInterval(() => {
            setCounter(prevCount => prevCount + 1)
        }, 6000)

        return () => {
            clearInterval(interval.current)
        }
    }, [])

    useEffect(() => {
        if (counter > 4) setCounter(0)
    }, [counter])

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

                <div className="hero max-width-container">
                    <HeroFilter />
                </div>
            </div>

        </>

    )
}