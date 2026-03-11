<template>
  <section class="reports" role="main">
    <div class="reports__container">
      <h1>Project Reports</h1>
      <p class="reports__subtitle">Environmental impact overview for each demolition project.</p>

      <div class="reports-card">
        <header class="reports-card__header">
          <label for="project-select">Select Project</label>
          <select id="project-select" v-model="selectedProjectId">
            <option v-for="project in projectReports" :key="project.id" :value="project.id">
              {{ project.name }}
            </option>
          </select>
        </header>

        <!-- Project info strip -->
        <section class="reports-card__info">
          <div class="info-chip">
            <span class="info-chip__label">Location</span>
            <span class="info-chip__value">{{ currentProject.location }}</span>
          </div>
          <div class="info-chip">
            <span class="info-chip__label">Status</span>
            <span class="info-chip__value" :class="`status--${currentProject.status}`">{{ currentProject.status }}</span>
          </div>
          <div class="info-chip">
            <span class="info-chip__label">Reuse Target</span>
            <span class="info-chip__value">{{ currentProject.reuseTarget }}</span>
          </div>
          <div class="info-chip">
            <span class="info-chip__label">Total Weight</span>
            <span class="info-chip__value">{{ currentProject.totalKg }}</span>
          </div>
          <div class="info-chip">
            <span class="info-chip__label">Materials</span>
            <span class="info-chip__value">{{ currentProject.materialCount }} items</span>
          </div>
        </section>

        <!-- Material breakdown -->
        <section class="reports-card__breakdown">
          <h3>Material Breakdown (kg)</h3>
          <div class="breakdown-grid">
            <div v-for="item in currentProject.breakdown" :key="item.label" class="breakdown-item">
              <span class="breakdown-item__label">{{ item.label }}</span>
              <span class="breakdown-item__value">{{ item.value.toLocaleString() }} kg</span>
              <div class="breakdown-item__bar">
                <div class="breakdown-item__fill" :style="{ width: `${item.percent}%` }"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Material flow metrics -->
        <section class="reports-card__metrics" aria-label="Material flow percentages">
          <h3>Material Flow</h3>
          <div v-for="metric in currentProject.metrics" :key="metric.label" class="metric-row">
            <div class="metric-row__label">
              <span>{{ metric.label }}</span>
              <strong>{{ metric.value }}%</strong>
            </div>
            <div class="metric-row__bar">
              <div
                class="metric-row__fill"
                :class="`metric-row__fill--${metric.label.toLowerCase()}`"
                :style="{ width: `${metric.value}%` }"
              ></div>
            </div>
          </div>
        </section>

        <section class="reports-card__summary">
          <div>
            <p>Estimated CO₂ Saved</p>
            <h2>{{ currentProject.co2Saved }}</h2>
          </div>
          <p class="reports-card__note">Compared to sending the same materials to landfill.</p>
        </section>

        <footer class="reports-card__actions">
          <NuxtLink :to="`/dashboard/${currentProject.dashboardId}`" class="btn btn--outline">
            View in Dashboard
          </NuxtLink>
          <button type="button" class="btn btn--primary">Download Report</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

/* ──── Types ──── */
type ProjectMetric   = { label: string; value: number }
type BreakdownItem   = { label: string; value: number; percent: number }
type ProjectReport   = {
  id: string
  dashboardId: number
  name: string
  location: string
  status: 'active' | 'planned' | 'completed'
  reuseTarget: string
  totalKg: string
  materialCount: number
  breakdown: BreakdownItem[]
  metrics: ProjectMetric[]
  co2Saved: string
}

/* ──── Helper: build breakdown with percentages ──── */
function makeBreakdown(concrete: number, wood: number, metal: number, reusable: number): BreakdownItem[] {
  const total = concrete + wood + metal + reusable
  if (total === 0) return [
    { label: 'Concrete', value: 0, percent: 0 },
    { label: 'Wood', value: 0, percent: 0 },
    { label: 'Metal', value: 0, percent: 0 },
    { label: 'Reusable', value: 0, percent: 0 },
  ]
  return [
    { label: 'Concrete', value: concrete, percent: Math.round((concrete / total) * 100) },
    { label: 'Wood', value: wood, percent: Math.round((wood / total) * 100) },
    { label: 'Metal', value: metal, percent: Math.round((metal / total) * 100) },
    { label: 'Reusable', value: reusable, percent: Math.round((reusable / total) * 100) },
  ]
}

/* ──── Project reports — aligned 1-to-1 with Dashboard projects ──── */
const projectReports: ProjectReport[] = [
  {
    id: 'proj-1',
    dashboardId: 1,
    name: 'Aarhus University Hospital Wing B',
    location: 'Aarhus',
    status: 'active',
    reuseTarget: '70%',
    totalKg: '16,790 kg',
    materialCount: 14,
    breakdown: makeBreakdown(12_000, 3_200, 950, 640),
    metrics: [
      { label: 'Reused', value: 38 },
      { label: 'Recycled', value: 32 },
      { label: 'Waste', value: 30 },
    ],
    co2Saved: '8,940 kg',
  },
  {
    id: 'proj-2',
    dashboardId: 2,
    name: 'Carlsberg Byen Warehouse 7',
    location: 'Copenhagen',
    status: 'active',
    reuseTarget: '85%',
    totalKg: '24,300 kg',
    materialCount: 22,
    breakdown: makeBreakdown(8_500, 6_800, 4_200, 4_800),
    metrics: [
      { label: 'Reused', value: 52 },
      { label: 'Recycled', value: 33 },
      { label: 'Waste', value: 15 },
    ],
    co2Saved: '18,630 kg',
  },
  {
    id: 'proj-3',
    dashboardId: 3,
    name: 'Odense Harbour Silo Complex',
    location: 'Odense',
    status: 'planned',
    reuseTarget: '45%',
    totalKg: '0 kg',
    materialCount: 0,
    breakdown: makeBreakdown(0, 0, 0, 0),
    metrics: [
      { label: 'Reused', value: 0 },
      { label: 'Recycled', value: 0 },
      { label: 'Waste', value: 0 },
    ],
    co2Saved: '—',
  },
  {
    id: 'proj-4',
    dashboardId: 4,
    name: 'Aalborg Cement Factory East',
    location: 'Aalborg',
    status: 'active',
    reuseTarget: '60%',
    totalKg: '31,500 kg',
    materialCount: 18,
    breakdown: makeBreakdown(18_000, 1_500, 8_200, 3_800),
    metrics: [
      { label: 'Reused', value: 41 },
      { label: 'Recycled', value: 35 },
      { label: 'Waste', value: 24 },
    ],
    co2Saved: '15,120 kg',
  },
  {
    id: 'proj-5',
    dashboardId: 5,
    name: 'Frederiksberg School Renovation',
    location: 'Frederiksberg',
    status: 'completed',
    reuseTarget: '75%',
    totalKg: '8,400 kg',
    materialCount: 11,
    breakdown: makeBreakdown(2_200, 3_400, 800, 2_000),
    metrics: [
      { label: 'Reused', value: 62 },
      { label: 'Recycled', value: 26 },
      { label: 'Waste', value: 12 },
    ],
    co2Saved: '6,480 kg',
  },
  {
    id: 'proj-6',
    dashboardId: 6,
    name: 'Roskilde Viking Museum Hall',
    location: 'Roskilde',
    status: 'active',
    reuseTarget: '65%',
    totalKg: '11,250 kg',
    materialCount: 9,
    breakdown: makeBreakdown(5_400, 2_800, 1_600, 1_450),
    metrics: [
      { label: 'Reused', value: 44 },
      { label: 'Recycled', value: 34 },
      { label: 'Waste', value: 22 },
    ],
    co2Saved: '7,250 kg',
  },
]

const selectedProjectId = ref(projectReports[0]!.id)

const currentProject = computed((): ProjectReport =>
  projectReports.find(p => p.id === selectedProjectId.value) ?? projectReports[0]!
)
</script>

<style scoped>
.reports {
  flex: 1;
  padding: 3rem 1.5rem 4rem;
  color: #1f2a1f;
}

.reports__container {
  max-width: 880px;
  margin: 0 auto;
}

h1 {
  margin: 0 0 0.4rem;
  text-align: center;
  font-size: 2.2rem;
}

.reports__subtitle {
  text-align: center;
  color: rgba(31, 42, 31, 0.6);
  margin: 0 0 2rem;
  font-size: 1.05rem;
}

/* ── Card shell ── */
.reports-card {
  background: var(--color-cream-strong);
  border-radius: 24px;
  box-shadow: 0 20px 65px rgba(10, 33, 23, 0.08);
  border: 1px solid rgba(31, 42, 31, 0.08);
  overflow: hidden;
}

/* ── Header / selector ── */
.reports-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(31, 42, 31, 0.08);
}

.reports-card__header label {
  font-weight: 600;
  font-size: 1rem;
}

.reports-card__header select {
  border-radius: 10px;
  border: 1px solid rgba(31, 42, 31, 0.2);
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  background: #f7f7f3;
  max-width: 340px;
}

/* ── Info strip ── */
.reports-card__info {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(31, 42, 31, 0.08);
}

.info-chip {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  background: rgba(47, 122, 62, 0.06);
  border-radius: 12px;
  padding: 0.6rem 1rem;
  flex: 1;
  min-width: 120px;
}

.info-chip__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(31, 42, 31, 0.5);
  font-weight: 600;
}

.info-chip__value {
  font-weight: 700;
  font-size: 0.95rem;
  text-transform: capitalize;
}

.status--active  { color: #2f7a3e; }
.status--planned { color: #92400e; }
.status--completed { color: #7c3aed; }

/* ── Material Breakdown ── */
.reports-card__breakdown {
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(31, 42, 31, 0.08);
}

.reports-card__breakdown h3,
.reports-card__metrics h3 {
  margin: 0 0 1rem;
  font-size: 1rem;
  font-weight: 700;
}

.breakdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.breakdown-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.breakdown-item__label {
  font-size: 0.85rem;
  color: rgba(31, 42, 31, 0.65);
  font-weight: 600;
}

.breakdown-item__value {
  font-weight: 700;
  font-size: 1rem;
}

.breakdown-item__bar {
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(31, 42, 31, 0.08);
  overflow: hidden;
  margin-top: 0.2rem;
}

.breakdown-item__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #6b4f32, #a37c5a);
}

/* ── Material Flow Metrics ── */
.reports-card__metrics {
  padding: 1.75rem 2rem;
  border-bottom: 1px solid rgba(31, 42, 31, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.metric-row__label {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  font-size: 0.95rem;
}

.metric-row__bar {
  width: 100%;
  height: 12px;
  border-radius: 999px;
  background: rgba(31, 42, 31, 0.08);
  overflow: hidden;
  margin-top: 0.35rem;
}

.metric-row__fill {
  height: 100%;
  border-radius: inherit;
}

.metric-row__fill--reused {
  background: linear-gradient(90deg, #2f7a3e, #4caf50);
}

.metric-row__fill--recycled {
  background: linear-gradient(90deg, #1565c0, #42a5f5);
}

.metric-row__fill--waste {
  background: linear-gradient(90deg, #c62828, #ef5350);
}

/* ── CO₂ Summary ── */
.reports-card__summary {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2rem;
  padding: 1.75rem 2rem;
}

.reports-card__summary h2 {
  margin: 0.25rem 0 0;
  font-size: 2rem;
  color: #2f7a3e;
}

.reports-card__summary p {
  margin: 0;
}

.reports-card__note {
  font-size: 0.85rem;
  color: rgba(31, 42, 31, 0.6);
}

/* ── Actions ── */
.reports-card__actions {
  padding: 1.5rem 2rem 2rem;
  border-top: 1px solid rgba(31, 42, 31, 0.08);
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.btn {
  border-radius: 999px;
  font-weight: 600;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn--outline {
  border: 1px solid rgba(31, 42, 31, 0.3);
  background: var(--color-cream);
  color: #1f2a1f;
}

.btn--primary {
  border: none;
  background: linear-gradient(135deg, #2f7a3e, #1f5a2b);
  color: #fff;
  box-shadow: 0 4px 14px rgba(47, 122, 62, 0.25);
}

.btn--primary:hover {
  box-shadow: 0 6px 20px rgba(47, 122, 62, 0.35);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .reports {
    padding: 2rem 1rem 3rem;
  }

  .reports-card__header,
  .reports-card__info,
  .reports-card__breakdown,
  .reports-card__metrics,
  .reports-card__summary,
  .reports-card__actions {
    padding: 1.5rem;
  }

  .reports-card__header {
    flex-direction: column;
    align-items: stretch;
  }

  .reports-card__header select {
    max-width: 100%;
  }

  .reports-card__summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .reports-card__actions {
    flex-direction: column;
  }

  .btn {
    text-align: center;
    justify-content: center;
  }

  .breakdown-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
