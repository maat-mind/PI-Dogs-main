import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar({ sortByName }) {
  return (
    <nav>
      <div>
        <Link to='/'>
          <button>Return</button>
        </Link>
      </div>
      <div>
        <Link to='/create'>
          <button>Create</button>
        </Link>
      </div>
      <div>
        <button>Search</button>
        <input
          type='text'
          placeholder='Search...'
        />
      </div>
      <div>
        <p>Order</p>
        <select onChange={(e) => sortByName(e)}>
          <option>Nothing</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
    </nav>
  )
}
