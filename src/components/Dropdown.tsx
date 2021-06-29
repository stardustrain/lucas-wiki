import React, { useState, useRef } from 'react'
import styled from '@emotion/styled'

import useDropdownEventListener from '../hooks/useDropdownEventListener'

import DefaultIcon from './Icon'

const Wrapper = styled.div`
  position: sticky;
  display: inline-flex;
  top: 0;
`

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

const Ul = styled.ul<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'inline-block' : 'none')};
  position: absolute;
  left: 0;
  top: 32px;
  width: 100%;
  margin-bottom: 0;
  list-style: none;
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: white;
  background-color: ${({ theme }) => theme.color.tagSelector.background};
  border: ${({ theme }) => `1px solid ${theme.color.tagSelector.border}`};
  box-shadow: ${({ theme }) => `0 2px 5px ${theme.color.tagSelector.boxShadow}`};
  z-index: 1;
`

const Li = styled.li`
  position: relative;
  margin-bottom: 0;
  padding: ${({ theme }) =>
    `${theme.spacing1} ${theme.spacing8} ${theme.spacing1} ${theme.spacing2}`};

  &:not(:first-of-type) {
    border-top: ${({ theme }) => `1px solid ${theme.color.tagSelector.border}`};
  }

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.color.background};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.tagSelector.border};
  }
`

const Icon = styled(DefaultIcon)`
  position: absolute;
  right: ${({ theme }) => theme.spacing2};
  top: 50%;
  transform: translateY(-50%);
`

type Option = {
  label: string
  value: string | number
}

interface Props {
  selectedValue?: string | number
  defaultButtonTitle?: string
  options: Option[]
  className?: string
  onSelect: (arg: Option['value']) => void
}

export default function Dropdown({
  selectedValue,
  defaultButtonTitle,
  options,
  className,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useDropdownEventListener({
    wrapperRef,
    onCloseDropdown: () => {
      setIsOpen(false)
    },
  })

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <Button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(currentState => !currentState)
        }}
      >
        {selectedValue ?? defaultButtonTitle ?? 'Select'}
      </Button>
      <Ul isOpen={isOpen} role="listbox" tabIndex={-1}>
        {options.map(({ label, value }) => {
          const isSelected = value === selectedValue
          return (
            <Li
              key={value}
              aria-selected={isSelected}
              onClick={() => {
                onSelect(value)
                setIsOpen(false)
              }}
            >
              {label}
              {isSelected ? <Icon name="Checked" size={10} /> : null}
            </Li>
          )
        })}
      </Ul>
    </Wrapper>
  )
}
