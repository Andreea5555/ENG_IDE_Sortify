<template>
  <section class="home" role="main">
    <div class="home__content">
      <h1>Welcome to Sortify</h1>
      <p>
        Your control center for sorting, reusing, and adding materials. Use the navigation
        to explore the platform while we build out the rest of the experience.
      </p>
      <NuxtLink class="home__cta" to="/how-it-works">How does it work?</NuxtLink>

      <div class="home__voice" aria-live="polite">
        <div>
          <h2>No hands free? No problem.</h2>
          <p>
            Enable the microphone if you prefer voice control. Say things like "Open marketplace" or
            "Start signup" and we will capture your request so you can act without using your hands.
          </p>
        </div>
        <button
          class="home__voice-btn"
          type="button"
          :disabled="!recognitionSupported"
          @click="toggleListening"
        >
          <span class="home__voice-indicator" :class="{ 'home__voice-indicator--active': listening }"></span>
          <span>
            {{ listening ? 'Listening... tap to pause' : 'Use microphone' }}
          </span>
        </button>
        <p v-if="!recognitionSupported" class="home__voice-status">
          Microphone controls are not available in this browser.
        </p>
        <p v-else class="home__voice-status">
          {{ transcript ? 'Heard: "' + transcript + '"' : 'Waiting for a voice command.' }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const recognitionSupported = ref(false)
const listening = ref(false)
const transcript = ref('')

let recognition: any = null

onMounted(() => {
  if (typeof window === 'undefined') return
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  if (!SpeechRecognition) return
  recognitionSupported.value = true
  recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.interimResults = true
  recognition.onstart = () => {
    listening.value = true
  }
  recognition.onend = () => {
    listening.value = false
  }
  recognition.onerror = () => {
    listening.value = false
  }
  recognition.onresult = (event: any) => {
    const text = Array.from(event.results)
      .map((result: any) => result[0]?.transcript ?? '')
      .join(' ')
      .trim()
    transcript.value = text
  }
})

onBeforeUnmount(() => {
  if (recognition && listening.value) {
    recognition.stop()
  }
})

function toggleListening() {
  if (!recognition) return
  if (listening.value) {
    recognition.stop()
  } else {
    transcript.value = ''
    recognition.start()
  }
}
</script>

<style scoped>
.home {
  flex: 1;
  padding: 4rem 1.5rem;
  background: transparent;
}
.home__content {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
  background: var(--color-cream-soft);
  border-radius: 22px;
  padding: 3.25rem 2.25rem;
  border: 1px solid rgba(31, 90, 43, 0.12);
  box-shadow: 0 12px 45px rgba(31, 90, 43, 0.07);
  backdrop-filter: blur(8px);
}
.home h1 {
  margin: 0 0 1rem;
  font-size: 2.4rem;
  color: #1f5a2b;
}
.home p {
  margin: 0 0 1.5rem;
  font-size: 1.05rem;
  color: #4a4a4a;
}
.home__cta {
  display: inline-block;
  background: rgba(31, 90, 43, 0.08);
  color: var(--color-green);
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: background 0.15s ease, transform 0.15s ease;
}
.home__cta:hover {
  transform: translateY(-1px);
  background: rgba(31, 90, 43, 0.16);
}
.home__voice {
  margin-top: 2.5rem;
  padding: 1.75rem;
  border-radius: 18px;
  border: 1px dashed rgba(31, 90, 43, 0.3);
  background: rgba(253, 247, 239, 0.9);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.home__voice h2 {
  margin: 0 0 0.35rem;
  font-size: 1.4rem;
  color: #1f5a2b;
}
.home__voice p {
  margin: 0;
  color: rgba(31, 42, 31, 0.75);
}
.home__voice-btn {
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  border: none;
  border-radius: 999px;
  padding: 0.75rem 1.75rem;
  background: linear-gradient(135deg, #2f7a3e, #6b4f32);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.home__voice-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
.home__voice-btn:not(:disabled):hover {
  transform: translateY(-1px);
}
.home__voice-status {
  font-size: 0.95rem;
  color: rgba(31, 42, 31, 0.8);
}
.home__voice-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.home__voice-indicator--active {
  background: #ff8a65;
  box-shadow: 0 0 0 6px rgba(255, 138, 101, 0.25);
}
@media (max-width: 600px) {
  .home__content {
    padding: 2rem 1.25rem;
  }
  .home h1 {
    font-size: 2rem;
  }
}
</style>
