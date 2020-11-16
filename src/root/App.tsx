import React, {
  FunctionComponent,
} from 'react';
import Button from '../component/Button';
import SelectOption from '../component/SelectOption';
import './App.scss';

const App: FunctionComponent<any> = () => {
  const handleClickBtn = () => {
    const text = 'hallo warior';
    alert(text); // eslint-disable-line
  };

  return (
    <div className="App">
      <h2>Button Component</h2>
      <Button onClick={handleClickBtn}>
        This is Button
      </Button>

      <h2>Select Option</h2>
      <SelectOption />
    </div>
  );
};

export default App;
