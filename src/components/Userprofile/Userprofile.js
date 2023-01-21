import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllPosts } from '../../store/asyncMethods/PostMethod'
import { FetchAllUsersAction, UpdateProfileAboutAction, UpdateUserProfileAction } from '../../store/asyncMethods/UserMethod'
import { userSlice } from '../../store/reducers/UserReducer'
import Navbar from '../Navbar/Navbar'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { storage } from "../../firebase";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import "./userprofile.css"
import { BiEditAlt } from 'react-icons/bi'
import { Helmet } from 'react-helmet'

const Userprofile = () => {
    const { user } = useSelector(state => state.auth)
    const { posts } = useSelector(state => state.post)

    const [allUserPosts, setAllUserPosts] = useState(posts)

    const [profileName, setProfileName] = useState(user.name);

    const dispatch = useDispatch();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    const [openModal, setOpenModal] = useState('');

    const handleOpenModal = (type) => {
        setOpenModal(type)
    };

    const handleCloseModal = () => {
        setOpenModal('');
    };

    const [profilePhotoName, setProfilePhotoName] = useState('');
    const [profilePhotoReview, setProfilePhotoReview] = useState('');

    const handleProfilePhotoChange = (e) => {
        if (e.target.files.length !== 0) {
            setProfilePhotoName(e.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhotoReview(reader.result)
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const updateProfilePhoto = (e) => {
        const userPhotoRef = ref(storage, `allProfilePhotos/${profilePhotoName.name + v4()}`);
        uploadBytes(userPhotoRef, profilePhotoName).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                dispatch(UpdateUserProfileAction({
                    id: user._id,
                    profilepic: url,
                    name: profileName
                }))
            });
        })
        handleCloseModal();
    }

    const [profileAbout, setProfileAbout] = useState({
        id: user._id,
        about: user.about,
        occupation: user.occupation,
        location: user.location
    })

    const handleProfileAboutChange = (e) => {
        setProfileAbout({ ...profileAbout, [e.target.name]: e.target.value })
    }

    const updateProfileAbout = () => {
        dispatch(UpdateProfileAboutAction(profileAbout));
        handleCloseModal();
    }

    useEffect(() => {
        dispatch(FetchAllUsersAction());
        dispatch(FetchAllPosts());
    }, [])

    useEffect(() => {
        const allUsersPostsArr = posts.filter((post) => {
            return post.user_id === user._id
        })
        setAllUserPosts(allUsersPostsArr)
    }, [posts])


    return (
        <div className='profile'>
            <Helmet>
                <title>Your Profile</title>
                <meta
                    name="description"
                    content="Your Profile"
                />
            </Helmet>
            <Navbar />
            <div className='profile_details_container'>
                <div className='profile_details'>
                    <div className='profile_details_left'>
                        <span onClick={() => handleOpenModal('profilePhotoUrl')}><BiEditAlt /></span>
                        <div className='profile_details_left_profilepic'>
                            <Modal
                                hideBackdrop
                                open={openModal === "profilePhotoUrl"}
                                onClose={handleCloseModal}
                                aria-labelledby="child-modal-title"
                                aria-describedby="child-modal-description"
                            >
                                <Box sx={{ ...style, width: 300, height: 400, borderRadius: "1rem", border: "none" }}>
                                    <div className='profile_details_left_modal'>
                                        <img className='profile_details_left_modalimg' src={profilePhotoReview ? profilePhotoReview : user.profilepic} />
                                        <input type="file" onChange={(e) => handleProfilePhotoChange(e)} />
                                        <div className='profile_details_left_modalname'>
                                            <h3>Name</h3>
                                            <input type="text" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
                                        </div>
                                        <div>
                                            <button className='profile_details_left_modalbutton' onClick={handleCloseModal}>Close</button>
                                            <button className='profile_details_left_modalbutton' onClick={updateProfilePhoto}>Save</button>
                                        </div>
                                    </div>

                                </Box>
                            </Modal>
                            <img src={user.profilepic} />
                        </div>
                        <div className='profile_details_left_name'>
                            <h3>{user.name}</h3>
                            <h4>@{user.username}</h4>
                        </div>
                        <div className='profile_details_left_stats'>
                            <div className='profile_details_left_stats_box'>
                                <h3>Posts</h3>
                                <h4>{allUserPosts.length}</h4>
                            </div>
                            <div className='profile_details_left_stats_box'>
                                <h3>Followers</h3>
                                <h4>{user.followersList.length}</h4>
                            </div>
                            <div className='profile_details_left_stats_box'>
                                <h3>Following</h3>
                                <h4>{user.friendsList.length}</h4>
                            </div>
                        </div>
                    </div>
                    <div className='profile_details_right'>
                        <span onClick={() => handleOpenModal('profileabout')}><BiEditAlt /></span>
                        <Modal
                            hideBackdrop
                            open={openModal === "profileabout"}
                            onClose={handleCloseModal}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                        >
                            <Box sx={{ ...style, width: 450, height: 400, borderRadius: "1rem", border: "none" }}>
                                <div className='profile_details_right_modal'>
                                    <div className='profile_details_right_modalbox'>
                                        <h4>About</h4>
                                        <textarea rows="6" value={profileAbout.about} onChange={(e) => handleProfileAboutChange(e)} name="about"></textarea>
                                    </div>
                                    <div className='profile_details_right_modalbox'>
                                        <h4>Occupation</h4>
                                        <input value={profileAbout.occupation} type="text" onChange={(e) => handleProfileAboutChange(e)} name="occupation" />
                                    </div>
                                    <div className='profile_details_right_modalbox'>
                                        <h4>Location</h4>
                                        <input value={profileAbout.location} type="text" onChange={(e) => handleProfileAboutChange(e)} name="location" />
                                    </div>
                                    <div>
                                        <button className='profile_details_left_modalbutton' onClick={handleCloseModal}>Close</button>
                                        <button className='profile_details_left_modalbutton' onClick={updateProfileAbout}>Save</button>
                                    </div>
                                </div>

                            </Box>
                        </Modal>
                        <div className='profile_details_right_box'>
                            <h4>About</h4>
                            <p>{user.about ? user.about : "-"}</p>
                        </div>
                        <div className='profile_details_right_box'>
                            <h4>Joined on</h4>
                            <p>23/12/2001</p>
                        </div>
                        <div className='profile_details_right_box'>
                            <h4>Occupation</h4>
                            <p>{user.occupation ? user.occupation : "-"}</p>
                        </div>
                        <div className='profile_details_right_box'>
                            <h4>Location</h4>
                            <p>{user.location ? user.location : "-"}</p>
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

export default Userprofile