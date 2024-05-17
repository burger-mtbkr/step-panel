import React, { useState } from 'react';
import StepIndicator, { Step } from './components/StepIndicator';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const App: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<string>('step1');
  const [steps, setSteps] = useState<Step[]>([
    { id: 'step1', icon: 'bi bi-circle', label: 'Step 1', title: 'Introduction', hasError: false },
    { id: 'step2', icon: 'bi bi-circle', label: 'Step 2', title: 'Personal Info', hasError: false },
    { id: 'step3', icon: 'bi bi-circle', label: 'Step 3', title: 'Confirmation', hasError: true },
  ]);

  const handleStepClick = (id: string) => {
    setActiveStepId(id);
  };

  const toggleErrorOnStep = (id: string) => {
    setSteps(prevSteps => {
      const newSteps = prevSteps.map(step => 
        step.id === id ? { ...step, hasError: !step.hasError } : step
      );
      return newSteps;
    });
  };

  const updateStepLabel = (id: string, newLabel: string) => {
    setSteps(prevSteps => {
      const newSteps = prevSteps.map(step =>
        step.id === id ? { ...step, label: newLabel } : step
      );
      return newSteps;
    });
  };

  return (
    <div className="app">
<      h4>Step Panel</h4>
      <StepIndicator 
        steps={steps} 
        activeStepId={activeStepId} 
        onStepClick={handleStepClick}
        orientation="vertical" // Change to "horizontal" for horizontal layout
      />
      <button onClick={() => toggleErrorOnStep('step2')}>
        Toggle Error on Step 2
      </button>
      <button onClick={() => setActiveStepId((prevStep) => (prevStep === 'step1' ? 'step2' : 'step1'))}>
        Next Step
      </button>
      <button onClick={() => updateStepLabel('step2', 'Updated Step 2')}>
        Update Label of Step 2
      </button>
    </div>
  );
};

export default App;
