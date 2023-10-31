export async function fetchCloberApi<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `https://pathfinder.clober-api.com/${path}`,
    options,
  )

  if (response.ok) {
    return response.json()
  } else {
    const errorResponse = await response.json()

    throw new Error(errorResponse.message || 'Unknown Error')
  }
}

export async function fetchOdosApi<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`https://api.odos.xyz/${path}`, options)

  if (response.ok) {
    return response.json()
  } else {
    const errorResponse = await response.json()

    throw new Error(errorResponse.message || 'Unknown Error')
  }
}
