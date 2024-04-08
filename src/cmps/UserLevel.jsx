
export function UserLevel({ level }) {

    const svgs = []

    for (let i = 0; i < 3; i++) {
        const className = i < level ? "black" : "grey";
        svgs.push(
            <svg key={i} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10" fill="currentColor"><path d="M4.839.22a.2.2 0 0 1 .322 0l1.942 2.636a.2.2 0 0 0 .043.043L9.782 4.84a.2.2 0 0 1 0 .322L7.146 7.105a.2.2 0 0 0-.043.043L5.161 9.784a.2.2 0 0 1-.322 0L2.897 7.148a.2.2 0 0 0-.043-.043L.218 5.163a.2.2 0 0 1 0-.322l2.636-1.942a.2.2 0 0 0 .043-.043L4.839.221Z">
            </path></svg>
        )
    }
    return <div className='flex diamonds'>{svgs}</div>
}