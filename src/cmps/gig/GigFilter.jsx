import { useEffect, useState } from "react"

export function GigFilter({ onSetFilter, filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        console.log('filterByToEdit:', filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    
    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilterBy) => {
            console.log('prevFilterBy:', prevFilterBy)
            return { ...prevFilterBy, [field]: value }
        })
    }


    return (
        <section className="filter-sort">
            <section className="flex space-between align-center gig-filter-container">
                <div className="flex inner-filer-container">
                    <div className="gig-filter">Service options ∨</div>
                    <div className="gig-filter">Seller details ∨</div>
                    <div className="gig-filter">Budget ∨</div>
                    <div className="gig-filter">Delivery time ∨</div>
                    <form action="">
                        <input
                            type="number"
                            name="minPrice"
                            placeholder="minPrice"
                            value={filterByToEdit.minPrice}
                            onChange={handleChange} />
                    </form>
                </div>
                <section className="gig-sort-container flex">
                    <div className="gig-sort">Sort by: <span className="bold">Best selling ∨</span></div>
                </section>
            </section>


        </section>
    )
}