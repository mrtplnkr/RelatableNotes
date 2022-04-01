import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Dispatch } from 'react';
import { INote } from '../../data/NotepadReducer';

interface IOrderButtonsProps {
    mainNote: INote;
    dispatch: Dispatch<{ type: string; payload: INote }>;
}

const OrderButtons: React.FunctionComponent<IOrderButtonsProps> = (props) => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
        <FontAwesomeIcon cursor={'pointer'} icon={faSortUp} onClick={() => {
            props.dispatch({type: 'moveUp', payload: props.mainNote}) 
        }} />
        <FontAwesomeIcon cursor={'pointer'} icon={faSortDown} onClick={() => {
            props.dispatch({type: 'moveDown', payload: props.mainNote})
        }} />
    </div>);
};

export default OrderButtons;
