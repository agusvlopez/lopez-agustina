<script>
    export default {
        name: 'BaseButton'
    }
</script>

<template>
    <button type="submit" class="transition motion-reduce:transition-none bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-500 active:bg-indigo-800 "> <slot>Enviar</slot>
    </button>
</template>