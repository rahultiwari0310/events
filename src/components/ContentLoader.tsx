import { ReactNode } from "react";
import { Spinner } from "./Spinner";
import styled from 'styled-components';

export const ContentLoader = ({ isLoading, error, children }: { isLoading?: boolean; error?: string | null; children: JSX.Element }) => {
    if (isLoading) {
        return <Spinner />
    }
    if (error) {
        return <div className="error">Falied to fetch events: {error}</div>
    }
    return children;
};