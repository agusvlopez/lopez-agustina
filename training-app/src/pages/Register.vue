<script>
    export default {
        name: 'Register',
    }
</script>

<template>
    <h1>Crear cuenta en Training App</h1>

    <form action="#">
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
       <button>Crear Cuenta</button>
    </form>
</template>