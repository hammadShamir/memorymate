import React, { useState } from 'react'
import $ from 'jquery'
import Card from './Card'
import img from '../images/register1.png'
import '../cssfiles/gallery.css'
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody
} from 'mdb-react-ui-kit';
const Gallery = () => {
    const [optSmModal, setOptSmModal] = useState(false);


    // 
    const [selectedFile, setSelectedFile] = useState(null);

    function handleImageUpload(e) {
        e.preventDefault();

        // Handle image upload logic here
    }

    function handleFileInputChange(e) {
        setSelectedFile(e.target.files[0]);
        readURL(e.target);
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







    return (
        <div className='row gap-2 py-4'>
            <div className="col-12 m-auto ps-0 d-flex justify-content-between">
                <h3>Your Memories</h3>
                <button
                    className='btn btn-primary'
                    onClick={() => setOptSmModal(!optSmModal)}
                >Add Image</button>
            </div>
            <div className="col-12 m-auto">
                <div className="row gy-3">
                    <Card img={img} note={"Some quick example text to build on the card title and make up the bulk of the card's content."} />
                    <Card img={img} note={"Some quick example text to build on the card title and make up the bulk of the card's content."} />
                    <Card img={img} note={"Some quick example text to build on the card title and make up the bulk of the card's content."} />
                    <Card img={img} note={"Some quick example text to build on the card title and make up the bulk of the card's content."} />
                    <Card img={img} note={"Some quick example text to build on the card title and make up the bulk of the card's content."} />
                    <Card img={img} note={"Some quick example text to build on the card title and make up the bulk of the card's content."} />
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
                                        placeholder="Title here."
                                        className="formbold-form-input"
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
                                        <h3>Drag and drop a file or select add Image</h3>
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
                                            <button type="button" onClick={removeImage} className="remove-image">
                                                Remove <span className="image-title">Uploaded Image</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className=" text-center mb-2">
                                    <button className="formbold-btn btn_lg" type="submit">
                                        Upload
                                    </button>
                                </div>
                            </form>




                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div >
    )
}

export default Gallery
