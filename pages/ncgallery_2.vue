<template>
  <div class="bg-gray-200 h-screen">
    <div class="flex justify-center">
      <h1 class="text-black text-md font-semibold">
        Caleb S. Lewis Photography
      </h1>
    </div>
    <div class="py-1 flex justify-center">
      <img
        src="/assets/images/NC-Map.png"
        alt="North Carolina Map"
        class="object-cover object-center rounded-lg shadow-lg text-white bg-transparent w-24 h-10"
      />
    </div>
    <div class="py-2 border border-b-2 border-b-gray-400 flex justify-center">
      <h2 class="text-[#159243] text-5xl font-semibold">NC Photo Catalog</h2>
    </div>
    <div class="py-4 px-4 max-h-[75%] overflow-auto">
      <button @click="clickMe()">Click me!</button>
      <ul        
        class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        <div 
          v-for="samplePhoto in photoCatalog.samplePhotos" 
          :key="samplePhoto.imageUrl" 
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
            class="pointer-events-none block text-sm font-medium text-gray-500"
          >
            <div class="grid grid-cols-12">
              <div class=" col-span-8 items-start">
                {{ samplePhoto.size }}
              </div>
              
              <div class="col-span-4 items-end">   
                <!-- <input type="checkbox" v-model="isChecked" /><label class="ml-1 text-xs text-[#159243]"> Add to cart</label> -->
                
                <button @click="addToCart(samplePhoto.id)" class=" text-xs text-[#159243]">
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
import { useCatalogStore } from '../stores/catalog';
import { cartStore } from '../stores/cart';

const photoCatalog = useCatalogStore();
const cart = cartStore();

const isChecked = ref(false);

const addToCart = (ID: number) => {
  console.log('entered addToCart method');
  cart.addToCart(photoCatalog.samplePhotos[ID].title);
  console.log('cart', cart);
};

const clickMe = () => {
  console.log('clicked');
};

</script>

<style scoped></style>
