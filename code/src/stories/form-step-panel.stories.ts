import type { Meta, StoryObj } from '@storybook/react';
import StepPanelContainer, { steps } from './form-step-panel';

const meta: Meta<typeof StepPanelContainer> = {
  title: 'Example/FormStepPanel',
  component: StepPanelContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**StepPanelContainer** is a versatile component used to display a series of steps. Each step can have an active, completed, or errored state.

### Features

- **Orientation Control**: Can be set to either 'vertical' or 'horizontal'.
- **Active Step Highlighting**: Allows users to visually see which step is currently active.
- **Error Handling**: Steps can individually be marked as having errors, providing immediate feedback.
- **Completion Tracking**: Tracks which steps have been completed, allowing users to see their progress.
- **Dynamic Interaction**: Users can interact with each step through a simple click interface.

### Usage

\`\`\`jsx
<StepPanelContainer
  steps={steps}
  activeStepId="step1"
  orientation="vertical"
  collapsed={false}
/>
\`\`\`

This setup is ideal for workflows, multi-step forms, and guides.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: { type: 'select', options: ['vertical', 'horizontal'] },
    },
    activeStepId: {
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
  }
} satisfies Meta<typeof StepPanelContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {
  args: {
    steps: steps,
    activeStepId: 'step1',
    orientation: 'vertical',
    collapsed: false,
    overallStatusIcon: 'bi-clock',
    overallTitle: 'The header',
  }
};

export const Horizontal: Story = {
  args: {
    steps: steps,
    activeStepId: 'step1',
    orientation: 'horizontal',
    collapsed: false,
    overallStatusIcon: 'bi-clock',
    overallTitle: 'The header',
  }
};