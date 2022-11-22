import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getDetail } from '../../redux/actions'
import './detail-dog.css'

export default function DetailDog() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const dog = useSelector((state) => state.detail)

  useEffect(() => {
    dispatch(getDetail(id))
  }, [id, dispatch])

  return (
    <div className='detail-main'>
      <span className='detail-btn-container'>
        <Link to='/home'>
          <button className='detail-btn-return'>Return</button>
        </Link>
      </span>
      <main className='detail-info'>
        <h1 className='detail-title-name'>{dog.name}</h1>
        <img
          className='detail-image border'
          src={dog.image}
          alt={dog.name}
        />
        <div className='detail-additional-info'>
          <p>
            <b>Height</b>: from {dog.height_min || 'X'} to{' '}
            {dog.height_max || 'X'} cm
          </p>
          <p>
            <b>Weight</b>: from {dog.weight_min || 'X'} to{' '}
            {dog.weight_max || 'X'} kg
          </p>
          <p>
            <b>Life time</b>: of {dog.life_span_min || 'X'} to{' '}
            {dog.life_span_max || 'X'} yrs
          </p>
          <br />
          <p>{dog.temperament}</p>
        </div>
      </main>
    </div>
  )
}
