import { act, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import mockEvents from './stubs/events'

jest.mock("./hooks/useFetchEvents", () => ({
  useFetchEvents: () => ({
    eventsState: {
      data: mockEvents,
      isLoading: false,
      error: null
    }
  })
}))

describe("Events App", () => {

  it("Should render all event names", () => {
    render(<App />)
    for (let i = 0; i < mockEvents.length; i++) {
      const it = mockEvents[i];
      expect(screen.getByText(it.event_name)).toBeInTheDocument()
    }
  })

  it("Should move an event to selected section on button click", async () => {
    const { container } = render(<App />);
    const eventId = mockEvents[0].id;
    const selectedEventsContainer = container.querySelectorAll('section')[1];
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=event-${eventId}]`).length).toBe(0);
    act(() => {
      screen.getByTestId(`event-${eventId}`).getElementsByTagName("button")[0].click();
    })
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=event-${eventId}]`).length).toBe(1);
  })

  it("Should not allow selection for an overlapping event", async () => {
    const { container } = render(<App />);
    const eventId = mockEvents[0].id;
    const selectedEventsContainer = container.querySelectorAll('section')[1];
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=event-${eventId}]`).length).toBe(0);
    act(() => {
      screen.getByTestId(`event-${eventId}`).getElementsByTagName("button")[0].click();
    })
    const overlappingEventId = `event-${mockEvents[1].id}`
    act(() => {
      screen.getByTestId(overlappingEventId).getElementsByTagName("button")[0].click();
    })
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=${overlappingEventId}]`).length).toBe(0);
  })

  it("Should not allow selection when 3 events selected", async () => {
    const { container } = render(<App />);
    const selectedEventsContainer = container.querySelectorAll('section')[1];
    act(() => {
      screen.getByTestId(`event-${mockEvents[0].id}`).getElementsByTagName("button")[0].click();
    })
    act(() => {
      screen.getByTestId(`event-${mockEvents[2].id}`).getElementsByTagName("button")[0].click();
    })
    act(() => {
      screen.getByTestId(`event-${mockEvents[4].id}`).getElementsByTagName("button")[0].click();
    })
    act(() => {
      screen.getByTestId(`event-${mockEvents[5].id}`).getElementsByTagName("button")[0].click();
    })
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=event-${mockEvents[0].id}]`).length).toBe(1);
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=event-${mockEvents[2].id}]`).length).toBe(1);
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=event-${mockEvents[4].id}]`).length).toBe(1);
    expect(selectedEventsContainer.querySelectorAll(`[data-testid=event-${mockEvents[5].id}]`).length).toBe(0);
  })


})
