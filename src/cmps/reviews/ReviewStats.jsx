import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { reviewService } from '../../services/review.service';


export function ReviewStats({ reviews }) {

    const fiveCount = reviews.filter(review => review.rate === 5).length
    const fourCount = reviews.filter(review => review.rate === 4).length
    const threeCount = reviews.filter(review => review.rate === 3).length
    const twoCount = reviews.filter(review => review.rate === 2).length
    const oneCount = reviews.filter(review => review.rate === 1).length

    return (
        <section className='review-stats'>
            <div className='stat-title'>Reviews</div>
            <span className='count'>
                <span>{reviews.length} reviews for this Gig</span>
                <div>
                    <svg width='16' height='15' viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z'></path></svg>
                    <svg width='16' height='15' viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z'></path></svg>
                    <svg width='16' height='15' viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z'></path></svg>
                    <svg width='16' height='15' viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z'></path></svg>
                    <svg width='16' height='15' viewBox='0 0 16 15' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' clipRule='evenodd' d='M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z'></path></svg>
                    <b>{reviewService.getAvgRating(reviews)}</b>
                </div>
            </span>
            <section className='review-layout'>
                <div className='bars'>
                    <table>
                        <tbody>
                            <tr>
                                <td className={fiveCount ? 'active' : 'disabled'}>
                                    5 Stars
                                </td>
                                <td className='progress-bar-container'>
                                    <LinearProgress className='progress' variant='determinate' value={fiveCount / reviews.length * 100}
                                        sx={{
                                            bgcolor: '#e4e5e7', borderRadius: 999, height: 8,
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
                                <td className='progress-bar-container'>
                                    <LinearProgress className='progress' variant='determinate' value={fourCount / reviews.length * 100}
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
                                <td className='progress-bar-container'>
                                    <LinearProgress className='progress' variant='determinate' value={threeCount / reviews.length * 100}
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
                                    <LinearProgress className='progress' variant='determinate' value={twoCount / reviews.length * 100}
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
                                    <LinearProgress className='progress' variant='determinate' value={oneCount / reviews.length * 100}
                                        sx={{
                                            bgcolor: '#e4e5e7', borderRadius: 999, height: 8,
                                            '& .MuiLinearProgress-bar': { bgcolor: '#222325', borderRadius: 999 }
                                        }} />
                                </td>
                                <td>
                                    ({oneCount})
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='space-between rating-breakdown'>
                    <h6>Rating breakdown</h6>
                    <ul>
                        <li key="1" className='clean-list breakdown'>Seller communication level
                            <span> <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>
                            <b>4.9</b>
                            </span>
                        </li>
                        <li key="2" className='clean-list '>Recommend to a friend
                            <span> <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>  <b>4.9</b></span>

                        </li>
                        <li key="3" className='clean-list '>Service as described
                            <span> <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg> <b>4.9</b></span>

                        </li>
                    </ul>
                </div>
            </section>
        </section>
    )
}