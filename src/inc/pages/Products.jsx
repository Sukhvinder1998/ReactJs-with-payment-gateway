import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import GlobalComp from '../global/globalComponent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
function Product({ siteUrl }) {
     const [loader, setLoader] = useState('');
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null);
    const [Products, setProduct] = useState(null);
    const consumerKey = 'ck_dfa785acf26f6754d4d65d95cd43b5b4099f2cd4';
    const consumerSecret = 'cs_83e3bf047fd5880e620b2c8bb2049a13b637ce7c';

     useEffect(() => {

            const fetchData = async () => {
                try {
                    const response = await axios.get(`${siteUrl}wp-json/wc/v3/products`, {
                        auth: {
                            username: consumerKey,
                            password: consumerSecret,
                        },
                    });
                    const product = response.data.map((product) => product);
                    setProduct(product);
                    setLoader(true);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    setError("Failed to fetch data.");
                }
            };
    
            // fetchData();
        }, [siteUrl]);

    if (Products != null){
        const addtocart = async (e) => {
            setLoader(true);
            let id = '';
            const Porduct_id = e.currentTarget.getAttribute('data-Id');
            const Variation_id = e.currentTarget.getAttribute('data-Variation');
            if (Variation_id == ''){
                id = Porduct_id;
            }else{
                id = Variation_id;   
            }
            //console.log(`${siteUrl}checkout/?add-to-cart=${id}`);
            
            // try {
            //     const response = await axios.post(`${siteUrl}checkout/?add-to-cart=${id}`,
            //  {        
            //      headers: {
            //          Authorization: `Bearer ${token}`, // Replace `token` with your actual Bearer token
            //      }, 
            // });
            //     console.log(response);
                
            // } catch (error) {
            //     console.error('Error fetching data:', error);
            //     setError("Failed to fetch data.");
            // }
            try {
                const response = await axios.post(
                    `${siteUrl}checkout/?add-to-cart=${id}`,
                    {}, // No body content needed for this endpoint
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Add Bearer token here
                            "Content-Type": "application/json", // Set content type explicitly
                        },
                        withCredentials: false, // If cookies are required
                    }
                );
                setLoader(false);
                //console.log("Response:", response.data);
            } catch (error) {
                console.error("Error adding to cart:", error.response?.data || error.message);
            }
                };
        //console.log(Products);
        
  return (
    <>
    <div className = "container">
              
        <div className="row">
          {Products.map((product,index) => (
              <>
                  <div style={{width : '50%'}}>
                  <Swiper 
                      slidesPerView={1}
                      loop={true}
                      pagination={{
                          clickable: true,
                      }}
                      navigation={false}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"
                  >
                  {product.images.map((image, index) => (
                    <>
                          <SwiperSlide key={index}>
                          <img src={image.src} alt="" />
                          </SwiperSlide>
                      </>
                  ))}
                   </Swiper>
                      <p key={index} >{product.name}</p>
                      <button onClick={addtocart} data-Variation={product.variations[0]} data-Id={product.id} >AddtoCart</button>
                   </div>
              </>
          ))}
              </div>
          </div>
    </>
  );
}
}
export default Product;