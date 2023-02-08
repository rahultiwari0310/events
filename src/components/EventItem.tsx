import { SportingEvent } from "../hooks/useFetchEvents";
import styled from "styled-components";
import dayjs from 'dayjs'
import { useCallback } from "react";

const EventItemContainer = styled.div`
    background-color: #99ddff;
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
    disabled?: boolean;
};
const StyledButton = styled.button<StyledButtonProps>`
    background-color: ${props => props.isSelected ? '#ff3333': '#009933'};
    padding: 8px 72px;
    border: 0;
    color: white;
    font-weight: 800;
    font-size: 16px;
    border-radius: 6px;
    cursor: pointer;
`;

export type ToggleSelectionHandler = (eventId: number) => void;

export type EventItemProps = {
    event: SportingEvent;
    isSelected?: boolean;
    disabled?: boolean;
    toggleSelection: ToggleSelectionHandler;
};

export const EventItem = ({event, isSelected, disabled, toggleSelection}: EventItemProps) => {
    const handleClick = useCallback(() => {
        toggleSelection(event.id);
    }, [toggleSelection, event.id])

    return <EventItemContainer>
        <EventCategoryDenoter>{event.event_category.charAt(0)}</EventCategoryDenoter>
        <EventsDetails>
            <StyledEventName>{event.event_name}</StyledEventName>
            <p>({event.event_category})</p>
            <p>{dayjs(event.start_time).format('HH:mmA')} - {dayjs(event.end_time).format('HH:mmA')}</p>
            <StyledButton isSelected={isSelected} onClick={handleClick}>{
                isSelected ? 'Remove' : 'Select'
            }</StyledButton>
        </EventsDetails>
    </EventItemContainer>
}