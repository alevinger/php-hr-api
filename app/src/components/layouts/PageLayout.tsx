import React, { FunctionComponent, ReactNode } from 'react';

interface PageLayoutProps {
    children: ReactNode;
}

const PageLayout: FunctionComponent<PageLayoutProps> = ({ children }) => <>{children}</>;

export default PageLayout;
