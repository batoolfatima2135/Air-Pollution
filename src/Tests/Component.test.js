import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import {
  RouterProvider, MemoryRouter, createMemoryRouter, BrowserRouter as Router,
} from 'react-router-dom';
import store from '../Redux/Store';
import Navbar from '../Components/Navbar';
import Innerpage from '../Routes/Innerpage';
import Homepage from '../Routes/Homepage';
import PollutantGraph from '../Components/Pollutantgraph';

const mockStore = configureStore([]);

describe('Component testing', () => {
  test('Navbar component should render correctly', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('Homepage should render correctly', () => {
    const mockState = {
      airPollutionData: {
        data: [
          {
            id: '1', name: 'City 1', state: 'State 1', country: 'Country 1', aqi: 3, components: {},
          },
          {
            id: '2', name: 'City 2', state: 'State 2', country: 'Country 2', aqi: 4, components: {},
          },
        ],
        isLoading: false,
      },
    };

    const store = mockStore(mockState);

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Homepage />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  test('Innerpage should render correctly', () => {
    const routes = [
      {
        path: '/:id',
        element: <Innerpage />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/', '/ADBE'],
      initialIndex: 1,
    });

    const { asFragment } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
describe('PollutantGraph', () => {
  const mockComponents = {
    co: 10,
    no2: 20,
    o3: 30,
    pm10: 40,
  };

  it('should render the PollutantGraph component correctly', () => {
    render(<PollutantGraph components={mockComponents} />);

    // Your assertions
  });
});
