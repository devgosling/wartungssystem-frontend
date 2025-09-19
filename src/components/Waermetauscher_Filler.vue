<template>
  <div class="wb_waermetauscher">
    <h2 class="wb_waermetauscher-header">Wartungsbericht — Wärmetauscher</h2>
    <h3 class="wb_waermetauscher-subheader">Allgemeines</h3>
    <div class="wb_waermetauscher-multinputs">
      <div
        v-for="(input, index) in inputs[0]"
        :key="index"
        class="wb_waermetauscher-multinputs-inpt"
      >
        <label>{{ input.label }}</label>
        <InputText v-model="inputValues[input.id]"></InputText>
      </div>
    </div>
    <Divider />
    <div class="wb_waermetauscher-multidata">
      <div class="wb_waermetauscher-multidata-data">
        <span><b>Sichtprüfung</b></span>
        <div class="wb_waermetauscher-multidata-data-radiobtns">
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>Lauf</label>
            <RadioButton v-model="inputValues['sichtpruefung']" value="1"></RadioButton>
          </div>
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>Ruhe</label>
            <RadioButton v-model="inputValues['sichtpruefung']" value="2"></RadioButton>
          </div>
        </div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div
        v-for="(input, index) in inputs[1]"
        :key="index"
        class="wb_waermetauscher-multidata-data"
      >
        <span>{{ input.label }}</span>
        <div class="wb_waermetauscher-multidata-data-radiobtns">
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>n.i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_waermetauscher-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <div class="wb_waermetauscher-multidata">
      <div class="wb_waermetauscher-multidata-data">
        <span><b>Dichtheitsprüfung</b></span>
        <div></div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div
        v-for="(input, index) in inputs[2]"
        :key="index"
        class="wb_waermetauscher-multidata-data"
      >
        <span>{{ input.label }}</span>
        <div class="wb_waermetauscher-multidata-data-radiobtns">
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_waermetauscher-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <div class="wb_waermetauscher-multidata">
      <div class="wb_waermetauscher-multidata-data">
        <span><b>Wärmeschutz</b></span>
        <div></div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div
        v-for="(input, index) in inputs[3]"
        :key="index"
        class="wb_waermetauscher-multidata-data"
      >
        <span>{{ input.label }}</span>
        <div class="wb_waermetauscher-multidata-data-radiobtns">
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_waermetauscher-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_waermetauscher-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <div class="wb_waermetauscher-vorlaufe">
      <div></div>
      <div>Primärer Vorlauf</div>
      <div>Primärer Rücklauf</div>
      <div>Sekundärer Vorlauf</div>
      <div>Sekundärer Rücklauf</div>
      <div class="wb_waermetauscher-vorlaufe-header">Temperatur</div>
      <InputText
        type="text"
        v-model="inputValues['temperatur.primaryvorlauf']"
        fluid
        size="small"
      />
      <InputText
        type="text"
        v-model="inputValues['temperatur.primaryrucklauf']"
        fluid
        size="small"
      />
      <InputText
        type="text"
        v-model="inputValues['temperatur.secondaryvorlauf']"
        fluid
        size="small"
      />
      <InputText
        type="text"
        v-model="inputValues['temperatur.secondaryrucklauf']"
        fluid
        size="small"
      />
      <div class="wb_waermetauscher-vorlaufe-header">Druck</div>
      <InputText type="text" v-model="inputValues['druck.primaryvorlauf']" fluid size="small" />
      <InputText type="text" v-model="inputValues['druck.primaryrucklauf']" fluid size="small" />
      <InputText type="text" v-model="inputValues['druck.secondaryvorlauf']" fluid size="small" />
      <InputText type="text" v-model="inputValues['druck.secondaryrucklauf']" fluid size="small" />
      <div>Bemerkung</div>
      <Textarea
        class="wb_waermetauscher-vorlaufe-note"
        type="text"
        style="resize: none; grid-row: 2 / 5;"
        v-model="inputValues['bemerkung.vorlaufe']"
        fluid
        size="small"
      />
    </div>
    <Divider />
    <h3>Sonstiges</h3>
    <Textarea
      v-model="inputValues['sonstiges']"
      class="wb_waermetauscher-sonstiges-area"
    ></Textarea>
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
          { label: 'KW', id: 'kw' },
          { label: 'Medium', id: 'medium' },
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
          { label: 'Ventile', id: 'ventile' },
          { label: 'Platten', id: 'platten' },
          { label: 'Entlüftungsschraube', id: 'entlueftungsschraube' },
          { label: 'Flansch', id: 'flansch' },
          { label: 'Verschraubung', id: 'verschraubung' },
        ],
        [
          { label: 'Isolierung', id: 'isolierung' },
          { label: 'Mantel', id: 'mantel' },
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
.wb_waermetauscher {
  &-vorlaufe {
    display: grid;
    grid-template-columns: 3fr 2fr 2fr 3fr;
    grid-template-rows: auto auto auto auto auto;
    grid-auto-flow: column;
    row-gap: 0.25rem;
    column-gap: 1rem;

    &-header {
      text-align: center;
    }

    &-note {
      display: inline-block;
    }
  }

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

  &-resistance {
    display: grid;
    grid-template-columns: 3fr 3fr 4fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-auto-flow: column;

    span {
      align-self: center;
    }

    &-data {
      display: flex;
      align-items: center;
      gap: 0.3rem;

      &-input input {
        max-width: 5rem;
      }
    }

    &-data2 {
      display: flex;
      align-items: center;
      gap: 0.75rem;

      div {
        display: flex;
        gap: 0.3rem;
      }

      &-input input {
        max-width: 6rem;
      }
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
