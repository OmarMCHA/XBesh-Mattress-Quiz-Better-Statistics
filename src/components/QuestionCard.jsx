import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`

const QuestionHeader = styled.div`
  margin-bottom: 1.5rem;
`

const QuestionTitle = styled.h2`
  margin-bottom: 0.5rem;
  color: var(--text);
`

const QuestionDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 0.5rem;
`

const ScientificNote = styled.div`
  background-color: var(--primary-light);
  border-left: 4px solid var(--primary);
  padding: 1rem;
  border-radius: var(--radius-sm);
  margin-top: 1rem;
  font-size: 0.9rem;
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const OptionCard = styled.div`
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'var(--border)'};
  background-color: ${props => props.selected ? 'var(--primary-light)' : 'white'};
  border-radius: var(--radius-md);
  padding: 1.25rem;
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`

const OptionImage = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OptionLabel = styled.h4`
  margin-bottom: 0.5rem;
  color: var(--text);
`

const OptionDescription = styled.p`
  font-size: 0.875rem;
  color: var(--text-light);
  margin: 0;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--transition);
`

const PrevButton = styled(Button)`
  background-color: var(--background-alt);
  color: var(--text);
  
  &:hover {
    background-color: var(--border);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const NextButton = styled(Button)`
  background-color: var(--primary);
  color: white;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

function QuestionCard({ question, answer, onAnswer, onNext, onPrev, isFirst, isLast }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  useEffect(() => {
    if (answer) {
      if (question.multiSelect) {
        setSelectedOptions(Array.isArray(answer) ? answer : [answer]);
      } else {
        setSelectedOptions([answer]);
      }
    } else {
      setSelectedOptions([]);
    }
  }, [answer, question.multiSelect]);
  
  const handleOptionClick = (optionId) => {
    let newSelectedOptions;
    
    if (question.multiSelect) {
      if (selectedOptions.includes(optionId)) {
        newSelectedOptions = selectedOptions.filter(id => id !== optionId);
      } else {
        newSelectedOptions = [...selectedOptions, optionId];
      }
    } else {
      newSelectedOptions = [optionId];
    }
    
    setSelectedOptions(newSelectedOptions);
    
    if (question.multiSelect) {
      onAnswer(question.id, newSelectedOptions);
    } else {
      onAnswer(question.id, optionId);
    }
  };
  
  const isOptionSelected = (optionId) => {
    return selectedOptions.includes(optionId);
  };
  
  const isNextDisabled = selectedOptions.length === 0;
  
  return (
    <Card>
      <QuestionHeader>
        <QuestionTitle>{question.question}</QuestionTitle>
        <QuestionDescription>{question.description}</QuestionDescription>
        {question.scientificNote && (
          <ScientificNote>
            <strong>Scientific Note:</strong> {question.scientificNote}
          </ScientificNote>
        )}
      </QuestionHeader>
      
      <OptionsGrid>
        {question.options.map(option => (
          <OptionCard 
            key={option.id} 
            selected={isOptionSelected(option.id)}
            onClick={() => handleOptionClick(option.id)}
          >
            <OptionImage>
              <img src={option.image} alt={option.label} />
            </OptionImage>
            <OptionLabel>{option.label}</OptionLabel>
            <OptionDescription>{option.description}</OptionDescription>
          </OptionCard>
        ))}
      </OptionsGrid>
      
      <ButtonContainer>
        <PrevButton onClick={onPrev} disabled={isFirst}>
          Previous
        </PrevButton>
        <NextButton onClick={onNext} disabled={isNextDisabled}>
          {isLast ? 'See Results' : 'Next Question'}
        </NextButton>
      </ButtonContainer>
    </Card>
  )
}

export default QuestionCard
