import { FunctionComponent } from 'react';

interface ISettingsProps {
}

const Settings: FunctionComponent<ISettingsProps> = (props) => {
  
  const handleClick = () => {
    localStorage.setItem('settings', JSON.stringify({
        'search-bar': true,
        'unique-notes': true,
        'sensitive-search': true,
    }));
    // eslint-disable-next-line no-restricted-globals
    history.back();
  }

  return <>
    <ul>
        <li>
            Sticky Search-bar
        </li>
        <li>
            Unique Notes
        </li>
        <li>
            Case-sensitive Search
        </li>
    </ul>
    <button className={'primary'} style={{margin: '20px'}} onClick={() => handleClick()}>Save</button>
  </>;
};

export default Settings;
