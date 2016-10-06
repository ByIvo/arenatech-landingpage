<%@ WebHandler Language="C#" Class="formularios" %>

using System;
using System.Web;

public class formularios : IHttpHandler
{
    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        /*
        CAMPOS:
            name
            email
            description
        */
        try
        {
            string _nome = context.Request.Form["name"];
            string _email = context.Request.Form["email"];
            string _mensagem = context.Request.Form["description"];

            /* Monta Html que será enviado */
            string htmMensagem = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">"
                                    + "<html xmlns=\"http://www.w3.org/1999/xhtml\">"
                                    + "	<head>"
                                    + "		<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />"
                                    + "		<title>E-mail Arenatech</title>"
                                    + "	</head>"
                                    + "	<body style=\"background: #eeeeee; color: #666666; font-size: 13px; font-family: Arial, Helvetica, sans-serif; line-height: 120%;\">"
                                    + "		<table width=\"600\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">"
                                    + "			<!-- Assunto -->"
                                    + "			<tr><td style=\"padding: 13px 15px; border: 1px solid #ccc; background: #DADADA; font-size: 16px; font-weight: bold; text-align: center;\">Nova mensagem, fale conosco</td></tr>"
                                    + "			<!-- Corpo do e-mail -->"
                                    + "			<tr>"
                                    + "				<td style=\"padding: 15px;\">"
                                    + "					<h3><strong style=\"font-size: 14px;\">Olá, </strong></h3>"
                                    + "					Você acaba de receber uma mensagem enviada pelo formulário <strong>FALE CONOSCO</strong> do site."
                                    + "				</td>"
                                    + "			</tr>"
                                    + "			<tr>"
                                    + "				<td style=\"padding: 15px;\">"
                                    + "					<p><strong>Informações do contato:</strong></span><br />"
                                    + "					<ul style=\"display: block; overflow: hidden; background: #FFF1B9; border: 1px solid #FFD275; padding: 15px; list-style-type: none; line-height: 150%;\">"
                                    + "						<li><strong>Nome: </strong> " + _nome + "</li>"
                                    + "						<li><strong>Email: </strong> " + _email + "</li>"
                                    + "						<li><strong>Mensagem: </strong><br /> " + _mensagem.Replace("\n", "<br />") + "</li>"
                                    + "					</ul>"
                                    + "				</td>"
                                    + "			</tr>"
                                    + "			<!-- /Corpo do e-mail -->"
                                    + "         <tr><td style=\"padding: 13px 15px; border: 1px solid #ccc; background: #DADADA; font-size: 13px; text-align: center;\">" + DateTime.Now.Year.ToString() + ". Arenatech. Todos os direitos reservados.</td></tr>"
                                    + "         <tr><td align=\"center\">*** Este é um e-mail automático e não é necessário respondê-lo ***</td></tr>"
                                    + "		</table>"
                                    + "	</body>"
                                    + "</html>";
            /* .Monta Html que será enviado */

            if (SendMail.DispatchEmail(new SendMail("centrodeinovacaoetecnologia@gmail.com", "Centro De Inovação e Tecnologia", _email, "Novo e-mail: " + _nome + "", htmMensagem)))
                context.Response.Write("1");
            else
                context.Response.Write("2");
        }
        catch
        {
            context.Response.Write("2");
        }
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }
}