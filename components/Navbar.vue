<template>
  <header class="navbar" role="banner">
    <div class="navbar__inner">
      <a class="navbar__logo" href="/" aria-label="Home">
        <slot name="logo">
          <div class="logo-placeholder">S</div>
        </slot>
        <span class="site-title">Sortify</span>
      </a>

      <nav class="navbar__nav" role="navigation" aria-label="Main navigation" :class="{ 'navbar__nav--open': isMenuOpen }">
        <NuxtLink class="navbar__link" to="/marketplace" @click="handleNav">Marketplace</NuxtLink>
        <NuxtLink class="navbar__link" to="/dashboard" @click="handleNav">Project Dashboard</NuxtLink>
        <NuxtLink class="navbar__link" to="/add-material" @click="handleNav">Add Material</NuxtLink>
        <NuxtLink class="navbar__link" to="/reports" @click="handleNav">Reports</NuxtLink>
        <NuxtLink class="navbar__link" to="/about" @click="handleNav">About Us</NuxtLink>
      </nav>

      <div class="navbar__actions">
        <button class="navbar__login" type="button" @click="$emit('show-login'); handleNav()">Log in</button>
        <button class="btn" type="button" @click="$emit('show-signup')">Sign Up</button>
      </div>

      <button
        class="navbar__toggle"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits(['show-signup', 'show-login'])

const isMenuOpen = ref(false)

function handleNav() {
  if (isMenuOpen.value) {
    isMenuOpen.value = false
  }
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  padding: 1rem 1.5rem;
  background: transparent;
  color: #fff;
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0.65rem 1.25rem;
  border-radius: 32px;
  background: rgba(17, 37, 24, 0.78);
  border: 1px solid rgba(253, 247, 239, 0.16);
  box-shadow: 0 20px 45px rgba(6, 12, 9, 0.45);
  backdrop-filter: blur(18px);
}

.navbar__logo {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
}

.logo-placeholder {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(253, 247, 239, 0.7), rgba(253, 247, 239, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.site-title {
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem;
  border-radius: 999px;
  background: rgba(253, 247, 239, 0.18);
  box-shadow: inset 0 0 0 1px rgba(253, 247, 239, 0.22);
  flex: 1;
  justify-content: center;
}

.navbar__link {
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.02em;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.navbar__link:hover {
  color: #fff;
}

.navbar__link.router-link-active,
.navbar__link.router-link-exact-active {
  background: linear-gradient(135deg, rgba(47, 122, 62, 0.5), rgba(107, 79, 50, 0.5));
  color: #fff;
  box-shadow: 0 12px 30px rgba(15, 42, 27, 0.45);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
}

.navbar__login {
  background: transparent;
  border: 1px solid rgba(253, 247, 239, 0.35);
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  cursor: pointer;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
}

.navbar__login:hover {
  background: rgba(253, 247, 239, 0.2);
  border-color: rgba(253, 247, 239, 0.5);
  transform: translateY(-1px);
}

.btn {
  background: linear-gradient(120deg, #a5d67a, #2f7a3e 60%, #6b4f32);
  border: none;
  color: #fffbe9;
  padding: 0.55rem 1.55rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 18px 35px rgba(47, 122, 62, 0.35);
}

.btn:hover {
  transform: translateY(-1px);
}

.navbar__toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
}

.navbar__toggle span {
  width: 20px;
  height: 2px;
  background: rgba(253, 247, 239, 0.8);
  display: block;
  transition: transform 0.2s ease;
}

@media (max-width: 1024px) {
  .navbar__inner {
    gap: 0.75rem;
    padding: 0.5rem 0.85rem;
  }

  .navbar__nav {
    flex: initial;
    position: absolute;
    top: calc(var(--navbar-height, 64px) + 0.5rem);
    left: 1.5rem;
    right: 1.5rem;
    flex-direction: column;
    background: rgba(12, 27, 19, 0.92);
    border-radius: 24px;
    padding: 1.25rem;
    box-shadow: 0 25px 55px rgba(0, 0, 0, 0.45);
    transform: scale(0.95);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .navbar__nav--open {
    opacity: 1;
    pointer-events: auto;
    transform: scale(1);
  }

  .navbar__toggle {
    display: inline-flex;
  }

  .navbar__actions {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .navbar {
    padding: 0.65rem 1rem;
  }

  .navbar__nav {
    left: 1rem;
    right: 1rem;
  }
}
</style>
