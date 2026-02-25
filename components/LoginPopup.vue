<template>
  <div class="login-popup" v-if="show">
    <div class="login-popup__overlay" @click="closePopup"></div>
    <div class="login-popup__content">
      <h2>Login</h2>
      <form @submit.prevent="submitForm">
        <input v-model="email" type="email" placeholder="Email (Gmail only)" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button class="login-popup__submit" type="submit">Login</button>
      </form>
      <button class="login-popup__close" @click="closePopup">&times;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['close'])

const email = ref('')
const password = ref('')

function closePopup() {
  emit('close')
}

function submitForm() {
  // Handle login logic here
  closePopup()
}
</script>

<style scoped>
.login-popup {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.login-popup__overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
}
.login-popup__content {
  position: relative;
  background: #fff;
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  min-width: 320px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.login-popup__content h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.login-popup__content input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.login-popup__submit {
  width: 100%;
  padding: 0.6rem 0;
  background: var(--color-green, #4caf50);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 0.5rem;
}
.login-popup__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
}
</style>
