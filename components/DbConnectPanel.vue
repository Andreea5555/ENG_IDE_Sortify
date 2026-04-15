<template>
  <aside class="db-panel">
    <h3>DB Connected</h3>
    <p v-if="loading" class="db-panel__muted">Loading db overview...</p>
    <p v-else class="db-panel__counts">
      {{ counts.materials }} materials · {{ counts.projects }} projects · {{ counts.users }} users
    </p>

    <form class="db-panel__form" @submit.prevent="createProject">
      <input v-model="projectTitle" type="text" placeholder="Quick add project title" required />
      <input v-model="projectLocation" type="text" placeholder="Location" required />
      <select v-model.number="projectSellerId" required>
        <option :value="null" disabled>Select seller</option>
        <option v-for="seller in businessUsers" :key="seller.id" :value="seller.id">{{ seller.label }}</option>
      </select>
      <button type="submit">Add Project to DB</button>
    </form>

    <form class="db-panel__form" @submit.prevent="createReservation">
      <select v-model.number="reservationMaterialId" required>
        <option :value="null" disabled>Select material</option>
        <option v-for="material in materials" :key="material.id" :value="material.id">{{ material.name }}</option>
      </select>
      <button type="submit">Add Reservation to DB</button>
    </form>

    <p v-if="message" class="db-panel__message">{{ message }}</p>
  </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const loading = ref(true)
const message = ref('')

const counts = ref({
  units: 0,
  materials: 0,
  projects: 0,
  reservations: 0,
  users: 0,
  statistics: 0
})

const materials = ref<Array<{ id: number; name: string }>>([])
const users = ref<Array<{ id: number; label: string }>>([])
const businessUsers = ref<Array<{ id: number; label: string }>>([])

const projectTitle = ref('')
const projectLocation = ref('')
const projectSellerId = ref<number | null>(1)

const reservationMaterialId = ref<number | null>(null)
const refreshOverview = async () => {
  loading.value = true
  const response = await fetch('/api/db-overview')
  const result = await response.json()
  if (result.success) {
    counts.value = result.counts
    materials.value = result.materials || []
    users.value = result.users || []
    businessUsers.value = result.businessUsers || []
  }
  loading.value = false
}

const createProject = async () => {
  message.value = ''

  if (!import.meta.client) return
  const userRaw = localStorage.getItem('sortifyUser')
  if (!userRaw) {
    message.value = 'Please log in before adding projects.'
    return
  }
  const user = JSON.parse(userRaw)

  const response = await fetch('/api/add-project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': String(user.id)
    },
    body: JSON.stringify({
      title: projectTitle.value,
      location: projectLocation.value,
      seller_id: projectSellerId.value,
      photo: '/images/projects/project-1.jpg'
    })
  })

  const result = await response.json()
  message.value = result.success ? 'Project added to db.json' : `Project failed: ${result.message}`

  if (result.success) {
    projectTitle.value = ''
    projectLocation.value = ''
    projectSellerId.value = 1
    await refreshOverview()
  }
}

const createReservation = async () => {
  message.value = ''

  if (!import.meta.client) return
  const userRaw = localStorage.getItem('sortifyUser')
  if (!userRaw) {
    message.value = 'Please log in before reserving materials.'
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
      materialId: reservationMaterialId.value
    })
  })

  const result = await response.json()
  message.value = result.success ? 'Reservation added to db.json' : `Reservation failed: ${result.message}`

  if (result.success) {
    reservationMaterialId.value = null
    await refreshOverview()
  }
}

onMounted(refreshOverview)
</script>

<style scoped>
.db-panel {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 1200;
  width: min(320px, calc(100vw - 2rem));
  background: #ffffff;
  border: 1px solid #e4e9df;
  border-radius: 12px;
  padding: 0.75rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
}

.db-panel h3 {
  margin: 0 0 0.35rem;
  font-size: 0.95rem;
}

.db-panel__muted,
.db-panel__counts,
.db-panel__message {
  margin: 0 0 0.55rem;
  font-size: 0.82rem;
  color: #475347;
}

.db-panel__form {
  display: grid;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.db-panel__form input {
  border: 1px solid #d7ddd0;
  border-radius: 8px;
  padding: 0.45rem 0.55rem;
  font-size: 0.82rem;
}

.db-panel__form select {
  border: 1px solid #d7ddd0;
  border-radius: 8px;
  padding: 0.45rem 0.55rem;
  font-size: 0.82rem;
  background: #fff;
}

.db-panel__form button {
  border: none;
  border-radius: 8px;
  padding: 0.5rem 0.6rem;
  background: #2f7a3e;
  color: #fff;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
