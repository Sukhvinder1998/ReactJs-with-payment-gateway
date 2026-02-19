import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';


import ImgTag from '../../../global/singleImage';

function PopularEvent({ siteUrl, props }) {

    const postType = props.post_type_name;
    const [filteredData, setFilteredData] = useState([]);
    // const [tagsArray, setTagsArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/${postType}/?per_page=50`);

                // Filter the response data based on category ID
                const filtered = response.data.filter(item => {
                    // Check if events-category exists and includes the category ID 2
                    return item['events-category']?.some(cat => cat === props.popular_events[0]);
                });

                // console.log('Filtered Data:', filtered);
                setFilteredData(filtered); // Store filtered data in state

                // Extract and transform the tags
                // const allTags = filtered.map(item => item['events-tag']?.join(', ') || '');
                // console.log(allTags);

                // setTagsArray(allTags);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [siteUrl, postType]);

  


    return (
        <>
            <div className="popular_events_sec pt_100 pb_100">
                <div className="popular_events_sec_wrap">
                    <div className="container">
                        <div className="sec_heading mb_50">
                            <h3 className="hdng g-hdng">{props.section_heading}</h3>
                            <Link to="/events" target='_blank' className="link">{props.link.title} </Link>
                        </div>

                        <div className="sec_content popular_events_slider swiper">
                            <div className="popular_events_cards swiper-wrapper">
                                <Swiper
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                        },
                                        576: {
                                            slidesPerView: 2,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                        },
                                        991: {
                                            slidesPerView: 5,
                                        },
                                    }}
                                    //slidesPerView={5}
                                    spaceBetween={20}
                                    loop={true}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    navigation={false}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper2"
                                >
                                    {filteredData
                                        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by publication date (ascending)
                                        .map(event => (

                                            <SwiperSlide key={event.id}>
                                                <div className="cards swiper-slide">
                                                    <div className="image_wrap">
                                                        <ImgTag ImageId={event.featured_media} siteUrl={siteUrl} />
                                                        <div className="card_desc">
                                                            <h3 className="title">{event.title.rendered}</h3>
                                                            <p>Rise Beyond Limits</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopularEvent;
