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
            <StepPanel v-slot="{ activateCallback }">
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
                      v-model="inputValues.berichtType"
                    >
                      <template #value="slotProps">
                        <div
                          v-if="slotProps.value"
                          style="display: flex; align-items: center; gap: 0.4rem"
                        >
                          <i :class="'fa-regular fa-' + slotProps.value.icon" />{{
                            slotProps.value.name
                          }}
                        </div>
                        <div v-else>
                          {{ slotProps.placeholder }}
                        </div>
                      </template>
                      <template #option="slotProps">
                        <div
                          style="
                            width: 19rem;
                            text-wrap: wrap;
                            word-wrap: normal;
                            display: grid;
                            grid-template-columns: 1.2rem auto;
                            gap: 0.5rem;
                            align-items: center;
                          "
                        >
                          <i :class="'fa-regular fa-' + slotProps.option.icon" />{{
                            slotProps.option.name
                          }}
                        </div>
                      </template>
                      <template #header>
                        <div
                          style="font-weight: 500; padding: 0.75rem 1rem; padding-bottom: 0.25rem"
                        >
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
                      v-model="inputValues.employee"
                    >
                      <template #value="slotProps">
                        <div
                          v-if="slotProps.value"
                          style="display: flex; align-items: center; gap: 0.4rem"
                        >
                          <i :class="'fa-solid fa-user-tie'" />{{ slotProps.value }}
                        </div>
                        <div v-else>
                          {{ slotProps.placeholder }}
                        </div>
                      </template>
                      <template #option="slotProps">
                        <div
                          style="
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
                        <div
                          style="font-weight: 500; padding: 0.75rem 1rem; padding-bottom: 0.25rem"
                        >
                          Verfügbare Mitarbeiter
                        </div>
                      </template>
                    </Select>
                  </div>
                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Datum</label>
                    <!-- TODO: Nachfragen ob es das heutige Datum sein soll oder das Datum der Wartung -->
                    <DatePicker
                      id="wartungsbericht-slct"
                      date-format="dd.mm.yy"
                      showIcon
                      fluid
                      iconDisplay="input"
                      showButtonBar
                      v-model="inputValues.date"
                    />
                  </div>
                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Kunde</label>
                    <Select
                      id="wartungsbericht-slct"
                      placeholder="Kein Kunde Augewählt"
                      :options="kunden"
                      class="wartungsberichte-create-panel-grid-slct-type"
                      filter
                      optionLabel="name"
                      v-model="inputValues.customer"
                      showClear
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
                            text-wrap: wrap;
                            word-wrap: normal;
                            display: grid;
                            grid-template-columns: 0.9rem auto;
                            gap: 0.5rem;
                            align-items: center;
                          "
                        >
                          <i :class="'fa-solid fa-user-tie'" />{{ slotProps.option.name }}
                        </div>
                      </template>
                      <template #header>
                        <div
                          style="font-weight: 500; padding: 0.75rem 1rem; padding-bottom: 0.1rem"
                        >
                          Verfügbare Kunden
                        </div>
                      </template>
                      <template #footer>
                        <div style="padding: 0.75rem">
                          <Button
                            label="Kunde hinzufügen"
                            size="small"
                            fluid
                            severity="secondary"
                            text
                            icon="fa-solid fa-plus"
                          />
                        </div>
                      </template>
                    </Select>
                  </div>
                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Straße und Hausnummer</label>
                    <InputText
                      id="wartungsbericht-slct"
                      disabled
                      placeholder="Kein Kunde ausgewählt"
                      :value="inputValues.customer?.address?.street"
                    />
                  </div>
                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Postleitzahl</label>
                    <InputText
                      id="wartungsbericht-slct"
                      disabled
                      placeholder="Kein Kunde ausgewählt"
                      :value="inputValues.customer?.address?.zipcode"
                    />
                  </div>
                  <div class="wartungsberichte-create-panel-grid-inpt">
                    <label for="wartungsbericht-slct">Stadt</label>
                    <InputText
                      id="wartungsbericht-slct"
                      disabled
                      placeholder="Kein Kunde ausgewählt"
                      :value="inputValues.customer?.address?.city"
                    />
                  </div>
                </div>
                <Button
                  class="wartungsberichte-create-panel-btn"
                  severity="contrast"
                  label="Weiter"
                  icon="fa-regular fa-arrow-right"
                  size="small"
                  iconPos="right"
                  :disabled="
                    !(
                      inputValues.berichtType &&
                      inputValues.customer &&
                      inputValues.date &&
                      inputValues.employee
                    )
                  "
                  @click="activateCallback('2')"
                />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="2">
            <Step>Wartungsbericht Ausfüllen</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="wartungsberichte-fill-panel">
                <Button
                  class="wartungsberichte-fill-panel-btn"
                  severity="secondary"
                  label="Zurück"
                  icon="fa-regular fa-arrow-left"
                  size="small"
                  iconPos="left"
                  @click="activateCallback('1')"
                />
                <Motor_Filler ref="filler" v-if="inputValues.berichtType.id == 'motor'" />
                <h2 style="margin: 3rem 8rem; text-align: center" v-else>
                  Für diese Art von Wartungsbericht gibt es noch nichts zum ausfüllen... :(
                </h2>
                <Button
                  class="wartungsberichte-fill-panel-btn"
                  severity="contrast"
                  label="Weiter"
                  icon="fa-regular fa-arrow-right"
                  size="small"
                  iconPos="right"
                  :disabled="
                    !(
                      inputValues.berichtType &&
                      inputValues.customer &&
                      inputValues.date &&
                      inputValues.employee
                    )
                  "
                  @click="
                    function () {
                      activateCallback('3')
                      activateSignPad()
                    }
                  "
                />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="3">
            <Step>Wartungsbericht Unterschreiben</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="wartungsberichte-sign-panel">
                <Button
                  class="wartungsberichte-sign-panel-btn"
                  severity="secondary"
                  label="Zurück"
                  icon="fa-regular fa-arrow-left"
                  size="small"
                  iconPos="left"
                  @click="activateCallback('2')"
                />
                <div class="wartungsberichte-sign-panel-main">
                  <label for="signpad">Signatur hier Zeichnen</label>
                  <canvas id="signpad" class="wartungsberichte-sign-panel-signpad"></canvas>

                  <div class="wartungsberichte-sign-panel-main-btns">
                    <Button
                      rounded
                      :disabled="isSignpadEmpty"
                      size="small"
                      severity="danger"
                      icon="fa-regular fa-trash"
                      @click="
                        function () {
                          signpad.clear()
                          isSignpadEmpty = true
                        }
                      "
                    />
                    <Button
                      rounded
                      size="small"
                      severity="contrast"
                      icon="fa-regular fa-arrow-down-left-and-arrow-up-right-to-center"
                      @click="
                        function () {
                          if (signpad.minWidth <= 0.1) return
                          signpad.minWidth -= 0.1
                          signpad.maxWidth -= 0.5
                        }
                      "
                    />
                    <Button
                      rounded
                      size="small"
                      severity="contrast"
                      icon="fa-regular fa-arrow-up-right-and-arrow-down-left-from-center"
                      @click="
                        function () {
                          if (signpad.minWidth >= 1) return
                          signpad.minWidth += 0.1
                          signpad.maxWidth += 0.5
                        }
                      "
                    />
                    <Button
                      rounded
                      label="Bestätigen"
                      size="small"
                      severity="success"
                      icon="fa-regular fa-check"
                      :disabled="isSignpadEmpty"
                      @click="submit"
                    />
                  </div>
                </div>
                <!--<Button
                  class="wartungsberichte-sign-panel-btn"
                  severity="contrast"
                  label="Weiter"
                  icon="fa-regular fa-arrow-right"
                  size="small"
                  iconPos="right"
                  :disabled="
                    !(
                      inputValues.berichtType &&
                      inputValues.customer &&
                      inputValues.date &&
                      inputValues.employee
                    )
                  "
                  @click="activateCallback('3')"
                />-->
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="4">
            <Step>Wartungsbericht Speichern</Step>
            <StepPanel v-slot="{ activateCallback }"> </StepPanel>
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
import Motor_Filler from '@/components/Motor_Filler.vue'
import SignaturePad from 'signature_pad'
import { useInputStore } from '@/stores/inputStore'
import { fillMotorPDF } from '@/lib/pdf-lib'

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
    Motor_Filler,
  },

  data() {
    return {
      inputValues: {
        berichtType: '',
        employee: '',
        date: '',
        customer: null,
      },
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
        'Mark Rene Frank',
      ],
      kunden: [
        {
          name: 'Gate Gourmet GmbH',
          address: {
            street: 'Jean-Gardner-Batten-Str. 5',
            zipcode: '60549',
            city: 'Frankfurt am Main',
          },
        },
      ],
      /**
       * @returns SignaturePad
       */
      signpad: null,
      isSignpadEmpty: true,
    }
  },

  methods: {
    logout() {
      account.deleteSession('current')
    },
    activateSignPad() {
      let canvas = document.getElementById('signpad')
      canvas.setAttribute('width', getComputedStyle(canvas).width.replace('px', ''))
      canvas.setAttribute('height', getComputedStyle(canvas).height.replace('px', ''))
      this.signpad = new SignaturePad(canvas)

      this.signpad.addEventListener('beginStroke', () => {
        this.isSignpadEmpty = !this.signpad.isEmpty
      })
    },
    submit() {
      let signature = this.signpad.toDataURL()
      this.$refs.filler.broadcastInputsToStore()
      console.log(signature)

      switch (this.inputValues.berichtType.id) {
        case 'motor':
          fillMotorPDF(this.inputValues, signature)
          break

        default:
          break
      }
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

  &-fill-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-btn {
      width: fit-content;
    }
  }

  &-sign-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-main {
      display: flex;
      flex-direction: column;

      &-btns {
        margin-top: 0.5rem;
        display: flex;
        gap: 0.3rem;
      }
    }

    &-btn {
      width: fit-content;
    }

    label {
      font-weight: 600;
      font-size: 1rem;
      padding-bottom: 0.3rem;
    }

    &-signpad {
      width: 30rem;
      height: 7.5rem;
      border-radius: 0.5rem;
      border: 1px solid var(--p-surface-300);
    }
  }
}
</style>
