﻿using System.Text;

namespace Produto.Application
{
    public static class Util
    {
        public static string PreencheArquivo(byte[] conteudoArquivo)
        {
            return Encoding.ASCII.GetString(conteudoArquivo);
        }

        public static byte[] PreencheConteudoArquivo(string arquivo)
        {
            return Encoding.ASCII.GetBytes(arquivo);
        }
    }
}
