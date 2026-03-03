<template>
  <section class="add-material" role="main">
    <div class="add-material__container">
      <h1>Add a new material</h1>
      <form class="material-form" aria-label="Add material">
        <div class="form-field">
          <label for="material-name">Material Name</label>
          <input id="material-name" name="material-name" type="text" placeholder="e.g., Reclaimed bricks" />
        </div>

        <div class="form-field">
          <label for="material-category">Category</label>
          <select id="material-category" name="material-category">
            <option value="" disabled selected>Select unit</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="liters">Liters (L)</option>
          </select>
        </div>

        <div class="form-field">
          <label for="material-quantity">Quantity</label>
          <input id="material-quantity" name="material-quantity" type="number" min="0" step="1" placeholder="0" />
        </div>

        <div class="form-field">
          <label for="material-condition">Condition</label>
          <select id="material-condition" name="material-condition">
            <option value="" disabled selected>Select condition</option>
            <option value="bad">Bad</option>
            <option value="fairly-good">Fairly good</option>
            <option value="good">Good</option>
          </select>
        </div>

        <div class="form-field form-field--full">
          <label for="material-photo">Upload Photo</label>
          <input id="material-photo" name="material-photo" type="file" accept="image/*" />
        </div>

        <div class="form-actions">
          <button type="button">Save</button>
        </div>
      </form>
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
