import axios from 'axios';
import { render } from "@testing-library/react";
import ShaeCalendar from "../ShaeCalendar";

afterEach(() => {
    jest.clearAllMocks();
});

it('renders correctly', () => {
    expect(render(<ShaeCalendar />)).not.toBeNull();
});

it('sends an api call from axios', async () => {
    const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue();
    render(<ShaeCalendar />);
    expect(axiosSpy).toBeCalled();
});

//How do I do this??
// it('displays loading before api call', () => {
//     jest.mock("axios");
// });