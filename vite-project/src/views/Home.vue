<template>
  <div class="flex justify-around">
    
    <div class="flex w-1/2 bg-black h-screen border-solid border-4 border-white rounded-lg">
     <div class="relative w-full">
      <img class="absolute w-3/4 aspect-[5/4]" src="../assets/RecoHub (1).png" alt="">
      </div>
      <div>

      <div id="burgerContent" class="w-full p-3 mr-24 mt-3 border-2 border-aolid border-white rounded">
        <p class="text-white"  >TOP 100 of Companies </p>
        <p class="text-white"  >Categories</p>
        <p class="text-white"  >About Us</p>
        <p class="text-white"  >Contact Us</p>
        
      </div>
    </div>
  </div>
    <form action="" class="w-10/12 flex items-center">
      <div class="flex flex-col items-center w-full">
        <input class="mb-4 placeholder:text-stone-950 rounded border-solid border-2 border-black p-2 placeholder:text-center placeholder:italic placeholder:text-sm w-9/12" type="text" placeholder="Search for best companies in your city" />
        <button class="bg-black text-white rounded p-2 w-4/12">Search</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const burgerParts = ref(["TOP 100", "Categories", "About Us", "Contact Us"])


</script>
