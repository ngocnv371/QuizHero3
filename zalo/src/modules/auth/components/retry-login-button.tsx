import React from 'react'
import { Button, Icon } from 'zmp-ui'

export const RetryLoginButton: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const handleClick = () => {
    console.log('Retry login by force reload page')
    setLoading(true)
    window.location.reload()
  }

  return (
    <Button onClick={handleClick} loading={loading} size="large" className="shrink-0">
      Login
      <Icon icon="zi-user" />
    </Button>
  )
}
