using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Produto.Application.Interfaces.Services;
using Produto.Domain;
using Produto.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Produto.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        private readonly IProdutoService _produtoService;

        public ProdutoController(IProdutoService produtoService)
        {
            _produtoService = produtoService;
        }

        [HttpGet("ObterTodos")]
        public async Task<IActionResult> ObterTodos()
        {
            try
            {
                var resultado = await _produtoService.ObterTodos();
                return Ok(Resultado<List<ProdutoDTO>>.OK(resultado));
            }
            catch (ValidacaoException e)
            {
                return Ok(Resultado<List<ProdutoDTO>>.Erro(e.Message));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("ObterPorId")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            try
            {
                var resultado = await _produtoService.ObterPorId(id);
                return Ok(Resultado<ProdutoDTO>.OK(resultado));
            }
            catch (ValidacaoException e)
            {
                return Ok(Resultado<ProdutoDTO>.Erro(e.Message));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("Cadastrar")]
        public async Task<IActionResult> Cadastrar([FromBody] ProdutoDTO produtoDto)
        {
            try
            {
                var resultado = await _produtoService.Cadastrar(produtoDto);
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

        [HttpPut("Editar")]
        public async Task<IActionResult> Editar([FromBody] ProdutoDTO produtoDto)
        {
            try
            {
                var resultado = await _produtoService.Editar(produtoDto);
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

        [HttpDelete("Excluir")]
        public async Task<IActionResult> Excluir(int id)
        {
            try
            {
                var resultado = await _produtoService.Excluir(id);
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
