import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav>
      <div>
        <Link to='/'>
          <button>Regresar</button>
        </Link>
      </div>
      <div>
        <Link to='/create'>
          <button>Crear</button>
        </Link>
      </div>
      <div>
        <button>Buscar</button>
        <input type='text' />
      </div>
      <div>
        <button>Filtros</button>
        <button>Filtros</button>
        <button>Filtros</button>
      </div>
      <div>
        <button>Filtros</button>
        <button>Filtros</button>
        <button>Filtros</button>
      </div>
    </nav>
  )
}
