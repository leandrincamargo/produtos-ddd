using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Produto.Infraestructure.DBConfiguration;
using Produto.Infraestructure.Interfaces.Repositories.Domain;
using Produto.Infraestructure.Interfaces.Repositories.Standard;
using Produto.Infraestructure.Repositories;
using Produto.Infraestructure.Repositories.Standard;

namespace Produto.Infraestructure.IoC.ORMs
{
    public class EntityFrameworkIoC : OrmTypes
    {
        internal override IServiceCollection AddOrm(IServiceCollection services, IConfiguration configuration = null)
        {
            IConfiguration dbConnectionSettings = ResolveConfiguration.GetConnectionSettings(configuration);
            string conn = dbConnectionSettings.GetConnectionString("DefaultConnection");
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(conn));

            services.AddScoped(typeof(IRepositoryAsync<>), typeof(RepositoryAsync<>));
            services.AddScoped<IProdutoRepository, ProdutoRepository>();

            return services;
        }
    }
}
