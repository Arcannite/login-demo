export function parseDateTime(datetime) {
  return 'UTC ' + datetime.split('T').join(' ').split('.')[0]
}

export async function getUser( id, email, username ) {
  const request = await autoFetch("/api/getUser", {
    method: 'POST',
    headers: {
      "Content-Type": "text/plain;charset=UTF-8",
    },
    body: JSON.stringify({
      "id": id,
      "email": email,
      "username": username
    })
  })
  const body = await request.json()
  return body
}

export function autoFetch( path, options ) {
  let baseURL;
  if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://login-demo-arcannite.vercel.app'
  }
  else {
    baseURL = 'http://localhost:3000'
  }
  if (options === undefined) {
    return fetch(baseURL + path)
  }
  else {
    return fetch(baseURL + path, options)
  }
}
  