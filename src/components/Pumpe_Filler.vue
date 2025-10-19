<template>
  <div class="wb_pumpe">
    <h2 class="wb_pumpe-header">Wartungsbericht — Pumpe</h2>
    <h3 class="wb_pumpe-subheader">Allgemeines</h3>
    <div class="wb_pumpe-multinputs">
      <div v-for="(input, index) in inputs[0]" :key="index" class="wb_pumpe-multinputs-inpt">
        <label>{{ input.label }}</label>
        <InputText v-model="inputValues[input.id]"></InputText>
      </div>
    </div>
    <Divider />
    <div class="wb_pumpe-multidata">
      <div class="wb_pumpe-multidata-data">
        <span><b>Sichtprüfung</b></span>
        <div class="wb_pumpe-multidata-data-radiobtns">
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>Lauf</label>
            <RadioButton v-model="inputValues['sichtpruefung']" value="1"></RadioButton>
          </div>
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>Ruhe</label>
            <RadioButton v-model="inputValues['sichtpruefung']" value="2"></RadioButton>
          </div>
        </div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[1]" :key="index" class="wb_pumpe-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_pumpe-multidata-data-radiobtns">
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>n.i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_pumpe-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <div class="wb_pumpe-multidata">
      <div class="wb_pumpe-multidata-data">
        <span><b>Dichtheitsprüfung</b></span>
        <div></div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[2]" :key="index" class="wb_pumpe-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_pumpe-multidata-data-radiobtns">
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_pumpe-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <div class="wb_pumpe-multidata">
      <div class="wb_pumpe-multidata-data">
        <span><b>Lagerung</b></span>
        <div class="wb_pumpe-multidata-data-radiobtns">
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>Lauf</label>
            <RadioButton v-model="inputValues['lagerung']" value="1"></RadioButton>
          </div>
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>Ruhe</label>
            <RadioButton v-model="inputValues['lagerung']" value="2"></RadioButton>
          </div>
        </div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[3]" :key="index" class="wb_pumpe-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_pumpe-multidata-data-radiobtns">
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_pumpe-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_pumpe-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <h3>Fettnachschmierung</h3>
    <div class="wb_pumpe-fat">
      <div class="wb_pumpe-fat-data">
        <span>geforderte Fettmenge</span>
        <InputText
          class="wb_pumpe-fat-data-input"
          size="small"
          v-model="inputValues['geforderte_fettmenge']"
        />
      </div>
      <div class="wb_pumpe-fat-data">
        <span>Fettsorte</span>
        <InputText
          class="wb_pumpe-fat-data-input"
          size="small"
          v-model="inputValues['fettsorte']"
        />
      </div>
      <div class="wb_pumpe-fat-data">
        <span>Intervall</span>
        <InputText
          class="wb_pumpe-fat-data-input"
          size="small"
          v-model="inputValues['intervall']"
        />
      </div>
      <div class="wb_pumpe-fat-radiobtns">
        <div>
          <label>Ausgeführt</label>
          <RadioButton
            v-model="inputValues['fettnachschmierung_ausgefuehrt']"
            value="1"
          ></RadioButton>
        </div>
        <div>
          <label>nicht ausgeführt</label>
          <RadioButton
            v-model="inputValues['fettnachschmierung_ausgefuehrt']"
            value="2"
          ></RadioButton>
        </div>
      </div>
      <div class="wb_pumpe-fat-textarea">
        <span>Bemerkung</span>
        <Textarea v-model="inputValues['fettnachschmierung_bemerkung']" />
      </div>
    </div>
    <Divider />
    <h3>Sonstiges</h3>
    <Textarea v-model="inputValues['sonstiges']" class="wb_pumpe-sonstiges-area"></Textarea>
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
          { label: 'Fördermenge', id: 'foerdermenge' },
          { label: 'Förderhöhe', id: 'foerderhoehe' },
          { label: 'Maschinen-Nr.', id: 'maschinennr' },
          { label: 'Ort', id: 'ort' },
          { label: 'Gebäude', id: 'gebauede' },
          { label: 'Raum', id: 'raum' },
          { label: 'Anlage', id: 'anlage' },
        ],
        [
          { label: 'Verschmutzung', id: 'verschmutzung' },
          { label: 'Beschädigungen', id: 'beschaedigungen' },
          { label: 'Schrauben + Bolzen', id: 'schrauben+bolzen' },
          { label: 'Rohrleitung', id: 'rohrleitung' },
        ],
        [
          { label: 'Gleitringdichtung', id: 'gleitringdichtung' },
          { label: 'Packung', id: 'packung' },
          { label: 'Entlüftungsschraube', id: 'entlueftungsschraube' },
          { label: 'Öl + Kühlmittel', id: 'oel+kuehlmittel' },
        ],
        [
          { label: 'Laufgeräusche', id: 'laufgeraeusche' },
          { label: 'Schwingungen', id: 'schwingungen' },
        ],
      ],
    }
  },

  methods: {
    broadcastInputsToStore() {
      this.inputValues["identifier"] = this.$parent.$parent.$parent.$parent.$parent.$parent.$parent.$parent.inputValues.identifier ?? null
      useInputStore().setInputData(this.inputValues)
    },
  },
}
</script>
<style lang="scss">
.wb_pumpe {
  &-header {
    margin: 0.3rem 0;
  }

  &-subheader {
    margin: 0.3rem 0;
  }

  &-sonstiges-area {
    width: 100%;
    height: 10rem;
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
