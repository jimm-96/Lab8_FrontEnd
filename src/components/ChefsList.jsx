import { useEffect, useState } from 'react'
import { getChefs } from '../api'

function ChefsList() {
  const [chefs, setChefs] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getChefs()
      .then(setChefs)
      .catch(() => setError('No se pudieron cargar los chefs.'))
      .finally(() => setCargando(false))
  }, [])

  return (
    <section>
      <h2>Chefs</h2>
      {cargando && <p>Cargando...</p>}
      {error && <p role="alert">{error}</p>}
      <ul>
        {chefs.map((chef) => (
          <li key={chef.id}>
            <strong>{chef.nombre}</strong>: {chef.especialidad} ({chef.anios_experiencia} años de experiencia)
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ChefsList
