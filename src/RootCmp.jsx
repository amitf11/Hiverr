import React from 'react'
import { Routes, Route } from 'react-router'

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { UserDetails } from './pages/UserDetails'

import routes from './routes'


export function RootCmp() {

    return (
        <div>
            <AppHeader />
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                    <Route path="user/:id" element={<UserDetails />} />
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}