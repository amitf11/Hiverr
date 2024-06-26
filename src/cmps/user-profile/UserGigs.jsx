import { useState } from "react"
import { gigService } from "../../services/gig.service"
import { utilService } from "../../services/util.service"

import { Add } from "@mui/icons-material"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteIcon from '@mui/icons-material/Favorite';

export function UserGigs({ gigs, onAddGig, onRemoveGig, handleSection }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [validationErrors, setValidationErrors] = useState({})
    const [gigToAdd, setGigToAdd] = useState(gigService.getEmptyGig())

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setGigToAdd(prevGig => ({ ...prevGig, [field]: value }))
        setValidationErrors((prevErrors) => ({ ...prevErrors, [field]: "" }))
    }
    function handleSubmit(ev) {
        ev.preventDefault()
        const errors = {}
        if (!gigToAdd.title) {
            errors.title = "Title is required"
        }
        if (!gigToAdd.description) {
            errors.description = "Description is required"
        }
        if (!gigToAdd.daysToMake) {
            errors.daysToMake = "Days to make is required"
        }
        if (!gigToAdd.price) {
            errors.price = "Price is required"
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors)
            return
        }

        onAddGig(gigToAdd)
        setIsFormOpen(false)
        handleSection('gigs')
        setGigToAdd(gigService.getEmptyGig())
    }

    return (
        <section className="user-gigs">
            <h2>Manage Your Gigs</h2>
            <Button
                className="add-gig-button"
                variant="outlined"
                color="success"
                startIcon={<Add />}
                onClick={() => setIsFormOpen(!isFormOpen)}>Add Gig</Button>

            {isFormOpen &&
                <>
                    <form className="flex column add-gig-form" onSubmit={handleSubmit}>
                        <CloseIcon onClick={() => setIsFormOpen(false)} className="close-modal-icon" />
                        <TextField id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            required
                            type="text"
                            name="title"
                            value={gigToAdd.title}
                            onChange={handleChange}
                            error={!!validationErrors.title}
                            helperText={validationErrors.title} />


                        <TextField
                            label="Description"
                            variant="outlined"
                            required
                            type="text"
                            name="description"
                            multiline
                            maxRows={4}
                            value={gigToAdd.description}
                            onChange={handleChange}
                            error={!!validationErrors.description}
                            helperText={validationErrors.description} />

                        <div className="flex number-inputs">
                            <TextField
                                required
                                className="number-input"
                                type="number"
                                label="Days to make"
                                variant="standard"
                                id="filled-number"
                                name="daysToMake"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={gigToAdd.daysToMake}
                                onChange={handleChange}
                                error={!!validationErrors.daysToMake}
                                helperText={validationErrors.daysToMake} />

                            <TextField
                                required
                                className="number-input"
                                type="number"
                                label="Price"
                                variant="standard"
                                id="filled-number"
                                name="price"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={gigToAdd.price}
                                onChange={handleChange}
                                error={!!validationErrors.price}
                                helperText={validationErrors.price} />
                            <Button
                                onClick={handleSubmit}
                                variant="contained"
                                style={{ backgroundColor: '#66bb6a' }}><span className="bold">Save</span></Button>
                        </div>
                    </form>
                </>
            }

            {(!gigs || !gigs.length) ?
                !isFormOpen && <div className="become-a-seller flex column align-center justify-center">
                    <FavoriteIcon
                        fontSize='large'
                        style={{ color: '#e64f4f' }} />
                    <h3>What's Your Skill?</h3>
                    <button
                        onClick={() => setIsFormOpen(!isFormOpen)}>
                        Become a Seller</button></div>
                :
                <section className="user-gigs-table-container flex justify-center">
                    <table className="user-gigs-table">
                        <thead>
                            <tr className="table-row">
                                <th>Title</th>
                                <th>Days to make</th>
                                <th>Price</th>
                                <th className="action-col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gigs.map((gig, idx) => (
                                <tr className="table-row" key={idx}>
                                    <td className="title">{gig.title}</td>
                                    <td>{gig.daysToMake}</td>
                                    <td><strong>${gig.price}</strong></td>
                                    <td className="action-col">
                                        <Button
                                            size="small"
                                            color="error"
                                            onClick={() => onRemoveGig(gig._id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                </section>

            }
        </section >
    )
}