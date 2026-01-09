import { getPendingJobs, removeJob } from './offlineQueue'
import { executeJob } from './executeJob'

export async function processJobs() {
  const jobs = await getPendingJobs()
  for (const job of jobs) {
    try {
      await executeJob(job)
      await removeJob(job.id)
    } catch (err) {
      console.error('Failed to process job', err)
      break // stop if network is unstable
    }
  }
}

// Listen for device going online
let listenerRegistered = false

export function setupOfflineJobProcessor() {
  if (listenerRegistered) return
  listenerRegistered = true
  window.addEventListener('online', processJobs)
}