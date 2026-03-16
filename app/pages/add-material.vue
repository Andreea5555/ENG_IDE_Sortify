<script setup lang="ts">
import { ref } from 'vue'
import db from '~/../db/db.json'

const units = db.units
const projects = db.projects

const materialName = ref('')
const unitId = ref<number | null>(null)
const quantity = ref<number | null>(null)
const condition = ref('')
const projectId = ref<number | null>(null)
const photo = ref<File | null>(null)
const description = ref('')
const feedbackMessage = ref('')

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    photo.value = target.files[0]
  }
}

const saveMaterial = async () => {
  if (!import.meta.client) return
  const userRaw = localStorage.getItem('sortifyUser')
  if (!userRaw) {
    feedbackMessage.value = 'Please log in before adding materials.'
    return
  }
  const user = JSON.parse(userRaw)

  if (!photo.value) {
    feedbackMessage.value = 'Please select a photo.'
    return
  }

  const formData = new FormData()
  formData.append('name', materialName.value)
  formData.append('unit_id', unitId.value?.toString() || '')
  formData.append('quantity', quantity.value?.toString() || '')
  formData.append('condition', condition.value)
  formData.append('project_id', projectId.value?.toString() || '')
  formData.append('photo', photo.value)
  formData.append('description', description.value)

  try {
    const response = await fetch('/api/add-material', {
      method: 'POST',
      headers: {
        'x-user-id': String(user.id)
      },
      body: formData
    })

    const result = await response.json()

    if (result.success) {
      feedbackMessage.value = 'Material added successfully!'
      // Reset form
      materialName.value = ''
      unitId.value = null
      quantity.value = null
      condition.value = ''
      projectId.value = null
      photo.value = null
      description.value = ''
    } else {
      feedbackMessage.value = `Error: ${result.message}`
    }
  } catch (error) {
    console.error('Failed to save material:', error)
    feedbackMessage.value = 'An unexpected error occurred.'
  }
}
</script>

<template>
  <section class="add-material" role="main">
    <div class="add-material__container">
      <h1>Add a new material</h1>
      <form class="material-form" aria-label="Add material" @submit.prevent="saveMaterial">
        <div class="form-field">
          <label for="material-name">Material Name</label>
          <input
            id="material-name"
            v-model="materialName"
            name="material-name"
            type="text"
            placeholder="e.g., Reclaimed bricks"
            required
          />
        </div>

        <div class="form-field">
          <label for="material-unit">Unit</label>
          <select id="material-unit" v-model="unitId" name="material-unit" required>
            <option value="" disabled selected>Select unit</option>
            <option v-for="unit in units" :key="unit.id" :value="unit.id">
              {{ unit.value }}
            </option>
          </select>
        </div>

        <div class="form-field">
          <label for="material-quantity">Quantity</label>
          <input
            id="material-quantity"
            v-model="quantity"
            name="material-quantity"
            type="number"
            min="0"
            step="1"
            placeholder="0"
            required
          />
        </div>

        <div class="form-field">
          <label for="material-condition">Condition</label>
          <select id="material-condition" v-model="condition" name="material-condition" required>
            <option value="" disabled selected>Select condition</option>
            <option value="Used - Good">Used - Good</option>
            <option value="Used - Excellent">Used - Excellent</option>
            <option value="New">New</option>
          </select>
        </div>

        <div class="form-field">
          <label for="material-project">Project</label>
          <select id="material-project" v-model="projectId" name="material-project" required>
            <option value="" disabled selected>Select project</option>
            <option v-for="project in projects" :key="project.id" :value="project.id">
              {{ project.title }}
            </option>
          </select>
        </div>

        <div class="form-field form-field--full">
          <label for="material-description">Description</label>
          <textarea
            id="material-description"
            v-model="description"
            name="material-description"
            rows="4"
            placeholder="Describe the material..."
            required
          ></textarea>
        </div>

        <div class="form-field form-field--full">
          <label for="material-photo">Upload Photo</label>
          <input
            id="material-photo"
            name="material-photo"
            type="file"
            accept="image/*"
            @change="handleFileUpload"
          />
        </div>

        <div class="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
      <p v-if="feedbackMessage" class="feedback-message">{{ feedbackMessage }}</p>
    </div>
  </section>
</template>

<style scoped>
.add-material {
  flex: 1;
  padding: 4rem 1.5rem;
  background: transparent;
  color: #1f2a1f;
}
.add-material__container {
  max-width: 720px;
  margin: 0 auto;
  background: var(--color-cream);
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
.material-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form-field--full {
  grid-column: 1 / -1;
}
.form-field label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #304030;
}
.form-field input,
.form-field select {
  border: 1px solid rgba(31, 42, 31, 0.25);
  border-radius: 10px;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  color: #1f2a1f;
  background: #f6f7f3;
}
.form-field input[type='file'] {
  padding: 0.4rem;
  background: transparent;
  border-radius: 0;
}
.form-field input:focus,
.form-field select:focus {
  outline: 2px solid rgba(47, 122, 62, 0.3);
  border-color: rgba(47, 122, 62, 0.6);
}
.form-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}
.form-actions button {
  background: #2f7a3e;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.85rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}
.form-actions button:hover {
  background: #22602e;
}
.form-actions button:active {
  transform: scale(0.98);
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
