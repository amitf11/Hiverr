import { createStore, combineReducers } from 'redux'

import { userReducer } from './reducers/user.reducer'

const rootReducer = combineReducers({
    userModule: userReducer,
})


export const store = createStore(rootReducer)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})