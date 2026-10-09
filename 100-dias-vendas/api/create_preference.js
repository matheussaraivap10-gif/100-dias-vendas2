const { MercadoPagoConfig, Preference } = require('mercadopago');
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
    const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';
    try {
        const preference = new Preference(client);
        const result = await preference.create({
            body: {
                items: [{ id: '100_DIAS_CONFIANCA', title: '100 Dias de Confiança - Treinamento Prático', quantity: 1, unit_price: 19.90, currency_id: 'BRL' }],
                back_urls: { success: SITE_URL + '/sucesso.html', pending: SITE_URL + '/pendente.html', failure: SITE_URL + '/erro.html' },
                auto_return: 'approved'
            }
        });
        res.status(200).json({ id: result.id });
    } catch (error) { res.status(500).json({ error: 'Erro' }); }
}