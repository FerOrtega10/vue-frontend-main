<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
      <h2 class="text-xl font-semibold text-gray-800">{{ title }}</h2>
    </div>
    <slot></slot>
  </div>
</template>