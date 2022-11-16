import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getTemperaments, postDog } from '../../redux/actions'

export default function CreateDog() {
  const dispatch = useDispatch()
  const history = useHistory()

  const errorState = useSelector((state) => state.error)
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
    e.preventDefault()
    dispatch(postDog(input))
    history.push('/home')

    if (errorState) return console.log(errorState)
  }

  useEffect(() => {
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
        </label>

        <label>
          Altura min
          <input
            name='height_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label>
          Altura max
          <input
            name='height_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label>
          Peso min
          <input
            name='weight_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label>
          Peso max
          <input
            name='weight_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label>
          Vida min
          <input
            name='life_span_min'
            type='number'
            onChange={(e) => handleChange(e)}
          />
        </label>

        <label>
          Vida max
          <input
            name='life_span_max'
            type='number'
            onChange={(e) => handleChange(e)}
          />
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
