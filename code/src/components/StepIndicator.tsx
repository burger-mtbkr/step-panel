import React from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import './StepIndicator.css';

export interface Step {
  id: string;
  icon: string;
  label: string;
  title: string;
  hasError: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
  activeStepId: string | undefined;
  onStepClick?: (id: string) => void;
  orientation?: 'vertical' | 'horizontal';
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, activeStepId, onStepClick, orientation = 'vertical' }) => {
  return (
    <ListGroup className={`step-indicator ${orientation}`}>
      {steps.map((step) => {
        const isActive = step.id === activeStepId;
        const stepClass = isActive ? 'active' : '';
        const errorClass = step.hasError ? 'has-error' : '';
        
        return (
          <ListGroup.Item 
            key={step.id} 
            className={`step ${stepClass} ${errorClass}`} 
            onClick={() => onStepClick && onStepClick(step.id)}
          >
            <div className="step-icon">
              {/* TODO Set correct icon complete | error | todo */}
              {step.hasError ? <i className="bi bi-exclamation-circle"></i> : (isActive ? <i className="bi bi-check-circle"></i> : <i className={step.icon}></i>)}
            </div>
            <div className="step-label" title={step.title}>
              {step.label}
              {step.hasError && <Badge bg="danger">Error</Badge>}
            </div>
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
};

export default StepIndicator;
