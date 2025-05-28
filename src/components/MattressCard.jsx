import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
  }
`

const ImageContainer = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`

const MatchBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: var(--primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.875rem;
`

const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`

const Header = styled.div`
  margin-bottom: 1rem;
`

const Title = styled.h3`
  margin-bottom: 0.25rem;
`

const Brand = styled.p`
  color: var(--text-light);
  font-size: 0.875rem;
  margin: 0;
`

const Details = styled.div`
  margin-bottom: 1rem;
  flex: 1;
`

const DetailRow = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
`

const DetailLabel = styled.span`
  font-weight: 500;
  min-width: 100px;
`

const DetailValue = styled.span`
  color: var(--text-light);
`

const FirmnessMeter = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--background-alt);
  border-radius: var(--radius-lg);
  position: relative;
  margin-top: 0.25rem;
  
  &::after {
    content: '';
    position: absolute;
    height: 16px;
    width: 8px;
    background-color: var(--primary);
    border-radius: 4px;
    top: 50%;
    left: ${props => (props.value / 10) * 100}%;
    transform: translate(-50%, -50%);
  }
`

const FirmnessLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--text-light);
  margin-top: 0.25rem;
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--primary);
    margin-right: 0.5rem;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`

const Price = styled.div`
  font-weight: 700;
  font-size: 1.25rem;
`

const ViewButton = styled.a`
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--transition);
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`

function MattressCard({ mattress, matchRank }) {
  // Format price with commas
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(mattress.price);
  
  // Get top 3 features
  const topFeatures = mattress.features.slice(0, 3);
  
  return (
    <Card>
      <ImageContainer>
        <Image src={mattress.image} alt={mattress.name} />
        {matchRank === 0 && <MatchBadge>Best Match</MatchBadge>}
      </ImageContainer>
      
      <Content>
        <Header>
          <Title>{mattress.name}</Title>
          <Brand>{mattress.brand} • {mattress.type}</Brand>
        </Header>
        
        <Details>
          <DetailRow>
            <DetailLabel>Firmness:</DetailLabel>
            <DetailValue>
              {mattress.firmness < 4 ? 'Soft' : 
               mattress.firmness < 6 ? 'Medium Soft' :
               mattress.firmness < 7 ? 'Medium' :
               mattress.firmness < 8 ? 'Medium Firm' : 'Firm'} 
              ({mattress.firmness}/10)
            </DetailValue>
          </DetailRow>
          <FirmnessMeter value={mattress.firmness} />
          <FirmnessLabels>
            <span>Soft</span>
            <span>Medium</span>
            <span>Firm</span>
          </FirmnessLabels>
          
          <DetailRow>
            <DetailLabel>Trial Period:</DetailLabel>
            <DetailValue>{mattress.trialPeriod}</DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Warranty:</DetailLabel>
            <DetailValue>{mattress.warranty}</DetailValue>
          </DetailRow>
          
          <FeaturesList>
            {topFeatures.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>
        </Details>
        
        <Footer>
          <Price>{formattedPrice}</Price>
          <ViewButton href={mattress.url} target="_blank" rel="noopener noreferrer">View Details</ViewButton>
        </Footer>
      </Content>
    </Card>
  )
}

export default MattressCard
