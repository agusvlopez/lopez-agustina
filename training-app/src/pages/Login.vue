<script>

export default {
        name: 'Login',
    }

</script>

<template>
    <h1>Ingresar a mi Cuenta</h1>

    <form 
    action="#"
    >
        <div class="mb-3">
            <label for="email">Email</label>
            <input
                type="email" 
                id="email"
                
            />
        </div>
        <div class="mb-3">
            <label for="password">Contraseña</label>
            <input
                type="password" 
                id="password"
                
            />
        </div>
        <button>Ingresar</button>
    </form>
</template>