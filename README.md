# StepPanel Component

The `StepPanel` component is a versatile React component designed to act as a step or stage indicator for different sections of an online application form. It supports both vertical and horizontal orientations and provides functionality to mark steps as complete or with errors. The component is highly customizable and can be used in various scenarios.

## Screenshots

- ![horizontal](../screenshots/horizontal-layout.png)

- ![vertical](../screenshots/vertical-layout.png)


## Features

- **Orientation**: Supports both vertical and horizontal orientations.
- **Collapsible Panel**: Can be collapsed or expanded.
- **Active Step**: Highlights the active step.
- **Completion Status**: Marks steps as complete.
- **Error State**: Marks steps with errors.
- **Customizable Icons and Labels**: Each step can have its own icon, label, and title.

## Installation

To install the `StepPanel` component, you can add it to your project by copying the component files into your project directory. Ensure you have the necessary dependencies installed:

```
npm install react react-bootstrap bootstrap bootstrap-icons
# or
yarn add react react-bootstrap bootstrap bootstrap-icons
```
## Usage

Here's an example of how to use the StepPanel component in your application:

```
import React, { useState } from 'react';
import StepPanel, { Step } from './components/StepPanel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const steps: Step[] = [
  { id: 'step1', icon: 'bi bi-circle', label: 'Step 1', title: 'Introduction', hasError: false, isComplete: false },
  { id: 'step2', icon: 'bi bi-circle', label: 'Step 2', title: 'Personal Info', hasError: false, isComplete: false },
  { id: 'step3', icon: 'bi bi-circle', label: 'Step 3', title: 'Confirmation', hasError: false, isComplete: false },
];

const App = () => {
  const [activeStepId, setActiveStepId] = useState<string>('step1');
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const handleStepClick = (id: string) => {
    setActiveStepId(id);
  };

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div>
      <StepPanel
        steps={steps}
        activeStepId={activeStepId}
        onStepClick={handleStepClick}
        collapsed={collapsed}
        onToggleCollapse={handleToggleCollapse}
        orientation="vertical"
      />
    </div>
  );
};

export default App;
```

### Props

**Step**

Each step object in the steps array should have the following structure:

  - id (string): Unique identifier for the step.
  - icon (string): Icon class for the step.
  - label (string): Label for the step.
  - title (string): Title for the step.
  - hasError (boolean): Indicates if the step has an error.
  - isComplete (boolean): Indicates if the step is complete.

**StepPanel Props**

  - steps (Step[]): Array of step objects.
  - activeStepId (string | undefined): ID of the currently active step.
  - onStepClick (function): Callback function when a step is clicked.
  - collapsed (boolean): Indicates if the panel is collapsed.
  - onToggleCollapse (function): Callback function to toggle the collapse state.
  - orientation ('vertical' | 'horizontal'): Orientation of the step panel.

## Storybook

The StepPanel component is also configured to be used with Storybook for interactive development and testing. To start Storybook, run:

```
bash

npm run storybook
# or
yarn storybook

```

**Available Stories**

    Vertical: Displays the step panel in vertical orientation.
    Horizontal: Displays the step panel in horizontal orientation.

**Controls**

    Orientation: Toggle between vertical and horizontal orientations.
    isActive: Select the active step.
    hasError: Toggle error state for steps.
    isComplete: Toggle complete state for steps.
    collapsed: Toggle the collapsed state of the panel.


## Contributions

For any contributions, please feel free to open an pull request on the project's repository.