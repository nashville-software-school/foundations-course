import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLearnerProgress } from '../context/LearnerProgressContext'
import { FaCode, FaBookOpen, FaChartLine } from 'react-icons/fa'
import './IntroPage.css'

// Feature component with CSS animations
function FeatureItem({ icon, title, description, delay, child }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`feature-item ${isVisible ? 'animate-in' : 'hidden'}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="feature-icon">
        {icon}
      </div>
      <h3 className="feature-title">{title}</h3>
      <p>{description}</p>
      <div>{child}</div>
    </div>
  )
}

function IntroPage() {
  const navigate = useNavigate()
  const { markIntroAsSeen } = useLearnerProgress()
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Set loaded state after component mounts to trigger animations
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleStartLearning = () => {
    console.log('Start Learning button clicked');

    // Set the flag directly in localStorage
    try {
      localStorage.setItem('hasSeenIntro', 'true');
      console.log('hasSeenIntro flag set directly in localStorage');
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }

    // Also update the context state
    markIntroAsSeen();
    console.log('After markIntroAsSeen call');

    // Add a URL parameter to indicate the user has seen the intro
    navigate('introduction?hasSeenIntro=true');
  }

  const handlePlayVideo = () => {
    setVideoPlaying(true)
  }

  return (
    <div className="intro-page">
      <div className={`intro-content-container ${isLoaded ? 'animate-in' : ''}`}>
        <div className="intro-header animate-item" style={{ animationDelay: '0.3s' }}>
          <h1 className="intro-title">Nashville Software School Cloud Course</h1>
        </div>

        <button
          className="start-learning-button animate-item"
          onClick={handleStartLearning}
          style={{ animationDelay: '1.2s' }}
        >
          Start Learning!
        </button>
      </div>
    </div>
  )
}

export default IntroPage