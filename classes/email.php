<?php
namespace Classes;
use PHPMailer\PHPMailer\PHPMailer;

class email {
    public $email;
    public $nombre;
    public $token;
    public function __construct($email, $nombre,  $token){
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;

    }

    public function enviarConfirmacion(){
        // crear el objecto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV["EMAIL_HOST"];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV["EMAIL_USER"];
        $mail->Password = $_ENV["EMAIL_PASS"];
        $mail->SMTPSecure =  "tls"; // forma que se usa hoy en dia para enviar correos de manera segura
        $mail->Port = $_ENV["EMAIL_PORT"];

        $mail->setFrom("cuentas@appsalon.com");
        $mail->addAddress("reneclass2@gmail.com", "AppSalon.com");
        $mail->Subject = "Confirma tu cuenta";

        // set HTML
        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";
        $contenido = "<html>";  
        $contenido .= " <p><strong>Hola ". $this->nombre .  "<strong> Has creado tu cuenta en App Salon,solo debes confirmarla presionandoel siguiente enlace </p>";
        $contenido .= "<p>Preciona aquí: <a href=' " .$_ENV['APP_URL'].  "/confirmar-cuenta?token=" .$this->token . "'>Confirmar cuenta</a> </p>";
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puede ignorar el mensaje </p>";
        $contenido .= "</html>";  

        $mail->Body = $contenido;
    
        // enviar el mail
        $mail->send();

    }

    public function enviarInstrucciones (){
        // crear el objecto de email
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = $_ENV["EMAIL_HOST"];
        $mail->SMTPAuth = true;
        $mail->Username = $_ENV["EMAIL_USER"];
        $mail->Password = $_ENV["EMAIL_PASS"];
        $mail->SMTPSecure =  "tls"; // forma que se usa hoy en dia para enviar correos de manera segura
        $mail->Port = $_ENV["EMAIL_PORT"];

        $mail->setFrom("cuentas@appsalon.com");
        $mail->addAddress("reneclass2@gmail.com", "AppSalon.com");
        $mail->Subject = "Restablece tu password";

        // set HTML
        $mail->isHTML(true);
        $mail->CharSet = "UTF-8";
        $contenido = "<html>";  
        $contenido .= " <p><strong>Hola ". $this->nombre .  "<strong> Has solicitado restablecer tu password </p>";
        $contenido .= "<p>Preciona aquí: <a href=' " .$_ENV['APP_URL'].  "/recuperar?token=" .$this->token . "'>Restablecer Password</a> </p>";
        $contenido .= "<p>Si tu no solicitaste el cambio de Password, puede ignorar el mensaje </p>";
        $contenido .= "</html>";  

        $mail->Body = $contenido;
    
        // enviar el mail
        $mail->send();
    }
}