import { useState } from "react"
import { utilService } from "../../services/util.service"
import { gigService } from "../../services/gig.service"

export function UserGigs({ gigs, onAddGig }) {
    const [gigToAdd, setGigToAdd] = useState(gigService.getEmptyGig())
    console.log('gigs:', gigs)
    function handleChange({ target }) {
        const { value, name: field } = target
        setGigToAdd(prevGig => ({ ...prevGig, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onAddGig(gigToAdd)
    }

    return (
        <section className="user-gigs">
            <h2>Manage Your Gigs</h2>
            <button>Add Gig</button>
            <form className="flex column" onSubmit={handleSubmit}>

                <label htmlFor="title">Title</label>
                <input
                    required
                    type="text"
                    name="title"
                    value={gigToAdd.title}
                    onChange={handleChange} />

                <label htmlFor="about">About</label>
                <input
                    required
                    type="text"
                    name="about"
                    value={gigToAdd.about}
                    onChange={handleChange} />

                <label htmlFor="about">Description</label>
                <input
                    required
                    type="text"
                    name="description"
                    value={gigToAdd.description}
                    onChange={handleChange} />

                <label htmlFor="tags">Tags</label>
                <input
                    required
                    type="text"
                    name="tags"
                    value={gigToAdd.tags}
                    onChange={handleChange} />

                <label htmlFor="daystomake">Days to make</label>
                <input
                    required
                    type="number"
                    name="daysToMake"
                    value={gigToAdd.daysToMake}
                    onChange={handleChange} />

                <label htmlFor="price">Price</label>
                <input
                    required
                    type="number"
                    name="price"
                    value={gigToAdd.price}
                    onChange={handleChange} />

                <button>Save</button>
            </form>
            <section>
                {/* ACCORDION */}
                {gigs.map(gig => (
                    <article className="" key={gig._id}>
                        {/* <img src={gig.imgs[0]} alt="" /> */}
                        <div>{gig.title}</div>
                        <div>By: {gig.owner.fullName}</div>
                        <div className="flex space-between">
                            <div>${gig.price}</div>
                        </div>
                    </article>
                ))}
            </section>
            {(!gigs || !gigs.length) ? <div> You dont offer any services...</div> : null}
        </section>
    )
}