import React, { useState } from 'react'
import Card from './Card'
import img from '../images/register1.png'
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



                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div >
    )
}

export default Gallery
