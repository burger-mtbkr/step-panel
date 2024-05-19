import React, { useState, useEffect } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import StepPanel, { StepPanelProps, Step } from '../components/StepPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './StepPanel.css';

const steps: Step[] = Array.from({ length: 5 }, (_, i) => ({
  id: `step${i + 1}`,
  icon: 'bi bi-circle',
  label: `Step ${i + 1}`,
  title: `Title for Step ${i + 1}`,
  hasError: false,
  isComplete: false,
  group: `Group ${Math.ceil((i + 1) / 2)}`, // Assign groups
}));

export default {
  title: 'Example/StepPanel',
  component: StepPanel,
  argTypes: {
    orientation: {
      control: { type: 'select', options: ['vertical', 'horizontal'] },
    },
    isActive: {
      control: 'radio',
      options: steps.map(step => step.id),
      description: 'Select the active step',
    },
    hasError: {
      control: 'check',
      options: steps.map(step => step.id),
      description: 'Toggle error state for steps',
    },
    isComplete: {
      control: 'check',
      options: steps.map(step => step.id),
      description: 'Toggle complete state for steps',
    },
    collapsed: {
      control: 'boolean',
    },
    overallStatusIcon: {
      control: 'text',
    },
    overallTitle: {
      control: 'text',
    },
  },
} as Meta;

interface TemplateProps extends StepPanelProps {
  isActive?: string;
  hasError?: string[];
  isComplete?: string[];
}

const Template: StoryFn<TemplateProps> = (args) => {
  const [activeStepId, setActiveStepId] = useState<string | undefined>(args.isActive);
  const [stepsState, setStepsState] = useState<Step[]>(args.steps || steps);
  const [collapsed, setCollapsed] = useState<boolean>(args.collapsed || false);
  const [orientation, setOrientation] = useState(args.orientation);

  const handleStepClick = (id: string) => {
    setActiveStepId(id);
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    setActiveStepId(args.isActive);
  }, [args.isActive]);

  useEffect(() => {
    setCollapsed(args.collapsed || false);
  }, [args.collapsed]);

  useEffect(() => {
    setOrientation(args.orientation);
  }, [args.orientation]);

  useEffect(() => {
    const updatedSteps = steps.map(step => ({
      ...step,
      hasError: args.hasError?.includes(step.id) || false,
      isComplete: args.isComplete?.includes(step.id) || false,
    }));
    setStepsState(updatedSteps);
  }, [args.hasError, args.isComplete, args.steps]);

  return (
    <StepPanel
      {...args}
      steps={stepsState}
      activeStepId={activeStepId}
      onStepClick={handleStepClick}
      collapsed={collapsed}
      orientation={orientation}
      onToggleCollapse={handleToggleCollapse}
    />
  );
};

export const Vertical = Template.bind({});
Vertical.args = {
  steps: steps,
  isActive: 'step1',
  orientation: 'vertical',
  collapsed: false,
  overallStatusIcon: 'bi-clock',
  overallTitle: 'The loan',
};

export const Horizontal = Template.bind({});
Horizontal.args = {
  steps: steps,
  isActive: 'step1',
  orientation: 'horizontal',
  collapsed: false,
  overallStatusIcon: 'bi-clock',
  overallTitle: 'The loan',
};
