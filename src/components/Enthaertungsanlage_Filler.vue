<template>
  <div class="wb_ehanlage">
    <h2 class="wb_ehanlage-header">Überprüfungsbericht — Enthärtungsanlage</h2>
    <h3 class="wb_ehanlage-subheader">Allgemeines</h3>
    <div class="wb_ehanlage-multinputs">
      <div v-for="(input, index) in inputs[0]" :key="index" class="wb_ehanlage-multinputs-inpt">
        <label>{{ input.label }}</label>
        <InputText v-model="inputValues[input.id]" :disabled="input.fixed"></InputText>
      </div>
    </div>
    <Divider />
    <div class="wb_ehanlage-multidata">
      <div class="wb_ehanlage-multidata-data">
        <span><b>Sichtprüfung</b></span>
        <div></div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[1]" :key="index" class="wb_ehanlage-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_ehanlage-multidata-data-radiobtns">
          <div class="wb_ehanlage-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton
              v-model="inputValues[input.id]"
              value="1"
              @click="toggleRadio(input.id, '1')"
            ></RadioButton>
          </div>
          <div class="wb_ehanlage-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton
              v-model="inputValues[input.id]"
              value="2"
              @click="toggleRadio(input.id, '2')"
            ></RadioButton>
          </div>
        </div>
        <div class="wb_ehanlage-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" fluid size="small" />
      </div>
    </div>
    <Divider />
    <h4>Überprüfungswerte in °DH</h4>
    <div class="wb_ehanlage-groups">
      <div
        v-for="gi in Array.from({ length: 3 }, (_, i) => i)"
        :id="'gi_' + gi"
        class="wb_ehanlage-groups-group"
      >
        <div class="wb_ehanlage-groups-group-fields">
          <InputNumber
            v-for="index in Array.from({ length: gi == 2 ? 8 : 6 }, (_, i) => i)"
            :key="index"
            v-model="inputValues[`group_${gi + 1}_${index + 1}`]"
            class="wb_ehanlage-groups-group-fields-field"
            size="normal"
            :useGrouping="false"
            :max="50"
            :min="0"
            :maxFractionDigits="2"
          ></InputNumber>
        </div>
        <div class="wb_ehanlage-groups-group-desc">
          <span
            ><b>{{ gi == 2 ? 'Zulauf' : 'Mischwasser' }}</b></span
          ><br />
          <span>{{ gi == 2 ? 'Osmose' : 'Gruppe ' + (gi + 1) }}</span
          ><br />
          <span>{{ gi == 2 ? '≤ 0,5°DH ' : 'ca. 2°DH' }}</span>
        </div>
      </div>
    </div>
    <Divider />
    <h3>Sonstiges</h3>
    <Textarea v-model="inputValues['sonstiges']" class="wb_ehanlage-sonstiges-area"></Textarea>
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
      inputValues: {
        anlage: 'Enthärtungsanlage',
        ort: 'Sanitärzentrale',
      },
      inputs: [
        [
          { label: 'Fabrikat', id: 'fabrikat' },
          { label: 'Typ-Nr.', id: 'typnr' },
          { label: 'Typ', id: 'typ' },
          { label: 'Maschinen-Nr.', id: 'maschinennr' },
          { label: 'Ort', id: 'ort', fixed: true },
          { label: 'Gebäude', id: 'gebauede' },
          { label: 'Raum', id: 'raum' },
          { label: 'Anlage', id: 'anlage', fixed: true },
        ],
        [
          { label: 'Verschmutzung', id: 'verschmutzung' },
          { label: 'Beschädigung', id: 'beschaedigung' },
          { label: 'Dichtheit', id: 'dichtheit' },
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
.wb_ehanlage {
  &-groups {
    display: flex;
    justify-content: space-around;

    &-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      &-desc {
        text-align: center;
      }

      &-fields {
        display: grid;
        grid-template-columns: auto auto;
        row-gap: 1rem;
        column-gap: 1rem;

        &-field input {
          aspect-ratio: 1;
          width: 4rem !important;
          border-radius: 50%;
          padding: 0;
          text-align: center;
        }
      }
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
