<script setup>
import { dayjs } from 'dayjs'
import { isToday } from 'dayjs/plugin/isToday'
import { computed, ref } from 'vue'

import MainLayout from '@/layouts/MainLayout.vue'
/*
Reto 3: Calendario de Eventos.

En este ejercicio vamos a lidiar con errores tanto de javascript como de maquetación. Tu papel es
arreglar estos errores y que la página, que actualmente no renderiza, cargue bien el contenido.
Además, vamos a añadir una funcionalidad al calendario: Queremos ver qué eventos hay cada día.
Como siempre, el diseño y la creatividad quedan de tu lado, ¡Suerte!

Siéntete libre de modificar tanto código como sea necesario salvo el modelo de datos. Recuerda que el código proporcionado es sólo un ejemplo.
*/

const today = dayjs()
const eventsData = [
  {
    eventTime: today.add(1, 'day').format('YYYY-MM-DD'),
    type: 'concert',
  },
  {
    eventTime: today.add(2, 'day').format('YYYY-MM-DD'),
    type: 'meetup',
  },
  {
    eventTime: today.add(-7, 'day').format('YYYY-MM-DD'),
    type: 'meetup',
  },
  {
    eventTime: today.add(2, 'day').format('YYYY-MM-DD'),
    type: 'concert',
  },
  {
    eventTime: today.add(1, 'month').format('YYYY-MM-DD'),
    type: 'cinema',
  },
  {
    eventTime: today.add(-1, 'month').format('YYYY-MM-DD'),
    type: 'concert',
  },
  {
    eventTime: today.add(1, 'week').format('YYYY-MM-DD'),
    type: 'meetup',
  },
  {
    eventTime: today.add(1, 'year').format('YYYY-MM-DD'),
    type: 'meetup',
  },
  {
    eventTime: today.add(20, 'day').format('YYYY-MM-DD'),
    type: 'cinema',
  },
]
dayjs.extend(isToday)

const viewDate = ref(dayjs())

const daystoPrepend = computed(() => {
  const startOfMonth = viewDate.value.startOf('monht')
  const startOfFirstWeek = startOfMonth.startOf('week')
  const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, 'day')

  return Array.from(new Array(daysToFirstDay).keys())
})

const days = computed(() => {
  const ranges = []
  const startOfRange = viewDate.value.startOf('month').add(-1, 'day')
  const endOfRange = viewDate.value.endOf('month').add(-1, 'day')

  let currentDate = startOfRange

  while (currentDate.isBefore(endOfRange) || currentDate.isSame(endOfRange)) {
    currentDate = currentDate.add(1, 'day')
    ranges.push(currentDate)
  }
  return ranges
})

const shiftMonth = function (amount) {
  viewDate.value = viewDate.value.add(amount, 'month')
}
const reset = function () {
  viewDate.value = dayjs()
}

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
</script>

<template>
  <MainLayout>
    <div class="flex flex-col items-center">
      <div class="w-full flex space-x-2 items-center justify-center">
        <button
          class="bg-primary text-white rounded-xl px-4 py-2"
          @click="shiftMonth('-1')"
        >
          Previous
        </button>
        <span class="text-3xl">{{ viewDate.format('MMMM YYYY') }}</span>
        <button
          class="bg-primary text-white rounded-xl px-4 py-2"
          @click="shiftMonth('-1')"
        >
          Next
        </button>
      </div>
      <button
        class="w-fit text-primary border-b rounded-xl px-4 py-2"
        @click="reset()"
      >
        Today
      </button>
    </div>
    <div class="grid grid-col-7 gap-1">
      <div
        v-for="weekDay in weekDays"
        class="text-center"
      >
        <div>{{ weekDay }}</div>
      </div>
    </div>
    <div class="grid grid-cols-7">
      <div v-for="prepend in daystoPrepend" />
      <div
        v-for="day in days"
        class="border border-slate-200 flex flex-col h-32"
      >
        <div
          :class="[day.isToday() ? 'bg-red-300' : '']"
          class="text-center"
        >
          <div>{{ day.formatTo('D') }}</div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
