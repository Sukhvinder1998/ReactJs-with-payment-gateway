import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ImgTag from '../../../../global/singleImage';
import { useParams } from 'react-router-dom';


function EventContent({ siteUrl}) {
    
    const { slug } = useParams();

    const [PostData, setPostData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/event/?slug=${slug}`);
                const filtered = response.data;
                setPostData(filtered); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [siteUrl]);
   // console.log(PostData);
    
    return (
        <>
       
            {PostData.map((item, index) => ( 
                <>
                    {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                        .filter((section) => section.acf_fc_layout === "banner_section")
                        .map((banner_section) => (
                    <section className="common_banner_section pt_100 pb_100">
                        <div className="common_banner_section_wrap">
                            <div className="container">
                                <div className="banner_heading">
                                            <h1 className="hdng fs_55">{banner_section.banner_heading}</h1>
                                </div>
                            </div>
                        </div>
                    </section>
                        ))}
                    <section className="event_details pt_100 pb_100" key={index}>                
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-12">
                                    <div className="left_wrap">
                                        {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                                            .filter((section) => section.acf_fc_layout === "price_details")
                                            .map((price_section) => (
                                        <div className="price_details">
                                            <h3 className="hdng fs_20">{price_section.heading}</h3>
                                            <ul>
                                                {price_section.price_block.map((price_block)=>(

                                                
                                                <li>
                                                    <div className="course">
                                                        <p>{price_block.title}</p>
                                                    </div>
                                                    <div className="price">
                                                        <p>{price_block.price}</p>
                                                    </div>
                                                </li>
                                                ))}
                                            </ul>
                                        </div>
                                            ))}
                                        {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                                            .filter((section) => section.acf_fc_layout === "organizer")
                                            .map((organizer_section) => (   
                                        <div className="organiser">
                                            <h3 className="hdng fs_20">{organizer_section.heading}</h3>
                                            <div className="img_card">
                                                <div className="img_wrap">
                                                    <ImgTag ImageId={organizer_section.image} siteUrl={siteUrl} />
                                                </div>
                                                <div className="title">
                                                    <p>{organizer_section.title}</p>
                                                </div>
                                            </div>
                                        </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-12">
                                    <div className="right_wrap">
                                        <div className="img_card">
                                            <div className="img_wrap full_img">
                                                    <ImgTag ImageId={item.featured_media} siteUrl={siteUrl} />
                                            </div>
                                            <div className="info">
                                                <div className="left">
                                                        <h2 className="g-hdng">{item.title.rendered}</h2>
                                                    <a href="#" className="g-btn">Education</a>
                                                    {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                                                        .filter((section) => section.acf_fc_layout === "post_fields")
                                                        .map((post_fields_section, index) => {
                                                            const formatDate = (dateStr, timeStr) => {
                                                                const year = dateStr.slice(0, 4);
                                                                const month = dateStr.slice(4, 6) - 1; // Month is zero-based in JS
                                                                const day = dateStr.slice(6, 8);
                                                                const hours = timeStr.slice(0, 2);
                                                                const minutes = timeStr.slice(3, 5);

                                                                const date = new Date(year, month, day, hours, minutes);

                                                                // Custom format: 'Month Day | Time'
                                                                const monthName = date.toLocaleString('en-US', { month: 'short' }); // Aug, Sep, etc.
                                                                const dayOfMonth = date.getDate();
                                                                let hours12 = date.getHours() % 12 || 12; // Convert to 12-hour format
                                                                const minutesFormatted = date.getMinutes().toString().padStart(2, '0'); // Format minutes as 2 digits
                                                                const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

                                                                // Return in 'Month Day | Time AM/PM' format
                                                                return `${monthName} ${dayOfMonth} | ${hours12}:${minutesFormatted} ${ampm}`;
                                                            };

                                                            const startDateTime = formatDate(post_fields_section.start_date, post_fields_section.start_time);
                                                            const endDateTime = formatDate(post_fields_section.end_date, post_fields_section.end_time);

                                                            return (
                                                                <div key={index}>
                                                                    {/* Location */}
                                                                    <a href="#" className="icon_btn">
                                                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="Location" />
                                                                        {post_fields_section.loaction}
                                                                    </a> <br></br>

                                                                    {/* Date and Time */}
                                                                    <a href="#" className="icon_btn">
                                                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender.svg" alt="Calendar" />
                                                                        {startDateTime} - {endDateTime}
                                                                    </a>
                                                                </div>
                                                            );
                                                        })}

                                                </div>
                                                {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                                                    .filter((section) => section.acf_fc_layout === "post_fields")
                                                    .map((post_fields_section) => (  
                                                <div className="right">
                                                    <div className="inner_wrap">
                                                        <p>{post_fields_section.price}</p>
                                                                <Link className="g-btn" to={`/book/event/${slug}/?eventname=${item.title.rendered}&eventid=${item.id}`}>
                                                        {post_fields_section.link.title}</Link>
                                                    </div>
                                                </div>
                                                    ))}
                                            </div>
                                        </div>
                                        {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                                                .filter((section) => section.acf_fc_layout === "post_content")
                                                .map((post_content_section) => ( 
                                        <div className="text_wrap">
                                                    <div dangerouslySetInnerHTML={{ __html: post_content_section.content }} />
                                                
                                        </div>
                                                ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ))}
        </>
    );
}

export default EventContent;
