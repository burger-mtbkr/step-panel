import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import StepIndicator, { StepIndicatorProps, Step } from '../components/StepIndicator';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const steps: Step[] = [
  { id: 'step1', icon: 'bi bi-circle', label: 'Step 1', title: 'Introduction', hasError: false },
  { id: 'step2', icon: 'bi bi-circle', label: 'Step 2', title: 'Personal Info', hasError: false },
  { id: 'step3', icon: 'bi bi-circle', label: 'Step 3', title: 'Confirmation', hasError: true },
];

export default {
  title: 'Example/StepIndicator',
  component: StepIndicator,
  argTypes: {
    orientation: {
      control: { type: 'select', options: ['vertical', 'horizontal'] },
    },
  },
} as Meta;

const Template: StoryFn<Partial<StepIndicatorProps>> = (args) => {
  const [activeStepId, setActiveStepId] = useState<string | undefined>(args.activeStepId);

  return (
    <StepIndicator
      {...args}
      activeStepId={activeStepId}
      onStepClick={(id: string) => setActiveStepId(id)}
    />
  );
};

export const Vertical = Template.bind({});
Vertical.args = {
  steps: steps,
  activeStepId: 'step1',
  orientation: 'vertical',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  steps: steps,
  activeStepId: 'step1',
  orientation: 'horizontal',
};
