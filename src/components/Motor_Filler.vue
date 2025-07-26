<template>
  <div class="wb_motor">
    <h2 class="wb_motor-header">Wartungsbericht — Motor</h2>
    <h3 class="wb_motor-subheader">Allgemeines</h3>
    <div class="wb_motor-multinputs">
      <div v-for="(input, index) in inputs[0]" :key="index" class="wb_motor-multinputs-inpt">
        <label>{{ input.label }}</label>
        <InputText v-model="inputValues[input.id]"></InputText>
      </div>
    </div>
    <Divider />
    <div class="wb_motor-multidata">
      <div class="wb_motor-multidata-data">
        <span><b>Sichtprüfung</b></span>
        <div class="wb_motor-multidata-data-radiobtns">
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>Lauf</label>
            <RadioButton v-model="inputValues['sichtpruefung']" value="1"></RadioButton>
          </div>
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>Ruhe</label>
            <RadioButton v-model="inputValues['sichtpruefung']" value="2"></RadioButton>
          </div>
        </div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[1]" :key="index" class="wb_motor-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_motor-multidata-data-radiobtns">
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_motor-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" />
      </div>
    </div>
    <Divider />
    <h3>Isolationswerte + Widerstand</h3>
    <div class="wb_motor-resistance">
      <span>Phase➜Körper</span>
      <div class="wb_motor-resistance-data">
        <span>L1 ➜ PE</span>
        <InputNumber
          class="wb_motor-resistance-data-input"
          :useGrouping="false"
          :minFractionDigits="0"
          :maxFractionDigits="10"
          size="small"
          v-model="inputValues['l1tope']"
        />
        <span>Ω</span>
      </div>
      <div class="wb_motor-resistance-data">
        <span>L2 ➜ PE</span>
        <InputNumber
          class="wb_motor-resistance-data-input"
          :useGrouping="false"
          :minFractionDigits="0"
          :maxFractionDigits="10"
          size="small"
          v-model="inputValues['l2tope']"
        />
        <span>Ω</span>
      </div>
      <div class="wb_motor-resistance-data">
        <span>L3 ➜ PE</span>
        <InputNumber
          class="wb_motor-resistance-data-input"
          :useGrouping="false"
          :minFractionDigits="0"
          :maxFractionDigits="10"
          size="small"
          v-model="inputValues['l3tope']"
        />
        <span>Ω</span>
      </div>
      <span>Phase➜Phase</span>
      <div class="wb_motor-resistance-data">
        <span>L1 ➜ L2</span>
        <InputNumber
          class="wb_motor-resistance-data-input"
          :useGrouping="false"
          :minFractionDigits="0"
          :maxFractionDigits="10"
          size="small"
          v-model="inputValues['l1tol2']"
        />
        <span>Ω</span>
      </div>
      <div class="wb_motor-resistance-data">
        <span>L2 ➜ L3</span>
        <InputNumber
          class="wb_motor-resistance-data-input"
          :useGrouping="false"
          :minFractionDigits="0"
          :maxFractionDigits="10"
          size="small"
          v-model="inputValues['l2tol3']"
        />
        <span>Ω</span>
      </div>
      <div class="wb_motor-resistance-data">
        <span>L3 ➜ L1</span>
        <InputNumber
          class="wb_motor-resistance-data-input"
          :useGrouping="false"
          :minFractionDigits="0"
          :maxFractionDigits="10"
          size="small"
          v-model="inputValues['l3tol1']"
        />
        <span>Ω</span>
      </div>
      <span>Wicklungswiderstände</span>
      <div class="wb_motor-resistance-data2">
        <div>
          <span>L1</span>
          <InputNumber
            class="wb_motor-resistance-data2-input"
            :useGrouping="false"
            :minFractionDigits="0"
            :maxFractionDigits="10"
            size="small"
            v-model="inputValues['wicklungswiderstand_l1_1']"
          />
        </div>
        <div>
          <InputNumber
            class="wb_motor-resistance-data2-input"
            :useGrouping="false"
            :minFractionDigits="0"
            :maxFractionDigits="10"
            size="small"
            v-model="inputValues['wicklungswiderstand_l1_2']"
          />
          <span>Ω</span>
        </div>
      </div>
      <div class="wb_motor-resistance-data2">
        <div>
          <span>L2</span>
          <InputNumber
            class="wb_motor-resistance-data2-input"
            :useGrouping="false"
            :minFractionDigits="0"
            :maxFractionDigits="10"
            size="small"
            v-model="inputValues['wicklungswiderstand_l2_1']"
          />
        </div>
        <div>
          <InputNumber
            class="wb_motor-resistance-data2-input"
            :useGrouping="false"
            :minFractionDigits="0"
            :maxFractionDigits="10"
            size="small"
            v-model="inputValues['wicklungswiderstand_l2_2']"
          />
          <span>Ω</span>
        </div>
      </div>
      <div class="wb_motor-resistance-data2">
        <div>
          <span>L3</span>
          <InputNumber
            class="wb_motor-resistance-data2-input"
            :useGrouping="false"
            :minFractionDigits="0"
            :maxFractionDigits="10"
            size="small"
            v-model="inputValues['wicklungswiderstand_l3_1']"
          />
        </div>
        <div>
          <InputNumber
            class="wb_motor-resistance-data2-input"
            :useGrouping="false"
            :minFractionDigits="0"
            :maxFractionDigits="10"
            size="small"
            v-model="inputValues['wicklungswiderstand_l3_2']"
          />
          <span>Ω</span>
        </div>
      </div>
    </div>
    <Divider />
    <div class="wb_motor-multidata">
      <div class="wb_motor-multidata-data">
        <span><b>Lagerung</b></span>
        <div class="wb_motor-multidata-data-radiobtns">
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>Lauf</label>
            <RadioButton v-model="inputValues['lagerung']" value="1"></RadioButton>
          </div>
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>Ruhe</label>
            <RadioButton v-model="inputValues['lagerung']" value="2"></RadioButton>
          </div>
        </div>
        <div></div>
        <span><b>Bemerkung</b></span>
      </div>
      <div v-for="(input, index) in inputs[2]" :key="index" class="wb_motor-multidata-data">
        <span>{{ input.label }}</span>
        <div class="wb_motor-multidata-data-radiobtns">
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>i.O.</label>
            <RadioButton v-model="inputValues[input.id]" value="1"></RadioButton>
          </div>
          <div class="wb_motor-multidata-data-radiobtns-btn">
            <label>n.i.O</label>
            <RadioButton v-model="inputValues[input.id]" value="2"></RadioButton>
          </div>
        </div>
        <div class="wb_motor-multidata-data-checkbox">
          <label>Behoben</label>
          <Checkbox v-model="inputValues['fixed.' + input.id]" binary></Checkbox>
        </div>
        <InputText type="text" v-model="inputValues['bemerkung.' + input.id]" />
      </div>
    </div>
    <Divider />
    <h3>Fettnachschmierung</h3>
    <div class="wb_motor-fat">
      <div class="wb_motor-fat-data">
        <span>geforderte Fettmenge</span>
        <InputText
          class="wb_motor-fat-data-input"
          size="small"
          v-model="inputValues['geforderte_fettmenge']"
        />
      </div>
      <div class="wb_motor-fat-data">
        <span>Fettsorte</span>
        <InputText
          class="wb_motor-fat-data-input"
          size="small"
          v-model="inputValues['fettsorte']"
        />
      </div>
      <div class="wb_motor-fat-data">
        <span>Intervall</span>
        <InputText
          class="wb_motor-fat-data-input"
          size="small"
          v-model="inputValues['intervall']"
        />
      </div>
      <div class="wb_motor-fat-radiobtns">
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
      <div class="wb_motor-fat-textarea">
        <span>Bemerkung</span>
        <Textarea
          fluid
          v-model="inputValues['fettnachschmierung_bemerkung']"
        />
      </div>
    </div>
    <Divider />
    <h3>Sonstiges</h3>
    <Textarea v-model="inputValues['sonstiges']" class="wb_motor-sonstiges-area"></Textarea>
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
          { label: 'Fabrikant', id: 'fabrikant' },
          { label: 'Typ-Nr.', id: 'typnr' },
          { label: 'Typ', id: 'typ' },
          { label: 'Drehzahl', id: 'drehzahl' },
          { label: 'Leistung', id: 'leistung' },
          { label: 'Maschinen-Nr.', id: 'maschinennr' },
          { label: 'Ort', id: 'ort' },
          { label: 'Gebäude', id: 'gebauede' },
          { label: 'Raum', id: 'raum' },
          { label: 'Anlage', id: 'anlage' },
        ],
        [
          { label: 'Verschmutzung', id: 'verschmutzung' },
          { label: 'Kühlrippen + Lüftungswege', id: 'kuelrippen_lueftungswege' },
          { label: 'Lüfterhaube', id: 'luefterhaube' },
          { label: 'Beschädigungen', id: 'beschaedigungen' },
          { label: 'Klemmkasten', id: 'klemmkasten' },
          { label: 'Anschlusshaube + Einführung', id: 'anschlusshaube_einfuehrung' },
          { label: 'Kupplung / Kupplungsgummi', id: 'kupplung-kupplungsgummi' },
          { label: 'Ölstand / Öl-Qualität', id: 'oelstand-oelqualitaet' },
        ],
        [
          { label: 'Laufgeräuche', id: 'laufgeraeuche' },
          { label: 'Schwingungen', id: 'schwingungen' },
          { label: 'Stromaufnahme', id: 'stromaufnahme' },
          { label: 'Drehzahl', id: 'drehzahl' },
        ],
      ],
      extraValues: ['sichtpruefung'], // DEPRECATED - Nicht alles wird benötigt; Somit unnötig um zu checken ob alles ausgefüllt wurde
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
.wb_motor {
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
      gap: 0.3rem;
      
      textarea {
        resize: none;
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
      height: 2.3rem;

      &-checkbox {
        display: flex;
        justify-content: center;
        gap: 0.2rem;
      }

      &-radiobtns {
        display: grid;
        grid-template-columns: auto auto;

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
