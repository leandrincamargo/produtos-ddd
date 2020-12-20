using Microsoft.AspNetCore.Mvc;
using Produto.Application.Interfaces.Services;
using Produto.Domain;
using Produto.Domain.DTOs;
using System;
using System.Threading.Tasks;

namespace Produto.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacaoController : ControllerBase
    {
        private readonly IAutenticacaoService _autenticacaoService;

        public AutenticacaoController(IAutenticacaoService autenticacaoService)
        {
            _autenticacaoService = autenticacaoService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromHeader] string audience, [FromBody] LoginDTO loginDTO)
        {
            try
            {
                var resultado = await _autenticacaoService.Login(loginDTO, audience);
                return Ok(Resultado<string>.OK(resultado));
            }
            catch (ValidacaoException e)
            {
                return Ok(Resultado<string>.Erro(e.Message));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
