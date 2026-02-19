import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function LogoSlider({ siteUrl, props }) {
    
    const [MediaItem, setMediaItems] = useState([]);

    const imageBlock = props.image_block;
    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                // Use Promise.all to fetch all media items
                const responses = await Promise.all(
                    imageBlock.map(async (block) => {
                        const response = await axios.get(`${siteUrl}wp-json/wp/v2/media/${block.image}`);
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
    
    return (
        <>

            <section className="book_my_event swiper">
                <div className="book_my_event_sec_wrap swiper-wrapper">
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={20}
                        loop={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper3"
                    >
                        {MediaItem.map((item,index) => (
                            <SwiperSlide key={`${item.id}-${index}`}>
                                <div className="image_wrap swiper-slide">
                                    <img
                                        src={item.guid.rendered}
                                        alt={`Media ID ${item.id}-${index}`}
                                    ></img>
                                </div>
                            </SwiperSlide>
                        ))}
                        
                        {/* <SwiperSlide>
                            <div className="image_wrap swiper-slide">
                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/book_my_event.svg" alt="image" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image_wrap swiper-slide">
                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/book_my_event.svg" alt="image" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image_wrap swiper-slide">
                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/book_my_event.svg" alt="image" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image_wrap swiper-slide">
                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/book_my_event.svg" alt="image" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image_wrap swiper-slide">
                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/book_my_event.svg" alt="image" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="image_wrap swiper-slide">
                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/book_my_event.svg" alt="image" />
                            </div>
                        </SwiperSlide> */}
                       
                    </Swiper>
                </div>
            </section>
        </>
    );
}

export default LogoSlider;
