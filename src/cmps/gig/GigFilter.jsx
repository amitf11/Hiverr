export function GigFilter() {
    return (
        <section className="filter-sort">
            <section className="gig-filter-container flex space-between">
                <div className="flex">
                    <div className="gig-filter">Service options ∨</div>
                    <div className="gig-filter">Seller details ∨</div>
                    <div className="gig-filter">Budget ∨</div>
                    <div className="gig-filter">Delivery time ∨</div>
                </div>
                <section className="gig-sort-container flex">
                    <div className="gig-sort">Sort by: <span className="bold">Best selling ∨</span></div>
                </section>
            </section>


        </section>
    )
}