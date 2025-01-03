<template>
  <div class="edit">
    <Loader v-if="isLoading" text="Загрузка данных..." />
    <!--    <div v-else>-->
    <!--      <h2>{{ formEditData?.title }}</h2>-->
    <!--      {{ formEditData }}-->
    <!--    </div>-->
    <!-- Кнопка для открытия модального окна -->
    <button @click="showModal = true">Открыть модальное окно</button>

    <!-- Модальное окно -->
    <Modal :visible="showModal" @close="showModal = false">
      <h2>Это модальное окно</h2>
      <p>Здесь можно разместить любой контент.</p>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { editContractType, formEditMock } from "@/mocks/FormEditMock";
import Loader from "@/components/utility/Loader.vue";
import Modal from "@/components/Modal.vue";

@Component({
  components: {
    Loader,
    Modal,
  },
})
export default class FormEditView extends Vue {
  formEditData: editContractType | null = null;
  isLoading = true;
  showModal = false;

  mounted() {
    setTimeout(() => {
      this.formEditData = formEditMock;
      this.isLoading = false;
    }, 500);
  }
}
</script>

<style lang="scss" scoped>
.loader {
  font-size: 18px;
  font-weight: bold;
  color: #555;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
