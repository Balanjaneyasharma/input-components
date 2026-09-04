export type  nestedCheckbox = {
  id: number,
  name: string,
  checked: boolean;
  children? : nestedCheckbox[]
}