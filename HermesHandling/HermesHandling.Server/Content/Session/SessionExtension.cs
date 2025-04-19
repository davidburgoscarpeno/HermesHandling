using Newtonsoft.Json;

namespace Practica6.Helpers
{
    public static class SessionExtension
    {
        //importante this porque debemos pasar la sesión actual
       public static void SetObject(this ISession session, string key, Object value)
        {
            string data = JsonConvert.SerializeObject(value);
            session.SetString(key, data);
        }


        public static T GetObject<T>(this ISession session, string key)
        {
            string data=session.GetString(key);
            if (data==null)
                return default(T);
            return JsonConvert.DeserializeObject<T>(data);
        }
    }
}