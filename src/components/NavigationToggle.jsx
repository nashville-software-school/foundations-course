/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const toggleStyles = css`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 15px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999;
  transition: all 0.2s ease;

  &:hover {
    border: 1px solid #ccc;
  }

  .toggle-icon {
    font-size: 18px;
    color: #fff;
    font-weight: bold;
  }
`

function NavigationToggle({ isExpanded, onToggle }) {
  return (
      <div className="toggle-icon" css={toggleStyles}
      onClick={onToggle}
      role="button"
      aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      tabIndex={0}>
        {isExpanded ? '◀' : '▶'}
      </div>
  )
}

export default NavigationToggle