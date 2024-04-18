import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

import Tooltip from "@mui/material/Tooltip"
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'

import { UserGigs } from "../cmps/user-profile/UserGigs"
import { UserOrders } from "../cmps/user-profile/UserOrders"
import { UserSettings } from "../cmps/user-profile/UsetSettings"
import { UserDashboard } from "../cmps/user-profile/UserDashboard"
import { UserStatistics } from "../cmps/user-profile/UserStatistics"

import { loadOrders, loadSellerOrders } from "../store/actions/order.actions"
import { addGig, loadUserGigs, removeGig } from "../store/actions/gig.actions"
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
        // backgroundColor: '#a5e5c7',
        color: '#1dbf73',
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
                <div className="user-details-card flex column align-center">
                    <img src={user.imgUrl} alt="" />
                    <h2 className="user-fullname">{user.fullname}</h2>
                    <span className="edit-profile-btn"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.3628 2.30102L13.6796 0.618553C12.8553 -0.205791 11.521 -0.205916 10.6965 0.618522L0.778434 10.4718L0.0102775 15.1279C-0.0733163 15.6346 0.365528 16.0736 0.872371 15.99L5.52846 15.2218L15.3824 5.30374C16.2052 4.4809 16.2131 3.15127 15.3628 2.30102ZM6.26384 9.7364C6.39809 9.87065 6.57406 9.93774 6.75 9.93774C6.92593 9.93774 7.1019 9.87065 7.23615 9.7364L10.9558 6.01671L11.8486 6.90949L6.5625 12.2301V10.9377H5.0625V9.43774H3.77012L9.09072 4.15165L9.9835 5.04443L6.26381 8.76408C5.9954 9.03258 5.9954 9.4679 6.26384 9.7364ZM2.56662 14.3169L1.6834 13.4336L2.06278 11.1341L2.63778 10.5627H3.9375V12.0627H5.4375V13.3624L4.86618 13.9375L2.56662 14.3169ZM14.4099 4.33146L14.4083 4.33305L14.4067 4.33465L12.9058 5.8454L10.1548 3.09446L11.6656 1.59352L11.6672 1.59196L11.6687 1.5904C11.9546 1.30458 12.418 1.30105 12.7073 1.59037L14.3903 3.2733C14.699 3.58196 14.7009 4.04046 14.4099 4.33146Z"></path></svg><span>Edit Profile</span></span>
                    <button className="preview-profile-btn">Preview Hiverr Profile</button>
                    <div className="user-stats">
                        <h4 className="member-since flex space-between">
                            <span className="flex align-center">
                                <LocationOnIcon className="member-icon" />
                                From
                            </span>
                            <span className="bold">Israel</span>
                        </h4>
                        <h4 className="member-since flex space-between">
                            <span className="flex align-center">
                                <PersonIcon className="member-icon" />
                                Member since</span>
                            <span className="bold">
                                April, 2024
                            </span>
                        </h4>
                    </div>

                    <nav className="flex space-between user-profile-nav">

                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'orders' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('orders')}>
                            <Tooltip title="My Orders" placement="top" arrow>
                                <span className="flex align-center icon"><InboxRoundedIcon /></span>
                            </Tooltip>
                        </div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'gigs' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('gigs')}>
                            <Tooltip title="My Gigs" placement="top" arrow>
                                <span className="flex align-center icon"><FormatListBulletedRoundedIcon /></span>
                            </Tooltip>
                        </div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'dashboard' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('dashboard')}>
                            <Tooltip title="Dashboard" placement="top" arrow>
                                <span className="flex align-center icon"><DashboardRoundedIcon /></span>
                            </Tooltip>
                        </div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'statistics' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('statistics')}>
                            <Tooltip title="Statistics" placement="top" arrow>
                                <span className="flex align-center icon"><LeaderboardRoundedIcon /></span>
                            </Tooltip>
                        </div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'settings' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('settings')}>
                            <Tooltip title="Settings" placement="top" arrow>
                                <span className="flex align-center icon"><SettingsIcon /></span>
                            </Tooltip></div>
                    </nav>
                </div>
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