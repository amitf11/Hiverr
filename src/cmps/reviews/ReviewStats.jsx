import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

export function ReviewStats({ reviews }) {

    const fiveCount = reviews.filter(review => review.rate === 5).length
    const fivePrecentage = fiveCount / reviews.length * 100
    // 
    const fourCount = reviews.filter(review => review.rate === 4).length
    const fourPrecentage = fourCount / reviews.length * 100
    // 
    const threeCount = reviews.filter(review => review.rate === 3).length
    const threePrecentage = threeCount / reviews.length * 100
    //
    const twoCount = reviews.filter(review => review.rate === 2).length
    const twoPrecentage = twoCount / reviews.length * 100
    //
    const oneCount = reviews.filter(review => review.rate === 1).length
    const onePrecentage = oneCount / reviews.length * 100


    return (
        <section className="review-stats">
            <div className="stat-title">Reviews</div>
            <span className="count">{reviews.length} reviews for this Gig</span>
            <section className="review-layout">
                <div className='bars'>
                    <tr>
                        <td className={fiveCount ? 'active' : 'disabled'}>
                            5 Stars
                        </td>
                        <td className="progress-bar-container">
                            <LinearProgress className="progress" variant="determinate" value={fivePrecentage}
                                sx={{
                                    bgcolor: '#e4e5e7', height: 8, borderRadius: 999, width: 220,
                                    '& .MuiLinearProgress-bar': { bgcolor: '#222325', borderRadius: 999 }
                                }} />
                        </td>
                        <td>
                            ({fiveCount})
                        </td>
                    </tr>
                    <tr>
                        <td className={fourCount ? 'active' : 'disabled'}>
                            4 Stars
                        </td>
                        <td className="progress-bar-container">
                            <LinearProgress className="progress" variant="determinate" value={fourPrecentage}
                                sx={{
                                    bgcolor: '#e4e5e7', borderRadius: 999, height: 8,
                                    '& .MuiLinearProgress-bar': { bgcolor: '#222325', borderRadius: 999 }
                                }} />
                        </td>
                        <td>
                            ({fourCount})
                        </td>
                    </tr>
                    <tr>
                        <td className={threeCount ? 'active' : 'disabled'}>
                            3 Stars
                        </td>
                        <td className="progress-bar-container">
                            <LinearProgress className="progress" variant="determinate" value={threePrecentage}
                                sx={{
                                    bgcolor: '#e4e5e7', borderRadius: 999, height: 8,
                                    '& .MuiLinearProgress-bar': { bgcolor: '#222325', borderRadius: 999 }
                                }} />
                        </td>
                        <td>
                            ({threeCount})
                        </td>
                    </tr>
                    <tr>
                        <td className={twoCount ? 'active' : 'disabled'}>
                            2 Stars
                        </td>
                        <td className='progress-bar-container'>
                            <LinearProgress className="progress" variant="determinate" value={twoPrecentage}
                                sx={{
                                    bgcolor: '#e4e5e7', borderRadius: 999, height: 8,
                                    '& .MuiLinearProgress-bar': { bgcolor: '#222325', borderRadius: 999 }
                                }} />
                        </td>
                        <td>
                            ({twoCount})
                        </td>
                    </tr>

                    <tr>
                        <td className={oneCount ? 'active' : 'disabled'}>
                            1 Stars
                        </td>
                        <td className='progress-bar-container' >
                            <LinearProgress className="progress" variant="determinate" value={onePrecentage}
                                sx={{
                                    bgcolor: '#e4e5e7', borderRadius: 999, height: 8,
                                    '& .MuiLinearProgress-bar': { bgcolor: '#222325', borderRadius: 999 }
                                }} />
                        </td>
                        <td>
                            ({oneCount})
                        </td>
                    </tr>
                </div>
                <div className='rating-breakdown'>
                    <h6>Rating breakdown</h6>
                    <ul>
                        <li key="1" className='clean-list'>Seller communication level</li>
                        <li key="2" className='clean-list'>Recommend to a friend</li>
                        <li key="3" className='clean-list'>Service as described</li>
                    </ul>
                </div>
            </section>
        </section>
    )
}