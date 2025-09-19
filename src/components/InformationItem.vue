<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
	data: {
    type: String,
    required: true
  },
})
</script>

<template>
  <div>
    <p class="text-xs text-gray-500">{{ label }}</p>
    <p class="text-sm font-medium text-gray-900">{{ data }}</p>
  </div>
</template>