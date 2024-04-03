import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { GigIndex } from './pages/GigIndex.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
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
]

export default routes