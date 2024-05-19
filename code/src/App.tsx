import React, { useState } from 'react';
import StepPanel, { Step } from './components/StepPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const initialSteps: Step[] = Array.from({ length: 13 }, (_, i) => ({
  id: `step${i + 1}`,
  icon: 'bi bi-circle',
  label: `Step ${i + 1}`,
  title: `Title for Step ${i + 1}`,
  hasError: false,
  isComplete: false,
  group: `Group ${Math.ceil((i + 1) / 2)}`, // Assign groups
}));

const App: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [activeStepId, setActiveStepId] = useState<string | undefined>('step1');
  const [collapsed, setCollapsed] = useState(false);

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
    setActiveStepId(undefined);
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
          onStepClick={setActiveStepId}
          orientation="vertical"
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed}
          overallStatusIcon="bi-clock"
          overallTitle="The loan"
        />
      </div>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <button onClick={nextStep}>Next Step</button>
        <button onClick={() => setStepDone(activeStepId!)}>Set Step Done</button>
        <button onClick={() => setStepError(activeStepId!)}>Set Step Error</button>
        <button onClick={resetSteps}>Reset Steps</button>
        <button onClick={clearSelectedSteps}>Clear Selected Step</button>
        <button onClick={toggleCollapsed}>Toggle Panel</button>
      </div>
    </div>
  );
};

export default App;
