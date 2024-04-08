import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

export const gigService = {
    query,
    getById,
    remove,
    save,
    getCategoryDesc
}

const STORAGE_KEY = 'gigDB'
_createGigs()

async function query(filterBy = { search: '', category: '' }) {
    const gigs = await storageService.query(STORAGE_KEY)
    let filteredGigs = gigs
    if (filterBy.search) {
        const regex = new RegExp(filterBy.search, 'i')
        filteredGigs = filteredGigs.filter(gig => regex.test(gig.title) || regex.test(gig.description))
    }

    if (filterBy.category) {
        filteredGigs = filteredGigs.filter(gig => gig.tags.some(tag => {
            return filterBy.category === tag
        }))

    }

    return filteredGigs
}

function getById(gigId) {
    return storageService.get(STORAGE_KEY, gigId)
}

async function remove(gigId) {
    await storageService.remove(STORAGE_KEY, gigId)
}

async function save(gig) {
    var savedGig
    if (gig._id) {
        savedGig = await storageService.put(STORAGE_KEY, gig)
    } else {
        // Later, owner is set by the backend
        gig.owner = userService.getLoggedinUser()
        savedGig = await storageService.post(STORAGE_KEY, gig)
    }
    return savedGig
}

function getEmptyGig() {
    return {
        title: '',
        price: utilService.getRandomIntInclusive(1000, 9000),
    }
}



function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {

        gigs = [
            {
                _id: 'd102',
                title: "I will do hyper realistic pencil portrait by hand drawing",
                about: "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
                price: 172,
                owner: {
                    fullname: "frederickkessie",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
                    level: "basic/premium",
                    rate: 2
                },
                country: "Ghana",
                daysToMake: 26,
                description: "Hello ! Much obliged for visiting my gig logo :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                imgUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                imgs: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                ],
                tags: [
                    "pencil-drawing",
                    "realistic-drawing",
                    "logo-design",
                    "graphics-design"
                ],
                likedByUsers: [
                    "mini-user"
                ],
                reviews: [
                    {
                        name: "tobiaspille300",
                        country: "Thailand",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
                        review: "frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !",
                        reviewedAt: "Published 2 months ago",
                        rate: 3
                    },
                    {
                        name: "liam31",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5
                    },
                    {
                        name: "liam31",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 1
                    },
                    {
                        name: "larsonraz",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very detailed",
                        reviewedAt: "Published 1 week ago",
                        rate: 5
                    },
                    {
                        name: "stevekaszycki",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "very nice portrait, very good quality.",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5
                    }
                ]
            },
            {
                _id: 'd103',
                title: "I will do hyper realistic pencil sketch portrait by hand drawing",
                about: "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
                price: 151,
                owner: {
                    fullname: "vividstore",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg",
                    level: "basic/premium",
                    rate: 4
                },
                country: "Bangladesh",
                daysToMake: 24,
                description: "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black and White or colored realistic pictures.\nPlease provide me clear reference photo as much as possible.\nThe material I used for creating pencil sketches are:\nDrawing materials : graphite pencil, charcoal, Bristol paper, mono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can provide me anything:\nPortrait photos\nFamily photos\nPet photos\nAny object photos\nScenery photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order ! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/205987196/original/f85061c75149b8c4c87ebc890bfcbece1246ec43.jpg",
                imgs: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                ],
                tags: [
                    "pencil drawing",
                    "realistic drawing",
                    "hand drawing",
                    "portrait drawing",
                    "pencil sketch"
                ],
                likedByUsers: [
                    "mini-user",
                    "mini-user"
                ],
                reviews: [
                    {
                        name: "cybersmart07",
                        country: "Nigeria",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ec.png",
                        review: "the work was beautifully done, and in a timely manner.",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()

                    },
                    {
                        name: "swspencer",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very easy to work with and got the drawing to me quickly!",
                        reviewedAt: "Published 1 month ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "merisoo",
                        country: "Finland",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1ee.png",
                        review: "Very talented artist. Will definitely hire again!",
                        reviewedAt: "Published 2 months ago",
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "edwarden",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Brilliant as always. Super happy!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "edwarden",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Brilliant work again. Thanks!",
                        reviewedAt: "Published 1 week ago",
                        rate: 5,
                        _id: utilService.makeId()
                    }
                ]
            },
            {
                _id: 'd104',
                title: "I will do hyper realistic pencil portrait by hand drawing",
                about: "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
                price: 172,
                owner: {
                    fullname: "frederickkessie",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
                    level: "basic/premium",
                    rate: 2
                },
                country: "Ghana",
                daysToMake: 26,
                description: "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                imgUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                imgs: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                ],
                tags: [
                    "pencil drawing",
                    "realistic drawing",
                    "hand drawing",
                    "portrait drawing",
                    "pencil sketch"
                ],
                likedByUsers: [
                    "mini-user"
                ],
                reviews: [
                    {
                        name: "tobiaspille300",
                        country: "Thailand",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f9-1f1ed.png",
                        review: "frederickkessie ist a super kind artist doing the process he was super professional and only took him 1 shot to deliver a perfect result ! Highly recommended work with this guy !",
                        reviewedAt: "Published 2 months ago",
                        rate: 3,
                        _id: utilService.makeId()
                    },
                    {
                        name: "liam31",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "liam31",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "larsonraz",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very detailed",
                        reviewedAt: "Published 1 week ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "stevekaszycki",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "very nice portrait, very good quality.",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 2,
                        _id: utilService.makeId()
                    }
                ]
            },
            {
                _id: 'd105',
                title: "I will do hyper realistic pencil sketch portrait by hand drawing",
                about: "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
                price: 151,
                owner: {
                    fullname: "vividstore",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg",
                    level: "basic/premium",
                    rate: 4
                },
                country: "Bangladesh",
                daysToMake: 24,
                description: "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black and White or colored realistic pictures.\nPlease provide me clear reference photo as much as possible.\nThe material I used for creating pencil sketches are:\nDrawing materials : graphite pencil, charcoal, Bristol paper, mono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can provide me anything:\nPortrait photos\nFamily photos\nPet photos\nAny object photos\nScenery photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order ! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/205987196/original/f85061c75149b8c4c87ebc890bfcbece1246ec43.jpg",
                imgs: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                ],
                tags: [
                    "pencil drawing",
                    "realistic drawing",
                    "hand drawing",
                    "portrait drawing",
                    "pencil sketch"
                ],
                likedByUsers: [
                    "mini-user",
                    "mini-user"
                ],
                reviews: [
                    {
                        name: "cybersmart07",
                        country: "Nigeria",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1f3-1f1ec.png",
                        review: "the work was beautifully done, and in a timely manner.",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "swspencer",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very easy to work with and got the drawing to me quickly!",
                        reviewedAt: "Published 1 month ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "merisoo",
                        country: "Finland",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1ee.png",
                        review: "Very talented artist. Will definitely hire again!",
                        reviewedAt: "Published 2 months ago",
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "edwarden",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Brilliant as always. Super happy!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "edwarden",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Brilliant work again. Thanks!",
                        reviewedAt: "Published 1 week ago",
                        rate: 5,
                        _id: utilService.makeId()
                    }
                ]
            },
            {
                _id: 'd106',
                title: "I will do logo hyper realistic pencil sketch portrait by hand drawing",
                about: "Hello, I am Achinthya from Sri Lanka. I am a professional graphic designer with more than 5 years of experience. I have completed a diploma in Graphic designing and I am currently following a degree in Graphic designing. I have a good knowledge of Adobe Illustrator, Adobe Photoshop, and other graphic designing software. I can create a unique and eye-catching logo, T-shirt design, poster design, and other graphic design works for you. Feel free to contact me anytime. I am available 24/7. Thank you.",
                price: 151,
                owner: {
                    fullname: "achinthyadesign",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/18bdf465e9b2445224d5b96098c71e3e-1631471792037/9da79f12-2432-450e-bfb7-ffae92427b9b.jpg",
                    level: "basic/premium",
                    rate: 5
                },
                country: "Sri Lanka",
                daysToMake: 25,
                description: "Hello! Welcome to my gig. I am Achinthya from Sri Lanka. I am a professional graphic designer with more than 5 years of experience. I have completed a diploma in Graphic designing and I am currently following a degree in Graphic designing. I have a good knowledge of Adobe Illustrator, Adobe Photoshop, and other graphic designing software. I can create a unique and eye-catching logo, T-shirt design, poster design, and other graphic design works for you. Feel free to contact me anytime. I am available 24/7. Thank you.",
                imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/233799141/original/cd8d60d216477f2ac775f0057895fbaae0343e16.jpg",
                imgs: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                ],
                tags: [
                    "logo design",
                    "t-shirt design",
                    "graphic design",
                    "poster design",
                    "illustration"
                ],
                likedByUsers: [],
                reviews: [
                    {
                        name: "brandon_w99",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very professional and friendly. Completed the job efficiently and the result was exactly what I wanted.",
                        reviewedAt: "Published 1 month ago",
                        rate: 3,
                        _id: utilService.makeId()
                    },
                    {
                        name: "carynkingsley",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Great communication and very quick turnaround. Exactly what I wanted, thank you!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 3,
                        _id: utilService.makeId()
                    },
                    {
                        name: "shaneo587",
                        country: "Australia",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png",
                        review: "Great communication and excellent work.",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "jackson_dixon",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Great work and fast turnaround.",
                        reviewedAt: "Published 1 month ago",
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "katelynboston",
                        country: "Canada",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e8-1f1e6.png",
                        review: "Amazing work, exactly what I was looking for. Highly recommended!",
                        reviewedAt: "Published 1 month ago",
                        rate: 5,
                        _id: utilService.makeId()
                    }
                ]
            }
        ]
    }

    utilService.saveToStorage(STORAGE_KEY, gigs)
    return gigs
}

function getCategoryDesc(category) {
    return categories[category]
}


const categories = {
    'graphics-design': 'Create logos, illustrations, and layouts to make things look good and easy to use.',
    'programming-tech': 'Build websites, apps, and cool tech stuff using coding and computer skills.',
    'digital-marketing': 'Promote businesses online with social media, ads, and clever content.',
    'video-animation': 'Make videos and animations that tell stories and grab attention.',
    'writing-translation': 'Write and translate words to convey messages clearly and effectively.',
    'music': 'Make music and sound effects for movies, games, and podcasts.',
    'business': 'Run companies and make them successful by planning and managing everything.',
    'consulting': 'Help businesses solve problems and improve by giving expert advice.',
    'data': 'Use information to understand trends and make smart decisions. ',
    'ai-services': 'Use smart computer programs to automate tasks and make things easier.'
}

























