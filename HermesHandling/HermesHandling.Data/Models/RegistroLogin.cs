using System;
using System.Collections.Generic;

namespace HermesHandling.Data.Models;

public partial class RegistroLogin
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime Fecha { get; set; }
}
