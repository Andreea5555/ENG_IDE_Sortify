<template>
  <div>
    <Navbar>
      <template #logo>
        <!-- Use the user-provided Logo.png from assets (imported as `logo`) -->
        <img :src="logo" alt="Sortify logo" style="width:40px;height:40px;border-radius:6px;object-fit:cover" />
      </template>
    </Navbar>

    <NuxtRouteAnnouncer />
    <!-- Removed NuxtWelcome (default Nuxt splash) because it imports /logo.png which caused a Vite import error.
      Replace this with your real landing content or re-add NuxtWelcome after adding /logo.png to /public. -->
  </div>
</template>

<script setup>
// Import Navbar using a relative path so Vite resolves it reliably during dev/SSR
import Navbar from '../components/Navbar.vue'
// Import the user-provided logo from the assets folder so Vite bundles/optimizes it
import logo from '../assets/images/Logo.png'
</script>
