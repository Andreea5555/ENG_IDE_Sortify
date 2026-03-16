<template>
  <main class="placeholder-page">
    <div class="placeholder-page__container">
      <span class="placeholder-page__icon">🔍</span>
      <h1>Material Details</h1>
      <p>This page is connected to db.json ({{ materialCount }} materials currently).</p>
      <NuxtLink to="/add-material" class="placeholder-page__link">+ Add material to DB</NuxtLink>
      <NuxtLink to="/marketplace" class="placeholder-page__link">← Back to Marketplace</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import db from '~/../db/db.json'

const materialCount = db.materials.length
</script>

<style scoped>
.placeholder-page { flex:1; display:flex; align-items:center; justify-content:center; padding:40px 24px; background:#f6f7f3; }
.placeholder-page__container { text-align:center; }
.placeholder-page__icon { font-size:3rem; display:block; margin-bottom:12px; }
.placeholder-page__container h1 { font-size:2.2rem; font-weight:800; color:#1a1a1a; margin:0 0 8px; letter-spacing:-0.02em; }
.placeholder-page__container p { color:#666; margin:0 0 20px; }
.placeholder-page__link { color:var(--color-green,#2f7a3e); font-weight:600; text-decoration:none; }
.placeholder-page__link:hover { text-decoration:underline; }
</style>
