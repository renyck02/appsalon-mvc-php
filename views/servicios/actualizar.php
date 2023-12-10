<h1 class="nombre-pagina">Actualizar Servicio</h1>
<p class="descripcion-pagina">Modifica los campos para actualizar los datos</p>

<?php
    include_once __DIR__ . "/../templates/barra.php";
?>


<form method="POST" class="formulario">
    <?php
    include_once __DIR__ . "/../templates/alertas.php";
    include_once __DIR__ . "/formulario.php";
    
    ?>

    <input type="submit" class="boton" value="Actualizar">
</form>