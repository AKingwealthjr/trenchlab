import handler from './[action].js';

export default function listHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'list' };
  return handler(req, res);
}
