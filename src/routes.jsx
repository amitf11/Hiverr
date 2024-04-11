import { AboutUs } from './pages/AboutUs.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { GigIndex } from './pages/GigIndex.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { GigDetails } from './pages/GigDetails.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { PurchasePage } from './pages/PurchasePage.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '',
        component: <HomePage />,
        label: 'Home 🏠',
    },
    {
        path: 'about',
        component: <AboutUs />,
        label: 'About us'
    },
    {
        path: 'gig',
        component: <GigIndex />,
        label: 'gig'
    },
    {
        path: 'gig/:gigId',
        component: <GigDetails />,
        label: 'gigDetails'
    },
    {
        path: 'gig/payment/:gigId',
        component: <PurchasePage />,
        label: 'gigPurchase'
    },
    {
        path: 'user/:userId',
        component: <UserProfile />,
        label: 'profile'
    },
]

export default routes