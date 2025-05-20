using HermesHandling.Data.Models;

public class DashboardRepository : IDashboard
{
    private readonly HermesDbContext _context;
    public DashboardRepository(HermesDbContext context)
    {
        _context = context;
    }

    public ResumenDashboard GetResumen()
    {
        var resumen = new ResumenDashboard();
        DateTime haceUnaSemana = DateTime.Now.AddDays(-7);
        DateTime hoy = DateTime.Now.Date;

        resumen.totalUsuarios = _context.Usuarios.Count();
        resumen.nuevosSemana = _context.Usuarios.Where(u => u.FechaCreacion >= haceUnaSemana).Count();
        resumen.admins = _context.Usuarios.Where(u => u.TipoUsuario == 0).Count();
        resumen.usuariosActivos = _context.Usuarios
            .Where(u => u.UltimaSesion.HasValue && u.UltimaSesion.Value.Date == hoy)
            .Count();

        return resumen;
    }
}
