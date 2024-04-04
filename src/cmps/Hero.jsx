import { HeroFilter } from "./HeroFilter.jsx"

export function Hero() {
    return (
        <div className="home-page-slider">
            <div className="hero-container">
                <div className="hero-img full">
                    <div className="hero-title">
                        <h1 className="title">Find the right <i>freelance</i> <br />service, right away</h1>
                    </div>
                    <HeroFilter />
                </div>
            </div>
        </div>
    )
}