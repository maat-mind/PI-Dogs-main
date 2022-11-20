import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

export default function NavBar({
  sortByName,
  sortByWeight,
  handleSearchBarChange,
  handleSearchBarSubmit,
  handleRecharge,
  filterByCreated,
  filterByTemp,
  allTemperaments,
}) {
  return (
    <nav className='navbar-main-nav'>
      <section className='navbar-util-buttons'>
        <div>
          <Link to='/'>
            <button className='navbar-btn-util'>Return</button>
          </Link>
        </div>
        <div>
          <button
            className='navbar-btn-util'
            onClick={(e) => {
              handleRecharge(e)
            }}>
            Recharge
          </button>
        </div>
        <div>
          <Link to='/create'>
            <button className='navbar-btn-util'>Create</button>
          </Link>
        </div>
      </section>

      <section className='navbar-search-section'>
        <button
          className='navbar-btn-search'
          type='submit'
          onClick={(e) => {
            handleSearchBarSubmit(e)
          }}>
          🔍
        </button>
        <input
          className='navbar-input-search'
          type='text'
          placeholder='Search a Dog Breed . . . '
          onChange={(e) => {
            handleSearchBarChange(e)
          }}
        />
      </section>

      <section className='navbar-filter-group'>
        <div>
          <p>Name</p>
          <select
            className='input-filter'
            id='orderByName'
            onChange={(e) => sortByName(e)}>
            <option value='none'>Nothing</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
        <div>
          <p>Weight</p>
          <select
            className='input-filter'
            id='orderByWeight'
            onChange={(e) => sortByWeight(e)}>
            <option value='none'>Nothing</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>

        <div>
          <p>Origin</p>
          <select
            className='input-filter'
            id='filterByOrigin'
            onChange={(e) => filterByCreated(e)}>
            <option value='none'>Nothing</option>
            <option value='api'>Real breeds</option>
            <option value='db'>Created by User</option>
          </select>
        </div>
        <div>
          <p>Temperament</p>
          <select
            className='input-filter'
            id='filterByTemp'
            onChange={(e) => filterByTemp(e)}>
            <option value='none'>Nothing</option>
            {allTemperaments?.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
            )
          </select>
        </div>
      </section>
    </nav>
  )
}
