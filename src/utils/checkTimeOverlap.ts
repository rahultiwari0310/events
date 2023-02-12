import { SportingEvent } from "../hooks/useFetchEvents";
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween)

/**
 * 
 * @param eventA 
 * @param eventB 
 * @returns true if duration overlaps
 */
export const checkTimeOverlaps = (
  eventA: SportingEvent,
  eventB: SportingEvent
) => {

  // If events begin and end at same time, fail fast.
  if(eventA.start_time === eventB.start_time && eventA.end_time === eventB.end_time) {
    return true;
  }
  
  const eventAStartTime = dayjs(eventA.start_time);
  const eventBStartTime = dayjs(eventB.start_time);
  const eventAEndTime = dayjs(eventA.end_time);
  const eventBEndTime = dayjs(eventB.end_time);

  return eventAStartTime.isBetween(eventBStartTime, eventBEndTime) || eventAEndTime.isBetween(eventBStartTime, eventBEndTime);
};
