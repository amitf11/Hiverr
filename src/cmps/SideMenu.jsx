import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { useState, useRef } from "react"
import { LoginSignup } from "./LoginSignup"


import { logout } from "../store/actions/user.actions"


export function SideMenu({ closeSideMenu }) {


    const [isSignUp, setIsSignUp] = useState(null)
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [isModalOpen, setIsModalOpen] = useState(false)


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



    return (
        <section className='flex column side-nav'>
            <div>
                <button onClick={() => closeSideMenu()}>
                    X
                </button>
            </div>
            <div><NavLink to="/gig" className="clean-link">
                <button onClick={() => closeSideMenu()}>
                    Explore
                </button>
            </NavLink></div>

            <ul className='clean-list'>
                {loggedinUser ? (
                    <>
                        <li className="orders-btn"><a onClick={(event) => onOpenOrderModal(event)}>Orders
                            <div className={`${getNewOrderClass()} new-order`}></div>
                        </a></li>
                        <li><a className="clean-link" onClick={onLogout}>Logout</a></li>
                        <li><Link to={`user/${loggedinUser._id}`} className="flex">
                            <UserImg imgUrl={loggedinUser.imgUrl} size={32} /></Link>
                        </li>
                    </>

                ) : (
                    <>
                        <li><a className="clean-link" onClick={handleSignIn}>Sign In</a></li>
                        <li><a className="clean-link join-btn" onClick={handleJoin}>Join</a></li>
                    </>
                )}
            </ul>
            <LoginSignup
                isModalOpen={isModalOpen}
                onCloseModal={onCloseModal}
                isSignUp={isSignUp} />
        </section>
    )
}