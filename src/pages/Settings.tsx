import { FunctionComponent, useEffect, useReducer } from 'react';
import { initialState, NotepadReducer } from '../data/NotepadReducer';

interface ISettingsProps {
}

const Settings: FunctionComponent<ISettingsProps> = (props: ISettingsProps) => {
  const [settings, dispatch] = useReducer(NotepadReducer, [], () => {
    const localData = localStorage.getItem("settings");
    return localData && localData.length > 0 ? JSON.parse(localData) : initialState.settings
  });
  
  useEffect(() => {
    console.log(settings);
    // const settingsSaved = localStorage.getItem('settings');
    // if (settingsSaved) console.log(JSON.parse(settingsSaved));
  }, []);
  
  const handleClick = () => {
    localStorage.setItem('settings', JSON.stringify({
        'search-bar': true,
        'unique-notes': true,
        'case-sensitive-search': true,
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
