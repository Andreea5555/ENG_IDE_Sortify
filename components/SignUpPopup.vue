<template>
  <div class="signup-popup" v-if="show">
    <div class="signup-popup__overlay" @click="closePopup"></div>
    <div class="signup-popup__content signup-popup__content--column">
      <img src="/Logo.png" alt="Sortify Logo" class="signup-popup__logo" />
      <div class="signup-popup__form-wrapper">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitForm">
          <input v-model="firstName" type="text" placeholder="First Name" required />
          <input v-model="lastName" type="text" placeholder="Last Name" required />
          <input v-model="phone" type="text" placeholder="Phone Number (+45)" required pattern="^\+45\d{8}$" maxlength="11" @input="onPhoneInput" />
          <input v-model="email" type="email" placeholder="Email (Gmail only)" required @input="onEmailInput" />
          <input v-model="password" type="password" placeholder="Password" required @input="onPasswordInput" />
          <div v-if="phoneError" class="signup-popup__error">Phone must start with +45 and have 8 digits after.</div>
          <div v-if="emailError" class="signup-popup__error">Email must be a valid Gmail address.</div>
          <div v-if="passwordError" class="signup-popup__error">
            Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.
          </div>
          <div class="signup-popup__type-checkboxes">
            <label>
              <input type="checkbox" value="private" v-model="userType" :checked="userType === 'private'" @change="userType = 'private'" />
              Private Person
            </label>
            <label>
              <input type="checkbox" value="business" v-model="userType" :checked="userType === 'business'" @change="userType = 'business'" />
              Business
            </label>
          </div>
          <button class="signup-popup__submit" type="submit" :disabled="phoneError || emailError || passwordError">Sign Up</button>
        </form>
        <div class="signup-popup__login-row">
          <span>Already have an account?</span>
          <button class="signup-popup__login-btn" type="button" @click="onLogin">Login</button>
        </div>
      </div>
      <button class="signup-popup__close" @click="closePopup">&times;</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['close', 'signed-up', 'show-login'])

const firstName = ref('')
const lastName = ref('')
const phone = ref('')
const email = ref('')
const password = ref('')
const userType = ref<'private' | 'business'>('private')

const phoneError = ref(false)
const emailError = ref(false)
const passwordError = ref(false)

function onPhoneInput(e: Event) {
  let val = (e.target as HTMLInputElement).value
  // Only allow +45 and numbers, max 11 chars
  if (!val.startsWith('+45')) {
    val = '+45' + val.replace(/[^\d]/g, '')
  } else {
    val = '+45' + val.slice(3).replace(/[^\d]/g, '')
  }
  phone.value = val.slice(0, 11)
  phoneError.value = !/^\+45\d{8}$/.test(phone.value)
}

function onEmailInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  email.value = val
  // Must be a valid Gmail address
  emailError.value = !/^([a-zA-Z0-9_.+-]+)@gmail\.com$/.test(email.value)
}

function onPasswordInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  password.value = val
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  passwordError.value = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(password.value)
}

watch(phone, (val) => {
  phoneError.value = !/^\+45\d{8}$/.test(val)
})
watch(email, (val) => {
  emailError.value = !/^([a-zA-Z0-9_.+-]+)@gmail\.com$/.test(val)
})
watch(password, (val) => {
  passwordError.value = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(val)
})

function closePopup() {
  emit('close')
}

function submitForm() {
  if (phoneError.value || emailError.value || passwordError.value) return
  // Only emit 'signed-up' if userType is 'private'
  if (userType.value === 'private') {
    emit('signed-up')
  }
  closePopup()
}

function onLogin() {
  emit('show-login')
}
</script>

<style scoped>
.signup-popup {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.signup-popup__overlay {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
}
.signup-popup__content {
  position: relative;
  background: linear-gradient(135deg, var(--color-green, #4caf50) 0%, var(--color-brown, #795548) 100%);
  padding: 2rem 2.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.18);
  min-width: 320px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #fff;
}
.signup-popup__content--column {
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.signup-popup__logo {
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
.signup-popup__form-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  box-sizing: border-box;
}
.signup-popup__form-wrapper h2 {
  width: 100%;
  text-align: center;
  margin-bottom: 0.2rem;
}
.signup-popup__content h2 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}
.signup-popup__form-wrapper input[type="text"],
.signup-popup__form-wrapper input[type="email"],
.signup-popup__form-wrapper input[type="password"] {
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.75rem;
  border: 1px solid var(--color-brown, #795548);
  border-radius: 6px;
  font-size: 1rem;
  background: #fff;
  color: #333;
}
.signup-popup__error {
  color: #ffdddd;
  background: #ff4d4d;
  padding: 0.5rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}
.signup-popup__type-checkboxes {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  justify-content: center;
}
.signup-popup__type-checkboxes label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #fff;
  background: var(--color-brown, #795548);
  padding: 0.4rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}
.signup-popup__type-checkboxes input[type="checkbox"] {
  accent-color: var(--color-green, #4caf50);
  width: 18px;
  height: 18px;
}
.signup-popup__submit {
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
  box-shadow: 0 2px 8px rgba(76,175,80,0.15);
  transition: background 0.2s;
}
.signup-popup__submit:hover {
  background: #388e3c;
}
.signup-popup__close {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}
.signup-popup__login-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.signup-popup__login-btn {
  background: none;
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  font-size: 1rem;
  padding: 0;
}
.signup-popup__login-btn:hover {
  color: var(--color-green, #4caf50);
}
@media (max-width: 600px) {
  .signup-popup__content--row {
    flex-direction: column;
    gap: 1rem;
  }
  .signup-popup__logo {
    margin-bottom: 1rem;
  }
}
</style>
