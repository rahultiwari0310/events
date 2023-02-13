import { useMemo } from "react";
import type { SportingEvent } from "../hooks/useFetchEvents";
import { EventItemMemoized, ToggleSelectionHandler } from "./EventItem";
import styled from 'styled-components';

const AllEvents = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const EventsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid;
    padding: 12px 20px 24px 20px;
    gap: 12px;
    border-radius: 8px;
`;
const EventsListByCategory = styled.div`
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const EventsCategoryTitle = styled.h4`
    text-align: start;
    margin: 0;
`;


export type EventsListProps = {
    list: SportingEvent[];
    toggleSelection: ToggleSelectionHandler;
    isSelected?: boolean;
};

export const EventsList = ({ list, isSelected, toggleSelection }: EventsListProps) => {

    // group events by category
    const groupedByCategory = useMemo(() => {
        const categoryMap: Record<string, SportingEvent[]> = {};
        list.forEach((event) => {
            const { event_category: category } = event;
            if (categoryMap[category]) {
                categoryMap[category].push(event);
            } else {
                categoryMap[category] = [event];
            }
        })
        return categoryMap;
    }, [list]);

    if(!list.length) {
        return <div>No events found.</div>
    }

    return <AllEvents>
        {
            Object.entries(groupedByCategory).map(([category, events]) => <EventsContainer data-testid={`category-${category}`} key={category}>
                <EventsCategoryTitle>{category}</EventsCategoryTitle>
                <EventsListByCategory>
                    {
                        events.map((event) => <EventItemMemoized isSelected={isSelected} key={event.id} toggleSelection={toggleSelection} event={event} />)
                    }
                </EventsListByCategory>
            </EventsContainer>)
        }
    </AllEvents>
}