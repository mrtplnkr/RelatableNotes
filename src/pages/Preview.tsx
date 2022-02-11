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
    const linkNode = data.nodes.find(x => x.id === nodeId);
    window.open(`${linkNode?.url}`);
  };

  const onClickLink = function(source: string, target: string) {
    console.log(`addtional functionality for links between nodes go here ${source} and ${target}`);
  };

  const { notes, dispatchNotes} = useNotepadContext();

  React.useEffect(() => {
    console.log({
      nodes: notes.map(x => { return {
        id: x.text.toString(),
        url: x.text
      }}),
      links: notes.filter(x => x.parentId !== null).map(x => { return {
        source: x.text.toString(),
        target: notes.find(a => a.id === x.parentId)!.text
      }})
    });
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
    // .attr('fill', 'white');
  }, [])

  console.log(data);
  

  return (
    <div>
      {props.data && props.data.map((e, index) => {
        return <div key={index}>
          lala {e.text}
          <Graph
            onNodePositionChange={(e)=> console.log(e)}
            id="noteGraph" // id is mandatory
            data={data}
            config={myConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
          />
        </div>
      })}


    </div>
  );
}
