<template>
  <transition
    name="modal"
    @before-enter="beforeEnter"
    @after-leave="afterLeave"
  >
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-btn" @click="closeModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-x"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
        <slot />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Modal extends Vue {
  @Prop({ type: Boolean, default: false }) visible!: boolean;
  closeModal(): void {
    this.$emit("close");
  }
  beforeEnter(el: HTMLElement): void {
    el.style.visibility = "visible";
  }

  afterLeave(el: HTMLElement): void {
    el.style.visibility = "hidden";
  }
}
</script>

<style lang="scss" scoped>
// Фон
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  visibility: hidden;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 1;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

// Содержимое
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  min-width: 300px;
  opacity: 1;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

// Кнопка закрыть
.modal-close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #ff0000;
  }
  &:focus {
    outline: none;
    color: #ff0000;
  }
  &:active {
    transform: scale(0.9);
  }
}

// Анимации
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
  opacity: 1;
}
.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-content {
  opacity: 0;
  transform: translateY(50px);
}
.modal-leave-to .modal-content {
  opacity: 0;
  transform: translateY(50px);
}
.modal-leave-active .modal-content {
  opacity: 0;
}
</style>
