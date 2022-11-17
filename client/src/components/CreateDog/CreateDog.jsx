import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllDogs, getTemperaments, postDog } from '../../redux/actions'
import { isValidNum, isValidStr, isValidUrl } from './validation'

export default function CreateDog() {
  const dispatch = useDispatch()
  const history = useHistory()

  // state from store
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
    image: '',
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
    image: '',
  })

  const [areErrors, setAreErrors] = useState(false)

  // form handlers
  function handleChange(e) {
    const { name, value } = e.target

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

  // updates to get dogs and temps
  useEffect(() => {
    dispatch(getAllDogs())
    dispatch(getTemperaments())
  }, [dispatch])

  // updates to show validate regex
  useEffect(() => {
    function validate(e) {
      for (const key in error) {
        if (key === 'image') {
          isValidUrl(e.image)
            ? (error.image = '')
            : (error.image = 'Solo url con imágenes')
        } else if (key === 'name') {
          isValidStr(e.name)
            ? (error.name = '')
            : (error.name = 'Solo letras (2 a 30)')
        } else {
          isValidNum(e[key])
            ? (error[key] = '')
            : (error[key] = 'Solo números (entre 1 y 99)')
        }
      }

      const findName = dogsState.filter((p) => p.name === input.name)
      if (!!findName.length) error.name = 'La raza ya existe'

      return error
    }

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
  }, [input, error, dogsState])

  return (
    <div>
      <h1>Create Dog</h1>

      <Link to='/home'>
        <button>Return</button>
      </Link>

      <form>
        <label>
          Name
          <input
            name='name'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p style={{ color: 'red' }}>{error.name}</p>}
        </label>

        <label>
          Minimum height
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
          Maximum height
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
          Minimum weight
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
          Maximum weight
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
          Minimum life expectancy
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
          Maximum life expectancy
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
          Image
          <input
            name='image'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          {error.image && <p style={{ color: 'red' }}>{error.image}</p>}
        </label>

        <label>
          Temperament
          <select
            name='temperament'
            onChange={(e) => handleSelect(e)}>
            <option>Nothing</option>
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
