<template>Hello World!</template>
<script>
import { account } from '@/lib/appwrite'

export default {
  components: {},

  methods: {
    logout() {
      account.deleteSession('current')
    },
  },
}
</script>
