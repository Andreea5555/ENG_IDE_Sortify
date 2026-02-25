<template>
  <header class="navbar" role="banner">
    <div class="navbar__left">
      <a class="navbar__logo" href="/" aria-label="Home">
        <slot name="logo">
          <div class="logo-placeholder">S</div>
        </slot>
        <span class="site-title">Sortify</span>
      </a>
    </div>

    <nav class="navbar__nav" role="navigation" aria-label="Main navigation">
      <ul>
        <li><a href="#">How it works</a></li>
        <li><a href="#">Materials</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>

    <div class="navbar__cta">
      <button class="btn" @click="$emit('show-signup')">Sign Up</button>
    </div>
  </header>
</template>

<script setup lang="ts">
// Navbar is simple and uses a named slot for the logo. No props required yet.
defineEmits(['show-signup'])
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--navbar-height);
  padding: 0 1rem;
  background: linear-gradient(90deg, var(--color-green) 0%, var(--color-brown) 100%);
  color: var(--text-on-primary);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.navbar__logo { display: flex; align-items: center; gap: 0.5rem; color: inherit; text-decoration: none; }
.logo-placeholder { width: 44px; height: 44px; border-radius: 8px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; }
.site-title { font-weight: 700; font-size: 1.05rem; }
.navbar__nav ul { display: flex; gap: 1rem; list-style: none; margin: 0; padding: 0; }
.navbar__nav a { color: rgba(255,255,255,0.95); text-decoration: none; padding: 0.25rem 0.5rem; border-radius: 4px; }
.navbar__nav a:hover { background: rgba(255,255,255,0.06); }
.btn { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.14); color: #fff; padding: 0.45rem 0.75rem; border-radius: 6px; cursor: pointer; }
.btn:hover { background: rgba(255,255,255,0.18); }

@media (max-width: 640px) {
  .navbar__nav { display: none; }
  .navbar__cta { display: none; }
  .site-title { display: none; }
}
</style>
