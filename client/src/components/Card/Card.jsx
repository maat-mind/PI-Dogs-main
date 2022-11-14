import { useEffect } from 'react'

export default function Card({
  id,
  name,
  temperament,
  height_max,
  height_min,
  life_span_max,
  life_span_min,
  weight_max,
  weight_min,
}) {
  return (
    <div>
      <h1> {name} </h1>
      <p>
        Altura: {height_min} - {height_max}
      </p>
      <p>
        Peso: {weight_min} - {weight_max}
      </p>
      <p>
        Vida: {life_span_min} - {life_span_max}
      </p>
      <p>{temperament}</p>
    </div>
  )
}
