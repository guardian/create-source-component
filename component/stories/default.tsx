import React from "react"
import { css } from "@emotion/core"
import { Select, Option } from "../index"

const constrainedWith = css`
  width: 100%;
  ${from.phablet} {
    width: 25em;
  }
`

export const defaultLight = () => (
  <div css={constrainedWith}>
    <Select label="State">
      <Option value="">Select a state</Option>
      <Option value="al">Alabama</Option>
      <Option value="ca">California</Option>
    </Select>
  </div>
)

defaultLight.story = {
  name: "default light",
}
