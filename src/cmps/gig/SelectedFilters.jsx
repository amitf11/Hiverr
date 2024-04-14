export function SelectedFilters({ filterBy, onClearFilter }) {
    // const filtersToDisplay = Object.entries(filterBy)
    //     .filter(([filterType, filterValue]) => {
    //         return (
    //             (filterType === 'minPrice' || filterType === 'maxPrice' || filterType === 'deliveryTime' || filterType === 'sellerLevel') &&
    //             ((typeof filterValue === 'number' && !isNaN(filterValue) && filterValue !== Infinity && filterValue !== 0) ||
    //                 (typeof filterValue === 'string' && filterValue.trim().length > 0))
    //         )
    //     })
    //     .reduce((acc, [filterType, filterValue]) => {
    //         if (filterType === 'minPrice' || filterType === 'maxPrice') {
    //             acc.budget = { ...acc.budget, [filterType]: filterValue }
    //         } else {
    //             acc[filterType] = filterValue
    //         }
    //         return acc
    //     }, {})

    // const filters = Object.entries(filtersToDisplay).map(([filterType, filterValue]) => ({ filterType, filterValue }))

    const filtersToDisplay = Object.entries(filterBy)
        .filter(([filterType, filterValue]) => {
            return (
                (filterType === 'minPrice' || filterType === 'maxPrice' || filterType === 'deliveryTime' ||
                    (filterType === 'sellerLevel' && filterValue !== 0)) && // Exclude sellerLevel filter with value 0
                ((typeof filterValue === 'number' && !isNaN(filterValue) && filterValue !== Infinity && filterValue !== 0) ||
                    (typeof filterValue === 'string' && filterValue.trim().length > 0))
            )
        })
        .reduce((acc, [filterType, filterValue]) => {
            if (filterType === 'minPrice' || filterType === 'maxPrice') {
                acc.budget = { ...acc.budget, [filterType]: filterValue }
            } else {
                acc[filterType] = filterValue
            }
            return acc
        }, {})

    const filters = Object.entries(filtersToDisplay).map(([filterType, filterValue]) => ({ filterType, filterValue }))
    console.log(filters);
    console.log(filters);
    function getFilterTitle(filterType, filterValue) {
        switch (filterType) {
            case 'budget': {
                switch (filterValue.minPrice) {
                    case 0:
                        return 'Under $155'
                    case 155:
                        return '$155-$233'
                    case 233:
                        return '$233 & Above'
                    default:
                        return `Budget: $${filterValue.maxPrice}`
                }
            }
            case 'deliveryTime':
                switch (filterValue) {
                    case 1:
                        return 'Express 24H'
                    case 3:
                        return 'Up to 3 days'
                    case 7:
                        return 'Up to 7 days'
                    default:
                        return ''
                }
            case 'sellerLevel':
                switch (filterValue) {
                    // case 0:
                    //     return 'New Seller'
                    case 1:
                        return 'Level 1'
                    case 2:
                        return 'Level 2'
                    case 3:
                        return 'Top Rated Seller'
                }
            default:
                return ''
        }
    }

    return (
        <div className="flex align-center space-between selected-filters-wrapper">
            <div className="center selected-filters">
                {filters.map(({ filterType, filterValue }) => (
                    <p className="filter-name" key={filterType}>
                        {getFilterTitle(filterType, filterValue)}
                        <span onClick={() => onClearFilter(filterType)} className="remove-icon" style={{ width: '10px', height: '10px' }} aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill="currentFill"><path d="m8.485 7 4.487-4.487.926-.925a.35.35 0 0 0 0-.495l-.99-.99a.35.35 0 0 0-.495 0L7 5.515 1.588.102a.35.35 0 0 0-.495 0l-.99.99a.35.35 0 0 0 0 .495L5.514 7 .102 12.413a.35.35 0 0 0 0 .495l.99.99a.35.35 0 0 0 .495 0L7 8.485l4.487 4.487.926.926a.35.35 0 0 0 .495 0l.99-.99a.35.35 0 0 0 0-.495L8.485 7Z"> </path></svg>
                        </span>
                    </p>
                ))}
            </div>
        </div>
    )
}