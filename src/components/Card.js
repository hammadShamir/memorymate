import React from 'react'
import '../cssfiles/card.css'

const Card = ({ img, note }) => {
    return (
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

      <p class="card__description card__title">
      {note}
      </p>
    </div>
  </div>
</article>
    )
}

export default Card
