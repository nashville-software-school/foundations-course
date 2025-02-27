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
    navigate('/github-account?hasSeenIntro=true');
  }

  const handlePlayVideo = () => {
    setVideoPlaying(true)
  }

  return (
    <div className="intro-page">
      <div className="floating-element float-1">{'{ }'}</div>
      <div className="floating-element float-2">{'function()'}</div>
      <div className="floating-element float-3">{'const'}</div>
      <div className="floating-element float-4">{'return'}</div>
      <div className="floating-element float-5">{'Set()'}</div>
      <div className="floating-element float-6">{'Map()'}</div>

      <div className={`content-container ${isLoaded ? 'animate-in' : ''}`}>
        <div className="intro-header animate-item" style={{ animationDelay: '0.3s' }}>
          <h1 className="intro-title">Nashville Software School Foundations Course</h1>
          <p className="intro-subtitle">Your journey to becoming a software developer starts here</p>
        </div>


        <div className="features-container">
          <div className="features-list animate-item" style={{ animationDelay: '0.9s' }}>
            <FeatureItem
              icon={<FaCode />}
              title="Interactive Learning"
              description="Practice coding directly in your browser with our built-in code editor"
              delay={0.1}
            />
            <FeatureItem
              icon={<FaBookOpen />}
              title="Structured Curriculum"
              description="Progress through carefully designed sections and chapters"
              delay={0.2}
            />
            <FeatureItem
              icon={<FaChartLine />}
              title="Track Your Progress"
              description="See your advancement through the course with our progress tracking system"
              child={<div className="progress-bar-container">
                <div className="progress-bar">
                  <div className="progress-bar-fill"></div>
                </div>
              </div>}
              delay={0.3}
            />
          </div>
        </div>


        <div className="video-container animate-item" style={{ animationDelay: '0.7s' }}>
          {!videoPlaying && (
            <div className="video-overlay" onClick={handlePlayVideo}>
              <div className="play-button">
                <div className="play-button-triangle"></div>
              </div>
            </div>
          )}
          <iframe
            src={`https://www.youtube.com/embed/dQw4w9WgXcQ${videoPlaying ? '?autoplay=1' : ''}`}
            title="Course Introduction Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
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