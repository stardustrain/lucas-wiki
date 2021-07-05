import React, { forwardRef } from 'react'
import styled from '@emotion/styled'

import type { DOMAttributes } from 'react'

const Button = styled.button`
  display: block;
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: ${({ theme }) => theme.color.tagSelector.background};
  border: ${({ theme }) => `1px solid ${theme.color.tagSelector.border}`};
  box-shadow: ${({ theme }) => `0 2px 5px ${theme.color.tagSelector.boxShadow}`};
  padding: ${({ theme }) => `${theme.spacing1} ${theme.spacing3}`};

  &:hover {
    cursor: pointer;
  }
`

interface Props extends DOMAttributes<HTMLButtonElement> {
  className?: string
}

export default forwardRef<HTMLButtonElement, Props>(({ className, children, ...props }, ref) => {
  return (
    <Button ref={ref} className={className} {...props}>
      {children}
    </Button>
  )
})
