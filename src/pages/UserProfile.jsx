import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { utilService } from "../services/util.service"

import SettingsIcon from '@mui/icons-material/Settings'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';

import { UserOrders } from "../cmps/user-profile/UserOrders"
import { UserSettings } from "../cmps/user-profile/UsetSettings"
import { UserDashboard } from "../cmps/user-profile/UserDashboard"
import { UserStatistics } from "../cmps/user-profile/UserStatistics"
import { loadOrders } from "../store/actions/order.actions"

export function UserProfile() {
    const [chosenSection, setChosenSection] = useState('orders')
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    useEffect(() => {
        loadOrders(123)
    }, [])


    const chosenSectionStyle = {
        backgroundColor: '#a5e5c7',
        color: 'black',
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '20px',
    }

    function handleSection(section) {
        setChosenSection(section)
    }

    return (
        <section className="flex space-between user-profile">
            <aside className="flex column align-center user-profile-card">
                <img src={user.imgUrl} />
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
                    orders={orders} />}
                {chosenSection === 'dashboard' && <UserDashboard />}
                {chosenSection === 'statistics' && <UserStatistics />}
                {chosenSection === 'settings' && <UserSettings />}
            </article>
        </section >
    )
}