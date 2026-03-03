<template>
  <section class="home" role="main">
    <div class="home__content">
      <h1>Welcome to Sortify</h1>
      <p>
        Your control center for sorting, reusing, and adding materials. Use the navigation
        to explore the platform while we build out the rest of the experience.
      </p>
      <NuxtLink class="home__cta" to="/add-material">How does it work?</NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.home {
  flex: 1;
  padding: 4rem 1.5rem;
  background: transparent;
}
.home__content {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  background: rgba(255, 255, 255, 0.82);
  border-radius: 22px;
  padding: 3.25rem 2.25rem;
  border: 1px solid rgba(31, 90, 43, 0.12);
  box-shadow: 0 12px 45px rgba(31, 90, 43, 0.07);
  backdrop-filter: blur(8px);
}
.home h1 {
  margin: 0 0 1rem;
  font-size: 2.4rem;
  color: #1f5a2b;
}
.home p {
  margin: 0 0 1.5rem;
  font-size: 1.05rem;
  color: #4a4a4a;
}
.home__cta {
  display: inline-block;
  background: rgba(31, 90, 43, 0.08);
  color: var(--color-green);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.15s ease, transform 0.15s ease;
}
.home__cta:hover {
  transform: translateY(-1px);
  background: rgba(31, 90, 43, 0.16);
}
@media (max-width: 600px) {
  .home__content {
    padding: 2rem 1.25rem;
  }
  .home h1 {
    font-size: 2rem;
  }
}
</style>
