import React from 'react'

const Card = ({ img, title, note, date }) => {
  return (
    <div className="col-12 col-md-4 col-lg-3 col-sm-6">
      <div className="card shadow" >
        <img className="card-img-top shadow" src={img} alt="Card image cap" style={{ aspectRatio: "9/6" }} />
        <div className="card-body">
          <h5 class="card-title" style={{ fontFamily: "Montserrat, sans- serif" }}>{title}</h5>
          <p className="card-text" style={{ fontFamily: "Montserrat, sans- serif" }}>{note}</p>
          <span style={{ fontFamily: "Montserrat, sans- serif" }}>{date}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
