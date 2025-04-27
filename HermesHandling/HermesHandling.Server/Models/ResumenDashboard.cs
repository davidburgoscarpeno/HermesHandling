namespace HermesHandling.Server.Models
{
    public class ResumenDashboard
    {
        public int totalUsuarios { get; set; }
        public int usuariosActivos { get; set; }
        public int nuevosSemana { get; set; }
        public int admins { get; set; }



    }
    public class DashboardData
    {
        public string dia {  get; set; }
        public int cantidad { get; set; }
    }
}
