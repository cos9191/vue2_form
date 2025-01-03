<template>
  <div v-if="visible" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <slot></slot>
      <button class="modal-close" @click="closeModal">Закрыть</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean;

  @Emit() closeModal() {
    // Здесь ничего не нужно делать, потому что @Emit автоматически отправляет событие
  }

  // @Emit() close(): void {}
  //
  // closeModal() {
  //   this.close();
  // }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #555;
}

.modal-close:hover {
  color: #000;
}
</style>
