import handler from './[action].js';

export default function statusHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'status' };
  return handler(req, res);
}
