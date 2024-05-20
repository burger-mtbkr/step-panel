import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import './form-step-panel.css';

export interface Step {
  id: string;
  icon: string;
  label: string;
  title: string;
  hasError: boolean;
  isComplete?: boolean;
  group: string;
}

export interface FormStepPanelProps {
  steps: Step[];
  activeStepId?: string;
  onStepClick?: (id: string) => void;
  orientation?: 'vertical' | 'horizontal';
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  overallStatusIcon: string;
  overallTitle: string;
}

const FormStepPanel: React.FC<FormStepPanelProps> = ({
  steps,
  activeStepId,
  onStepClick,
  orientation = 'vertical',
  collapsed = false,
  onToggleCollapse,
  overallStatusIcon,
  overallTitle,
}) => {
  const [currentActiveStepId, setCurrentActiveStepId] = useState(activeStepId);

  useEffect(() => {
    setCurrentActiveStepId(activeStepId);
  }, [activeStepId]);

  const handleStepClick = (id: string) => {
    setCurrentActiveStepId(id);
    if (onStepClick) {
      onStepClick(id);
    }
  };

  const groupedSteps = steps.reduce((acc, step) => {
    if (!acc[step.group]) acc[step.group] = [];
    acc[step.group].push(step);
    return acc;
  }, {} as Record<string, Step[]>);

  const groupHasError = (group: Step[]) => group.some(step => step.hasError);

  return (
    <div className={`step-indicator ${collapsed ? 'collapsed' : ''} ${orientation}`}>
      {orientation === 'vertical' && (
        <div className="header-container">
          <div className={`overall-title ${collapsed ? 'hidden' : ''}`}>
            <i className={`bi ${overallStatusIcon}`} aria-label="Overall Status Icon" />
            <span>{overallTitle}</span>
          </div>
          <button
            className="toggle-button"
            onClick={onToggleCollapse}
            aria-label="Toggle Panel"
          >
            <i className={`bi ${collapsed ? 'bi-arrow-bar-right' : 'bi-arrow-bar-left'}`}></i>
          </button>
        </div>
      )}
      {!collapsed && (
        <div className="step-list-container">
          <ListGroup horizontal={orientation === 'horizontal'} className="step-list">
            {Object.entries(groupedSteps).map(([group, steps]) => (
              <div key={group}>
                <div className={`group-title ${groupHasError(steps) ? 'text-danger' : ''}`}>
                  {group}
                </div>
                {steps.map((step) => {
                  let iconClass = 'bi bi-clock';
                  if (step.hasError) {
                    iconClass = 'bi bi-exclamation-circle text-danger';
                  } else if (step.isComplete) {
                    iconClass = 'bi bi-check-circle';
                  }

                  return (
                    <ListGroup.Item
                      key={step.id}
                      onClick={() => handleStepClick(step.id)}
                      className={`step-item ${step.id === currentActiveStepId ? 'active-step' : ''}`}
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
      )}
    </div>
  );
};

export default FormStepPanel;
