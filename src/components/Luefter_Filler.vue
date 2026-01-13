<template>
  <div class="wb_luefter">
    <h2 class="wb_luefter-header">Wartungsbericht — Lüfter</h2>
    <h3 class="wb_luefter-subheader">Allgemeines</h3>
    <div class="wb_luefter-multinputs">
      <div v-for="(input, index) in inputs[0]" :key="index" class="wb_luefter-multinputs-inpt">
        <label>{{ input.label }}</label>
        <div class="wb_luefter-multinputs-inpt-2" v-if="input.id === 'foerdermenge'">
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
    <div class="wb_luefter-multidata">
      <div class="wb_luefter-multidata-data">
        <span><b>Sichtprüfung</b></span>
        <div class="wb_luefter-multidata-data-radiobtns">
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>Lauf</label>
            <RadioButton
              v-model="inputValues['sichtpruefung']"
              value="1"
              @click="toggleRadio('sichtpruefung', '1')"
            ></RadioButton>
          </div>
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>Ruhe</label>
            <RadioButton
              v-model="inputValues['sichtpruefung']"
              value="2"
              @click="toggleRadio('sichtpruefung', '2')"
            ></RadioButton>
          </div>
        </div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[1]" :key="index" class="wb_luefter-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_luefter-multidata-data-radiobtns">
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton
              v-model="inputValues[input.id]"
              value="1"
              @click="toggleRadio(input.id, '1')"
            ></RadioButton>
          </div>
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>n.i.O.</label>
            <RadioButton
              v-model="inputValues[input.id]"
              value="2"
              @click="toggleRadio(input.id, '2')"
            ></RadioButton>
          </div>
        </div>
        <div class="wb_luefter-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <div class="wb_luefter-multidata">
      <div class="wb_luefter-multidata-data">
        <span><b>Lagerung</b></span>
        <div class="wb_luefter-multidata-data-radiobtns">
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>Lauf</label>
            <RadioButton
              v-model="inputValues['lagerung']"
              value="1"
              @click="toggleRadio('lagerung', '1')"
            ></RadioButton>
          </div>
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>Ruhe</label>
            <RadioButton
              v-model="inputValues['lagerung']"
              value="2"
              @click="toggleRadio('lagerung', '2')"
            ></RadioButton>
          </div>
        </div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[2]" :key="index" class="wb_luefter-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_luefter-multidata-data-radiobtns">
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton
              v-model="inputValues[input.id]"
              value="1"
              @click="toggleRadio(input.id, '1')"
            ></RadioButton>
          </div>
          <div class="wb_luefter-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton
              v-model="inputValues[input.id]"
              value="2"
              @click="toggleRadio(input.id, '2')"
            ></RadioButton>
          </div>
        </div>
        <div class="wb_luefter-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <h3>Fettnachschmierung</h3>
    <div class="wb_luefter-fat">
      <div class="wb_luefter-fat-data">
        <span>geforderte Fettmenge</span>
        <InputText
          class="wb_luefter-fat-data-input"
          size="small"
          v-model="inputValues['geforderte_fettmenge']"
        />
      </div>
      <div class="wb_luefter-fat-data">
        <span>Fettsorte</span>
        <InputText
          class="wb_luefter-fat-data-input"
          size="small"
          v-model="inputValues['fettsorte']"
        />
      </div>
      <div class="wb_luefter-fat-data">
        <span>Intervall</span>
        <InputText
          class="wb_luefter-fat-data-input"
          size="small"
          v-model="inputValues['intervall']"
        />
      </div>
      <div class="wb_luefter-fat-radiobtns">
        <div>
          <label>Ausgeführt</label>
          <RadioButton
            v-model="inputValues['fettnachschmierung_ausgefuehrt']"
            value="1"
            @click="toggleRadio('fettnachschmierung_ausgefuehrt', '1')"
          ></RadioButton>
        </div>
        <div>
          <label>nicht ausgeführt</label>
          <RadioButton
            v-model="inputValues['fettnachschmierung_ausgefuehrt']"
            value="2"
            @click="toggleRadio('fettnachschmierung_ausgefuehrt', '2')"
          ></RadioButton>
        </div>
      </div>
      <div class="wb_luefter-fat-textarea">
        <span>Bemerkung</span>
        <Textarea v-model="inputValues['fettnachschmierung_bemerkung']" />
      </div>
    </div>
    <Divider />
    <h3>Sonstiges</h3>
    <Textarea v-model="inputValues['sonstiges']" class="wb_luefter-sonstiges-area"></Textarea>
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
          { label: 'Verschmutzung', id: 'verschmutzung' },
          { label: 'Ablagerung am Lüfter', id: 'ablagerung_luefter' },
          { label: 'Flügelstellung', id: 'fluegelstellung' },
          { label: 'Beschädigungen', id: 'beschaedigungen' },
          { label: 'Rundlauf', id: 'rundlauf' },
          { label: 'Spaltmaße Luftleitring', id: 'spaltmasse_luftleitring' },
          { label: 'Schwingungsdämpfer', id: 'schwingungsdaempfer' },
          { label: 'Riemen', id: 'riemen' },
          { label: 'Riemenscheibe', id: 'riemenscheibe' },
          { label: 'Kompensator', id: 'kompensator' },
          { label: 'Luftleitung', id: 'luftleitung' },
        ],
        [
          { label: 'Laufgeräusche', id: 'laufgeraeusche' },
          { label: 'Schwingungen', id: 'schwingungen' },
          { label: 'Drehzahl', id: 'drehzahl' },
          { label: 'Lagerblock Zustand', id: 'lagerblock_zustand' },
          { label: 'Lagerblock Abdichtung', id: 'lagerblock_abdichtung' },
        ],
      ],
    }
  },

  methods: {
    toggleRadio(field, value) {
      if (this.inputValues[field] === value) {
        this.inputValues[field] = null
      }
    },
    broadcastInputsToStore() {
      this.inputValues['identifier'] =
        this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.inputValues
          .identifier ?? null
      useInputStore().setInputData(this.inputValues)
    },
  },
}
</script>
<style lang="scss">
.wb_luefter {
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

  &-fat {
    display: grid;
    grid-template-columns: 6fr 4fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0.3rem;
    column-gap: 3rem;
    grid-auto-flow: column;

    &-textarea {
      grid-row: 1 / 5;
      display: flex;
      flex-direction: column;
      gap: 0rem;

      textarea {
        resize: none;
        flex: 1;
      }
    }

    &-radiobtns {
      display: grid;
      grid-template-columns: auto 12.5rem;

      div {
        gap: 0.4rem;
        display: flex;
        justify-self: right;
      }
    }

    &-data {
      display: flex;
      justify-content: right;
      align-items: center;
      gap: 0.3rem;
    }
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
    row-gap: 0.3rem;

    &-data {
      display: grid;
      grid-template-columns: 3fr 2fr 2fr 3fr;

      align-items: center;
      height: 1.9rem;

      &-checkbox {
        display: flex;
        justify-content: center;
        gap: 0.2rem;
      }

      &-radiobtns {
        display: grid;
        grid-template-columns: 1fr 1fr;

        &-btn {
          display: flex;
          justify-content: flex-end;
          gap: 0.2rem;
        }
      }
    }
  }
}
</style>
