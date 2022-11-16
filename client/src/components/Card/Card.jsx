export default function Card({
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
        <b>Height</b>: from {height_min} to {height_max} centimeters
      </p>
      <p>
        <b>Weight</b>: from {weight_min} to {weight_max} kilos
      </p>
      <p>
        <b>Life time</b>: of {life_span_min} to {life_span_max} years
      </p>
      <p>{temperament}</p>
    </div>
  )
}
