import { faCalendarTimes, faRandom, faSitemap, faSpellCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <button className="primary">
            <Link to="notepad">Make Notes</Link>
          </button>
        </p>
        <p>
          <button className="primary">
            <Link to="preview">Get Visuals</Link>
          </button>
        </p>
        <div style={{margin: '0 3em'}}>
          <p>This is my relatable notepad project, create limitless notes that can be joint in a herarchical structure..</p>
          <p>Then display, merge with other notes and share them, fast..</p>
        </div>
        <div style={{margin: '0 20%'}}>
          <div style={{textAlign: 'left'}}>
            <div>
              <FontAwesomeIcon color="lightBlue" icon={faSpellCheck} cursor='pointer' />
              <span style={{padding: '0 0.5em'}}>todo list notes with ability to cross them out</span>
            </div>
            <div>
              <FontAwesomeIcon color="lightBlue" title="hierarchic" icon={faSitemap} cursor='pointer' />
              <span style={{padding: '0 0.5em'}}>hierarchic notes with links</span>
            </div>
            <div>
              <FontAwesomeIcon color="lightBlue" title="timeline" icon={faRandom} cursor='pointer' />
              <span style={{padding: '0 0.5em'}}>timeline notes with calendar features</span>
            </div>
            <div>
              <FontAwesomeIcon color="lightBlue" title="event" icon={faCalendarTimes} cursor='pointer' />
              <span style={{padding: '0 0.5em'}}>event notes that provides a map</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
