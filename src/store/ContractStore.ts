import Vue from "vue";
import { Contract, Control } from "@/types/ContractTypes";

export const ContractStore = Vue.observable({
  form: JSON.parse(localStorage.getItem("contract") || "{}"),
});

let currentContractId: null | number = null;

export const mutations = {
  updateContract(key: string, value: string | null) {
    ContractStore.form[key] = value;
    localStorage.setItem(
      `contract_${currentContractId}`,
      JSON.stringify(ContractStore.form)
    );
  },
  initContract(contract: Contract) {
    currentContractId = +contract.controls[0].id;
    const isContractExists = JSON.parse(
      <string>localStorage.getItem(`contract_${currentContractId}`)
    );
    if (isContractExists) {
      ContractStore.form = JSON.parse(
        <string>localStorage.getItem(`contract_${currentContractId}`)
      );
      ContractStore.form.controls.sort(
        (a: Control, b: Control) => a.position - b.position
      );
      console.log("new", ContractStore.form);
      return;
    }
    ContractStore.form = {};
    ContractStore.form = { ...contract };
    ContractStore.form.controls.sort(
      (a: Control, b: Control) => a.position - b.position
    );
    const temp = ContractStore.form.controls.filter(
      (control: Control) => control.unlocks
    );
    temp.forEach((control: Control) => {
      ContractStore.form.controls.find(
        (control_: Control) => +control_.id === control.unlocks
      ).show = false;
    });
    console.log("old", ContractStore.form, ContractStore.form.controls[6]);
  },
};
