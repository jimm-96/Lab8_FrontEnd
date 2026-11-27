import { render, screen } from '@testing-library/react'
import ChefsList from './ChefsList'

// config.js usa import.meta.env, que Jest no entiende: se reemplaza por una URL de prueba.
jest.mock('../config', () => ({ API_URL: 'http://api.test/api/' }))

const chefs = [
  { id: 1, nombre: 'Auguste Escoffier', especialidad: 'Cocina francesa', anios_experiencia: 15 },
  { id: 2, nombre: 'Gastón Acurio', especialidad: 'Cocina peruana', anios_experiencia: 30 },
]

describe('ChefsList', () => {
  beforeEach(() => {
    // fetch simulado: la prueba no necesita el backend encendido.
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(chefs),
    })
  })

  test('muestra los chefs que devuelve la API', async () => {
    render(<ChefsList />)

    expect(screen.getByText('Cargando...')).toBeInTheDocument()
    expect(await screen.findByText('Auguste Escoffier')).toBeInTheDocument()
    expect(screen.getByText('Gastón Acurio')).toBeInTheDocument()
    expect(screen.queryByText('Cargando...')).not.toBeInTheDocument()
    expect(global.fetch).toHaveBeenCalledWith('http://api.test/api/chefs/')
  })

  test('muestra un mensaje de error si la API falla', async () => {
    global.fetch.mockResolvedValue({ ok: false, status: 500 })

    render(<ChefsList />)

    expect(await screen.findByRole('alert')).toHaveTextContent('No se pudieron cargar los chefs.')
  })
})
