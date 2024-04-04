import heroImg from '../assets/img/hero.jpg'

export function HeroImg() {
    return (
        <section className="hero">
            <div>
                <img src={heroImg} alt="" />
            </div>
        </section>
    )
}