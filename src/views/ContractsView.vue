<template>
  <div>
    <Loader v-if="isLoading" text="Загрузка данных..." />
    <button v-else @click="openModal" class="btn btn-neutral">
      Договор №1
    </button>

    <!-- Модальное окно -->
    <Modal :visible="showModal" @close="closeModal">
      <form @submit.prevent="submitHandler" ref="formRef">
        <div class="modal-content-wrapper">
          <h3>{{ formEditData?.title }}</h3>
          <template v-for="(item, index) in formEditData?.controls">
            <div
              v-if="!isBtn(item) && item.control !== 'FORM'"
              class="modal-content-wrapper border-bottom pt-1 pb-1"
              :key="index"
            >
              <label
                v-if="item.childs?.[0]?.control === 'LABEL'"
                :for="item.childs?.[0]?.parentID"
                class="align-self-start pb-1"
              >
                {{ item.childs?.[0]?.caption }}
              </label>
              <input
                v-if="item.control === 'TEXT'"
                :id="item.id"
                type="text"
                :key="index"
                :value="textRef"
                :placeholder="item.caption"
                :required="item.required === 'true'"
                class="input"
              />
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <template v-for="(item, index) in formEditData?.controls">
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
import { formDataMock } from "@/mocks/FormDataMock";
import Loader from "@/components/utils/Loader.vue";
import Modal from "@/components/utils/Modal.vue";
import { ref } from "vue";
import { BTN, SUBMIT } from "@/composables/useConst";
import { Contract, Control, ControlParent } from "@/types/ContractTypes";

@Component({
  components: {
    Loader,
    Modal,
  },
})
export default class FormEditView extends Vue {
  formEditData: Contract | null = null;
  isLoading = true;
  showModal = false;
  textRef = ref("");

  isSubmit(control: Control): boolean {
    return control.control === BTN && control.caption === SUBMIT;
  }

  isBtn(control: Control): boolean {
    return control.control === BTN;
  }

  openModal(): void {
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
    this.formEditData = formDataMock;
    this.formEditData.controls.sort((a, b) => a.position - b.position);
    this.formEditData.controls = this.formEditData.controls.reduce(
      (updatedControls, controlChild: Control) => {
        if (
          this.formEditData &&
          controlChild.parentID !== this.formEditData.controls[0]?.id
        ) {
          const parent: ControlParent | undefined =
            this.formEditData.controls.find(
              (controlParent: Control) =>
                controlParent.id === controlChild.parentID
            );
          if (parent) {
            if (!parent.childs) {
              parent.childs = [];
            }
            if (parent.childs[0]?.id !== controlChild.id) {
              parent.childs.push(controlChild);
            }
            return updatedControls;
          }
        }
        updatedControls.push(controlChild);
        return updatedControls;
      },
      [] as Control[]
    );
    console.log("mounted", this.formEditData.controls);
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
