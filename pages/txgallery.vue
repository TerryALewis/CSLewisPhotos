<template>
    <div class="bg-gray-200 h-screen">
      <div class="flex justify-end pt-1 pr-4">
        <NuxtLink to="/cart" class="text-black text-md font-semibold">
        <ShoppingBagIcon class="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        </NuxtLink>
        <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
        >{{ cart.items.length.toString() }}</span
        >  
      </div>
      <div class="flex justify-center">
        <NuxtLink to="/" class="text-black text-md font-semibold">Caleb S. Lewis Photography</NuxtLink>        
      </div>      
      <div class="py-2 border border-b-2 border-b-gray-400 flex justify-center">
        <h2 class="text-[#159243] text-5xl font-semibold">Texas Photo Catalog</h2>
      </div>
      <div class="py-4 px-4 max-h-[75%] overflow-auto">
        <ul        
          class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
        >
          <div 
            v-for="samplePhoto in photoCatalog.txPhotos" 
            :key="samplePhoto._id" 
            class="relative" >
            <li>
            <div
              class="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-[#159243] focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
            >
              <img
                :src="samplePhoto.imageUrl"
                alt=""
                class="pointer-events-none object-cover group-hover:opacity-75"
              />
              <button type="button" class="absolute inset-0 focus:outline-none">
                <span class="sr-only"
                  >View details for {{ samplePhoto.title }}</span
                >
              </button>
            </div>
            <p
              class="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900"
            >
              {{ samplePhoto.title }}
            </p>
  
            <p
              class="pointer-events-auto block text-sm font-medium text-gray-500"
            >
              <div class="grid grid-cols-12">
                <div class="col-span-7 items-start text-xs">
                  ${{ samplePhoto.price }}
                </div>
                
                <div class="col-span-5 items-end">                                   
                  <button @click="addToCart(samplePhoto._id)" class=" text-xs text-[#159243]">
                    <nuxt-icon name="MdiCartOutline" class="text-[#159243] h-3 w-3 inline-block pr-1" />
                    Add to cart  
                  </button>                
                </div>
              </div>
            </p>
          </li>  
          </div>  
        </ul>
      </div>
      <div class="mt-4 py-4 bg-gray-300 border border-t-2 border-t-gray-500">
        <div class="flex justify-center">
          <h1 class="text-black text-md font-semibold">
            Caleb S. Lewis Photography
          </h1>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ShoppingBagIcon } from '@heroicons/vue/24/outline';
  import type { Id } from '~/convex/_generated/dataModel';
  import { useCatalogStore } from '../stores/catalog';
  import { useCartStore } from '../stores/cart';
  
  const photoCatalog = useCatalogStore();
  const cart = useCartStore();
  
  // Load TX photos when component mounts
  onMounted(() => {
    photoCatalog.loadTXPhotos();
  });
  
  const isChecked = ref(false);
  
  const addToCart = async (photoId: Id<'photos'>) => {
    console.log('entered addToCart method');
    await cart.addToCart(photoId, 1);
    console.log('cart', cart);
  };
  
  const clickMe = () => {
    console.log('clicked');
  };
  </script>
  
  <style scoped></style>
  