using Produto.Infraestructure.DBConfiguration;
using Produto.Infraestructure.Interfaces.Repositories.Domain;
using Produto.Infraestructure.Repositories.Standard;

namespace Produto.Infraestructure.Repositories
{
    public class ProdutoRepository : DomainRepository<Domain.Entities.Produto>, IProdutoRepository
    {
        public ProdutoRepository(ApplicationContext dbContext) : base(dbContext) { }
    }
}
