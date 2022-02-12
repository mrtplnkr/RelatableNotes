import * as React from 'react';
import * as d3 from 'd3';
import { Graph } from "react-d3-graph";
import { useState } from 'react';
import { useNotepadContext } from '../data/NotepadContext';
import { Link } from 'react-router-dom';
import { compareLatest } from './Notepad';

export interface IPreviewProps {
  data: any[]
}

interface INode {
  id: string;
  url: string;
}
interface ILink {
  source: string;
  target: string;
}
interface IGraphData {
  nodes: INode[];
  links: ILink[];
}

export function Preview (props: IPreviewProps) {

  // graph payload (with minimalist structure)
  const [data, setData] = useState<IGraphData>();
  const [childrenIds, setChildrenIds] = useState<number[]>();

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
    filterData(filter);
  }, [])

  React.useEffect(() => {
    if (childrenIds?.length && data?.nodes) {
      const childrenBeingAdded = notes.filter(x => childrenIds.includes(x.parentId!));
      
      if (childrenBeingAdded.length) {
        //append
        setData({
          nodes: data!.nodes.concat(childrenBeingAdded.map(x => { return {
            id: x.text.toString(),
            url: x.text
          }})),
          links: data!.links
          .concat(childrenBeingAdded.map(x => { return {
            source: x.text.toString(),
            target: notes.find(a => a.id === x.parentId)!.text
          }}))
        })

        setChildrenIds(notes.some(x => childrenBeingAdded.map(a => a.id).includes(x.parentId!)) ? childrenBeingAdded.map(a => a.id) : []);
      }
     
    }
  }, [notes, data, childrenIds])

  const [filter, setFilter] = useState(notes.filter(x => x.parentId === null).sort(compareLatest)[0].text);

  const filterData = (filtered: string) => {
    const parentIds = notes.filter(x => filtered === x.text).map(q => q.id);
    const childrenIds = notes.filter(x => parentIds.includes(x.parentId!)).map(x => x.id);
    //first set
    setData({
      nodes: notes.filter(x => filtered === x.text 
      || (x.parentId !== null && childrenIds.includes(x.id))).map(x => { return {
        id: x.text.toString(),
        url: x.text,
        color: x.parentId === null ? 'blue' : 'red',
      }}),
      links: notes.filter(x => x.parentId !== null
        && parentIds.includes(x.parentId)).map(x => { return {
        source: x.text.toString(),
        target: notes.find(a => a.id === x.parentId)!.text
      }})
    });
    setChildrenIds(childrenIds);
  }

  return (
    <div>
      <>
        <details>
          <summary>
            Note Relationships
          </summary>
          {notes && notes.filter(x => x.parentId === null).sort(compareLatest).map((e, index) => {
            return <div key={index}>
              <label style={{fontSize: '0.5em'}}>
                {e.text}
                <input value={e.text} type="radio" name="parents" defaultChecked={index === 0}
                  onChange={(chk) => {
                    setFilter(chk.target.value)
                    filterData(chk.target.value);
                  }} />
              </label>
            </div>
          })}
        </details>
        
        {data?.nodes.length && <Graph
          onNodePositionChange={(e)=> console.log(e)}
          id="noteGraph" // id is mandatory
          data={data}
          config={myConfig}
          onClickNode={onClickNode}
          onClickLink={onClickLink}
        />}
      </>
      
      <p>
        <Link to="/notepad">Notepad</Link>
      </p>
    </div>
  );
}
