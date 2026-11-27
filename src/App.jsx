import { useState } from 'react'
import CategoriasList from './components/CategoriasList'
import ChefsList from './components/ChefsList'
import PlatosList from './components/PlatosList'
import './App.css'

// Cada pestaña muestra el listado de un recurso de la API.
const PESTANAS = [
  { id: 'platos', titulo: 'Platos', Componente: PlatosList },
  { id: 'chefs', titulo: 'Chefs', Componente: ChefsList },
  { id: 'categorias', titulo: 'Categorías', Componente: CategoriasList },
]

function App() {
  const [activa, setActiva] = useState(PESTANAS[0].id)
  const { Componente } = PESTANAS.find((p) => p.id === activa)

  return (
    <div className="app">
      <header className="portada">
        <h1 className="marca">Cooking with Claude</h1>
        <p className="lema">Cocina de barrio, sin apuro.</p>
      </header>

      <nav className="tabs" aria-label="Secciones de la carta">
        {PESTANAS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={p.id === activa ? 'tab tab-activa' : 'tab'}
            aria-pressed={p.id === activa}
            onClick={() => setActiva(p.id)}
          >
            {p.titulo}
          </button>
        ))}
      </nav>

      <main className="app-main">
        <Componente />
      </main>
    </div>
  )
}

export default App
