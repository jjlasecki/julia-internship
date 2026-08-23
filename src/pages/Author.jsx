import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setLoading(true);
    setIsFollowing(false);
    axios
      .get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`,
      )
      .then((response) => {
        setAuthor(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authorId]);
  const followerCount = author?.followers + (isFollowing ? 1 : 0);
  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    {loading ? (
                      <>
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />

                        <div className="profile_name">
                          <h4>
                            <Skeleton
                              width="150px"
                              height="24px"
                              borderRadius="4px"
                            />

                            <span className="profile_username">
                              <Skeleton
                                width="100px"
                                height="18px"
                                borderRadius="4px"
                              />
                            </span>

                            <span id="wallet" className="profile_wallet">
                              <Skeleton
                                width="250px"
                                height="18px"
                                borderRadius="4px"
                              />
                            </span>
                          </h4>
                        </div>
                      </>
                    ) : (
                      <>
                        <img
                          src={author?.authorImage}
                          alt={author?.authorName}
                        />

                        <i className="fa fa-check"></i>

                        <div className="profile_name">
                          <h4>
                            {author?.authorName}

                            <span className="profile_username">
                              @{author?.tag}
                            </span>

                            <span id="wallet" className="profile_wallet">
                              {author?.address}
                            </span>

                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <Skeleton
                          width="110px"
                          height="20px"
                          borderRadius="4px"
                        />
                      ) : (
                        <div className="profile_follower">
                          {followerCount} followers
                        </div>
                      )}

                      <button
                        className="btn-main"
                        onClick={() => setIsFollowing((prev) => !prev)}
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={author?.nftCollection || []}
                    author={author}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
