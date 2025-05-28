import React from 'react'
import styled from 'styled-components'

const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 2rem;
`

const ProgressTrack = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: var(--primary-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--primary);
  border-radius: var(--radius-lg);
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-light);
`

function ProgressBar({ current, total, progress }) {
  return (
    <ProgressContainer>
      <ProgressTrack>
        <ProgressFill progress={progress} />
      </ProgressTrack>
      <ProgressInfo>
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </ProgressInfo>
    </ProgressContainer>
  )
}

export default ProgressBar
