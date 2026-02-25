<template>
  <div class="app-wrapper">
    <Navbar @show-signup="showSignUp = true">
      <template #logo>
        <!-- Use the user-provided Logo.png from assets (imported as `logo`) -->
        <img :src="logo" alt="Sortify logo" style="width:40px;height:40px;border-radius:6px;object-fit:cover" />
      </template>
    </Navbar>
    <SignUpPopup :show="showSignUp" @close="onSignUpClose" @signed-up="showCongrats = true" @show-login="onShowLogin" />
    <LoginPopup :show="showLogin" @close="onLoginClose" @show-signup="onShowSignUp" />
    <transition name="congrats-fade">
      <div v-if="showCongrats" class="congrats-popup">
        <div class="congrats-content">
          <svg class="congrats-check" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none" stroke="#4caf50" stroke-width="3"/><path fill="none" stroke="#4caf50" stroke-width="4" d="M14 27l8 8 16-16"/></svg>
          <h2>Congratulations!</h2>
          <p>You have signed up successfully.</p>
        </div>
      </div>
    </transition>
    <NuxtRouteAnnouncer />
    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppFooter from "../components/Footer.vue"
import Navbar from '../components/Navbar.vue'
import logo from '../assets/images/Logo.png'
import SignUpPopup from '../components/SignUpPopup.vue'
import LoginPopup from '../components/LoginPopup.vue'

const showSignUp = ref(false)
const showCongrats = ref(false)
const showLogin = ref(false)

function onSignUpClose() {
  showSignUp.value = false
  // Delay hiding congrats if it's visible
  if (showCongrats.value) {
    setTimeout(() => { showCongrats.value = false }, 2000)
  }
}
function onShowLogin() {
  showSignUp.value = false
  showLogin.value = true
}
function onLoginClose() {
  showLogin.value = false
}
function onShowSignUp() {
  showLogin.value = false
  showSignUp.value = true
}
</script>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.congrats-popup {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  background: rgba(0,0,0,0.25);
}
.congrats-content {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  box-shadow: 0 6px 32px rgba(76,175,80,0.18);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: pop-in 0.5s cubic-bezier(.68,-0.55,.27,1.55);
}
.congrats-check {
  width: 64px;
  height: 64px;
  margin-bottom: 1rem;
  display: block;
}
.congrats-content h2 {
  color: #4caf50;
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  font-weight: 700;
}
.congrats-content p {
  color: #333;
  font-size: 1.1rem;
  margin: 0;
}
@keyframes pop-in {
  0% { transform: scale(0.7); opacity: 0; }
  80% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); }
}
.congrats-fade-enter-active, .congrats-fade-leave-active {
  transition: opacity 0.5s;
}
.congrats-fade-enter-from, .congrats-fade-leave-to {
  opacity: 0;
}
</style>
