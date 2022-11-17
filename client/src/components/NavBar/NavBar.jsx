import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({
  sortByName,
  sortByWeight,
  handleSearchBarChange,
  handleSearchBarSubmit,
  handleRecharge,
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
          <option>Nothing</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      <div>
        <p>Order by Weight</p>
        <select
          id='orderByWeight'
          onChange={(e) => sortByWeight(e)}>
          <option>Nothing</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
    </nav>
  )
}
