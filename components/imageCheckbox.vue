<template>
  <div>
    <input type="checkbox" v-model="isChecked" @change="toggleCheckbox" />
    <img :src="image.src" :alt="image.alt" />
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['image']);
const emits = defineEmits();

const isChecked = ref(false);

const toggleCheckbox = () => {
  emits('toggle', isChecked.value);
};
</script>
