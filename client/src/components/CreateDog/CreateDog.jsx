import React from 'react'
import { Link } from 'react-router-dom'

export default function CreateDog() {
  return (
    <div>
      <h1>Create Dog</h1>

      <Link to='/home'>
        <button>Regresar</button>
      </Link>
    </div>
  )
}
