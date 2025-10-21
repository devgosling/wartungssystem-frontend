<template>
  <h1>Dashboard</h1>
  <div class="dashboard">
    <div class="dashboard-cards">
      <Card class="dashboard-cards-card" v-for="item in dashboardItems" @click="router.push({path: item.redirectTo})" v-ripple>
        <template #content>
          <div class="dashboard-cards-card-content">
            <div>
              <span>{{ item.label }}</span>
              <span>{{ values[item.value].val.toFixed() }}</span>
            </div>
            <span :style="{ backgroundColor: item.color }">
              <i :class="item.icon"></i>
            </span>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
<script>
import { account, databases } from '@/lib/appwrite'
import { Card } from 'primevue'
import gsap from 'gsap'
import router from '@/router';

export default {
  components: {
    Card,
  },

  data() {
    return {
      router: router,
      values: {
        wartungsberichte: { val: 0 },
        mitarbeiter: { val: 0 },
        customers: { val: 0 },
      },
      dashboardItems: [
        {
          label: 'Wartungsberichte',
          icon: 'fa-regular fa-file',
          color: 'rgb(96, 165, 250)',
          value: 'wartungsberichte',
          table: '68866dc60038038dbe27',
          redirectTo: '/wartungsberichte',
        },
        {
          label: 'Mitarbeiter',
          icon: 'fa-regular fa-user',
          color: 'rgb(192, 132, 252)',
          value: 'mitarbeiter',
          table: '68866db100220a383390',
          redirectTo: '/employees',
        },
        {
          label: 'Eingetragene Kunden',
          icon: 'fa-solid fa-user-tie',
          color: 'rgb(251, 191, 36)',
          value: 'customers',
          table: '68866dbd002a081f337a',
          redirectTo: '/customers',
        },
      ],
    }
  },

  async mounted() {
    const counts = await Promise.all(
      this.dashboardItems.map((item) => this.getEntryCount(item.table)),
    )

    this.dashboardItems.forEach((item, i) => {
      const count = counts[i]
      gsap.to(this.values[item.value], {
        val: count,
        duration: 1.5,
        ease: 'power2.out',
      })
    })
  },

  methods: {
    async getEntryCount(tableID) {
      try {
        const customerList = await databases.listDocuments('6878f5900032addce7e5', tableID)

        return customerList.total
      } catch (error) {
        this.$toast.add({
          severity: 'error',
          summary: 'Es ist ein Fehler beim Laden aufgetreten aufgetreten',
          life: 5000,
        })
        throw error
      }
    },
  },
}
</script>
<style lang="scss">
.dashboard {
  margin-top: 1rem;

  &-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    &-card {
      flex: 1 1 0%;
      border-width: 1px;
      border-color: var(--p-content-border-color);
      border-style: solid;

      cursor: pointer;

      &-content {
        display: flex;
        justify-content: space-between;
        gap: 2rem;

        > :first-child {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;

          :first-child {
            color: var(--p-surface-500);
            font-weight: 500;
            font-size: 0.875rem;
          }

          :last-child {
            font-weight: 600;
            font-size: 1.125rem;
          }
        }

        > :last-child {
          color: white;
          width: 2rem;
          height: 2rem;
          border-radius: 9999px;
          display: inline-flex;
          text-align: center;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>
