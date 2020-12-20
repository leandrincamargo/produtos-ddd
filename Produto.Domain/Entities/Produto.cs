using System;

namespace Produto.Domain.Entities
{
    public class Produto : IIdentityEntity
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public decimal ValorVenda { get; set; }

        public byte[] Imagem { get; set; }

        public DateTime DataCadastroRegistro { get; set; }

        public DateTime? DataAlteracaoRegistro { get; set; }
    }
}
