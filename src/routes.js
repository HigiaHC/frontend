import React from 'react';
import { Route, BrowserRouter, Routes as Switch } from 'react-router-dom';

import { Homepage } from './pages/index';
import { Individual } from './pages/individual';
import { Listing } from './pages/list';
import { Resources } from './pages/resources';
import { Resource } from './pages/resource';
import { NewReference } from './pages/new-reference';
import { Requests } from './pages/requests';
import { ResourceRequests } from './pages/resource-requests';
import { FirstAccess } from './pages/firstAccess';

export const Routes = () => (
    <BrowserRouter basename="/">
        <Switch>
            <Route path="/" element={<Homepage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resource/:type/:id" element={<Resource />} />
            <Route path="/new" element={<NewReference />} />
            <Route path="/list" element={<Listing />} />
            <Route path="/ind" element={<Individual />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/resource-requests" element={<ResourceRequests />} />
            <Route path="/first-access" element={<FirstAccess />} />
        </Switch>
    </BrowserRouter>
);