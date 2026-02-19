import React, { useEffect , useState } from 'react';
import axios from 'axios';

// Import Components 
import Banner from '../components/sections/homepage/Banner';
import TypeSection from '../components/sections/homepage/Type';
import EventTabSection from '../components/sections/homepage/EventTabSection';
import PopularEventSection from '../components/sections/homepage/PopularEvent';
import LogoSliderSection from '../components/sections/homepage/LogoSlider';
import UpcomingEventsSection from '../components/sections/homepage/UpcomingEvents';

// EventPage
import evantPageBanner from '../components/sections/EventPage/Banner';
import EventListing from '../components/sections/EventPage/EventListing';

// BlogPage
import blogBanner from '../components/sections/BlogPage/Banner';
import BlogListing from '../components/sections/BlogPage/BlogListing';

// ContactPage
import contactBanner from '../components/sections/ContactPage/Banner';
import ContactForm from '../components/sections/ContactPage/ContactForm';
// Map based on the page
const COMPONENT_MAP = {
    Home: {
        banner_section: Banner,
        browse_section: TypeSection,
        events_section: EventTabSection,
        popular_event_section: PopularEventSection,
        bookmyevent_section: LogoSliderSection,
        upcoming_events: UpcomingEventsSection,

        // left side wale acf ki field group ka hai and right side wale component ka naam hai 
    },
    Events: {
        banner_section: evantPageBanner,
        events_section: EventListing,

        // left side wale acf ki field group ka hai and right side wale component ka naam hai 
    },
    Blog: {
        banner_section: blogBanner,
        shortcode_section: BlogListing,

        // left side wale acf ki field group ka hai and right side wale component ka naam hai 
    },
    Contact: {
        banner_section: contactBanner,
        address_section: ContactForm,

        // left side wale acf ki field group ka hai and right side wale component ka naam hai 
    },
  };

function GlobalComp({ PageName, flexibleContentId, siteUrl  }) {
    
    const [acfData, setAcfData] = useState(null);
    const [error, setError] = useState(null);
    // fetch data from wordpress
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/pages/`);
                // console.log(response.data);

                // Find the object with title "home"
                const currentPage = response.data.find(item => item.title && item.title.rendered === PageName);
                
                if (currentPage && currentPage.acf) {
                    // Store the acf data in state
                    setAcfData(currentPage.acf);
                } else {
                    setError(`No ACF data found for page: ${PageName}`);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("Failed to fetch data.");
            }
        };

        fetchData();
    }, [PageName, flexibleContentId, siteUrl]);

    
    if (error) return <p>{error}</p>;
    if (!acfData) return <div className="jn-loader"><span className="loader"></span></div>;

    // Dynamically access the flexible content section
    const flexibleContent = acfData[flexibleContentId];

    if (!flexibleContent) {
        return <p>No content found for {flexibleContentId}</p>;
    }

    //console.log(acfData);

    return (
        <>
            <div>
                {flexibleContent.map((section, index) => {
                    const pageComponents = COMPONENT_MAP[PageName];
                    

                    if (!pageComponents) {
                        console.error(`No components found for page: ${PageName}`);
                        return null;
                    }
                    const SectionComponent = pageComponents[section.acf_fc_layout];

                    if (SectionComponent) {
                        return (<SectionComponent key={index} siteUrl={siteUrl} props={section} />);
                    } else {
                    // Conditional fallback for unknown layouts
                    console.warn(
                        `No matching component for layout: ${section.acf_fc_layout}`
                    );
                    return (
                        <div key={index} className="unknown-layout">
                        <p>No component for layout: {section.acf_fc_layout}</p>
                        </div>
                    );
                    }
                })}
            </div>
        </>
    );
}

export default GlobalComp;
