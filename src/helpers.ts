export function debounce(fn : Function, wait?: number){
  if (!wait){
    wait = 200;
  }
  let timeoutID: number;
  return function () {
    clearTimeout(timeoutID);
    const args = arguments;
    // @ts-ignore
    const self = this;
    timeoutID = setTimeout(function () {
      fn.apply(self, args)
    }, wait)
  }
}
