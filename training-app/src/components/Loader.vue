<script>

export default {
    name: 'Loader',
    props: {
        size: {
            type: String,
            default: 'normal'   
        },
    },
    computed: {
        loaderClass() {
            return {
                'loader-sm': this.size === 'small',
                'loader': this.size === 'normal'
            }
        }
    }
}

</script>

<template>

    <div :class="loaderClass">
        <div class="sr-only">Cargando...</div>
    </div>
</template>