/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import * as Icons from './Icons'

import type { SVGProps } from 'react'

type IconName = keyof typeof Icons

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName
  fill?: string
  size?: number
  className?: string
}

export default function Icon({ name, className, size = 20, fill, ...props }: Props) {
  const Svg = Icons[name]
  return (
    <Svg
      css={css`
        width: ${size}px;
        height: ${size}px;
        fill: ${fill ?? 'var(--textTertiary)'};
      `}
      className={className}
      role="img"
      {...props}
    />
  )
}
