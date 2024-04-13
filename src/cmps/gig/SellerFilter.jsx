import { useRef } from "react"

export function SellerFilter({ handleClick, onClearFilter, applyFilters, selectedLevelValue, isSellerMenuOpen, toggleSellerMenu }) {
    const sellerMenuRef = useRef(null)

    return (
        <div onClick={toggleSellerMenu} className="floating-menu" ref={sellerMenuRef}>

            <div className="flex align-center gig-filter">
                <div className="flex align-center">
                    Seller level
                    <span className={`flex arrow-down ${isSellerMenuOpen ? 'menu-open' : ''}`}><svg width="16" height="16" viewBox="0 0 11 7" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="M5.464 6.389.839 1.769a.38.38 0 0 1 0-.535l.619-.623a.373.373 0 0 1 .531 0l3.74 3.73L9.47.61a.373.373 0 0 1 .531 0l.619.623a.38.38 0 0 1 0 .535l-4.624 4.62a.373.373 0 0 1-.531 0Z"></path></svg></span></div>
            </div>

            <div className={`menu-content ${isSellerMenuOpen ? 'menu-open' : ''}`}>
                <form onSubmit={(ev) => applyFilters(ev, 'sellerLevel')}>

                    <div className="content-scroll">
                        <div className="seller-filter">
                            <div className="flex column price-buckets-wrapper">
                                <div className="flex align-center radio-item-wrapper"
                                    onClick={(event) => handleClick(event, 3, 'sellerLevel')}>
                                    <span className={`radio-circle ${selectedLevelValue === 3 ? 'checked' : ''}`}></span>
                                    <div className="inner-radio">Top Rated Seller</div>
                                </div>
                                <div className="flex align-center radio-item-wrapper"
                                    value="155"
                                    onClick={(event) => handleClick(event, 2, 'sellerLevel')}>
                                    <span className={`radio-circle ${selectedLevelValue === 2 ? 'checked' : ''}`}></span>
                                    <div className="inner-radio">Level 2</div>
                                </div>
                                <div
                                    className="flex align-center radio-item-wrapper"
                                    onClick={(event) => handleClick(event, 1, 'sellerLevel')}>
                                    <span className={`radio-circle ${selectedLevelValue === 1 ? 'checked' : ''}`}></span>
                                    <div className="inner-radio">Level 1</div>
                                </div>
                                <div
                                    className="flex align-center radio-item-wrapper"
                                    onClick={(event) => handleClick(event, -Infinity, 'sellerLevel')}>
                                    <span className={`radio-circle ${selectedLevelValue === -Infinity ? 'checked' : ''}`}></span>
                                    <div className="inner-radio">New Seller</div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="flex align-center space-between filter-actions">
                        <button onClick={() => onClearFilter('sellerLevel')} className="clear-btn">Clear All</button>
                        <button type="submit" className="apply-btn">Apply</button>
                    </div>
                </form>

            </div>

        </div>
    )
}