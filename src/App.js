import './App.css';
import React from 'react';
import  useFetch  from './hooks/useFetch';

function App() {
  const url1 = 'https://jsonplaceholder.typicode.com/users/';
  const url2 = 'https://jsonplaceholder.typicode.com/todos/';
  const {data, error, setUrl , setData} = useFetch(url1, (response) => console.log(response) );

  const fetchUrl = () => {
    setUrl(url2);
    //console.log('Data:', data, 'Error:', error);
  }

  const addData = () => {
    setData();
  }

  return (
    <div className="App">
      <button onClick={addData}>setData +1</button><button onClick={fetchUrl}>setUrl</button><hr/>
        {data ? data.map((item, index) => {
          return (
              <span key={index}>
                <button>{item.id}</button>
              </span>
          );
        }) : <span>{error}</span>}
    </div>
  );
}

export default App;
