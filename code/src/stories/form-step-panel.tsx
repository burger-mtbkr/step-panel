import React, { useState, useEffect } from 'react';
import FormStepPanel, { FormStepPanelProps, Step } from '../components/form-step-panel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../components/FormStepPanel.css';

export const steps: Step[] = Array.from({ length: 5 }, (_, i) => ({
  id: `step${i + 1}`,
  icon: 'bi bi-clock',
  content: `Step ${i + 1}`,
  title: `Title for Step ${i + 1}`,
  hasError: false,
  isComplete: false,
  group: `Group ${Math.ceil((i + 1) / 2)}`,
}));

const StepPanelContainer: React.FC<FormStepPanelProps & {
  hasError?: string[];
  isComplete?: string[];
}> = (props) => {
  const [stepsState, setStepsState] = useState<Step[]>(props.steps || steps);
  const [collapsed, setCollapsed] = useState<boolean>(props.collapsed || false);

  const handleStepClick = (id: string) => {
    setStepsState(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        isActive: step.id === id,
      }))
    );
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const updatedSteps = steps.map(step => ({
      ...step,
      hasError: props.hasError?.includes(step.id) || false,
      isComplete: props.isComplete?.includes(step.id) || false,
    }));
    setStepsState(updatedSteps);
  }, [props.hasError, props.isComplete, props.steps]);

  return (<FormStepPanel
      {...props}
      steps={stepsState}
      onStepClick={handleStepClick}
      collapsed={collapsed}
      onToggleCollapse={handleToggleCollapse}
    />
  );
};

export default StepPanelContainer;