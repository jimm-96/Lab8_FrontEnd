import { API_URL } from './config'

// Une la URL base con el recurso, tolerando que VITE_API_URL venga con o sin "/" final.
function urlDe(recurso) {
  return `${API_URL.replace(/\/+$/, '')}/${recurso}/`
}

// Hace un GET a la API y devuelve el JSON. Si el backend responde con error, lanza una excepción
// para que el componente pueda mostrar el mensaje.
async function obtener(recurso) {
  const respuesta = await fetch(urlDe(recurso))
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status} al obtener ${recurso}`)
  }
  return respuesta.json()
}

export function getPlatos() {
  return obtener('platos')
}

export function getChefs() {
  return obtener('chefs')
}

export function getCategorias() {
  return obtener('categorias')
}
