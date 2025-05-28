import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useQuiz } from '../context/QuizContext'
import MattressCard from '../components/MattressCard'
import ComparisonTable from '../components/ComparisonTable'

const ResultsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const ResultsHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

const ResultsTitle = styled.h1`
  margin-bottom: 1rem;
`

const ResultsDescription = styled.p`
  color: var(--text-light);
  max-width: 800px;
  margin: 0 auto;
`

const UserProfile = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: var(--shadow-md);
`

const ProfileTitle = styled.h2`
  margin-bottom: 1.5rem;
`

const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
`

const ProfileItem = styled.div`
  background-color: var(--background-alt);
  border-radius: var(--radius-md);
  padding: 1.25rem;
`

const ProfileLabel = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1rem;
`

const ProfileValue = styled.p`
  color: var(--primary);
  font-weight: 600;
  margin: 0;
`

const RecommendationSummary = styled.div`
  background-color: var(--primary-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 3rem;
  text-align: center;
`

const SummaryTitle = styled.h2`
  margin-bottom: 1rem;
`

const SummaryDescription = styled.p`
  max-width: 800px;
  margin: 0 auto 1.5rem;
`

const RecommendationDetails = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`

const RecommendationDetail = styled.div`
  background-color: white;
  border-radius: var(--radius-md);
  padding: 1.25rem 2rem;
  min-width: 200px;
`

const DetailLabel = styled.h4`
  margin-bottom: 0.5rem;
  font-size: 1rem;
`

const DetailValue = styled.p`
  color: var(--primary);
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
`

const SectionTitle = styled.h2`
  margin-bottom: 2rem;
`

const MattressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const ComparisonSection = styled.div`
  margin-bottom: 3rem;
`

const ExplanationSection = styled.div`
  margin-bottom: 3rem;
`

const ExplanationCard = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
`

const ExplanationTitle = styled.h3`
  margin-bottom: 1.5rem;
`

const ExplanationText = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
`

const FactorsList = styled.ul`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`

const FactorItem = styled.li`
  margin-bottom: 0.75rem;
  
  strong {
    color: var(--primary-dark);
  }
`

const NextStepsSection = styled.div`
  background-color: var(--primary-light);
  border-radius: var(--radius-lg);
  padding: 2rem;
  margin-bottom: 3rem;
`

const NextStepsList = styled.ol`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`

const NextStepItem = styled.li`
  margin-bottom: 1rem;
`

const RestartButton = styled.button`
  background-color: var(--primary);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition);
  
  &:hover {
    background-color: var(--primary-dark);
  }
`

function Results() {
  const navigate = useNavigate()
  const { results, resetQuiz } = useQuiz()
  
  useEffect(() => {
    if (!results) {
      navigate('/quiz')
    }
  }, [results, navigate])
  
  if (!results) {
    return null
  }
  
  const { 
    recommendedFirmness, 
    recommendedType, 
    topFeatures, 
    mattresses, 
    userProfile 
  } = results
  
  const formatSleepPosition = (position) => {
    switch (position) {
      case 'side': return 'Side Sleeper'
      case 'back': return 'Back Sleeper'
      case 'stomach': return 'Stomach Sleeper'
      case 'combination': return 'Combination Sleeper'
      default: return position
    }
  }
  
  const formatWeight = (weight) => {
    switch (weight) {
      case 'light': return 'Lightweight (Under 130 lbs)'
      case 'average': return 'Average Weight (130-230 lbs)'
      case 'heavy': return 'Heavyweight (Over 230 lbs)'
      default: return weight
    }
  }
  
  const formatPainPoints = (painPoints) => {
    if (!painPoints || painPoints.length === 0) return 'None'
    if (painPoints.includes('none')) return 'No Pain Issues'
    
    const painMap = {
      back: 'Back Pain',
      shoulder: 'Shoulder Pain',
      hip: 'Hip Pain',
      lowerBack: 'Lower Back Pain',
      shoulderHip: 'Shoulder/Hip Pain',
      neck: 'Neck Pain'
    }
    
    return painPoints.map(pain => painMap[pain] || pain).join(', ')
  }
  
  const formatTemperature = (temp) => {
    switch (temp) {
      case 'hot': return 'Hot Sleeper'
      case 'cold': return 'Cold Sleeper'
      case 'neutral': return 'Neutral Temperature'
      default: return temp
    }
  }
  
  const formatPartnerMovement = (movement) => {
    switch (movement) {
      case 'very': return 'Very Sensitive'
      case 'somewhat': return 'Somewhat Sensitive'
      case 'not': return 'Not Sensitive'
      case 'na': return 'Not Applicable (Sleep Alone)'
      default: return movement
    }
  }
  
  const formatPreferredFeel = (feel) => {
    switch (feel) {
      case 'soft': return 'Soft and Plush'
      case 'balanced': return 'Balanced Feel'
      case 'firm': return 'Firm and Supportive'
      case 'bouncy': return 'Bouncy and Responsive'
      case 'sinking': return 'Deep Contouring'
      case 'responsive': return 'Quick Response'
      default: return feel
    }
  }
  
  const formatFirmness = (firmness) => {
    switch (firmness) {
      case 'soft': return 'Soft (3-4/10)'
      case 'mediumSoft': return 'Medium-Soft (4-5/10)'
      case 'medium': return 'Medium (5-6/10)'
      case 'mediumFirm': return 'Medium-Firm (6-7/10)'
      case 'firm': return 'Firm (7-8/10)'
      default: return firmness
    }
  }
  
  const formatType = (type) => {
    switch (type) {
      case 'memory': return 'Memory Foam'
      case 'latex': return 'Latex'
      case 'innerspring': return 'Innerspring'
      case 'hybrid': return 'Hybrid'
      case 'airbed': return 'Airbed'
      case 'organic': return 'Organic'
      default: return type
    }
  }
  
  const formatFeature = (feature) => {
    switch (feature) {
      case 'cooling': return 'Cooling Properties'
      case 'pressureRelief': return 'Pressure Relief'
      case 'edgeSupport': return 'Edge Support'
      case 'motionIsolation': return 'Motion Isolation'
      case 'backSupport': return 'Back Support'
      case 'durability': return 'Durability'
      case 'hypoallergenic': return 'Hypoallergenic'
      case 'ecoFriendly': return 'Eco-Friendly'
      case 'adjustable': return 'Adjustable'
      default: return feature
    }
  }
  
  const handleRestart = () => {
    resetQuiz()
    navigate('/')
  }
  
  return (
    <ResultsContainer>
      <ResultsHeader>
        <ResultsTitle>Your Personalized Mattress Recommendations</ResultsTitle>
        <ResultsDescription>
          Based on your sleep profile, we've analyzed the best mattresses for your specific needs. Here are your personalized recommendations.
        </ResultsDescription>
      </ResultsHeader>
      
      <UserProfile>
        <ProfileTitle>Your Sleep Profile</ProfileTitle>
        <ProfileGrid>
          <ProfileItem>
            <ProfileLabel>Sleep Position</ProfileLabel>
            <ProfileValue>{formatSleepPosition(userProfile.sleepPosition)}</ProfileValue>
          </ProfileItem>
          
          <ProfileItem>
            <ProfileLabel>Body Type</ProfileLabel>
            <ProfileValue>{formatWeight(userProfile.weight)}</ProfileValue>
          </ProfileItem>
          
          <ProfileItem>
            <ProfileLabel>Pain Points</ProfileLabel>
            <ProfileValue>{formatPainPoints(userProfile.painPoints)}</ProfileValue>
          </ProfileItem>
          
          <ProfileItem>
            <ProfileLabel>Temperature</ProfileLabel>
            <ProfileValue>{formatTemperature(userProfile.temperature)}</ProfileValue>
          </ProfileItem>
          
          <ProfileItem>
            <ProfileLabel>Movement Sensitivity</ProfileLabel>
            <ProfileValue>{formatPartnerMovement(userProfile.partnerMovement)}</ProfileValue>
          </ProfileItem>
          
          <ProfileItem>
            <ProfileLabel>Preferred Feel</ProfileLabel>
            <ProfileValue>{formatPreferredFeel(userProfile.mattressFeel || userProfile.preferredFirmness)}</ProfileValue>
          </ProfileItem>
        </ProfileGrid>
      </UserProfile>
      
      <RecommendationSummary>
        <SummaryTitle>Your Ideal Mattress</SummaryTitle>
        <SummaryDescription>
          Based on your sleep profile, we've determined the following mattress characteristics would be ideal for your needs:
        </SummaryDescription>
        <RecommendationDetails>
          <RecommendationDetail>
            <DetailLabel>Recommended Firmness</DetailLabel>
            <DetailValue>{formatFirmness(recommendedFirmness)}</DetailValue>
          </RecommendationDetail>
          
          <RecommendationDetail>
            <DetailLabel>Recommended Type</DetailLabel>
            <DetailValue>{formatType(recommendedType)}</DetailValue>
          </RecommendationDetail>
          
          <RecommendationDetail>
            <DetailLabel>Key Features</DetailLabel>
            <DetailValue>{topFeatures.map(formatFeature).join(', ')}</DetailValue>
          </RecommendationDetail>
        </RecommendationDetails>
      </RecommendationSummary>
      
      <div>
        <SectionTitle>Top Recommended Mattresses</SectionTitle>
        <MattressGrid>
          {mattresses.map((mattress, index) => (
            <MattressCard 
              key={mattress.id} 
              mattress={mattress} 
              matchRank={index}
            />
          ))}
        </MattressGrid>
      </div>
      
      <ComparisonSection>
        <SectionTitle>Side-by-Side Comparison</SectionTitle>
        <ComparisonTable mattresses={mattresses} />
      </ComparisonSection>
      
      <ExplanationSection>
        <SectionTitle>Why These Recommendations?</SectionTitle>
        <ExplanationCard>
          <ExplanationTitle>The Science Behind Your Recommendations</ExplanationTitle>
          <ExplanationText>
            Our mattress recommendations are based on scientific research in sleep ergonomics, biomechanics, and thermal regulation. We've analyzed your specific sleep profile to determine the optimal mattress characteristics for your needs.
          </ExplanationText>
          
          <ExplanationText>
            Here's why these specific mattresses were recommended for you:
          </ExplanationText>
          
          <FactorsList>
            <FactorItem>
              <strong>Sleep Position:</strong> As a {formatSleepPosition(userProfile.sleepPosition)}, you need {recommendedFirmness === 'soft' || recommendedFirmness === 'mediumSoft' ? 'softer surfaces to relieve pressure on your shoulders and hips' : recommendedFirmness === 'medium' ? 'balanced support that accommodates multiple positions' : 'firmer support to maintain proper spinal alignment'}.
            </FactorItem>
            
            <FactorItem>
              <strong>Body Type:</strong> Your {userProfile.weight} body type means you {userProfile.weight === 'light' ? 'don\'t sink as deeply into mattresses, so softer surfaces provide better contouring' : userProfile.weight === 'average' ? 'benefit from medium firmness that balances support and comfort' : 'need firmer support to prevent excessive sinking and maintain proper alignment'}.
            </FactorItem>
            
            {userProfile.painPoints && userProfile.painPoints.length > 0 && !userProfile.painPoints.includes('none') && (
              <FactorItem>
                <strong>Pain Points:</strong> Your reported {formatPainPoints(userProfile.painPoints)} can be addressed with {topFeatures.includes('pressureRelief') ? 'pressure-relieving materials that contour to your body' : topFeatures.includes('backSupport') ? 'enhanced lumbar support and proper spinal alignment' : 'the right balance of support and comfort'}.
              </FactorItem>
            )}
            
            <FactorItem>
              <strong>Temperature Preference:</strong> As a {formatTemperature(userProfile.temperature)} sleeper, you'll benefit from {userProfile.temperature === 'hot' ? 'cooling technologies and breathable materials' : userProfile.temperature === 'cold' ? 'heat-retaining materials like traditional memory foam' : 'balanced temperature regulation'}.
            </FactorItem>
            
            {userProfile.partnerMovement !== 'na' && (
              <FactorItem>
                <strong>Partner Movement:</strong> Your {formatPartnerMovement(userProfile.partnerMovement)} to partner movement means you need {userProfile.partnerMovement === 'very' ? 'excellent motion isolation, typically found in memory foam mattresses' : userProfile.partnerMovement === 'somewhat' ? 'good motion isolation with responsive materials' : 'minimal motion isolation properties'}.
              </FactorItem>
            )}
            
            <FactorItem>
              <strong>Personal Preference:</strong> Your preference for a {formatPreferredFeel(userProfile.mattressFeel || userProfile.preferredFirmness)} mattress was factored into our recommendations to ensure you'll enjoy the feel of your new mattress.
            </FactorItem>
          </FactorsList>
          
          <ExplanationText>
            The recommended mattresses balance these factors to provide the optimal sleep surface for your unique needs. Each mattress has been selected for its quality construction, durability, and ability to address your specific requirements.
          </ExplanationText>
        </ExplanationCard>
      </ExplanationSection>
      
      <NextStepsSection>
        <SectionTitle>Next Steps</SectionTitle>
        <NextStepsList>
          <NextStepItem>
            <strong>Review the detailed mattress comparisons</strong> to understand the specific features, pros, and cons of each recommended mattress.
          </NextStepItem>
          <NextStepItem>
            <strong>Consider your budget and priorities</strong> when making your final decision. While all recommended mattresses meet your sleep needs, they vary in price and specific features.
          </NextStepItem>
          <NextStepItem>
            <strong>Check the trial periods and return policies</strong> of your chosen mattress. Most quality mattresses come with sleep trials of at least 100 nights, allowing you to test the mattress in your home.
          </NextStepItem>
          <NextStepItem>
            <strong>Remember that adjustment takes time</strong>. It can take 30 days or more for your body to fully adjust to a new mattress, especially if you're switching to a different type or firmness level.
          </NextStepItem>
        </NextStepsList>
        
        <div style={{ textAlign: 'center' }}>
          <RestartButton onClick={handleRestart}>
            Retake the Quiz
          </RestartButton>
        </div>
      </NextStepsSection>
    </ResultsContainer>
  )
}

export default Results
