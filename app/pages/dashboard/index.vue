<template>
  <main class="cat">
    <div class="cat__container">

      <!-- ───── Hero Header ───── -->
      <section class="cat__hero">
        <div class="cat__hero-text">
          <span class="cat__badge">Demolition Projects</span>
          <h1 class="cat__title">Project Dashboard</h1>
          <p class="cat__subtitle">
            Track materials across all active demolition and renovation sites in Denmark.
          </p>
        </div>
        <div class="cat__pills">
          <span class="cat__pill"><strong>{{ projects.length }}</strong> Projects</span>
          <span class="cat__pill"><strong>{{ totalMaterials.toLocaleString() }}</strong> kg Total</span>
          <span class="cat__pill cat__pill--green"><strong>{{ activeCount }}</strong> Active</span>
        </div>
      </section>

      <section class="cat__add-project">
        <h2 class="cat__add-title">Add Project (writes to DB)</h2>
        <form class="cat__add-form" @submit.prevent="addProject">
          <input v-model="newProjectTitle" type="text" placeholder="Project title" required />
          <input v-model="newProjectLocation" type="text" placeholder="Location (e.g. Aarhus)" required />
          <select v-model.number="newProjectSellerId" required>
            <option :value="null" disabled>Select seller</option>
            <option v-for="seller in sellers" :key="seller.id" :value="seller.id">
              {{ seller.first_name }} {{ seller.last_name }} ({{ seller.email }})
            </option>
          </select>
          <button type="submit">Add Project</button>
        </form>
        <p v-if="addProjectMessage" class="cat__add-message">{{ addProjectMessage }}</p>
      </section>

      <!-- ───── Projects Grid ───── -->
      <section class="cat__grid">
        <div
          v-for="p in projects"
          :key="p.id"
          class="cat__card"
          :style="{ '--accent': p.accent }"
        >
          <div class="cat__card-inner">

            <!-- ▸▸▸ FRONT — Photo + Name + Button ▸▸▸ -->
            <div class="cat__card-front">
              <img
                :src="p.photo"
                :alt="p.name"
                class="cat__card-img"
              />
              <div class="cat__card-overlay">
                <span class="cat__card-status" :class="'cat__card-status--' + p.status">
                  {{ p.status }}
                </span>
                <div class="cat__card-overlay-bottom">
                  <h2 class="cat__card-front-title">{{ p.name }}</h2>
                  <p class="cat__card-front-loc">📍 {{ p.location }}</p>
                  <NuxtLink :to="'/dashboard/' + p.id" class="cat__card-btn">
                    View Project →
                  </NuxtLink>
                </div>
              </div>
            </div>

            <!-- ◂◂◂ BACK — Info ◂◂◂ -->
            <div class="cat__card-back">
              <div class="cat__card-top" />
              <div class="cat__card-body">
                <h2 class="cat__card-title">{{ p.name }}</h2>
                <p class="cat__card-loc">📍 {{ p.location }}</p>
                <p class="cat__card-building">{{ p.building }}</p>

                <div class="cat__card-stats">
                  <span class="cat__card-stat">
                    <strong>{{ p.totalKg.toLocaleString() }}</strong> kg
                  </span>
                  <span class="cat__card-stat">
                    <strong>{{ p.materialCount }}</strong> materials
                  </span>
                </div>

                <p class="cat__card-date">Started {{ p.started }}</p>
              </div>

              <div class="cat__card-footer">
                <NuxtLink :to="'/dashboard/' + p.id" class="cat__card-cta">
                  View Project →
                </NuxtLink>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import db from '~/../db/db.json'

export interface Project {
  id: number
  name: string
  location: string
  building: string
  status: 'active' | 'completed' | 'planned'
  started: string
  totalKg: number
  materialCount: number
  photo: string
  accent: string
}

const projectsData = db.projects.map(p => {
  const materials = db.materials.filter(m => m.project_id === p.id);
  const totalWeight = materials.reduce((acc, m) => acc + (m.quantity || 0), 0); // Assuming quantity is in kg for simplicity
  const creationDate = new Date(p.creation_date);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - creationDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const status = diffDays <= 30 ? 'active' : (creationDate > now ? 'planned' : 'completed');

  return {
    id: p.id,
    name: p.title,
    location: p.location,
    building: 'Building type placeholder', // This info is not in your db schema
    status: status,
    started: creationDate.toLocaleDateString(),
    totalKg: totalWeight,
    materialCount: materials.length,
    photo: p.photo || '/images/projects/project-1.jpg',
    accent: ['#4A90E2', '#50E3C2', '#F5A623', '#D0021B', '#BD10E0', '#9013FE'][p.id % 6]
  };
});

const projects = ref<Project[]>(projectsData);
const sellers = db.users.filter(user => user.type === 'business')
const newProjectTitle = ref('')
const newProjectLocation = ref('')
const newProjectSellerId = ref<number | null>(1)
const addProjectMessage = ref('')

const totalMaterials = computed(() =>
  projects.value.reduce((sum, p) => sum + p.totalKg, 0)
)
const activeCount = computed(() =>
  projects.value.filter(p => p.status === 'active').length
)

const addProject = async () => {
  addProjectMessage.value = ''

  if (!import.meta.client) return
  const userRaw = localStorage.getItem('sortifyUser')
  if (!userRaw) {
    addProjectMessage.value = 'Please log in before adding projects.'
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
      title: newProjectTitle.value,
      location: newProjectLocation.value,
      photo: '/images/projects/project-1.jpg'
    })
  })

  const result = await response.json()
  if (!result.success) {
    addProjectMessage.value = `Failed: ${result.message}`
    return
  }

  addProjectMessage.value = 'Project added to DB. Refresh page to see it in list.'
  newProjectTitle.value = ''
  newProjectLocation.value = ''
  newProjectSellerId.value = 1
}
</script>

<style scoped>
.cat {
  flex: 1;
  padding: 40px 24px 80px;
  background: linear-gradient(175deg, #f6f7f3 0%, #eef0e8 100%);
}
.cat__container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

/* ──── Hero ──── */
.cat__hero {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 20px;
}
.cat__hero-text { max-width: 600px; }
.cat__badge {
  display: inline-block;
  background: rgba(47,122,62,0.1);
  color: var(--color-green, #2f7a3e);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 10px;
}
.cat__title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.02em;
}
.cat__subtitle {
  margin: 8px 0 0;
  font-size: 1rem;
  color: #555;
  line-height: 1.55;
}

/* ──── Pills ──── */
.cat__pills { display: flex; gap: 10px; flex-wrap: wrap; }
.cat__pill {
  background: #fff;
  border: 1px solid #e5e7e0;
  padding: 8px 18px;
  border-radius: 24px;
  font-size: 0.88rem;
  color: #333;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.cat__pill strong { color: #1a1a1a; }
.cat__pill--green { background: #e6f4ea; border-color: #b7e4c7; color: #1e7e34; }

/* ──── Grid ──── */
.cat__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.cat__add-project {
  background: #fff;
  border: 1px solid #e5e7e0;
  border-radius: 14px;
  padding: 1rem;
}

.cat__add-title {
  margin: 0 0 0.75rem;
  font-size: 1.05rem;
  color: #1a1a1a;
}

.cat__add-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.6rem;
}

.cat__add-form input {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d7dbd1;
  border-radius: 8px;
}

.cat__add-form select {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d7dbd1;
  border-radius: 8px;
  background: #fff;
}

.cat__add-form button {
  border: none;
  border-radius: 8px;
  background: #2f7a3e;
  color: #fff;
  padding: 0.6rem 1rem;
  font-weight: 600;
  cursor: pointer;
}

.cat__add-message {
  margin: 0.65rem 0 0;
  color: #2f7a3e;
  font-weight: 600;
}

/* ──── Flip Card ──── */
.cat__card {
  perspective: 1000px;
  height: 380px;
}
.cat__card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.cat__card:hover .cat__card-inner {
  transform: rotateY(180deg);
}

/* ── Shared face styles ── */
.cat__card-front,
.cat__card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 14px rgba(0,0,0,0.06);
}

/* ── FRONT face ── */
.cat__card-front {
  background: #000;
}
.cat__card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.85;
  transition: opacity 0.3s;
}
.cat__card:hover .cat__card-img {
  opacity: 0.7;
}
.cat__card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px 18px 20px;
}
.cat__card-overlay-bottom {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.cat__card-front-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  line-height: 1.25;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
}
.cat__card-front-loc {
  font-size: 0.85rem;
  color: rgba(255,255,255,0.85);
  margin: 0;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
}
.cat__card-btn {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 6px;
  padding: 8px 20px;
  background: var(--color-green, #2f7a3e);
  color: #fff;
  font-size: 0.88rem;
  font-weight: 700;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
  box-shadow: 0 2px 10px rgba(0,0,0,0.25);
}
.cat__card-btn:hover {
  background: var(--color-green-dark, #1f5a2b);
  transform: scale(1.04);
}

/* ── Status badge (shared) ── */
.cat__card-status {
  align-self: flex-end;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 3px 10px;
  border-radius: 12px;
}
.cat__card-status--active { background: rgba(230,244,234,0.95); color: #1e7e34; }
.cat__card-status--completed { background: rgba(232,240,254,0.95); color: #1a56db; }
.cat__card-status--planned { background: rgba(243,244,246,0.95); color: #6b7280; }

/* ── BACK face ── */
.cat__card-back {
  background: #fff;
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
}
.cat__card-top {
  height: 6px;
  background: var(--accent, var(--color-green));
  flex-shrink: 0;
}
.cat__card-body {
  padding: 20px 18px 12px;
  flex: 1;
  overflow-y: auto;
}
.cat__card-title {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0 0 4px;
  color: #1a1a1a;
  line-height: 1.3;
}
.cat__card-loc { font-size: 0.84rem; color: #666; margin: 0 0 8px; }
.cat__card-building {
  font-size: 0.8rem;
  color: #888;
  line-height: 1.5;
  margin: 0 0 14px;
}
.cat__card-stats { display: flex; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
.cat__card-stat {
  font-size: 0.82rem;
  color: #555;
  background: #f6f7f3;
  padding: 4px 10px;
  border-radius: 8px;
}
.cat__card-stat strong { color: #1a1a1a; }
.cat__card-date { font-size: 0.78rem; color: #aaa; margin: 0; }

.cat__card-footer {
  border-top: 1px solid #f0f0ec;
  padding: 12px 18px;
  flex-shrink: 0;
}
.cat__card-cta {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-green, #2f7a3e);
  text-decoration: none;
}
.cat__card-cta:hover { text-decoration: underline; }

/* ──── Responsive ──── */
@media (max-width: 900px) {
  .cat__grid { grid-template-columns: repeat(2, 1fr); }
  .cat__card { height: 360px; }
}
@media (max-width: 600px) {
  .cat { padding: 20px 16px 48px; }
  .cat__title { font-size: 1.5rem; }
  .cat__grid { grid-template-columns: 1fr; }
  .cat__card { height: 340px; }
  .cat__hero { flex-direction: column; align-items: flex-start; }
}
</style>
