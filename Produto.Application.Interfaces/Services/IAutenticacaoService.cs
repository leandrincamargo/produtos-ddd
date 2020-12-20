using Produto.Domain.DTOs;
using System.Threading.Tasks;

namespace Produto.Application.Interfaces.Services
{
    public interface IAutenticacaoService
    {
        Task<string> Login(LoginDTO loginDTO, string audience);
    }
}
