import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import './StepIndicator.css';

export interface Step {
  id: string;
  icon: string;
  label: string;
  title: string;
  hasError: boolean;
  isComplete?: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
  activeStepId: string;
  onStepClick?: (id: string) => void;
  orientation?: 'vertical' | 'horizontal';
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, activeStepId, onStepClick, orientation = 'vertical' }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`step-indicator ${collapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={toggleCollapsed}>
        <i className="bi bi-list"></i>
      </button>
      {!collapsed && (
        <ListGroup horizontal={orientation === 'horizontal'} className="step-list">
          {steps.map(step => {
            let iconClass = 'bi bi-circle';
            if (step.hasError) {
              iconClass = 'bi bi-exclamation-circle text-danger';
            } else if (step.isComplete) {
              iconClass = 'bi bi-check-circle';
            }

            return (
              <ListGroup.Item
                key={step.id}
                onClick={() => onStepClick && onStepClick(step.id)}
                className={`${step.id === activeStepId ? 'active-step' : ''}`}
                title={step.title}
                style={{ cursor: 'pointer' }}
              >
                <i className={iconClass} aria-label={`${step.label} icon`} />
                <span className={`${step.hasError ? 'text-danger' : ''} step-label`}>{step.label}</span>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </div>
  );
};

export default StepIndicator;
