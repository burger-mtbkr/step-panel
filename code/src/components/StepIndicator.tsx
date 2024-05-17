import React from 'react';
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
  activeStepId: string | undefined;
  onStepClick?: (id: string) => void;
  orientation?: 'vertical' | 'horizontal';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  activeStepId,
  onStepClick,
  orientation = 'vertical',
  collapsed = false,
  onToggleCollapse,
}) => {
  return (
    <div className={`step-indicator ${collapsed ? 'collapsed' : ''} ${orientation}`}>
      {orientation === 'vertical' && (
        <div className="toggle-container">
          <button
            className="toggle-button"
            onClick={onToggleCollapse}
            aria-label="Toggle Panel"
          >
            <i className={`bi ${collapsed ? 'bi-arrow-bar-right' : 'bi-arrow-bar-left'}`}></i>
          </button>
        </div>
      )}
      <ListGroup horizontal={orientation === 'horizontal'} className="step-list">
        {!collapsed &&
          steps.map((step) => {
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
    </div>
  );
};

export default StepIndicator;
