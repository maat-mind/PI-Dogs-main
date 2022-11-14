import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllDogs } from '../../redux/actions'
import Card from '../Card/Card'

export default function Home() {
  const dispatch = useDispatch()

  const dogs = useSelector((state) => state.dogs)

  useEffect(() => {
    dispatch(getAllDogs())
  }, [dispatch])

  return (
    <div>
      <h1>Home</h1>
      <Link to='/'>
        <button>Landing</button>
      </Link>
      <section>
        {dogs?.map((d) => {
          return (
            <>
              <Card
                key={d.id}
                id={d.id}
                name={d.name}
                temperament={d.temperament}
                height_max={d.height_max}
                height_min={d.height_min}
                life_span_max={d.life_span_max}
                life_span_min={d.life_span_min}
                weight_max={d.weight_max}
                weight_min={d.weight_min}
              />
            </>
          )
        })}
      </section>
    </div>
  )
}
