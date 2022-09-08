import React from 'react';
import { Route, BrowserRouter, Routes as Switch } from 'react-router-dom';

import { Homepage } from './pages/index';
import { Individual } from './pages/individual';
import { Listing } from './pages/list';
import { Resources } from './pages/resources';
import { NewReference } from './pages/new-reference';

export const Routes = () => (
    <BrowserRouter basename="/">
        <Switch>
            <Route path="/" element={<Homepage />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/new" element={<NewReference />} />
            <Route path="/list" element={<Listing />} />
            <Route path="/ind" element={<Individual />} />
        </Switch>
    </BrowserRouter>
);