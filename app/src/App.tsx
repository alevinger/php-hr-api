import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { FunctionComponent } from 'react';
import Departments from './components/Departments';
import PageLayout from './components/layouts/PageLayout';

const App: FunctionComponent = () => (
    <BrowserRouter>
        <PageLayout>
            <Switch>
                <Route path="/">
                    <Departments />
                </Route>
                <Route path="/departments">
                    <Departments />
                </Route>
            </Switch>
        </PageLayout>
    </BrowserRouter>
);

export default App;
