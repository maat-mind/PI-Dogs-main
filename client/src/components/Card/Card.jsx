import { Link } from 'react-router-dom'
import './card.css'

export default function Card({
  id,
  name,
  temperament,
  weight_max,
  weight_min,
  image,
}) {
  return (
    <div className='card-main-body'>
      <h1 className='card-name'> {name} </h1>
      <Link to={`/home/${id}`}>
        <img
          className='card-image'
          src={image}
          alt={name}
        />
      </Link>
      <p>
        <b>Weight</b>: from {weight_min || 'X'} to {weight_max || 'X'} kg
      </p>
      <p>{temperament}</p>
    </div>
  )
}
