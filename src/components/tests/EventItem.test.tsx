import { render, screen } from '@testing-library/react';
import { EventItem } from '../EventItem';

const mockEvent = {
    "id": 1,
    "event_name": "Butterfly 100M",
    "event_category": "Swimming",
    "start_time": "2022-12-17 13:00:00",
    "end_time": "2022-12-17 14:00:00"
}

describe('Event Item component', () => {
    it('renders event details correctly', () => {
        render(<EventItem event={mockEvent} toggleSelection={jest.fn()} />);
        const eventName = screen.getByText(/Butterfly 100M/i);
        const eventCategory = screen.getByText(/Swimming/i);
        const eventStart = screen.getByText(/01:00PM/i);
        const eventEnd = screen.getByText(/02:00PM/i);
        expect(eventName).toBeInTheDocument();
        expect(eventCategory).toBeInTheDocument();
        expect(eventStart).toBeInTheDocument();
        expect(eventEnd).toBeInTheDocument();
    })

    it('should call click handler when clicked on button', () => {
        const fn = jest.fn();
        render(<EventItem event={mockEvent} toggleSelection={fn} />);
        screen.getByRole("button").click();
        expect(fn).toHaveBeenCalledTimes(1);
    })
})
