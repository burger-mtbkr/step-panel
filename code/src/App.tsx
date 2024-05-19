import React, { useState } from 'react';
import StepPanel, { Step } from './components/StepPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const initialSteps: Step[] = [
  { id: 'step1', icon: 'bi bi-circle', label: 'Step 1', title: 'Title for Step 1', hasError: false, isComplete: false, group: 'Group 1' },
  { id: 'step2', icon: 'bi bi-circle', label: 'Step 2', title: 'Title for Step 2', hasError: false, isComplete: false, group: 'Group 1' },
  { id: 'step3', icon: 'bi bi-circle', label: 'Step 3', title: 'Title for Step 3', hasError: false, isComplete: false, group: 'Group 2' },
  { id: 'step4', icon: 'bi bi-circle', label: 'Step 4', title: 'Title for Step 4', hasError: false, isComplete: false, group: 'Group 2' },
  { id: 'step5', icon: 'bi bi-circle', label: 'Step 5', title: 'Title for Step 5', hasError: false, isComplete: false, group: 'Group 3' },
  { id: 'step6', icon: 'bi bi-circle', label: 'Step 6', title: 'Title for Step 6', hasError: false, isComplete: false, group: 'Group 3' },
  { id: 'step7', icon: 'bi bi-circle', label: 'Step 7', title: 'Title for Step 7', hasError: false, isComplete: false, group: 'Group 3' },
  { id: 'step8', icon: 'bi bi-circle', label: 'Step 8', title: 'Title for Step 8', hasError: false, isComplete: false, group: 'Group 3' },
  { id: 'step9', icon: 'bi bi-circle', label: 'Step 9', title: 'Title for Step 9', hasError: false, isComplete: false, group: 'Group 3' },
];

const App: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [activeStepId, setActiveStepId] = useState<string>('step1');
  const [collapsed, setCollapsed] = useState(false);

  const handleStepClick = (id: string) => {
    setActiveStepId(id);
  };

  const nextStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStepId);
    const nextIndex = (currentIndex + 1) % steps.length;
    setActiveStepId(steps[nextIndex].id);
  };

  const setStepDone = (stepId: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, isComplete: true } : step
      )
    );
  };

  const setStepError = (stepId: string) => {
    setSteps(prevSteps =>
      prevSteps.map(step =>
        step.id === stepId ? { ...step, hasError: true } : step
      )
    );
  };

  const resetSteps = () => {
    setSteps(prevSteps =>
      prevSteps.map(step => ({
        ...step,
        hasError: false,
        isComplete: false,
      }))
    );
  };

  const clearSelectedSteps = () => {
    setActiveStepId('');
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="app-container">
      <div className={`step-indicator-container ${collapsed ? 'collapsed' : ''}`}>
        <StepPanel
          steps={steps}
          activeStepId={activeStepId}
          onStepClick={handleStepClick}
          orientation="vertical"
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed}
          overallStatusIcon="bi-clock"
          overallTitle="The loan"
        />
      </div>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <button onClick={nextStep}>Next Step</button>
        <button onClick={() => setStepDone(activeStepId)}>Set Step Done</button>
        <button onClick={() => setStepError(activeStepId)}>Set Step Error</button>
        <button onClick={resetSteps}>Reset Steps</button>
        <button onClick={clearSelectedSteps}>Clear Selected Step</button>
        <button onClick={toggleCollapsed}>Toggle Panel</button>
      </div>
    </div>
  );
};

export default App;
