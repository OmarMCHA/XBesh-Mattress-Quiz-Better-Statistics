import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useQuiz } from '../context/QuizContext'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`

const QuizTitle = styled.h1`
  margin-bottom: 1rem;
`

const QuizDescription = styled.p`
  color: var(--text-light);
`

function Quiz() {
  const navigate = useNavigate()
  const { 
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    quizCompleted,
    handleAnswer,
    nextQuestion,
    prevQuestion
  } = useQuiz()
  
  useEffect(() => {
    if (quizCompleted) {
      navigate('/results')
    }
  }, [quizCompleted, navigate])
  
  return (
    <QuizContainer>
      <QuizHeader>
        <QuizTitle>Mattress Firmness Quiz</QuizTitle>
        <QuizDescription>
          Answer the following questions to find your ideal mattress firmness and type.
        </QuizDescription>
      </QuizHeader>
      
      <ProgressBar 
        current={currentQuestionIndex}
        total={totalQuestions}
        progress={progress}
      />
      
      <QuestionCard 
        question={currentQuestion}
        answer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === totalQuestions - 1}
      />
    </QuizContainer>
  )
}

export default Quiz
