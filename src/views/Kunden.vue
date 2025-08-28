<template>
  <div class="customers">
    <div class="customers-header">
      <h1>Kundenverwaltung</h1>
      <div>
        <Button
          icon="fa-regular fa-plus"
          @click="openDialog = true"
          label="Neuen Kunde anlegen"
          severity="contrast"
        />
      </div>
    </div>
    <Card>
      <template #content>
        <DataTable v-model:filters="filters" :value="customers?.documents" :loading="!customers">
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <h4 style="margin: 0">{{ customers?.total }} Kunden</h4>
              <IconField>
                <InputIcon>
                  <i class="fa-regular fa-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" placeholder="Suchen..." />
              </IconField>
            </div>
          </template>
          <Column field="" header="#">
            <template #body="slotProps">
              {{ slotProps.data.$sequence }}
            </template>
          </Column>
          <Column field="name" header="Name"> </Column>
          <Column field="email" header="Buchaltungs Email-Addresse"> </Column>
          <Column field="wartungsberichte" header="Wartungen">
            <template #body="slotProps">
              {{
                slotProps.data.wartungsberichte +
                ' Bericht' +
                (slotProps.data.wartungsberichte > 1
                  ? 'e'
                  : slotProps.data.wartungsberichte == 0
                    ? 'e'
                    : '')
              }}
            </template>
          </Column>
          <Column field="" header="Aktionen">
            <template #body="slotProps">
              <div style="display: flex; gap: 0.2rem">
                <Button
                  icon="fa-regular fa-eye"
                  @click=""
                  severity="info"
                  size="small"
                ></Button
                ><Button
                  icon="fa-regular fa-trash"
                  :loading="deletingCustomer == slotProps.index"
                  @click="deleteCustomer($event, slotProps.data, slotProps.index)"
                  severity="danger"
                  label="Löschen"
                  size="small"
                ></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <CreateCustomerDialog
    :open="openDialog"
    @close="openDialog = false"
    @createdcustomer="retrieveCustomers"
  ></CreateCustomerDialog>
</template>
<script>
import CreateCustomerDialog from '@/components/CreateCustomerDialog.vue'
import { databases } from '@/lib/appwrite'
import { FilterMatchMode } from '@primevue/core'
import { AppwriteException, ID, Query } from 'appwrite'
import { Button, Card, Column, DataTable, Dialog, IconField, InputIcon, InputText } from 'primevue'

export default {
  components: {
    Button,
    Card,
    DataTable,
    IconField,
    InputIcon,
    InputText,
    Column,
    Dialog,
    CreateCustomerDialog,
  },

  data() {
    return {
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      customers: null,
      openDialog: false,
      creatingUser: false,
      dialogValues: {
        firstname: null,
        lastname: null,
      },

      deletingCustomer: -1,
    }
  },

  methods: {
    async deleteCustomer(event, data, customerIndex) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Bist du dir sicher, dass du diesen Kunden löschen willst?',
        icon: 'fa-regular fa-exclamation-triangle',
        rejectProps: {
          label: 'Abbrechen',
          severity: 'secondary',
          outlined: true,
        },
        acceptProps: {
          label: 'Löschen',
          severity: 'danger',
        },
        accept: async () => {
          this.deletingCustomer = customerIndex

          try {
            await databases.deleteDocument('6878f5900032addce7e5', '68866dbd002a081f337a', data.$id)
          } catch (err) {
            if (err instanceof AppwriteException) {
              switch (err.code) {
                case 404:
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Kunde nicht gefunden',
                    detail: 'Der Kunde wurde nicht gefunden',
                    life: 5000,
                  })
                  break
                case 401:
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Keine Berechtigungen',
                    detail:
                      'Du bist nicht dazu berichtigt Kunden zu löschen, bist du auf dem richtigen Konto angemeldet?',
                    life: 5000,
                  })
                  break
                default:
                  break
              }
            }
            this.deletingCustomer = -1
            return
          }

          this.$toast.add({
            severity: 'success',
            summary: 'Kunde gelöscht',
            detail: 'Kunde ' + data.name + ' wurde erfolgreich gelöscht.',
            life: 5000,
          })

          this.retrieveCustomers()

          this.deletingBericht = null
        },
      })
    },
    async createUser() {
      this.creatingUser = true
      let firstname =
        this.dialogValues.firstname.toUpperCase().slice(0, 1) +
        this.dialogValues.firstname.toLowerCase().slice(1)
      let lastname =
        this.dialogValues.lastname.toUpperCase().slice(0, 1) +
        this.dialogValues.lastname.toLowerCase().slice(1)
      let combinedName = `${firstname} ${lastname}`

      let employeeTable = await this.getEmployeeTable()
      if (employeeTable.indexOf(combinedName) !== -1) {
        this.$toast.add({
          severity: 'error',
          summary: 'Mitarbeiter gibt es bereits',
          detail: 'Es gibt bereits einen Mitarbeiter mit diesem Namen',
          life: 5000,
        })
        this.creatingUser = false
        return
      }
      await databases.createDocument('6878f5900032addce7e5', '68866db100220a383390', ID.unique(), {
        name: combinedName,
      })

      this.$toast.add({
        severity: 'success',
        summary: 'Mitarbeiter erstellt',
        detail: 'Mitarbeiter ' + combinedName + ' wurde erfolgreich erstellt.',
        life: 5000,
      })

      this.openDialog = false

      this.retrieveMitarbeiter()
      this.creatingUser = false
    },
    async getEmployeeTable() {
      const mitarbeiterList = await databases.listDocuments(
        '6878f5900032addce7e5',
        '68866db100220a383390',
        [Query.orderAsc('$sequence')],
      )
      var table = []

      mitarbeiterList.documents.forEach((doc) => {
        table.push(doc.name)
      })

      return table
    },
    async retrieveCustomers() {
      try {
        const customerList = await databases.listDocuments(
          '6878f5900032addce7e5',
          '68866dbd002a081f337a',
          [Query.orderAsc('$sequence')],
        )

        const wartungsberichteList = await databases.listDocuments(
          '6878f5900032addce7e5',
          '68866dc60038038dbe27',
          [Query.orderDesc('erstellungsdatum')],
        )
        let berichtCountRegistry = {}

        wartungsberichteList.documents.forEach((doc) => {
          var kundeJSON = JSON.parse(doc.kunde)
          if (berichtCountRegistry[kundeJSON.name]) {
            berichtCountRegistry[kundeJSON.name] += 1
          } else {
            berichtCountRegistry[kundeJSON.name] = 1
          }
        })

        customerList.documents.forEach((doc) => {
          if (berichtCountRegistry[doc.name]) {
            doc.wartungsberichte = berichtCountRegistry[doc.name]
          } else {
            doc.wartungsberichte = 0
          }
        })

        this.customers = customerList
      } catch (error) {
        if (error instanceof AppwriteException) {
          if (error.code == 401) {
            this.permission = false
          }
        }
      }
    },
  },

  mounted() {
    this.retrieveCustomers()
  },
}
</script>
<style lang="scss">
.customers {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
