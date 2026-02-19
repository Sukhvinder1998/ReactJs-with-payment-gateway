import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
// import module
import Accordion from 'react-bootstrap/Accordion';

import ImgCompo from '../../../global/singleImage';

function EventListing({ siteUrl, props }) {
    const [PostItem, setPostItems] = useState([]);

    const PostType = props.post_type;
    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                // fetch all Post items
                const currentDate = new Date();
                const normalizedCurrentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Normalize current date to remove time
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/${PostType}`);
                // let items;
                // if (Array.isArray(response.data)) {
                //     items = response.data.map((item) => item);
                // } else {
                //     items = [response.data];
                // }
                const filtered = response.data.filter(item => {
                    // Check if events-category exists and includes the category ID 2
                    // return item['events-category']?.some(cat => cat === props.upcoming_events[0]);
                    const isCategoryMatch = item['events-category']?.some(cat => cat === 3);

                    // Check if upcoming_event_date is greater than the current date
                    const isUpcomingDateValid = item.acf?.sections?.some(section => {
                        if (section.acf_fc_layout === "upcoming_event" && section.upcoming_event_date) {
                            const dateStr = section.upcoming_event_date;
                            const eventDate = new Date(
                                parseInt(dateStr.slice(0, 4)),    // Year
                                parseInt(dateStr.slice(4, 6)) - 1, // Month (0-based)
                                parseInt(dateStr.slice(6, 8))     // Day
                            );
                            const normalizedEventDate = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
                            return normalizedEventDate >= normalizedCurrentDate; // Compare normalized dates


                        }
                        return false;
                    });

                    // Return true only if both conditions are satisfied
                    return isCategoryMatch && isUpcomingDateValid;
                });
                // Extract the data from each response and update state
                //const items = responses.map((response) => response.data);
                setPostItems(filtered);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllMedia();
    }, [PostType]);
   //console.log(PostItem);
    return (
        <>
            <section className="event_section events pt_100 pb_100">
                <div className="event_section_wrap">
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-lg-3">
                                <div className="event_sec_filter_wrap">
                                    <div className="sec_heading">
                                        <h3 className="hdng">Filter</h3>
                                        <a href="#">Clear All</a>
                                    </div>
                                    <div className="filters_wrap">
                                        <div className="accordion accordion-flush" id="filter_accordions">
                                            <Accordion defaultActiveKey="0" flush>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <h3>Category</h3>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            <li>
                                                                <label htmlFor="business">
                                                                    <input type="checkbox" name="business" id="business" />
                                                                    Business
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="educational">
                                                                    <input type="checkbox" name="educational" id="educational" />
                                                                    Educational
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="entertainment">
                                                                    <input type="checkbox" name="entertainment" id="entertainment" />
                                                                    Entertainment
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="others">
                                                                    <input type="checkbox" name="others" id="others" />
                                                                    Others
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        <h3>Date Range</h3>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className="form_wrap">
                                                            <div className="from_date">
                                                                <label htmlFor="from">From</label>
                                                                <input type="date" name="from" id="from" />
                                                            </div>
                                                            <div className="to_date">
                                                                <label htmlFor="to">To</label>
                                                                <input type="date" name="to" id="to" />
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        <h3>Venue</h3>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            <li>
                                                                <label htmlFor="business">
                                                                    <input type="checkbox" name="business" id="business" />
                                                                    Business
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="educational">
                                                                    <input type="checkbox" name="educational" id="educational" />
                                                                    Educational
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="entertainment">
                                                                    <input type="checkbox" name="entertainment" id="entertainment" />
                                                                    Entertainment
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="others">
                                                                    <input type="checkbox" name="others" id="others" />
                                                                    Others
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-12">
                                <div className="event_sec_cards_wrap">
                                    <div className="sec_heading mb_50">
                                        <h3 className="hdng g-hdng">{props.section_heading}</h3>
                                    </div>
                                    <div className="sec_content mb_100">
                                        <div className="row">
                                            {PostItem.map((item) => (                                                
                                                <div className="col-md-4" key={item.id}>
                                                    <div className="event_cards_wrap">
                                                        <div className="cards">
                                                            <Link to={`/event/${item.link.split('/').filter(Boolean).pop()}`}> 
                                                            <div className="card_image">
                                                                    <ImgCompo siteUrl={siteUrl} ImageId={item.featured_media} />
                                                                {/* <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png" alt="image" /> */}
                                                            </div>
                                                            </Link>
                                                            <div className="card_description">
                                                                <ul>
                                                                    <li className="g-btn">Education</li>
                                                                </ul>
                                                                <h3 className="title">{item.title.rendered}</h3>
                                                                {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                                                                    .filter((section) => section.acf_fc_layout === "post_fields")
                                                                    .map((post_fields_section, index) => {
                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="location">
                                                                                    <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="Location Icon" />
                                                                                    <p>{post_fields_section.loaction}</p>
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                            </div>
                                                            <div className="card_bottom_description">
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
                                                                            return `${monthName} ${dayOfMonth} | ${hours12}:${minutesFormatted} ${ampm}`;
                                                                        };

                                                                        const startDateTime = formatDate(post_fields_section.start_date, post_fields_section.start_time);
                                                                        const endDateTime = formatDate(post_fields_section.end_date, post_fields_section.end_time);

                                                                        return (
                                                                            <div key={index}>
                                                                                <div className="timing">
                                                                                    <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="Calendar Icon" />
                                                                                    <p>{startDateTime} - {endDateTime}</p> {/* Adjust timing */}
                                                                                </div>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                <div className="booking">
                                                                    <Link to={`/book/event/${item.link.split('/').filter(Boolean).pop()}/?eventname=${item.title.rendered}&eventid=${item.id}`}>Book Now</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* <div className="view_more_btn">
                                <a href="#">View More</a>
                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EventListing;
