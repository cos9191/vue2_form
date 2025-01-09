import Vue from "vue";
import { Contract, Control } from "@/types/ContractTypes";

export const ContractStore = Vue.observable({
  form: JSON.parse(localStorage.getItem("contract") || "{}"),
});

export const mutations = {
  updateContract(key: string, value: any) {
    ContractStore.form[key] = value;
    localStorage.setItem("contract", JSON.stringify(ContractStore.form));
  },
  resetContract() {
    ContractStore.form = JSON.parse(localStorage.getItem("contract") || "{}");
  },
  setContract(contract: Contract) {
    ContractStore.form = { ...contract };
    ContractStore.form.controls.sort(
      (a: Control, b: Control) => a.position - b.position
    );
    localStorage.setItem("contract", JSON.stringify(contract));
  },
};
