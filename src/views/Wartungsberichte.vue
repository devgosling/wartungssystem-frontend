<template>
  <div class="wartungsberichte">
    <div class="wartungsberichte-header">
      <h1>Wartungsberichte</h1>
      <div class="wartungsberichte-header-btns">
        <Button icon="fa-regular fa-plus" label="Wartungsbericht" severity="contrast" />
        <Button icon="fa-regular fa-upload" label="Hochladen" severity="secondary" />
      </div>
    </div>
    <Card v-if="tab == 1 || tab == 2">
      <template #title>
        {{ tab == 1 ? 'Wartungsbericht erstellen' : 'Wartungsbericht hochladen' }}
      </template>
      <template #content>
        <Stepper v-if="tab == 1" value="1" linear>
          <StepItem value="1">
            <Step>Wartungsbericht Auswahl</Step>
            <StepPanel>
              <div class="wartungsberichte-create-panel">
                <!--<Button severity="secondary" label="Zurück" icon="fa-regular fa-arrow-left" />-->
                <div class="wartungsberichte-create-panel-grid">
                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Wartungsberichtsart</label>
                    <Select
                      id="wartungsbericht-slct"
                      placeholder="Keine Art ausgewählt"
                      :options="berichte"
                      class="wartungsberichte-create-panel-grid-slct-type"
                    >
                      <template #value="slotProps">
                        <div v-if="slotProps.value">
                          {{ slotProps.value.name }}
                        </div>
                        <div v-else>
                          {{ slotProps.placeholder }}
                        </div>
                      </template>
                      <template #option="slotProps">
                        <div
                          style="
                            width: 304px;
                            text-wrap: wrap;
                            word-wrap: normal;
                            display: grid;
                            grid-template-columns: 1.2rem auto;
                            gap: 0.5rem;
                            align-items: center;
                          "
                        >
                          <i
                            :class="'fa-regular fa-' + slotProps.option.icon"
                          />{{ slotProps.option.name }}
                        </div>
                      </template>
                      <template #header>
                        <div style="font-weight: 500; padding: 0.75rem">
                          Verfügbare Wartungsberichte
                        </div>
                      </template>
                    </Select>
                  </div>

                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Bearbeitender Mitarbeiter</label>
                    <Select
                      id="wartungsbericht-slct"
                      placeholder="Kein Mitarbeiter ausgewählt"
                      :options="mitarbeiter.sort()"
                      class="wartungsberichte-create-panel-grid-slct-type"
                    >
                      <template #value="slotProps">
                        <div v-if="slotProps.value">
                          {{ slotProps.value }}
                        </div>
                        <div v-else>
                          {{ slotProps.placeholder }}
                        </div>
                      </template>
                      <template #option="slotProps">
                        <div
                          style="
                            width: 304px;
                            text-wrap: wrap;
                            word-wrap: normal;
                            display: grid;
                            grid-template-columns: 1.2rem auto;
                            gap: 0.5rem;
                            align-items: center;
                          "
                        >
                          <i
                            :class="'fa-regular fa-' + slotProps.option.charAt(0).toLowerCase()"
                          />{{ slotProps.option }}
                        </div>
                      </template>
                      <template #header>
                        <div style="font-weight: 500; padding: 0.75rem">Verfügbare Mitarbeiter</div>
                      </template>
                    </Select>
                  </div>
                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Datum</label>
                    <!-- TODO: Nachfragen ob es das heutige Datum sein soll oder das Datum der Wartung -->
                    <DatePicker
                      id="wartungsbericht-slct"
                      v-model="icondisplay"
                      date-format="dd.mm.yy"
                      showIcon
                      fluid
                      iconDisplay="input"
                      showButtonBar
                    />
                  </div>
                  <InputText></InputText>
                  <InputText></InputText>
                  <InputText></InputText>
                  <InputText></InputText>
                </div>
                <Button
                  class="wartungsberichte-create-panel-btn"
                  severity="contrast"
                  label="Weiter"
                  icon="fa-regular fa-arrow-right"
                  size="small"
                  iconPos="right"
                />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="2">
            <Step>Wartungsbericht Ausfüllen</Step>
            <StepPanel>Hello World!</StepPanel>
          </StepItem>
          <StepItem value="3">
            <Step>Wartungsbericht Unterschreiben</Step>
            <StepPanel>Hello World!</StepPanel>
          </StepItem>
        </Stepper>
      </template>
    </Card>
    <DataTable v-else> </DataTable>
  </div>
</template>
<script>
import { account } from '@/lib/appwrite'
import {
  Toolbar,
  Button,
  DataTable,
  Card,
  StepPanels,
  Select,
  InputText,
  DatePicker,
} from 'primevue'
import StepPanel from 'primevue/steppanel'
import StepItem from 'primevue/stepitem'
import Stepper from 'primevue/stepper'
import Step from 'primevue/step'

export default {
  components: {
    Toolbar,
    Button,
    DataTable,
    Card,
    Stepper,
    StepItem,
    Step,
    StepPanel,
    StepPanels,
    Select,
    InputText,
    DatePicker,
  },

  data() {
    return {
      tab: 1, // 0 = DataView, 1 = Create, 2 = Upload
      berichte: [
        { name: 'Lüfter', id: 'lüfter', icon: 'fa-regular fa-fan' },
        { name: 'Motor', id: 'motor', icon: 'fa-regular fa-engine' },
        {
          name: 'Schmutzwasser-/Fäkalienhebeanlagen, Tauchmotorpumpenschmutzwasser',
          id: 'schmutzwasser',
          icon: 'fa-regular fa-manhole',
        },
        { name: 'Müllanlage', id: 'müllanlage', icon: 'fa-regular fa-trash' },
        { name: 'Pumpe', id: 'pumpe', icon: 'fa-regular fa-pump' },
        { name: 'Wärmetauscher', id: 'wärmetauscher', icon: 'fa-regular fa-heat' },
      ],
      mitarbeiter: [
        'Steven Kukla',
        'Steffen Volkmer',
        'Kevin Kromholz',
        'Lee Daniel Hertel',
        'Joshi Enrage',
        'Max Enrage',
        'Max Ziegelstein',
        'Taylor Ziegelstein',
        'Max Mustermann',
        'Lena Hoxjai',
        'Blauer Hai',
        'Mark Forster',
      ],
    }
  },

  methods: {
    logout() {
      account.deleteSession('current')
    },
  },
}
</script>
<style lang="scss">
.wartungsberichte {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-header {
    display: flex;
    justify-content: space-between;

    &-btns {
      display: flex;
      gap: 0.3rem;
    }
  }

  .p-step-title {
    font-size: 1rem;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
  }

  &-create-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
      gap: 1rem;

      &-inpt {
        display: flex;
        flex-direction: column;

        label {
          font-weight: 600;
          font-size: 1rem;
          padding-bottom: 0.3rem;
        }
      }

      &-slct-type {
        max-width: 1fr;
      }
    }

    &-btn {
      width: fit-content;
    }
  }
}
</style>
