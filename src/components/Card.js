import React from 'react'
import '../cssfiles/card.css'

const Card = ({ img, note, title }) => {
  return (
    <div className="col-12 col-md-4 col-lg-3">
      <article class="card">
        <img
          class="card__background"
          src={img}
          alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
          width="1920"
          height="2193"
        />
        <div class="card__content | flow">
          <div class="card__content--container | flow">
            <h2 className='card__title'>{title}</h2>
            <p class="card__description">
              {note}
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Card
