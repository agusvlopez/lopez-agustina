<script>

    export default {
    name: 'StatusMessage',
    props: {
        validating: {
            type: Boolean,
            default: false,
        },
        errorColor: 'red'
    }
}
</script>

<template>
    <div
    v-if="validating" 
    class="border-l-4 p-4" role="alert">
        <p class="font-bold">¡Atención!</p>
        <div class="text-sm"><slot>Error en la validación de alguno de los datos ingresados. Por favor, intente nuevamente.</slot> </div>
    </div>
    <div
    v-else
    >
    </div>

</template>