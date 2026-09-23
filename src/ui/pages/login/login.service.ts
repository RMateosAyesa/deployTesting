export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResult {
  token: string
  operatorEmail: string
}

export async function authenticateOperator(credentials: LoginCredentials): Promise<LoginResult> {
  return Promise.resolve({
    token: 'mock-auth-token',
    operatorEmail: credentials.email,
  })
}

export async function requestPasswordReset(email: string): Promise<void> {
  void email
  return Promise.resolve()
}
