import { ReactNode } from "react";
import styled from "styled-components";

const SectionContainer = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 12px;
    border: 2px solid;
    width: 50%;
    &:first-child {
        border-right: 0;
    }
`;
export type SectionProps = {
    children: ReactNode;
    header: ReactNode;
};

export const Section = ({ children, header }: SectionProps) => {
    return <SectionContainer>
        {header}
        {children}
    </SectionContainer>
}