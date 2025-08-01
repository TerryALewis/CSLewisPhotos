<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-4">Convex Debug Page</h1>

    <div class="mb-4">
      <h2 class="text-lg font-semibold">Environment Variables:</h2>
      <p>Convex URL: {{ convexUrl }}</p>
    </div>

    <div class="mb-4">
      <h2 class="text-lg font-semibold">Store Status:</h2>
      <p>Loading: {{ catalog.loading }}</p>
      <p>NC Photos count: {{ catalog.ncPhotos.length }}</p>
      <p>TX Photos count: {{ catalog.txPhotos.length }}</p>
    </div>

    <div class="mb-4">
      <button
        @click="loadPhotos"
        class="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        :disabled="catalog.loading"
      >
        Load NC Photos
      </button>
      <button
        @click="testDirectQuery"
        class="bg-green-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        Test Direct Query
      </button>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-100 text-red-700">
      Error: {{ error }}
    </div>

    <div v-if="directResult" class="mb-4">
      <h2 class="text-lg font-semibold">Direct Query Result:</h2>
      <pre class="bg-gray-100 p-4 text-sm overflow-auto">{{
        JSON.stringify(directResult, null, 2)
      }}</pre>
    </div>

    <div class="mb-4">
      <h2 class="text-lg font-semibold">NC Photos:</h2>
      <pre class="bg-gray-100 p-4 text-sm overflow-auto">{{
        JSON.stringify(catalog.ncPhotos, null, 2)
      }}</pre>
    </div>
  </div>
</template>

<script setup>
import { api } from '~/convex/_generated/api';
import { useCatalogStore } from '../stores/catalog';

const config = useRuntimeConfig();
const catalog = useCatalogStore();
const error = ref(null);
const directResult = ref(null);
const loading = ref(false);

const convexUrl = config.public.convexUrl;

const loadPhotos = async () => {
  try {
    error.value = null;
    await catalog.loadNCPhotos();
  } catch (e) {
    error.value = e.message;
    console.error('Error loading photos:', e);
  }
};

const testDirectQuery = async () => {
  try {
    loading.value = true;
    error.value = null;
    const { $convex } = useNuxtApp();

    console.log('Testing direct query...');
    console.log('Convex client:', $convex);
    console.log('API:', api.photos.getPhotosByCategory);

    const result = await $convex.query(api.photos.getPhotosByCategory, {
      category: 'NC',
    });

    console.log('Direct query result:', result);
    directResult.value = result;
  } catch (e) {
    error.value = e.message || 'Unknown error';
    console.error('Error in direct query:', e);
  } finally {
    loading.value = false;
  }
};

// Auto-load on mount
onMounted(() => {
  console.log('Debug page mounted');
  loadPhotos();
});
</script>
