/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useLearnerProgress } from '../context/LearnerProgressContext'

const globalProgressStyles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;

  .progress-container {
    width: 95%;
    height: 8px;
    background: #e9ecef;
    border-radius: 4px;
    position: relative;
    margin-bottom: 1rem;
  }

  .progress-bar {
    height: 100%;
    background: #28a745;
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .stars-container {
    width: 77%;
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: -1.9rem;
    margin-left: 20%;
  }

  .star-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .star {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 50%;
    border: 2px solid #dee2e6;
    color: #adb5bd;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    z-index: 2;
  }

  .star.filled {
    border-color:rgb(180, 170, 62);
    color:rgb(229, 224, 84);
  }

  .star.gold {
    border-color: #ffc107;
    color: #ffc107;
    background-color: #fff8e5;
  }

  .star-label {
    font-size: 0.75rem;
    color:rgb(233, 237, 241);
    text-align: center;
    max-width: 80px;
    transition: color 0.3s ease;
  }

  .star--large {
    width: 32px;
    height: 32px;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .star-label.active {
    color:rgb(243, 248, 109);
    font-weight: 500;
  }
`

function GlobalProgressBar() {
  const { getGlobalProgress } = useLearnerProgress()
  const { percentage, level } = getGlobalProgress()

  // Define the star labels
  const starLabels = ['Initiate', 'Scribe', 'Wright', 'Forger', 'Architect']

  // Determine if a star should be filled or gold
  const getStarStatus = (starIndex) => {
    if (level > starIndex) {
      return 'filled '
    } else if (level === starIndex && percentage === 100) {
      return 'gold'
    }
    return ''
  }

  return (
    <div css={globalProgressStyles}>
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="stars-container">
        {starLabels.map((label, index) => (
          <div key={index} className="star-marker">
            <div className={`star ${getStarStatus(index)}`}>★</div>
            <div className={`star-label ${level >= index ? 'active' : ''}`}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GlobalProgressBar