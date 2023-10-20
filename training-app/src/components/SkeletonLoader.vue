<script>

export default {
    name: 'SkeletonLoader',

}
</script>

<template>
<div class="sr-only">Cargando...</div>
<div class="border border-indigo-300 shadow p-5 m-5 max-w-full w-96 mx-auto">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-slate-200 h-20 w-20"></div>
    <div class="flex-1 space-y-7 py-2">
      <div class="h-2 bg-slate-300 rounded"></div>
      <div class="space-y-5">
        <div class="grid grid-cols-3 gap-3">
          <div class="h-2 bg-slate-300 rounded col-span-2"></div>
          <div class="h-2 bg-slate-300 rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-slate-300 rounded"></div>
      </div>
    </div>
  </div>
</div>
</template>