import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import ImgCompo from '../../../global/singleImage';

function BlogListing({ siteUrl, props }) {
    const [PostItem, setPostItems] = useState([]);

    const PostType = props.post_type;    
    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                // fetch all Post items
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/${PostType}`);
                let items;
                if (Array.isArray(response.data)) {
                    items = response.data.map((item) => item);
                } else {
                    // If it's not an array, wrap it in an array
                    items = [response.data];
                }
                // Extract the data from each response and update state
                //const items = responses.map((response) => response.data);
                setPostItems(items);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllMedia();
    }, [PostType]);
    //console.log(PostItem);
    return (
        <>
            <section className="blog_post_sec">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8">
                            <div className="row">
                                {PostItem.map((item,index) => (
                                <div className="col-md-6" key={index}>
                                    <div className="card">
                                        <div className="blog-figure">
                                                <ImgCompo siteUrl={siteUrl} ImageId={item.featured_media} />
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>
                                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Joanna-Wellick.svg" alt="" />
                                                    <span>Joanna Wellick</span>
                                                </li>

                                                <li>
                                                    July 15, 2023
                                                </li>
                                            </ul>
                                            <h2 className="post_hdng">{item.title.rendered}</h2>

                                                <div dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />


                                                <Link to={`/blog/${item.link.split('/').filter(Boolean).pop()}`}>View Post</Link>
                                        </div>
                                    </div>
                                </div>
                                ))}
                                {/* <div className="col-md-6">
                                    <div className="card">
                                        <div className="blog-figure">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Bruno-Fernandes-Post.png" className="img-fluid"
                                                alt="Bruno-Fernandes-Post" />
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>
                                                    <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Joanna Wellick.svg" alt="" />
                                                    <span>Joanna Wellick</span>
                                                </li>

                                                <li>
                                                    July 15, 2023
                                                </li>
                                            </ul>
                                            <h2 className="post_hdng">Start crafting your next DIY idea for birthday parties</h2>

                                            <p>Whether you’re going for a traditional simnel cake, a bunny-themed carrot cake or
                                                something else entirely, read on for our guide that’s packed with Easter cake
                                                recipes and Easter cake ideas for your family celebrations.</p>


                                            <Link to="/blogdetail">View Post</Link>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="col-md-6">
                                    <div className="card">
                                        <div className="blog-figure">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Joanna-Wellick-Post.png" className="img-fluid"
                                                alt="Joanna-Wellick" />
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>
                                                    <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Joanna Wellick.svg" alt="" />
                                                    <span>Joanna Wellick</span>
                                                </li>

                                                <li>
                                                    July 15, 2023
                                                </li>
                                            </ul>
                                            <h2 className="post_hdng">A Place where Start New Life
                                                with Peace</h2>

                                            <p>The Spring is a passionate and determined group of monthly givers on a mission to
                                                end the water crisis in our lifetime. People like you, from more than 100
                                                countries around the world, giving anything they can to prove how unstoppable we
                                                are when we work together.</p>


                                            <Link to="/blogdetail">View Post</Link>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className="col-md-6">
                                    <div className="card">
                                        <div className="blog-figure">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Bruno-Fernandes-Post.png" className="img-fluid"
                                                alt="Bruno-Fernandes-Post" />
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>
                                                    <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/Joanna Wellick.svg" alt="" />
                                                    <span>Joanna Wellick</span>
                                                </li>

                                                <li>
                                                    July 15, 2023
                                                </li>
                                            </ul>
                                            <h2 className="post_hdng">Start crafting your next DIY idea for birthday parties</h2>

                                            <p>Whether you’re going for a traditional simnel cake, a bunny-themed carrot cake or
                                                something else entirely, read on for our guide that’s packed with Easter cake
                                                recipes and Easter cake ideas for your family celebrations.</p>


                                            <Link to="/blogdetail">View Post</Link>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* <div className="col-md-12">
                <div className="post_blog_pagination">
                  <ul>
                    <li>
                      <a href="#">
                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/left-arrow.svg" className="img-fluid"
                          alt="left-arrow"/></a>
                    </li>

                    <li className="active"><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>

                    <li>
                      <a href="#">
                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/right-arrow.svg" className="img-fluid"
                          alt="left-arrow"/></a>
                    </li>

                  </ul>
                </div>
              </div> */}

                        </div>
                        <div className="col-xl-3 col-lg-4">
                            <div className="post_blog">
                                <h6 className="blog_post_hdng">Recent Posts</h6>

                                <div className="blog_post_wrap">
                                    <div className="blog_post_figure">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/post.png" alt="" />
                                    </div>

                                    <div className="blog_post_desc">
                                        <div className="comments">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/comments.png" alt="comments" />
                                            <span>3 Comments</span>
                                        </div>
                                        <p>A Place where Start New Life with Peace</p>
                                    </div>
                                </div>

                                <div className="blog_post_wrap">
                                    <div className="blog_post_figure">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/post.png" alt="" />
                                    </div>

                                    <div className="blog_post_desc">
                                        <div className="comments">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/comments.png" alt="comments" />
                                            <span>3 Comments</span>
                                        </div>
                                        <p>A Place where Start New Life with Peace</p>
                                    </div>
                                </div>

                                <div className="blog_post_wrap">
                                    <div className="blog_post_figure">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/post.png" alt="" />
                                    </div>

                                    <div className="blog_post_desc">
                                        <div className="comments">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/comments.png" alt="comments" />
                                            <span>3 Comments</span>
                                        </div>
                                        <p>A Place where Start New Life with Peace</p>
                                    </div>
                                </div>
                            </div>
                            <div className="post_blog">
                                <h6 className="blog_post_hdng">All Categories</h6>
                                <ul>
                                    <li><a href="#">Comedy Show</a></li>
                                    <li><a href="#">Music Show</a></li>
                                    <li><a href="#">Art & Craft</a></li>
                                    <li><a href="#">Kids Zne</a></li>
                                    <li><a href="#">Bussiness</a></li>
                                    <li><a href="#">Education</a></li>
                                    <li><a href="#">Health & Fitness</a></li>
                                    <li><a href="#">Lifestyle</a></li>
                                    <li><a href="#">Entertainment</a></li>
                                </ul>
                            </div>


                            <div className="post_blog">
                                <h6 className="blog_post_hdng">Tags</h6>
                                <div className="tags">
                                    <ul>
                                        <li>Adventure</li>
                                        <li>Tourism</li>
                                        <li>Beach</li>
                                        <li>Lifestyle</li>

                                    </ul>
                                </div>
                            </div>
                            <div className="post_blog_sale_figure">
                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/sale.png" className="img-fluid" alt="sale" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default BlogListing;
