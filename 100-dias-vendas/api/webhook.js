const { MercadoPagoConfig, Payment } = require('mercadopago');
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
    const payment = new Payment(client);
    try {
        const body = req.body;
        if (body.type === 'payment' && body.data && body.data.id) {
            const paymentData = await payment.get({ id: body.data.id });
            if (paymentData.status === 'approved') { console.log('Pagamento aprovado!'); }
        }
        res.status(200).send('OK');
    } catch (error) { res.status(500).send('Erro'); }
}