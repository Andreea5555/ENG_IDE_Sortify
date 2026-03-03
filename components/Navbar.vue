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
        <NuxtLink class="navbar__link" to="/add-material" @click="handleNav">Materials</NuxtLink>
        <NuxtLink class="navbar__link" to="/browse-marketplace" @click="handleNav">Browse Marketplace</NuxtLink>
        <NuxtLink class="navbar__link" to="/reports" @click="handleNav">Reports</NuxtLink>
      </nav>

      <div class="navbar__actions">
        <button class="navbar__login" type="button" @click="$emit('show-login'); handleNav()">Log in</button>
        <button class="btn" type="button" @click="$emit('show-signup')">Sign Up</button>
      </div>

      <button
        class="navbar__toggle"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="isMenuOpen.toString()"
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
  padding: 0.75rem 1.5rem;
  background: rgba(24, 48, 32, 0.72);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(253, 247, 239, 0.15);
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
  background: linear-gradient(135deg, rgba(253, 247, 239, 0.4), rgba(253, 247, 239, 0.15));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.site-title {
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.01em;
}

.navbar__nav {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.2rem;
  border-radius: 999px;
  background: rgba(253, 247, 239, 0.12);
  box-shadow: inset 0 0 0 1px rgba(253, 247, 239, 0.18);
  flex: 1;
  justify-content: center;
}

.navbar__link {
  padding: 0.45rem 1.1rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  transition: background 0.2s ease, color 0.2s ease;
}

.navbar__link:hover {
  color: #fff;
}

.navbar__link.router-link-active,
.navbar__link.router-link-exact-active {
  background: linear-gradient(135deg, rgba(47, 122, 62, 0.35), rgba(107, 79, 50, 0.45));
  color: #fff;
  box-shadow: 0 8px 18px rgba(107, 79, 50, 0.3);
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
  transition: background 0.2s ease, border-color 0.2s ease;
}

.navbar__login:hover {
  background: rgba(253, 247, 239, 0.15);
  border-color: rgba(253, 247, 239, 0.5);
}

.btn {
  background: linear-gradient(135deg, #2f7a3e, #6b4f32);
  border: none;
  color: #fffbe9;
  padding: 0.55rem 1.55rem;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 10px 25px rgba(47, 122, 62, 0.35);
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
  background: #f5efe4;
  display: block;
  transition: transform 0.2s ease;
}

@media (max-width: 1024px) {
  .navbar__inner {
    gap: 0.75rem;
  }

  .navbar__nav {
    flex: initial;
    position: absolute;
    top: calc(var(--navbar-height, 64px) + 0.5rem);
    left: 1.5rem;
    right: 1.5rem;
    flex-direction: column;
    background: rgba(12, 27, 19, 0.95);
    border-radius: 20px;
    padding: 1rem;
    box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
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
