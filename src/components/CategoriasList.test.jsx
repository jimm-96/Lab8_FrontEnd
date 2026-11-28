import { render, screen } from '@testing-library/react'
import CategoriasList from './CategoriasList'

// config.js usa import.meta.env, que Jest no entiende: se reemplaza por una URL de prueba.
jest.mock('../config', () => ({ API_URL: 'http://api.test/api/' }))

const categorias = [
  { id: 1, nombre: 'Fondos', descripcion: 'Platos principales de la casa', activa: true },
  { id: 2, nombre: 'Postres', descripcion: '', activa: false },
]

// fetch simulado: la prueba no necesita el backend encendido.
function simularRespuesta(datos) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(datos),
  })
}

describe('CategoriasList', () => {
  test('muestra las categorías que devuelve la API', async () => {
    simularRespuesta(categorias)

    render(<CategoriasList />)

    expect(screen.getByText('Cargando...')).toBeInTheDocument()
    expect(await screen.findByText('Fondos')).toBeInTheDocument()
    expect(screen.getByText('Platos principales de la casa')).toBeInTheDocument()
    expect(screen.getByText('Postres')).toBeInTheDocument()
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledWith('http://api.test/api/categorias/')
  })

  test('marca como no disponibles las categorías inactivas', async () => {
    simularRespuesta(categorias)

    render(<CategoriasList />)

    const postres = await screen.findByText('Postres')
    expect(postres.closest('li')).toHaveClass('agotado')
    expect(screen.getByText('Fondos').closest('li')).not.toHaveClass('agotado')
    expect(screen.getAllByText('No disponible')).toHaveLength(1)
  })

  test('avisa cuando no hay categorías', async () => {
    simularRespuesta([])

    render(<CategoriasList />)

    expect(await screen.findByText('Aún no hay categorías en la carta.')).toBeInTheDocument()
  })

  test('muestra un mensaje de error si la API falla', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 })

    render(<CategoriasList />)

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudieron cargar las categorías.')
  })
})
