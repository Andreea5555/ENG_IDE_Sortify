<template>
  <section class="listing-detail" role="main">
    <header class="detail-header">
      <NuxtLink class="back-link" to="/browse-marketplace">&larr; Back to marketplace</NuxtLink>
      <h1>Material Detail</h1>
    </header>

    <div class="detail-card">
      <div class="detail-card__image" :style="{ backgroundImage: `url(${listing.image})` }" role="img" :aria-label="listing.title"></div>

      <div class="detail-card__header">
        <div>
          <p class="detail-label">Listing</p>
          <h2>{{ listing.title }}</h2>
          <p class="detail-location">{{ listing.location }}</p>
        </div>
        <div class="detail-price">
          <span>{{ listing.price }}</span>
          <p class="detail-availability">Available until {{ listing.availableUntil }}</p>
        </div>
      </div>

      <div class="detail-card__summary">
        <div class="summary-meta">
          <dl>
            <div>
              <dt>Quantity</dt>
              <dd>{{ listing.quantity }}</dd>
            </div>
            <div>
              <dt>Condition</dt>
              <dd>{{ listing.condition }}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{{ listing.location }}</dd>
            </div>
          </dl>
        </div>
        <div class="summary-description">
          <h3>Description</h3>
          <p>{{ listing.description }}</p>
        </div>
      </div>

      <div class="detail-card__map">
        <h3>Location on map</h3>
        <iframe
          :src="mapEmbedUrl"
          class="detail-map"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Material location map"
        ></iframe>
        <a class="detail-map-link" :href="mapOpenUrl" target="_blank" rel="noopener">Open in maps ↗</a>
      </div>

      <div class="detail-card__actions">
        <a class="btn btn--ghost" :href="contactHref">Contact Seller</a>
        <button type="button" class="btn btn--solid" @click="reserveMaterials">Reserve Materials</button>
      </div>
      <p v-if="reservationMessage" class="detail-card__message">{{ reservationMessage }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { createError } from 'h3'
import { getListings } from '~/data/db'

const listings = getListings()
const route = useRoute()

const listing = computed(() => listings.find(item => item.id === Number(route.params.id)))
const reservationMessage = ref('')

if (!listing.value) {
  throw createError({ statusCode: 404, statusMessage: 'Listing not found' })
}

const contactHref = computed(() => {
  if (!listing.value) {
    return '#'
  }
  const subject = encodeURIComponent(`Interest in ${listing.value.title}`)
  return `mailto:${listing.value.sellerEmail}?subject=${subject}`
})

const mapOpenUrl = computed(() => {
  if (!listing.value) return '#'
  return `https://www.google.com/maps?q=${encodeURIComponent(listing.value.location)}`
})

const mapEmbedUrl = computed(() => {
  if (!listing.value) return ''
  return `https://www.google.com/maps?q=${encodeURIComponent(listing.value.location)}&output=embed`
})

const reserveMaterials = async () => {
  reservationMessage.value = ''
  if (!listing.value) return

  if (!import.meta.client) return
  const userRaw = localStorage.getItem('sortifyUser')
  if (!userRaw) {
    reservationMessage.value = 'Please sign up or log in first.'
    return
  }

  const user = JSON.parse(userRaw)
  const response = await fetch('/api/reserve-material', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': String(user.id)
    },
    body: JSON.stringify({
      materialId: listing.value.id
    })
  })

  const result = await response.json()
  reservationMessage.value = result.success
    ? 'Reservation submitted and saved in DB.'
    : `Reservation failed: ${result.message}`
}
</script>

<style scoped>
.listing-detail {
  flex: 1;
  padding: 3rem 1.5rem 4rem;
  color: #1f2a1f;
}

.detail-header {
  text-align: center;
  margin-bottom: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(31, 42, 31, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
}

.back-link:hover {
  text-decoration: underline;
}

.detail-header h1 {
  margin: 0.5rem 0 0;
  font-size: 2.25rem;
}

.detail-card {
  max-width: 960px;
  margin: 0 auto;
  background: var(--color-cream-strong);
  border-radius: 24px;
  box-shadow: 0 24px 70px rgba(10, 33, 23, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.detail-card__image {
  width: 100%;
  padding-top: 45%;
  background-size: cover;
  background-position: center;
}

.detail-card__header {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid rgba(31, 42, 31, 0.08);
}

.detail-label {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  color: rgba(31, 42, 31, 0.6);
}

.detail-card__header h2 {
  margin: 0.35rem 0 0.5rem;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
}

.detail-location {
  margin: 0;
  color: rgba(31, 42, 31, 0.7);
}

.detail-price span {
  display: block;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  color: #2f7a3e;
}

.detail-availability {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: rgba(31, 42, 31, 0.65);
}

.detail-card__summary {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  gap: 2rem;
  padding: 2rem;
  border-bottom: 1px solid rgba(31, 42, 31, 0.08);
}

.summary-meta dl {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin: 0;
}

.summary-meta dt {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(31, 42, 31, 0.6);
}

.summary-meta dd {
  margin: 0.25rem 0 0;
  font-size: 1rem;
  font-weight: 600;
}

.summary-description h3 {
  margin: 0 0 0.5rem;
}

.summary-description p {
  margin: 0;
  color: rgba(31, 42, 31, 0.75);
  line-height: 1.6;
}

.detail-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1.75rem 2rem 2.25rem;
}

.detail-card__map {
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(31, 42, 31, 0.08);
}

.detail-card__map h3 {
  margin: 0 0 0.75rem;
}

.detail-map {
  width: 100%;
  height: 320px;
  border: 1px solid rgba(31, 42, 31, 0.15);
  border-radius: 12px;
}

.detail-map-link {
  display: inline-block;
  margin-top: 0.6rem;
  color: #2f7a3e;
  font-weight: 600;
  text-decoration: none;
}

.detail-map-link:hover {
  text-decoration: underline;
}

.detail-card__message {
  margin: 0 2rem 1.5rem;
  color: #2f7a3e;
  font-weight: 600;
}

.btn {
  border-radius: 999px;
  padding: 0.85rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn--ghost {
  background: transparent;
  border: 1px solid rgba(31, 42, 31, 0.25);
  color: #1f2a1f;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn--solid {
  background: #2f7a3e;
  color: #fff;
  box-shadow: 0 12px 30px rgba(47, 122, 62, 0.25);
}

.btn:hover {
  transform: translateY(-2px);
}

.btn:active {
  transform: scale(0.98);
}

@media (max-width: 720px) {
  .detail-card__header,
  .detail-card__actions {
    flex-direction: column;
    padding: 1.5rem;
  }

  .detail-card__header {
    gap: 1rem;
  }

  .detail-card__summary {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }

  .detail-card__actions {
    align-items: stretch;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
