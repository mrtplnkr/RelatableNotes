import * as React from 'react';
import * as d3 from 'd3';
import { Graph } from "react-d3-graph";

export interface IPreviewProps {
  data: any[]
}

export function Preview (props: IPreviewProps) {

  // graph payload (with minimalist structure)
  const data = {
    nodes: [
      { id: "Harry", url: '123' }, 
      { id: "Sally", url: '234' }, 
      { id: "Alice", url: '345' }],
    links: [
      { source: "Harry", target: "Sally" },
      { source: "Harry", target: "Alice" },
    ],
  };

  // the graph configuration, just override the ones you need
  const myConfig = {
    nodeHighlightBehavior: true,
    node: {
      color: "lightgreen",
      size: 120,
      highlightStrokeColor: "blue",
    },
    link: {
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

  return (
    <div>
      {props.data && props.data.map((e) => {
        return <div>
          lala {e.text}
          <Graph
            onNodePositionChange={(e)=> console.log(e)}
            id="graph-id" // id is mandatory
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
