import { useEffect, useState } from 'react'
import { getCategorias } from '../api'

// Listado de categorías de la carta, traído desde /api/categorias/.
function CategoriasList() {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch(() => setError('No se pudieron cargar las categorías. Revisa que el backend esté corriendo.'))
      .finally(() => setCargando(false))
  }, [])

  const sinCategorias = !cargando && !error && categorias.length === 0

  return (
    <section>
      <h2>Categorías</h2>
      {cargando && <p className="estado">Cargando...</p>}
      {error && <p className="estado estado-error" role="alert">{error}</p>}
      {sinCategorias && <p className="estado">Aún no hay categorías en la carta.</p>}

      <ul className="carta">
        {categorias.map((categoria) => (
          // Las categorías inactivas se muestran tachadas, como un plato agotado.
          <li key={categoria.id} className={categoria.activa ? 'carta-item' : 'carta-item agotado'}>
            <div className="carta-linea">
              <span className="carta-nombre">{categoria.nombre}</span>
            </div>
            {categoria.descripcion && <p className="carta-detalle">{categoria.descripcion}</p>}
            {!categoria.activa && <p className="carta-detalle">No disponible</p>}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CategoriasList
