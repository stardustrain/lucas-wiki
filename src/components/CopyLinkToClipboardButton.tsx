import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import DefaultButton from './Button'
import DefaultIcon from './Icon'

const Div = styled.div`
  display: inline-block;
  position: relative;
`

const Button = styled(DefaultButton)`
  background: transparent;
  border: 0;
  box-shadow: none;
  padding: ${({ theme }) => theme.spacing2};
  vertical-align: top;

  @media (pointer: fine) {
    &:not(:disabled):hover {
      color: ${({ theme }) => theme.color.textLink};
    }
  }

  &:not(:disabled):hover {
    background-color: transparent;
  }
`

const Icon = styled(DefaultIcon)`
  vertical-align: middle;
`

const Tooltip = styled.div<{ visible: boolean }>`
  position: absolute;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  padding: ${({ theme }) => theme.spacing1};
  font-size: ${({ theme }) => theme.fontSize0};
  line-height: 1;
  color: white;
  background-color: ${({ theme }) => theme.color.pirmaryGreen};
  border-radius: 8px;

  &::before {
    position: absolute;
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    top: -4px;
    left: 8px;

    border-bottom: ${({ theme }) => `5px solid ${theme.color.pirmaryGreen}`};
  }
`

export default function CopyLinkToClipboardButton() {
  const [isCopyComplete, setIsCopyComplete] = useState(false)

  const handleClick = async () => {
    try {
      if (navigator && navigator.clipboard) {
        await navigator.clipboard.writeText(location.href)
        setIsCopyComplete(true)
      }
    } catch (e) {
      console.error('clipboard write failed')
    }
  }

  useEffect(() => {
    if (isCopyComplete) {
      setTimeout(() => {
        setIsCopyComplete(false)
      }, 1000)
    }
  }, [isCopyComplete])

  return (
    <Div>
      <Button aria-label="Copy post link to clipboard" onClick={handleClick}>
        <Icon
          name={isCopyComplete ? 'Checked' : 'CopyToClipboard'}
          fill={isCopyComplete ? 'var(--pirmaryGreen)' : 'none'}
          size={isCopyComplete ? 12 : 16}
        />
      </Button>
      <Tooltip visible={isCopyComplete}>Copied!</Tooltip>
    </Div>
  )
}
