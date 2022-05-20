import * as React from 'react';
import { INote } from '../../data/NotepadReducer';
import { compareLatest } from '../../pages/Notepad';

export interface INoteSelectionProps {
    notes: INote[];
    selectNote(val: string): void;
    opened: boolean;
}

export function NoteSelection(props: INoteSelectionProps) {
  return (
    <div>
      <details open={props.opened}>
          <summary style={{margin: '10px'}}>
            Note Relationships
          </summary>
          {props.notes.filter(x => x.parentId === null).sort(compareLatest).map((e, index) => {
            return <div key={index}>
              <label style={{fontSize: '0.5em'}}>
                {e.text}
                <input value={e.id} type="radio" name="parents" defaultChecked={index === 0}
                  onChange={(chk) => props.selectNote(chk.target.value)} />
              </label>
            </div>
          })}
        </details>
    </div>
  );
}
