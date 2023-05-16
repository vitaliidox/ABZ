export const getToken = async () => {
  const response = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
  return await response.json()
}

export const getUsers = async (page = 1) => {
  const response = await fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`
  )
  return await response.json()
}

export const getPositions = async () => {
  const response = await fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
  return await response.json()
}

export const postFormData = async (formData, token) => {
  const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', { 
    method: 'POST',
    body: formData,
    headers: { 'Token': token, }, 
  })
  return response.json()
}
