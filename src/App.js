import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Articles from './components/Articles';
import './App.css';

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Route exact path="/" component={Articles}/>
      <Route exact path="/articles" component={Articles}/>
      {/* <Route exact path="/articles/new" component={UpsertArticle}/>
      <Route exact path="/articles/edit/:id" component={UpsertArticle}/> */}
    </div>
  </BrowserRouter>
);

export default App;
