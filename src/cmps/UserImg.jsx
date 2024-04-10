export function UserImg({ imgUrl, size }) {
    return (
        <img
            className="user-image"
            src={imgUrl}
            alt="user-image"
            title="user image"
            style={{ height: `${size}px` }} />
    )
}