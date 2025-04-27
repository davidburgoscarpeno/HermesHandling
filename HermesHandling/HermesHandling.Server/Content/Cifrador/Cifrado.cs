using System.Security.Cryptography;
using System.Text;

namespace EjemploCifrado.Helper
{
    public class Cifrado
    {
        // Método para comparar dos arrays de bytes de manera segura
        public static bool CompareArrays(byte[] a, byte[] b)
        {
            if (a.Length != b.Length)
                return false;

            for (int i = 0; i < a.Length; i++)
            {
                if (!a[i].Equals(b[i]))
                    return false;
            }
            return true;
        }

        // Método para generar una sal segura
        public static string GenerateSalt()
        {
            byte[] saltBytes = new byte[16]; // 16 bytes = 128 bits
            RandomNumberGenerator.Fill(saltBytes);
            return Convert.ToBase64String(saltBytes);
        }

        // Método para hashear un password usando PBKDF2
        public static string HashPassword(string password, string salt)
        {
            // Convertimos la sal y el password en bytes
            byte[] saltBytes = Convert.FromBase64String(salt);
            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);

            // Usamos Rfc2898DeriveBytes (PBKDF2)
            using (var pbkdf2 = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 10000, HashAlgorithmName.SHA512))
            {
                byte[] hashBytes = pbkdf2.GetBytes(64); // 64 bytes = 512 bits
                return Convert.ToBase64String(hashBytes);
            }
        }

        // Método para verificar si un password coincide con su hash
        public static bool VerifyPassword(string password, string salt, string hashedPassword)
        {
            string newHashedPassword = HashPassword(password, salt);
            return newHashedPassword == hashedPassword;
        }
    }
}