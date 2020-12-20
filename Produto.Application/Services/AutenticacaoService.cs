using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Produto.Application.Interfaces.Services;
using Produto.Domain;
using Produto.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Produto.Application.Services
{
    public class AutenticacaoService : IAutenticacaoService
    {
        private readonly string URL = "https://dev.sitemercado.com.br/api/login";

        public async Task<string> Login(LoginDTO loginDTO, string audience)
        {
            await ConsumirApiExterna(loginDTO.Cpf, loginDTO.Senha);
            return GerarToken(loginDTO.Cpf, audience);
        }

        internal async Task ConsumirApiExterna(string cpf, string senha)
        {
            using (var client = new HttpClient())
            {
                var auth = Encoding.UTF8.GetBytes($"{cpf}:{senha}");
                client.DefaultRequestHeaders.Add("Authorization", "Basic " + Convert.ToBase64String(auth));

                var response = await client.PostAsync(URL, null);
                var content = response.Content;

                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                    throw new ValidacaoException($"API Externa retornou o código: {(int)response.StatusCode}.");

                var resultado = JsonConvert.DeserializeObject<Dictionary<string, string>>(await content.ReadAsStringAsync());
                if (!Convert.ToBoolean(resultado.GetValueOrDefault("success")))
                    throw new ValidacaoException("CPF ou Senha inválido.");
            }
        }

        internal string GerarToken(string cpf, string audience)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("CPF", cpf),
                }),
                Issuer = Constante.Issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Constante.ChaveSecreta)), SecurityAlgorithms.HmacSha256),
                Expires = DateTime.UtcNow.AddMinutes(Constante.Minutos),
                NotBefore = DateTime.UtcNow
            });

            return tokenHandler.WriteToken(token);
        }
    }
}
