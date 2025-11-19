import useSession from '@/hooks/useSession'

type JwtParse = {
  iss: string
  sub: string
  privileges: string[]
}

export function getTokenInfo(jwt: string): JwtParse {
  return JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString())
}

export function usePrivilegesToken() {
  const session = useSession()

  if (typeof session?.userToken === 'undefined' || !session.userToken) return []

  const parse = getTokenInfo(session.userToken)

  return parse.privileges
}
