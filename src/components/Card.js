import React from 'react'

const Card = ({ img, note }) => {
    return (
        <div className="col-12 col-md-3">
            <div class="card">
                <img class="card-img-top" src={img} alt="Card image cap" />
                <div class="card-body">
                    <p class="card-text">{note}</p>
                    <span>Date</span>
                </div>
            </div>
        </div>
    )
}

export default Card
