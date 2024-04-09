import { storageService } from "./async-storage.service"
import { utilService } from "./util.service"

export const gigService = {
    query,
    getById,
    remove,
    save,
    getCategoryDesc,
    getDefaultFilter,
    getCategoryDesc,
}

const STORAGE_KEY = 'gigDB'
_createGigs()

async function query(filterBy) {
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

    filterBy.maxPrice = (+filterBy.maxPrice) ? +filterBy.maxPrice : Infinity
    filterBy.minPrice = (+filterBy.minPrice) ? +filterBy.minPrice : ''
    filterBy.minPrice = (+filterBy.minPrice) ? +filterBy.minPrice : ''

    filteredGigs = filteredGigs.filter(gig => (gig.price <= filterBy.maxPrice) && (gig.price >= filterBy.minPrice))

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

function getDefaultFilter() {
    return { search: "", category: "", maxPrice: Infinity, minPrice: '' }
}

function _createGigs() {
    let gigs = utilService.loadFromStorage(STORAGE_KEY)
    if (!gigs || !gigs.length) {

        gigs = [
            {
                _id: utilService.makeId(),
                title: "I will design 3 modern minimalist flat logo designs",
                about: "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
                price: 33,
                owner: {
                    fullname: "frederickkessie",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
                    level: "basic/premium",
                    rate: 2
                },
                country: "Ghana",
                daysToMake: 26,
                description: "Hello ! Much obliged for visiting my gig logo :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                // imgUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                imgs: [
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670539022/samples/higherr/PDF_yudyhd_e3zm8f.jpg",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670539022/samples/higherr/2e0ec728de7ea45a1cdd28e76a1dad9cddf71ed3_vlcq8u.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670539021/samples/higherr/Preview_1_q8o5ik.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670539022/samples/higherr/eccdc57ef960b6cc51853d37a1ff9034af618deb_o0cnyc.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670539021/samples/higherr/Preview_tpymrg.webp",
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
                        rate: 5
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
                        rate: 4
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
                _id: utilService.makeId(),
                title: "I will illustrate your childrens book",
                about: "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
                price: 151,
                owner: {
                    fullname: "vividstore",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg",
                    level: "basic/premium",
                    rate: 3
                },
                country: "Bangladesh",
                daysToMake: 24,
                description: "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black and White or colored realistic pictures.\nPlease provide me clear reference photo as much as possible.\nThe material I used for creating pencil sketches are:\nDrawing materials : graphite pencil, charcoal, Bristol paper, mono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can provide me anything:\nPortrait photos\nFamily photos\nPet photos\nAny object photos\nScenery photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order ! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                // imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/205987196/original/f85061c75149b8c4c87ebc890bfcbece1246ec43.jpg",
                imgs: [
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670578209/samples/higherr/073e5e5186f8111e93229af39371ba025f40fb27_nbyzrl.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670578209/samples/higherr/ninja_pengiuns_and_McDonalds_njjxtq.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670578209/samples/higherr/Holiday-Music-Program-Front_s8yalq.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670578208/samples/higherr/1bbbfef643c1153ea8bdd8a3698f40eb7f0f287f_lbcprp.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670578209/samples/higherr/049babb0e9aa465142ce28f5ca69c48fa4109f74_fm3kxu.webp",
                ],
                tags: [
                    "pencil drawing",
                    "realistic drawing",
                    "hand drawing",
                    "portrait drawing",
                    "graphics-design"
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
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "merisoo",
                        country: "Finland",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1eb-1f1ee.png",
                        review: "Very talented artist. Will definitely hire again!",
                        reviewedAt: "Published 2 months ago",
                        rate: 5,
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
                        rate: 4,
                        _id: utilService.makeId()
                    }
                ]
            },
            {
                _id: utilService.makeId(),
                title: "I will design elegant custom watercolor logo for you",
                about: "Hi reader, thanks for your time. I'm an experienced young artist and i specialize in 3D animation, graphic designing and pencil Art. I'm familiar with word processing application. Kindly hit me up if if you need any of my services.",
                price: 172,
                owner: {
                    fullname: "frederickkessie",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
                    level: "basic/premium",
                    rate: 2
                },
                country: "Japan",
                daysToMake: 3,
                description: "Hello ! Much obliged for visiting my gig :)\nIn this gig I'm offering you an exceptionally 3 one of a kind, best and reasonable bundles.\nIn case you are thinking for giving somebody uncommon an extremely delightful, eye getting gift( hyper practical hand drawing pencil sketch picture)?\nKindly select the helpful bundle and submit your request at this moment and I'll give you an ideal picture sketch, hand drawing, practical drawing, pencil attracting high goal JPEG/PNG advanced document.\nI will give hand-drawn dark and White or hued reasonable pictures.\nSympathetically give me clear reference photograph however much as could be expected.\nThe material I utilized for Creating pencil representations are:\nDrawing materials: graphite pencil, charcoal, Bristol paper, mono eraser, brush, mixing stump, mechanical pencil, graphite powder and so on .\nYou can give me anything:\nPicture photographs\nFamily photographs\nCreature photographs\nAny item photographs\nScene photographs\nEngineering photographs\nAnything you envision\nKindly reach me prior to submitting your request! Much appreciated.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                // imgUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/165484082/original/47e541c51577641a483a717dc51e15694a9468f8/create-a-winning-product-label-packaging-and-box-design.jpg",
                imgs: [
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579156/samples/higherr/8e6ace9686e7b2426f762a300de621680e0b3e09_tbiesi.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579156/samples/higherr/INVERSO_coloring_book_az7nef.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579157/samples/higherr/Reis_of_Tranquillity_nrdmrq.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670579156/samples/higherr/8e6ace9686e7b2426f762a300de621680e0b3e09_tbiesi.webp",
                ],
                tags: [
                    "pencil drawing",
                    "logo-design",
                    "graphics-design",
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
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "liam31",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "I requested a slightly earlier delivery on this and once again Frederick came through and provided a fantastic delivery. Thanks so much!",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "liam31",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Frederick is amazing and extremely talented. This is the second time working with him and he has been a pleasure yet again!",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "larsonraz",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very detailed",
                        reviewedAt: "Published 1 week ago",
                        rate: 4,
                        _id: utilService.makeId()
                    },
                    {
                        name: "stevekaszycki",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "very nice portrait, very good quality.",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    }
                ]
            },
            {
                _id: utilService.makeId(),
                title: "I will create modern unique and creative logo design",
                about: "Hello, this is Masuk, stand up for vividstore,I am a young and enthusiastic graphic artist and realistic pencil sketch artist. I am certified as graphic designer from George Washington University, USA. I have almost 11 years experience in this field since my university life. I really love to work with Adobe Illustrator, Adobe Photoshop, and so on as a full time online freelancer. And also passionate about sketching. Thank you.",
                price: 88,
                owner: {
                    fullname: "vividstore",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/83cc7c97f9873bdb052590a94d32f84c-1576419363871/ed47443e-0f9b-42ab-beaf-ec0a0acccfe8.jpeg",
                    level: "basic/premium",
                    rate: 2
                },
                country: "Canada",
                daysToMake: 2,
                description: "Hey ! Thanks for visiting my gig :)\nIn this gig i'm offering you a very 3 unique, preferable and affordable packages.\nIf you are thinking for giving someone special a very beautiful, eye catching gift( hyper realistic hand drawing pencil sketch portrait)?\nPlease select the desirable package and place your order right now and i'll give you a perfect portrait sketch, hand drawing, realistic drawing,pencil drawing in high resolution JPEG/PNG digital file.\nI will provide hand-drawn black and White or colored realistic pictures.\nPlease provide me clear reference photo as much as possible.\nThe material I used for creating pencil sketches are:\nDrawing materials : graphite pencil, charcoal, Bristol paper, mono eraser, brush, blending stump, mechanical pencil, graphite powder etc .\nYou can provide me anything:\nPortrait photos\nFamily photos\nPet photos\nAny object photos\nScenery photos\nArchitecture photos\nAnything you imagine\nPlease contact me before placing your order ! Thanks.\nI DO NOT DELIVER ORIGINAL PHYSICAL COPY BUT A HIGH RESOLUTION JPEG DIGITA",
                // imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/205987196/original/f85061c75149b8c4c87ebc890bfcbece1246ec43.jpg",
                imgs: [
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670540143/samples/higherr/1-compressed_vg23so_s96mig.jpg",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670540142/samples/higherr/938935726cecfb3a833dacb6ef74dd64c5ad2dbb_kez7p3.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670540142/samples/higherr/d2a336cddc5696e30b5d1ebcf07b7549c8634078_nba918.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670540142/samples/higherr/1-01_rjsszy.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670540142/samples/higherr/Mockup_pigcld.webp",
                ],
                tags: [
                    "pencil-drawing",
                    "realistic-drawing",
                    "graphics-design",
                    "logo-design",
                    "pencil-sketch"
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
                        rate: 4,
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
                        rate: 4,
                        _id: utilService.makeId()
                    }
                ]
            },
            {
                _id: utilService.makeId(),
                title: "I will do logo hyper realistic pencil sketch portrait by hand drawing",
                about: "Hello, I am Achinthya from Sri Lanka. I am a professional graphic designer with more than 5 years of experience. I have completed a diploma in Graphic designing and I am currently following a degree in Graphic designing. I have a good knowledge of Adobe Illustrator, Adobe Photoshop, and other graphic designing software. I can create a unique and eye-catching logo, T-shirt design, poster design, and other graphic design works for you. Feel free to contact me anytime. I am available 24/7. Thank you.",
                price: 151,
                owner: {
                    fullname: "achinthyadesign",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/4abf6f5b58e4d78cfb7c410cf8d7a9ac-1626111679444/4a04b77c-22ee-4ce8-b4be-747fd059e9ff.jpg",
                    level: "basic/premium",
                    rate: 3
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
                    "graphics-design",
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
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "carynkingsley",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Great communication and very quick turnaround. Exactly what I wanted, thank you!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "shaneo587",
                        country: "Australia",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png",
                        review: "Great communication and excellent work.",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5,
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
                        rate: 2,
                        rate: 2,
                        _id: utilService.makeId()
                    }

                ]
            },
            {
                _id: utilService.makeId(),
                title: "I will do data entry, copy paste and excel data entry work for you",
                about: "Hello Fiverr Community, This is Kelly lewis. I am a professional LinkedIn Lead and B2B Lead Generation Specialist. My Service Area:- Lead Generation, B2B Lead Generation, LinkedIn lead Generation, Email list building, Data entry, Prospect List Building, Email List Building, lead prospecting and many more. I have more than 6 years experience in the sector. I am here to provide 100% accurate service to my clients & give 100% satisfaction. I am ready to do your job with great confidence and always try my level best to produce high-quality work for my clients. Thanks.",
                price: 151,
                owner: {
                    fullname: "Kelly Lewis",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg",
                    level: "basic/premium",
                    rate: 3
                },
                country: "Bangladesh",
                daysToMake: 25,
                description: "'Hi, Welcome to my Gig page on Fiverr.com! Note: Please contact me first before placing an order to check the availability and price estimate of your project. Description: Do you need a perfect and professional virtual assistant for Data Entry,Excel Data Entry, Copy Paste Work, Typing Work , Data mining, Data collection using MS Excel, MS Word, Google Spreadsheet or Google doc? Yes, you are in the right place. Please check out my expertise below and the gig extras I\'m offering. Data Entry Copy Paste Work Excel Data Entry Product Listing Shopify Product listing CRM Data Entry Data Scraping Data Conversion PDF to Excel or Word JPEG to Excel or Word Typing in Excel or Word Business Card Entry WordPress Data Entry E-commerce Products Listing Web Research and Web Scrapping Data Collection from Linkedln/Instagram Property Research, Public Record Search Real Estate Research and Data Entry (Name, Email, Phone, Address, etc) Why trust me? Positive Customer Reviews Quick Reply. On-time delivery Quality Customer Support Efficient time of working P.S. - We don\'t deal with anything outside of Fiverr. Never share your personal information. Thanks!'",
                imgUrl: "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/233799141/original/cd8d60d216477f2ac775f0057895fbaae0343e16.jpg",
                imgs: [
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670538742/samples/higherr/Contact-Research_s1cea4.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670538442/samples/higherr/1802a6d7d83eb6f006f70e017664e52fdead347b_ukhxdt.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670538742/samples/higherr/424d2855d1f4b4cfd04afada4e4fdb5b53c3640a_yycm34.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670538741/samples/higherr/82be51209ae13bcc9f5f7f3f5d8d4b84bde28ddc_hq2qup.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1670538742/samples/higherr/program-google-sheets-and-excel-formulas-macros-vba-gas_1_sxh7lg.jpg",
                ],
                tags: [
                    "digital-marketing",
                    "programming-tech",
                    "data"
                ],
                likedByUsers: [],
                reviews: [
                    {
                        name: "brandon_w99",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very professional and friendly. Completed the job efficiently and the result was exactly what I wanted.",
                        reviewedAt: "Published 1 month ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "carynkingsley",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Great communication and very quick turnaround. Exactly what I wanted, thank you!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "shaneo587",
                        country: "Australia",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png",
                        review: "Great communication and excellent work.",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5,
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
                        rate: 2,
                        rate: 2,
                        _id: utilService.makeId()
                    }

                ]
            },
            {
                _id: utilService.makeId(),
                title: "I will develop full stack ruby on rails application",
                about: "Self-directed and enthusiastic technology consultant experienced working with several successfully funded start-ups.",
                price: 4847,
                owner: {
                    fullname: "Sohail",
                    imgUrl: "https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/5344c10fd4820db3626c4fc24968783d-1588608774469/1e4a3bd9-b71d-48ce-8ac0-0ff6d667caf4.jpeg",
                    level: "basic/premium",
                    rate: 3
                },
                country: "Pakistan",
                daysToMake: 3,
                description: "I provide exceptional services and guaranteed quality work. I provide end-to-end services like Discovery workshop, UI/UX design, full-stack development, testing, security, deployments and growth hacking consultancy..",
                // imgUrl: ,
                imgs: [
                    "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs3/101044791/original/a0e4d038841826b306f94c43f099c548d2d0635e/develop-full-stack-ruby-on-rails-application.jpg",
                    "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/101044791/original/85bf7d42ae18114e7e31900d07f37e9bf05e96c1/develop-full-stack-ruby-on-rails-application.jpg",
                    "https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/101044791/original/11d70942cc115b08443e22d851db8d460a5a1a13/develop-full-stack-ruby-on-rails-application.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/3ff38d9278f19108234ccbaf545ca12d-1699346754/marcha/develop-full-stack-ruby-on-rails-application.png",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/db2106985b3e5864de20536c034fc31f-1611181736/caselogger/develop-full-stack-ruby-on-rails-application.png"
                ],
                tags: [
                    "digital marketing",
                    "programming-tech",
                    "data"
                ],
                likedByUsers: [],
                reviews: [
                    {
                        name: "brandon_w99",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very professional and friendly. Completed the job efficiently and the result was exactly what I wanted.",
                        reviewedAt: "Published 1 month ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "carynkingsley",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Great communication and very quick turnaround. Exactly what I wanted, thank you!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "shaneo587",
                        country: "Australia",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png",
                        review: "Great communication and excellent work.",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5,
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
                        rate: 2,
                        rate: 2,
                        _id: utilService.makeId()
                    }

                ]
            },
            {
                _id: utilService.makeId(),
                title: "I will fix your disabled ad account and business manager ad account",
                about: "Hello I'm Danyal, The focus of my main work is on Logo Design, Branding & Business Card. I have 4 Years of experience and professional team to support your project. Feel free to Message me. Let's discuss for an extraordinary project. Thanks!.",
                price: 367,
                owner: {
                    fullname: "Danny",
                    imgUrl: "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/1c9c2f19c94767182a311f193304408f-1706806959/jagem%20axcc/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                    level: "basic/premium",
                    rate: 2
                },
                country: "Pakistan",
                daysToMake: 3,
                description: "I have 3 years of experience in Facebook. I'll re-activate your (Personal or business manager ad account) in a few hours depending on what problem you're facing.I can also activate your pixel & and verify your domain. Don't worry I'll fix any issues you're facing regarding Facebook or Instagram.Just text me and here I am.",
                // imgUrl: ,
                imgs: [
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/330989206/original/f92ac2fbe0b475369e488f19c99147df37e2da0f/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/46b6d709cfb973cd7083973a69068f42-1712423938/south/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/1c9c2f19c94767182a311f193304408f-1706806959/jagem%20axcc/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/b95e4169e34d6800d338acb3f1b43f90-1711413766/solution%20ad%20account/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                    "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/8418cdaac095c851de6e9706762ddc08-1707865697/image_2024_02_13T19_37_07_625Z/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png"
                ],
                tags: [
                    "digital-marketing",
                    "programming-tech",
                    "data"
                ],
                likedByUsers: [],
                reviews: [
                    {
                        name: "brandon_w99",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very professional and friendly. Completed the job efficiently and the result was exactly what I wanted.",
                        reviewedAt: "Published 1 month ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "carynkingsley",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Great communication and very quick turnaround. Exactly what I wanted, thank you!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "shaneo587",
                        country: "Australia",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png",
                        review: "Great communication and excellent work.",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5,
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
                        rate: 2,
                        rate: 2,
                        _id: utilService.makeId()
                    }

                ]
            }, {
                _id: utilService.makeId(),
                title: "I will create an eye catching whiteboard animation digital hand drawn",
                about: "Online Marketing professional with 20 years of experience. After running websites, paid-ads, blogs, and e-shops, in 2012 it was clear that video was essential for Internet Marketing and I began creating whiteboard and animated explainers, which quickly became a passion.",
                price: 367,
                owner: {
                    fullname: "etigalor",
                    imgUrl: "https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/v1/attachments/delivery/asset/1c9c2f19c94767182a311f193304408f-1706806959/jagem%20axcc/fix-your-disabled-ad-account-and-business-manager-ad-account-0f73.png",
                    level: "basic/premium",
                    rate: 1
                },
                country: "Pakistan",
                daysToMake: 3,
                description: "ENGAGE YOUR AUDIENCE!!! with your own whiteboard animated doodle video.ULTRA FAST 48 Hours turn-around available.PUT YOUR VIDEO MARKETING ON STEROIDS.We`ll create a fantastic speed-draw or whiteboard animation of any logo, picture, script or text",
                imgs: [
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1673171698/samples/higherr/d7c363450fafd445dc9db12e131b49d5b71cae71_xligox.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1673171698/samples/higherr/82ea52540673a059c1d1f5c64fff097337b7c02c_p7jt5c.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1673171698/samples/higherr/d7f00dc1383b5105705c6f4fd03b9a038c74010d_g9gj12.webp",
                    "https://res.cloudinary.com/dja6gjgcd/image/upload/v1673171698/samples/higherr/Screenshot_2022-10-30_at_18.46.34_c5tuuf_avgypl.jpg",
                    "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/367845785/original/5eb949e7094c4fbb9dc4ad1327fb6bc6b069b2c2/animator-specializing-in-whiteboard-and-explainer-videos.png"
                ],
                tags: [
                    "video-animation",
                    "graphic-design"
                ],
                likedByUsers: [],
                reviews: [
                    {
                        name: "brandon_w99",
                        country: "United States",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png",
                        review: "Very professional and friendly. Completed the job efficiently and the result was exactly what I wanted.",
                        reviewedAt: "Published 1 month ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "carynkingsley",
                        country: "United Kingdom",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1ec-1f1e7.png",
                        review: "Great communication and very quick turnaround. Exactly what I wanted, thank you!",
                        reviewedAt: "Published 2 weeks ago",
                        rate: 5,
                        _id: utilService.makeId()
                    },
                    {
                        name: "shaneo587",
                        country: "Australia",
                        flag: "https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e6-1f1fa.png",
                        review: "Great communication and excellent work.",
                        reviewedAt: "Published 3 weeks ago",
                        rate: 5,
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
                        rate: 2,
                        rate: 2,
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

























