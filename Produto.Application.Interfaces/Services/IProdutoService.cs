using Produto.Application.Interfaces.Services.Standard;
using Produto.Domain.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Produto.Application.Interfaces.Services
{
    public interface IProdutoService : IServiceBase<Domain.Entities.Produto>
    {
        Task<List<ProdutoDTO>> ObterTodos();
        Task<ProdutoDTO> ObterPorId(int id);
        Task<string> Cadastrar(ProdutoDTO produtoDto);
        Task<string> Editar(ProdutoDTO produtoDto);
        Task<string> Excluir(int id);
    }
}
