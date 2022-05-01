
export const figureOutTheColor = (text: string, highlighted: boolean) => {
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
