import React, { HTMLAttributes } from "react"
import { SerializedStyles } from "@emotion/core"
import { style } from "./styles"
import { Props } from "@guardian/src-helpers"

interface __COMPONENT_NAME__Props
  extends HTMLAttributes<HTMLDivElement>,
    Props {
  cssOverrides?: SerializedStyles | SerializedStyles[]
  children: string
}

const __COMPONENT_NAME__ = ({
  cssOverrides,
  children,
  ...props
}: __COMPONENT_NAME__Props) => {
  return (
    <div css={[style, cssOverrides]} {...props}>
      {children}
    </div>
  )
}

const defaultProps = {}

__COMPONENT_NAME__.defaultProps = { ...defaultProps }

export { __COMPONENT_NAME__ }
