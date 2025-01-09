export interface Contract {
  title: string;
  controls: Control[];
  submitUrl: string;
}

export interface Control {
  id: string;
  control: string;
  caption: string;
  parentID: string;
  tabIndex: number;
  position: number;
  type?: string;
  required?: string;
}

export interface ControlParent extends Control {
  childs?: Control[];
}
