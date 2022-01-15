import * as React from 'react';
import { Link } from 'react-router-dom';

export interface IHomeProps {
}

export default class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div>
        <h1>Home page</h1>
        <p>
          <Link to="notepad">create your notes here</Link>
        </p>
        <p>
          <Link to="preview">get visuals here</Link>
        </p>
        <p>This is relatable notepad, create limitless notes that can be joint in a herarchical structure..</p>
        <p>Then display, merge with other notes and share them, fast..</p>
      </div>
    );
  }
}
