import React, {
  FunctionComponent,
} from 'react';
import Button from '../component/Button';
import './App.scss';

const App: FunctionComponent<any> = () => {
  const handleClickBtn = () => {
    const text = 'hallo warior';
    alert(text); // eslint-disable-line
  };

  return (
    <div className="App">
      <h1>Button Component</h1>
      <Button onClick={handleClickBtn}>
        This is Button
      </Button>
    </div>
  );
};

export default App;
