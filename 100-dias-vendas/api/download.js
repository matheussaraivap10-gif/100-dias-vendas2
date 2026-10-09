const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
export default function handler(req, res) {
    const { token } = req.query;
    if (!token) return res.status(401).send('Acesso não autorizado.');
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        const filePath = path.join(process.cwd(), 'private_files', '100_dias_de_confianca_ilustrado.pdf');
        if (!fs.existsSync(filePath)) return res.status(404).send('Ficheiro não encontrado.');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="100_dias_de_confianca_ilustrado.pdf"');
        fs.createReadStream(filePath).pipe(res);
    } catch (error) { return res.status(403).send('Link expirado.'); }
}