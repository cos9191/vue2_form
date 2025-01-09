<template>
  <div>
    <Loader v-if="isLoading" text="Загрузка данных..." />
    <ul v-else class="d-flex flex-column gap-1 list-style-none">
      <li>
        <button @click="openContract(contractMock1())" class="btn btn-neutral">
          Договор №1 (Из ТЗ)
        </button>
      </li>
      <li>
        <button @click="openContract(contractMock2())" class="btn btn-neutral">
          Договор №2
        </button>
      </li>
    </ul>

    <!-- Модальное окно -->
    <Modal :visible="showModal" @close="closeModal">
      <form @submit.prevent="submitHandler" ref="formRef">
        <div class="modal-content-wrapper">
          <h3>{{ formEditData?.title }}</h3>
          <template v-for="(item, index) in contractStore.form.controls">
            <div
              v-if="!isBtn(item) && item.control !== 'FORM'"
              class="modal-content-wrapper border-bottom pt-1 pb-1"
              :key="index"
            >
              <label
                v-if="item.control === 'LABEL'"
                :for="item.parentID"
                class="align-self-start pb-1"
              >
                {{ item.caption }}
              </label>
              <input
                v-else-if="item.control === 'TEXT'"
                :id="item.id"
                type="text"
                :key="index"
                :value="formValues[item.id]"
                :placeholder="item.caption"
                :required="item.required === 'true'"
                class="input"
              />
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <template v-for="(item, index) in contractStore.form.controls">
            <button
              v-if="isSubmit(item)"
              @click="submitHandler"
              :key="index"
              class="btn btn-positive"
              type="submit"
            >
              OK
            </button>
            <button
              v-if="item.caption === 'Отмена'"
              @click="closeModal"
              :key="index"
              class="btn btn-neutral"
              type="button"
            >
              Отмена
            </button>
          </template>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { contractMock1, contractMock2 } from "@/mocks/FormDataMock";
import Loader from "@/components/utils/Loader.vue";
import Modal from "@/components/utils/Modal.vue";
import { BTN, SUBMIT } from "@/composables/useConst";
import { Contract, Control, ControlParent } from "@/types/ContractTypes";
import { ContractStore, mutations } from "@/store/ContractStore";

@Component({
  methods: {
    contractMock2() {
      return contractMock2;
    },
    contractMock1() {
      return contractMock1;
    },
  },
  components: {
    Loader,
    Modal,
  },
})
export default class ContractsView extends Vue {
  formEditData: Contract | null = null;
  isLoading = true;
  showModal = false;
  formValues: Record<string, string> = {};

  contractMock1() {
    return contractMock1;
  }
  contractMock2() {
    return contractMock2;
  }

  get contractStore() {
    return ContractStore;
  }
  initForm() {
    // resetContract()
    mutations.resetContract();
    this.formValues = {};
    this.contractStore.form.controls.forEach((control: Control) => {
      if (control.control === "TEXT") {
        this.formValues[control.id] = "";
      }
    });
  }

  isSubmit(control: Control): boolean {
    return control.control === BTN && control.caption === SUBMIT;
  }
  isBtn(control: Control): boolean {
    return control.control === BTN;
  }

  openContract(contract: Contract): void {
    mutations.setContract(contract);
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }

  submitHandler(): void {
    const form = this.$refs.formRef as HTMLFormElement;
    if (form.checkValidity()) {
      console.log("Form submitted:", this.formEditData);
      this.showModal = false;
    }
  }

  mounted() {
    // this.formEditData = contractMock1;
    // this.formEditData.controls.sort((a, b) => a.position - b.position);
    // this.formEditData.controls = this.formEditData.controls.reduce(
    //   (updatedControls, controlChild: Control) => {
    //     if (
    //       this.formEditData &&
    //       controlChild.parentID !== this.formEditData.controls[0]?.id
    //     ) {
    //       const parent: ControlParent | undefined =
    //         this.formEditData.controls.find(
    //           (controlParent: Control) =>
    //             controlParent.id === controlChild.parentID
    //         );
    //       if (parent) {
    //         if (!parent.childs) {
    //           parent.childs = [];
    //         }
    //         if (parent.childs[0]?.id !== controlChild.id) {
    //           parent.childs.push(controlChild);
    //         }
    //         return updatedControls;
    //       }
    //     }
    //     updatedControls.push(controlChild);
    //     return updatedControls;
    //   },
    //   [] as Control[]
    // );
    // console.log("mounted", this.formEditData.controls);
    this.initForm();
    // console.log("Store:", this.contractStore.form.controls);
    localStorage.setItem("contract", JSON.stringify(ContractStore.form));
    console.log(localStorage.getItem("contract"));
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
</script>

<style lang="scss" scoped>
.modal-content-wrapper {
  display: flex;
  flex-direction: column;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>
