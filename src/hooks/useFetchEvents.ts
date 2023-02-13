import { useEffect, useState } from "react";

export type SportingEvent = {
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
  maxEventsSelected?: boolean;
  overlappingEventName?: string | null;
  eventFromSameCategory?: boolean;
};

export type EventsFetchState = {
  isLoading: boolean;
  data: SportingEvent[];
  error?: string | null;
};
export const useFetchEvents = () => {
  const [eventsState, setEventsState] = useState<EventsFetchState>({
    isLoading: true,
    data: [],
    error: null,
  });

  const fetchEvents = () => {
    fetch("https://run.mocky.io/v3/2744c231-8991-4ae8-bc45-1f645437585a")
      .then((res) => res.json())
      .then((res) => {
        setEventsState({
          isLoading: false,
          data: res,
          error: null,
        });
      })
      .catch((err) => {
        setEventsState({
          isLoading: false,
          data: [],
          error: err.toString(),
        });
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { eventsState };
};
