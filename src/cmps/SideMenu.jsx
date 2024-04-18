import { useSelector } from "react-redux"
import { NavLink, Link } from "react-router-dom"
import { useState, useRef } from "react"
import { LoginSignup } from "./LoginSignup"

export function SideMenu({ closeSideMenu, onLogout }) {


    const [isSignUp, setIsSignUp] = useState(null)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)


    function handleSignIn() {
        setIsSignUp(false)
        onOpenModal()
    }

    function handleJoin() {
        setIsSignUp(true)
        onOpenModal()
    }

    function onOpenModal() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function toggleCategories() {
        setIsCategoriesOpen(prevIsCategoriesOpen => !prevIsCategoriesOpen)
    }


    return (
        <section className='flex column side-nav'>
            <div>
                <button onClick={() => closeSideMenu()}>
                    X
                </button>
            </div>
            <div className='side-bar-header'>
                <button className=" join-btn" onClick={handleJoin}>Join Hiverr</button>
            </div>


            <ul className='clean-list'>
                {loggedinUser ? (
                    <>
                        <li><a className="clean-link" onClick={onLogout}>Logout</a></li>
                    </>
                ) : (
                    <>
                        <li><a className="clean-link sign-in" onClick={handleSignIn}>Sign In</a></li>
                    </>
                )}

            </ul>
            <div onClick={() => toggleCategories()} className='flex categories-container'>
                <button>Browse categories</button>
                <span className='flex align-center'>
                    <svg className={isCategoriesOpen ? 'open' : 'close'} width="8" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg"><path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"></path></svg>
                </span>

            </div>{isCategoriesOpen && <ul className="flex column clean-list">
                <li onClick={() => closeSideMenu()} className='flex column'><Link to="/gig?category=graphics-design">Graphics & Design</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=programming-tech">Programming & Tech</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=digital-marketing">Digital Marketing</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=video-animation">Video & Animation</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=writing-translation">Writing & Translation</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=music">Music & Audio</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=business">Business</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=consulting">Consulting</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=data">Data</Link></li>
                <li onClick={() => closeSideMenu()} className='flex row'><Link to="/gig?category=ai-services">Ai Services</Link></li>
            </ul>}
            <div><NavLink to="/gig" className="clean-link">
                <button onClick={() => closeSideMenu()}>
                    Explore
                </button>
            </NavLink></div>

            <LoginSignup
                isModalOpen={isModalOpen}
                onCloseModal={onCloseModal}
                isSignUp={isSignUp} />
        </section>
    )
}