import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { setFilterBy } from "../../store/actions/gig.actions"

export function GigFilter({ filterBy, sortBy, onSetFilter, onSetSort }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)
    const [isBudgetMenuOpen, setIsBudgetMenuOpen] = useState(false)
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
    const [isDeliveryMenuOpen, setIsDeliveryMenuOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null);
    const [selectedDeliveryValue, setSelectedDeliveryValue] = useState(null)
    const sortMenuRef = useRef(null)
    const budgetMenuRef = useRef(null)
    const deliveryMenuRef = useRef(null)
    const customPriceRef = useRef(null)
    let customValue

    useEffect(() => {
        onSetFilter(filterByToEdit)
        onSetSort(sortByToEdit)
    }, [filterByToEdit, sortByToEdit])

    useEffect(() => {
        function handleClickOutside(event) {
            if (isSortMenuOpen && sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
                setIsSortMenuOpen(false)
            }
            if (isBudgetMenuOpen && budgetMenuRef.current && !budgetMenuRef.current.contains(event.target)) {
                setIsBudgetMenuOpen(false)
            }
            if (isDeliveryMenuOpen && deliveryMenuRef.current && !deliveryMenuRef.current.contains(event.target)) {
                setIsDeliveryMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isSortMenuOpen, isBudgetMenuOpen, isDeliveryMenuOpen])

    function handleSortChange(value, ev) {
        ev.stopPropagation()
        setSortByToEdit(value)
        // setIsSortMenuOpen(true)
    }
    // function handleChange({ target }) {
    //     const { value } = target;
    //     setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, budget: value }));
    // }

    // function handleCustomBudget({ target }) {
    //     const customPrice = target.value ? +target.value : '';
    //     setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, maxPrice: customPrice }));
    // }

    // function applyFilter() {
    //     const currentParams = Object.fromEntries(searchParams);
    //     const { minPrice, maxPrice } = filterByToEdit;
    //     setSearchParams({ ...currentParams, minPrice, maxPrice });
    // }

    function handleChange(ev, range, field) {
        ev.stopPropagation()
        const currentParams = Object.fromEntries(searchParams)
        if (field === 'budget') {
            let minPrice, maxPrice

            switch (range) {
                case 'low-range':
                    minPrice = 0
                    maxPrice = 155
                    break;
                case 'mid-range':
                    minPrice = 155
                    maxPrice = 233
                    break;
                case 'high-range':
                    minPrice = 233
                    maxPrice = ''
                    break;
                case 'custom':
                    minPrice = ''
                    maxPrice = customValue
            }

            setSearchParams({ ...currentParams, minPrice, maxPrice })
            setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, minPrice, maxPrice }))
        }

        else if (field === 'deliveryTime') {

            setSearchParams({ ...currentParams, deliveryTime: range })
            setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, deliveryTime: range }))

        }
    }

    function handleClick(ev, range, field) {
        setSelectedValue(range)
        if (field === 'deliveryTime') setSelectedDeliveryValue(range)
        handleChange(ev, range, field)
    }

    function handleInputClick(ev) {
        ev.stopPropagation()
    }

    function handleCustomValueChange(ev) {
        let { value } = ev.target
        customValue = value
        handleChange(ev, 'custom', 'budget')
    }

    function toggleSortMenu() {
        setIsSortMenuOpen(prevIsOpen => !prevIsOpen)
    }

    function toggleBudgetMenu() {
        setIsBudgetMenuOpen(prevIsOpen => !prevIsOpen)
    }

    function toggleDeliveryMenu() {
        setIsDeliveryMenuOpen(prevIsOpen => !prevIsOpen)
    }

    return (
        <div className="sticky-wrapper">
            <section className="filter-sort">
                <section className="flex space-between align-center gig-filter-container">
                    <div className="flex inner-filter-container">
                        {/* <div className="flex align-center gig-filter">Service options <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
                        <div className="flex align-center gig-filter">Seller details <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div> */}

                        <div onClick={toggleBudgetMenu} className="floating-menu" ref={budgetMenuRef}>

                            <div className="flex align-center gig-filter">
                                <div className="flex align-center">
                                    Budget
                                    <span className={`flex arrow-down ${isBudgetMenuOpen ? 'menu-open' : ''}`}><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
                            </div>

                            <div className={`menu-content ${isBudgetMenuOpen ? 'menu-open' : ''}`}>
                                <div className="content-scroll">
                                    <div className="budget-filter">
                                        <div className="flex column price-buckets-wrapper">
                                            <div className="flex align-center space-between radio-item-wrapper"
                                                onClick={(event) => handleClick(event, 'low-range', 'budget')}>
                                                <label htmlFor="budget">
                                                    <input type="radio"
                                                        name="budget"
                                                        checked={selectedValue === 'low-range'}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div className="inner-radio">Value <span>Under $155</span></div>
                                                </label>
                                            </div>
                                            <div className="flex align-center space-between radio-item-wrapper"
                                                value="155"
                                                onClick={(event) => handleClick(event, 'mid-range', 'budget')}>
                                                <label htmlFor="budget">
                                                    <input type="radio"
                                                        name="budget"
                                                        checked={selectedValue === 'mid-range'}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div className="inner-radio">Mid-range <span>$155-$233</span></div>
                                                </label>
                                            </div>
                                            <div
                                                className="flex align-center space-between radio-item-wrapper"
                                                value="233"
                                                onClick={(event) => handleClick(event, 'high-range', 'budget')}>
                                                <label htmlFor="budget">
                                                    <input type="radio"
                                                        name="budget"
                                                        checked={selectedValue === 'high-range'}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div className="inner-radio">High-end <span>$233-$ Above</span></div>
                                                </label>
                                            </div>
                                        </div>



                                        <div className=" flex column space-between custom-price">
                                            <div className="flex space-between align-center radio-item-wrapper"
                                                onClick={(event) => handleClick(event, 'custom', 'budget')}
                                            >
                                                <label className="flex align-center justify-center" htmlFor="budget">
                                                    <input type="radio"
                                                        name="budget"
                                                        checked={selectedValue === 'custom'}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div>Custom</div>
                                                </label>
                                            </div>
                                            <div className=" price-range-filter" id="custom-price-input">
                                                <div className="flex column input-wrapper">
                                                    <input
                                                        ref={customPriceRef}
                                                        type="number"
                                                        placeholder="Enter budget"
                                                        value={customValue}
                                                        onClick={handleInputClick}
                                                        onChange={handleCustomValueChange}
                                                    />
                                                    <i>$</i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex align-center space-between filter-actions">
                                    <button className="clear-btn">Clear All</button>
                                    <button className="apply-btn">Apply</button>
                                </div>
                            </div>

                        </div>

                        <div onClick={toggleDeliveryMenu} className="floating-menu" ref={deliveryMenuRef}>
                            <div className="flex align-center gig-filter">
                                <div className="flex align-center">
                                    Delivery time
                                    <span className={`flex arrow-down ${isDeliveryMenuOpen ? 'menu-open' : ''}`}><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>

                            </div>

                            <div className={`menu-content ${isDeliveryMenuOpen ? 'menu-open' : ''}`}>
                                <div className="content-scroll">
                                    <div className="delivery-filter">
                                        <div className="flex column delivery-buckets-wrapper">


                                            <div className="flex align-center space-between radio-item-wrapper"
                                                onClick={(event) => handleClick(event, 1, 'deliveryTime')}>
                                                <label htmlFor="deliveryTime">
                                                    <input type="radio"
                                                        name="deliveryTime"
                                                        checked={selectedDeliveryValue === 1}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div className="inner-radio">Express 24H</div>
                                                </label>
                                            </div>
                                            <div className="flex align-center space-between radio-item-wrapper"
                                                onClick={(event) => handleClick(event, 3, 'deliveryTime')}>
                                                <label htmlFor="deliveryTime">
                                                    <input type="radio"
                                                        name="deliveryTime"
                                                        checked={selectedDeliveryValue === 3}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div className="inner-radio">Up to 3 days</div>
                                                </label>
                                            </div>
                                            <div className="flex align-center space-between radio-item-wrapper"
                                                onClick={(event) => handleClick(event, 7, 'deliveryTime')}>
                                                <label htmlFor="deliveryTime">
                                                    <input type="radio"
                                                        name="deliveryTime"
                                                        checked={selectedDeliveryValue === 7}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div className="inner-radio">Up to 7 days</div>
                                                </label>
                                            </div>
                                            <div className="flex align-center space-between radio-item-wrapper"
                                                onClick={(event) => handleClick(event, Infinity, 'deliveryTime')}>
                                                <label htmlFor="deliveryTime">
                                                    <input type="radio"
                                                        name="deliveryTime"
                                                        checked={selectedDeliveryValue === Infinity}
                                                    />
                                                    <span className="radio circle"></span>
                                                    <div className="inner-radio">Anytime</div>
                                                </label>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>



                        {/* <div className="flex align-center gig-filter">Delivery time <span className="flex arrow-down"><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div> */}
                        {/* <form action="" className="flex">
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
                        </form> */}
                    </div>

                </section>

                <section className="gig-sort-container flex">
                    <div className="flex align-center gig-sort">
                        <span>
                            Sort by:
                        </span>
                        <div onClick={toggleSortMenu} className="flex align-center bold floating-menu" ref={sortMenuRef}>
                            <div className="sort-menu-title flex align-center">
                                {sortBy === 'recommended' ? 'Recommended' : 'Newest arrivals'}
                                <span className={`flex arrow-down ${isSortMenuOpen ? 'menu-open' : ''}`}><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill">
                                    <path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z">
                                    </path>
                                </svg>
                                </span>
                            </div>

                            <div className={` menu-content ${isSortMenuOpen ? 'menu-open' : ''}`}>
                                <div className="content-scroll">
                                    <div className="labels-list">
                                        <div onClick={(event) => handleSortChange('recommended', event)} className="flex align-center label-item">
                                            <span className="label-item-check" aria-hidden="true" style={{ width: '14px', height: '14px', opacity: sortByToEdit === 'recommended' ? 1 : 0 }}
                                            ><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="m13.62 2.608-8.22 8.22-3.02-3.02a.375.375 0 0 0-.53 0l-.884.884a.375.375 0 0 0 0 .53l4.169 4.17a.375.375 0 0 0 .53 0l9.37-9.37a.375.375 0 0 0 0-.53l-.885-.884a.375.375 0 0 0-.53 0Z">
                                            </path>
                                                </svg>
                                            </span>
                                            <label>Recommended</label>
                                        </div>

                                        <div onClick={(event) => handleSortChange('newest', event)} className="flex align-center label-item">
                                            <span className="label-item-check" aria-hidden="true" style={{ width: '14px', height: '14px', opacity: sortByToEdit === 'newest' ? 1 : 0 }}><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="m13.62 2.608-8.22 8.22-3.02-3.02a.375.375 0 0 0-.53 0l-.884.884a.375.375 0 0 0 0 .53l4.169 4.17a.375.375 0 0 0 .53 0l9.37-9.37a.375.375 0 0 0 0-.53l-.885-.884a.375.375 0 0 0-.53 0Z">
                                            </path>
                                            </svg>
                                            </span>
                                            <label>Newest arrivals</label>
                                        </div>

                                        <div onClick={(event) => handleSortChange('mostReviewed', event)} className="flex align-center label-item">
                                            <span className="label-item-check" aria-hidden="true" style={{ width: '14px', height: '14px', opacity: sortByToEdit === 'mostReviewed' ? 1 : 0 }}><svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="m13.62 2.608-8.22 8.22-3.02-3.02a.375.375 0 0 0-.53 0l-.884.884a.375.375 0 0 0 0 .53l4.169 4.17a.375.375 0 0 0 .53 0l9.37-9.37a.375.375 0 0 0 0-.53l-.885-.884a.375.375 0 0 0-.53 0Z">
                                            </path>
                                            </svg>
                                            </span>
                                            <label>Most reviewed</label>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </section>
        </div>

    )
}