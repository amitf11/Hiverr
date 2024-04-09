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
                    <div className="flex align-center gig-filter">Service options <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
                    <div className="flex align-center gig-filter">Seller details <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
                    <div className="flex align-center gig-filter">Budget <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
                    <div className="flex align-center gig-filter">Delivery time <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
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
                    <div className="flex align-center gig-sort">
                        Sort by:
                        <span className="flex align-center bold sort-by-txt">
                                Best selling
                            <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill">
                                <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></span></div>
                </section>
            </section>


        </section>
    )
}