/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { useLearnerProgress } from '../context/LearnerProgressContext'

const introPageStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f9f5ee;
  text-align: center;

  .intro-header {
    margin-bottom: 2rem;
  }

  .intro-title {
    font-size: 2.5rem;
    color: rgb(46, 64, 97);
    margin-bottom: 1rem;
  }

  .intro-subtitle {
    font-size: 1.2rem;
    color: #666;
  }

  .intro-content {
    max-width: 800px;
    margin: 2rem 0;
    line-height: 1.6;
    color: #333;
  }

  .video-container {
    width: 100%;
    max-width: 800px;
    margin: 2rem 0;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .video-container iframe {
    width: 100%;
    aspect-ratio: 16/9;
    border: none;
  }

  .features-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;
  }

  .feature-item {
    flex-basis: 250px;
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .feature-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: rgb(46, 64, 97);
  }

  .start-learning-button {
    padding: 1rem 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: rgb(46, 64, 97);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 2rem;
  }

  .start-learning-button:hover {
    background-color: rgb(70, 90, 126);
  }
`

function IntroPage() {
  const navigate = useNavigate()
  const { markIntroAsSeen } = useLearnerProgress()

  const handleStartLearning = () => {
    markIntroAsSeen()
    navigate('/github-account')
  }

  return (
    <div css={introPageStyles}>
      <div className="intro-header">
        <h1 className="intro-title">Nashville Software School Foundations Course</h1>
        <p className="intro-subtitle">Your journey to becoming a software developer starts here</p>
      </div>

      <div className="intro-content">
        <p>
          The Foundations Course is designed to help you build a solid foundation in programming
          concepts and JavaScript fundamentals. Through interactive lessons and hands-on exercises,
          you'll develop the skills needed to begin your software development career.
        </p>
      </div>

      <div className="video-container">
        {/* Replace with your actual video embed code */}
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Course Introduction Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <div className="features-list">
        <div className="feature-item">
          <h3 className="feature-title">Interactive Learning</h3>
          <p>Practice coding directly in your browser with our built-in code editor</p>
        </div>
        <div className="feature-item">
          <h3 className="feature-title">Structured Curriculum</h3>
          <p>Progress through carefully designed sections and chapters</p>
        </div>
        <div className="feature-item">
          <h3 className="feature-title">Track Your Progress</h3>
          <p>See your advancement through the course with our progress tracking system</p>
        </div>
      </div>

      <button
        className="start-learning-button"
        onClick={handleStartLearning}
      >
        Start Learning!
      </button>
    </div>
  )
}

export default IntroPage