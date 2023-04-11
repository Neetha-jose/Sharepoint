import * as React from 'react';

import { HashRouter, Route, Routes } from 'react-router-dom';
import Addbutton from './Addbutton';
import AppProvider from './AppProvider';
import Card from './Card';
import Updatebutton from './Updatebutton';
import { Layout } from './Layout';
function App() {
  return (
 <Layout>
    <HashRouter>
      
      <AppProvider>
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path='/card' element={<Card />} />
          <Route path="/addbutton" element={<Addbutton />} />
          <Route path="/updatebutton" element={<Updatebutton />} />
        </Routes>
      </AppProvider>
      
    </HashRouter >
    </Layout>
  );
}

export default App;
