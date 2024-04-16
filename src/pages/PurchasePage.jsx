import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { gigService } from "../services/gig.service"
import { addOrder } from "../store/actions/order.actions"
import { useLocation } from "react-router-dom"
import { showUserMsg } from "../services/event-bus.service"
import { SOCKET_EVENT_NEW_CLIENT_ORDER, socketService } from "../services/socket.service"


export function PurchasePage() {
    const location = useLocation()
    const { gigId } = useParams()
    const navigate = useNavigate()
    const [gig, setGig] = useState({})
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const selectedPackage = location.state ? location.state.selectedPackage : null
    console.log('location:', location)
    console.log('location.state:', location.state)

    useEffect(() => {
        loadGig()
        window.scrollTo(0, 0)
    }, [])

    async function loadGig() {
        try {
            const gig = await gigService.getById(gigId)
            setGig(gig)
        }
        catch (err) {
            navigate('/gig')
        }
    }

    async function onPurchase(ev) {
        ev.preventDefault()

        const order = {
            buyer: {
                _id: user._id,
                fullname: user.fullname
            },
            seller: {
                _id: gig.owner._id,
                fullname: gig.owner.fullname,
            },
            gig: {
                _id: gig._id,
                title: gig.title,
                price: gig.price,
                imgUrl: gig.imgs[0]
            },
            status: 'pending',
            createdAt: new Date(Date.now())
        }
        console.log('order:', order)
        try {
            await addOrder(order)
            showUserMsg('Your order has been placed successfully')
            socketService.emit(SOCKET_EVENT_NEW_CLIENT_ORDER, order)
            navigate(`/user/${user._id}`)
        }
        catch (err) {
            showUserMsg('Something went wrong')
            console.log("cant add order", err)
        }
    }

    if (!gig) return <div>Loading...</div>
    return (
        <section className="gig-purchase">

            <section className="flex inner-container">

                <section className="flex column justify-center payment-section">
                    <header>Billing information</header>
                    <div className='flex row align-center billing-info'>
                        <p>Your invoice will be issued according to the details listed here.</p>
                        <button>Add details</button>
                    </div>
                    <div className="flex header">
                        <h1>Payment Option</h1>
                    </div>
                    <div className='flex align-center outer-debit-container'>
                        <div className="flex row align-center credit-debit-card-container">
                            <span></span>
                            <h4>Credit & Debit Cards</h4>
                            <div className="svg-container flex">

                                <svg width="152" height="20" viewBox="0 0 152 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="20" rx="2" fill="#1434CB"></rect><g clipPath="url(#clip0_5729_184079)"><path d="M9.41944 6.29871L6.61125 12.9987H4.77912L3.3972 7.65181C3.3133 7.32247 3.24035 7.20182 2.98519 7.06307C2.56861 6.83707 1.88066 6.62503 1.27539 6.49343L1.3165 6.29871H4.26568C4.6416 6.29871 4.97954 6.54895 5.06489 6.98185L5.79472 10.8588L7.5987 6.29871H9.41944ZM16.5982 10.8112C16.6055 9.04289 14.1529 8.94547 14.1698 8.15553C14.1751 7.91512 14.404 7.65951 14.905 7.59427C15.1533 7.56176 15.8376 7.53696 16.6137 7.89412L16.9181 6.47332C16.5011 6.32195 15.9645 6.17627 15.2969 6.17627C13.5837 6.17627 12.3781 7.08697 12.3679 8.39103C12.3569 9.35558 13.2285 9.89382 13.8852 10.2143C14.5607 10.5426 14.7874 10.7535 14.7848 11.0471C14.78 11.4965 14.246 11.6949 13.747 11.7027C12.8758 11.7161 12.3703 11.467 11.9673 11.2797L11.6532 12.7475C12.0582 12.9333 12.8056 13.0954 13.5806 13.1035C15.4015 13.1035 16.5926 12.2041 16.5982 10.8112ZM21.122 12.9988H22.725L21.3256 6.29871H19.8461C19.5134 6.29871 19.2327 6.49242 19.1085 6.79026L16.5077 12.9987H18.3276L18.689 11.9979H20.9127L21.122 12.9987V12.9988ZM19.1881 10.6248L20.1003 8.10917L20.6254 10.6248H19.1882H19.1881ZM11.8958 6.29871L10.4626 12.9987H8.72949L10.1632 6.29871H11.8958Z" fill="white"></path></g><rect x="32" width="24" height="20" rx="2" fill="#000066"></rect><path fillRule="evenodd" clipRule="evenodd" d="M45.7702 10.3861C45.7702 13.3603 43.3593 15.7711 40.3852 15.7711C37.411 15.7711 35 13.3603 35 10.3861C35 7.41199 37.411 5.00098 40.3852 5.00098C43.3593 5.00098 45.7702 7.41199 45.7702 10.3861Z" fill="#CC0000"></path><path fillRule="evenodd" clipRule="evenodd" d="M47.6158 5.00098C46.224 5.00098 44.9563 5.52886 44.0005 6.39485C43.806 6.57135 43.6245 6.76198 43.4569 6.96495H44.545C44.6936 7.14587 44.8305 7.33608 44.9555 7.5353H43.0463C42.9321 7.71835 42.8283 7.90855 42.7361 8.10565H45.2656C45.3521 8.29023 45.4282 8.48035 45.4937 8.67574H42.508C42.4459 8.86144 42.3934 9.05172 42.3516 9.24575H45.6499C45.7289 9.61339 45.7709 9.99482 45.7709 10.3861C45.7709 10.984 45.6735 11.5594 45.4937 12.0968H42.508C42.5735 12.292 42.6496 12.4824 42.7359 12.6673H45.2656C45.1732 12.8638 45.0699 13.0542 44.955 13.2375H43.0463C43.1708 13.4362 43.308 13.6266 43.4569 13.8073H44.5446C44.3774 14.0104 44.1957 14.201 44.0007 14.3775C44.9564 15.2435 46.224 15.7711 47.6158 15.7711C50.5898 15.7711 53.0007 13.3603 53.0007 10.3861C53.0007 7.41224 50.5898 5.00098 47.6158 5.00098Z" fill="#FF9900"></path><path fillRule="evenodd" clipRule="evenodd" d="M39.1275 10.9755C39.0662 10.9686 39.0391 10.9663 38.997 10.9663C38.6656 10.9663 38.498 11.08 38.498 11.3046C38.498 11.4429 38.5798 11.5308 38.7075 11.5308C38.9457 11.5308 39.1173 11.3041 39.1275 10.9755ZM39.5528 11.9654H39.0682L39.0794 11.7352C38.9316 11.9169 38.7344 12.0037 38.4666 12.0037C38.1499 12.0037 37.9326 11.7564 37.9326 11.397C37.9326 10.8561 38.3104 10.5406 38.9589 10.5406C39.0254 10.5406 39.1103 10.5467 39.1973 10.5577C39.2154 10.4843 39.2201 10.4532 39.2201 10.4136C39.2201 10.2666 39.1183 10.2114 38.8452 10.2114C38.5592 10.2085 38.3233 10.2797 38.2264 10.3116C38.2325 10.2746 38.3075 9.81195 38.3075 9.81195C38.5987 9.72633 38.7909 9.69434 39.0071 9.69434C39.5092 9.69434 39.7751 9.91968 39.7746 10.3457C39.7756 10.46 39.7566 10.6005 39.7272 10.7858C39.6765 11.1075 39.5676 11.7974 39.5528 11.9654Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M37.6881 11.9664H37.1034L37.4385 9.86674L36.6906 11.9664H36.2922L36.2429 9.87849L35.891 11.9664H35.3438L35.8008 9.23486H36.6415L36.6924 10.7638L37.2053 9.23486H38.1403L37.6881 11.9664Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M48.3371 10.9755C48.2758 10.9686 48.2491 10.9663 48.207 10.9663C47.8754 10.9663 47.708 11.08 47.708 11.3046C47.708 11.4429 47.7894 11.5308 47.9174 11.5308C48.1555 11.5308 48.3272 11.3041 48.3371 10.9755ZM48.7627 11.9654H48.2783L48.2892 11.7352C48.1415 11.9169 47.9444 12.0037 47.6768 12.0037C47.3596 12.0037 47.1426 11.7564 47.1426 11.397C47.1426 10.8561 47.5205 10.5406 48.1689 10.5406C48.2353 10.5406 48.32 10.5467 48.4071 10.5577C48.4252 10.4843 48.4299 10.4532 48.4299 10.4136C48.4299 10.2666 48.3281 10.2114 48.055 10.2114C47.769 10.2085 47.5332 10.2797 47.4359 10.3116C47.4424 10.2746 47.5175 9.81195 47.5175 9.81195C47.8086 9.72633 48.0009 9.69434 48.2168 9.69434C48.7193 9.69434 48.9849 9.91968 48.9843 10.3457C48.9854 10.46 48.9666 10.6005 48.937 10.7858C48.8865 11.1075 48.7773 11.7974 48.7627 11.9654Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M42.1518 11.9321C41.9917 11.9824 41.867 12.0042 41.7317 12.0042C41.4329 12.0042 41.2698 11.8325 41.2698 11.5162C41.2656 11.418 41.3128 11.1597 41.3499 10.9241C41.3837 10.7166 41.6035 9.4082 41.6035 9.4082H42.1845L42.1166 9.74444H42.4677L42.3884 10.2784H42.0362C41.9687 10.7007 41.8725 11.227 41.8714 11.2968C41.8714 11.4113 41.9325 11.4614 42.0716 11.4614C42.1382 11.4614 42.1898 11.4546 42.2292 11.4404L42.1518 11.9321Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M43.9326 11.9136C43.733 11.9746 43.5406 12.0044 43.3364 12.0037C42.6858 12.0029 42.3467 11.6633 42.3467 11.0127C42.3467 10.2535 42.7781 9.69434 43.3638 9.69434C43.8428 9.69434 44.149 10.0073 44.149 10.498C44.149 10.6612 44.128 10.8201 44.0772 11.0445H42.92C42.8809 11.3668 43.0871 11.501 43.4253 11.501C43.6331 11.501 43.8208 11.4581 44.0294 11.3613L43.9326 11.9136ZM43.606 10.5968C43.6093 10.5504 43.6675 10.2002 43.3354 10.2002C43.1505 10.2002 43.018 10.3413 42.9643 10.5968H43.606Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M39.903 10.4463C39.903 10.727 40.0392 10.9208 40.3481 11.0664C40.5847 11.1778 40.6216 11.2108 40.6216 11.3116C40.6216 11.4499 40.5171 11.5127 40.2859 11.5127C40.1113 11.5127 39.9491 11.4853 39.762 11.4248C39.762 11.4248 39.6853 11.9146 39.6816 11.938C39.8145 11.9668 39.9329 11.9936 40.29 12.0037C40.9068 12.0037 41.1918 11.7689 41.1918 11.2612C41.1918 10.9561 41.0726 10.7769 40.7797 10.6421C40.5347 10.5297 40.5064 10.5045 40.5064 10.4008C40.5064 10.2808 40.6036 10.2194 40.7925 10.2194C40.9073 10.2194 41.0639 10.2317 41.2126 10.2527L41.2958 9.73748C41.1445 9.7134 40.9148 9.69434 40.7812 9.69434C40.1273 9.69434 39.9009 10.0358 39.903 10.4463Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M46.7763 9.75322C46.9387 9.75322 47.0904 9.79543 47.2988 9.9007L47.3945 9.30788C47.3086 9.27418 47.0072 9.07666 46.7519 9.07666C46.3608 9.07666 46.0297 9.27103 45.7973 9.5911C45.4579 9.47876 45.3183 9.70582 45.1474 9.93219L44.9955 9.96759C45.007 9.89312 45.0175 9.81917 45.0141 9.7442H44.477C44.4038 10.4319 44.2738 11.1282 44.1721 11.8162L44.1455 11.9656H44.7304C44.828 11.3313 44.8814 10.9252 44.9139 10.6502L45.1341 10.5282C45.1672 10.4055 45.27 10.3643 45.4766 10.3694C45.4496 10.5142 45.435 10.6668 45.435 10.8246C45.435 11.5515 45.8276 12.004 46.4567 12.004C46.6188 12.004 46.758 11.9827 46.9736 11.924L47.0761 11.3016C46.8822 11.3968 46.7235 11.4416 46.5796 11.4416C46.2397 11.4416 46.034 11.1907 46.034 10.7761C46.034 10.1746 46.3397 9.75322 46.7763 9.75322Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M51.7251 9.23486L51.5952 10.024C51.4356 9.81372 51.2639 9.66139 51.0372 9.66139C50.7422 9.66139 50.4737 9.88504 50.2979 10.2144C50.0531 10.1636 49.8 10.0772 49.8 10.0772L49.7999 10.0793C49.8194 9.89525 49.8276 9.78326 49.8257 9.74496H49.2886C49.2157 10.4327 49.0855 11.129 48.9839 11.8169L48.957 11.9664H49.5421C49.6211 11.4537 49.6814 11.0275 49.7259 10.69C49.9259 10.5093 50.026 10.3521 50.2276 10.3623C50.1382 10.5786 50.086 10.8276 50.086 11.0831C50.086 11.6382 50.3667 12.0047 50.7918 12.0047C51.0061 12.0047 51.1705 11.9308 51.3309 11.7596L51.3033 11.9662H51.8564L52.3018 9.23486H51.7251ZM50.994 11.4532C50.7951 11.4532 50.6943 11.3056 50.6943 11.0153C50.6943 10.5786 50.8826 10.2691 51.1477 10.2691C51.3486 10.2691 51.4576 10.4219 51.4576 10.7041C51.4576 11.1445 51.2661 11.4532 50.994 11.4532Z" fill="#000066"></path><path fillRule="evenodd" clipRule="evenodd" d="M37.857 11.803H37.2724L37.6075 9.7034L36.8597 11.803H36.4612L36.412 9.71557L36.0599 11.803H35.5127L35.9698 9.07178H36.8105L36.834 10.7626L37.4013 9.07178H38.3092L37.857 11.803Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M39.2964 10.8128C39.2351 10.8056 39.2081 10.8037 39.1659 10.8037C38.8345 10.8037 38.6669 10.9172 38.6669 11.1416C38.6669 11.2797 38.7488 11.3682 38.8765 11.3682C39.1146 11.3682 39.2863 11.1415 39.2964 10.8128ZM39.7216 11.8023H39.2372L39.2483 11.5722C39.1006 11.7539 38.9034 11.8408 38.6356 11.8408C38.3187 11.8408 38.1016 11.5932 38.1016 11.2339C38.1016 10.6928 38.4794 10.3778 39.128 10.3778C39.1943 10.3778 39.2792 10.3838 39.3663 10.395C39.3843 10.3215 39.3891 10.2903 39.3891 10.2505C39.3891 10.1036 39.2873 10.0488 39.0142 10.0488C38.7281 10.0454 38.4923 10.1167 38.3952 10.1484C38.4015 10.1116 38.4763 9.64895 38.4763 9.64895C38.7677 9.5635 38.9598 9.53125 39.1761 9.53125C39.6781 9.53125 39.9439 9.75685 39.9435 10.1827C39.9444 10.2968 39.9256 10.438 39.8962 10.6228C39.8454 10.9443 39.7364 11.6346 39.7216 11.8023Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M47.5628 9.14577L47.4671 9.7385C47.2583 9.63357 47.1071 9.59111 46.9449 9.59111C46.5084 9.59111 46.2022 10.013 46.2022 10.6146C46.2022 11.0292 46.408 11.2796 46.7479 11.2796C46.8919 11.2796 47.0509 11.2351 47.2444 11.1395L47.1416 11.762C46.9264 11.8206 46.7871 11.842 46.6251 11.842C45.9956 11.842 45.6035 11.3895 45.6035 10.6628C45.6035 9.68634 46.1455 9.00391 46.9203 9.00391C47.1756 9.00391 47.4771 9.11207 47.5628 9.14577Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M48.5049 10.8128C48.444 10.8056 48.4169 10.8037 48.3748 10.8037C48.0436 10.8037 47.8759 10.9172 47.8759 11.1416C47.8759 11.2797 47.9577 11.3682 48.0853 11.3682C48.3233 11.3682 48.4952 11.1415 48.5049 10.8128ZM48.9305 11.8023H48.4461L48.4571 11.5722C48.3094 11.7539 48.1122 11.8408 47.8446 11.8408C47.5275 11.8408 47.3105 11.5932 47.3105 11.2339C47.3105 10.6928 47.6881 10.3778 48.3368 10.3778C48.4031 10.3778 48.4878 10.3838 48.5748 10.395C48.5929 10.3215 48.5977 10.2903 48.5977 10.2505C48.5977 10.1036 48.4962 10.0488 48.2229 10.0488C47.9371 10.0454 47.7013 10.1167 47.6041 10.1484C47.6103 10.1116 47.6852 9.64895 47.6852 9.64895C47.9766 9.5635 48.1685 9.53125 48.3848 9.53125C48.8868 9.53125 49.1529 9.75685 49.1522 10.1827C49.1534 10.2968 49.1344 10.438 49.105 10.6228C49.0544 10.9443 48.9454 11.6346 48.9305 11.8023Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M42.3197 11.7688C42.1598 11.8192 42.035 11.8411 41.8998 11.8411C41.601 11.8411 41.4377 11.6692 41.4377 11.3533C41.4337 11.2547 41.4809 10.9968 41.5181 10.761C41.5517 10.5533 41.7715 9.24512 41.7715 9.24512H42.3527L42.2847 9.58127H42.583L42.5036 10.115H42.2043C42.1368 10.5378 42.0405 11.0637 42.0393 11.1335C42.0393 11.2484 42.1007 11.2981 42.2397 11.2981C42.3063 11.2981 42.3578 11.2916 42.3974 11.2771L42.3197 11.7688Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M44.1007 11.751C43.901 11.8121 43.7081 11.841 43.5042 11.8408C42.8535 11.8404 42.5146 11.5004 42.5146 10.8499C42.5146 10.0904 42.9459 9.53125 43.5313 9.53125C44.0108 9.53125 44.3168 9.84425 44.3168 10.3355C44.3168 10.4983 44.2955 10.6572 44.2453 10.8816H43.0879C43.0487 11.2039 43.255 11.3384 43.593 11.3384C43.8009 11.3384 43.9885 11.2953 44.1974 11.1983L44.1007 11.751ZM43.774 10.4337C43.7771 10.3872 43.8356 10.0372 43.5035 10.0372C43.3185 10.0372 43.186 10.1785 43.1321 10.4337H43.774Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M40.0718 10.2832C40.0718 10.5645 40.2081 10.7578 40.5171 10.9036C40.7538 11.0149 40.7904 11.0478 40.7904 11.1488C40.7904 11.2872 40.686 11.3497 40.4546 11.3497C40.2803 11.3497 40.118 11.3226 39.9308 11.2623C39.9308 11.2623 39.8542 11.7518 39.8506 11.7749C39.9833 11.804 40.1019 11.8305 40.4588 11.8408C41.0758 11.8408 41.3607 11.606 41.3607 11.0984C41.3607 10.793 41.2414 10.614 40.9486 10.4795C40.7035 10.3668 40.6753 10.3418 40.6753 10.238C40.6753 10.1179 40.7725 10.0562 40.9615 10.0562C41.076 10.0562 41.2329 10.0689 41.3815 10.0899L41.4647 9.57474C41.3133 9.55082 41.0839 9.53125 40.9502 9.53125C40.2961 9.53125 40.0698 9.87285 40.0718 10.2832Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M52.0244 11.803H51.4715L51.4989 11.5963C51.3384 11.7676 51.1741 11.8416 50.9598 11.8416C50.535 11.8416 50.2539 11.4755 50.2539 10.9198C50.2539 10.1809 50.6897 9.55813 51.2052 9.55813C51.4319 9.55813 51.6035 9.65072 51.7634 9.86109L51.8931 9.07178H52.4697L52.0244 11.803ZM51.1619 11.2898C51.4343 11.2898 51.6255 10.9813 51.6255 10.5413C51.6255 10.259 51.5166 10.1057 51.3157 10.1057C51.0505 10.1057 50.8623 10.4153 50.8623 10.8521C50.8623 11.1428 50.9631 11.2898 51.1619 11.2898Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M49.4584 9.58244C49.3853 10.27 49.2553 10.9663 49.1536 11.6543L49.127 11.8037H49.7117C49.9209 10.4453 49.9712 10.1802 50.2993 10.2133C50.3515 9.93527 50.4487 9.6918 50.5212 9.56908C50.2763 9.51802 50.1396 9.65639 49.9604 9.91936C49.9746 9.80558 50.0004 9.6952 49.9956 9.58244H49.4584Z" fill="white"></path><path fillRule="evenodd" clipRule="evenodd" d="M44.6452 9.58244C44.5718 10.27 44.4416 10.9663 44.34 11.6543L44.3135 11.8037H44.8984C45.1076 10.4453 45.1578 10.1802 45.4854 10.2133C45.5379 9.93527 45.6354 9.6918 45.7076 9.56908C45.463 9.51802 45.326 9.65639 45.1471 9.91936C45.1613 9.80558 45.1872 9.6952 45.1821 9.58244H44.6452Z" fill="white"></path><rect x="64" width="24" height="20" rx="2" fill="#0069AA"></rect><path fillRule="evenodd" clipRule="evenodd" d="M78.5475 9.98961C78.5452 8.50612 77.6179 7.24093 76.3113 6.73987V13.2391C77.6179 12.7374 78.5452 11.4734 78.5475 9.98961ZM73.8187 13.2378V6.74052C72.5132 7.24313 71.5874 8.50651 71.5839 9.98961C71.5874 11.4723 72.5132 12.7356 73.8187 13.2378ZM75.0656 4.49626C72.0318 4.49743 69.5739 6.95583 69.5734 9.98961C69.5739 13.023 72.0318 15.481 75.0656 15.4815C78.0994 15.481 80.5578 13.023 80.5586 9.98961C80.5578 6.95583 78.0994 4.49743 75.0656 4.49626ZM75.0521 15.9999C71.7324 16.0157 69 13.3262 69 10.0523C69 6.4742 71.7324 3.99935 75.0521 4H76.6079C79.8884 3.99935 82.8824 6.47303 82.8824 10.0523C82.8824 13.3251 79.8884 15.9999 76.6079 15.9999H75.0521Z" fill="white"></path><rect x="96.25" y="0.25" width="23.5" height="19.5" rx="1.75" fill="white"></rect><path fillRule="evenodd" clipRule="evenodd" d="M100.396 10.0075C100.228 10.1513 100.014 10.2142 99.6712 10.2142H99.5292V8.49816H99.6712C100.014 8.49816 100.219 8.5568 100.396 8.70776C100.578 8.86375 100.687 9.10439 100.687 9.3533C100.687 9.60341 100.578 9.85262 100.396 10.0075ZM99.7773 8.05859H99V10.6539H99.7725C100.184 10.6539 100.48 10.5603 100.741 10.3537C101.05 10.1091 101.233 9.73965 101.233 9.35692C101.233 8.59076 100.635 8.05859 99.7773 8.05859Z" fill="#1A1918"></path><path fillRule="evenodd" clipRule="evenodd" d="M101.477 8.05859H102.004V10.6539H101.477V8.05859Z" fill="#1A1918"></path><path fillRule="evenodd" clipRule="evenodd" d="M103.298 9.05405C102.98 8.9424 102.887 8.86803 102.887 8.72776C102.887 8.56471 103.054 8.44106 103.282 8.44106C103.44 8.44106 103.571 8.50173 103.71 8.64996L103.985 8.30452C103.758 8.11305 103.486 8.01611 103.189 8.01611C102.709 8.01611 102.343 8.33566 102.343 8.75819C102.343 9.11693 102.513 9.29892 103.01 9.47175C103.217 9.54077 103.322 9.58794 103.376 9.61988C103.482 9.68528 103.534 9.779 103.534 9.88733C103.534 10.0984 103.359 10.2536 103.123 10.2536C102.871 10.2536 102.668 10.1331 102.546 9.90677L102.205 10.2228C102.449 10.5646 102.741 10.7174 103.144 10.7174C103.693 10.7174 104.08 10.3656 104.08 9.86455C104.08 9.45169 103.9 9.26456 103.298 9.05405Z" fill="#1A1918"></path><path fillRule="evenodd" clipRule="evenodd" d="M104.245 9.35698C104.245 10.1202 104.871 10.7116 105.677 10.7116C105.904 10.7116 106.099 10.6687 106.339 10.5604V9.96392C106.127 10.1678 105.941 10.2482 105.7 10.2482C105.168 10.2482 104.791 9.87948 104.791 9.35335C104.791 8.85625 105.18 8.46244 105.677 8.46244C105.928 8.46244 106.12 8.54749 106.339 8.75437V8.15861C106.107 8.04646 105.917 8 105.688 8C104.887 8 104.245 8.60301 104.245 9.35698Z" fill="#1A1918"></path><path fillRule="evenodd" clipRule="evenodd" d="M110.625 9.80102L109.902 8.05859H109.325L110.475 10.7194H110.759L111.931 8.05859H111.358L110.625 9.80102Z" fill="#1A1918"></path><path fillRule="evenodd" clipRule="evenodd" d="M112.17 10.6539H113.67V10.2142H112.699V9.51362H113.633V9.07396H112.699V8.49816H113.67V8.05859H112.17V10.6539Z" fill="#1A1918"></path><path fillRule="evenodd" clipRule="evenodd" d="M114.703 9.25202H114.55V8.46702H114.712C115.043 8.46702 115.22 8.59973 115.22 8.85257C115.22 9.11235 115.042 9.25202 114.703 9.25202ZM115.764 8.82435C115.764 8.33833 115.416 8.05859 114.805 8.05859H114.02V10.6539H114.55V9.61046H114.619L115.349 10.6539H116L115.147 9.56008C115.546 9.48208 115.764 9.22149 115.764 8.82435Z" fill="#1A1918"></path><path fillRule="evenodd" clipRule="evenodd" d="M109.399 9.36233C109.399 10.1095 108.766 10.7152 107.985 10.7152C107.204 10.7152 106.571 10.1095 106.571 9.36233C106.571 8.61501 107.204 8.00928 107.985 8.00928C108.766 8.00928 109.399 8.61501 109.399 9.36233Z" fill="#E7772F"></path><path d="M97 20H118.788C119.457 20 120 19.4564 120 18.785C120 18.785 120 13 120 12C117 14.5 112 18 97 20Z" fill="#E7772F"></path><rect x="96.25" y="0.25" width="23.5" height="19.5" rx="1.75" stroke="#E7772F" stroke-width="0.5"></rect><rect x="128.25" y="0.25" width="23.5" height="19.5" rx="1.75" fill="white"></rect><path d="M144.578 11.1581H145.869C145.906 11.1581 145.992 11.1458 146.029 11.1458C146.274 11.0966 146.483 10.8754 146.483 10.5681C146.483 10.273 146.274 10.0518 146.029 9.99032C145.992 9.97803 145.918 9.97803 145.869 9.97803H144.578V11.1581Z" fill="url(#paint0_linear_5729_184079)"></path><path d="M145.722 3.00732C144.493 3.00732 143.485 4.00299 143.485 5.2445V7.56772H146.644C146.718 7.56772 146.804 7.56772 146.865 7.58002C147.578 7.61689 148.107 7.98566 148.107 8.62485C148.107 9.12883 147.75 9.55906 147.087 9.6451V9.66969C147.812 9.71885 148.365 10.1245 148.365 10.7514C148.365 11.4275 147.75 11.87 146.939 11.87H143.473V16.4181H146.755C147.984 16.4181 148.992 15.4224 148.992 14.1809V3.00732H145.722Z" fill="url(#paint1_linear_5729_184079)"></path><path d="M146.324 8.77328C146.324 8.47827 146.115 8.28159 145.869 8.24471C145.844 8.24471 145.783 8.23242 145.746 8.23242H144.578V9.31413H145.746C145.783 9.31413 145.857 9.31413 145.869 9.30184C146.115 9.26497 146.324 9.06829 146.324 8.77328Z" fill="url(#paint2_linear_5729_184079)"></path><path d="M133.356 3.00732C132.127 3.00732 131.119 4.00299 131.119 5.2445V10.7637C131.746 11.071 132.397 11.2677 133.049 11.2677C133.823 11.2677 134.241 10.8006 134.241 10.1614V7.55543H136.159V10.1491C136.159 11.157 135.532 11.9806 133.405 11.9806C132.114 11.9806 131.106 11.6979 131.106 11.6979V16.4058H134.388C135.618 16.4058 136.626 15.4101 136.626 14.1686V3.00732H133.356Z" fill="url(#paint3_linear_5729_184079)"></path><path d="M139.538 3.00732C138.309 3.00732 137.301 4.00299 137.301 5.2445V8.17004C137.866 7.69065 138.85 7.38334 140.435 7.45709C141.283 7.49397 142.193 7.72752 142.193 7.72752V8.67402C141.738 8.44047 141.197 8.2315 140.497 8.18233C139.292 8.09629 138.567 8.68631 138.567 9.71886C138.567 10.7637 139.292 11.3537 140.497 11.2554C141.197 11.2062 141.738 10.985 142.193 10.7637V11.7102C142.193 11.7102 141.296 11.9437 140.435 11.9806C138.85 12.0544 137.866 11.7471 137.301 11.2677V16.4304H140.583C141.812 16.4304 142.82 15.4347 142.82 14.1932V3.00732H139.538Z" fill="url(#paint4_linear_5729_184079)"></path><rect x="128.25" y="0.25" width="23.5" height="19.5" rx="1.75" stroke="#C5C6C9" stroke-width="0.5"></rect><defs><linearGradient id="paint0_linear_5729_184079" x1="143.482" y1="10.5695" x2="149.006" y2="10.5695" gradientUnits="userSpaceOnUse"><stop stop-color="#007940"></stop><stop offset="0.229" stop-color="#00873F"></stop><stop offset="0.743" stop-color="#40A737"></stop><stop offset="1" stop-color="#5CB531"></stop></linearGradient><linearGradient id="paint1_linear_5729_184079" x1="143.483" y1="9.7073" x2="149.007" y2="9.7073" gradientUnits="userSpaceOnUse"><stop stop-color="#007940"></stop><stop offset="0.229" stop-color="#00873F"></stop><stop offset="0.743" stop-color="#40A737"></stop><stop offset="1" stop-color="#5CB531"></stop></linearGradient><linearGradient id="paint2_linear_5729_184079" x1="143.482" y1="8.77168" x2="149.006" y2="8.77168" gradientUnits="userSpaceOnUse"><stop stop-color="#007940"></stop><stop offset="0.229" stop-color="#00873F"></stop><stop offset="0.743" stop-color="#40A737"></stop><stop offset="1" stop-color="#5CB531"></stop></linearGradient><linearGradient id="paint3_linear_5729_184079" x1="131.116" y1="9.7073" x2="136.725" y2="9.7073" gradientUnits="userSpaceOnUse"><stop stop-color="#1F286F"></stop><stop offset="0.475" stop-color="#004E94"></stop><stop offset="0.826" stop-color="#0066B1"></stop><stop offset="1" stop-color="#006FBC"></stop></linearGradient><linearGradient id="paint4_linear_5729_184079" x1="137.269" y1="9.7073" x2="142.717" y2="9.7073" gradientUnits="userSpaceOnUse"><stop stop-color="#6C2C2F"></stop><stop offset="0.173" stop-color="#882730"></stop><stop offset="0.573" stop-color="#BE1833"></stop><stop offset="0.859" stop-color="#DC0436"></stop><stop offset="1" stop-color="#E60039"></stop></linearGradient><clipPath id="clip0_5729_184079"><rect width="22" height="7.28071" fill="white" transform="translate(1 6)"></rect></clipPath></defs></svg>
                            </div>
                        </div>
                    </div>

                    <form className="flex column justify-center payment-form">

                        <div className="flex column justigy-center card-details">
                            <div className="flex column justify-center card-number">
                                <label htmlFor="card" className="card"></label>
                                <p>Card Number</p>
                                <input
                                    className="card-number-input flex"
                                    type="text"
                                    name="card"
                                    value='4580 5926 2262 7546'
                                />

                            </div>

                            <div className="short-inputs grid">

                                <div className="flex column justify-center">
                                    <label htmlFor="date" className="date">
                                        <p>Expiration Date</p>
                                        <input
                                            className="short date"
                                            type="text"
                                            name="date"
                                            autoComplete="cc-exp"
                                            value="12 / 26"
                                        />
                                    </label>
                                </div>

                                <div className="flex column align-center justify-center">
                                    <label htmlFor="code" className="code">
                                        <p>Security Code</p>
                                        <input
                                            className="short"
                                            type="number"
                                            name="code"
                                            value='226'
                                        />
                                    </label>
                                </div>
                            </div>

                        </div>

                        <div className="buyer-details flex column justify-center">
                            <div className="flex column">
                                <label htmlFor="firstname"></label>
                                <p>First Name</p>
                                <input type="text"
                                    name="firstname"
                                    value=''
                                />
                            </div>

                            <div>
                                <label htmlFor="lastname">
                                    <p>Last Name</p>
                                    <input className='last-name-input' type="text"
                                        name="lastname"
                                        value=''
                                    />
                                    <b>As written on card</b>
                                </label>
                            </div>
                        </div>
                    </form>
                    <div className='paypal-container'>
                        <svg width="83" height="24" viewBox="0 0 83 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.3753 13.9213C31.5461 13.9203 32.678 13.5009 33.5668 12.7388C34.4556 11.9767 35.0428 10.922 35.2224 9.76505C35.6011 7.35337 33.7168 5.24807 31.0468 5.24807H26.7434C26.6627 5.24703 26.5844 5.27521 26.5228 5.32741C26.4612 5.37961 26.4206 5.45232 26.4084 5.53212L24.4905 17.7056C24.4836 17.75 24.4864 17.7955 24.4987 17.8388C24.5109 17.8821 24.5324 17.9222 24.5617 17.9564C24.5909 17.9907 24.6272 18.0181 24.668 18.037C24.7089 18.0559 24.7534 18.0657 24.7984 18.0658H27.0756C27.1561 18.0666 27.2342 18.0383 27.2956 17.9862C27.357 17.934 27.3974 17.8614 27.4096 17.7818L27.9738 14.2058C27.9859 14.126 28.0264 14.0532 28.0878 14.0009C28.1493 13.9487 28.2276 13.9204 28.3083 13.9213H30.3753ZM32.281 9.65531C32.1402 10.5468 31.4512 11.2037 30.1325 11.2037H28.4457L28.957 7.9603H30.6132C31.9776 7.96321 32.4209 8.76775 32.281 9.65774V9.65531ZM45.0886 9.08238H42.9265C42.8458 9.08144 42.7675 9.10965 42.7059 9.16184C42.6444 9.21402 42.6037 9.28666 42.5914 9.36642L42.5215 9.81506C42.5215 9.81506 40.843 7.98215 37.8725 9.22027C36.1682 9.92964 35.3506 11.3955 35.003 12.4685C35.003 12.4685 33.8974 15.7304 36.3964 17.5264C36.3964 17.5264 38.713 19.253 41.3222 17.4196L41.2771 17.7056C41.2701 17.75 41.2728 17.7955 41.285 17.8389C41.2973 17.8822 41.3188 17.9224 41.348 17.9566C41.3773 17.9908 41.4136 18.0183 41.4545 18.0372C41.4954 18.056 41.5399 18.0658 41.5849 18.0658H43.7461C43.8268 18.0669 43.9051 18.0387 43.9667 17.9865C44.0283 17.9343 44.0689 17.8616 44.0811 17.7818L45.3959 9.44265C45.4028 9.39818 45.4001 9.35273 45.3878 9.30943C45.3755 9.26613 45.354 9.22599 45.3248 9.19177C45.2956 9.15755 45.2593 9.13006 45.2184 9.11118C45.1776 9.0923 45.1336 9.08247 45.0886 9.08238ZM41.9097 13.6911C41.8252 14.2721 41.5327 14.8028 41.0866 15.1846C40.6405 15.5664 40.0711 15.7734 39.484 15.7673C39.2541 15.7699 39.0252 15.7363 38.8057 15.6677C37.8735 15.3687 37.3418 14.4723 37.4947 13.5013C37.5794 12.9186 37.8731 12.3867 38.321 12.0046C38.7689 11.6225 39.3405 11.4164 39.9292 11.4246C40.1594 11.4222 40.3886 11.4562 40.608 11.5246C41.5369 11.8228 42.0651 12.7191 41.9122 13.6911H41.9097Z" fill="#003087"></path><path d="M61.504 13.9215C62.6755 13.9212 63.8083 13.5021 64.6979 12.74C65.5875 11.9779 66.1755 10.9228 66.3556 9.76528C66.7338 7.35361 64.8499 5.24831 62.1789 5.24831H57.8771C57.7965 5.24749 57.7183 5.27576 57.6568 5.32793C57.5954 5.3801 57.5548 5.45268 57.5425 5.53235L55.6188 17.7092C55.6078 17.7763 55.6192 17.8451 55.6513 17.905C55.6833 17.965 55.7342 18.0127 55.796 18.0408C55.8369 18.0599 55.8815 18.0698 55.9267 18.0699H58.2043C58.285 18.0707 58.3633 18.0424 58.4247 17.9901C58.4862 17.9379 58.5267 17.8652 58.5389 17.7854L59.1035 14.2094C59.1155 14.1296 59.156 14.0568 59.2175 14.0045C59.279 13.9521 59.3573 13.9239 59.4381 13.9249L61.504 13.9215ZM63.4098 9.65555C63.269 10.547 62.58 11.2039 61.2608 11.2039H59.5745L60.0863 7.96053H61.7424C63.1058 7.96344 63.5501 8.76798 63.4098 9.65798V9.65555ZM76.2169 9.08261H74.0572C73.9766 9.08179 73.8984 9.11006 73.8369 9.16223C73.7755 9.2144 73.7349 9.28698 73.7226 9.36665L73.6517 9.81529C73.6517 9.81529 71.9737 7.98238 69.0032 9.2205C67.2994 9.92988 66.4813 11.3957 66.1332 12.4688C66.1332 12.4688 65.0281 15.7306 67.5267 17.5266C67.5267 17.5266 69.8437 19.2532 72.453 17.4198L72.4078 17.7058C72.3968 17.7729 72.4082 17.8417 72.4402 17.9016C72.4723 17.9616 72.5231 18.0093 72.585 18.0374C72.6258 18.0568 72.6705 18.0665 72.7156 18.0665H74.8768C74.9576 18.0678 75.036 18.0396 75.0976 17.9872C75.1591 17.9349 75.1995 17.862 75.2113 17.782L76.5266 9.44288C76.5331 9.39826 76.5301 9.35278 76.5177 9.30942C76.5053 9.26607 76.4838 9.22584 76.4548 9.19137C76.4256 9.15683 76.3891 9.12917 76.348 9.11037C76.3069 9.09157 76.2621 9.08209 76.2169 9.08261ZM73.0385 13.6913C72.9549 14.2728 72.6627 14.804 72.2164 15.186C71.7701 15.568 71.2002 15.7747 70.6128 15.7675C70.3825 15.7702 70.1533 15.7366 69.9335 15.668C69.0008 15.3689 68.4686 14.4726 68.6216 13.5015C68.706 12.9204 68.9985 12.3896 69.4445 12.0077C69.8906 11.6259 70.4601 11.4187 71.0473 11.4249C71.2779 11.4224 71.5071 11.4559 71.7266 11.5249C72.6651 11.823 73.1949 12.7193 73.0409 13.6913H73.0385Z" fill="#009CDE"></path><path d="M53.0232 9.28892L50.4173 13.6874L49.0952 9.32145C49.0745 9.25217 49.0319 9.19146 48.9737 9.1484C48.9156 9.10535 48.8452 9.08225 48.7728 9.08257H46.4218C46.3813 9.08179 46.3412 9.09086 46.305 9.10899C46.2687 9.12713 46.2374 9.15378 46.2137 9.18668C46.19 9.21958 46.1747 9.25773 46.169 9.29787C46.1633 9.338 46.1674 9.37892 46.181 9.4171L48.5504 16.7711L46.4078 20.2369C46.3836 20.275 46.3701 20.319 46.3688 20.3641C46.3675 20.4093 46.3784 20.454 46.4004 20.4935C46.4224 20.5329 46.4546 20.5658 46.4937 20.5884C46.5327 20.6111 46.5772 20.6229 46.6224 20.6224H49.1554C49.2279 20.6227 49.2992 20.6042 49.3623 20.5686C49.4253 20.533 49.4781 20.4816 49.5152 20.4194L56.1341 9.46954C56.1579 9.43133 56.171 9.38739 56.172 9.34236C56.173 9.29733 56.1618 9.25288 56.1396 9.21367C56.1174 9.17446 56.0851 9.14195 56.046 9.11956C56.007 9.09718 55.9626 9.08574 55.9175 9.08645H53.3854C53.3126 9.0856 53.2409 9.10385 53.1773 9.13938C53.1138 9.1749 53.0607 9.22646 53.0232 9.28892Z" fill="#003087"></path><path d="M78.6487 5.52893L76.725 17.7058C76.714 17.7728 76.7254 17.8417 76.7575 17.9016C76.7895 17.9615 76.8404 18.0093 76.9022 18.0374C76.943 18.0568 76.9877 18.0665 77.0329 18.0665H79.3096C79.3903 18.0675 79.4686 18.0393 79.5301 17.987C79.5916 17.9347 79.6321 17.8618 79.6441 17.782L81.5683 5.60516C81.5755 5.56068 81.5728 5.51517 81.5606 5.47181C81.5483 5.42845 81.5268 5.38829 81.4974 5.35414C81.4681 5.31996 81.4317 5.29252 81.3908 5.27366C81.3499 5.25481 81.3055 5.245 81.2604 5.24489H78.9833C78.9027 5.24407 78.8245 5.27234 78.763 5.32451C78.7016 5.37668 78.661 5.44926 78.6487 5.52893Z" fill="#009CDE"></path><path d="M18.0358 10.8081C17.5473 13.5927 15.2755 15.6975 12.2943 15.6975H10.4017C10.0157 15.6975 9.62675 16.0548 9.56509 16.4501L8.73627 21.7109C8.6882 22.0105 8.54788 22.11 8.24442 22.11H5.20009C4.89226 22.11 4.81943 22.0071 4.86555 21.7036L5.21514 18.0654L1.56097 17.8766C1.25363 17.8766 1.14244 17.7091 1.18614 17.4022L3.67938 1.59304C3.72745 1.29346 3.9139 1.16479 4.21639 1.16479H10.5396C13.5834 1.16479 15.5091 3.21377 15.7445 5.87064C17.5556 7.0942 18.4024 8.72221 18.0363 10.8076L18.0358 10.8081Z" fill="#012169"></path><path d="M6.1415 12.1749L5.21558 18.0659L4.63002 21.7618C4.61914 21.8331 4.62373 21.9058 4.64349 21.9752C4.66324 22.0445 4.69769 22.1087 4.7445 22.1636C4.7913 22.2184 4.84936 22.2625 4.91473 22.2929C4.9801 22.3232 5.05124 22.3392 5.12332 22.3396H8.33856C8.48532 22.3395 8.62721 22.2869 8.73872 22.1915C8.85023 22.0961 8.92406 21.9641 8.94694 21.8191L9.79324 16.4491C9.81622 16.3042 9.8901 16.1723 10.0016 16.0769C10.1131 15.9816 10.2549 15.9292 10.4016 15.929H12.2943C13.7364 15.9272 15.1305 15.4101 16.2251 14.4712C17.3198 13.5323 18.043 12.2331 18.2644 10.8081C18.5922 8.71685 17.54 6.81305 15.7392 5.87256C15.7351 6.09537 15.7156 6.31762 15.6809 6.53775C15.4587 7.96208 14.7352 9.26027 13.6407 10.1985C12.5462 11.1367 11.1528 11.6534 9.71118 11.6553H6.74939C6.60281 11.6554 6.46105 11.7077 6.34962 11.803C6.23819 11.8982 6.16439 12.0301 6.1415 12.1749Z" fill="#009CDE"></path><path d="M5.21528 18.0661H1.47129C1.39905 18.0657 1.32775 18.0498 1.26222 18.0194C1.1967 17.989 1.1385 17.9448 1.09159 17.8899C1.04467 17.835 1.01016 17.7706 0.990385 17.7011C0.970612 17.6316 0.96605 17.5587 0.977008 17.4873L3.49987 1.49169C3.52255 1.34673 3.59626 1.21463 3.70771 1.1192C3.81917 1.02377 3.96104 0.971279 4.10776 0.971191H10.5363C13.5801 0.971191 15.7932 3.18622 15.7413 5.8698C14.9311 5.45184 14.0314 5.23737 13.1199 5.24491H7.76048C7.61371 5.24494 7.47176 5.29733 7.36016 5.39265C7.24855 5.48796 7.17461 5.61996 7.15161 5.76492L6.14169 12.175L5.21528 18.0661Z" fill="#003087"></path></svg>
                    </div>
                </section>

                <section className='package-container'>
                    <section className="order-details">
                        <section className="gig-details-payment">

                            <div className="flex space-between">
                                <div className="img-container">
                                    <img src={gig.imgs ? gig.imgs[0] : ''} alt="gig-img" />
                                </div>
                                <p>{gig.title}</p>
                            </div>
                            <div className="pricing">
                                <strong className="price">US${gig.price}</strong>
                                <ul className="package-list clean-list">
                                    <li className="flex align-center"><span className="flex align-center"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z"></path></svg></span><span className="list-txt">1 concept included</span></li>
                                    <li className="flex align-center"><span className="flex align-center"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z"></path></svg></span><span className="list-txt">Printable file</span></li>
                                    <li className="flex align-center"><span className="flex align-center"><svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M13.6202 2.6083L5.4001 10.8284L2.37973 7.80805C2.23329 7.66161 1.99585 7.66161 1.84939 7.80805L0.96551 8.69193C0.819073 8.83836 0.819073 9.0758 0.96551 9.22227L5.13492 13.3917C5.28135 13.5381 5.51879 13.5381 5.66526 13.3917L15.0344 4.02252C15.1809 3.87608 15.1809 3.63865 15.0344 3.49218L14.1505 2.6083C14.0041 2.46186 13.7667 2.46186 13.6202 2.6083Z"></path></svg></span><span className="list-txt">Include 3D mockup</span></li>
                                </ul>
                            </div>
                        </section>
                        <div className='package-inner-container'>
                            <div className="taxes">
                                <p className="flex space-between"><span>Service Fee</span><span>US$15.00</span></p>
                                <p className="flex space-between"><span>VAT</span><span>US$9.00</span></p>
                            </div>
                            <div className="total-payment">
                                <p className="flex space-between"><span className="bold">Total</span><span className="bold">${gig.price + 15.00 + 9.00}</span></p>
                                <p className="flex space-between"><span className="bold">Total delivery time</span><span>{gig.daysToMake} days</span></p>
                            </div>

                        </div>
                        <button
                            onClick={onPurchase}
                            type="submit">
                            Confirm & Pay
                        </button>
                    </section>
                </section>
            </section>

        </section>
    )
}