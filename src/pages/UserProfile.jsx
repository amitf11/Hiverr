import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"

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
import { loadOrders, loadSellerOrders } from "../store/actions/order.actions"
import { UserImg } from "../cmps/UserImg"

export function UserProfile() {
    const [chosenSection, setChosenSection] = useState('orders')
    const gigs = useSelector(storeState => storeState.gigModule.userGigs)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const buyerOrders = useSelector(storeState => storeState.orderModule.orders)
    const sellerOrders = useSelector(storeState => storeState.orderModule.sellerOrders)

    const chosenSectionStyle = {
        backgroundColor: '#a5e5c7',
        color: 'black',
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '20px',
    }

    useEffect(() => {
        loadOrders(user._id)
    }, [])

    useEffect(() => {
        loadUserGigs(user._id)
    }, [gigs])

    function handleSection(section) {
        setChosenSection(section)
    }

    function onAddGig(gig) {
        addGig(gig)
        console.log(gigs)
    }

    function onRemoveGig(gigId) {
        removeGig(gigId)
    }

    return (
        <section className="flex space-between user-profile">
            <aside className="flex column align-center user-profile-card">
                <UserImg imgUrl={user.imgUrl} size={150}/>
                <h2 className="user-fullname">{user.fullName}</h2>
                <h4 className="member-since flex space-between">
                    <div>Member since:</div>
                    <div>
                        {utilService.getMonthName(new Date(user.createdAt))},
                        {new Date(user.createdAt).getFullYear()}
                    </div>
                </h4>
                <nav className="flex column space-between user-profile-nav">
                    <div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'orders' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('orders')}>
                            <span className="flex align-center icon"><InboxRoundedIcon /></span>
                            My Orders</div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'gigs' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('gigs')}>
                            <span className="flex align-center icon"><FormatListBulletedRoundedIcon /></span>
                            My Gigs</div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'dashboard' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('dashboard')}>
                            <span className="flex align-center icon"><DashboardRoundedIcon /></span>
                            Dashboard</div>
                        <div className="flex align-center user-profile-nav-item"
                            style={chosenSection === 'statistics' ? chosenSectionStyle : {}}
                            onClick={() => handleSection('statistics')}>
                            <span className="flex align-center icon"><LeaderboardRoundedIcon /></span>
                            Statistics
                        </div>
                    </div>
                    <div className="flex align-center user-profile-nav-item"
                        style={chosenSection === 'settings' ? chosenSectionStyle : {}}
                        onClick={() => handleSection('settings')}>
                        <span className="flex align-center icon"><SettingsIcon /></span>
                        Settings</div>
                </nav>
            </aside>

            <article className="user-profile-right-container">
                {chosenSection === 'orders' && <UserOrders
                    buyerOrders={buyerOrders} />}
                {chosenSection === 'gigs' && <UserGigs
                    gigs={gigs} onAddGig={onAddGig} onRemoveGig={onRemoveGig} />}
                {chosenSection === 'dashboard' && <UserDashboard
                    sellerOrders={sellerOrders} />}
                {chosenSection === 'statistics' && <UserStatistics />}
                {chosenSection === 'settings' && <UserSettings />}
            </article>
        </section >
    )
}