
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';

function TypeSection({siteUrl , props}) {    
    const [MediaItem, setMediaItems] = useState([]);

    const imageBlock = props.type_blocks;
    // console.log(imageBlock);
    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                // Use Promise.all to fetch all media items
                const responses = await Promise.all(
                    imageBlock.map(async (block) => {
                        const response = await axios.get(`${siteUrl}wp-json/wp/v2/media/${block.icon}`);
                        return response; // Return the response to include it in the resolved Promise.all array.
                    })
                );

                // Extract the data from each response and update state
                const items = responses.map((response) => response.data);
                setMediaItems(items);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllMedia();
    }, [imageBlock]);

    // console.log(typeof (SetIcon));
   
    
    return (
        <>
            <section className="selected_type_section pt_100 pb_100">
                <div className="selected_type_section_wrap">
                    <div className="container">
                        <div className="sec_heading">
                            <h3 className="hdng g-hdng">{props.section_heading}</h3>
                        </div>
                        <div className="cards_sec">
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
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper1"
                            >



                                {MediaItem.map((item , index) => (
                                    <SwiperSlide key={item.id}>
                                        <div className="cards swiper-slide">
                                            <img
                                                key={item.id}
                                                src={item.guid.rendered}
                                                alt={`Media ID ${item.id}`}
                                            ></img>
                                            <h4 className="title">{props.type_blocks[index].title}</h4>
                                        </div>
                                    </SwiperSlide>
                                ))}
                                

                                {/* <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/comedy_shows.svg" alt="icon"></img>
                                        <h4 className="title">Comedy Shows</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/music_shows.svg" alt="icon"></img>
                                        <h4 className="title">Music Shows</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/art_and_craft.svg" alt="icon"></img>
                                        <h4 className="title">Art & Craft</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/kids_zone.svg" alt="icon"></img>
                                        <h4 className="title">Kids Zone</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/business.svg" alt="icon"></img>
                                        <h4 className="title">Business</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/comedy_shows.svg" alt="icon"></img>
                                        <h4 className="title">Comedy Shows</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/music_shows.svg" alt="icon"></img>
                                        <h4 className="title">Music Shows</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/art_and_craft.svg" alt="icon"></img>
                                        <h4 className="title">Art & Craft</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/kids_zone.svg" alt="icon"></img>
                                        <h4 className="title">Kids Zone</h4>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="cards swiper-slide">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/business.svg" alt="icon"></img>
                                        <h4 className="title">Business</h4>
                                    </div>
                                </SwiperSlide> */}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default TypeSection;
