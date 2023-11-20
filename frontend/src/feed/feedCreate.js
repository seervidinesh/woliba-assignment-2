import React, { useState } from "react";
import { Input } from "../input";
import { createFeed } from "../api";

export const CreateFeed = ({ closeModal, d }) => {
    const [feedData, setFeedData] = useState({ url: d.url, isVerified: d.isVerified });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFeedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        let res;
        try {
            res = await createFeed(feedData);
            if(res.status === 200) {
                alert('Feed Create success');
                closeModal();
            } else {
                console.log(res)
                alert(res.data.error.message ? res.data.error?.message : res.data);
            }
        } catch (error) {
            alert('Something went wrong!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <Input
                type="text"
                value={feedData.url}
                placeholder="Feed Url"
                label="Enter Feed Url"
                name="url"
                onChange={handleChange}
            />
            <div>
              <input type="radio" value={true} name="isVerified" /> Yes
              <input type="radio" value={false} name="isVerified" /> No
            </div>
            <button color="primary" type="submit" >Submit</button>
        </form>
    );
};
