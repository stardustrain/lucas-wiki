import React, { forwardRef } from 'react'
import styled from '@emotion/styled'

import type { ButtonHTMLAttributes } from 'react'

const Button = styled.button`
  display: block;
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: ${({ theme }) => theme.color.button.background};
  border: ${({ theme }) => `1px solid ${theme.color.button.border}`};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0 2px 5px ${theme.color.button.boxShadow}`};
  padding: ${({ theme }) => `${theme.spacing1} ${theme.spacing3}`};

  &:not(:disabled):hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.button.hover};
  }

  &:not(:disabled):active {
    background-color: ${({ theme }) => theme.color.button.active};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.color.button.background};
    opacity: 0.3;
  }

  @media (max-width: 42rem) {
    padding: ${({ theme }) => `${theme.spacing2} ${theme.spacing3}`};
  }
`

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export default forwardRef<HTMLButtonElement, Props>(({ className, children, ...props }, ref) => {
  return (
    <Button ref={ref} className={className} {...props}>
      {children}
    </Button>
  )
})
