import { useState, useRef, useEffect } from "react"
import { HeroFilter } from "./HeroFilter.jsx"
import { HeroUserInfo } from "./HeroUserInfo.jsx"

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
                    <div className="hero-jenny hero-background" style={{ opacity: (counter === 0) ? 1 : 0 }}>
                        <HeroUserInfo
                            userName={'@Jenny'}
                            job={'Children\'s Voice Over'}
                            imgUrl={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png'} />
                    </div>
                    <div className="hero-colin hero-background" style={{ opacity: (counter === 1) ? 1 : 0 }}>
                        <HeroUserInfo
                            userName={'@colinstark'}
                            job={'Creative Director'}
                            imgUrl={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499432/colin-2x.png'} />
                    </div>
                    <div className="hero-scarlett hero-background" style={{ opacity: (counter === 2) ? 1 : 0 }}>
                        <HeroUserInfo
                            userName={'Scarlett'}
                            job={'Business Founder'}
                            imgUrl={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499428/scarlett-2x.png'}
                        />
                    </div>
                    <div className="hero-jordan hero-background" style={{ opacity: (counter === 3) ? 1 : 0 }}>
                        <HeroUserInfo
                            userName={'@jordanruncie_'}
                            job={'Production Assistant'}
                            imgUrl={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499439/jordan-2x.png'} />
                    </div>
                    <div className="hero-christina hero-background" style={{ opacity: (counter === 4) ? 1 : 0 }}>
                        <HeroUserInfo
                            userName={'Christina'}
                            job={'Jewelry Shop Owner'}
                            imgUrl={'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499422/christina-2x.png'} />
                    </div>
                </div>

                <div className="hero max-width-container">
                    <HeroFilter />
                </div>
            </div>

        </>

    )
}