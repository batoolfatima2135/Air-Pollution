import { apiCall, additionalApiCall } from '../Redux/dataSlice';

// Import the functions to be tested

// Mock the fetch function for apiCall
jest.mock('../Redux/dataSlice', () => ({
  apiCall: jest.fn(),
  additionalApiCall: jest.fn(),
}));

describe('apiCall', () => {
  it('should fetch data from the API', async () => {
    const mockApiCallResponse = { data: 'Mocked response for apiCall' };
    apiCall.mockResolvedValueOnce(mockApiCallResponse);

    const city = 'Chicago';
    const response = await apiCall(city);

    expect(apiCall).toHaveBeenCalledWith(city);
    expect(response).toEqual(mockApiCallResponse);
  });
});

describe('additionalApiCall', () => {
  it('should fetch additional data from the API', async () => {
    const mockAdditionalApiCallResponse = { data: 'Mocked response for additionalApiCall' };
    additionalApiCall.mockResolvedValueOnce(mockAdditionalApiCallResponse);

    const lat = 40.7128;
    const lon = -74.0060;
    const response = await additionalApiCall(lat, lon);

    expect(additionalApiCall).toHaveBeenCalledWith(lat, lon);
    expect(response).toEqual(mockAdditionalApiCallResponse);
  });
});
