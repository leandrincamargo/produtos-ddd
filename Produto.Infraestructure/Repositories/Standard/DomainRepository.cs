using Microsoft.EntityFrameworkCore;
using Produto.Domain.Entities;
using Produto.Infraestructure.Interfaces.Repositories.Domain.Standard;

namespace Produto.Infraestructure.Repositories.Standard
{
    public class DomainRepository<TEntity> : RepositoryAsync<TEntity>, IDomainRepository<TEntity> where TEntity : class, IIdentityEntity
    {
        protected DomainRepository(DbContext dbContext) : base(dbContext) { }
    }
}
