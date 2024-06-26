import { useState, useRef, useEffect } from "react"
import { HeroFilter } from "./HeroFilter.jsx"
import { HeroUserInfo } from "./HeroUserInfo.jsx"

export function Hero() {
    const interval = useRef()
    const [counter, setCounter] = useState(0)
    const heroes = [
        {
            username: '@Jenny',
            class: 'jenny',
            job: 'Children\'s Voice Over',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png'
        },
        {
            username: '@Colinstark',
            class: 'colin',
            job: 'Creative Director',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499432/colin-2x.png'
        },
        {
            username: '@Scarlett',
            class: 'scarlett',
            job: 'Business Founder',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499428/scarlett-2x.png'
        },
        {
            username: '@Jordanruncie_',
            class: 'jordan',
            job: 'Production Assistant',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499439/jordan-2x.png'
        },
        {
            username: '@Christina',
            class: 'christina',
            job: 'Jewelry Shop Owner',
            imgUrl: 'https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499422/christina-2x.png'
        }
    ]

    useEffect(() => {
        interval.current = setInterval(() => {
            setCounter(prevCount => prevCount + 1)
        }, 4000)

        return () => {
            clearInterval(interval.current)
        }
    }, [])

    useEffect(() => {
        if (counter > 4) setCounter(0)
    }, [counter])

    return (
        <div className="hero-wrapper">
            <div className="hero-backgrounds">
                {heroes.map((hero, idx) => (
                    <div key={idx} className={`hero-${hero.class} hero-background`}
                        style={{ opacity: (counter === idx) ? 1 : 0 }}>
                        <HeroUserInfo
                            username={hero.username}
                            job={hero.job}
                            imgUrl={hero.imgUrl}
                        />
                    </div>
                ))}
            </div>

            <div className="hero max-width-container">
                <HeroFilter />
            </div>
        </div>
    )
}