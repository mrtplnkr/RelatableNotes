import * as React from 'react';
import * as d3 from 'd3';
import { Graph } from "react-d3-graph";
import { useState } from 'react';
import { useNotepadContext } from '../data/NotepadContext';

export interface IPreviewProps {
  data: any[]
}

export function Preview (props: IPreviewProps) {

  // graph payload (with minimalist structure)
  const [data, setData] = useState({
    nodes: [
      { id: "Harry", url: '123' }, 
      { id: "Sally", url: '234' }, 
      { id: "Alice", url: '345' }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  });

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
      fontColor: 'white'
    },
    link: {
      color: 'blue',
      highlightColor: "lightblue",
    },
  };

  const onClickNode = function(nodeId: string) {
    window.open(`https://google.com/search?q=${nodeId}`);
  };

  const onClickLink = function(source: string, target: string) {
    console.log(`addtional functionality for links between nodes go here ${source} and ${target}`);
  };

  const { notes, dispatchNotes} = useNotepadContext();

  React.useEffect(() => {
    setData({
      nodes: notes.map(x => { return {
        id: x.text.toString(),
        url: x.text
      }}),
      links: notes.filter(x => x.parentId !== null).map(x => { return {
        source: x.text.toString(),
        target: notes.find(a => a.id === x.parentId)!.text
      }})
    });
  }, [])

  const [filter, setFilter] = useState(notes.filter(x => x.parentId === null).map(x => x.text));

  const filterData = (filtered: string[]) => {
    const parentIds = notes.filter(x => filtered.includes(x.text)).map(q => q.id);
    const childrenIds = notes.filter(x => parentIds.includes(x.parentId!)).map(x => x.id);
    console.log('parentIds', parentIds, notes.filter(x => x.parentId !== null
      && parentIds.includes(x.id)));
    
    setData({//text is not id / not unique to track parent by text is hard
      nodes: notes.filter(x => filtered.includes(x.text) 
      || (x.parentId !== null && childrenIds.includes(x.id))).map(x => { return {
        id: x.text.toString(),
        url: x.text
      }}),
      links: notes.filter(x => x.parentId !== null
        && parentIds.includes(x.parentId)).map(x => { return {
        source: x.text.toString(),
        target: notes.find(a => a.id === x.parentId)!.text
      }})
    })
  }

  return (
    <div>
      <>
        <details>
          <summary>
            Note Relationships
          </summary>
          {notes && notes.filter(x => x.parentId === null).map((e, index) => {
            return <div key={index}>
              <label style={{fontSize: '0.5em'}}>
                {e.text}
                <input value={e.text} type="checkbox" defaultChecked={filter.includes(e.text)} 
                  onChange={(chk) => {
                    setFilter(filter.includes(chk.target.value) ? filter.filter(f => f !== e.text) : filter.concat([chk.target.value]))
                    filterData(filter.includes(chk.target.value) ? filter.filter(f => f !== e.text) : filter.concat([chk.target.value]));
                  }} />
              </label>
            </div>
          })}
        </details>
        
        <Graph
          onNodePositionChange={(e)=> console.log(e)}
          id="noteGraph" // id is mandatory
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />
      </>
    </div>
  );
}
