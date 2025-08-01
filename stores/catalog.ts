import { api } from '~/convex/_generated/api';
import type { Doc } from '~/convex/_generated/dataModel';

export const useCatalogStore = defineStore('catalog', () => {
  const { $convex } = useNuxtApp();

  const ncPhotos = ref<Doc<'photos'>[]>([]);
  const txPhotos = ref<Doc<'photos'>[]>([]);
  const loading = ref(false);

  // Define galleries for navigation
  const galleries = ref([
    { id: 1, title: 'North Carolina', href: '/ncgallery' },
    { id: 2, title: 'Texas', href: '/txgallery' },
  ]);

  // Computed getter for gallery links (to match original implementation)
  const getGalleriesLinks = computed(() => {
    return galleries.value.map((gallery) => ({
      id: gallery.id,
      title: gallery.title,
      href: gallery.href,
    }));
  });

  const loadNCPhotos = async () => {
    loading.value = true;
    try {
      console.log('Starting to load NC photos...');
      console.log('Convex client:', $convex);

      if (!$convex) {
        throw new Error('Convex client not available');
      }

      console.log('API query:', api.photos.getPhotosByCategory);

      const result = await $convex.query(api.photos.getPhotosByCategory, {
        category: 'NC',
      });

      console.log('NC photos result:', result);
      ncPhotos.value = result;
    } catch (error) {
      console.error('Error loading NC photos:', error);
      if (error instanceof Error) {
        console.error('Error details:', error.message, error.stack);
      }
    } finally {
      loading.value = false;
    }
  };

  const loadTXPhotos = async () => {
    loading.value = true;
    try {
      txPhotos.value = await $convex.query(api.photos.getPhotosByCategory, {
        category: 'TX',
      });
    } catch (error) {
      console.error('Error loading TX photos:', error);
    } finally {
      loading.value = false;
    }
  };

  return {
    ncPhotos,
    txPhotos,
    loading,
    galleries,
    getGalleriesLinks,
    loadNCPhotos,
    loadTXPhotos,
  };
});
