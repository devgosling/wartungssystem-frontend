<template>
  <div class="mitarbeiter">
    <div class="mitarbeiter-header">
      <h1>Mitarbeiterverwaltung</h1>
      <div>
        <Button
          icon="fa-regular fa-plus"
          @click="openDialog = true"
          label="Mitarbeiter"
          severity="contrast"
          :disabled="!permission"
        />
      </div>
    </div>
    <Card>
      <template #content>
        <DataTable
          v-if="permission"
          v-model:filters="filters"
          :value="mitarbeiter?.documents"
          :loading="!mitarbeiter"
        >
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <h4 style="margin: 0">{{ mitarbeiter?.total }} Mitarbeiter</h4>
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
          <Column field="" header="Erstellungsdatum">
            <template #body="slotProps">
              {{ new Date(slotProps.data.$createdAt).toLocaleString('de-DE') }}
            </template>
          </Column>
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
              <Button
                icon="fa-regular fa-trash"
                :loading="deletingEmployee == slotProps.index"
                @click="deleteEmployee($event, slotProps.data, slotProps.index)"
                severity="danger"
                label="Löschen"
                size="small"
              ></Button>
            </template>
          </Column>
        </DataTable>
        <div
          style="height: 6rem; display: flex; justify-content: center; align-items: center"
          v-else
        >
          <h2>Du hast keine Berechtigungen Mitarbeiter einzusehen</h2>
        </div>
      </template>
    </Card>
  </div>
  <Dialog
    v-model:visible="openDialog"
    modal
    header="Neuen Mitarbeiter erstellen"
    :style="{ width: '25rem' }"
  >
    <p class="mitarbeiter-dialog-desc">Erstelle einen neuen Mitarbeiter</p>
    <div class="mitarbeiter-dialog-inputgroup">
      <label for="firstname">Vorname</label>
      <InputText v-model="dialogValues.firstname" id="firstname"></InputText>
    </div>
    <div class="mitarbeiter-dialog-inputgroup">
      <label for="lastname">Nachname</label>
      <InputText v-model="dialogValues.lastname" id="lastname"></InputText>
    </div>
    <div class="mitarbeiter-dialog-btns">
      <Button
        severity="secondary"
        size="medium"
        @click="openDialog = false"
        label="Abbrechen"
      ></Button>
      <Button
        severity="contrast"
        size="medium"
        :disabled="!(dialogValues.firstname && dialogValues.lastname)"
        label="Erstellen"
        :loading="creatingUser"
        @click="createUser"
      ></Button>
    </div>
  </Dialog>
</template>
<script>
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
  },

  data() {
    return {
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      permission: true,
      mitarbeiter: null,
      openDialog: false,
      creatingUser: false,
      dialogValues: {
        firstname: null,
        lastname: null,
      },

      deletingEmployee: -1,
    }
  },

  methods: {
    async deleteEmployee(event, data, employeeIndex) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Bist du dir sicher, dass du diesen Mitarbeiter löschen willst?',
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
          this.deletingEmployee = employeeIndex

          try {
            await databases.deleteDocument('6878f5900032addce7e5', '68866db100220a383390', data.$id)
          } catch (err) {
            if (err instanceof AppwriteException) {
              switch (err.code) {
                case 404:
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Mitarbeiter nicht gefunden',
                    detail: 'Der Mitarbeiter wurde nicht gefunden',
                    life: 5000,
                  })
                  break
                case 401:
                  this.$toast.add({
                    severity: 'error',
                    summary: 'Keine Berechtigungen',
                    detail:
                      'Du bist nicht dazu berichtigt Mitarbeiter zu löschen, bist du auf dem richtigen Konto angemeldet?',
                    life: 5000,
                  })
                  break
                default:
                  break
              }
            }
            this.deletingEmployee = -1
            return
          }

          this.$toast.add({
            severity: 'success',
            summary: 'Mitarbeiter gelöscht',
            detail: 'Mitarbeiter ' + data.name + ' wurde erfolgreich gelöscht.',
            life: 5000,
          })

          this.retrieveMitarbeiter()

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
    async retrieveMitarbeiter() {
      try {
        const mitarbeiterList = await databases.listDocuments(
          '6878f5900032addce7e5',
          '68866db100220a383390',
          [Query.orderAsc('$sequence')],
        )

        const wartungsberichteList = await databases.listDocuments(
          '6878f5900032addce7e5',
          '68866dc60038038dbe27',
          [Query.orderDesc('erstellungsdatum')],
        )
        let berichtCountRegistry = {}

        wartungsberichteList.documents.forEach((doc) => {
          if (berichtCountRegistry[doc.mitarbeiter]) {
            berichtCountRegistry[doc.mitarbeiter] += 1
          } else {
            berichtCountRegistry[doc.mitarbeiter] = 1
          }
        })

        mitarbeiterList.documents.forEach((doc) => {
          if (berichtCountRegistry[doc.name]) {
            doc.wartungsberichte = berichtCountRegistry[doc.name]
          } else {
            doc.wartungsberichte = 0
          }
        })

        this.mitarbeiter = mitarbeiterList
        console.log(mitarbeiterList)
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
    this.retrieveMitarbeiter()
  },
}
</script>
<style lang="scss">
.mitarbeiter {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-header {
    display: flex;
    justify-content: space-between;
  }

  &-dialog {
    &-desc {
      margin-top: 0;
      color: var(--p-surface-500);
    }
    &-inputgroup {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.3rem;

      label {
        font-weight: 600;
      }
    }
    &-btns {
      display: flex;
      gap: 0.5rem;
      justify-content: end;
      margin-top: 0.6rem;
    }
  }
}
</style>
