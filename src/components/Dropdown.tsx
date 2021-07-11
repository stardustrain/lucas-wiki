import React, { useState, useRef, useEffect } from 'react'
import styled from '@emotion/styled'

import useEventListener from '../hooks/useEventListener'

import Button from './Button'
import DefaultIcon from './Icon'

const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
`

const Ul = styled.ul<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'initial' : 'none')};
  position: absolute;
  left: 0;
  top: 32px;
  width: 100%;
  margin-bottom: 0;
  max-height: 300px;
  overflow: auto;
  list-style: none;
  color: ${({ theme }) => theme.color.textPrimary};
  background-color: white;
  background-color: ${({ theme }) => theme.color.button.background};
  border: ${({ theme }) => `1px solid ${theme.color.button.border}`};
  border-radius: 5px;
  box-shadow: ${({ theme }) => `0 2px 5px ${theme.color.button.boxShadow}`};
  z-index: 1;

  @media (max-width: 42rem) {
    top: 40px;
  }
`

const Li = styled.li<{ focused: boolean }>`
  position: relative;
  margin-bottom: 0;
  padding: ${({ theme }) =>
    `${theme.spacing1} ${theme.spacing8} ${theme.spacing1} ${theme.spacing2}`};
  background-color: ${({ theme, focused }) => (focused ? theme.color.button.border : 'inherit')};

  &:not(:first-of-type) {
    border-top: ${({ theme }) => `1px solid ${theme.color.button.border}`};
  }

  &[aria-selected='true'] {
    background-color: ${({ theme }) => theme.color.background};
  }

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.button.border};
  }

  &:active {
    background-color: ${({ theme }) => theme.color.button.active};
  }

  @media (max-width: 42rem) {
    padding: ${({ theme }) =>
      `${theme.spacing3} ${theme.spacing8} ${theme.spacing3} ${theme.spacing2}`};
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
  selectedValue: string | number | null
  defaultButtonTitle?: string
  buttonTitle?: string
  options: Option[]
  className?: string
  onSelect: (arg: Option['value']) => void
}

export default function Dropdown({
  selectedValue,
  defaultButtonTitle,
  buttonTitle,
  options,
  className,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusElementIndex, setFocusElementIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const $elem = listRef.current?.children[focusElementIndex]

  const keyMap: { [key: string]: () => void } = {
    Enter: () => {
      onSelect(options[focusElementIndex].value)
      if (isOpen) {
        setIsOpen(false)
      }
    },
    ArrowUp: () => {
      if (focusElementIndex === 0) {
        return
      }
      setFocusElementIndex(focusElementIndex - 1)
    },
    ArrowDown: () => {
      if (focusElementIndex + 1 === options.length) {
        return
      }
      setFocusElementIndex(focusElementIndex + 1)
    },
    Escape: () => {
      setIsOpen(false)
    },
  }

  useEffect(() => {
    if (isOpen) {
      listRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    $elem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [focusElementIndex])

  useEventListener([
    {
      type: 'click',
      callback: e => {
        if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
          setIsOpen(false)
        }
      },
    },
    {
      type: 'touchstart',
      callback: e => {
        if (!wrapperRef.current?.contains(e.target as HTMLElement)) {
          setIsOpen(false)
        }
      },
    },
  ])

  return (
    <Wrapper ref={wrapperRef} className={className}>
      <Button
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => {
          setIsOpen(currentState => !currentState)
        }}
      >
        {buttonTitle ?? selectedValue ?? defaultButtonTitle ?? 'Select'}
      </Button>
      <Ul
        ref={listRef}
        isOpen={isOpen}
        role="listbox"
        tabIndex={-1}
        onKeyDown={e => {
          const action = keyMap[e.key]
          e.preventDefault()
          action?.()
        }}
      >
        {options.map(({ label, value }, index) => {
          const isSelected = value === selectedValue
          return (
            <Li
              key={value}
              aria-selected={isSelected}
              focused={focusElementIndex === index}
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
