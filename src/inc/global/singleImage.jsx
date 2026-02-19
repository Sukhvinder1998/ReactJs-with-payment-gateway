import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageCompo({ siteUrl, ImageId }) {

    const [MediaItem, setMediaItems] = useState(['https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/placeholder.png']);
    const imageId = ImageId;


    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                // Use Promise.all to fetch all media items
                const responses = await axios.get(`${siteUrl}wp-json/wp/v2/media/${imageId}`);
                if (responses.data.guid.rendered) {
                    setMediaItems(responses.data.guid.rendered); // Set the image URL
                } else {
                    console.warn("Media not found for banner_bg:");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllMedia();
    }, [imageId]);


    return (
        <>
           <img src={MediaItem} alt="" />
        </>
    );
}

export default ImageCompo;
