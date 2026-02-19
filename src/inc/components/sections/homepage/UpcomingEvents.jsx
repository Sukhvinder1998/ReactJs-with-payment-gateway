import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import ImgTag from '../../../global/singleImage';
function UpcomingEvents({ siteUrl, props }) {
    
    const postType = props.post_type_name;
    const [filteredData, setFilteredData] = useState([]);
    // const [tagsArray, setTagsArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/${postType}/`);

                // Filter the response data based on category ID
                const filtered = response.data.filter(item => {
                    // Check if events-category exists and includes the category ID 2
                    return item['events-category']?.some(cat => cat === props.upcoming_events[0]);
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
   // console.log(filteredData);    
    return (
        <>
            <section className="upcoming_events pt_100 pb_100">
                <div className="upcoming_events_wrap">
                    <div className="container">
                        <div className="sec_heading mb_50">
                            <h3 className="hdng g-hdng">{ props.section_heading }</h3>
                            <Link to="/events" target='_blank' className="link">{props.link.title} </Link>
                        </div>
                        <div className="sec_content">
                            <div className="upcoming_cards_wrap">
                                    {filteredData
                                        .sort((a, b) => new Date(a.date) - new Date(b.date))  // Sort by publication date (ascending)
                                       .slice(0, 5)
                                        .map(event => {
                                            let eventDate = null;
                                        {event.acf.sections
                                                    && Array.isArray(event.acf.sections)
                                                    && event.acf.sections
                                                        .filter((section) => section.acf_fc_layout === "upcoming_event")
                                                        .map((upcoming_event) => {
                                                            // Assuming the date is in the `upcoming_event_date` property
                                                            if (upcoming_event.upcoming_event_date) {
                                                                const dateStr = `${upcoming_event.upcoming_event_date.slice(0, 4)}-${upcoming_event.upcoming_event_date.slice(4, 6)}-${upcoming_event.upcoming_event_date.slice(6, 8)}`;
                                                                eventDate = new Date(dateStr);
                                                            }
                                                        })
                                                    }
                                            return (
                                            <div className="cards" key={event.id}>
                                                <div className="image_wrap">
                                                    <ImgTag ImageId={event.featured_media} siteUrl={siteUrl} />
                                                    <div className="event_date">
                                                            <p>
                                                                <span>{eventDate.getDate()}</span>
                                                                <br />
                                                                {eventDate.toLocaleString('default', { month: 'short' })}
                                                            </p>
                                                    </div>
                                                </div>
                                            </div>
                                            );
                                         })}

                                
                                {/* <div className="cards">
                                    <div className="image_wrap">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Upcoming event2.png" alt="image" />
                                        <div className="event_date">
                                            <p><span>17</span><br />Aug</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cards">
                                    <div className="image_wrap">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Upcoming event3.png" alt="image" />
                                        <div className="event_date">
                                            <p><span>23</span><br />Aug</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cards">
                                    <div className="image_wrap">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Upcoming event4.png" alt="image" />
                                        <div className="event_date">
                                            <p><span>25</span><br />Aug</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="cards">
                                    <div className="image_wrap">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Upcoming event5.png" alt="image" />
                                        <div className="event_date">
                                            <p><span>31</span><br />Aug</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default UpcomingEvents;
