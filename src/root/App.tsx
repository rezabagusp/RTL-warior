import React, {
  useState,
  FunctionComponent,
} from 'react';
import Button from '../component/Button';
import SelectOption from '../component/SelectOption';
import { Option } from '../types';
import './App.scss';

const DATA: Option[] = [
  {
    id: 1,
    name: 'BWM',
  },
  {
    id: 2,
    name: 'Ferrari',
  },
  {
    id: 3,
    name: 'Lamborghini',
  },
  {
    id: 4,
    name: 'Ford',
  },
];

const App: FunctionComponent<any> = () => {
  const [selected, setSelected] = useState<Option | null>(null);

  const handleClickBtn = () => {
    const text = 'Form Submitted';
    alert(text); // eslint-disable-line
  };

  return (
    <div className="App">
      <h1 className="App-title">
        React Testing Library
      </h1>
      <p className="App-author">Author: Reza Bagus Permana</p>
      <h2 data-testid="formTitle">Example Form Submission</h2>
      <form className="App-form" data-testid="form">
        <label>
          Choose a Car
        </label>
        <br />
        <SelectOption
          className="carOptionInput"
          selected={selected}
          onSelect={(newSelected: Option) => setSelected(newSelected)}
          placeholder="Select your favorite car"
          data={DATA}
        />
        <br />
        <Button
          onClick={handleClickBtn}
          disabled={!selected}
        >
          Submit
        </Button>
      </form>

    </div>
  );
};

export default App;
