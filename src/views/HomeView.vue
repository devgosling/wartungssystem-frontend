<template>
  <h1>Dashboard</h1>
  <p>
    - Bisher kann nur der Wartungsbericht "Motor" ausgewählt werden, Daten werden noch nicht auf die
    PDF übertragen nach der Unterschrift, nur die digitale Unterschrift wird auf die PDF gesetzt.
  </p>
  <p>
    - Stammdaten der Kunden können noch nicht angelegt werden (muss noch programmiert werden),
    derzeit kann nur Gate Gourmet GmbH ausgewählt werden, im Auswahlmenü wird es auch die Direkte
    möglichkeit geben neue Kunden anzulegen
  </p>
  <p>
    - Mitarbeiter sind bisher nur Vorlagen (wurde noch nicht programmiert), der Administrator kann
    danach Mitarbeiter anlegen.
  </p>
</template>
<script>
import { account } from '@/lib/appwrite'

export default {
  components: {},

  methods: {
    logout() {
      account.deleteSession('current')
    },
  },
}
</script>
