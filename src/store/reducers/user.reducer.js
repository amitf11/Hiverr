import { userService } from '../../services/user.service'

export const SET_USER = 'SET_USER'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
    users: [],
    watchedUser: null
}

console.log('initialState.user:', initialState.loggedinUser)
export function userReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_USER:
            newState = { ...state, loggedinUser: action.user }
            break

        case SET_WATCHED_USER:
            newState = { ...state, watchedUser: action.watchedUser }
            break

        case REMOVE_USER:
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break

        case SET_USERS:
            newState = { ...state, users: action.users }
            break

        default:
            return state;
    }
    // For debug:
    // window.userState = newState
    // console.log('State:', newState)
    return newState

}
