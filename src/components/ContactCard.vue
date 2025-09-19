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
  <div class="flex items-center p-3 bg-gray-50 rounded-lg">
    <div class="flex-shrink-0 bg-indigo-500 rounded-full w-10 h-10 flex items-center justify-center text-white">
      <slot name="icon">

      </slot>
    </div>
    <div class="ml-4">
      <p data-testid="contact-card-label" class="text-xs text-gray-500">{{ label }}</p>
      <p data-testid="contact-card-data" class="text-sm font-medium text-gray-900">{{ data }}</p>
    </div>
  </div>
</template>