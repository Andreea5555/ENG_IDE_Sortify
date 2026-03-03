<template>
  <section class="reports" role="main">
    <div class="reports__container">
      <h1>Reports</h1>

      <div class="reports-card">
        <header class="reports-card__header">
          <label for="project-select">Project Selector</label>
          <select id="project-select" v-model="selectedProjectId">
            <option v-for="project in projectReports" :key="project.id" :value="project.id">
              {{ project.name }}
            </option>
          </select>
        </header>

        <section class="reports-card__metrics" aria-label="Material flow percentages">
          <div v-for="metric in currentProject.metrics" :key="metric.label" class="metric-row">
            <div class="metric-row__label">
              <span>{{ metric.label }}</span>
              <strong>{{ metric.value }}%</strong>
            </div>
            <div class="metric-row__bar">
              <div class="metric-row__fill" :style="{ width: `${metric.value}%` }"></div>
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
          <button type="button">Download Report</button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

type ProjectMetric = { label: string; value: number }
type ProjectReport = { id: string; name: string; metrics: ProjectMetric[]; co2Saved: string }

const projectReports: ProjectReport[] = [
  {
    id: 'proj-aarhus',
    name: 'Aarhus Selective Demo',
    metrics: [
      { label: 'Reused', value: 45 },
      { label: 'Recycled', value: 30 },
      { label: 'Waste', value: 25 }
    ],
    co2Saved: '12,400 kg'
  },
  {
    id: 'proj-cph',
    name: 'Copenhagen Retrofit',
    metrics: [
      { label: 'Reused', value: 52 },
      { label: 'Recycled', value: 33 },
      { label: 'Waste', value: 15 }
    ],
    co2Saved: '15,900 kg'
  },
  {
    id: 'proj-odense',
    name: 'Odense Logistics Hub',
    metrics: [
      { label: 'Reused', value: 41 },
      { label: 'Recycled', value: 36 },
      { label: 'Waste', value: 23 }
    ],
    co2Saved: '10,780 kg'
  }
]

const selectedProjectId = ref(projectReports[0].id)

const currentProject = computed(() => projectReports.find(p => p.id === selectedProjectId.value) ?? projectReports[0])
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
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 2.2rem;
}

.reports-card {
  background: var(--color-cream-strong);
  border-radius: 24px;
  box-shadow: 0 20px 65px rgba(10, 33, 23, 0.08);
  border: 1px solid rgba(31, 42, 31, 0.08);
  overflow: hidden;
}

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
}

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
  background: linear-gradient(90deg, rgba(47, 122, 62, 0.9), rgba(111, 166, 121, 0.9));
}

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

.reports-card__actions {
  padding: 1.5rem 2rem 2rem;
  border-top: 1px solid rgba(31, 42, 31, 0.08);
  text-align: right;
}

.reports-card__actions button {
  border: 1px solid rgba(31, 42, 31, 0.3);
  border-radius: 999px;
  background: var(--color-cream);
  color: #1f2a1f;
  font-weight: 600;
  padding: 0.75rem 2.4rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.reports-card__actions button:hover {
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .reports {
    padding: 2rem 1rem 3rem;
  }

  .reports-card__header,
  .reports-card__metrics,
  .reports-card__summary,
  .reports-card__actions {
    padding: 1.5rem;
  }

  .reports-card__summary {
    flex-direction: column;
    align-items: flex-start;
  }

  .reports-card__actions {
    text-align: left;
  }
}
</style>
