<template>
  <div class="wb_muell">
    <h2 class="wb_muell-header">Wartungsbericht — Müllanlage</h2>
    <h3 class="wb_muell-subheader">Allgemeines</h3>
    <div class="wb_muell-multinputs">
      <div v-for="(input, index) in inputs[0]" :key="index" class="wb_muell-multinputs-inpt">
        <label>{{ input.label }}</label>
        <InputText v-model="inputValues[input.id]"></InputText>
      </div>
    </div>
    <Divider />
    <div class="wb_muell-multidata">
      <div class="wb_muell-multidata-data">
        <span style="align-self: center"><b>Kontrollgang</b></span>
        <div class="wb_muell-multidata-data-control">
          <div class="wb_muell-multidata-data-control-field">
            <label for="">KW</label>
            <InputNumber
              class="wb_muell-multidata-data-control-field-kw"
              :useGrouping="false"
              size="small"
              v-model="inputValues['kontrollgang.kw']"
            ></InputNumber>
          </div>
          <div class="wb_muell-multidata-data-control-field">
            <label for="">Jahr</label>
            <InputNumber
              class="wb_muell-multidata-data-control-field-year"
              :useGrouping="false"
              size="small"
              v-model="inputValues['kontrollgang.jahr']"
            ></InputNumber>
          </div>
        </div>
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">SYSTEM 1</span>
        <span class="wb_muell-multidata-data-header">ZENTRALANLAGE RESTMÜLL</span>
        <div class="wb_muell-multidata-data-rgheader">
          <div>i.O.</div>
          <div>n.i.O.</div>
        </div>
        <span>Bemerkung</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[1]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">BACKUPPUMPE</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[2]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">SYSTEM 2</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[3]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">GESAMT</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[4]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">NASSMÜLL</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[5]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">KRIECHKELLER</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[6]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">PRODUKTION HALLE</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[7]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
      <div class="wb_muell-multidata-data wb_muell-multidata-data-heading">
        <span class="wb_muell-multidata-data-header">MÜLLABWURFRAUM</span>
      </div>
      <div class="wb_muell-multidata-data" v-for="(input, index) in inputs[8]" v-bind:key="index">
        <div class="wb_muell-multidata-data-label">{{ input.label }}</div>
        <div class="wb_muell-multidata-data-description">{{ input.description }}</div>
        <div class="wb_muell-multidata-data-radiobtns">
          <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
        </div>
        <Textarea
          class="wb_muell-multidata-data-note"
          type="text"
          rows="2"
          style="resize: none; align-self: flex-start"
          v-model="inputValues['bemerkung.' + input.id]"
          fluid
          size="small"
        />
      </div>
    </div>
    <Divider />
    <h3>Sonstiges</h3>
    <Textarea v-model="inputValues['sonstiges']" class="wb_muell-sonstiges-area"></Textarea>
  </div>
</template>
<script>
import { useInputStore } from '@/stores/inputStore'
import {
  Checkbox,
  Column,
  ColumnGroup,
  DataTable,
  Divider,
  InputNumber,
  InputText,
  RadioButton,
  Textarea,
} from 'primevue'

export default {
  components: {
    InputText,
    Divider,
    DataTable,
    Column,
    ColumnGroup,
    RadioButton,
    Checkbox,
    InputText,
    InputNumber,
    Textarea,
  },

  data() {
    return {
      inputValues: {},
      inputs: [
        [
          { label: 'Fabrikat', id: 'fabrikat' },
          { label: 'Typ-Nr.', id: 'typnr' },
          { label: 'Typ', id: 'typ' },
          { label: 'Drehzahl', id: 'drehzahl_alg' },
          { label: 'Leistung', id: 'leistung' },
          { label: 'Maschinen-Nr.', id: 'maschinennr' },
          { label: 'Ort', id: 'ort' },
          { label: 'Gebäude', id: 'gebauede' },
          { label: 'Raum', id: 'raum' },
          { label: 'Anlage', id: 'anlage' },
        ],
        [
          {
            label: 'Vakuumpumpe',
            description:
              'Laufruhe, Flüssigkeitsaustritt, Ölmenge und Ölfarbe. Differenzdruck Filter → ggf. reinigen.',
            id: 'vakuumpumpe1',
          },
          {
            label: 'Zyklone 1',
            description:
              'Keilriemen u. Antrieb kontrollieren. Innenprüfung – Reinigung mit Hoch-druckreiniger.',
            id: 'zyklone1',
          },
          {
            label: 'Filter 1',
            description: 'Abscheider Druckluft, Differenzdruck, Filterkammer.',
            id: 'filter1',
          },
          {
            label: 'Müllabwurf, Zyklone, Schnecke',
            description:
              'Sensoren prüfen. Schieber auf Funktion prüfen. Klappen auf Verschluss prüfen. Laufgeräusche Schnecke.',
            id: 'muellabwurf_zyklone_schnecke1',
          },
        ],
        [
          {
            label: 'Vakuumpumpe',
            description:
              'Laufruhe, Flüssigkeitsaustritt, Ölmenge und Ölfarbe. Differenzdruck Filter → ggf. reinigen.',
            id: 'vakuumpumpe2',
          },
        ],
        [
          {
            label: 'Vakuumpumpe',
            description:
              'Laufruhe, Flüssigkeitsaustritt, Ölmenge und Ölfarbe. Differenzdruck Filter → ggf. reinigen.',
            id: 'vakuumpumpe3',
          },
          {
            label: 'Zyklone 2',
            description:
              'Keilriemen u. Antrieb kontrollieren. Innenprüfung – Reinigung mit Hoch-druckreiniger.',
            id: 'zyklone2',
          },
          {
            label: 'Filter 2',
            description: 'Abscheider Druckluft, Differenzdruck, Filterkammer.',
            id: 'filter2',
          },
          {
            label: 'Müllabwurf, Zyklone, Schnecke',
            description:
              'Sensoren prüfen. Schieber auf Funktion prüfen. Klappen auf Verschluss prüfen. Laufgeräusche Schnecke.',
            id: 'muellabwurf_zyklone_schnecke2',
          },
        ],
        [
          {
            label: 'Weiche System 1 + 2',
            description: 'Bewegliche Teile abschmieren. (Schmiernippel)',
            id: 'weiche_system_1+2',
          },
          {
            label: 'Schaltschränke, Pumpen + WOP-iT',
            description: 'Filter kontrollieren und Display reinigen.',
            id: 'schaltschraenke_pumpen_wopit',
          },
        ],
        [
          {
            label: 'Vakuumpumpe',
            description: 'Kontrolle Ölstand. Filter entwässern.',
            id: 'vakuumpumpe4',
          },
          {
            label: 'Schaltschrank',
            description: 'Sichtkontrolle. Display reinigen',
            id: 'schaltschrank',
          },
          {
            label: 'Macerator',
            description:
              'Probelauf Macerator. Auf Dichtheit über-prüfen. Rohrleitung und Ventile prüfen.',
            id: 'macerator',
          },
          {
            label: 'Absaugstationen\nAS1 Müllhaus / AS2\nAS3 Spülküche / AS4',
            description:
              'Sichtkontrolle der Stationen.\nPrüfung der Sensoren.\nFunktionsprüfung der Absaugung.',
            id: 'absaugstationen',
          },
        ],
        [
          {
            label: 'Rohrsystem',
            description: 'Sichtkontrolle der Rohrleitungen. Hörkontrolle auf Druckluftverlust.',
            id: 'rohrsystem',
          },
          {
            label: 'Abwurfschacht (ehem. Wender) Linie 15, Linie 14, Linie 10',
            description:
              'Sichtprüfung innen/außen. Kontrolle und ggf. Reinigung aller Sensoren. Förderschne-cke auf festen Sitz und Leichtlauf prüfen, ggf. nachziehen oder mit Silikonspray schmie-ren. Bypass Zuluft Klappe überprüfen.',
            id: 'abwurfschacht1',
          },
        ],
        [
          {
            label: 'Abwurfschacht (ehem. Wender) Linie 15, Linie 14, Linie 10',
            description:
              'Sichtprüfung innen/außen. Funktions-kontrolle der Deckelschalter und Wippe.',
            id: 'abwurfschacht2',
          },
          {
            label:
              'Abwurf DT8, Linie 13/ DT7, Linie 12 / DT6, Linie 8 DT5, Linie 7 / DT3, Linie 5 / DT2, Linie 4 / DT1, Linie 3',
            description:
              'Sichtprüfung auf Beschädigung des Ab-wurftischs innen und außen. Funktions-kontrolle der Absaugung. Füllstandsenso-ren reinigen. Schieber auf Funktion prüfen.',
            id: 'abwurf',
          },
          {
            label: 'Wastebox Absaugung',
            description:
              'Sichtprüfung auf Beschädigung der Station. Rollenband auf Beschädigung und Funktion prüfen. Antriebsgummis prüfen. Pneumati-sche Antriebe prüfen. Sensoren auf Funkti-on prüfen. Absaugung auf Funktion prüfen.',
            id: 'wastebox_absaugung',
          },
          {
            label: 'Abwurf TS2',
            description:
              'Sichtprüfung auf Beschädigung des Abwurftischs innen und außen. Funktions-kontrolle der Absaugung. Schieber auf Funktion prüfen. Hörkontrolle Förder-schnecke auf Leichtlauf',
            id: 'abwurf_ts2',
          },
          {
            label: 'Abwurf TS1',
            description:
              'Sichtprüfung auf Beschädigung des Abwurftischs innen und außen. Funktions-kontrolle der Absaugung. Schieber auf Funktion prüfen. Hörkontrolle Förder-schnecke auf Leichtlauf',
            id: 'abwurf_ts1',
          },
        ],
        [
          {
            label: 'PET-Schlitzer, Hubvorrichtung, Schaltschrank',
            description:
              'Sicht- und Funktionsprüfung durchfüh-ren. Schaltschrank Display reinigen.',
            id: 'pet_schlitzer',
          },
        ],
      ],
    }
  },

  methods: {
    broadcastInputsToStore() {
      useInputStore().setInputData(this.inputValues)
    },
  },
}
</script>
<style lang="scss">
.wb_muell {
  &-header {
    margin: 0.3rem 0;
  }

  &-subheader {
    margin: 0.3rem 0;
  }

  &-sonstiges-area {
    width: 100%;
    height: 5rem;
    resize: none;
  }

  &-multinputs {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);

    &-inpt {
      display: flex;
      flex-direction: column;

      label {
        font-weight: 600;
        font-size: 1rem;
        padding-bottom: 0.3rem;
      }
    }
  }

  &-multidata {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    &-data {
      display: grid;
      grid-template-columns: 0.9fr 2.25fr 0.3fr 0.9fr;
      column-gap: 0.2rem;

      &-label,
      &-description {
        white-space: pre-wrap;
      }

      &-note {
        display: inline-block;
      }

      &-radiobtns {
        display: flex;
        justify-content: space-evenly;
      }

      &-heading {
        margin-top: 1rem;
      }

      &-header {
        font-weight: 600;
        font-size: 1.1rem;
        color: var(--p-primary-800);

        white-space: nowrap;
      }

      &-rgheader {
        display: flex;
        justify-content: space-evenly;

        div {
          transform: rotate(90deg) translateX(calc(-50% - 0.3rem)) translateY(-1em);
          transform-origin: center left;
        }

        :last-child {
          transform: rotate(90deg) translateX(calc(-50% - 0.3rem - 0.25em)) translateY(-1.15em);
        }
      }

      &-control {
        display: flex;
        gap: 1rem;

        &-field {
          display: flex;
          align-items: center;
          gap: 0.35rem;

          &-kw input {
            max-width: 2.5rem;
          }

          &-year input {
            max-width: 3.5rem;
          }
        }
      }
    }
  }
}
</style>
