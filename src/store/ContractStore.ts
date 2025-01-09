import Vue from "vue";
import { formDataMock } from "@/mocks/FormDataMock";

export const ContractStore = Vue.observable({
  form: JSON.parse(localStorage.getItem("contract") || "{}"),
});

export const mutations = {
  updateContract(key: string, value: any) {
    ContractStore.form[key] = value;
    localStorage.setItem("contract", JSON.stringify(ContractStore.form));
  },
  resetContract() {
    ContractStore.form = { ...formDataMock }; // Сбрасываем данные в изначальное состояние
    localStorage.setItem("contract", JSON.stringify(formDataMock));
  },
};
