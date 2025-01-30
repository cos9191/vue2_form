<template>
  <div>
    <Loader v-if="isLoading" text="Загрузка данных..." />
    <ul v-else class="d-flex flex-column gap-1 list-style-none">
      <li v-for="(contract, index) in contracts()" :key="index">
        <button @click="openModal(index)" class="btn btn-neutral">
          {{ contract?.controls?.[0]?.caption }}
        </button>
      </li>
    </ul>

    <Modal :visible="showModal" @close="closeModal">
      <form @submit.prevent="submitHandler" ref="formRef">
        <div class="modal-content-wrapper">
          <h3>{{ contractStore?.form?.controls?.[0]?.caption }}</h3>
          <template v-for="(item, index) in contractStore.form.controls">
            <div
              v-if="!isBtn(item) && item?.control !== 'FORM'"
              class="modal-content-wrapper pt-1"
              :key="index"
              :class="{ 'border-bottom pb-1': item?.control !== 'LABEL' }"
            >
              <label
                v-if="item?.control === 'LABEL' && item.show !== false"
                :for="item?.parentID"
                class="align-self-start"
              >
                {{ item?.caption }}
              </label>
              <input
                v-else-if="item?.control === 'TEXT' && item.show !== false"
                :id="item?.id"
                type="text"
                :key="index"
                :value="contractStore?.form[item?.id]"
                :placeholder="item?.caption"
                :required="item?.required === 'true'"
                class="input"
                @input="inputValueHandle(item.id, $event)"
              />
              <textarea
                v-else-if="item?.control === 'TEXTAREA' && item.show !== false"
                :id="item?.id"
                :key="index"
                :value="contractStore?.form[item?.id]"
                :placeholder="item?.caption"
                :required="item?.required === 'true'"
                class="input"
                @input="inputValueHandle(item.id, $event)"
              />
              <input
                v-else-if="item?.control === 'CHECKBOX' && item.show !== false"
                :id="item?.id"
                type="checkbox"
                :key="index"
                :value="contractStore?.form[item?.id]"
                :placeholder="item?.caption"
                :required="item?.required === 'true'"
                class="input"
                @input="inputValueHandle(item.id, $event)"
              />
              <fieldset
                v-else-if="
                  item?.control === 'RADIOBUTTON' && item.show !== false
                "
              >
                <div>
                  <input type="radio" name="drone" :value="item?.caption" />
                  <label>{{ item?.caption }}</label>
                </div>
              </fieldset>
            </div>
          </template>
        </div>
        <div class="modal-footer">
          <template v-for="(item, index) in contractStore?.form?.controls">
            <button
              v-if="isSubmit(item)"
              :key="index"
              class="btn btn-positive"
              type="submit"
            >
              {{ item.caption }}
            </button>
            <button
              v-if="item?.caption === 'Отмена'"
              @click="closeModal"
              :key="index"
              class="btn btn-neutral"
              type="button"
            >
              {{ item.caption }}
            </button>
          </template>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { contracts } from "@/mocks/FormDataMock";
import Loader from "@/components/utils/Loader.vue";
import Modal from "@/components/utils/Modal.vue";
import { BTN, SUBMIT } from "@/composables/useConst";
import { Control } from "@/types/ContractTypes";
import { ContractStore, mutations } from "@/store/ContractStore";

@Component({
  components: {
    Loader,
    Modal,
  },
})
export default class ContractsView extends Vue {
  isLoading = true;
  showModal = false;

  contracts() {
    return contracts;
  }

  get contractStore() {
    return ContractStore;
  }

  isSubmit(control: Control): boolean {
    return control.control === BTN && control.caption === SUBMIT;
  }
  isBtn(control: Control): boolean {
    return control.control === BTN;
  }

  openModal(id: number): void {
    mutations.initContract(contracts[id]);
    this.showModal = true;
  }
  closeModal(): void {
    this.showModal = false;
  }

  submitHandler(): void {
    const form = this.$refs.formRef as HTMLFormElement;
    if (form.checkValidity()) {
      console.log("Form submitted:", ContractStore.form);
      this.showModal = false;
    }
  }

  inputValueHandle(id: number, e: InputEvent): void {
    mutations.updateContract(
      id.toString(),
      (e.target as HTMLInputElement)?.value
    );
  }

  mounted() {
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
