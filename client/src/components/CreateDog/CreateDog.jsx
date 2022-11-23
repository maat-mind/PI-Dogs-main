import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getAllDogs, getTemperaments, postDog } from '../../redux/actions'
import './create-dog.css'
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
    temperament: '',
  })

  const [currentTemps, setCurrentTemps] = useState(temperamentsState)

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

    setCurrentTemps(currentTemps.filter((t) => t.name !== value))

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

  function eraseTemperaments() {
    setCurrentTemps(temperamentsState)
    setInput({
      ...input,
      temperament: [],
    })
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
            : (error.image = 'Only url with images')
        } else if (key === 'name') {
          isValidStr(e.name)
            ? (error.name = '')
            : (error.name = 'Only letters (2 to 30)')
        } else if (key === 'temperament') {
          input.temperament.length >= 10
            ? (error.temperament = 'No more than 10 temperaments')
            : (error.temperament = '')
        } else {
          isValidNum(e[key])
            ? (error[key] = '')
            : (error[key] = 'Only numbers (between 1 y 99)')
        }
      }

      const findName = dogsState.filter((p) => p.name === input.name)
      if (!!findName.length) error.name = 'The breed already exists'

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
    <div className='create-main'>
      <Link to='/home'>
        <button className='create-btn-return'>Return</button>
      </Link>

      <div className='create-form-main'>
        <h1 className='create-title'>Create Dog</h1>

        <form className='create-lbl-group'>
          <label>Name</label>
          <input
            name='name'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          {error.name && <p className='error'>{error.name}</p>}

          <label>Minimum height</label>
          <input
            name='height_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.height_min && <p className='error'>{error.height_min}</p>}

          <label>Maximum height</label>
          <input
            name='height_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.height_max && <p className='error'>{error.height_max}</p>}

          <label>Minimum weight</label>
          <input
            name='weight_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.weight_min && <p className='error'>{error.weight_min}</p>}

          <label>Maximum weight</label>
          <input
            name='weight_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.weight_max && <p className='error'>{error.weight_max}</p>}

          <label>Minimum life expectancy</label>
          <input
            name='life_span_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.life_span_min && (
            <p className='error'>{error.life_span_min}</p>
          )}

          <label>Maximum life expectancy</label>
          <input
            name='life_span_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
          {error.life_span_max && (
            <p className='error'>{error.life_span_max}</p>
          )}

          <label>Image</label>
          <input
            name='image'
            type='text'
            onChange={(e) => handleChange(e)}
          />
          {error.image && <p className='error'>{error.image}</p>}

          <label>Temperament</label>
          <select
            name='temperament'
            onChange={(e) => handleSelect(e)}>
            {currentTemps.map((t) => (
              <option value={t.name}>{t.name}</option>
            ))}
          </select>
          {error.temperament && <p className='error'>{error.temperament}</p>}

          {input.temperament?.map((t) => (
            <small> {t} </small>
          ))}

          {input.temperament.length ? (
            <button onClick={eraseTemperaments}>Erase</button>
          ) : (
            <p
              className='error'
              style={{ color: 'white' }}>
              Choose at least 1 temperament (but no more than 10)
            </p>
          )}

          <button
            className='create-btn'
            type='submit'
            onClick={(e) => handleSubmit(e)}>
            Crear
          </button>
        </form>
      </div>
    </div>
  )
}
