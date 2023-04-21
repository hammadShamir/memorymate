import React, { useState, useEffect } from 'react'
import db, { storage, auth } from '../Firebase'
import $ from 'jquery'
import Card from './Card'
import loading from '../images/loading.gif'
import '../cssfiles/gallery.css'
import arrow from '../images/arrow.png'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Gallery = () => {

    const [optSmModal, setOptSmModal] = useState(false);
    const [loadImg, setLoadImg] = useState(false);
    const [isBtnDisabled, setisButtonDisabled] = useState(false);

    // 
    const [welcomeModal, setWelcomeModal] = useState(true);



    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [galleryItems, setGalleryItems] = useState([]);


    const initialize = () => {
        setTitle('');
        setDesc('');
        $('.file-upload-input').val('');
        setGalleryItems([]);
    }


    const handleFileInputChange = (e) => {
        setSelectedFile(e.target.files[0]);
        readURL(e.target);
    }
    const handleImageUpload = async (e) => {
        e.preventDefault();
        setLoadImg(true);
        setisButtonDisabled(true);
        // Handle image upload logic here
        if (!selectedFile) {
            toast.warning('Please select a file to upload.');
            setLoadImg(false);
            setisButtonDisabled(false);
            return;
        }
        try {
            const storageRef = storage.ref().child("images/" + selectedFile.name);
            const snapShot = await storageRef.put(selectedFile);
            const downloadURL = await snapShot.ref.getDownloadURL();

            // Save the download URL and text input to a Firestore document
            await db.collection("users")
                .doc(auth.currentUser.uid)
                .collection("gallery")
                .add({
                    downloadURL,
                    title: title,
                    desc: desc,
                    time: new Date().toLocaleString()
                })
                .then(() => {
                    toast.success(`Image Added Successfully!`);
                    //set values to null
                    initialize();
                    removeImage()
                    setLoadImg(false);
                    setisButtonDisabled(false);
                    setOptSmModal(!optSmModal);
                })
                .catch((error) => {
                    toast.error(`Error adding document:`);
                    setLoadImg(false);
                    setisButtonDisabled(false);
                    console.error(error);
                })

        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file. Please try again later.');
            setLoadImg(false);
        }
    }
    function removeImage() {
        setSelectedFile(null);
        $('.file-upload-input').val('');  /// working
        $('.file-upload-content').hide();

        $('.image-upload-wrap').show();
    }

    function readURL(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                $('.image-upload-wrap').hide();
                $('.file-upload-image').attr('src', e.target.result);
                $('.file-upload-content').show();
                $('.image-title').html(input.files[0].name);
            };

            reader.readAsDataURL(input.files[0]);
        } else {
            removeImage();
        }
    }
    // Fetching Gallery Data
    const fetchGallery = async () => {
        try {



            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const userId = user.uid;
                    // Use userId to access the user's data in Firestore or Realtime Database

                    const querySnapshot = await db
                        .collection("users")
                        .doc(userId)
                        .collection("gallery")
                        .orderBy("time", "desc")
                        .get()
                    const items = [];
                    querySnapshot.forEach((doc) => {
                        const galleryData = doc.exists ? doc.data() : null;
                        items.push({
                            id: doc.id,
                            data: galleryData,
                        });
                    });
                    setGalleryItems(items);

                }
            });
        } catch (error) {
            console.error("Error fetching Contacts: ", error);
        }

    }

    useEffect(() => {
        fetchGallery();
    }, [optSmModal]);





    return (
        <div className='row gap-2 py-4'>
            <div className="col-12 m-auto ps-0 d-flex justify-content-between">
                <h2 style={{ fontWeight: 'bold', fontSize: '2rem', color: 'rgb(64 105 124)' }} className="px-3  mb-4">Memories Gallery</h2>

                <p style={{maxWidth:'50%', display: 'block', color: `rgb(161 115 27)` }}>Click on  +  to add new images into gallery</p>
                <button title='Add New Image'
                    className='btn btn-primary buttonImage'
                    onClick={() => setOptSmModal(!optSmModal)}
                >+</button>
            </div>
            <div className="col-12 ">
                <div className="row gy-3">
                    {
                        galleryItems && galleryItems.length > 0 ? galleryItems.map((item) => {
                            return (
                                <Card img={item.data.downloadURL} title={item.data.title} note={item.data.desc} date={item.data.time}
                                />
                            )
                        }) : (
                            <>
                                <p className='text-center danger text-danger mt-5'>Add images to your gallery to display them here</p>
                                <img style={{ position: 'absolute', maxWidth: '200px', right: '12%', bottom: `25%` }} src={arrow} />

                            </>
                        )
                    }
                </div>
            </div>
            <MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}>
                <MDBModalDialog size='md'>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add New Image</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setOptSmModal(!optSmModal)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                            <form onSubmit={handleImageUpload}>
                                <div className="formbold-mb-3">
                                    <label htmlFor="title" className="formbold-form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="Enter a title for your post"
                                        className="formbold-form-input"
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                        value={title}
                                    />
                                </div>
                                <div className="formbold-mb-3">
                                    <label htmlFor="description" className="formbold-form-label">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        placeholder="Describe your post in a few words"
                                        className="formbold-form-input"
                                        onChange={(e) => {
                                            setDesc(e.target.value)
                                        }}
                                        value={desc}
                                    />
                                </div>

                                <div className="image-upload-wrap">
                                    <input
                                        className="file-upload-input"
                                        type="file"
                                        onChange={handleFileInputChange}
                                        accept="image/*"

                                    />
                                    <div className="drag-text">
                                        <h3>Click to select an image</h3>
                                    </div>
                                </div>

                                {selectedFile && (
                                    <div className="file-upload-content">
                                        <img
                                            className="file-upload-image"
                                            src="#"
                                            alt="your image"
                                        />
                                        <div className="image-title-wrap">
                                            <button style={{ width: '80%' }} type="button" onClick={removeImage} className="remove-image">
                                                Remove <span className="image-title">Uploaded Image</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className=" text-center mb-2">
                                    <div className=" text-center mb-2">
                                        <button style={{ background: isBtnDisabled ? `gray` : `#91c3db`, cursor: isBtnDisabled ? `wait` : `` }} className="formbold-btn btn_lg" type="submit">
                                            Upload
                                        </button>

                                    </div>
                                    <img src={loading} style={{ position: `absolute`, top: `50%`, left: `50%`, transform: `translate(-50%,-50%)`, display: loadImg ? `flex` : `none` }} />
                                </div>
                            </form>




                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />




<MDBModal show={welcomeModal} tabIndex='-1' setShow={setWelcomeModal}>
                    <MDBModalDialog size='md'>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle></MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={() =>setWelcomeModal(false)}></MDBBtn>
                            </MDBModalHeader>

                            <MDBModalBody>
                            <h4 className='fw-bold fs-5 mb-5 text-left'>Welcome to our Photo Album Section.</h4>
 
                            <p className='fw-light fs-6 text-center'> Easily add your cherished photos to our photo album feature by clicking on the + button. Once you upload your photo, you can add a title and description, so you never forget the precious memories captured in each image. With our intuitive interface, you can create a personalized photo album that you can revisit anytime you want. Start preserving your most cherished memories today with just a few clicks.</p>
                           
                            <hr className='m-auto mt-5 mb-3 text-center' style={{width:'40%'}}></hr>  
                            
                            </MDBModalBody>
                        </MDBModalContent>
                    </MDBModalDialog>
            </MDBModal>



        </div >
    )
}

export default Gallery
