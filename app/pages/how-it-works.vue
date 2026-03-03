<template>
  <section class="how-it-works" role="main">
    <div class="hero">
      <div class="hero__card">
        <p class="eyebrow">Guided walkthrough</p>
        <h1>How Sortify keeps construction materials in use</h1>
        <p class="intro">
          Sortify connects builders, demolition teams, and DIY renovators so leftover materials get a second life instead of
          ending up as waste. You do not need to be a software expert—simply follow the steps below.
        </p>
        <div class="hero__stats">
          <div>
            <span class="stat-number">12k</span>
            <span class="stat-label">tons diverted</span>
          </div>
          <div>
            <span class="stat-number">4.8★</span>
            <span class="stat-label">member rating</span>
          </div>
          <div>
            <span class="stat-number">24</span>
            <span class="stat-label">cities onboard</span>
          </div>
        </div>
      </div>
    </div>

    <div class="purpose" aria-label="Project purpose">
      <div class="purpose__text">
        <div class="purpose__glow" aria-hidden="true"></div>
        <div class="purpose__body">
          <h2>Why this app exists</h2>
          <p>
            Every construction project generates surplus timber, tiles, fixtures, and more. Traditionally these items were
            discarded because matching supply and demand required countless phone calls. Sortify makes reuse effortless by
            sharing available materials in one trusted marketplace, complete with condition notes, images, and pick-up
            details.
          </p>
        </div>
      </div>
      <div class="purpose__cards">
        <article class="purpose-card">
          <h3>Less waste</h3>
          <p>Recover usable pieces before they reach landfill.</p>
        </article>
        <article class="purpose-card">
          <h3>Faster sourcing</h3>
          <p>Find ready-to-go materials from nearby projects.</p>
        </article>
        <article class="purpose-card">
          <h3>Proof of impact</h3>
          <p>Generate reports that quantify CO₂ savings for stakeholders.</p>
        </article>
      </div>
    </div>

    <ol class="steps" aria-label="How it works steps">
      <li v-for="step in steps" :key="step.title">
        <div class="step__badge">{{ step.id }}</div>
        <div class="step__content">
          <div class="step__header">
            <h3>{{ step.title }}</h3>
            <span class="step__tag">{{ step.focus }}</span>
          </div>
          <p v-html="step.copy"></p>
        </div>
      </li>
    </ol>

    <div class="cta-panel">
      <div>
        <h2>Ready to keep materials in circulation?</h2>
        <p>Sign up today and turn your next surplus load into someone else's building block.</p>
      </div>
      <div class="cta-buttons">
        <NuxtLink to="/browse-marketplace" class="btn btn--primary">Browse marketplace</NuxtLink>
        <NuxtLink to="/add-material" class="btn btn--ghost">Add materials</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  {
    id: '01',
    title: 'Create or log into your account',
    focus: 'Account',
    copy:
      'Tap the <strong>Sign Up</strong> button in the top-right corner or use <strong>Log in</strong> if you already have an account. We only ask for essential contact details so members can reach you.'
  },
  {
    id: '02',
    title: 'Browse available materials',
    focus: 'Explore',
    copy:
      'Open the <strong>Browse Marketplace</strong> page to see what nearby projects are giving away or selling. Filter by category, condition, or pickup speed.'
  },
  {
    id: '03',
    title: 'Add leftover stock in minutes',
    focus: 'Share',
    copy:
      'Use the <strong>Add Material</strong> form to share items from your site. Add the name, quantity, condition, and a photo so takers know exactly what is available.'
  },
  {
    id: '04',
    title: 'Connect and arrange pickup',
    focus: 'Coordinate',
    copy:
      'Each listing includes <strong>Contact Seller</strong> and optional <strong>Reserve</strong> actions. Chat, confirm logistics, and mark items as taken once collected.'
  },
  {
    id: '05',
    title: 'Track your impact',
    focus: 'Report',
    copy:
      'Visit <strong>Reports</strong> to summarize how much material was reused or recycled plus the CO₂ savings you can share with clients.'
  }
]
</script>

<style scoped>
.how-it-works {
  flex: 1;
  padding: 3.5rem 1.5rem 4.5rem;
  color: #1f2a1f;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background: radial-gradient(circle at top right, rgba(111, 166, 121, 0.15), transparent 45%),
    rgba(246, 247, 243, 0.75);
}

.hero {
  display: flex;
  justify-content: center;
}

.hero__card {
  width: min(960px, 100%);
  text-align: center;
  background: var(--color-cream-strong);
  border-radius: 32px;
  padding: 2.75rem 2.5rem;
  box-shadow: 0 35px 80px rgba(10, 33, 23, 0.12);
  border: 1px solid rgba(31, 42, 31, 0.08);
  backdrop-filter: blur(4px);
}

.hero__stats {
  margin-top: 2.25rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.hero__stats div {
  background: rgba(47, 122, 62, 0.08);
  border-radius: 18px;
  padding: 0.85rem 1rem;
}

.stat-number {
  display: block;
  font-size: 1.6rem;
  font-weight: 700;
  color: #2f7a3e;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(31, 42, 31, 0.65);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.8rem;
  color: rgba(31, 42, 31, 0.6);
  margin: 0;
}

.hero h1 {
  margin: 0.5rem 0 0.75rem;
  font-size: clamp(2rem, 4vw, 2.8rem);
}

.intro {
  margin: 0 auto;
  max-width: 640px;
  color: rgba(31, 42, 31, 0.75);
}

.purpose {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  background: linear-gradient(135deg, var(--color-cream-strong), rgba(241, 249, 244, 0.92));
  border-radius: 32px;
  padding: 3rem;
  box-shadow: 0 30px 90px rgba(10, 33, 23, 0.12);
  position: relative;
  overflow: hidden;
}

.purpose::before {
  content: '';
  position: absolute;
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(47, 122, 62, 0.25), transparent 60%);
  top: -180px;
  right: -120px;
  filter: blur(8px);
}

.purpose__text {
  position: relative;
}

.purpose__glow {
  position: absolute;
  inset: 0;
  border-radius: 26px;
  background: radial-gradient(circle at top left, rgba(47, 122, 62, 0.15), transparent 60%);
  filter: blur(12px);
  pointer-events: none;
}

.purpose__body {
  position: relative;
  border-radius: 26px;
  padding: 2rem;
  border: 1px solid rgba(47, 122, 62, 0.15);
  background: var(--color-cream-rich);
  box-shadow: inset 0 1px 0 rgba(253, 247, 239, 0.4);
}

.purpose__body h2 {
  margin: 0 0 0.75rem;
}

.purpose__cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  position: relative;
}

.purpose-card {
  position: relative;
  padding: 1.35rem 1.5rem 1.5rem;
  border-radius: 20px;
  border: 1px solid rgba(31, 42, 31, 0.08);
  background: var(--color-cream-soft);
  box-shadow: 0 18px 50px rgba(10, 33, 23, 0.08);
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  overflow: hidden;
}

.purpose-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(47, 122, 62, 0.12), transparent 70%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.purpose-card h3 {
  margin: 0 0 0.35rem;
  position: relative;
  z-index: 1;
}

.purpose-card p {
  margin: 0;
  color: rgba(31, 42, 31, 0.7);
  position: relative;
  z-index: 1;
}

.purpose-card:hover {
  transform: translateY(-6px);
  border-color: rgba(47, 122, 62, 0.3);
  box-shadow: 0 28px 70px rgba(10, 33, 23, 0.15);
}

.purpose-card:hover::after {
  opacity: 1;
}

.steps {
  list-style: none;
  counter-reset: step;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1.25rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.steps li {
  background: var(--color-cream-strong);
  padding: 1.75rem;
  border-radius: 20px;
  box-shadow: 0 20px 55px rgba(10, 33, 23, 0.08);
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  position: relative;
}

.steps li::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(47, 122, 62, 0.08), transparent 65%);
  pointer-events: none;
}

.steps h3 {
  margin: 0 0 0.4rem;
}

.steps p {
  margin: 0;
  color: rgba(31, 42, 31, 0.75);
}

.step__badge {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #2f7a3e;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 12px 35px rgba(47, 122, 62, 0.35);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

.step__content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: relative;
  z-index: 1;
}

.step__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.step__tag {
  background: rgba(47, 122, 62, 0.12);
  color: #2f7a3e;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.cta-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: linear-gradient(135deg, rgba(47, 122, 62, 0.9), rgba(111, 166, 121, 0.9));
  color: #fff;
  border-radius: 28px;
  padding: 2.5rem;
  box-shadow: 0 25px 60px rgba(47, 122, 62, 0.3);
}

.cta-panel h2 {
  margin: 0 0 0.5rem;
}

.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.85rem 2.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn--primary {
  background: var(--color-cream);
  color: #1f2a1f;
  box-shadow: none;
}

.btn--ghost {
  border: 1px solid rgba(255, 255, 255, 0.6);
  color: #fff;
}

@media (max-width: 640px) {
  .how-it-works {
    padding: 2rem 1rem 3rem;
  }

  .hero__card {
    padding: 2rem 1.5rem;
  }

  .btn {
    width: 100%;
  }
}
</style>
