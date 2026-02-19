import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PopularEvents({ eventsCont, siteUrl }) {
    console.log(eventsCont);

    const postType = eventsCont.post_type_name;
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/${postType}/`);
                
                // Filter the response data based on category ID
                const filtered = response.data.filter(item => {
                    // Check if events-category exists and includes the category ID 2
                    return item['events-category']?.some(cat => cat === 2);
                });
                
                console.log('Filtered Data:', filtered);
                setFilteredData(filtered); // Store filtered data in state
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [eventsCont, siteUrl, postType]);

    return (
        <div>
            <h1>Filtered Events</h1>
            <ul>
                {filteredData.map(event => (
                    <li key={event.id}>{event.title.rendered}</li>
                ))}
            </ul>
        </div>
    );
}

export default PopularEvents;
