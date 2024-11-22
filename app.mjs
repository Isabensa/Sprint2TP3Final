import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';
import path from 'path'; // Importar path para manejar rutas
import { fileURLToPath } from 'url'; // Necesario para obtener rutas absolutas en módulos ES


const app = express();
const PORT = process.env.PORT || 3000;

app.use('/styles', express.static(path.resolve('src/public/styles')));

// Solución para resolver rutas relativas usando path y ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar directorio de vistas y motor EJS
app.set('view engine', 'ejs'); // Motor de vistas EJS
app.set('views', path.join(__dirname, 'views')); // Carpeta de vistas ajustada con ruta absoluta



// Middleware para servir archivos estáticos (como CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());

// Conexión a MongoDB
(async () => {
    try {
        await connectDB();
        console.log("Conexión exitosa a MongoDB");

        // Iniciar el servidor solo después de conectar a la base de datos
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1); // Finaliza el proceso en caso de error de conexión
    }
})();

// Configuración de rutas
app.use('/api', superHeroRoutes);

// Manejo de errores para rutas no encontradas
app.use((_req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});
