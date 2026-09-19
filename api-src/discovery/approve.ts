import handler from './[action].js';

export default function approveHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'approve' };
  return handler(req, res);
}
