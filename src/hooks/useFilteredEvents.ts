import { useMemo } from "react";
import { SportingEvent } from "./useFetchEvents";
import { checkTimeOverlaps } from "../utils/checkTimeOverlap";

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
        selected.push(event);
      } else if (
        event.event_name.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        unselected.push({
          ...event,
          maxEventsSelected: selectedEventsById.length >= 3,
        });
      }
    });

    return {
      selectedEventsList: selected,
      unselectedEventsList: unselected.map((event) => {
        const overlappingEvent = selected.find((selectedEvent) =>
          checkTimeOverlaps(event, selectedEvent)
        );

        return {
          ...event,
          overlappingEventName: overlappingEvent?.event_name ?? null,
        };
      }),
    };
  }, [eventsList, selectedEventsById, searchInput]);
};
