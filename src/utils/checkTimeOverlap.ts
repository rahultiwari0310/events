import { SportingEvent } from "../hooks/useFetchEvents";

export const checkTimeOverlaps = (
  eventA: SportingEvent,
  eventB: SportingEvent
) => {
  const eventAStartTime = new Date(eventA.start_time).getTime();
  const eventBStartTime = new Date(eventB.start_time).getTime();
  const eventAEndTime = new Date(eventA.end_time).getTime();
  const eventBEndTime = new Date(eventB.end_time).getTime();

  return (
    (eventAStartTime < eventBStartTime && eventBStartTime < eventAEndTime) ||
    (eventAStartTime < eventBEndTime && eventBEndTime < eventAEndTime) ||
    (eventBStartTime < eventAStartTime && eventAEndTime < eventBEndTime)
  );
};
