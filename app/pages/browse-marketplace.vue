<script setup lang="ts">
import { getListings } from '~/data/db'

const listings = getListings()

const quickFilters = ['Available now', 'Pickup', 'Freebies', 'Verified sellers', 'Bulk lots']
const categories = [
  'Timber & framing',
  'Masonry',
  'Roofing',
  'Flooring',
  'Plumbing',
  'Metals',
  'Insulation',
  'Fixtures'
]
const conditions = ['New', 'Good', 'Fair', 'Needs repair']
</script>

<template>
  <section class="marketplace" role="main">
    <div class="marketplace__hero">
      <div class="hero-copy">
        <p class="hero-eyebrow">Community marketplace</p>
        <h1>Explore reclaimed materials nearby</h1>
        <p class="hero-subtitle">
          Discover leftovers from ongoing construction sites, compare conditions, and reserve the items that keep
          your projects circular.
        </p>
        <div class="hero-stats" aria-label="Marketplace stats">
          <div class="hero-stat">
            <span class="hero-stat__value">320+</span>
            <span class="hero-stat__label">Listings this week</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat__value">78%</span>
            <span class="hero-stat__label">Claimed in 48h</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat__value">24</span>
            <span class="hero-stat__label">Active cities</span>
          </div>
        </div>
      </div>

      <form class="hero-search" aria-label="Search listings">
        <label class="sr-only" for="marketplace-search">Search materials</label>
        <input id="marketplace-search" type="search" placeholder="Search for timber, tiles, beams..." />

        <label class="sr-only" for="marketplace-location">Location</label>
        <select id="marketplace-location">
          <option selected>Near me</option>
          <option>Copenhagen</option>
          <option>Aarhus</option>
          <option>Odense</option>
        </select>

        <label class="sr-only" for="marketplace-radius">Radius</label>
        <select id="marketplace-radius">
          <option selected>Within 10 km</option>
          <option>Within 25 km</option>
          <option>Within 50 km</option>
        </select>

        <button type="button">Browse</button>
      </form>
    </div>

    <div class="marketplace__body">
      <aside class="marketplace__sidebar" aria-label="Filters">
        <div class="sidebar-section">
          <h2>Categories</h2>
          <ul>
            <li v-for="category in categories" :key="category" class="sidebar-pill">
              <button type="button">{{ category }}</button>
            </li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h2>Condition</h2>
          <ul>
            <li v-for="condition in conditions" :key="condition" class="sidebar-pill">
              <button type="button">{{ condition }}</button>
            </li>
          </ul>
        </div>

        <div class="sidebar-section">
          <h2>Availability</h2>
          <div class="toggle-row">
            <label>
              <input type="checkbox" checked />
              Pickup today
            </label>
            <label>
              <input type="checkbox" />
              Delivery possible
            </label>
          </div>
        </div>
      </aside>

      <div class="marketplace__content">
        <div class="marketplace__chips" role="list">
          <button v-for="filter in quickFilters" :key="filter" type="button">{{ filter }}</button>
        </div>

        <div class="marketplace__grid" role="list">
          <NuxtLink
            v-for="listing in listings"
            :key="listing.id"
            class="listing-card"
            role="listitem"
            :to="`/listing-details/${listing.id}`"
          >
            <div class="listing-card__media" :style="{ backgroundImage: `url(${listing.image})` }">
              <span class="listing-card__tag">{{ listing.condition }}</span>
            </div>
            <div class="listing-card__body">
              <p class="listing-card__price">{{ listing.price }}</p>
              <h3>{{ listing.title }}</h3>
              <p class="listing-card__meta">{{ listing.quantity }} &middot; {{ listing.location }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
.marketplace {
  flex: 1;
  padding: 3rem 1.5rem 4rem;
}

.marketplace__hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 2rem;
  padding: 2.5rem;
  border-radius: 24px;
  background: var(--color-cream-soft);
  box-shadow: 0 24px 70px rgba(10, 33, 23, 0.08);
}

.hero-copy h1 {
  margin: 0.35rem 0 0.65rem;
  font-size: clamp(2rem, 3vw, 2.75rem);
  color: #1f2a1f;
}

.hero-copy .hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: rgba(31, 42, 31, 0.6);
  margin: 0;
}

.hero-subtitle {
  margin: 0 0 1.5rem;
  color: rgba(31, 42, 31, 0.75);
  max-width: 520px;
}

.hero-stats {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.hero-stat {
  background: rgba(47, 122, 62, 0.08);
  border-radius: 18px;
  padding: 1rem 1.25rem;
  min-width: 140px;
}

.hero-stat__value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2f7a3e;
}

.hero-stat__label {
  font-size: 0.85rem;
  color: rgba(31, 42, 31, 0.6);
}

.hero-search {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  background: #f6f7f3;
  padding: 1.5rem;
  border-radius: 20px;
  align-content: start;
}

.hero-search input,
.hero-search select {
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(31, 42, 31, 0.18);
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  background: var(--color-cream);
}

.hero-search button {
  grid-column: span 3;
  border: none;
  border-radius: 999px;
  padding: 0.95rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(120deg, #2f7a3e, #6b4f32);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.hero-search button:hover {
  transform: translateY(-2px);
}

.marketplace__body {
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 2rem;
}

.marketplace__sidebar {
  background: var(--color-cream-soft);
  padding: 1.75rem;
  border-radius: 20px;
  box-shadow: 0 16px 45px rgba(10, 33, 23, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-section h2 {
  margin: 0 0 0.75rem;
  font-size: 1rem;
  color: #1f2a1f;
}

.sidebar-section ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.sidebar-pill button {
  width: 100%;
  border: 1px solid rgba(31, 42, 31, 0.12);
  border-radius: 999px;
  background: rgba(246, 247, 243, 0.9);
  padding: 0.5rem 0.9rem;
  text-align: left;
  font-size: 0.9rem;
  color: #1f2a1f;
  cursor: pointer;
}

.toggle-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #1f2a1f;
}

.marketplace__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.marketplace__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.marketplace__chips button {
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  background: rgba(253, 247, 239, 0.85);
  box-shadow: inset 0 0 0 1px rgba(31, 42, 31, 0.12);
  cursor: pointer;
  font-size: 0.88rem;
}

.marketplace__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}

.listing-card {
  background: var(--color-cream-soft);
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(10, 33, 23, 0.08);
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.listing-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 26px 60px rgba(10, 33, 23, 0.12);
}

.listing-card:focus-visible {
  outline: 3px solid rgba(47, 122, 62, 0.6);
  outline-offset: 4px;
}

.listing-card__media {
  position: relative;
  padding-top: 70%;
  background-size: cover;
  background-position: center;
}

.listing-card__tag {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.listing-card__body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.listing-card__price {
  margin: 0;
  font-weight: 700;
  color: #2f7a3e;
}

.listing-card__meta {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(31, 42, 31, 0.6);
}

h3 {
  margin: 0;
  font-size: 1rem;
  color: #1f2a1f;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 1100px) {
  .marketplace__hero {
    grid-template-columns: 1fr;
  }
  .hero-search {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .hero-search button {
    grid-column: span 2;
  }
  .marketplace__body {
    grid-template-columns: 1fr;
  }
  .marketplace__sidebar {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .sidebar-section {
    flex: 1 1 220px;
  }
}

@media (max-width: 640px) {
  .marketplace {
    padding: 2rem 1rem 3rem;
  }
  .marketplace__hero {
    padding: 1.5rem;
  }
  .hero-search {
    grid-template-columns: 1fr;
  }
  .hero-search button {
    grid-column: span 1;
  }
  .marketplace__sidebar {
    flex-direction: column;
  }
}
</style>
