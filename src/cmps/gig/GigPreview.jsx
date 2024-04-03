export function GigPreview({ gig }) {
    return (
        <article>
            <h3>Carousle</h3>
            <h3>{gig.owner.fullname}</h3>
            <h3>{gig.title}</h3>
            <div>Rating</div>
            <div>Price</div>
        </article>

    )

}