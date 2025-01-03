export interface editContractType {
  title: string;
  controls: Array<{
    id: string;
    control: string;
    caption: string;
    parentID: string;
    tabIndex: number;
    position: number;
    type?: string;
    required?: string;
  }>;
  submitUrl: string;
}

export const formEditMock: editContractType = {
  title: "Открыть договор",
  controls: [
    {
      id: "5927943491",
      control: "FORM",
      caption: "Открыть договор",
      parentID: "",
      tabIndex: 0,
      position: 0,
    },
    {
      id: "5927943492",
      control: "TEXT",
      caption: "Кредит",
      parentID: "5927943491",
      tabIndex: 1,
      position: 2,
      type: "text",
      required: "true",
    },
    {
      id: "5927943493",
      control: "BUTTON",
      caption: "OK",
      parentID: "5927943491",
      tabIndex: 4,
      position: 4,
      type: "button",
    },
    {
      id: "5927943494",
      control: "BUTTON",
      caption: "Отмена",
      parentID: "5927943491",
      tabIndex: 5,
      position: 5,
      type: "button",
    },
    {
      id: "5927943495",
      control: "LABEL",
      caption: "Вид кредита",
      parentID: "5927943492",
      tabIndex: -1,
      position: 1,
      type: "label",
    },
    {
      id: "5927943496",
      control: "TEXT",
      caption: "Финансовый продукт",
      parentID: "5927943491",
      tabIndex: 6,
      position: 3,
      required: "true",
      type: "text",
    },
  ],
  submitUrl: "/api/submitForm",
};
