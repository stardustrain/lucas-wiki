import React from 'react'
import styled from '@emotion/styled'

import * as Icons from './Icons'

type IconName = keyof typeof Icons

interface SvgProps {
  name: IconName
  className?: string
}

interface StyledProps {
  fill?: string
  size?: number
}

interface Props extends SvgProps, StyledProps {}

function SvgIcon({ name, className }: SvgProps) {
  const Svg = Icons[name]

  return <Svg className={className} role="img" />
}

const StyledIcon = styled(SvgIcon)<StyledProps>`
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  fill: ${({ theme, fill }) => fill ?? theme.color.icon};
`

export default function Icon({ name, className, size = 20 }: Props) {
  return <StyledIcon name={name} className={className} size={size} />
}
