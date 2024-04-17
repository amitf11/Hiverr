import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'


import { UserGigs } from "../cmps/user-profile/UserGigs"
import { UserOrders } from "../cmps/user-profile/UserOrders"
import { UserSettings } from "../cmps/user-profile/UsetSettings"
import { UserDashboard } from "../cmps/user-profile/UserDashboard"
import { UserStatistics } from "../cmps/user-profile/UserStatistics"

import { addGig, loadUserGigs, removeGig } from "../store/actions/gig.actions"
import { loadOrders, loadSellerOrders, setOrderStatus } from "../store/actions/order.actions"
import { UserImg } from "../cmps/UserImg"
import { SOCKET_EVENT_ORDER_STATUS_UPDATED, socketService } from "../services/socket.service"

export function UserProfile() {
    const [chosenSection, setChosenSection] = useState('orders')
    const gigs = useSelector(storeState => storeState.gigModule.userGigs)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const buyerOrders = useSelector(storeState => storeState.orderModule.orders)
    const sellerOrders = useSelector(storeState => storeState.orderModule.sellerOrders)

    const handleOrderStatusUpdated = () => {
        loadOrders(user._id)
        loadSellerOrders(user._id)
    }

    useEffect(() => {
        socketService.on(SOCKET_EVENT_ORDER_STATUS_UPDATED, handleOrderStatusUpdated)

        return () => {
            socketService.off(SOCKET_EVENT_ORDER_STATUS_UPDATED, handleOrderStatusUpdated)
        }
    }, [])

    const chosenSectionStyle = {
        backgroundColor: '#a5e5c7',
        color: 'black',
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '20px',
    }

    const chosenSectionStyleMobile = {
        // backgroundColor: '#a5e5c7',
        color: '#1dbf73',
        borderTopLeftRadius: '24px',
        borderTopRightRadius: '24px',
    }

    useEffect(() => {
        loadOrders(user._id)
        loadSellerOrders(user._id)
        loadUserGigs(user._id)
        console.log('from user profile');
    }, [])

    function handleSection(section) {
        setChosenSection(section)
    }

    function onAddGig(gig) {
        addGig(gig)
        console.log(gigs)
    }

    function onRemoveGig(gigId) {
        console.log('gigId:', gigId)
        removeGig(gigId)
    }

    return (
        <section className="flex space-between user-profile">
            <aside className="flex column align-center user-profile-card">
                <UserImg imgUrl={user.imgUrl} size={150} />
                <h2 className="user-fullname">{user.fullname}</h2>
                {/* <h4 className="member-since flex space-between"> */}
                    {/* <div className="flex align-center"> */}
                        {/* <PersonIcon className="member-icon" /> */}
                        {/* Member since:</div> */}
                    {/* <div> */}
                        {/* April, 2024 */}
                        {/* {utilService.getMonthName(new Date(user.createdAt))}, */}
                        {/* {new Date(user.createdAt).getFullYear()} */}
                    {/* </div> */}
                {/* </h4> */}
                <nav className="flex column space-between user-profile-nav">
                    <div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'orders' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('orders')}>
                            <span className="flex align-center icon"><InboxRoundedIcon /></span>
                            <span className="user-profile-txt">My Orders</span></div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'gigs' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('gigs')}>
                            <span className="flex align-center icon"><FormatListBulletedRoundedIcon /></span>
                            <span className="user-profile-txt">My Gigs</span></div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'dashboard' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('dashboard')}>
                            <span className="flex align-center icon"><DashboardRoundedIcon /></span>
                            <span className="user-profile-txt">Dashboard</span></div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'statistics' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('statistics')}>
                            <span className="flex align-center icon"><LeaderboardRoundedIcon /></span>
                            <span className="user-profile-txt">Statistics</span>
                        </div>
                    </div>
                    <div className="flex align-center user-profile-nav-item"
                        style={chosenSection === 'settings' ? chosenSectionStyle : {}}
                        onClick={() => handleSection('settings')}>
                        <span className="flex align-center icon"><SettingsIcon /></span>
                        <span className="user-profile-txt"> Settings</span></div>
                </nav>
            </aside>

            <nav className="mobile-nav-bar">
                <div className="flex align-center justify-center user-profile-nav-item"
                    style={chosenSection === 'orders' ? chosenSectionStyleMobile : {}}
                    onClick={() => handleSection('orders')}>
                    <span className="flex align-center icon"><InboxRoundedIcon /></span>
                </div>
                <div className="flex align-center justify-center user-profile-nav-item"
                    style={chosenSection === 'gigs' ? chosenSectionStyleMobile : {}}
                    onClick={() => handleSection('gigs')}>
                    <span className="flex align-center icon"><FormatListBulletedRoundedIcon /></span>
                </div>
                <div className="flex align-center justify-center user-profile-nav-item"
                    style={chosenSection === 'dashboard' ? chosenSectionStyleMobile : {}}
                    onClick={() => handleSection('dashboard')}>
                    <span className="flex align-center icon"><DashboardRoundedIcon /></span>
                </div>
                <div className="flex align-center justify-center user-profile-nav-item"
                    style={chosenSection === 'statistics' ? chosenSectionStyleMobile : {}}
                    onClick={() => handleSection('statistics')}>
                    <span className="flex align-center icon"><LeaderboardRoundedIcon /></span>
                </div>
                <div className="flex align-center justify-center user-profile-nav-item"
                    style={chosenSection === 'settings' ? chosenSectionStyleMobile : {}}
                    onClick={() => handleSection('settings')}>
                    <span className="flex align-center icon"><SettingsIcon /></span>
                </div>
            </nav>

            <article className="user-profile-right-container">
                {chosenSection === 'orders' && <UserOrders
                    buyerOrders={buyerOrders} />}
                {chosenSection === 'gigs' && <UserGigs
                    gigs={gigs} onAddGig={onAddGig} onRemoveGig={onRemoveGig}
                    handleSection={handleSection} />}
                {chosenSection === 'dashboard' && <UserDashboard
                    sellerOrders={sellerOrders} />}
                {chosenSection === 'statistics' && <UserStatistics />}
                {chosenSection === 'settings' && <UserSettings />}
            </article>
        </section >
    )
}