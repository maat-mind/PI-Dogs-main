import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllDogs,
  getByName,
  orderByName,
  orderByWeight,
} from '../../redux/actions'
import Card from '../Card/Card'
import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination'
import './style.css'

let PageSize = 10

export default function Home() {
  const dispatch = useDispatch()
  const dogs = useSelector((state) => state.dogs)

  useEffect(() => {
    dispatch(getAllDogs())
  }, [dispatch])

  function handleRecharge(e) {
    e.preventDefault()
    dispatch(getAllDogs())
  }

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)

  const currentDogs = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return dogs.slice(firstPageIndex, lastPageIndex)
  }, [dogs, currentPage])

  // FILTERS & ORDER
  function sortByName(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
  }

  function sortByWeight(e) {
    e.preventDefault()
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1)
  }

  const [name, setName] = useState('')

  function handleSearchBarChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }

  function handleSearchBarSubmit(e) {
    e.preventDefault()
    dispatch(getByName(name))
    setCurrentPage(1)
  }

  return (
    <div>
      <NavBar
        sortByName={sortByName}
        sortByWeight={sortByWeight}
        handleSearchBarChange={handleSearchBarChange}
        handleSearchBarSubmit={handleSearchBarSubmit}
        handleRecharge={handleRecharge}
      />

      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={dogs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <section>
        {currentDogs?.map((d) => {
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
