import { SportingEvent } from "../hooks/useFetchEvents";
import styled from "styled-components";
import dayjs from 'dayjs'
import { useCallback } from "react";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css';


type EventItemContainerProps = {
    disabled: boolean;
};

const EventItemContainer = styled.div<EventItemContainerProps>`
    background-color: ${props => props.disabled ? '#cecece' : '#99ddff'};
    padding: 12px 24px;
    width: fit-content;
    border-radius: 16px;
    display: flex;
`;
const EventsDetails = styled.div`
    display: flex;
    align-items: start;
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
`;
const EventCategoryDenoter = styled.h1`
    font-size: 80px;
    border-right: 2px solid #000;
    margin: 0;
    padding-right: 16px;
    margin-right: 16px;
    display: flex;
    align-items: center;
`;
const StyledEventName = styled.p`
    font-size: 20px;
    font-weight: bold;
    margin: 0;
`;
type StyledButtonProps = {
    isSelected?: boolean;
    isDisabled?: boolean;
};
const StyledButton = styled.button<StyledButtonProps>`
    background-color: ${props => props.isSelected ? '#ff3333' : (props.isDisabled ? '#999999' : '#009933')};
    padding: 8px 72px;
    border: 0;
    color: white;
    font-weight: 800;
    font-size: 16px;
    border-radius: 6px;
    cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
`;

export type ToggleSelectionHandler = (eventId: number) => void;

export type EventItemProps = {
    event: SportingEvent;
    isSelected?: boolean;
    toggleSelection: ToggleSelectionHandler;
};

export const EventItem = ({ event, isSelected, toggleSelection }: EventItemProps) => {


    const { maxEventsSelected, overlappingEventName } = event;

    const disableReason = overlappingEventName ? `You have already opted-in for ${overlappingEventName} event for same time slot. 
    In order to select this event, you will have to opt-out of ${overlappingEventName}.` :
        (maxEventsSelected ? 'Maximum 3 events can be seleted at a time.' : null)

    const anchorId = `event-${event.id}`;

    const handleClick = useCallback(() => {
        !disableReason && toggleSelection(event.id);
    }, [toggleSelection, event.id])

    return <EventItemContainer disabled={Boolean(disableReason)}>
        <EventCategoryDenoter>{event.event_category.charAt(0)}</EventCategoryDenoter>
        <EventsDetails>
            <StyledEventName>{event.event_name}</StyledEventName>
            <p>({event.event_category})</p>
            <p>{dayjs(event.start_time).format('hh:mmA')} - {dayjs(event.end_time).format('hh:mmA')}</p>
            <StyledButton id={anchorId} isDisabled={Boolean(disableReason)} isSelected={isSelected} onClick={handleClick}>{
                isSelected ? 'Remove' : 'Select'
            }</StyledButton>
            {
                disableReason ? <Tooltip style={{ maxWidth: '250px' }} anchorId={anchorId} content={disableReason} /> : null

            }
        </EventsDetails>
    </EventItemContainer>
}