import * as React from 'react';
import { Link } from 'react-router-dom';
import { version } from '../../package.json';

export interface IHomeProps {
}

export default class Home extends React.Component<IHomeProps> {
  public render() {
    return (
      <div>
        <h1>Relatable Notes</h1>
        <p>{version}</p>
        <p>
          <button>
            <Link to="notepad">Make Notes</Link>
          </button>
        </p>
        <p>
          <button>
            <Link to="preview">Get Visuals</Link>
          </button>
        </p>
        <p>This is my relatable notepad project, create limitless notes that can be joint in a herarchical structure..</p>
        <p>Then display, merge with other notes and share them, fast..</p>
      </div>
    );
  }
}
