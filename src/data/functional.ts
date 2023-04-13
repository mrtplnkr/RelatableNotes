
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
