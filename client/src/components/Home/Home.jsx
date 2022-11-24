import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  clearError,
  filterByOrigin,
  filterByTemperament,
  getAllDogs,
  getByName,
  getTemperaments,
  orderByName,
  orderByWeight,
} from '../../redux/actions'
import Card from '../Card/Card'
import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination'
import './style.css'

let PageSize = 8

export default function Home() {
  const dispatch = useDispatch()
  const dogs = useSelector((state) => state.dogs)
  const error = useSelector((state) => state.error.message)
  const temperaments = useSelector((state) => state.temperaments)

  useEffect(() => {
    dispatch(clearError())
    dispatch(getAllDogs())
    dispatch(getTemperaments())

    return () => {
      // componentWillUnmount
      dispatch(clearError())
    }
  }, [dispatch])

  function handleRecharge(e) {
    e.preventDefault()
    dispatch(getAllDogs())
    dispatch(clearError())
    setCurrentPage(1)
  }

  function goTop() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1)
  const [activeFilter, setActiveFilter] = useState({
    sortByName: false,
    sortByWeight: false,
    filterByCreated: false,
    filterByTemp: false,
  })

  const currentDogs = useMemo(() => {
    setActiveFilter(activeFilter)

    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize

    return dogs.slice(firstPageIndex, lastPageIndex)
  }, [dogs, activeFilter, currentPage])

  // FILTERS & ORDER
  function sortByName(e) {
    const { value } = e.target

    e.preventDefault()
    dispatch(orderByName(value))
    setCurrentPage(1)

    return value === 'none'
      ? setActiveFilter({
          ...activeFilter,
          sortByName: false,
        })
      : setActiveFilter({
          ...activeFilter,
          sortByName: true,
        })
  }

  function sortByWeight(e) {
    const { value } = e.target

    e.preventDefault()
    dispatch(orderByWeight(value))
    setCurrentPage(1)

    return value === 'none'
      ? setActiveFilter({
          ...activeFilter,
          sortByWeight: false,
        })
      : setActiveFilter({
          ...activeFilter,
          sortByWeight: true,
        })
  }

  function filterByCreated(e) {
    const { value } = e.target

    e.preventDefault()
    dispatch(filterByOrigin(value))
    setCurrentPage(1)

    return value === 'none'
      ? setActiveFilter({
          ...activeFilter,
          filterByCreated: false,
        })
      : setActiveFilter({
          ...activeFilter,
          filterByCreated: true,
        })
  }

  function filterByTemp(e) {
    const { value } = e.target

    e.preventDefault()
    dispatch(filterByTemperament(value))
    setCurrentPage(1)

    return value === 'none'
      ? setActiveFilter({
          ...activeFilter,
          filterByTemp: false,
        })
      : setActiveFilter({
          ...activeFilter,
          filterByTemp: true,
        })
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

  useEffect(() => {
    console.log(error)
    if (error) alert(error)
  }, [error])

  return (
    <div className='home-main-body'>
      <NavBar
        sortByName={sortByName}
        sortByWeight={sortByWeight}
        handleSearchBarChange={handleSearchBarChange}
        handleSearchBarSubmit={handleSearchBarSubmit}
        handleRecharge={handleRecharge}
        filterByCreated={filterByCreated}
        filterByTemp={filterByTemp}
        allTemperaments={temperaments}
      />

      <Pagination
        className='pagination-bar'
        currentPage={currentPage}
        totalCount={dogs.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />

      <section className='home-cards-group'>
        {currentDogs?.map((d) => {
          return (
            <>
              <Card
                key={d.id}
                id={d.id}
                name={d.name}
                image={d.image}
                temperament={d.temperament}
                weight_max={d.weight_max}
                weight_min={d.weight_min}
              />
            </>
          )
        })}
      </section>
      <button
        className='home-go-top'
        onClick={goTop}>
        Top
      </button>
    </div>
  )
}
