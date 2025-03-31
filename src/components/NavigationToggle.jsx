/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const toggleStyles = css`
  position: relative;
  right: 0;
  display: flex;
  align-items: center;
  height: 30px;
  cursor: pointer;
  z-index: 9999;
  transition: all 0.2s ease;
  padding: 0 8px;
  border-radius: 4px;
  white-space: nowrap;

  &:hover {
    background-color: #e9ecef;
  }

  .toggle-icon {
    font-size: 18px;
    color: #333;
    font-weight: bold;
    margin-right: 5px;
  }

  .toggle-text {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
`

function NavigationToggle({ isExpanded, onToggle }) {
  return (
      <div css={toggleStyles}
      onClick={onToggle}
      role="button"
      aria-label={isExpanded ? "Collapse navigation" : "Expand navigation"}
      tabIndex={0}>
        <span className="toggle-icon">{isExpanded ? '◀' : '▶'}</span>
        <span className="toggle-text">{isExpanded ? 'Collapse Nav' : ''}</span>
      </div>
  )
}

export default NavigationToggle