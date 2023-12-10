<h1 class="nombre-pagina">Crear Servicio</h1>
<p class="descripcion-pagina">Administracion de servicios</p>

<?php
    include_once __DIR__ . "/../templates/barra.php";
?>


<form action="/servicios/crear" method="POST" class="formulario">
    <?php
    include_once __DIR__ . "/../templates/alertas.php";
    include_once __DIR__ . "/formulario.php";
    
    ?>

    <input type="submit" class="boton" value="Guardar Servicio">
</form>