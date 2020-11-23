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
      <SelectOption
        selected={selected}
        onSelect={(newSelected: Option) => setSelected(newSelected)}
        data={DATA}
      />
    </div>
  );
};

export default App;
