import React, { HTMLAttributes } from "react"
import { SerializedStyles } from "@emotion/core"
import { style } from "./styles"
import { Props } from "@guardian/src-helpers"

interface MyComponentProps extends HTMLAttributes<HTMLDivElement>, Props {
  cssOverrides?: SerializedStyles | SerializedStyles[]
  children: string
}

const MyComponent = ({
  cssOverrides,
  children,
  ...props
}: MyComponentProps) => {
  return (
    <div css={[style, cssOverrides]} {...props}>
      {children}
    </div>
  )
}

const defaultProps = {}

MyComponent.defaultProps = { ...defaultProps }

export { MyComponent }
