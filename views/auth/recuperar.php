<h1 class="nombre-pagina">Recuperar Password</h1>

<p class="descripcion-pagina">Coloca tu nuevo password a continuacion</p>

<?php 
include_once __DIR__ . "/../templates/alertas.php";
   ?>

<?php if(!$error){  ?>


<form  class="forumario" method="POST">
    <div class="campo">
        <label for="password">Password</label>
        <input type="password"  id="password" placeholder="Tu nuevo Password" name="password">

    </div>
    <input type="submit" class="boton" value="Guardar">

    <div class="acciones">
    <a href="/">Iniciar sesion</a>
    <a href="/crear-cuenta">¿Aun no tienes cuenta?</a>
</div>

</form>

<?php }?>