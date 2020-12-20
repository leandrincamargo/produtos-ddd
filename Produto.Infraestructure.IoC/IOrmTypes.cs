using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Produto.Infraestructure.IoC
{
    public interface IOrmTypes
    {
        IServiceCollection ResolveOrm(IServiceCollection services, IConfiguration configuration = null);
    }
}
