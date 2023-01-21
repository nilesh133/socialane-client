import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllPosts } from '../../store/asyncMethods/PostMethod'
import { FetchAllUsersAction, UpdateProfileAboutAction, UpdateUserProfileAction } from '../../store/asyncMethods/UserMethod'
import Navbar from '../Navbar/Navbar'

import "../Userprofile/userprofile.css"
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'

const ProfileView = () => {
    const { username } = useParams();
    const dispatch = useDispatch();

    const { posts } = useSelector(state => state.post)
    const { allUsers } = useSelector(state => state.user);

    const [allUserPosts, setAllUserPosts] = useState(posts)
    const [currUser, setCurrUser] = useState({})


    useEffect(() => {
        dispatch(FetchAllUsersAction());
        dispatch(FetchAllPosts());
    }, [])

    useEffect(() => {
        const newCurrUser = allUsers.filter((user) => {
            if (user.username === username) {
                setCurrUser(user);
            }
        })

        const allUsersPostsArr = posts.filter((post) => {
            return post.user_id === currUser._id
        })
        setAllUserPosts(allUsersPostsArr)
    }, [allUsers, posts])


    return (
        <div className='profile'>
            <Helmet>
                <title>Profile View</title>
                <meta
                    name="description"
                    content="Profile View"
                />
            </Helmet>
            <Navbar />
            <div className='profile_details_container'>
                <div className='profile_details'>
                    <div className='profile_details_left'>
                        <div className='profile_details_left_profilepic'>
                            <img src={currUser?.profilepic} />
                        </div>
                        <div className='profile_details_left_name'>
                            <h3>{currUser?.name}</h3>
                            <h4>@{currUser?.username}</h4>
                        </div>
                        <div className='profile_details_left_stats'>
                            <div className='profile_details_left_stats_box'>
                                <h3>Posts</h3>
                                <h4>{allUserPosts.length}</h4>
                            </div>
                            <div className='profile_details_left_stats_box'>
                                <h3>Followers</h3>
                                <h4>{currUser?.followersList?.length}</h4>
                            </div>
                            <div className='profile_details_left_stats_box'>
                                <h3>Following</h3>
                                <h4>{currUser?.friendsList?.length}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='profile_details_right'>
                        <div className='profile_details_right_box'>
                            <h4>About</h4>
                            <p>{currUser?.about ? currUser?.about : "-"}</p>
                        </div>
                        <div className='profile_details_right_box'>
                            <h4>Joined on</h4>
                            <p>23/12/2001</p>
                        </div>
                        <div className='profile_details_right_box'>
                            <h4>Occupation</h4>
                            <p>{currUser?.occupation ? currUser?.occupation : "-"}</p>
                        </div>
                        <div className='profile_details_right_box'>
                            <h4>Location</h4>
                            <p>{currUser?.location ? currUser?.location : "-"}</p>
                        </div>
                    </div>
                </div>
                <div className='profile_details_posts'>
                    {
                        allUserPosts.map((post, i) => (
                            <div className={i === 0 ? "profile_details_posts_firstpost" : "profile_details_posts_otherposts"}>
                                <h3></h3>
                                <img src={post.posturl} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileView