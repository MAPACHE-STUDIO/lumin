const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
    }

    const token = authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Error en autenticación:', error);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;