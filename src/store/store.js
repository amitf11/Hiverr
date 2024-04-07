import { createStore, combineReducers } from 'redux'

import { userReducer } from './reducers/user.reducer'
import { gigReducer } from './reducers/gig.reducer'
import { orderReducer } from './reducers/order.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
    gigModule: gigReducer,
    orderModule: orderReducer
})

export const store = createStore(rootReducer)

store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
})