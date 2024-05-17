import React from 'react';
import { ListGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
  return (
    <ListGroup horizontal={orientation === 'horizontal'}>
      {steps.map(step => {
        let iconClass = 'bi bi-circle';
        if (step.hasError) {
          iconClass = 'bi bi-exclamation-circle text-danger';
        } else if (step.isComplete) {
          iconClass = 'bi bi-check-circle';
        }

        return (
          <OverlayTrigger
            key={step.id}
            placement="top"
            overlay={<Tooltip id={`tooltip-${step.id}`}>{step.title}</Tooltip>}
          >
            <ListGroup.Item
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`${step.id === activeStepId ? 'active-step' : ''}`}
              style={{ cursor: 'pointer' }}
            >
              <i className={iconClass} aria-label={`${step.label} icon`} />
              <span className={`${step.hasError ? 'text-danger' : ''}`}>{step.label}</span>
            </ListGroup.Item>
          </OverlayTrigger>
        );
      })}
    </ListGroup>
  );
};

export default StepIndicator;
