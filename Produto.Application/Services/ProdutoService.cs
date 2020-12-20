using Produto.Application.Interfaces.Services;
using Produto.Application.Services.Standard;
using Produto.Domain;
using Produto.Domain.DTOs;
using Produto.Infraestructure.Interfaces.Repositories.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Produto.Application.Services
{
    public class ProdutoService : ServiceBase<Domain.Entities.Produto>, IProdutoService
    {
        public ProdutoService(IProdutoRepository repository) : base(repository) { }

        public async Task<List<ProdutoDTO>> ObterTodos()
        {
            var lista = await base.GetAllAsync();
            if (!lista.Any())
                throw new ValidacaoException("Nenhum registro encontrado.");

            return lista.Select(x => new ProdutoDTO(x)).ToList();
        }

        public async Task<ProdutoDTO> ObterPorId(int id)
        {
            var aplicacao = await base.GetByIdAsync(id);
            if (aplicacao == null)
                throw new ValidacaoException("Produto não encontrado.");

            return new ProdutoDTO(aplicacao);
        }

        public async Task<string> Cadastrar(ProdutoDTO produtoDto)
        {
            var mensagemErro = Validar(produtoDto);
            if (!string.IsNullOrEmpty(mensagemErro))
                throw new ValidacaoException(mensagemErro);

            var produto = produtoDto.ConverterDtoParaEntity();
            produto.DataCadastroRegistro = DateTime.Now;
            await repository.AddAsync(produto);

            return "Cadastro efetuado com sucesso.";
        }

        public async Task<string> Editar(ProdutoDTO produtoDto)
        {
            var produtoNovo = produtoDto.ConverterDtoParaEntity();
            var produtoAntigo = await base.GetByIdAsync(produtoDto.Id);

            produtoAntigo.Nome = produtoNovo.Nome;
            produtoAntigo.ValorVenda = produtoNovo.ValorVenda;
            produtoAntigo.Imagem = produtoNovo.Imagem;
            produtoAntigo.DataAlteracaoRegistro = DateTime.Now;
            await base.UpdateAsync(produtoAntigo);

            return "Edição efetuada com sucesso.";
        }

        public async Task<string> Excluir(int id)
        {
            var produto = await GetByIdAsync(id);
            if (produto == null)
                throw new ValidacaoException("Produto não encontrado.");

            await base.RemoveAsync(produto);

            return "Produto removido com sucesso.";
        }

        internal string Validar(ProdutoDTO produtoDto)
        {
            if (produtoDto == null)
                return "Request body é obrigatório.";

            var mensagemErro = "";

            if (string.IsNullOrEmpty(produtoDto.Nome))
                mensagemErro += $"O campo '{nameof(produtoDto.Nome)}' é obrigatório.\n";
            if (produtoDto.ValorVenda <= 0)
                mensagemErro += $"O campo '{nameof(produtoDto.ValorVenda)}' não pode ser igual ou menor que zero.\n";
            if (string.IsNullOrEmpty(produtoDto.Imagem))
                mensagemErro += $"O campo '{nameof(produtoDto.Imagem)}' é obrigatório.\n";

            return mensagemErro;
        }
    }
}
