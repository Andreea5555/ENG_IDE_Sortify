<template>
  <div class="login-popup" v-if="show">
    <div class="login-popup__overlay" @click="closePopup"></div>
    <div class="login-popup__content login-popup__content--column">
      <img src="/Logo.png" alt="Sortify Logo" class="login-popup__logo" />
      <h2>Login</h2>
      <p class="login-popup__tagline">Welcome back to your circular workspace.</p>
      <div class="login-popup__benefits" role="list">
        <span role="listitem">Single sign-on ready</span>
        <span role="listitem">Enterprise-grade security</span>
      </div>
      <form @submit.prevent="submitForm">
        <input v-model="email" type="email" placeholder="Email (Gmail only)" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <div v-if="submitError" class="login-popup__error">{{ submitError }}</div>
        <div class="login-popup__form-actions">
          <button class="login-popup__support" type="button">Need help?</button>
          <button class="login-popup__submit" type="submit">Access account</button>
        </div>
      </form>
      <div class="login-popup__signup-row">
        <span>Don't have an account?</span>
        <button class="login-popup__signup-btn" type="button" @click="onSignUp">Sign Up</button>
      </div>
      <p class="login-popup__status">We keep your sessions encrypted and audit-ready.</p>
      <button class="login-popup__close" @click="closePopup">&times;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['close', 'show-signup'])

const email = ref('')
const password = ref('')
const submitError = ref('')

function closePopup() {
  emit('close')
}

async function submitForm() {
  submitError.value = ''

  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  })

  const result = await response.json()
  if (!result.success) {
    submitError.value = result.message || 'Login failed'
    return
  }

  if (import.meta.client) {
    localStorage.setItem('sortifyUser', JSON.stringify(result.user))
  }

  closePopup()
}

function onSignUp() {
  emit('show-signup')
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
  background: linear-gradient(140deg, #fdf7ef, #fff9f0);
  padding: 2.4rem 2.75rem;
  border-radius: 28px;
  box-shadow: 0 28px 70px rgba(17, 42, 27, 0.25);
  min-width: 320px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgba(31, 42, 31, 0.1);
}
.login-popup__content--column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.login-popup__logo {
  width: 60px;
  height: 60px;
  min-width: 60px;
  min-height: 60px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: none;
  background: transparent;
  margin: 0 0 0.2rem 0;
}
.login-popup__signup-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.login-popup__signup-btn {
  background: none;
  border: none;
  color: var(--color-green, #4caf50);
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
  padding: 0;
  border-radius: 6px;
  transition: color 0.2s;
}
.login-popup__signup-btn:hover {
  color: var(--color-brown, #795548);
}
.login-popup__content h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
}
.login-popup__tagline {
  margin: -0.75rem 0 0.25rem;
  text-align: center;
  color: rgba(31, 42, 31, 0.65);
}
.login-popup__benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
}
.login-popup__benefits span {
  flex: 1 1 140px;
  border-radius: 14px;
  padding: 0.5rem 0.85rem;
  background: rgba(47, 122, 62, 0.08);
  border: 1px solid rgba(47, 122, 62, 0.15);
  font-size: 0.85rem;
  color: #1f2a1f;
}
.login-popup__error {
  color: #8b1d1d;
  background: #ffe6e6;
  border: 1px solid #f5bdbd;
  border-radius: 10px;
  padding: 0.55rem 0.75rem;
  margin: 0 0 0.75rem;
  font-size: 0.88rem;
}
.login-popup__content input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid rgba(31, 42, 31, 0.18);
  border-radius: 12px;
  font-size: 1rem;
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.login-popup__content input:focus {
  border-color: rgba(47, 122, 62, 0.6);
  box-shadow: 0 0 0 3px rgba(47, 122, 62, 0.15);
  outline: none;
}
.login-popup__form-actions {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.login-popup__support {
  background: transparent;
  border: none;
  color: rgba(31, 42, 31, 0.65);
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}
.login-popup__submit {
  flex: 1;
  padding: 0.75rem 0;
  background: linear-gradient(120deg, #2f7a3e, #6b4f32);
  color: #fff;
  border: none;
  border-radius: 999px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(47, 122, 62, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
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
.login-popup__support:hover,
.login-popup__submit:hover {
  transform: translateY(-1px);
}
.login-popup__status {
  margin: 0.25rem 0 0;
  text-align: center;
  color: rgba(31, 42, 31, 0.6);
  font-size: 0.9rem;
}
</style>
