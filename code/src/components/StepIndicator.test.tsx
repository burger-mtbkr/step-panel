import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepIndicator, { Step } from './StepIndicator';

const steps: Step[] = [
  { id: 'step1', icon: 'bi bi-circle', label: 'Step 1', title: 'Introduction', hasError: false },
  { id: 'step2', icon: 'bi bi-circle', label: 'Step 2', title: 'Personal Info', hasError: false },
  { id: 'step3', icon: 'bi bi-circle', label: 'Step 3', title: 'Confirmation', hasError: true },
];

describe('StepIndicator Component', () => {
  test('renders steps correctly', () => {
    render(<StepIndicator steps={steps} activeStepId="step1" />);
    
    steps.forEach(step => {
      expect(screen.getByText(step.label)).toBeInTheDocument();
    //  expect(screen.getByText(step.title)).toBeInTheDocument();
    });
  });

  test('applies active class to the active step', () => {
    render(<StepIndicator steps={steps} activeStepId="step2" />);
    
    const activeStep = screen.getByText('Step 2').closest('.step');
    expect(activeStep).toHaveClass('active');
  });

  test('applies error class to steps with errors', () => {
    render(<StepIndicator steps={steps} activeStepId="step1" />);

    const errorStep = screen.getByText('Step 3').closest('.step');
    expect(errorStep).toHaveClass('has-error');
  });

  test('calls onStepClick when a step is clicked', () => {
    const handleStepClick = jest.fn();
    render(<StepIndicator steps={steps} activeStepId="step1" onStepClick={handleStepClick} />);
    
    fireEvent.click(screen.getByText('Step 2'));
    expect(handleStepClick).toHaveBeenCalledWith('step2');
  });
});
