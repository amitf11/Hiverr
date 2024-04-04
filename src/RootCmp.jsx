import React from 'react'
import { Routes, Route } from 'react-router'

import { AppFooter } from './cmps/AppFooter'
import { AppHeader } from './cmps/AppHeader'

import routes from './routes'
import { Hero } from './cmps/Hero'


export function RootCmp() {

    return (
        <div className='main-layout'>
            <AppHeader />
            <Hero />
            <main>
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
            {/* <AppFooter /> */}
        </div>
    )
}