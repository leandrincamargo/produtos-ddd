namespace Produto.Domain.DTOs
{
    public class ProdutoDTO
    {
        public int Id { get; set; }

        public string Nome { get; set; }

        public decimal ValorVenda { get; set; }

        public string Imagem { get; set; }

        public ProdutoDTO() { }

        public ProdutoDTO(Entities.Produto produto)
        {
            ConverterentityParaDto(produto);
        }

        public Entities.Produto ConverterDtoParaEntity()
        {
            return new Entities.Produto()
            {
                Id = this.Id,
                Nome = this.Nome,
                ValorVenda = this.ValorVenda,
                Imagem = this.Imagem != null ? Util.PreencheConteudoArquivo(this.Imagem) : null
            };
        }

        internal void ConverterentityParaDto(Entities.Produto produto)
        {
            this.Id = produto.Id;
            this.Nome = produto.Nome;
            this.ValorVenda = produto.ValorVenda;

            if (produto.Imagem != null)
                this.Imagem = Util.PreencheArquivo(produto.Imagem);
        }
    }
}
