import * as React from 'react';
import { ReusableObject } from '../components/ReusableObject';

export interface INotepadProps {
}

const testData = {id: "parent is displayed ok", 
      children: [{id: "must display this too"}]};

export default class Notepad extends React.Component<INotepadProps> {
  
  public render() {
    return (
      <div>
        <ReusableObject data={testData}></ReusableObject>
      </div>
    );
  }
}
