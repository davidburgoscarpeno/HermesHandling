using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HermesHandling.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "companias",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    codigo_icao = table.Column<string>(type: "varchar(4)", unicode: false, maxLength: 4, nullable: false),
                    pais = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    activa = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__compania__3213E83FAC57B8BA", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ConfigurationKeys",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    clave = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    valor = table.Column<string>(type: "text", nullable: false),
                    descripcion = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    tipo = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    activa = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    fecha_creacion = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    fecha_modificacion = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Configur__3213E83F1E5DA645", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "equipos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    estado = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: true),
                    fecha_creacion = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    fecha_ultima_revision = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__equipos__3213E83FA945819B", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "usuarios",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    apellido = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    email = table.Column<string>(type: "varchar(150)", unicode: false, maxLength: 150, nullable: false),
                    contraseña = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    salt = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    tipo_usuario = table.Column<int>(type: "int", nullable: false),
                    compania_id = table.Column<int>(type: "int", nullable: true),
                    activo = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    fecha_creacion = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    fecha_modificacion = table.Column<DateTime>(type: "datetime", nullable: true),
                    ultima_sesion = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__usuarios__3213E83F398390ED", x => x.id);
                    table.ForeignKey(
                        name: "FK__usuarios__compan__6383C8BA",
                        column: x => x.compania_id,
                        principalTable: "companias",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "incidencias",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    titulo = table.Column<string>(type: "varchar(200)", unicode: false, maxLength: 200, nullable: false),
                    descripcion = table.Column<string>(type: "text", nullable: true),
                    estado = table.Column<string>(type: "varchar(50)", unicode: false, maxLength: 50, nullable: false, defaultValue: "abierta"),
                    prioridad = table.Column<string>(type: "varchar(20)", unicode: false, maxLength: 20, nullable: true, defaultValue: "media"),
                    alta_id = table.Column<int>(type: "int", nullable: false),
                    modificacion_id = table.Column<int>(type: "int", nullable: true),
                    fecha_creacion = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    fecha_modificacion = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__incidenc__3213E83FB5C70A36", x => x.id);
                    table.ForeignKey(
                        name: "FK__incidenci__alta___6477ECF3",
                        column: x => x.alta_id,
                        principalTable: "usuarios",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__incidenci__modif__656C112C",
                        column: x => x.modificacion_id,
                        principalTable: "usuarios",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "mantenimientos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    equipo_id = table.Column<int>(type: "int", nullable: true),
                    tipo_mantenimiento = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    descripcion = table.Column<string>(type: "text", nullable: true),
                    fecha_mantenimiento = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    usuario_id = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__mantenim__3213E83F25639924", x => x.id);
                    table.ForeignKey(
                        name: "FK__mantenimi__equip__68487DD7",
                        column: x => x.equipo_id,
                        principalTable: "equipos",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__mantenimi__usuar__693CA210",
                        column: x => x.usuario_id,
                        principalTable: "usuarios",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "historial_incidencias",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    incidencia_id = table.Column<int>(type: "int", nullable: true),
                    usuario_id = table.Column<int>(type: "int", nullable: true),
                    accion = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    comentario = table.Column<string>(type: "text", nullable: true),
                    fecha_accion = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__historia__3213E83F294DCF02", x => x.id);
                    table.ForeignKey(
                        name: "FK__historial__incid__66603565",
                        column: x => x.incidencia_id,
                        principalTable: "incidencias",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK__historial__usuar__6754599E",
                        column: x => x.usuario_id,
                        principalTable: "usuarios",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "UQ__compania__72AFBCC67DC372DB",
                table: "companias",
                column: "nombre",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__compania__8F6B95982CF76666",
                table: "companias",
                column: "codigo_icao",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Configur__71DCA3DB5A040AD2",
                table: "ConfigurationKeys",
                column: "clave",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_historial_incidencias_incidencia_id",
                table: "historial_incidencias",
                column: "incidencia_id");

            migrationBuilder.CreateIndex(
                name: "IX_historial_incidencias_usuario_id",
                table: "historial_incidencias",
                column: "usuario_id");

            migrationBuilder.CreateIndex(
                name: "IX_incidencias_alta_id",
                table: "incidencias",
                column: "alta_id");

            migrationBuilder.CreateIndex(
                name: "IX_incidencias_modificacion_id",
                table: "incidencias",
                column: "modificacion_id");

            migrationBuilder.CreateIndex(
                name: "IX_mantenimientos_equipo_id",
                table: "mantenimientos",
                column: "equipo_id");

            migrationBuilder.CreateIndex(
                name: "IX_mantenimientos_usuario_id",
                table: "mantenimientos",
                column: "usuario_id");

            migrationBuilder.CreateIndex(
                name: "IX_usuarios_compania_id",
                table: "usuarios",
                column: "compania_id");

            migrationBuilder.CreateIndex(
                name: "UQ__usuarios__AB6E616404D5919E",
                table: "usuarios",
                column: "email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ConfigurationKeys");

            migrationBuilder.DropTable(
                name: "historial_incidencias");

            migrationBuilder.DropTable(
                name: "mantenimientos");

            migrationBuilder.DropTable(
                name: "incidencias");

            migrationBuilder.DropTable(
                name: "equipos");

            migrationBuilder.DropTable(
                name: "usuarios");

            migrationBuilder.DropTable(
                name: "companias");
        }
    }
}
