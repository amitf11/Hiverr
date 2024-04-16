import React from 'react'
import routes from './routes'
import { Routes, Route } from 'react-router'
import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'
import { UserMsg } from './cmps/UserMsg'

export function RootCmp() {

    return (
        <div className='main-container'>
            <AppHeader />
            <main className='flex column'>
                <Routes>
                    {routes.map(route => (
                        <Route
                            key={route.path}
                            exact={true}
                            element={route.component}
                            path={route.path} />
                    ))}
                </Routes>
            </main>
            <AppFooter />
            <UserMsg />
        </div>
    )
}