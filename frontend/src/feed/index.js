import React, { useState, useEffect } from "react";
import "./feedcard.style.css";
import { fetchAllFeeds } from '../api'

export const FeedCard = ({ user, openEditModal }) => {
    const [feeds, setFeeds] = useState([]);
    console.log(user)

    const fetchFeeds = async () => {
        try {
            const allFeeds = await fetchAllFeeds();
            if (allFeeds.status === 200)
                setFeeds(allFeeds.data);
        } catch (error) {
            console.log('first')
        }
    }

    useEffect(() => {
        try {
            fetchFeeds();
        } catch (error) {
            console.log('first')
        }
    }, []);
    return (
        <div className="product-card">
            <table>
                <tr>
                    <th>Sr. </th>
                    <th>Url</th>
                    <th>Feed Id</th>
                    {
                        user.roles.includes('ADMIN')?
                            <th>Is Verified</th> : ''
                    }
                </tr>
                { feeds.map((feed, index) => {
                    return (
                        <tr key={feed.id}>
                            <td>{ index + 1}</td>
                            <td>
                            <a href={feed.url}>Open</a>
                            </td>
                            <td>{feed.id}</td>
                            {
                                user.roles.includes('ADMIN') ?
                                    <td>
                                        {feed.isVerified === 1 ? 'Yes' : 'No'}
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span onClick={openEditModal} style={{ cursor: 'pointer', color: 'green' }}>
                                            Edit
                                        </span>
                                    </td>
                                         : '' 
                            }
                        </tr>
                    )
                })}
            </table>
        </div>
    );
};
