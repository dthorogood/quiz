import React from 'react';
import './App.css';
import './components/Quiz/quiz.scss';
import { CookiesProvider } from 'react-cookie';

import Quiz from './components/Quiz/Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <CookiesProvider>
            <Quiz/>
          </CookiesProvider>
          <section className="stage">
              <figure className="ball"><span className="shadow"></span></figure>
          </section>
          <div className='box'>
              <div className='wave -one'></div>
              <div className='wave -two'></div>
              <div className='wave -three'></div>
          </div>
      </header>
    </div>
  );
}

export default App;
