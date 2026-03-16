<template>
  <main class="det">
    <div class="det__container" v-if="project">
      <NuxtLink to="/dashboard" class="det__back">← All Projects</NuxtLink>

      <section class="det__hero">
        <h1 class="det__title">{{ project.title }}</h1>
        <p class="det__meta">📍 {{ project.location }} · 🗓️ {{ createdAt }}</p>
      </section>

      <section class="det__stats">
        <article v-for="card in statCards" :key="card.key" class="det__card">
          <span class="det__card-label">{{ card.label }}</span>
          <span class="det__card-value">{{ formatNumber(card.value) }} {{ card.unit }}</span>
        </article>
      </section>

      <section class="det__materials">
        <div class="det__materials-head">
          <h2>Materials</h2>
          <span>{{ materials.length }} items</span>
        </div>

        <div v-if="materials.length === 0" class="det__empty">No materials found for this project.</div>

        <table v-else class="det__table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Condition</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in materials" :key="entry.id">
              <td>{{ index + 1 }}</td>
              <td>{{ entry.name }}</td>
              <td>{{ entry.quantityLabel }}</td>
              <td>{{ entry.condition }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import db from '~/../db/db.json'

const route = useRoute()
const projectId = Number(route.params.id)

const project = computed(() => db.projects.find((entry) => entry.id === projectId) || null)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const unitsById = computed(() => {
  return Object.fromEntries(db.units.map((unit) => [unit.id, unit.value])) as Record<number, string>
})

const materials = computed(() => {
  return db.materials
    .filter((entry) => entry.project_id === projectId)
    .map((entry) => ({
      ...entry,
      quantityLabel: `${entry.quantity} ${unitsById.value[entry.unit_id] || ''}`.trim()
    }))
})

const stats = computed(() => {
  if (!project.value) {
    return { reused: 0, recycled: 0, waste: 0, co2_saved: 0 }
  }

  return db.statistics.find((entry) => entry.id === project.value!.statistics_id) || {
    reused: 0,
    recycled: 0,
    waste: 0,
    co2_saved: 0
  }
})

const statCards = computed(() => [
  { key: 'reused', label: 'Reused', value: stats.value.reused, unit: 'kg' },
  { key: 'recycled', label: 'Recycled', value: stats.value.recycled, unit: 'kg' },
  { key: 'waste', label: 'Waste', value: stats.value.waste, unit: 'kg' },
  { key: 'co2', label: 'CO₂ Saved', value: stats.value.co2_saved, unit: 't' }
])

const formatNumber = (value: number) => value.toLocaleString('en-US')

const createdAt = computed(() => {
  if (!project.value) return ''
  return new Date(project.value.creation_date).toLocaleDateString('en-US')
})
</script>

<style scoped>
.det {
  flex: 1;
  padding: 2rem 1.5rem 3rem;
  background: #f6f7f3;
}

.det__container {
  max-width: 960px;
  margin: 0 auto;
}

.det__back {
  display: inline-block;
  margin-bottom: 1rem;
  color: #2f7a3e;
  text-decoration: none;
  font-weight: 600;
}

.det__hero {
  background: #2f7a3e;
  color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.det__title {
  margin: 0;
  font-size: 1.6rem;
}

.det__meta {
  margin-top: 0.5rem;
  opacity: 0.9;
}

.det__stats {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  margin-bottom: 1rem;
}

.det__card {
  background: #fff;
  border: 1px solid #e9ece4;
  border-radius: 12px;
  padding: 1rem;
}

.det__card-label {
  display: block;
  color: #5c6b5f;
  font-size: 0.85rem;
}

.det__card-value {
  display: block;
  margin-top: 0.25rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.det__materials {
  background: #fff;
  border: 1px solid #e9ece4;
  border-radius: 12px;
  padding: 1rem;
}

.det__materials-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.det__table {
  width: 100%;
  border-collapse: collapse;
}

.det__table th,
.det__table td {
  text-align: left;
  border-bottom: 1px solid #eef0ea;
  padding: 0.6rem 0.4rem;
}

.det__table th {
  font-size: 0.8rem;
  color: #5c6b5f;
  text-transform: uppercase;
}

.det__empty {
  color: #7a877d;
}
</style>
