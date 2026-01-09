import { getPendingJobs, removeJob, executeJob } from './offlineQueue'

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
export function setupOfflineJobProcessor() {
  window.addEventListener('online', processJobs)
}