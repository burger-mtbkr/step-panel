import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './StepPanel.css';

export interface Step {
  id: string;
  icon: string;
  label: string;
  title: string;
  hasError: boolean;
  isComplete?: boolean;
  group: string; // New property for grouping steps
}

export interface StepPanelProps {
  steps: Step[];
  activeStepId: string | undefined;
  onStepClick?: (id: string) => void;
  orientation?: 'vertical' | 'horizontal';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  overallStatusIcon: string; // New property for overall status icon
  overallTitle: string; // New property for overall title
}

const StepPanel: React.FC<StepPanelProps> = ({
  steps,
  activeStepId,
  onStepClick,
  orientation = 'vertical',
  collapsed = false,
  onToggleCollapse,
  overallStatusIcon,
  overallTitle,
}) => {
  const groupedSteps = steps.reduce((acc, step) => {
    if (!acc[step.group]) acc[step.group] = [];
    acc[step.group].push(step);
    return acc;
  }, {} as Record<string, Step[]>);

  const groupHasError = (group: Step[]) => group.some(step => step.hasError);
  const groupIsComplete = (group: Step[]) => group.every(step => step.isComplete);

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
          <div className="overall-title">
            <i className={`bi ${overallStatusIcon}`} aria-label="Overall Status Icon" />
            <span>{overallTitle}</span>
          </div>
        </div>
      )}
      <ListGroup horizontal={orientation === 'horizontal'} className="step-list">
        {!collapsed &&
          Object.entries(groupedSteps).map(([group, steps]) => (
            <div key={group}>
              <div className={`group-title ${groupHasError(steps) ? 'text-danger' : ''}`}>
                {group}
              </div>
              {steps.map((step) => {
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
            </div>
          ))}
      </ListGroup>
    </div>
  );
};

export default StepPanel;
