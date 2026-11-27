import { useEffect, useState } from 'react'
import { getChefs } from '../api'

function ChefsList() {
  const [chefs, setChefs] = useState([])

  useEffect(() => {
    getChefs().then(setChefs)
  }, [])

  return (
    <section>
      <h2>Chefs</h2>
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
