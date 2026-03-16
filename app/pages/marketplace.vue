<template>
  <main class="mp">
    <div class="mp__container">
      <!-- Page Header -->
      <div class="mp__header">
        <div class="mp__header-left">
          <h1 class="mp__title">Marketplace</h1>
          <p class="mp__subtitle">Find reusable construction materials available right now.</p>
          <div class="mp__search-bar">
            <svg class="mp__search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or category…"
              class="mp__search-input"
            />
            <button v-if="searchQuery" class="mp__search-clear" @click="searchQuery = ''" aria-label="Clear search">✕</button>
          </div>
        </div>
        <div class="mp__header-right">
          <label for="mp-sort" class="sr-only">Sort by</label>
          <select id="mp-sort" v-model="sortBy" class="mp__sort">
            <option value="newest">Newest</option>
            <option value="closest">Closest date</option>
            <option value="quantity">Quantity</option>
            <option value="nearest">📍 Nearest to you</option>
          </select>
        </div>
      </div>

      <!-- Location status banner -->
      <transition name="loc-banner">
        <div v-if="locationStatus" class="mp__loc-banner" :class="'mp__loc-banner--' + locationStatus">
          <span v-if="locationStatus === 'loading'">Detecting your location…</span>
          <span v-else-if="locationStatus === 'success'">📍 Location found — showing distances from you</span>
          <span v-else-if="locationStatus === 'denied'">⚠️ Location access denied — please allow it in your browser to use "Nearest to you"</span>
          <span v-else-if="locationStatus === 'error'">⚠️ Could not detect location — try again later</span>
          <button v-if="locationStatus !== 'loading'" class="mp__loc-dismiss" @click="locationStatus = null">✕</button>
        </div>
      </transition>

      <!-- Mobile filter toggle -->
      <button class="mp__filter-toggle" @click="filtersOpen = !filtersOpen">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
        {{ filtersOpen ? 'Hide Filters' : 'Show Filters' }}
      </button>

      <!-- Two-column layout -->
      <div class="mp__layout">
        <!-- Filters Sidebar -->
        <aside class="mp__sidebar" :class="{ 'mp__sidebar--open': filtersOpen }">
          <div class="mp__filters-card">
            <div class="mp__filters-head">
              <h2 class="mp__filters-title">Filters</h2>
              <button class="mp__clear-btn" @click="clearFilters">Clear all</button>
            </div>

            <!-- Category -->
            <div class="mp__filter-group">
              <label for="f-category" class="mp__filter-label">Category</label>
              <select id="f-category" v-model="filters.category" class="mp__select">
                <option value="">All categories</option>
                <option value="wood">Wood</option>
                <option value="brick">Bricks &amp; Masonry</option>
                <option value="metal">Metal</option>
                <option value="concrete">Concrete</option>
                <option value="insulation">Insulation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- Location -->
            <div class="mp__filter-group">
              <label for="f-location" class="mp__filter-label">Location</label>
              <select id="f-location" v-model="filters.location" class="mp__select">
                <option value="">All locations</option>
                <option v-for="location in locationOptions" :key="location" :value="location.toLowerCase()">{{ location }}</option>
              </select>
            </div>

            <!-- Quantity range -->
            <div class="mp__filter-group">
              <label class="mp__filter-label">Quantity range</label>
              <div class="mp__range-row">
                <input
                  v-model.number="filters.qtyMin"
                  type="number"
                  min="0"
                  placeholder="Min"
                  class="mp__input mp__input--half"
                />
                <span class="mp__range-sep">–</span>
                <input
                  v-model.number="filters.qtyMax"
                  type="number"
                  min="0"
                  placeholder="Max"
                  class="mp__input mp__input--half"
                />
              </div>
            </div>

            <!-- Availability -->
            <div class="mp__filter-group">
              <label for="f-date" class="mp__filter-label">Available from</label>
              <input id="f-date" v-model="filters.availableFrom" type="date" class="mp__input" />
            </div>
          </div>
        </aside>

        <!-- Materials Grid -->
        <section class="mp__grid-area">
          <div v-if="filteredMaterials.length" class="mp__grid">
            <article
              v-for="item in visibleMaterials"
              :key="item.id"
              class="mp__card"
            >
              <div class="mp__card-img" :class="{ 'mp__card-img--placeholder': !item.image }">
                <img v-if="item.image" :src="item.image" :alt="item.title" class="mp__card-photo" />
                <span class="mp__card-badge" :class="'mp__card-badge--' + item.status">
                  {{ item.status }}
                </span>
              </div>
              <div class="mp__card-body">
                <h3 class="mp__card-title">{{ item.title }}</h3>
                <p class="mp__card-meta">
                  <span>• Qty: {{ item.quantity }} {{ item.unit }}</span>
                </p>
                <p class="mp__card-meta">
                  <span>• {{ item.location }}</span>
                  <span v-if="getDistance(item)" class="mp__card-distance">
                    — 📏 {{ getDistance(item) }} km from you
                  </span>
                </p>
                <p class="mp__card-meta">
                  <span>• {{ formatDate(item.availabilityDate) }}</span>
                </p>
                <NuxtLink :to="'/listing-details/' + item.id" class="mp__card-btn">
                  View Details
                </NuxtLink>
              </div>
            </article>
          </div>

          <!-- Load More -->
          <div v-if="hasMore" class="mp__load-more-wrap">
            <button class="mp__load-more" @click="loadMore">
              Load More
              <span class="mp__load-more-count">{{ remainingCount }} more</span>
            </button>
          </div>

          <!-- Empty state -->
          <div v-if="!filteredMaterials.length" class="mp__empty">
            <div class="mp__empty-icon">🔍</div>
            <h3>No materials found</h3>
            <p>No materials match these filters. Try adjusting your search.</p>
            <button class="mp__empty-btn" @click="clearFilters">Clear filters</button>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import db from '~/../db/db.json'

const route = useRoute()
const searchQuery = ref((route.query.search as string) || '')

// Sync search query from route (e.g. when arriving from hero search)
watch(() => route.query.search, (val) => {
  searchQuery.value = (val as string) || ''
})

/* ──────────────── City coordinates (lat, lng) ──────────────── */
const cityCoords: Record<string, { lat: number; lng: number }> = {
  'Aarhus':     { lat: 56.1629, lng: 10.2039 },
  'Copenhagen': { lat: 55.6761, lng: 12.5683 },
  'Odense':     { lat: 55.4038, lng: 10.4024 },
  'Aalborg':    { lat: 57.0488, lng: 9.9217 },
}

/* ──────────────── Geolocation state ──────────────── */
const userLat = ref<number | null>(null)
const userLng = ref<number | null>(null)
const locationStatus = ref<'loading' | 'success' | 'denied' | 'error' | null>(null)
const sortBy = ref('newest')
const filtersOpen = ref(false)

function requestLocation() {
  if (userLat.value !== null) {
    // Already have location
    locationStatus.value = 'success'
    setTimeout(() => { locationStatus.value = null }, 3000)
    return
  }
  if (!navigator.geolocation) {
    locationStatus.value = 'error'
    return
  }
  locationStatus.value = 'loading'
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLat.value = pos.coords.latitude
      userLng.value = pos.coords.longitude
      locationStatus.value = 'success'
      setTimeout(() => { locationStatus.value = null }, 3000)
    },
    (err) => {
      locationStatus.value = err.code === err.PERMISSION_DENIED ? 'denied' : 'error'
    },
    { enableHighAccuracy: false, timeout: 10000 }
  )
}

/* Auto-request location when "nearest" sort is selected */
watch(sortBy, (val) => {
  if (val === 'nearest') requestLocation()
})

/* ──────────────── Haversine distance (km) ──────────────── */
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function distanceToMaterial(m: Material): number | null {
  if (userLat.value === null || userLng.value === null) return null
  const city = cityCoords[m.location]
  if (!city) return null
  return haversine(userLat.value, userLng.value, city.lat, city.lng)
}

/** Returns formatted distance string or null */
function getDistance(m: Material): string | null {
  const d = distanceToMaterial(m)
  if (d === null) return null
  return d < 1 ? '< 1' : Math.round(d).toLocaleString()
}

const filters = ref({
  category: '',
  location: '',
  qtyMin: null as number | null,
  qtyMax: null as number | null,
  availableFrom: '',
})

interface Material {
  id: number
  title: string
  category: string
  location: string
  city: string
  quantity: number
  unit: string
  availabilityDate: string
  status: 'available' | 'reserved' | 'sold'
  image?: string
}

const ITEMS_PER_PAGE = 6
const showCount = ref(ITEMS_PER_PAGE)

function getCategory(name: string): Material['category'] {
  const value = name.toLowerCase()
  if (value.includes('wood') || value.includes('timber') || value.includes('plywood') || value.includes('oak')) return 'wood'
  if (value.includes('brick') || value.includes('tile') || value.includes('masonry')) return 'brick'
  if (value.includes('steel') || value.includes('metal') || value.includes('copper')) return 'metal'
  if (value.includes('concrete')) return 'concrete'
  if (value.includes('insulation') || value.includes('glass wool')) return 'insulation'
  return 'other'
}

function getCity(location: string): string {
  if (!location) return 'Unknown'
  const knownCities = ['Aarhus', 'Copenhagen', 'Odense', 'Aalborg']
  const found = knownCities.find((city) => location.toLowerCase().includes(city.toLowerCase()))
  if (found) return found
  const parts = location.split(',').map((part) => part.trim()).filter(Boolean)
  return parts[parts.length - 1] || location
}

const materials = computed<Material[]>(() => {
  return db.materials.map((material) => {
    const project = db.projects.find((p) => p.id === material.project_id)
    const unit = db.units.find((u) => u.id === material.unit_id)
    const location = project?.location || 'Unknown'

    return {
      id: material.id,
      title: material.name,
      category: getCategory(material.name),
      location,
      city: getCity(location),
      quantity: material.quantity,
      unit: unit?.value || 'pcs',
      availabilityDate: project?.creation_date?.slice(0, 10) || '2026-01-01',
      status: (material.status || 'available') as Material['status'],
      image: material.photo || ''
    }
  })
})

const locationOptions = computed(() => {
  return Array.from(new Set(materials.value.map((material) => material.city))).sort((a, b) => a.localeCompare(b))
})

const filteredMaterials = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  const filtered = materials.value.filter((m) => {
    if (q && !m.title.toLowerCase().includes(q) && !m.category.toLowerCase().includes(q)) return false
    if (filters.value.category && m.category !== filters.value.category) return false
    if (filters.value.location && m.city.toLowerCase() !== filters.value.location) return false
    if (filters.value.qtyMin != null && m.quantity < filters.value.qtyMin) return false
    if (filters.value.qtyMax != null && m.quantity > filters.value.qtyMax) return false
    if (filters.value.availableFrom && m.availabilityDate < filters.value.availableFrom) return false
    return true
  })

  const sorted = [...filtered]
  switch (sortBy.value) {
    case 'newest':
      sorted.sort((a, b) => b.availabilityDate.localeCompare(a.availabilityDate))
      break
    case 'quantity':
      sorted.sort((a, b) => b.quantity - a.quantity)
      break
    case 'closest':
      sorted.sort((a, b) => a.availabilityDate.localeCompare(b.availabilityDate))
      break
    case 'nearest':
      sorted.sort((a, b) => {
        const dA = distanceToMaterial(a)
        const dB = distanceToMaterial(b)
        if (dA === null && dB === null) return 0
        if (dA === null) return 1
        if (dB === null) return -1
        return dA - dB
      })
      break
  }
  return sorted
})

const visibleMaterials = computed(() => filteredMaterials.value.slice(0, showCount.value))
const hasMore = computed(() => showCount.value < filteredMaterials.value.length)
const remainingCount = computed(() => filteredMaterials.value.length - showCount.value)

function loadMore() {
  showCount.value += ITEMS_PER_PAGE
}

function clearFilters() {
  filters.value = { category: '', location: '', qtyMin: null, qtyMax: null, availableFrom: '' }
  searchQuery.value = ''
  showCount.value = ITEMS_PER_PAGE
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.mp {
  flex: 1;
  padding: 32px 24px 64px;
  background: #f6f7f3;
}
.mp__container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Header */
.mp__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 28px;
  gap: 16px;
}
.mp__title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.02em;
}
.mp__subtitle {
  font-size: 0.95rem;
  color: #777;
  margin: 4px 0 0;
}

/* Search bar */
.mp__search-bar {
  display: flex;
  align-items: center;
  margin-top: 14px;
  background: #fff;
  border: 2px solid var(--color-green);
  border-radius: 10px;
  overflow: hidden;
  max-width: 420px;
}
.mp__search-icon {
  margin-left: 14px;
  flex-shrink: 0;
  color: #999;
}
.mp__search-input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 12px;
  font-size: 0.95rem;
  background: transparent;
  color: #333;
}
.mp__search-input::placeholder {
  color: #aaa;
}
.mp__search-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  padding: 0 14px;
  color: #888;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.2s;
}
.mp__search-clear:hover {
  color: #333;
}

.mp__sort {
  padding: 8px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  font-size: 0.9rem;
  color: #444;
  cursor: pointer;
}

/* Mobile filter toggle */
.mp__filter-toggle {
  display: none;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--color-green);
  border-radius: 10px;
  background: #fff;
  color: var(--color-green-dark);
  font-weight: 600;
  font-size: 0.92rem;
  cursor: pointer;
  margin-bottom: 16px;
  width: 100%;
  justify-content: center;
}

/* Two-column layout */
.mp__layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 28px;
  align-items: start;
}

/* Sidebar */
.mp__sidebar {
  position: sticky;
  top: 88px;
}
.mp__filters-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  padding: 24px;
}
.mp__filters-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.mp__filters-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-green-dark);
  margin: 0;
}
.mp__clear-btn {
  background: none;
  border: none;
  color: var(--color-brown);
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}
.mp__clear-btn:hover {
  text-decoration: underline;
}
.mp__filter-group {
  margin-bottom: 18px;
}
.mp__filter-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #444;
  margin-bottom: 6px;
}
.mp__select,
.mp__input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fafafa;
  font-size: 0.9rem;
  color: #333;
  box-sizing: border-box;
}
.mp__select:focus,
.mp__input:focus {
  outline: none;
  border-color: var(--color-green);
  box-shadow: 0 0 0 3px rgba(47, 122, 62, 0.1);
}
.mp__range-row {
  display: flex;
  align-items: center;
  gap: 8px;
}
.mp__input--half {
  flex: 1;
}
.mp__range-sep {
  color: #aaa;
  font-weight: 600;
}

/* Grid */
.mp__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.mp__card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.25s, transform 0.25s;
}
.mp__card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(47, 122, 62, 0.1);
}
.mp__card-img {
  height: 180px;
  position: relative;
  overflow: hidden;
}
.mp__card-img--placeholder {
  background: linear-gradient(135deg, #e8f5e9 0%, #f1f0e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}
.mp__card-img--placeholder::after {
  content: '📷';
  font-size: 2.2rem;
  opacity: 0.3;
}
.mp__card-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.mp__card-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: 0.03em;
}
.mp__card-badge--available {
  background: #e8f5e9;
  color: #2e7d32;
}
.mp__card-badge--reserved {
  background: #fff3e0;
  color: #e65100;
}
.mp__card-badge--sold {
  background: #fce4ec;
  color: #c62828;
}
.mp__card-body {
  padding: 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.mp__card-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 8px;
}
.mp__card-meta {
  font-size: 0.86rem;
  color: #777;
  margin: 0 0 4px;
}
.mp__card-btn {
  display: block;
  margin-top: auto;
  padding: 10px;
  text-align: center;
  background: var(--color-green);
  color: #fff;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background 0.2s;
  margin-top: 14px;
}
.mp__card-btn:hover {
  background: var(--color-green-dark);
}

/* Empty state */
.mp__empty {
  text-align: center;
  padding: 64px 24px;
  background: #fff;
  border: 1px dashed #ddd;
  border-radius: 16px;
}
.mp__empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}
.mp__empty h3 {
  font-size: 1.2rem;
  color: #444;
  margin: 0 0 6px;
}
.mp__empty p {
  font-size: 0.92rem;
  color: #888;
  margin: 0 0 20px;
}
.mp__empty-btn {
  padding: 10px 24px;
  background: var(--color-green);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

/* Load More */
.mp__load-more-wrap {
  display: flex;
  justify-content: center;
  margin-top: 32px;
}
.mp__load-more {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 36px;
  background: #fff;
  border: 2px solid var(--color-green);
  border-radius: 12px;
  color: var(--color-green-dark);
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.mp__load-more:hover {
  background: var(--color-green);
  color: #fff;
  transform: translateY(-2px);
}
.mp__load-more:hover .mp__load-more-count {
  background: rgba(255,255,255,0.25);
  color: #fff;
}
.mp__load-more-count {
  font-size: 0.78rem;
  font-weight: 600;
  background: rgba(47, 122, 62, 0.1);
  color: var(--color-green);
  padding: 3px 10px;
  border-radius: 50px;
  transition: background 0.2s, color 0.2s;
}

/* Visually hidden */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Responsive */
@media (max-width: 960px) {
  .mp__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .mp__filter-toggle { display: flex; }
  .mp__layout { grid-template-columns: 1fr; }
  .mp__sidebar {
    display: none;
    position: static;
  }
  .mp__sidebar--open {
    display: block;
  }
  .mp__header {
    flex-direction: column;
    align-items: flex-start;
  }
  .mp__grid {
    grid-template-columns: 1fr;
  }
}

/* ──────── Location banner ──────── */
.mp__loc-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 500;
  margin-bottom: 16px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.mp__loc-banner--loading {
  background: #e8f0fe;
  color: #1a56db;
}
.mp__loc-banner--success {
  background: #e6f4ea;
  color: #1e7e34;
}
.mp__loc-banner--denied,
.mp__loc-banner--error {
  background: #fef3cd;
  color: #856404;
}
.mp__loc-dismiss {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  opacity: 0.6;
  padding: 2px 6px;
  border-radius: 4px;
}
.mp__loc-dismiss:hover {
  opacity: 1;
  background: rgba(0,0,0,0.06);
}

/* banner transition */
.loc-banner-enter-active,
.loc-banner-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.loc-banner-enter-from,
.loc-banner-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ──────── Distance badge on cards ──────── */
.mp__card-distance {
  color: var(--color-green-dark, #1f5a2b);
  font-weight: 600;
  white-space: nowrap;
}
</style>
