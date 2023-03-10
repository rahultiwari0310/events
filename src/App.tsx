import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import './App.css';
import { EventsList } from './components/EventsList';
import { Section } from './components/Section';
import { useFetchEvents } from './hooks/useFetchEvents';
import styled from 'styled-components';
import { SearchIcon } from './components/SearchIcon';
import { ContentLoader } from './components/ContentLoader';
import { useFilteredEvents } from './hooks/useFilteredEvents';

const SectionTitle = styled.h2`
  margin: 0;
`;
const SectionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 40px;
`;
const InputFieldContainer = styled.div`
  border: 2px solid #cecece;
  padding: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const StyledInput = styled.input`
  border: 0;
  outline: none;
  min-width: 180px;
`;

const StyledContainer = styled.div`
    display: flex;
`;

function App() {
  const { eventsState } = useFetchEvents();

  const { data: eventsList } = eventsState;
  const [searchInput, setSearchInput] = useState('');
  const [selectedEventsById, setSelectedEventsById] = useState<number[]>([]);

  const { selectedEventsList, unselectedEventsList } = useFilteredEvents(eventsList, selectedEventsById, searchInput);

  // Select or remove event
  const toggleSelection = useCallback((eventId: number) => {
    if (selectedEventsById.includes(eventId)) {
      setSelectedEventsById(selectedEventsById.filter(it => it !== eventId));
    } else {
      setSelectedEventsById([...selectedEventsById, eventId]);
    }
  }, [selectedEventsById, setSelectedEventsById]);

  const handleSearchInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  }, [setSearchInput]);

  return (
    <div className="App">
      <ContentLoader {...eventsState}>
        <StyledContainer>
          <Section header={
            <SectionHeaderContainer>
              <SectionTitle>All Events</SectionTitle>
              <InputFieldContainer>
                <StyledInput name="search" placeholder='Search by event names...' onChange={handleSearchInputChange} />
                <SearchIcon />
              </InputFieldContainer>
            </SectionHeaderContainer>
          }>
            <EventsList toggleSelection={toggleSelection} list={unselectedEventsList} />
          </Section>
          <Section header={
            <SectionHeaderContainer>
              <SectionTitle>Selected Events</SectionTitle>
            </SectionHeaderContainer>
          }>
            <EventsList toggleSelection={toggleSelection} list={selectedEventsList} isSelected />
          </Section>
        </StyledContainer>
      </ContentLoader>
    </div>
  );
}

export default App;
