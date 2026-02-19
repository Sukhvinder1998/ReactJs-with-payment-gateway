import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ImgTag from '../../../../global/singleImage';
import { useParams } from 'react-router-dom';

function BlogContent({ siteUrl }) {
    const { slug } = useParams();
    console.log(siteUrl);

    const [PostData, setPostData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/posts/?slug=${slug}`);
                const filtered = response.data;
                setPostData(filtered);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [siteUrl]);
    console.log(PostData);

    return (
        <>
            {PostData.map((item, index) => (
                <>
                    {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                        .filter((section) => section.acf_fc_layout === "banner_section")
                        .map((banner_section) => (
            <section className="common_banner_section pt_100 pb_100" key={index}>
                <div className="common_banner_section_wrap">
                    <div className="container">
                        <div className="banner_heading">
                          <h1 className="hdng fs_55">{banner_section.banner_heading}</h1>
                        </div>
                    </div>
                </div>
            </section>
                        ))}
            <section className="full_width_content_sec blog_post_sec pt_100 pb_100">
                <div className="full_width_content_sec_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-lg-8">
                                        {item.acf.sections && Array.isArray(item.acf.sections) && item.acf.sections
                                            .filter((section) => section.acf_fc_layout === "post_content")
                                            .map((post_content_section) => (
                                <div className="content_wrap mb_100">
                                   <div dangerouslySetInnerHTML={{ __html: post_content_section.content }} />
                                </div>
                                ))}
                                <div className="comment_wrap">
                                    <div className="sec_heading mb_30">
                                        <h3 className="hdng">Add a Comment</h3>
                                    </div>
                                    <div className="sec_content">
                                        <div className="form_wrap">
                                            <input type="text" name="name" id="name" placeholder="Your Name" />
                                            <input type="email" name="email" id="email" placeholder="Your Email" />
                                            <label for="save_data">
                                                <input type="checkbox" name="save_data" id="save_data" />
                                                Save my name, email, and website in the browser for the next time I comment.
                                            </label>
                                            <textarea name="message" id="message" cols="30" rows="5" placeholder="Message"></textarea>
                                            <input type="submit" value="Post Comment" />
                                        </div>
                                    </div>
                                </div>
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
                </div>
            </section>
                </>
             ))}
        </>
    );
}

export default BlogContent;
