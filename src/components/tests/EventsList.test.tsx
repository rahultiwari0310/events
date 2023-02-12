import { render, screen } from '@testing-library/react';
import { EventsList } from '../EventsList';
import mockEvents from '../../stubs/events';

describe('Events List component', () => {
    it("Should show events grouped by categories", () => { 
        render(<EventsList list={mockEvents} toggleSelection={jest.fn()} />);
        const ath = screen.getByTestId("category-Athletics");
        const box = screen.getByTestId("category-Boxing");
        const swim = screen.getByTestId("category-Swimming");
        expect(ath).toBeInTheDocument();
        expect(box).toBeInTheDocument();
        expect(swim).toBeInTheDocument();
    });

    it("Athletics category Should show Athletics events only", () => { 
        render(<EventsList list={mockEvents} toggleSelection={jest.fn()} />);
        const ath = screen.getByTestId("category-Athletics");
        const allAthEvents = mockEvents.filter(it => it.event_category === 'Athletics');
        const renderedEvents = ath.querySelectorAll("[data-testid]");
        expect(allAthEvents.length).toBe(renderedEvents.length);

        allAthEvents.forEach(it => {
            expect(screen.getByTestId(`event-${it.id}`)).toBeInTheDocument();
        });
        
    });
})