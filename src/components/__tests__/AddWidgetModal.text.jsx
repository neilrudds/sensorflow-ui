import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddWidgetModal from '../modal/AddWidgetModal';
import WorkspaceContext from "../../context/workspace-context";
import mockWorkspaceContext from '../__tests__/testData/workspace-context.json';

jest.mock("src\utils\apiManager\apiDevice.js", () => {
  const devices = [
    {
        "id": "187243579",
        "name": "Neil Python IoT",
        "fields": "[{\"id\":1,\"name\":\"Temperature\",\"identifier\":\"ambTemp\",\"type\":\"Float\",\"unit\":\"degC\"},{\"id\":2,\"name\":\"Average Current\",\"identifier\":\"avgCurr\",\"type\":\"integer\",\"unit\":\"Celcius\"},{\"id\":3,\"name\":\"L1 Voltage\",\"identifier\":\"voltsL1\",\"type\":\"integer\",\"unit\":\"mV\"}]",
        "createdTimestamp": "2024-03-18T17:10:04.4189527",
        "lastModifiedTimestamp": "0001-01-01T00:00:00",
        "ownerId": "a0dd767b-908d-42de-84f5-b55a68920a04",
        "modifiedById": null
    }
];
  return {
    getDevicesByWorkspace: jest.fn(() => Promise.resolve(devices))
  };
});

describe('AddWidgetModal', () => {
  it('renders without crashing', () => {
      render(
        <WorkspaceContext.Provider value={{mockWorkspaceContext}}>
          <AddWidgetModal addWidget={() => {}} />
        </WorkspaceContext.Provider>
      );
  });

  it('opens modal when clicked', () => {
    const { getByText } = render(
      <WorkspaceContext.Provider value={mockWorkspaceContext}>
        <AddWidgetModal addWidget={() => {}} />
      </WorkspaceContext.Provider>
    );
    const addButton = getByText('Add Widget');
    fireEvent.click(addButton);
    const modal = getByText('Choose Widget Type');
    expect(modal).toBeInTheDocument();
    
  });

  it('opens value configuration modal when clicked', () => {
    const { getByText, getByTestId } = render(
      <WorkspaceContext.Provider value={mockWorkspaceContext}>
        <AddWidgetModal addWidget={() => {}} />
      </WorkspaceContext.Provider>
    );
    const addButton = getByText('Add Widget');
    fireEvent.click(addButton);
    const valueOption = getByText('Value');
    fireEvent.click(valueOption);
    const valueModal = getByTestId('value-modal');
    expect(valueModal).toBeInTheDocument();
  });

  it('opens chart configuration modal when clicked', () => {
    const { getByText, getByTestId } = render(
      <WorkspaceContext.Provider value={mockWorkspaceContext}>
        <AddWidgetModal addWidget={() => {}} />)
      </WorkspaceContext.Provider>
    );
    const addButton = getByText('Add Widget');
    fireEvent.click(addButton);
    const chartOption = getByText('Chart');
    fireEvent.click(chartOption);
    const chartModal = getByTestId('chart-modal');
    expect(chartModal).toBeInTheDocument();
  });
});