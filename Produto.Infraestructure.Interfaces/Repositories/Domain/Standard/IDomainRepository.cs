using Produto.Infraestructure.Interfaces.Repositories.Standard;

namespace Produto.Infraestructure.Interfaces.Repositories.Domain.Standard
{
    public interface IDomainRepository<TEntity> : IRepositoryAsync<TEntity> where TEntity : class { }
}
