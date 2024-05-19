/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepPanel, { Step } from './StepPanel';

const steps: Step[] = [
  { id: 'step1', icon: 'bi bi-circle', label: 'Step 1', title: 'Introduction', hasError: false, group: 'Group 1' },
  { id: 'step2', icon: 'bi bi-circle', label: 'Step 2', title: 'Personal Info', hasError: false, isComplete: true, group: 'Group 1' },
  { id: 'step3', icon: 'bi bi-circle', label: 'Step 3', title: 'Confirmation', hasError: true, group: 'Group 2' },
];

describe('StepPanel Component', () => {
  test('renders steps with correct labels', () => {
    render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);

    steps.forEach(step => {
      const stepItem = screen.getByText(step.label);
      expect(stepItem).toBeInTheDocument();
    });
  });

  test('renders group titles correctly', () => {
    render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);
    
    const group1Title = screen.getByText('Group 1');
    const group2Title = screen.getByText('Group 2');
    expect(group1Title).toBeInTheDocument();
    expect(group2Title).toBeInTheDocument();
  });

  test('renders correct icon classes for steps', () => {
    render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);

    expect(screen.getByLabelText('Step 1 icon')).toHaveClass('bi-circle');
    expect(screen.getByLabelText('Step 2 icon')).toHaveClass('bi-check-circle');
    expect(screen.getByLabelText('Step 3 icon')).toHaveClass('bi-exclamation-circle');
    expect(screen.getByLabelText('Step 3 icon')).toHaveClass('text-danger');
  });

  test('applies correct label classes for steps with errors', () => {
    render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);

    const step3Label = screen.getByText('Step 3');
    expect(step3Label).toHaveClass('text-danger');
  });

  test('applies active class to the active step', () => {
    render(<StepPanel steps={steps} activeStepId="step2" overallStatusIcon="bi-clock" overallTitle="The loan" />);

    const activeStep = screen.getByText('Step 2').closest('.list-group-item');
    expect(activeStep).toHaveClass('active-step');
  });

  test('calls onStepClick when a step is clicked', () => {
    const handleStepClick = jest.fn();
    render(<StepPanel steps={steps} activeStepId="step1" onStepClick={handleStepClick} overallStatusIcon="bi-clock" overallTitle="The loan" />);

    fireEvent.click(screen.getByText('Step 2'));
    expect(handleStepClick).toHaveBeenCalledWith('step2');
  });

  test('handles undefined activeStepId', () => {
    const handleStepClick = jest.fn();
    render(<StepPanel steps={steps} activeStepId={undefined} onStepClick={handleStepClick} overallStatusIcon="bi-clock" overallTitle="The loan" />);

    fireEvent.click(screen.getByText('Step 1'));
    expect(handleStepClick).toHaveBeenCalledWith('step1');
  });

  test('toggles the panel when the toggle button is clicked (vertical orientation)', () => {
    const { rerender } = render(<StepPanel steps={steps} activeStepId="step1" orientation="vertical" collapsed={false} overallStatusIcon="bi-clock" overallTitle="The loan" />);
    const toggleButton = screen.getByRole('button', { name: /toggle panel/i });
    
    fireEvent.click(toggleButton);
    rerender(<StepPanel steps={steps} activeStepId="step1" orientation="vertical" collapsed={true} overallStatusIcon="bi-clock" overallTitle="The loan" />);
    const stepPanel = toggleButton.closest('.step-indicator');
    expect(stepPanel).toHaveClass('collapsed');

    fireEvent.click(toggleButton);
    rerender(<StepPanel steps={steps} activeStepId="step1" orientation="vertical" collapsed={false} overallStatusIcon="bi-clock" overallTitle="The loan" />);
    expect(stepPanel).not.toHaveClass('collapsed');
  });

  test('hides step items when the panel is collapsed (vertical orientation)', () => {
    const { rerender } = render(<StepPanel steps={steps} activeStepId="step1" orientation="vertical" collapsed={false} overallStatusIcon="bi-clock" overallTitle="The loan" />);
    const toggleButton = screen.getByRole('button', { name: /toggle panel/i });
    
    fireEvent.click(toggleButton);
    rerender(<StepPanel steps={steps} activeStepId="step1" orientation="vertical" collapsed={true} overallStatusIcon="bi-clock" overallTitle="The loan" />);
    
    steps.forEach(step => {
      expect(screen.queryByText(step.label)).not.toBeInTheDocument();
    });
  });

  test('does not render collapse button in horizontal orientation', () => {
    render(<StepPanel steps={steps} activeStepId="step1" orientation="horizontal" overallStatusIcon="bi-clock" overallTitle="The loan" />);
    const toggleButton = screen.queryByRole('button', { name: /toggle panel/i });
    expect(toggleButton).not.toBeInTheDocument();
  });

  test('renders step items in horizontal orientation', () => {
    render(<StepPanel steps={steps} activeStepId="step1" orientation="horizontal" overallStatusIcon="bi-clock" overallTitle="The loan" />);

    steps.forEach(step => {
      const stepItem = screen.getByText(step.label);
      expect(stepItem).toBeInTheDocument();
    });
  });
});
