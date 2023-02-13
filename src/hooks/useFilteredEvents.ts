import { useMemo } from "react";
import { SportingEvent } from "./useFetchEvents";
import { checkTimeOverlaps } from "../utils/checkTimeOverlap";

/**
 * 
 * @param eventsList All events
 * @param selectedEventsById Selected event Ids list
 * @param searchInput Filter against event_name
 * @returns selected and unselected events to be shown in UI
 */
export const useFilteredEvents = (
  eventsList: SportingEvent[],
  selectedEventsById: number[],
  searchInput: string
) => {
  return useMemo(() => {
    const selected: SportingEvent[] = [];
    const unselected: SportingEvent[] = [];
    eventsList.forEach((event) => {

      if (selectedEventsById.includes(event.id)) {
        // Show all selected events
        selected.push(event);
      } else if (
        // Show unselected event only passes search query 
        event.event_name.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        unselected.push({
          ...event,
          maxEventsSelected: selectedEventsById.length >= 3, // To disable all events if max 3 events have been selected already
        });
      }
    });

    return {
      selectedEventsList: selected,
      unselectedEventsList: unselected.map((event) => { 

        // Check if an already selected event duration overlaps with an unselected event
        const overlappingEvent = selected.find((selectedEvent) =>
          checkTimeOverlaps(event, selectedEvent)
        );

        const eventFromSameCategory = selected.find((selectedEvent) => selectedEvent.event_category === event.event_category);

        return {
          ...event,
          overlappingEventName: overlappingEvent?.event_name ?? null,
          eventFromSameCategory: Boolean(eventFromSameCategory)
        };
      }),
    };
  }, [eventsList, selectedEventsById, searchInput]);
};
