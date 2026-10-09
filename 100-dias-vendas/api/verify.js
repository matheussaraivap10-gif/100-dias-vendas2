const { MercadoPagoConfig, Payment } = require('mercadopago');
const jwt = require('jsonwebtoken');
export default async function handler(req, res) {
    const { payment_id } = req.query;
    if (!payment_id) return res.status(400).json({ error: 'Falta payment_id' });
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN });
    const payment = new Payment(client);
    try {
        const paymentData = await payment.get({ id: payment_id });
        if (paymentData.status === 'approved' && paymentData.transaction_amount >= 19.90) {
            const downloadToken = jwt.sign({ payment_id, product: '100_DIAS' }, process.env.JWT_SECRET, { expiresIn: '2h' });
            return res.status(200).json({ approved: true, downloadToken });
        }
        return res.status(200).json({ approved: false });
    } catch (error) { return res.status(500).json({ error: 'Erro na validação' }); }
}