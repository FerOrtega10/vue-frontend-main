<script setup>
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
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
dayjs.extend(isSameOrBefore)

const viewDate = ref(dayjs())

const daysToPrepend = computed(() => {
  const startOfMonth = viewDate.value.startOf('month')
  const startOfFirstWeek = startOfMonth.startOf('week')
  const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, 'day')
  
  return Array.from({ length: daysToFirstDay }, (_, i) => 
    startOfFirstWeek.add(i, 'day')
  )
})

const daysInMonth = computed(() => {
  const startOfMonth = viewDate.value.startOf('month')
  const endOfMonth = viewDate.value.endOf('month')
  const days = []
  
  let currentDate = startOfMonth
  while (currentDate.isSameOrBefore(endOfMonth)) {
    days.push(currentDate)
    currentDate = currentDate.add(1, 'day')
  }
  
  return days
})

const daysToAppend = computed(() => {
  const endOfMonth = viewDate.value.endOf('month')
  const endOfLastWeek = endOfMonth.endOf('week')
  const daysRemaining = endOfLastWeek.diff(endOfMonth, 'day')
  
  return Array.from({ length: daysRemaining }, (_, i) => 
    endOfMonth.add(i + 1, 'day')
  )
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

const getEventsForDay = (day) => {
  const dayString = day.format('YYYY-MM-DD')
  return eventsData.filter(event => event.eventTime === dayString)
}

const getEventClass = (type) => {
  const classes = {
    concert: 'bg-blue-100 text-blue-800 border-blue-200',
    meetup: 'bg-green-100 text-green-800 border-green-200',
    cinema: 'bg-purple-100 text-purple-800 border-purple-200'
  }
  return classes[type] || 'bg-gray-100 text-gray-800 border-gray-200'
}
</script>

<template>
  <MainLayout>
    <div class="flex flex-col items-center">
      <div class="w-full flex space-x-6 items-center justify-center mb-4">
        <button
            class=" text-indigo-600 hover:underline hover:text-indigo-800 px-4 py-2"
            @click="shiftMonth(-1)"
        >
          < Previous
        </button>
          <span class="text-3xl font-bold">{{ viewDate.format('MMMM YYYY') }}</span>
          <button
            class="text-indigo-600 hover:underline hover:text-indigo-800 px-4 py-2"
            @click="shiftMonth(1)"
          >
            Next >
          </button>
        </div>
        <button
          class="text-indigo-600 hover:text-indigo-800 border-b border-indigo-200 px-4 py-1 transition-colors"
          @click="reset()"
        >
          Today
        </button>
      </div>
      <div class="grid grid-cols-7 gap-1 mb-2">
        <div
          v-for="weekDay in weekDays"
          :key="weekDay"
          class="text-center font-semibold text-gray-600 py-2"
        >
          {{ weekDay }}
        </div>
      </div>

      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="day in daysToPrepend"
          :key="day.format('YYYY-MM-DD')"
          class="border border-slate-200 rounded-lg p-2 h-32 bg-gray-50 opacity-50"
        >
          <div class="text-right text-gray-400">
            {{ day.format('D') }}
          </div>
        </div>
        <div
          v-for="day in daysInMonth"
          :key="day.format('YYYY-MM-DD')"
          class="border border-gray-200 rounded-lg p-2 h-32 flex flex-col overflow-hidden"
          :class="{'bg-red-100': day.isToday()}"
        >
          <div class="text-right font-semibold">
            {{ day.format('D') }}
          </div>
          
          <div class="flex-1 mt-1 space-y-1">
            <div
              v-for="event in getEventsForDay(day)"
              :key="event.eventTime + event.type"
              class="text-xs p-1 rounded truncate capitalize"
              :class="getEventClass(event.type)"
              :title="event.title"
            >
              {{ event.type }}
            </div>
          </div>
        </div>

        <div
          v-for="day in daysToAppend"
          :key="day.format('YYYY-MM-DD')"
          class="border border-gray-200 rounded-lg p-2 h-32 bg-gray-50 opacity-50"
        >
          <div class="text-right text-gray-400">
            {{ day.format('D') }}
          </div>
        </div>
      </div>
  </MainLayout>
</template>
