import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 2rem 0;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
`

const TableHead = styled.thead`
  background-color: var(--primary-light);
  
  th {
    position: sticky;
    top: 0;
    background-color: var(--primary-light);
    z-index: 10;
  }
`

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: var(--background-alt);
  }
`

const TableRow = styled.tr`
  &:hover {
    background-color: var(--primary-light);
  }
`

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--primary-dark);
  border-bottom: 2px solid var(--primary);
  white-space: nowrap;
  
  &:first-child {
    position: sticky;
    left: 0;
    background-color: var(--primary-light);
    z-index: 20;
  }
`

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  
  &:first-child {
    font-weight: 600;
    position: sticky;
    left: 0;
    background-color: inherit;
    z-index: 5;
  }
  
  ${TableRow}:hover &:first-child {
    background-color: var(--primary-light);
  }
`

const FirmnessMeter = styled.div`
  width: 100%;
  height: 8px;
  background-color: var(--background-alt);
  border-radius: var(--radius-lg);
  position: relative;
  
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

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
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

const ViewButton = styled.a`
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--transition);
  display: inline-block;
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`

function ComparisonTable({ mattresses }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Comparison</TableHeader>
            {mattresses.map(mattress => (
              <TableHeader key={mattress.id}>{mattress.name}</TableHeader>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Brand</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.brand}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.type}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Firmness</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                {mattress.firmness < 4 ? 'Soft' : 
                 mattress.firmness < 6 ? 'Medium Soft' :
                 mattress.firmness < 7 ? 'Medium' :
                 mattress.firmness < 8 ? 'Medium Firm' : 'Firm'} 
                ({mattress.firmness}/10)
                <FirmnessMeter value={mattress.firmness} />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Price (Queen)</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(mattress.price)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Trial Period</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.trialPeriod}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Warranty</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.warranty}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Key Features</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.features.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Ideal For</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.idealFor.map((ideal, index) => (
                    <FeatureItem key={index}>{ideal}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Pros</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.pros.slice(0, 3).map((pro, index) => (
                    <FeatureItem key={index}>{pro}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Cons</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.cons.slice(0, 2).map((con, index) => (
                    <FeatureItem key={index}>{con}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Link</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <ViewButton href={mattress.url} target="_blank" rel="noopener noreferrer">
                  View Details
                </ViewButton>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ComparisonTable
