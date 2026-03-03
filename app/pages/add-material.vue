<template>
  <section class="add-material" role="main">
    <div class="add-material__container">
      <h1>Materials: at the moment?</h1>
    </div>
  </section>
</template>

<style scoped>
.add-material {
  flex: 1;
  padding: 4rem 1.5rem;
  background: #f6f7f3;
  color: #1f2a1f;
}
.add-material__container {
  max-width: 720px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 12px 40px rgba(47, 122, 62, 0.08);
}
.add-material h1 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2f7a3e;
}
@media (max-width: 600px) {
  .add-material__container {
    padding: 1.75rem;
  }
  .add-material h1 {
    font-size: 1.6rem;
  }
}
</style>
