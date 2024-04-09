import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { setFilterBy } from "../../store/actions/gig.actions"

export function GigFilter({ onSetFilter, filterBy }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])


    function handleChange({ target }) {
        const currentParams = Object.fromEntries(searchParams)
        
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setSearchParams({ ...currentParams, [field]: value })
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))


        // switch (field) {
        //     case 'minPrice':
        //         setSearchParams({ ...currentParams, minPrice: value })
        //         break;
        // case 'maxPrice':
        //     setSearchParams({...currentParams, maxPrice: value})

        // }

        //***********TEST***********
        // setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))


    }


    return (
        <section className="filter-sort">
            <section className="flex space-between align-center gig-filter-container">
                <div className="flex inner-filer-container">
                    <div className="gig-filter">Service options ∨</div>
                    <div className="gig-filter">Seller details ∨</div>
                    <div className="gig-filter">Budget ∨</div>
                    <div className="gig-filter">Delivery time ∨</div>
                    <form action="" className="flex">
                        <input
                            className="gig-filter"
                            type="number"
                            name="minPrice"
                            placeholder="Min Price"
                            value={filterByToEdit.minPrice}
                            onChange={handleChange} />
                        <input
                            className="gig-filter"
                            type="number"
                            name="maxPrice"
                            placeholder="Max Price"
                            value={filterByToEdit.maxPrice}
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