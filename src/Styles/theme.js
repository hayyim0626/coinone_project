import { css } from "styled-components";
const theme = {
  up: "#e12343",
  down: "#1763b6",

  text: (size = null, weight = null, color = null) => {
    return css`
      font-size: ${size};
      font-weight: ${weight};
      color: ${color};
    `;
  },

  space: (
    verticalMargin = null,
    horizonMargin = null,
    verticalPadding = null,
    horizonPadding = null
  ) => {
    return css`
      margin: ${verticalMargin} ${horizonMargin};
      padding: ${verticalPadding} ${horizonPadding};
    `;
  },

  flex: (justify = null, align = null, direction = null) => {
    return css`
      display: flex;
      justify-content: ${justify};
      align-items: ${align};
      flex-direction: ${direction};
    `;
  },

  border: (
    lineWeight = null,
    lineType = null,
    lineColor = null,
    backgroundColor = null,
    borderRadius = null,
    shadow = null
  ) => css`
    border: ${lineWeight} ${lineType} ${lineColor};
    background-color: ${backgroundColor};
    border-radius: ${borderRadius};
    box-shadow: ${shadow};
  `,

  whiteBox: (
    area = null,
    colStart = null,
    colEnd = null,
    rowStart = null,
    rowEnd = null
  ) => css`
    grid-area: ${area};
    grid-column-start: ${colStart};
    grid-column-end: ${colEnd};
    grid-row-start: ${rowStart};
    grid-row-end: ${rowEnd};
    display: block;
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid #efefef;
    border-radius: 8px;
    box-shadow: 0 3px 10px 0 rgba(66, 66, 66, 0.05);
  `,
};

export default theme;
