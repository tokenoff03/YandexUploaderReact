import React from 'react';
import './App.css';
import YandexUploader from './components/YandexUploader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Загрузка файлов на Яндекс.Диск</h1>
        <YandexUploader />
      </header>
    </div>
  );
}

export default App;
