export function GigFilter() {
    return (
        <>
            <section className="gig-filter-container flex">
                <div className="gig-filter">Service options ∨</div>
                <div className="gig-filter">Seller details ∨</div>
                <div className="gig-filter">Budget ∨</div>
                <div className="gig-filter">Delivery time ∨</div>
            </section>
            
            <section className="gig-sort-container flex space-between">
                <div className="results">41,000+ Results</div>
                <div className="gig-sort">Sort by: <span className="bold">Best selling ∨</span></div>
            </section>
        </>
    )
}