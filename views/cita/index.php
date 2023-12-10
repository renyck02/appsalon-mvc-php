<h1 class="nombre-pagina">Crear nueva cita</h1>
<p class="descripcion-pagina">Elige tus servicios a continuacion</p>

<?php
    include_once __DIR__ . "/../templates/barra.php"
?>


<div id="app">
    <nav class="tabs">
        <button type="button" data-paso="1" >Servicios</button>
        <button type="button" data-paso="2">Informacion</button>
        <button type="button" data-paso="3">Resumen</button>
    </nav>
    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuacion</p>
        <div class="listado-servicios" id="servicios"></div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Tus datos y cita</h2>
        <p class="text-center">Coloca tus datos y fecha de tu cita</p>
        <form  class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input type="text" id="nombre" placeholder="Tu nombre" value="<?php echo $nombre; ?>" disabled>
            </div>
            <div class="campo">
                <label for="fecha">Fecha</label>
                <input type="date" id="fecha" min="<?php echo date("Y-m-d" , strtotime("+1 day ")); ?>"> <!-- strtotime convierte un string a tiempo-->
                
            </div>

            <div class="campo">
                <label for="hora">Hora</label>
                <input type="time" id="hora">
            </div>
            <input type="hidden" id="id" value="<?php echo $id; ?>">
        </form>
        </div>

        <div id="paso-3" class="seccion contenido-resumen" >
        <h2>Resumen</h2>
        <p>Verifica que la informacion sea correcta</p>
        </div>

        <div class="paginacion">
            <button id="anterior" class="boton" >
                &laquo; Anterior
            </button>

            <button id="siguiente" class="boton" >
                &raquo; Siguiente
            </button>
        </div>

</div>

<?php 
    $script = "
    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
    <script src='build/js/app.js'> </script>
    ";
?>