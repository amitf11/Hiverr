import { useState } from "react"
import { gigService } from "../../services/gig.service"
import { utilService } from "../../services/util.service"

import { Add } from "@mui/icons-material"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

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
            <Button
            variant="outlined"
            color="success"
            startIcon={<Add />}>Add Gig</Button>
            <form className="flex column" onSubmit={handleSubmit}>

                <TextField id="outlined-basic"
                    label="Title" 
                    variant="outlined"
                    required
                    type="text"
                    name="title"
                    value={gigToAdd.title}
                    onChange={handleChange} />


                <TextField
                    label="Description" 
                    variant="outlined"
                    required
                    type="text"
                    name="description"
                    multiline
                    maxRows={4}
                    value={gigToAdd.description}
                    onChange={handleChange} />

                {/* <label htmlFor="tags">Tags</label>
                <input
                    required
                    type="text"
                    name="tags"
                    value={gigToAdd.tags}
                    onChange={handleChange} /> */}

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