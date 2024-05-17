import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepIndicator, { Step } from './StepIndicator';

const steps: Step[] = [
  { id: 'step1', icon: 'bi bi-circle', label: 'Step 1', title: 'Introduction', hasError: false },
  { id: 'step2', icon: 'bi bi-circle', label: 'Step 2', title: 'Personal Info', hasError: false, isComplete: true },
  { id: 'step3', icon: 'bi bi-circle', label: 'Step 3', title: 'Confirmation', hasError: true },
];

describe('StepIndicator Component', () => {
  test('renders steps with correct labels', () => {
    render(<StepIndicator steps={steps} activeStepId="step1" />);

    steps.forEach(step => {
      const stepItem = screen.getByText(step.label);
      expect(stepItem).toBeInTheDocument();
    });
  });

  test('renders correct icon classes for steps', () => {
    render(<StepIndicator steps={steps} activeStepId="step1" />);

    expect(screen.getByLabelText('Step 1 icon')).toHaveClass('bi-circle');
    expect(screen.getByLabelText('Step 2 icon')).toHaveClass('bi-check-circle');
    expect(screen.getByLabelText('Step 3 icon')).toHaveClass('bi-exclamation-circle');
    expect(screen.getByLabelText('Step 3 icon')).toHaveClass('text-danger');
  });

  test('applies correct label classes for steps with errors', () => {
    render(<StepIndicator steps={steps} activeStepId="step1" />);

    const step3Label = screen.getByText('Step 3');
    expect(step3Label).toHaveClass('text-danger');
  });

  test('applies active class to the active step', () => {
    render(<StepIndicator steps={steps} activeStepId="step2" />);

    // eslint-disable-next-line testing-library/no-node-access
    const activeStep = screen.getByText('Step 2').closest('.list-group-item');
    expect(activeStep).toHaveClass('active-step');
  });

  test('calls onStepClick when a step is clicked', () => {
    const handleStepClick = jest.fn();
    render(<StepIndicator steps={steps} activeStepId="step1" onStepClick={handleStepClick} />);

    fireEvent.click(screen.getByText('Step 2'));
    expect(handleStepClick).toHaveBeenCalledWith('step2');
  });
});
