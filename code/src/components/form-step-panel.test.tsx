/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StepPanel, { Step } from './form-step-panel';

const MyTestComponent = () => (
 <div>
 <span>This is a </span>
 <br/>
 <span>React node</span>
 </div>
);

const steps: Step[] = [
 { id: 'step1', icon: 'bi bi-clock', content: 'Step 1', title: 'Introduction', hasError: false, group: 'Group 1' },
 { id: 'step2', icon: 'bi bi-clock', content: 'Step 2', title: 'Personal Info', hasError: false, isComplete: true, group: 'Group 1' },
 { id: 'step3', icon: 'bi bi-clock', content: <MyTestComponent />, title: 'Confirmation', hasError: true, group: 'Group 2' },
];

describe('StepPanel Component', () => {
    test('renders steps with string content correctly', () => {
        render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);
        expect(screen.getByText('Step 1')).toBeInTheDocument();
        expect(screen.getByText('Step 2')).toBeInTheDocument();
    });

    test('renders steps with React node content correctly', () => {
        render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);

        const textMatchFunction = (content: string, node: Element | null): boolean => {
            const hasText = (node: Element) => node.textContent === "This is a React node";
            const nodeHasText = node ? hasText(node) : false;
            const childrenDontHaveText = node ? Array.from(node.children).every(child => !hasText(child)) : false;

            return nodeHasText && childrenDontHaveText;
        };

        expect(screen.getByText(textMatchFunction)).toBeInTheDocument();
    });

    test('renders group titles correctly', () => {
        render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);
        expect(screen.getByText('Group 1')).toBeInTheDocument();
        expect(screen.getByText('Group 2')).toBeInTheDocument();
    });

    test('renders correct icon classes for steps', () => {
        render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);

        const step1Icon = document.querySelector('.step-item[title="Introduction"] .bi');
        const step2Icon = document.querySelector('.step-item[title="Personal Info"] .bi');
        const step3Icon = document.querySelector('.step-item[title="Confirmation"] .bi');

        expect(step1Icon).toHaveClass('bi bi-clock');
        expect(step2Icon).toHaveClass('bi bi-check-circle');
        expect(step3Icon).toHaveClass('bi bi-exclamation-circle', 'text-danger');
    });

    test('applies correct classes for steps with errors', () => {
        render(<StepPanel steps={steps} activeStepId="step1" overallStatusIcon="bi-clock" overallTitle="The loan" />);
        const errorGroupTitle = screen.getByText('Group 2'); // Get the group title directly
        expect(errorGroupTitle).toHaveClass('text-danger');
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

    test('does not render collapse button in horizontal orientation', () => {
        render(<StepPanel steps={steps} activeStepId="step1" orientation="horizontal" overallStatusIcon="bi-clock" overallTitle="The loan" />);
        expect(screen.queryByRole('button', { name: /toggle panel/i })).not.toBeInTheDocument();
    });
});
