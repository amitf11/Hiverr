import { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { SelectedFilters } from "./SelectedFilters"
import { SellerFilter } from "./SellerFilter"

export function GigFilter({ filterBy, sortBy, onSetFilter, onSetSort, gigs }) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [sortByToEdit, setSortByToEdit] = useState(sortBy)
    const [isBudgetMenuOpen, setIsBudgetMenuOpen] = useState(false)
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false)
    const [isSellerMenuOpen, setIsSellerMenuOpen] = useState(false)
    const [isDeliveryMenuOpen, setIsDeliveryMenuOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [selectedDeliveryValue, setSelectedDeliveryValue] = useState(null)
    const [selectedLevelValue, setSelectedLevelValue] = useState(null)
    const sortMenuRef = useRef(null)
    const budgetMenuRef = useRef(null)
    const deliveryMenuRef = useRef(null)
    const customPriceRef = useRef(null)
    const sellerMenuRef = useRef(null)
    const [budgetValueCustom, setBudgetValueCustom] = useState('')
    const [windowSize, setWindowSize] = useState(null)
    const [filerClassName, setFilterClassName] = useState('')

    useEffect(() => {
        onSetFilter(filterByToEdit)
        onSetSort(sortByToEdit)
    }, [filterByToEdit, sortByToEdit])


    useEffect(() => {

        function handleScroll() {

            if (window.scrollY > 150) {
                console.log('hi hi hello yeah whatsapp...')
                setFilterClassName('fixed-filter')
            }
            else setFilterClassName('')
        }

        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)

    }, [setWindowSize])

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
            if (isSellerMenuOpen && sellerMenuRef.current && !sellerMenuRef.current.contains(event.target)) {
                setIsSellerMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isSortMenuOpen, isBudgetMenuOpen, isDeliveryMenuOpen, isSellerMenuOpen])

    function handleSortChange(value, ev) {
        ev.stopPropagation()
        setSortByToEdit(value)
        onSetSort(value)
    }

    function handleChange(ev, range, field) {
        ev.stopPropagation()
        const currentParams = Object.fromEntries(searchParams)
        if (field === 'budget') {
            let minPrice, maxPrice

            switch (range) {
                case 'low-range':
                    minPrice = 0
                    maxPrice = 155
                    break
                case 'mid-range':
                    minPrice = 155
                    maxPrice = 233
                    break
                case 'high-range':
                    minPrice = 233
                    maxPrice = ''
                    break
                case 'custom':
                    minPrice = ''
                    maxPrice = budgetValueCustom
            }

            setSearchParams({ ...currentParams, minPrice, maxPrice })
            setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, minPrice, maxPrice }))
        }

        else if (field === 'deliveryTime') {

            setSearchParams({ ...currentParams, deliveryTime: range })
            setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, deliveryTime: range }))

        }

        else if (field === 'sellerLevel') {
            setSearchParams({ ...currentParams, sellerLevel: range })
            setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, sellerLevel: range }))
        }
    }

    function handleClick(ev, range, field) {
        ev.stopPropagation()
        if (field === 'budget') setSelectedValue(range)
        else if (field === 'deliveryTime') setSelectedDeliveryValue(range)
        else if (field === 'sellerLevel') setSelectedLevelValue(range)
    }

    function applyFilters(ev, field) {
        ev.stopPropagation()
        ev.preventDefault()
        if (field === 'budget') {
            handleChange(ev, selectedValue, field)
            setIsBudgetMenuOpen(false)
            setBudgetValueCustom('')
        }
        else if (field === 'deliveryTime') {
            handleChange(ev, selectedDeliveryValue, field)
            setIsDeliveryMenuOpen(false)
        }
        else if (field === 'sellerLevel') {
            handleChange(ev, selectedLevelValue, field)
            setIsSellerMenuOpen(false)
        }
    }

    function handleInputClick(ev) {
        ev.stopPropagation()
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

    function toggleSellerMenu() {
        setIsSellerMenuOpen(prevIsOpen => !prevIsOpen)
    }

    function onClearFilter(field) {
        if (field === 'minPrice' || field === 'maxPrice') field = 'budget'
        const currentParams = Object.fromEntries(searchParams)
        let updatedParams = { ...currentParams }

        switch (field) {
            case 'budget':
                updatedParams.minPrice = ''
                updatedParams.maxPrice = Infinity
                break
            case 'deliveryTime':
                updatedParams.deliveryTime = Infinity
                break
            case 'sellerLevel':
                updatedParams.sellerLevel = 0
                setSelectedLevelValue(0)
            default:
                break
        }

        setSearchParams(updatedParams)
        switch (field) {
            case 'budget':
                setFilterByToEdit(prevFilterBy => ({
                    ...prevFilterBy,
                    minPrice: '',
                    maxPrice: Infinity
                }))
                break
            case 'deliveryTime':
                setFilterByToEdit(prevFilterBy => ({
                    ...prevFilterBy,
                    deliveryTime: Infinity
                }))
                break
            case 'sellerLevel':
                setFilterByToEdit(prevFilterBy => ({
                    ...prevFilterBy,
                    sellerLevel: 0
                }))
            default:
                break
        }
    }

    function getSortTitle() {
        if (sortBy === 'recommended') {
            return 'Recommended'
        } else {
            return sortBy === 'newest' ? 'Newest arrivals' : 'Most reviewed'
        }
    }

    return (
        <div className="sticky-wrapper">
            <section className="filter-sort">
                <section className={`flex space-between align-center gig-filter-container ${filerClassName}`}>
                    <div className="flex inner-filter-container">

                        <div onClick={toggleBudgetMenu} className="floating-menu" ref={budgetMenuRef}>

                            <div className="flex align-center gig-filter">
                                <div className="flex align-center">
                                    Budget
                                    <span className={`flex arrow-down ${isBudgetMenuOpen ? 'menu-open' : ''}`}><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
                            </div>

                            <div className={`menu-content ${isBudgetMenuOpen ? 'menu-open' : ''}`}>
                                <form onSubmit={(ev) => applyFilters(ev, 'budget')}>

                                    <div className="content-scroll">
                                        <div className="budget-filter">
                                            <div className="flex column price-buckets-wrapper">
                                                <div className="flex align-center radio-item-wrapper"
                                                    onClick={(event) => handleClick(event, 'low-range', 'budget')}>
                                                    <span className={`radio-circle ${selectedValue === 'low-range' ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">Value <span>Under $155</span></div>
                                                </div>
                                                <div className="flex align-center radio-item-wrapper"
                                                    value="155"
                                                    onClick={(event) => handleClick(event, 'mid-range', 'budget')}>
                                                    <span className={`radio-circle ${selectedValue === 'mid-range' ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">Mid-range <span>$155-$233</span></div>
                                                </div>
                                                <div
                                                    className="flex align-center radio-item-wrapper"
                                                    style={{ marginInlineEnd: '12px' }}
                                                    onClick={(event) => handleClick(event, 'high-range', 'budget')}>
                                                    <span className={`radio-circle ${selectedValue === 'high-range' ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">High-end <span>$233-$ Above</span></div>
                                                </div>
                                            </div>



                                            <div className=" flex column space-between custom-price">
                                                <div className="flex align-center radio-item-wrapper"
                                                    onClick={(event) => handleClick(event, 'custom', 'budget')}
                                                >

                                                    <span className={`radio-circle ${selectedValue === 'custom' ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">Custom</div>
                                                </div>
                                                <div className=" price-range-filter" id="custom-price-input">
                                                    <div className="flex column input-wrapper">
                                                        <input
                                                            ref={customPriceRef}
                                                            type="number"
                                                            placeholder="Enter budget"
                                                            value={budgetValueCustom}
                                                            onClick={handleInputClick}
                                                            onChange={(e) => setBudgetValueCustom(e.target.value)}
                                                        />
                                                        <i>$</i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex align-center space-between filter-actions">
                                        <button onClick={() => onClearFilter('budget')} className="clear-btn">Clear All</button>
                                        <button type="submit" className="apply-btn">Apply</button>
                                    </div>
                                </form>

                            </div>

                        </div>

                        <div onClick={toggleDeliveryMenu} className="floating-menu" ref={deliveryMenuRef}>
                            <div className="flex align-center gig-filter">
                                <div className="flex align-center">
                                    Delivery time
                                    <span className={`flex arrow-down ${isDeliveryMenuOpen ? 'menu-open' : ''}`}><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>

                                <div className={`menu-content ${isDeliveryMenuOpen ? 'menu-open' : ''}`}>
                                    <div className="content-scroll">
                                        <div className="delivery-filter flex align-center">
                                            <div className="flex column delivery-buckets-wrapper">

                                                <div className="flex align-center radio-item-wrapper"
                                                    onClick={(event) => handleClick(event, 1, 'deliveryTime')}>
                                                    <span className={`radio-circle ${selectedDeliveryValue === 1 ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">Express 24H</div>
                                                </div>
                                                <div className="flex align-center radio-item-wrapper"
                                                    onClick={(event) => handleClick(event, 3, 'deliveryTime')}>
                                                    <span className={`radio-circle ${selectedDeliveryValue === 3 ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">Up to 3 days</div>
                                                </div>
                                                <div className="flex align-center radio-item-wrapper"
                                                    onClick={(event) => handleClick(event, 7, 'deliveryTime')}>
                                                    <span className={`radio-circle ${selectedDeliveryValue === 7 ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">Up to 7 days</div>
                                                </div>
                                                <div className="flex align-center radio-item-wrapper"
                                                    onClick={(event) => handleClick(event, Infinity, 'deliveryTime')}>
                                                    <span className={`radio-circle ${selectedDeliveryValue === Infinity ? 'checked' : ''}`}></span>
                                                    <div className="inner-radio">Anytime</div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex align-center space-between filter-actions">
                                        <button className="clear-btn" onClick={() => onClearFilter('deliveryTime')}>Clear All</button>
                                        <button onClick={(ev) => applyFilters(ev, 'deliveryTime')} className="apply-btn">Apply</button>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <SellerFilter
                            handleClick={handleClick}
                            onClearFilter={onClearFilter}
                            applyFilters={applyFilters}
                            selectedLevelValue={selectedLevelValue}
                            isSellerMenuOpen={isSellerMenuOpen}
                            toggleSellerMenu={toggleSellerMenu}
                            sellerMenuRef={sellerMenuRef} />

                    </div>

                </section>

                <SelectedFilters filterBy={filterByToEdit} onClearFilter={onClearFilter} />

                <section className="gig-sort-container flex align-center">
                    <div className='services-container'>
                        <span className='available-services'>{gigs.length} services available</span>
                    </div>
                    <div className="flex align-center gig-sort">
                        <span>
                            Sort by:
                        </span>
                        <div onClick={toggleSortMenu} className="flex align-center bold floating-menu" ref={sortMenuRef}>
                            <div className="sort-menu-title flex align-center">
                                {getSortTitle()}
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