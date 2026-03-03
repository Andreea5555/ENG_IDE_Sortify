<template>
  <footer class="footer" role="contentinfo">
    <div class="footer__inner">
      <!-- Brand / About -->
      <div class="footer__col">
        <div class="footer__brand">
          <img src="/Logo.png" alt="Sortify logo" class="footer__logo" />
          <span class="footer__title">Sortify</span>
        </div>
        <p class="footer__about">
          Helping the construction industry sort, recycle and reuse leftover
          materials — closing the loop for a greener future.
        </p>
      </div>

      <!-- Quick Links -->
      <div class="footer__col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">How It Works</a></li>
          <li><a href="#">Materials</a></li>
          <li><a href="#">Recycling Guide</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </div>

      <!-- Sustainability -->
      <div class="footer__col">
        <h4>Sustainability</h4>
        <ul>
          <li><a href="#">Circular Economy</a></li>
          <li><a href="#">Selective Demolition</a></li>
          <li><a href="#">Waste Hierarchy</a></li>
          <li><a href="#">Our Impact</a></li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="footer__col">
        <h4>Contact</h4>
        <ul class="footer__contact">
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href="mailto:info@sortify.dk">info@sortify.dk</a>
          </li>
          <li>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Denmark</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer__bottom">
      <p>&copy; {{ year }} Sortify — Built for a sustainable construction industry.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  position: relative;
  margin-top: auto;
  color: rgba(255, 255, 255, 0.9);
  padding: 2.75rem 2rem 0;
  overflow: hidden;
}
.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--color-green-dark) 0%, var(--color-brown-dark) 100%);
  opacity: 0.92;
  z-index: 0;
}

.footer__inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}

/* Brand column */
.footer__brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.footer__logo {
  width: 36px;
  height: 36px;
  border-radius: 6px;
  object-fit: cover;
}
.footer__title {
  font-weight: 700;
  font-size: 1.15rem;
  color: #fff;
}
.footer__about {
  font-size: 0.88rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.72);
  max-width: 260px;
}

/* Column headings */
.footer__col h4 {
  font-size: 0.92rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
  color: #fff;
  letter-spacing: 0.02em;
}

/* Link lists */
.footer__col ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.footer__col li {
  margin-bottom: 0.45rem;
}
.footer__col a {
  color: rgba(255, 255, 255, 0.78);
  text-decoration: none;
  font-size: 0.88rem;
  transition: color 0.15s;
}
.footer__col a:hover {
  color: #fff;
  text-decoration: underline;
}

/* Contact icons */
.footer__contact li {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}
.footer__contact svg {
  flex-shrink: 0;
  opacity: 0.7;
}

/* Bottom bar */
.footer__bottom {
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  margin-top: 2rem;
  padding: 1rem 0;
  text-align: center;
}
.footer__bottom p {
  margin: 0;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.55);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer {
    padding: 2.5rem 1.5rem 0;
  }
  .footer__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
}
@media (max-width: 900px) {
  .footer__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .footer__col {
    text-align: center;
  }
  .footer__brand {
    justify-content: center;
  }
  .footer__contact li {
    justify-content: center;
  }
}
@media (max-width: 480px) {
  .footer__inner {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .footer__brand {
    justify-content: center;
  }
  .footer__about {
    max-width: 100%;
  }
  .footer__contact li {
    justify-content: center;
  }
  .footer {
    padding: 2rem 1.25rem 0;
  }
}
</style>
