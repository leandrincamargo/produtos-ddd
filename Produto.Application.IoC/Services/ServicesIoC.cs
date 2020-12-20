using Microsoft.Extensions.DependencyInjection;
using Produto.Application.Interfaces.Services;
using Produto.Application.Interfaces.Services.Standard;
using Produto.Application.Services;
using Produto.Application.Services.Standard;

namespace Produto.Application.IoC.Services
{
    public static class ServicesIoC
    {
        public static void ApplicationServicesIoC(this IServiceCollection services)
        {
            services.AddScoped(typeof(IServiceBase<>), typeof(ServiceBase<>));

            services.AddScoped<IAutenticacaoService, AutenticacaoService>();
            services.AddScoped<IProdutoService, ProdutoService>();
        }
    }
}
