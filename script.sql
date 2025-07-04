USE [HermesHandling]
GO
/****** Object:  Table [dbo].[categorias_equipos]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categorias_equipos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[descripcion] [varchar](255) NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_modificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[comunicaciones]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[comunicaciones](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[asunto] [varchar](100) NULL,
	[mensaje] [text] NULL,
	[path_documento] [varchar](255) NULL,
	[fecha_publicacion] [datetime] NULL,
	[id_usuario_alta] [int] NULL,
	[fecha_alta] [datetime] NULL,
	[id_usuario_modificacion] [int] NULL,
	[fecha_modificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ConfigurationKeys]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ConfigurationKeys](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[clave] [varchar](100) NOT NULL,
	[valor] [text] NOT NULL,
	[descripcion] [varchar](255) NULL,
	[tipo] [varchar](50) NULL,
	[activa] [bit] NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_modificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
UNIQUE NONCLUSTERED 
(
	[clave] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[defectos_reportados]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[defectos_reportados](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[reporte_id] [int] NULL,
	[tipo_defecto_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[documentacion_interna]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[documentacion_interna](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](255) NULL,
	[path_documento] [varchar](255) NULL,
	[id_usuario_alta] [int] NULL,
	[fecha_alta] [datetime] NULL,
	[id_usuario_modificacion] [int] NULL,
	[fecha_modificacion] [datetime] NULL,
	[activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[equipos]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[equipos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[asset_id] [varchar](100) NULL,
	[nombre] [varchar](100) NOT NULL,
	[descripcion] [varchar](255) NULL,
	[tipo_equipo_id] [int] NULL,
	[estado] [varchar](50) NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_ultima_revision] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[historial_incidencias]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[historial_incidencias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[incidencia_id] [int] NULL,
	[usuario_id] [int] NULL,
	[accion] [varchar](100) NULL,
	[comentario] [text] NULL,
	[fecha_accion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[incidencias]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[incidencias](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[titulo] [varchar](200) NOT NULL,
	[descripcion] [text] NULL,
	[estado] [varchar](20) NULL,
	[prioridad] [varchar](20) NULL,
	[alta_id] [int] NULL,
	[modificacion_id] [int] NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_modificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mantenimientos]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mantenimientos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[equipo_id] [int] NULL,
	[tipo_mantenimiento] [varchar](100) NULL,
	[descripcion] [text] NULL,
	[fecha_mantenimiento] [datetime] NULL,
	[usuario_id] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reportes]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reportes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[equipo_id] [int] NULL,
	[usuario_id] [int] NULL,
	[ubicacion] [varchar](255) NULL,
	[observaciones] [text] NULL,
	[fecha_creacion] [datetime2](3) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reportes_documentos]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reportes_documentos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[reporte_id] [int] NULL,
	[nombre] [varchar](255) NULL,
	[path_documento] [varchar](255) NULL,
	[tipo_documento] [varchar](50) NULL,
	[fecha_subida] [datetime] NULL,
	[usuario_id] [int] NULL,
	[activo] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipos_defectos]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipos_defectos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NULL,
	[descripcion] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tipos_equipos]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tipos_equipos](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[descripcion] [varchar](255) NULL,
	[categoria_equipo_id] [int] NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_modificacion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuarios]    Script Date: 27/04/2025 18:44:37 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuarios](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](100) NULL,
	[apellido] [nvarchar](100) NULL,
	[email] [nvarchar](150) NULL,
	[password] [nvarchar](512) NULL,
	[salt] [nvarchar](100) NULL,
	[tipo_usuario] [int] NOT NULL,
	[activo] [bit] NULL,
	[fecha_creacion] [datetime] NULL,
	[fecha_modificacion] [datetime] NULL,
	[ultima_sesion] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_usuarios_email] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[categorias_equipos] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[comunicaciones] ADD  DEFAULT (getdate()) FOR [fecha_alta]
GO
ALTER TABLE [dbo].[ConfigurationKeys] ADD  DEFAULT ((1)) FOR [activa]
GO
ALTER TABLE [dbo].[ConfigurationKeys] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[documentacion_interna] ADD  DEFAULT (getdate()) FOR [fecha_alta]
GO
ALTER TABLE [dbo].[documentacion_interna] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[equipos] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[historial_incidencias] ADD  DEFAULT (getdate()) FOR [fecha_accion]
GO
ALTER TABLE [dbo].[incidencias] ADD  DEFAULT ('abierta') FOR [estado]
GO
ALTER TABLE [dbo].[incidencias] ADD  DEFAULT ('media') FOR [prioridad]
GO
ALTER TABLE [dbo].[incidencias] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[mantenimientos] ADD  DEFAULT (getdate()) FOR [fecha_mantenimiento]
GO
ALTER TABLE [dbo].[reportes] ADD  CONSTRAINT [DF_reportes_fecha_creacion]  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[reportes_documentos] ADD  DEFAULT (getdate()) FOR [fecha_subida]
GO
ALTER TABLE [dbo].[reportes_documentos] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[tipos_equipos] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT ((1)) FOR [activo]
GO
ALTER TABLE [dbo].[usuarios] ADD  DEFAULT (getdate()) FOR [fecha_creacion]
GO
ALTER TABLE [dbo].[comunicaciones]  WITH CHECK ADD FOREIGN KEY([id_usuario_alta])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[comunicaciones]  WITH CHECK ADD FOREIGN KEY([id_usuario_modificacion])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[defectos_reportados]  WITH CHECK ADD FOREIGN KEY([reporte_id])
REFERENCES [dbo].[reportes] ([id])
GO
ALTER TABLE [dbo].[defectos_reportados]  WITH CHECK ADD FOREIGN KEY([tipo_defecto_id])
REFERENCES [dbo].[tipos_defectos] ([id])
GO
ALTER TABLE [dbo].[documentacion_interna]  WITH CHECK ADD FOREIGN KEY([id_usuario_alta])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[documentacion_interna]  WITH CHECK ADD FOREIGN KEY([id_usuario_modificacion])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[equipos]  WITH CHECK ADD FOREIGN KEY([tipo_equipo_id])
REFERENCES [dbo].[tipos_equipos] ([id])
GO
ALTER TABLE [dbo].[historial_incidencias]  WITH CHECK ADD FOREIGN KEY([incidencia_id])
REFERENCES [dbo].[incidencias] ([id])
GO
ALTER TABLE [dbo].[historial_incidencias]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[incidencias]  WITH CHECK ADD FOREIGN KEY([alta_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[incidencias]  WITH CHECK ADD FOREIGN KEY([modificacion_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[mantenimientos]  WITH CHECK ADD FOREIGN KEY([equipo_id])
REFERENCES [dbo].[equipos] ([id])
GO
ALTER TABLE [dbo].[mantenimientos]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[reportes]  WITH CHECK ADD FOREIGN KEY([equipo_id])
REFERENCES [dbo].[equipos] ([id])
GO
ALTER TABLE [dbo].[reportes]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[reportes_documentos]  WITH CHECK ADD FOREIGN KEY([reporte_id])
REFERENCES [dbo].[reportes] ([id])
GO
ALTER TABLE [dbo].[reportes_documentos]  WITH CHECK ADD FOREIGN KEY([usuario_id])
REFERENCES [dbo].[usuarios] ([id])
GO
ALTER TABLE [dbo].[tipos_equipos]  WITH CHECK ADD FOREIGN KEY([categoria_equipo_id])
REFERENCES [dbo].[categorias_equipos] ([id])
GO
ALTER TABLE [dbo].[usuarios]  WITH CHECK ADD CHECK  (([tipo_usuario]=(2) OR [tipo_usuario]=(1) OR [tipo_usuario]=(0)))
GO
