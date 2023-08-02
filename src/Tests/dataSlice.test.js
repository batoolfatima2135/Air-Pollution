import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../Routes/Homepage';
import dataSliceReducer, { fetchData } from '../Redux/dataSlice';

const mockStore = configureMockStore([thunk]);

describe('Homepage', () => {
  it('should render data fetched from the API', async () => {
    // Create a mock store with the initial state
    const store = mockStore({
      airPollutionData: {
        data: [
          {
            id: '1',
            name: 'City 1',
            country: 'USA',
            state: 'State 1',
            components: {
              co: 123,
              no: 456,
              // Add more components if needed
              // ...
            },
            aqi: 3,
          },
          // Add more data if needed
          // ...
        ],
        isLoading: false,
        error: null,
      },
    });

    // Render the component with the mocked store and wrap it in MemoryRouter
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Homepage />
        </MemoryRouter>
      </Provider>,
    );

    // Use waitFor to wait for the API call to complete before making assertions
    expect(getByText('City 1')).toBeInTheDocument();
    expect(getByText('USA')).toBeInTheDocument();
    // Add more assertions if needed
  });
});
describe('dataSlice reducers', () => {
  it('should set isLoading to true when fetchData is pending', () => {
    const initialState = {
      isLoading: false,
    };
    const nextState = dataSliceReducer(initialState, fetchData.pending());
    expect(nextState.isLoading).toBe(true);
  });

  it('should set isLoading to false and update the data when fetchData is fulfilled', () => {
    const initialState = {
      isLoading: true,
      data: [],
    };
    const mockPayload = [
      {
        name: 'Chicago', country: 'US', state: 'IL', airPollutionData: { list: [{ components: {}, main: { aqi: 1 } }] },
      },
      {
        name: 'London', country: 'GB', state: null, airPollutionData: { list: [{ components: {}, main: { aqi: 2 } }] },
      },
      // Add more mock data as needed
    ];
    const nextState = dataSliceReducer(initialState, fetchData.fulfilled(mockPayload));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.data).toHaveLength(2);
  });

  it('should set isLoading to false and update the error when fetchData is rejected', () => {
    const initialState = {
      isLoading: true,
      error: null,
    };
    const mockErrorPayload = 'Something went wrong';
    const nextState = dataSliceReducer(initialState, fetchData.rejected(mockErrorPayload));
    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toEqual(mockErrorPayload);
  });
});
