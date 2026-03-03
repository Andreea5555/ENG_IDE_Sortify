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
        <li><NuxtLink to="/add-material">Materials</NuxtLink></li>
        <li><a href="#">Browse Marketplace</a></li>
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
  flex-wrap: nowrap;
  gap: 1rem;
  min-height: var(--navbar-height);
  height: auto;
  padding: 0 1.5rem;
  background: linear-gradient(90deg, var(--color-green) 0%, var(--color-brown) 100%);
  color: var(--text-on-primary);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.navbar__left { display: flex; align-items: center; }
.navbar__logo { display: flex; align-items: center; gap: 0.5rem; color: inherit; text-decoration: none; }
.logo-placeholder { width: 44px; height: 44px; border-radius: 8px; background: rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #fff; }
.site-title { font-weight: 700; font-size: 1.05rem; }
.navbar__nav { flex: 1 1 auto; min-width: 0; }
.navbar__nav ul { display: flex; justify-content: center; gap: 1rem; list-style: none; margin: 0; padding: 0; flex-wrap: wrap; }
.navbar__nav a { color: rgba(255,255,255,0.95); text-decoration: none; padding: 0.35rem 0.6rem; border-radius: 6px; display: inline-flex; }
.navbar__nav a:hover { background: rgba(255,255,255,0.06); }
.navbar__cta { display: flex; align-items: center; justify-content: flex-end; flex: 0 0 auto; }
.btn { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.14); color: #fff; padding: 0.55rem 1.25rem; border-radius: 8px; cursor: pointer; transition: background 0.2s ease, transform 0.2s ease; }
.btn:hover { background: rgba(255,255,255,0.18); transform: translateY(-1px); }

@media (max-width: 1024px) {
  .navbar {
    flex-wrap: wrap;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    gap: 0.75rem;
  }
  .navbar__left {
    flex: 1 1 100%;
    justify-content: center;
  }
  .navbar__nav {
    order: 3;
    width: 100%;
  }
  .navbar__cta {
    order: 2;
    width: 100%;
    justify-content: center;
  }
  .btn {
    width: min(260px, 100%);
  }
}

@media (max-width: 640px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
    padding: 0.75rem 1rem;
    gap: 0.5rem;
  }
  .navbar__logo { justify-content: center; }
  .navbar__nav { width: 100%; }
  .navbar__nav ul { flex-direction: column; gap: 0.35rem; }
  .navbar__nav a { justify-content: center; }
  .navbar__cta { width: 100%; justify-content: center; }
  .btn { width: 100%; }
}
</style>
