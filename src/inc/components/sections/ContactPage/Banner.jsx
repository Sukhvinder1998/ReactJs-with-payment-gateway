import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Banner({ siteUrl, props }) {
    
    const [MediaItem, setMediaItems] = useState([]);
    const bannerId = props.banner_background_image;

    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                const responses = await axios.get(`${siteUrl}wp-json/wp/v2/media/${bannerId}`);
                if (responses.data.guid.rendered) {
                    setMediaItems(responses.data.guid.rendered); // Set the image URL
                } else {
                    console.warn("Media not found for banner_bg:", props.banner_bg);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllMedia();
    }, [bannerId]);
    return (
        <>
            <section className="common_banner_section pt_100 pb_100" style={{
                backgroundImage: `url(${MediaItem})`
            }}>
                <div className="common_banner_section_wrap">
                    <div className="container">
                        <div className="banner_heading">
                            <h1 className="hdng fs_55">{props.banner_heading}</h1>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Banner;
