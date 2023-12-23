<template>
  <div class="mt-4 flex justify-center">
    <h1 class=" text-black text-md font-semibold">Caleb S. Lewis Photography</h1>
  </div>
  <div class="py-1 flex justify-center">
      <img
              src="/assets/images/NC-Map.png"
              alt="North Carolina Map"
              class="object-cover object-center rounded-lg shadow-lg text-white bg-transparent w-24 h-10"
            />
  </div>
  <div class="py-1 flex justify-center">
    <h2 class="text-[#159243] text-5xl font-semibold">NC Photo Catalog</h2>
  </div>
  <div class="container my-12 mx-auto px-2 sm:px-28 md:px-12 lg:px-40 xl:px-60 2xl:px-32">
    <div class="flex flex-wrap -mx-1   lg:-mx-4">
      <!-- Column -->
      <div v-for="samplePhoto in photoCatalog.samplePhotos"
          :key="samplePhoto.id" class="my-2 px-1 w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/4 md:px-2 lg:my-4 lg:px-4 xl:pl-4 xl:pr-4 2xl:pl-1 2xl:pr-1">
        <!-- Article -->
        <article
          class="overflow-hidden rounded-lg shadow-lg"
        >
        <div class=" bg-gray-200 ">
          <div class="grid grid-cols-12">
            <div class="col-span-8">
              <img
            :alt= samplePhoto.title
            :src = samplePhoto.imageUrl
            class="border-t-0 border-l-0 border-r-black border-b-black border-2"
          />
            </div>
            <div class="col-span-4 px-3 flex justify-center items-center ">
              <h1 class="text-[#159243] text-xs font-semibold">{{ samplePhoto.title }}</h1>                
            </div>
          </div>
            
          <header
            class="leading-tight p-2 md:p-4"
          >
          <div class="grid grid-cols-12">
            <div class="col-span-7 items-center md:col-span-5 lg:col-span-4 xl:col-span-4 2xl:col-span-4">
              <p class="text-xs"><i-mdi:cart-outline class="h-4 w-4 text-black inline-block" /><a class="no-underline pl-1 hover:no-underline text-[#159243]  font-bold " href="#">Add to Cart</a></p>
            </div>
            <div class="col-span-5 md:col-span-7 lg:col-span-8 xl:col-span-8 2xl:col-span-8">
              <p class="flex justify-end text-grey-darker text-xs md:text-xs lg:text-xs">
                          Released: <p class="px-2 font-bold text-xs md:text-xs ">{{ samplePhoto.creationDate }}</p>
                        </p>
            </div>
          </div>
          </header>        
          </div>          
        </article>      
      </div>      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogStore } from '../stores/catalog'
const photoCatalog = useCatalogStore();
console.log('photoCatalog', photoCatalog.samplePhotos);


</script>

<style scoped></style>
