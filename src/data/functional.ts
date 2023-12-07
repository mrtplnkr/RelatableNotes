import { Dispatch } from "react";

export const figureOutTheColor = (text: string, highlighted: boolean, exact: boolean) => {
    if (exact) return 'red';
    if (text) {
      if (highlighted) {
        return 'green';
      } else {
        return 'red';
      }
    } else {
      return 'white';
    }
}

export const delay = async (disp: Dispatch<any>, arr: number[]) => {
  for await (let id of arr.reverse()) {
      await sleep(800 / arr.length);
      disp({type: 'highlightNote', payload: {id: id, parentId: null, order: 0, text: ''}});
  };
}

const sleep = (delay: number) => {
  return new Promise(resolve => {
      setTimeout(resolve, delay);
  });
}
