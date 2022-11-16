import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllDogs, getTemperaments, postDog } from '../../redux/actions'
import { isValidNum, isValidStr } from './validation'

export default function CreateDog() {
  const dispatch = useDispatch()
  const history = useHistory()

  const dogsState = useSelector((state) => state.dogs)
  const temperamentsState = useSelector((state) => state.temperaments)

  const [input, setInput] = useState({
    name: '',
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    life_span_min: 0,
    life_span_max: 0,
    temperament: [],
  })

  const [error, setError] = useState({
    name: '',
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_span_min: '',
    life_span_max: '',
  })

  const [areErrors, setAreErrors] = useState(false)

  function validate(e) {
    for (const key in error) {
      isValidNum(e[key])
        ? (error[key] = '')
        : (error[key] = 'Solo números (entre 1 y 99)')
    }

    isValidStr(e.name)
      ? (error.name = '')
      : (error.name = 'Solo letras (2 a 30)')

    const findName = dogsState.filter((p) => p.name === input.name)
    if (!!findName.length) error.name = 'La raza ya existe'

    return error
  }

  function handleChange(e) {
    const { name, value } = e.target

    setError(validate(input))

    if (
      error.name ||
      error.height_min ||
      error.height_max ||
      error.weight_min ||
      error.weight_max ||
      error.life_span_min ||
      error.life_span_max
    ) {
      setAreErrors(true)
    } else {
      setAreErrors(false)
    }

    setInput({
      ...input,
      [name]: value,
    })
  }

  function handleSelect(e) {
    const { value } = e.target

    setInput({
      ...input,
      temperament: [...input.temperament, value],
    })
  }

  function handleSubmit(e) {
    if (areErrors) {
      e.preventDefault()
      alert('hay errores: revisa los mensajes de error')
    } else {
      e.preventDefault()
      dispatch(postDog(input))
      history.push('/home')
    }
  }

  useEffect(() => {
    dispatch(getAllDogs())
    dispatch(getTemperaments())
  }, [dispatch])

  return (
    <div>
      <h1>Create Dog</h1>

      <Link to='/home'>
        <button>Regresar</button>
      </Link>

      <form>
        <label>
          Nombre
          <input
            name='name'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
        </label>

        <label>
          Altura min
          <input
            name='height_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.height_min && (
            <p style={{ color: 'red' }}>{error.height_min}</p>
          )}
        </label>

        <label>
          Altura max
          <input
            name='height_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.height_max && (
            <p style={{ color: 'red' }}>{error.height_max}</p>
          )}
        </label>

        <label>
          Peso min
          <input
            name='weight_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.weight_min && (
            <p style={{ color: 'red' }}>{error.weight_min}</p>
          )}
        </label>

        <label>
          Peso max
          <input
            name='weight_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.weight_max && (
            <p style={{ color: 'red' }}>{error.weight_max}</p>
          )}
        </label>

        <label>
          Vida min
          <input
            name='life_span_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.life_span_min && (
            <p style={{ color: 'red' }}>{error.life_span_min}</p>
          )}
        </label>

        <label>
          Vida max
          <input
            name='life_span_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.life_span_max && (
            <p style={{ color: 'red' }}>{error.life_span_max}</p>
          )}
        </label>

        <label>
          Temperamento
          <select
            name='temperament'
            onChange={(e) => handleSelect(e)}>
            <option>Ninguno</option>
            {temperamentsState.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
          </select>
        </label>

        <button
          type='submit'
          onClick={(e) => handleSubmit(e)}>
          Crear
        </button>
      </form>
    </div>
  )
}
