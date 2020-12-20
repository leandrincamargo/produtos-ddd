using Microsoft.Extensions.Configuration;
using Produto.Infraestructure.DBConfiguration;

namespace Produto.Infraestructure.IoC
{
    internal class ResolveConfiguration
    {
        public static IConfiguration GetConnectionSettings(IConfiguration configuration)
        {
            return configuration ?? DatabaseConnection.ConnectionConfiguration;
        }
    }
}
