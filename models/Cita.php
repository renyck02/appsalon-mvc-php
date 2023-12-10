<?php

namespace Model;

class Cita  extends ActiveRecord{
    protected static $tabla = "citas";
    protected static $columnasDB = ["id","fecha", "hora", "usuario_id"];

    public $id;
    public $fecha;
    public $hora;
    public $usuario_id;

    public function __construct($args = []){
        $this->id = $args["id"] ?? null;
        $this->fecha = $args["fecha"] ?? "";
        $this->hora = $args["hora"] ?? "";
        $this->usuario_id = $args["usuario_id"] ?? "";
    }
}