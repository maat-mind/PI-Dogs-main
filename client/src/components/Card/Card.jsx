export default function Card({
  name,
  temperament,
  height_max,
  height_min,
  life_span_max,
  life_span_min,
  weight_max,
  weight_min,
  image,
}) {
  return (
    <div>
      <h1> {name} </h1>
      <img
        src={image}
        alt={name}
        style={{ width: '250px' }}
      />
      {/*       <p>
        <b>Height</b>: from {height_min || 'X'} to {height_max || 'X'} cm
      </p> */}
      <p>
        <b>Weight</b>: from {weight_min || 'X'} to {weight_max || 'X'} kg
      </p>
      {/*       <p>
        <b>Life time</b>: of {life_span_min || 'X'} to {life_span_max || 'X'}{' '}
        yrs
      </p> */}
      <p>{temperament}</p>
    </div>
  )
}
