import React from 'react'
import { Link } from 'react-router-dom'

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
    <nav>
      <div>
        <Link to='/'>
          <button>Return</button>
        </Link>
      </div>
      <div>
        <button
          onClick={(e) => {
            handleRecharge(e)
          }}>
          Recharge
        </button>
      </div>
      <div>
        <Link to='/create'>
          <button>Create</button>
        </Link>
      </div>
      <div>
        <button
          type='submit'
          onClick={(e) => {
            handleSearchBarSubmit(e)
          }}>
          Go
        </button>
        <input
          type='text'
          placeholder='Search by Dog Name...'
          onChange={(e) => {
            handleSearchBarChange(e)
          }}
        />
      </div>
      <div>
        <p>Order by Name</p>
        <select
          id='orderByName'
          onChange={(e) => sortByName(e)}>
          <option value='none'>Nothing</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      <div>
        <p>Order by Weight</p>
        <select
          id='orderByWeight'
          onChange={(e) => sortByWeight(e)}>
          <option value='none'>Nothing</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      <div>
        <p>Filter by Origin</p>
        <select
          id='filterByOrigin'
          onChange={(e) => filterByCreated(e)}>
          <option value='none'>Nothing</option>
          <option value='api'>Real breeds</option>
          <option value='db'>Created by User</option>
        </select>
      </div>
      <div>
        <p>Filter by Temperament</p>
        <select
          id='filterByTemp'
          onChange={(e) => filterByTemp(e)}>
          <option value='none'>Nothing</option>
          {allTemperaments?.map((t) => (
            <option value={t.name}>{t.name}</option>
          ))}
          )
        </select>
      </div>
    </nav>
  )
}
