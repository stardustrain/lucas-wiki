import React from 'react'
import styled from '@emotion/styled'

import DefaultButton from './Button'
import Icon from './Icon'

const Button = styled(DefaultButton)`
  padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing2}`};
`

interface Props {
  className?: string
}

export default function MoveToTopButton({ className }: Props) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button className={className} aria-label="Move to top" onClick={handleClick}>
      <Icon name="ArrowTop" aria-hidden focusable={false} size={15} />
    </Button>
  )
}
