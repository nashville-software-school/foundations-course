/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const sectionHeaderStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  user-select: none;

  &:hover {
    background: #e9ecef;
  }

  h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.2rem;
  }

  .expand-icon {
    font-size: 1.2rem;
    color: #6c757d;
    transition: transform 0.3s ease;

    &.expanded {
      transform: rotate(180deg);
    }
  }
`

function SectionHeader({ section, isExpanded, onToggle }) {
  return (
    <div
      css={sectionHeaderStyles}
      onClick={onToggle}
      role="button"
      aria-expanded={isExpanded}
      aria-controls={`section-${section.id}-content`}
    >
      <h2>{section.title}</h2>
      <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
        {isExpanded ? '▼' : '▶'}
      </span>
    </div>
  )
}

export default SectionHeader