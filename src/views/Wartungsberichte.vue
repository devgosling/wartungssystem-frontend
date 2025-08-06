<template>
  <div class="wartungsberichte">
    <div class="wartungsberichte-header">
      <h1>Wartungsberichte</h1>
      <div class="wartungsberichte-header-btns">
        <Button
          icon="fa-regular fa-plus"
          @click="
            function () {
              if (tabCooldown < Date.now()) {
                tab = 1
                setTabtext()
                tabCooldown = Date.now() + 400
              }
            }
          "
          label="Wartungsbericht"
          severity="contrast"
        />
        <Button
          icon="fa-regular fa-upload"
          label="Hochladen"
          severity="secondary"
          @click="
            function () {
              if (tabCooldown < Date.now()) {
                tab = 2
                setTabtext()
                tabCooldown = Date.now() + 400
              }
            }
          "
        />
      </div>
    </div>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <Card v-if="tab == 1 || tab == 2" class="wartungsberichte-uppercard">
        <template #title>
          {{ tabtext }}
        </template>
        <template #content>
          <div
            id="wartungsberichte-uppercard-container"
            style="overflow-x: hidden; position: relative"
          >
            <transition
              @before-enter="beforeEnterCard"
              @enter="enterCard"
              @leave="leaveCard"
              @before-leave="beforeLeaveCard"
            >
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
                                style="
                                  font-weight: 500;
                                  padding: 0.75rem 1rem;
                                  padding-bottom: 0.25rem;
                                "
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
                                  :class="
                                    'fa-regular fa-' + slotProps.option.charAt(0).toLowerCase()
                                  "
                                />{{ slotProps.option }}
                              </div>
                            </template>
                            <template #header>
                              <div
                                style="
                                  font-weight: 500;
                                  padding: 0.75rem 1rem;
                                  padding-bottom: 0.25rem;
                                "
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
                                style="
                                  font-weight: 500;
                                  padding: 0.75rem 1rem;
                                  padding-bottom: 0.1rem;
                                "
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
                  <StepPanel v-slot="{ activateCallback }" id="step3">
                    <div class="wartungsberichte-sign-panel">
                      <Button
                        class="wartungsberichte-sign-panel-btn"
                        severity="secondary"
                        label="Zurück"
                        icon="fa-regular fa-arrow-left"
                        size="small"
                        iconPos="left"
                        @click="activateCallback('2')"
                        :disabled="generatingPDF"
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
                            @click="submit(activateCallback)"
                            :loading="generatingPDF"
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
                  <StepPanel v-slot="{ activateCallback }">
                    <div class="wartungsberichte-finish-panel">
                      <Button
                        class="wartungsberichte-finish-panel-btn"
                        severity="secondary"
                        label="Zurück"
                        icon="fa-regular fa-arrow-left"
                        size="small"
                        iconPos="left"
                        @click="activateCallback('3')"
                        :disabled="isSending"
                      />
                      <div class="wartungsberichte-finish-panel-preview">
                        <div class="wartungsberichte-finish-panel-preview-board">
                          <h3>🎉 Der Wartungsbericht ist fertig!</h3>
                          <p>
                            Überprüfe gegebenfalls nocheinmal alle eingaben und speichere den
                            Wartungsbericht.
                          </p>
                          <Divider />
                          <div>
                            <Button
                              icon="fa-regular fa-eyes"
                              :disabled="isSending"
                              label="Eingaben überprüfen"
                              severity="contrast"
                              @click="activateCallback('2')"
                            ></Button>
                            <Button
                              icon="fa-regular fa-paper-plane"
                              :loading="isSending"
                              label="Speichen und versenden"
                              severity="success"
                              @click="saveAndSend()"
                            ></Button>
                          </div>
                        </div>
                        <img :src="pdfImg" alt="" />
                      </div>
                    </div>
                  </StepPanel>
                </StepItem>
              </Stepper>
            </transition>
            <transition
              @before-enter="beforeEnterCard"
              @enter="enterCard"
              @leave="leaveCard"
              @before-leave="beforeLeaveCard"
            >
              <div
                v-if="tab == 2"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-align: center;
                  height: 10rem;
                  width: 100%;
                "
              >
                <h1>Hello World!</h1>
              </div>
            </transition>
          </div>
        </template>
      </Card>
    </transition>
    <Card>
      <template #content>
        <DataTable
          v-model:filters="filters"
          :value="wartungsberichte?.documents"
          :loading="!wartungsberichte"
          :globalFilterFields="['erstellungsdatum', 'mitarbeiter', 'kunde.name']"
        >
          <template #header>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <h4 style="margin: 0">{{ wartungsberichte?.total }} Wartungsberichte</h4>
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
              {{ slotProps.index + 1 }}
            </template>
          </Column>
          <Column field="erstellungsdatum" header="Erstellungsdatum"> </Column>
          <Column field="mitarbeiter" header="Mitarbeiter"></Column>
          <Column field="kunde" header="Kunde">
            <template #body="slotProps">
              {{ slotProps.data.kunde.name }}
            </template>
          </Column>
          <Column field="actions" header="Aktionen">
            <template #body="slotProps">
              <div style="display: flex; gap: 0.2rem">
                <Button
                  icon="fa-regular fa-eye"
                  severity="info"
                  @click="viewBericht(slotProps.data, slotProps.index)"
                  size="small"
                  :loading="viewingBericht.loading == slotProps.index"
                ></Button>
                <Button icon="fa-regular fa-download" severity="contrast" size="small"></Button>
                <Button icon="fa-regular fa-trash" severity="danger" size="small"></Button>
              </div>
            </template>
          </Column>
        </DataTable>
      </template>
    </Card>
  </div>
  <Dialog maximizable v-model:visible="viewingBericht.open" style="width: min(50vw, 800px)">
    <template #header>
      <div><i class="fa-regular fa-file-pdf"></i> {{ viewingBericht.name }}</div>
    </template>
    <img :src="viewingBericht.img" alt="" style="width: 100%" />
  </Dialog>
  <canvas id="pdfCanvas" hidden></canvas>
</template>
<script>
import { ID, account, client, databases, functions, storage } from '@/lib/appwrite'
import {
  Toolbar,
  Button,
  DataTable,
  Card,
  StepPanels,
  Select,
  InputText,
  DatePicker,
  Splitter,
  SplitterPanel,
  Divider,
  Column,
  IconField,
  InputIcon,
  Dialog,
} from 'primevue'
import StepPanel from 'primevue/steppanel'
import StepItem from 'primevue/stepitem'
import Stepper from 'primevue/stepper'
import Step from 'primevue/step'
import Motor_Filler from '@/components/Motor_Filler.vue'
import SignaturePad from 'signature_pad'
import { fillMotorPDF } from '@/lib/pdf-lib'
import * as pdfjsLib from 'pdfjs-dist'
import axios from 'axios'
import { useInputStore } from '@/stores/inputStore'
import ConfettiExplosion from 'vue-confetti-explosion'
import { Query } from 'appwrite'
import { FilterMatchMode } from '@primevue/core'

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
    Splitter,
    SplitterPanel,
    Divider,
    ConfettiExplosion,
    Column,
    IconField,
    InputIcon,
    Dialog,
  },

  data() {
    return {
      wartungsberichte: null,
      filters: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },

      inputValues: {
        berichtType: '',
        employee: '',
        date: '',
        customer: null,
      },
      tabCooldown: -1,
      tab: 0, // 0 = Nothing, 1 = Create, 2 = Upload
      tabtext: '',
      berichte: [
        { name: 'Lüfter', id: 'lüfter', icon: 'fa-regular fa-fan', filekey: 'Lüfter' },
        { name: 'Motor', id: 'motor', icon: 'fa-regular fa-engine', filekey: 'Motor' },
        {
          name: 'Schmutzwasser-/Fäkalienhebeanlagen, Tauchmotorpumpenschmutzwasser',
          id: 'schmutzwasser',
          icon: 'fa-regular fa-manhole',
          filekey: 'Schmutzwasser',
        },
        {
          name: 'Müllanlage',
          id: 'müllanlage',
          icon: 'fa-regular fa-trash',
          filekey: 'Müllanlage',
        },
        { name: 'Pumpe', id: 'pumpe', icon: 'fa-regular fa-pump', filekey: 'Pumpe' },
        {
          name: 'Wärmetauscher',
          id: 'wärmetauscher',
          icon: 'fa-regular fa-heat',
          filekey: 'Wärmetauscher',
        },
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
      signature: null,
      isSignpadEmpty: true,
      generatingPDF: false,

      pdfBytes: null,
      pdfImg: null,
      isSending: false,

      viewingBericht: {
        data: null,
        name: null,
        img: null,
        open: false,
        loading: null,
      },
    }
  },

  async mounted() {
    const documentList = await databases.listDocuments(
      '6878f5900032addce7e5',
      '68866dc60038038dbe27',
      [Query.orderDesc('erstellungsdatum')],
    )
    documentList.documents.forEach(function (doc, index, theArray) {
      doc.kunde = JSON.parse(doc.kunde)
      doc.erstellungsdatum = new Date(doc.erstellungsdatum).toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        minute: '2-digit',
        hour: '2-digit',
      })
    })

    this.wartungsberichte = documentList
  },

  methods: {
    // #region Fadein & -out animations
    async setTabtext() {
      let tabTexts = {
        1: 'Wartungsbericht erstellen',
        2: 'Wartungsbericht hochladen',
      }
      if (this.tabtext == '') {
        this.tabtext = this.tab == 1 ? tabTexts['1'] : tabTexts['2']
        return
      } else if (
        (this.tab == 1 && this.tabtext == tabTexts['1']) ||
        (this.tab == 2 && this.tabtext == tabTexts['2'])
      )
        return

      // Remove chars after "Wartungsbericht"
      let text = this.tabtext
      await new Promise((resolve, reject) => {
        let removerInterval = setInterval(() => {
          text = text.substring(0, text.length - 1)
          this.tabtext = text
          if (text == 'Wartungsbericht ') {
            resolve()
            clearInterval(removerInterval)
          }
        }, 15) // 15ms
      })

      let lettersToAdd = this.tab == 1 ? 'erstellen' : 'hochladen'
      let letterString = lettersToAdd.split('')

      letterString.forEach(async (ltr, index) => {
        setTimeout(
          () => {
            text += ltr
            this.tabtext = text
          },
          (index + 1) * 15,
        )
      })
    },
    modifyCardHeight(height) {
      let cardContainer = document.getElementById('wartungsberichte-uppercard-container')
      cardContainer.style.overflowY = 'hidden'
      cardContainer.style.transition = 'height 0.4s ease-out'
      requestAnimationFrame(() => {
        cardContainer.style.height = height + 'px'
      })
    },
    beforeLeaveCard(el) {
      el.style.position = 'absolute'
      el.style.width = '100%'
      el.style.top = '0'
      el.style.left = '0'

      let cardContainer = document.getElementById('wartungsberichte-uppercard-container')
      cardContainer.style.height = el.scrollHeight + 'px'
    },
    leaveCard(el) {
      el.style.transition = 'transform 0.4s ease'
      requestAnimationFrame(() => {
        el.style.transform = 'translateX(100%)'
      })

      let cardContainer = document.getElementById('wartungsberichte-uppercard-container')
      cardContainer.style.overflowY = ''
      setTimeout(() => {
        cardContainer.style.height = ''
      }, 400)
    },
    beforeEnterCard(el) {
      el.style.transform = 'translateX(-100%)'
    },
    enterCard(el) {
      el.style.transition = 'transform 0.4s ease'
      this.modifyCardHeight(el.scrollHeight)
      requestAnimationFrame(() => {
        el.style.transform = 'translateX(0%)'
      })
    },
    beforeEnter(el) {
      el.style.height = '0'
      el.style.opacity = '0'
      el.style.overflow = 'hidden'
    },
    enter(el) {
      const height = el.scrollHeight + 'px'
      el.style.transition = 'height 0.4s ease, opacity 0.4s ease'
      requestAnimationFrame(() => {
        el.style.height = height
        el.style.opacity = '1'
      })
    },
    afterEnter(el) {
      el.style.height = 'auto'
      el.style.overflow = ''
    },
    // #endregion

    async viewBericht(data, berichtIndex) {
      this.viewingBericht.loading = berichtIndex
      let fileDownload = await storage.getFileDownload(
        '6878f5cf00166fde91eb',
        data.wartungsberichtid,
      )
      let fileData = await storage.getFile('6878f5cf00166fde91eb', data.wartungsberichtid)
      let jwtObject = await account.createJWT()
      let fileResponse = await fetch(fileDownload, { headers: { 'x-appwrite-jwt': jwtObject.jwt } })
      let blob = await fileResponse.blob()
      let buffer = await blob.arrayBuffer()
      let fileBytes = new Uint8Array(buffer)

      this.viewingBericht.name = fileData.name
      this.viewingBericht.data = data
      this.viewingBericht.img = await this.turnPDFToPNG(fileBytes)
      this.viewingBericht.open = true
      this.viewingBericht.loading = null
    },
    logout() {
      account.deleteSession('current')
    },
    activateSignPad() {
      if (this.signature) {
        this.signpad.fromDataURL(this.signature)
        return
      }
      if (this.signpad) return

      let canvas = document.getElementById('signpad')
      canvas.setAttribute('width', getComputedStyle(canvas).width.replace('px', ''))
      canvas.setAttribute('height', getComputedStyle(canvas).height.replace('px', ''))
      this.signpad = new SignaturePad(canvas)

      this.signpad.addEventListener('beginStroke', () => {
        this.isSignpadEmpty = !this.signpad.isEmpty
        this.signature = this.signpad.toDataURL()
      })
    },
    async submit(stepCallback) {
      this.generatingPDF = true
      let signature = this.signpad.toDataURL()
      let pdf
      this.$refs.filler.broadcastInputsToStore()
      console.log(signature)

      switch (this.inputValues.berichtType.id) {
        case 'motor':
          pdf = await fillMotorPDF(this.inputValues, signature)
          console.log(pdf[0])
          break

        default:
          break
      }

      this.pdfImg = await this.turnPDFToPNG(pdf[0])
      this.pdfBytes = pdf

      stepCallback('4')
      this.generatingPDF = false
    },
    async turnPDFToPNG(pdfBuffer) {
      let pdf = await pdfjsLib.getDocument(pdfBuffer).promise
      let page = await pdf.getPage(1)
      let canvas = document.getElementById('pdfCanvas')

      const viewport = page.getViewport({ scale: 3.0 })
      const height = viewport.height
      const width = viewport.width
      canvas.height = height
      canvas.width = width

      const renderContext = {
        canvasContext: canvas.getContext('2d'),
        viewport: viewport,
      }

      await page.render(renderContext).promise
      return canvas.toDataURL('image/png')
    },
    async saveAndSend() {
      this.isSending = true

      /*var formData = new FormData()
      formData.append('application/pdf', this.pdfBytes[1])
      formData.append('')
      axios({
        method: "POST",
        url: "https://68855ff60023522aa71d.fra.appwrite.run/v1/functions/68855ff6001c1613dade/executions",
        
        data: {
          async: true,
          method: "POST",

        },
      })*/
      let url = await fetch('data:application/pdf;base64,' + this.pdfBytes[1])
      let blob = await url.blob()
      const fileID = ID.unique()
      let file = new File(
        [blob],
        `Wartungsbericht_${this.inputValues.berichtType.filekey}_${new Date(this.inputValues.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}_${this.inputValues.employee.replaceAll(' ', '_')}.pdf`,
        { type: 'application/pdf' },
      )
      await storage.createFile('6878f5cf00166fde91eb', fileID, file)
      await databases.createDocument('6878f5900032addce7e5', '68866dc60038038dbe27', ID.unique(), {
        mitarbeiter: this.inputValues.employee,
        erstellungsdatum: new Date(),
        kunde: JSON.stringify(this.inputValues.customer),
        wartungsberichtid: fileID,
      })

      this.isSending = false
    },
  },
}
</script>
<style lang="scss">
.wartungsberichte {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &-uppercard {
    overflow-x: hidden;
  }

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

  &-finish-panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &-preview {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.3rem;

      &-board {
        display: flex;
        flex-direction: column;

        div {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        p {
          margin-bottom: 0;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 0;
        }
      }

      img {
        justify-self: end;
        width: 100%;
        max-width: 40rem;
        border-radius: 0.5rem;
        border: 1px solid var(--p-surface-300);
      }
    }

    &-btn {
      width: fit-content;
    }

    &-iframe {
      height: 800rem;
    }
  }
}
</style>
