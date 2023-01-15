import { OptionProp } from './types/supabase';

export class optionColor {
  prev: optionColor | undefined;
  color: string;
  next: optionColor | undefined;
  first: optionColor | undefined;
  constructor(
    curr: string,
    prev?: optionColor | undefined,
    next?: optionColor | undefined,
    first?: optionColor | undefined
  ) {
    this.color = curr;
    this.prev = prev;
    this.next = next;
    this.first = first;
  }
}

export const optionColors = ['#ffa63d', '#ff3d77', '#8fbfff', '#3cf0c5'];
const colorNode = optionColors
  .slice(1)
  .reduce((optionColorClass: optionColor, color, idx, arr) => {
    if (idx === 0) optionColorClass.first = optionColorClass;
    const currentNode: optionColor = new optionColor(
      color,
      optionColorClass,
      undefined,
      optionColorClass.first
    );
    optionColorClass.next = currentNode;
    if (idx === arr.length - 1) {
      currentNode.next = optionColorClass.first as optionColor;
    }
    return optionColorClass.next!;
  }, new optionColor(optionColors[0]));

export type OptionColorNode = OptionProp & { colorNode: optionColor };
export const randOptionColor = (options: OptionProp[]): OptionColorNode[] =>
  options.slice(1).reduce(
    (result, opt, idx) => [
      ...result,
      {
        ...opt,
        colorNode: result[idx].colorNode.next as optionColor
      }
    ],
    [{ ...options[0], colorNode }] as OptionColorNode[]
  );
