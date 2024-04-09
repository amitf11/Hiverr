import { useEffect, useRef, useState } from "react"
import { login, signup } from "../store/actions/user.actions"

export function LoginSignup({ isModalOpen, onCloseModal }) {
    const modalRef = useRef(null)
    const [isOnSignup, setIsOnSignup] = useState()
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        fullName: "",
    })

    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onCloseModal()
            }
        }

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isModalOpen, onCloseModal])

    function handleChange({ target }) {
        const { value, name: field } = target
        setCredentials({ ...credentials, [field]: value })
    }

    function onSignUp(ev) {
        ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullName) return
        signup(credentials)
        onCloseModal()
    }

    function onLogin(ev) {
        ev.preventDefault()
        if (!credentials.username || !credentials.password) return
        login(credentials)
        onCloseModal()

    }

    if (!isModalOpen) return <div></div>
    return (
        <div className="flex align-center">
            <div ref={modalRef} className="login-signup-container flex column">
                <section className="modal-content-body flex justify-center">
                    <div className="identification-form flex column">
                        <section className="identification-step flex">
                            <div className=" inner-container flex column">
                                <div className="logo-container">
                                    <section className="inner-logo-container flex align-center space-between">
                                        <div className="flex justify-center">
                                            <svg width="89" height="27" viewBox="0 0 89 27" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#404145"><path d="m81.6 13.1h-3.1c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-13.4h-2.5c-2 0-3.1 1.5-3.1 4.1v9.3h-6v-18.4h6v2.8c1-2.2 2.3-2.8 4.3-2.8h7.3v2.8c1-2.2 2.3-2.8 4.3-2.8h2zm-25.2 5.6h-12.4c.3 2.1 1.6 3.2 3.7 3.2 1.6 0 2.7-.7 3.1-1.8l5.3 1.5c-1.3 3.2-4.5 5.1-8.4 5.1-6.5 0-9.5-5.1-9.5-9.5 0-4.3 2.6-9.4 9.1-9.4 6.9 0 9.2 5.2 9.2 9.1 0 .9 0 1.4-.1 1.8zm-5.7-3.5c-.1-1.6-1.3-3-3.3-3-1.9 0-3 .8-3.4 3zm-22.9 11.3h5.2l6.6-18.3h-6l-3.2 10.7-3.2-10.8h-6zm-24.4 0h5.9v-13.4h5.7v13.4h5.9v-18.4h-11.6v-1.1c0-1.2.9-2 2.2-2h3.5v-5h-4.4c-4.3 0-7.2 2.7-7.2 6.6v1.5h-3.4v5h3.4z"></path></g><g fill="#1dbf73"><path d="m85.3 27c2 0 3.7-1.7 3.7-3.7s-1.7-3.7-3.7-3.7-3.7 1.7-3.7 3.7 1.7 3.7 3.7 3.7z"></path></g></svg>
                                        </div>
                                        <button onClick={onCloseModal} className="close-btn" data-testid="close-navigation-button"><svg width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill="#74767E"><path d="m8.485 7 4.487-4.487.926-.925a.35.35 0 0 0 0-.495l-.99-.99a.35.35 0 0 0-.495 0L7 5.515 1.588.102a.35.35 0 0 0-.495 0l-.99.99a.35.35 0 0 0 0 .495L5.514 7 .102 12.413a.35.35 0 0 0 0 .495l.99.99a.35.35 0 0 0 .495 0L7 8.485l4.487 4.487.926.926a.35.35 0 0 0 .495 0l.99-.99a.35.35 0 0 0 0-.495L8.485 7Z"></path></svg></button>
                                    </section>
                                </div>
                                <div>
                                    <section className="flex column">
                                        <section className="form-section">
                                            <h1>Success <span>starts</span> here.</h1>
                                            <form
                                                className="login-signup-form flex column align-center"
                                                onSubmit={onSignUp}
                                            // onSubmit={isSignup ? handleSubmit : handleLogin
                                            >
                                                <div className="flex align-center justify-center">
                                                    <label htmlFor="username"></label>
                                                    <input
                                                        name="username"
                                                        type="text"
                                                        required
                                                        placeholder="Enter user name"
                                                        value={credentials.username}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {/* {isSignup && ( */}
                                                <div className="flex align-center justify-center">
                                                    <label htmlFor="fullName"></label>
                                                    <input
                                                        name="fullName"
                                                        type="text"
                                                        required
                                                        placeholder="Enter full Name"
                                                        value={credentials.fullName}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                {/* )} */}
                                                <div className="flex align-center justify-center">
                                                    <label htmlFor="password"></label>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        required
                                                        placeholder="Enter password"
                                                        value={credentials.password}
                                                        onChange={handleChange}
                                                    />
                                                </div>


                                                <div className="flex align-center justify-center">
                                                    <button>Continue</button>
                                                </div>
                                            </form>
                                        </section>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </div>

                </section>

            </div>
        </div>
    )
}