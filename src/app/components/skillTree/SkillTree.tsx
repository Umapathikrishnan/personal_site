'use client';

import React, { useEffect, useRef, useState } from 'react';
import './SkillTree.css'; // Import external CSS

const skills = [
  { name: 'HTML', x: 0, y: 0, status: 'unlocked', progress: 100, desc: 'Markup language for structuring content.' },
  { name: 'CSS', x: 1, y: 0, status: 'unlocked', progress: 100, desc: 'Stylesheet for design and layout.' },
  { name: 'JavaScript', x: 2, y: 0, status: 'partial', progress: 80, desc: 'Core scripting language for web.' },
  { name: 'React', x: 1, y: 1, status: 'partial', progress: 60, desc: 'Frontend library for building UIs.' },
  { name: 'Node.js', x: 3, y: 0, status: 'locked', progress: 0, desc: 'Backend runtime for JS.' },
  { name: 'MongoDB', x: 2, y: 1, status: 'locked', progress: 0, desc: 'NoSQL document database.' },
  { name: 'Docker', x: 4, y: 0, status: 'locked', progress: 0, desc: 'Tool for containerizing apps.' },
];

const hexSize = 120; // Size of each hexagon

function calculateHexPosition(x: number, y: number) {
  const offsetX = x * (hexSize * 1.25);
  const offsetY = y * ((hexSize * Math.sqrt(3)) / 2);
  if (y % 2 !== 0) {
    return { x: offsetX + hexSize / 2, y: offsetY };
  }
  return { x: offsetX, y: offsetY };
}

export const SkillTree = () => {
  const treeRef = useRef<HTMLDivElement>(null);
  const nodeContainerRef = useRef<HTMLDivElement>(null);
  const [isScreenDragEnabled, setIsScreenDragEnabled] = useState(false);
  const [treeOffset, setTreeOffset] = useState({ x: 0, y: 0 });
  const [modalSkill, setModalSkill] = useState<{ name: string; desc: string } | null>(null);

  const handleMouseDownNode = (e: React.MouseEvent<HTMLDivElement>, node: HTMLDivElement) => {
    if (!isScreenDragEnabled) {
        let lastX = e.clientX;
        let lastY = e.clientY;
        
        const handleMouseMove = (moveEvent: MouseEvent) => {
          const dx = moveEvent.clientX - lastX;
          const dy = moveEvent.clientY - lastY;
          setTreeOffset(prev => ({
            x: prev.x + dx,
            y: prev.y + dy,
          }));
          lastX = moveEvent.clientX;
          lastY = moveEvent.clientY;
        };
        
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleScreenDragMouseDown = (e: React.MouseEvent) => {
    if (isScreenDragEnabled && nodeContainerRef.current) {
      const startX = e.clientX;
      const startY = e.clientY;
      const handleMouseMove = (moveEvent: MouseEvent) => {
        setTreeOffset(prev => ({
          x: prev.x + moveEvent.clientX - startX,
          y: prev.y + moveEvent.clientY - startY,
        }));
      };
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return (
    <div className="skill-tree-wrapper">
      <div id="skillTree" ref={treeRef} className="skill-tree">
        <div
          ref={nodeContainerRef}
          className="node-container"
          style={{ transform: `translate(${treeOffset.x}px, ${treeOffset.y}px)` }}
          onMouseDown={handleScreenDragMouseDown}
        >
          {skills.map((skill, index) => {
            const { x, y } = calculateHexPosition(skill.x, skill.y);
            return (
              <div
                key={index}
                className={`node ${
                  skill.status === 'unlocked'
                    ? 'unlocked'
                    : skill.status === 'partial'
                    ? 'partial'
                    : 'locked'
                }`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                onMouseDown={e => handleMouseDownNode(e, e.currentTarget)}
                onClick={() => setModalSkill({ name: skill.name, desc: skill.desc })}
              >
                <div className="node-background"></div>
                <div
                  className="progress-circle"
                  style={{
                    transform: `scale(2) rotate(${(skill.progress / 100) * 360}deg)`,
                  }}
                ></div>
                {skill.status === 'unlocked' && <div className="ripple"></div>}
                <span>{skill.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {modalSkill && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modalSkill.name}</h2>
            <p>{modalSkill.desc}</p>
            <button className="close-btn" onClick={() => setModalSkill(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};
