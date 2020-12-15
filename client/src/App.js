import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import NewsList from './components/NewsList';

const App = () => (
  <div className="App">
    <Header />
    <Route path={['/news/:id', '/']}>
      <NewsList />
    </Route>
  </div>
);

export default App;
