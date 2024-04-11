import { httpService } from './http.service'
import { utilService } from './util.service'
import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}

_createUsers()

window.userService = userService

function getUsers() {
    return storageService.query('users')
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('users', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

async function getUserReviews(userId) {
    const user = await storageService.get('users', userId)
    // const user = await httpService.get(`user/${userId}`)
    return user.reviews
}

function remove(userId) {
    return storageService.remove('users', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update({ _id }) {
    const user = await storageService.get('users', _id)
    await storageService.put('users', user)

    // user = await httpService.put(`user/${user._id}`, user)

    // When admin updates other user's details, do not update loggedinUser
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user
}

async function login(userCred) {
    const users = await storageService.query('users')
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) return saveLocalUser(user)
}

async function signup(userCred) {
    console.log(userCred);
    if (!userCred.imgUrl) userCred.imgUrl = 'https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'
    const user = await storageService.post('users', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    return saveLocalUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, fullName: user.fullName, imgUrl: user.imgUrl, createdAt: user.createdAt }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
    return user
}

function _createUsers() {
    let users = utilService.loadFromStorage('users') || []
    if (users.length > 12) {
        users = [
            {
                _id: '101',
                fullname: 'frederickkessie',
                imgUrl: "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png",
                createdAt: "2024-04-10T09:01:48.413Z"
            },
            {
                _id: '102',
                fullname: 'vividstore',
                imgUrl: "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png",
                createdAt: "2024-04-10T09:01:48.413Z"
            },
            {
                _id: '103',
                fullname: "achinthyadesign",
                imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
                createdAt: "2024-04-10T09:01:48.413Z"
            },
            {
                _id: '104',
                fullname: "Kelly Lewis",
                imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg",
                createdAt: "2024-04-10T09:01:48.413Z"
            },
            {
                _id: '105',
                fullname: "Sohail",
                imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg",
                createdAt: "2024-04-10T09:01:48.413Z"
            },
            {
                _id: '106',
                fullname: "Danny",
                imgUrl: "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/1c9c2f19c94767182a311f193304408f-1706806959/jagem%20axcc/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                createdAt: "2024-04-10T09:01:48.413Z"
            },
            {
                _id: '107',
                fullname: "etigalor",
                imgUrl: "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/1c9c2f19c94767182a311f193304408f-1706806959/jagem%20axcc/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                createdAt: "2024-04-10T09:01:48.413Z"
            },
        ]
    }
    utilService.saveToStorage('users', users)
    return users
}

// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()