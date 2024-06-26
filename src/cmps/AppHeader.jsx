import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"

import { loadOrders } from "../store/actions/order.actions"
import { logout } from "../store/actions/user.actions"

import { SubHeader } from "./SubHeader"
import { OrderModal } from "./OrderModal"
import { LoginSignup } from "./LoginSignup"
import { SideMenu } from "./SideMenu"
import { UserImg } from "./UserImg"
import { CLEAR_NEW_ORDERS } from "../store/reducers/order.reducer"
import { Tooltip } from "@mui/material"

export function AppHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [search, setSearch] = useState('')
    const [isShown, setIsShown] = useState(false)
    const [isSignUp, setIsSignUp] = useState(null)
    const [windowSize, setWindowSize] = useState(null)
    const [isNewOrder, setIsNewOrder] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [headerClassName, setHeaderClassName] = useState('')
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [modalPosition, setModalPosition] = useState({ left: 0, top: 0 })
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const newOrders = useSelector(storeState => storeState.orderModule.newOrders)

    useEffect(() => {
        if (newOrders.length > 0) {
            setIsNewOrder(true)
        }

    }, [newOrders])

    function handleChange({ target }) {
        const value = target.value
        setSearch(value)
    }

    function onSearch(ev) {
        ev.preventDefault()
        setSearch('')
        navigate(`/gig?txt=${search}`)
    }

    useEffect(() => {

        function handleScroll() {
            if (window.innerWidth < 600) {
                setHeaderClassName('mobile-header')
                return
            }
            if (window.scrollY < 80 && location.pathname === '/') setHeaderClassName('homepage-header')
            else setHeaderClassName('regular-header')

            if (location.pathname !== '/' || window.scrollY > 150) setIsShown(true)
            else setIsShown(false)
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)

    }, [location.pathname, setWindowSize])


    function onOpenModal() {
        setIsModalOpen(true)
    }

    function onCloseModal() {
        setIsModalOpen(false)
    }

    function onOpenOrderModal(ev) {
        onSetModalPosition(ev)
        setIsOrderModalOpen(true)
    }

    function onSetModalPosition({ target }) {
        const ordersButtonRect = target.getBoundingClientRect()
        const modalLeft = ordersButtonRect.left - 330
        const modalTop = ordersButtonRect.bottom + 12
        setModalPosition({ left: modalLeft, top: modalTop })
    }

    useEffect(() => {
        if (isOrderModalOpen) {
            handleViewNewOrders()
        }
    }, [isOrderModalOpen])

    function onCloseOrderModal() {
        setIsOrderModalOpen(false)
    }

    function onLogout() {
        logout()
        navigate('/')
    }

    function getNewOrderClass() {
        if (isNewOrder) return 'new'
        else return ''
    }

    function handleViewNewOrders() {
        dispatch({ type: CLEAR_NEW_ORDERS })
        setIsNewOrder(false)
    }

    function handleSignIn() {
        setIsSignUp(false)
        onOpenModal()
    }

    function handleJoin() {
        setIsSignUp(true)
        onOpenModal()
    }

    function openSideMenu() {
        setIsSideMenuOpen(true)
    }

    function closeSideMenu() {
        setIsSideMenuOpen(false)
    }

    return (
        <>
            <SideMenu setIsSideMenuOpen={setIsSideMenuOpen} closeSideMenu={closeSideMenu} onLogout={onLogout} isSideMenuOpen={isSideMenuOpen} />
            <header className={`main-header ${headerClassName}`}>
                <div className="header flex align-center space-between">
                    <div className="flex mobile-logo-wrapper">
                        <button onClick={() => openSideMenu()} className='flex align-center hamburger'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="19" viewBox="0 0 23 19"><rect y="16" width="23" height="3" rx="1.5" fill="#555"></rect><rect width="23" height="3" rx="1.5" fill="#555"></rect><rect y="8" width="23" height="3" rx="1.5" fill="#555"></rect></svg>
                        </button>
                        {/* <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#ffffff"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg> */}
                        <Link to="/" className="flex align-center clean-link header-logo">
                            <h1>Hiverr<span>.</span></h1>
                        </Link>
                        <div className="header-search-bar" style={{ opacity: isShown ? 1 : 0 }} >
                            <form
                                className="flex"
                                onSubmit={onSearch}>
                                <input
                                    type="search"
                                    value={search}
                                    onChange={handleChange}
                                    placeholder="What service are you looking for today?"
                                />
                                <button>
                                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path></svg>
                                </button>
                            </form>
                        </div>
                    </div>
                    <nav className="main-nav">
                        <ul className="flex clean-list bold align-center">
                            <div className='row hidden-for-mobile'>
                                <li><NavLink to="/gig" className="clean-link">Explore</NavLink></li>
                                <li><NavLink className="clean-link">Become a Seller</NavLink></li>
                            </div>
                            {loggedinUser ? (
                                <>
                                    <li className="orders-btn"><a onClick={(event) => onOpenOrderModal(event)}>Orders
                                        <div className={`${getNewOrderClass()} new-order`}></div>
                                    </a></li>
                                    <li><a className="clean-link log-out-btn" onClick={onLogout}>Logout</a></li>
                                    <Tooltip title="Profile" placement="right" arrow>
                                        <li><Link to={`user/${loggedinUser._id}`} className="flex">
                                            <UserImg imgUrl={loggedinUser.imgUrl} size={32} />
                                        </Link>
                                        </li>
                                    </Tooltip>
                                </>

                            ) : (
                                <>
                                    <li className='sign-in-btn'><a className="clean-link" onClick={handleSignIn}>Sign In</a></li>
                                    <li><a className="clean-link join-btn" onClick={handleJoin}>Join</a></li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
                <OrderModal
                    orders={orders}
                    isOrderModalOpen={isOrderModalOpen}
                    onCloseOrderModal={onCloseOrderModal}
                    modalPosition={modalPosition} />
                <LoginSignup
                    isModalOpen={isModalOpen}
                    onCloseModal={onCloseModal}
                    isSignUp={isSignUp} />
            </header >
            <section className="sub-header flex align-center" style={{ opacity: isShown ? 1 : 0 }}>
                <SubHeader />
            </section>
        </>
    )
}