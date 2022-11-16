import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllDogs, orderByName } from '../../redux/actions'
import Card from '../Card/Card'
import NavBar from '../NavBar/NavBar'
// import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination'
import './style.css'

let PageSize = 10

export default function Home() {
  const dispatch = useDispatch()
  const dogs = useSelector((state) => state.dogs)

  useEffect(() => {
    dispatch(getAllDogs())
  }, [dispatch])

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return dogs.slice(firstPageIndex, lastPageIndex)
  }, [dogs, currentPage])

  function sortByName(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
  }

  return (
    <div>
      <NavBar sortByName={sortByName} />

      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={dogs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <section>
        {currentTableData?.map((d) => {
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
