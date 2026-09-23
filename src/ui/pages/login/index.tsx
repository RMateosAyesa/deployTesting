import React, { useState } from 'react'
import { LoginTemplate } from '../../components/Templates/LoginTemplate'
import { authenticateOperator, requestPasswordReset, type LoginCredentials, type LoginResult } from './login.service'

export interface LoginPageProps {
  onLogin?: (credentials: LoginCredentials) => Promise<LoginResult>
  onForgotPassword?: (email: string) => Promise<void>
}

export function LoginPage({
  onLogin = authenticateOperator,
  onForgotPassword = requestPasswordReset,
}: LoginPageProps): React.ReactElement {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoading(true)

    try {
      await onLogin({
        email: emailValue,
        password: passwordValue,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPasswordClick = async () => {
    await onForgotPassword(emailValue)
  }

  return (
    <LoginTemplate
      emailValue={emailValue}
      passwordValue={passwordValue}
      onEmailChange={(event) => setEmailValue(event.target.value)}
      onPasswordChange={(event) => setPasswordValue(event.target.value)}
      onSubmit={handleSubmit}
      onForgotPasswordClick={handleForgotPasswordClick}
      loading={loading}
    />
  )
}

export default LoginPage
