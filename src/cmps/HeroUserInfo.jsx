export function HeroUserInfo({ username, job, imgUrl }) {
    return (
        <div className="flex align-center info-container">
            <div>
                <img src={imgUrl} />
            </div>
            <div className="flex column inner-container" >
                <div className="flex space-between name-container">
                    <div>{username}</div>
                    <div className="flex align-center">5
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none"><path d="M5.93263 1.00546C6.04001 0.736149 6.42121 0.736149 6.5286 1.00546L7.62159 3.74654C7.66741 3.86145 7.77521 3.93977 7.89866 3.94784L10.8433 4.1403C11.1326 4.15921 11.2504 4.52175 11.0275 4.7071L8.75833 6.59364C8.66321 6.67273 8.62203 6.79946 8.6525 6.91935L9.37942 9.77938C9.45084 10.0604 9.14244 10.2844 8.89727 10.1297L6.40185 8.55454C6.29724 8.48851 6.16399 8.48851 6.05938 8.55454L3.56396 10.1297C3.31879 10.2844 3.01039 10.0604 3.08181 9.77938L3.80872 6.91935C3.8392 6.79946 3.79802 6.67273 3.7029 6.59364L1.43372 4.7071C1.21078 4.52175 1.32858 4.15921 1.61789 4.1403L4.56257 3.94784C4.68601 3.93977 4.79381 3.86145 4.83963 3.74654L5.93263 1.00546Z" fill="white"></path></svg>
                    </div>
                </div>
                <div className="job-container">
                    <b>{job}</b>
                </div>
            </div>
        </div>
    )
}