import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDogs } from '../../redux/actions'
import Card from '../Card/Card'
import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination'

export default function Home() {
  const dispatch = useDispatch()

  const dogs = useSelector((state) => state.dogs)

  useEffect(() => {
    dispatch(getAllDogs())
  }, [dispatch])

  return (
    <div>
      <NavBar />
      <Pagination />
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
