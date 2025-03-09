import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Rotation animation
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #1a1a1a;
  color: #fff;
`;

const TreeContainer = styled.div`
  position: relative;
  width: 800px;
  height: 800px;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const ParentNode = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #2d2d2d;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid #4a4a4a;

  &:hover {
    box-shadow: 0 0 25px rgba(128, 128, 255, 0.3);
  }
`;

const ChildNode = styled.div`
  position: absolute;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #2d2d2d;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  z-index: 1;
  border: 2px solid #4a4a4a;

  ${props => {
    const spacing = 200;
    const verticalOffset = 300;
    const totalWidth = (props.totalNodes - 1) * spacing;
    const left = props.index * spacing - totalWidth / 2;
    
    return `
      top: ${verticalOffset}px;
      left: calc(50% + ${left}px);
      transform: translateX(-50%);
    `;
  }}
  
  ${props => props.isSpinning && `
    animation: ${rotate} 10s linear infinite;
  `}

  &:hover {
    transform: translateX(-50%) scale(1.1);
    box-shadow: 0 0 20px rgba(128, 128, 255, 0.3);
  }
`;

const NodeImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: opacity 0.3s;

  ${ChildNode}:hover & {
    opacity: 1;
  }
`;

const NodeContent = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  h3 {
    color: #8ab4f8;
    margin-bottom: 5px;
    font-size: 1.1em;
  }

  p {
    color: #e8eaed;
    font-size: 0.9em;
  }
  
  ${ChildNode}:hover & {
    opacity: 1;
  }
`;

const Connection = styled.div`
  position: absolute;
  width: 2px;
  background: #4a4a4a;
  z-index: 0;
  transform-origin: top center;

  ${props => {
    const spacing = 200;
    const totalWidth = (props.totalNodes - 1) * spacing;
    const left = props.index * spacing - totalWidth / 2;
    const verticalOffset = 250;
    
    let angle;
    if (props.index === 0) {
      angle = 45;
    } else if (props.index === props.totalNodes - 1) {
      angle = -45;
    } else if (props.index === Math.floor(props.totalNodes / 2) - 1) {
      angle = 15;
    } else if (props.index === Math.floor(props.totalNodes / 2)) {
      angle = -15;
    }

    const dx = left;
    const dy = verticalOffset;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    return `
      height: ${length}px;
      top: 150px;
      left: 50%;
      transform: rotate(${angle}deg);
    `;
  }}

  &::before, &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #8ab4f8;
    left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px rgba(138, 180, 248, 0.5);
  }

  &::before {
    top: -4px;
  }

  &::after {
    bottom: -4px;
  }
`;

function Members() {
  const [currentImage, setCurrentImage] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const members = [
    { 
      position: 'President',
      name: 'Venkatesh ',
      image: 'https://picsum.photos/200?random=1'
    },
    {
      position: 'Secretary',
      name: 'Meenakshi',
      image: 'https://picsum.photos/200?random=2'
    },
    {
      position: 'Treasurer 1',
      name: 'Nandha kumar',
      image: 'https://picsum.photos/200?random=3'
    },
    {
      position: 'Treasurer 2',
      name: 'Harini',
      image: 'https://picsum.photos/200?random=4'
    }
  ];

  const toggleSpin = () => {
    setIsSpinning(!isSpinning);
  };

  return (
    <Container>
      <TreeContainer>
        <ParentNode onClick={toggleSpin}>
          {currentImage ? (
            <NodeImage src={currentImage} alt="Selected member" />
          ) : (
            <NodeImage 
              src="https://picsum.photos/200?random=0" 
              alt="Symposium logo" 
            />
          )}
        </ParentNode>

        {members.map((_, index) => (
          <Connection 
            key={`connection-${index}`} 
            index={index}
            totalNodes={members.length}
            isSpinning={isSpinning}
          />
        ))}
        
        {members.map((member, index) => (
          <ChildNode 
            key={index}
            index={index}
            totalNodes={members.length}
            isSpinning={isSpinning}
            onMouseEnter={() => setCurrentImage(member.image)}
            onMouseLeave={() => setCurrentImage(null)}
          >
            <NodeImage src={member.image} alt={member.name} />
            <NodeContent>
              <h3>{member.position}</h3>
              <p>{member.name}</p>
            </NodeContent>
          </ChildNode>
        ))}
      </TreeContainer>
    </Container>
  );
}

export default Members;
