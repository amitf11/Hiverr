export function GigPreview({ gig }) {
    return (
        <article>
            <h1>**********</h1>
            <h3>GIG</h3>
            <h3>{gig.owner.fullname}</h3>
            <h3>{gig.title}</h3>
            <h1>**********</h1>
        </article>

    )

}