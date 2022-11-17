import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getDetail } from '../../redux/actions'

export default function DetailDog() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const dog = useSelector((state) => state.detail)

  useEffect(() => {
    dispatch(getDetail(id))
  }, [id, dispatch])

  return (
    <div>
      <Link to='/home'>
        <button>Return</button>
      </Link>
      <main>
        <h1>{dog.name}</h1>
        <img
          src={dog.image}
          alt={dog.name}
          style={{ width: '500px' }}
        />
        <p>
          <b>Height</b>: from {dog.height_min || 'X'} to {dog.height_max || 'X'}{' '}
          cm
        </p>
        <p>
          <b>Weight</b>: from {dog.weight_min || 'X'} to {dog.weight_max || 'X'}{' '}
          kg
        </p>
        <p>
          <b>Life time</b>: of {dog.life_span_min || 'X'} to{' '}
          {dog.life_span_max || 'X'} yrs
        </p>
        <p>{dog.temperament}</p>
      </main>
    </div>
  )
}
