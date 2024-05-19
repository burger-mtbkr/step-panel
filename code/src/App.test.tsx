/* eslint-disable testing-library/no-node-access */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('iterates between steps', () => {
    render(<App />);
    const nextButton = screen.getByText('Next Step');
    fireEvent.click(nextButton);
    expect(screen.getByText('Step 2').closest('.list-group-item')).toHaveClass('active-step');
    fireEvent.click(nextButton);
    expect(screen.getByText('Step 3').closest('.list-group-item')).toHaveClass('active-step');
  });

  test('sets a step as done', () => {
    render(<App />);
    const setDoneButton = screen.getByText('Set Step Done');
    fireEvent.click(setDoneButton);
    const step1Icon = screen.getByLabelText('Step 1 icon');
    expect(step1Icon).toHaveClass('bi-check-circle');
  });

  test('sets a step as error', () => {
    render(<App />);
    const setErrorButton = screen.getByText('Set Step Error');
    fireEvent.click(setErrorButton);
    const step1Icon = screen.getByLabelText('Step 1 icon');
    const step1Label = screen.getByText('Step 1');
    expect(step1Icon).toHaveClass('bi-exclamation-circle text-danger');
    expect(step1Label).toHaveClass('text-danger');
  });

  test('resets all steps', () => {
    render(<App />);
    const resetButton = screen.getByText('Reset Steps');
    fireEvent.click(resetButton);
    const step1Icon = screen.getByLabelText('Step 1 icon');
    expect(step1Icon).toHaveClass('bi-circle');
    const step1Label = screen.getByText('Step 1');
    expect(step1Label).not.toHaveClass('text-danger');
  });

  test('clears all selected steps', () => {
    render(<App />);
    const clearSelectedButton = screen.getByText('Clear Selected Step');
    fireEvent.click(clearSelectedButton);
    const activeSteps = screen.queryAllByText((content, element) => {
      return element?.classList.contains('active-step') || false;
    });
    expect(activeSteps.length).toBe(0);
  });

  test('toggles the panel\'s collapsed state', () => {
    render(<App />);
    const toggleButton = screen.getByText('Toggle Panel');
    const stepPanel = document.querySelector('.step-indicator-container');

    fireEvent.click(toggleButton);
    expect(stepPanel).toHaveClass('collapsed');

    fireEvent.click(toggleButton);
    expect(stepPanel).not.toHaveClass('collapsed');
  });

  test('content area adjusts based on the panel\'s collapsed state', () => {
    render(<App />);
    const toggleButton = screen.getByText('Toggle Panel');
    const contentArea = screen.getByText('Next Step').closest('.content');

    fireEvent.click(toggleButton);
    expect(contentArea).toHaveClass('collapsed');

    fireEvent.click(toggleButton);
    expect(contentArea).not.toHaveClass('collapsed');
  });
});
