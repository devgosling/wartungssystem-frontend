import { account } from "./appwrite"

/**
 * Checks if there is an active session
 * @returns bool
 */
export const isUserLoggedIn = async () => {
  try {
    await account.get()
    return true
  } catch (e) {
    return false
  }
}
