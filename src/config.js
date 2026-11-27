// URL base de la API, leída desde la variable de entorno VITE_API_URL.
// Está aislada en este archivo para poder reemplazarla en las pruebas con Jest,
// que no entiende import.meta.env.
export const API_URL = import.meta.env.VITE_API_URL
