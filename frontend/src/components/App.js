// Main component
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SellerForm from './pages/SellerForm';
import CatalogItemForm from './pages/CatalogItemForm';
import SearchCatalog from './pages/SearchCatalog';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/seller" component={SellerForm} />
          <Route path="/catalog" component={CatalogItemForm} />
          <Route path="/search" component={SearchCatalog} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
