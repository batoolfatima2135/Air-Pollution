import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import Homepage from '../Routes/Homepage'; // Replace with the correct path to your component

// Create a mock store with the thunk middleware
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
