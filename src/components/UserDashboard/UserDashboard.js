import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRedirectFalse } from '../../store/reducers/AuthReducer';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import "./userdashboard.css"
import { GoSearch } from "react-icons/go"
import { BsPlusLg } from "react-icons/bs";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { storage } from "../../firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { FetchAllPosts, SavePostAction, AddRemoveLikesAction, SaveCommentAction } from '../../store/asyncMethods/PostMethod';
import { AddRemoveFriendAction, FetchAllUsersAction } from '../../store/asyncMethods/UserMethod';
import { HiOutlineLogout } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { RiHeartFill, RiHeartLine } from 'react-icons/ri';
import { UserLogoutAction } from '../../store/asyncMethods/AuthMethods';
import { FiSend } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

const UserDashboard = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [suggestionToggle, setSuggestionToggle] = useState(false);

    const [commentToggle, setCommentToggle] = useState('');
    const [postComment, setPostComment] = useState('');

    const { user, redirect } = useSelector(state => state.auth);
    const { allUsers } = useSelector(state => state.user);
    let { posts } = useSelector(state => state.post);

    const [postCaption, setPostCaption] = useState('')

    const saveCommentHandler = (postId) => {
        dispatch(SaveCommentAction({
            postId,
            user_id: user._id,
            user_name: user.name,
            user_profilepic: user.profilepic,
            comment: postComment
        }));
    }

    // useEffect(() => {
    //     if (redirect) {
    //         dispatch(setRedirectFalse())
    //         navigate("/");
    //     }
    // }, [redirect])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 560,
        bgcolor: 'background.paper',
        border: 'none',
        boxShadow: 24,
        p: 4,
    };

    const [postImage, setPostImage] = useState('');
    const [postImagePreview, setPostImagePreview] = useState('');

    const handlePostImageChange = (e) => {
        if (e.target.files.length !== 0) {
            setPostImage(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostImagePreview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }


    const savePostImage = (e) => {
        const postImageRef = ref(storage, `allPostsImage/${postImage.name + v4()}`);
        uploadBytes(postImageRef, postImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                dispatch(SavePostAction({
                    user_id: user._id,
                    user_name: user.name,
                    user_username: user.username,
                    user_profilepic: user._profilepic,
                    posturl: url,
                    caption: postCaption,
                    likes: [],
                    comments: []
                }))
            });
        })
        handleClose();
        setPostImagePreview('')
        setPostCaption('');
    }

    const addRemoveFriendHandler = (friendId) => {
        dispatch(AddRemoveFriendAction(user._id, friendId))
    }

    const addRemoveLikeHandler = (postId) => {
        dispatch(AddRemoveLikesAction(user._id, postId));
    }

    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        dispatch(UserLogoutAction());
    }

    // useEffect(() => {
    //     let newCommentToggle = [];
    //     posts.map((post) => {
    //         if(user.friendsList.includes(post.user_id) || post.user_id === user._id){
    //             newCommentToggle.push({
    //                 i: commentToggle.length,
    //                 show: false
    //             })
    //         }
    //     })
    //     setCommentToggle(newCommentToggle)
    //     console.log(commentToggle);
    // }, [posts])

    // useEffect(() => {
    //     if (redirect) {
    //         dispatch(setRedirectFalse());
    //     }
    // }, [])

    useEffect(() => {
        dispatch(FetchAllUsersAction());
        dispatch(FetchAllPosts());
    }, [])

    useEffect(() => {
        dispatch(FetchAllUsersAction());
        dispatch(FetchAllPosts());
    }, [user])

    return (
        <div className='home'>
            <Helmet>
                <title>User Feed</title>
                <meta
                    name="description"
                    content="User Feed"
                />
            </Helmet>
            <Navbar />
            <div className='home_middle'>
                <div className='home_middle_create'>
                    <div className='home_middle_create_left' onClick={handleOpen}>
                        <img src={user.profilepic} />
                        <span><BsPlusLg /></span>
                    </div>
                    <div className='home_middle_create_right'>
                        <div className='home_middle_create_right_search'>
                            <span><GoSearch /></span>
                            <input type="text" placeholder='Search...' />
                        </div>
                        <span style={{ fontSize: "1.7rem", color: "red", cursor: "pointer" }} onClick={() => logoutHandler()}><HiOutlineLogout /></span>
                    </div>
                    {/* <Button onClick={handleOpen}>Open modal</Button> */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className='home_middle_create_modal'>
                                <img src={postImagePreview ? postImagePreview : "https://th.bing.com/th/id/R.660c04031fc8d5bca5209ec6ad833db0?rik=n75aqcTgEsperA&riu=http%3a%2f%2fwww.lrcb.nl%2fresources%2fuploads%2f2017%2f09%2funknown_person-1024x1024.png&ehk=vI9PhRuNPGuZJafUBiTHpzKAdQNhONZ79hy6uwzbLDk%3d&risl=&pid=ImgRaw&r=0"} />
                                <input type="file" onChange={(e) => handlePostImageChange(e)} />
                                <textarea rows="6" placeholder='Type caption' value={postCaption} onChange={(e) => setPostCaption(e.target.value)}></textarea>
                                <button onClick={() => savePostImage()}>Save</button>
                            </div>
                        </Box>
                    </Modal>
                </div>
                <div className='home_middle_post'>
                    {
                        posts.length > 0 ? (
                            posts.map((post, i) => (
                                user.friendsList.includes(post.user_id) || post.user_id === user._id ? (
                                    <div className='home_middle_post_single'>
                                        <div className='home_middle_post_userinfo'>
                                            <div className='home_middle_post_userinfo_img'>
                                                <img src={post.user_profilepic} />

                                            </div>
                                            <div>
                                                <h3>{post.user_name}</h3>
                                                <h4 style={{ cursor: "pointer" }} onClick={() => navigate(`/profile-view/${post.user_username}`)}>{post.user_username}</h4>
                                            </div>
                                        </div>
                                        <div className='home_middle_post_single_img'>
                                            <img src={post.posturl} />
                                        </div>
                                        <div className='home_middle_post_likescomments'>
                                            <div className='home_middle_post_likescomments_single'>
                                                <span style={{ color: post.likes.includes(user._id) ? "#ff4066" : "#17171f", marginTop: "0.3rem" }} onClick={() => addRemoveLikeHandler(post._id)}>{
                                                    post.likes.includes(user._id) ? <RiHeartFill /> : <RiHeartLine />
                                                }
                                                </span>
                                                <p>{post.likes.length}</p>
                                            </div>
                                            <div className='home_middle_post_likescomments_single'>
                                                <span style={{ color: "#17171f", marginTop: "0.3rem" }} onClick={() => setCommentToggle(i)}><BiMessageDetail /></span>
                                                <p>{post.comments.length}</p>
                                            </div>
                                        </div>
                                        <div className='home_middle_post_caption'>
                                            <h3>{post.caption}</h3>
                                        </div>


                                        <div className='home_middle_post_comments' style={{ display: commentToggle === i ? "block" : "none" }}>
                                            {
                                                post.comments.map((comment) => (

                                                    <div className='home_middle_post_commentsbox'>
                                                        <div className='home_middle_post_commentsbox_img'>
                                                            <img src={comment.user_profilepic} />
                                                        </div>
                                                        <div style={{ width: "80%" }}>
                                                            <h3>{comment.user_name}</h3>
                                                            <p>{comment.comment}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                            <div className='home_middle_post_comments_send'>
                                                <input type="text" value={postComment} onChange={(e) => setPostComment(e.target.value)} placeholder="Add comment" />
                                                <span onClick={() => saveCommentHandler(post._id)}><FiSend /></span>
                                            </div>
                                        </div>
                                    </div>) : <></>
                            ))
                        ) : <h3>Follow someone to see their posts</h3>

                    }
                </div>
            </div>
            <div className='home_right'>
                <div className='home_right_personal'>
                    <div className='home_right_personal_cover'>
                        <img src="https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />
                    </div>
                    <div className='home_right_personal_profile'>
                        <img src={user.profilepic} />
                    </div>
                    <div className='home_right_personal_name'>
                        <h3>{user.name}</h3>
                    </div>
                    <div className='home_right_personal_username'>
                        <h3>@{user.username}</h3>
                    </div>
                    <div className='home_right_personal_followers'>
                        <div className='home_right_personal_followers_box'>
                            <h3>{user?.followersList.length}</h3>
                            <h4>Followers</h4>
                        </div>
                        <div className='home_right_personal_followers_box'>
                            <h3>{user.friendsList.length}</h3>
                            <h4>Following</h4>
                        </div>
                    </div>
                    <div style={{ cursor: "pointer" }} className='home_right_personal_view' onClick={() => navigate("/user-profile")}>
                        View profile
                    </div>
                </div>
                <div className='home_right_suggestions'>
                    <div className='home_right_suggestions_heading'>
                        <h3>Suggestions for you</h3>
                        <h4 style={{ color: "#4169e1", fontSize: "0.9rem", cursor: "pointer" }} onClick={() => setSuggestionToggle(!suggestionToggle)}>
                            {
                                suggestionToggle ? "Hide" : "See more"
                            }
                        </h4>
                    </div>
                    <div className='home_right_suggestions_list' style={{ overflowY: suggestionToggle ? "scroll" : "hidden" }}>
                        {
                            allUsers?.map((friend) => (
                                friend._id !== user._id && (
                                    <div className='home_right_suggestions_single'>
                                        <div className='home_right_suggestions_singleleft'>
                                            <img src={friend.profilepic} />
                                            <div style={{ width: "40%" }}>
                                                <h3>{friend.name}</h3>
                                                <h4 onClick={() => navigate(`/profile-view/${friend.username}`)}>@{friend.username}</h4>
                                            </div>
                                        </div>
                                        {
                                            !user?.friendsList?.includes(friend._id) ? (
                                                <button onClick={() => addRemoveFriendHandler(friend._id)}>Follow</button>

                                            ) : <button onClick={() => addRemoveFriendHandler(friend._id)}>Unfollow</button>

                                        }
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard