<template>
  <div class="wb_schmutzwasser">
    <h2 class="wb_schmutzwasser-header">Wartungsbericht — Müllanlage</h2>
    <h3 class="wb_schmutzwasser-subheader">Allgemeines</h3>
    <div class="wb_schmutzwasser-multinputs">
      <div
        v-for="(input, index) in inputs[0]"
        :key="index"
        class="wb_schmutzwasser-multinputs-inpt"
      >
        <label>{{ input.label }}</label>
        <div class="wb_schmutzwasser-multinputs-inpt-2" v-if="input.id === 'foerdermenge'">
          <InputText fluid v-model="inputValues[input.id]"></InputText>
          <div>Ø</div>
          <InputText fluid v-model="inputValues['average.' + input.id]"></InputText>
        </div>
        <div v-else>
          <InputText fluid v-model="inputValues[input.id]"></InputText>
        </div>
      </div>
    </div>
    <Divider />
    <div class="wb_schmutzwasser-multidata">
      <div class="wb_schmutzwasser-multidata-data wb_schmutzwasser-multidata-data-heading">
        <div style="display: flex; gap: 2rem">
          <span><b>Sichtprüfung</b></span>
          <div style="display: flex; gap: 1rem">
            <div style="display: flex; gap: 0.3rem">
              <label>Lauf</label>
              <RadioButton v-model="inputValues['sichtpruefung']" value="1"></RadioButton>
            </div>
            <div style="display: flex; gap: 0.3rem">
              <label>Ruhe</label>
              <RadioButton v-model="inputValues['sichtpruefung']" value="2"></RadioButton>
            </div>
          </div>
        </div>
        <div class="wb_schmutzwasser-multidata-data-rgheader">
          <div>i.O.</div>
        </div>
        <div class="wb_schmutzwasser-multidata-data-rgheader">
          <div>n.i.O.</div>
        </div>
        <div class="wb_schmutzwasser-multidata-data-rgheader">
          <div>Behoben</div>
        </div>
        <div>Bemerkung</div>
      </div>
      <div
        class="wb_schmutzwasser-multidata-data"
        v-for="(input, index) in inputs[1]"
        v-bind:key="index"
      >
        <div class="wb_schmutzwasser-multidata-data-label">{{ input.label }}</div>
        <RadioButton
          class="wb_schmutzwasser-multidata-data-radiobtn"
          v-model="inputValues[input.id]"
          value="1"
        ></RadioButton>
        <RadioButton
          class="wb_schmutzwasser-multidata-data-radiobtn"
          v-model="inputValues[input.id]"
          value="2"
        ></RadioButton>
        <div class="wb_schmutzwasser-multidata-data-checkbox">
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <div style="display: flex; align-self: center">
          <Textarea
            class="wb_schmutzwasser-multidata-data-note"
            type="text"
            rows="1"
            style="resize: none; align-self: flex-start"
            v-model="inputValues['bemerkung.' + input.id]"
            fluid
            size="small"
          />
        </div>
      </div>
    </div>
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
          { label: 'Fördermenge', id: 'foerdermenge' },
          { label: 'Maschinen-Nr.', id: 'maschinennr' },
          { label: 'Ort', id: 'ort' },
          { label: 'Gebäude', id: 'gebauede' },
          { label: 'Raum', id: 'raum' },
          { label: 'Anlage', id: 'anlage' },
        ],
        [
          {
            label: 'Kette/Hebeseil und Befestigung an der Pumpe auf Schäden prüfen',
            id: 'kette_befestigung',
          },
          {
            label: 'Tauch-/Messglocke kontrollieren, ggf. reinigen',
            id: 'messglocke',
          },
          {
            label: 'Kontrolle der Rohrverbindungen auf Dichtheit',
            id: 'rohrverbindungen',
          },
          {
            label: 'Rückschlagorgane auf Funktion und Dichtheit prüfen',
            id: 'rueckschlagorgane',
          },
          {
            label: 'Kontrolle der Entlüftungslöcher bei Hebeanlagen',
            id: 'entlueftungsloecher',
          },
          {
            label: 'Kontrolle der Schleißwand bei Hebeanlagen',
            id: 'schleisswand',
          },
          {
            label: 'Isolationswiderstand prüfen (min. 2 Mega Ohm)',
            id: 'isolationswiderstand',
          },
          {
            label: 'Kontrolle der Schaltautomatik',
            id: 'schaltautomatik',
          },
          {
            label: 'Wahlschalter Hand-0-Automatik',
            id: 'wahlschalter',
          },
          {
            label: 'Funktionsprüfung der/des Schwimmkörper/s',
            id: 'schwimmkoerper',
          },
          {
            label: 'Vertauschung je Schaltspiel',
            id: 'vertauschung',
          },
          {
            label: 'Zuschaltung ruhende Pumpe bei Spitzenlast',
            id: 'zuschaltungspitzenlast',
          },
          {
            label: 'Kontrolle der Laufruhe von Pumpe und Motor',
            id: 'laufruhe',
          },
          {
            label: 'Kontrolle der Ein- und Ausschaltpunkte',
            id: 'schaltpunkte',
          },
          {
            label: 'Kontrolle und Dokumentation der Stromaufnahme Motor/en',
            id: 'stromaufnahme',
          },
          {
            label: 'Einstellung des Überstromrelais oder Motorschutzschalter prüfen',
            id: 'ueberstromrelais',
          },
          {
            label: 'Betriebsstunden kontrollieren',
            id: 'betriebsstunden',
          },
          {
            label: 'Alarmanlage auf Funktion prüfen',
            id: 'alarmanlage',
          },
          {
            label:
              'Kontrolle der elastischen Rohrverbindungen oder Kompensatoren auf Sitz + Verschleiß',
            id: 'kompensatoren',
          },
          {
            label:
              'Schachtabdeckung mit Rahmen und ggf. Ausgleichsringe oder Teleskopverlängerung auf ordnungsgemäßen Zustand und Sitz kontrollieren',
            id: 'schachtabdeckung',
          },
          {
            label:
              'Kontrolle, ob Temperaturschalter angeschlossen sind; bei Ex-Schutz zusätzlich Auslösegerät kontrollieren',
            id: 'temperaturschalter',
          },
          {
            label:
              'Ermittlung des eventuellen Ersatzteilbedarfs + empfohlener Zusatzleistungen (z. B. Schachtreinigung)',
            id: 'ersatzteilbedarf',
          },
          {
            label:
              'Bei starkem Fettansatz im Behälter Kunden auf DIN1986-100 hinweisen: ein Fettabscheider ist einzubauen',
            id: 'fettabscheiderhinweis',
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
.wb_schmutzwasser {
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

      &-2 {
        width: 100%;
        display: flex;
        flex-direction: row;

        gap: 1rem;

        align-items: center;

        div {
          margin-right: -0.75rem;
        }
      }
    }
  }

  &-multidata {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;

    margin-top: 2.75rem;

    &-data {
      display: grid;
      grid-template-columns: 7fr 0.3fr 0.3fr 0.4fr 2fr;
      column-gap: 0.2rem;

      position: relative;

      &-label,
      &-description {
        white-space: pre-wrap;
        align-self: center;
      }

      &-note {
        display: inline-block;
      }

      &-radiobtn {
        align-self: center;
        justify-self: center;
      }

      &-heading {
        margin-top: 1rem;
      }

      &-checkbox {
        display: flex;
        justify-content: center;
        align-self: center;
      }

      &-rgheader {
        display: flex;
        justify-content: space-evenly;
        position: relative;

        div {
          transform-origin: right center;
          position: absolute;
          transform: translate(-100%, 0.5em) rotate(90deg);
          left: 50%;
          bottom: 0;
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
