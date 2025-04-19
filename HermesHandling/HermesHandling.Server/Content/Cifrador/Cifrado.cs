using System.Security.Cryptography;
using System.Text;

namespace EjemploCifrado.Helper
{
    public class Cifrado
    {
        public static bool CompareArrays(byte[] a, byte[] b)
        {
            if (a.Length != b.Length)
                return false;
            for (int i = 0; i < a.Length; i++)
                
                if (!a[i].Equals(b[i]))
                    return false;  
            return true;
        }

        public static string GenerateSalt()
        {
            byte[] saltBytes = new byte[16]; // 16 bytes = 128 bits
                                             // Usar RandomNumberGenerator para generar bytes aleatorios
            RandomNumberGenerator.Fill(saltBytes);
            // Convertir el salt a Base64 para almacenamiento seguro
            return Convert.ToBase64String(saltBytes);
        }


        //TENDREMOS UN METODO PARA CIFRAR NUESTRO PASSWORD
        public static byte[] EncryptPassword(string password,string salt)
        {
            string contenido = password + salt;
            SHA512 sHA = SHA512.Create();
            //CONVERTIMOS NUESTRO CONTENIDO A BYTES
            byte[] salida = Encoding.UTF8.GetBytes(contenido);
            //ITERACIONES PARA NUESTRO PASSWORD
            for (int i = 1; i <= 107; i++)
            {
                salida = sHA.ComputeHash(salida);
            }
            sHA.Clear();
            return salida;
        }
    }

}

