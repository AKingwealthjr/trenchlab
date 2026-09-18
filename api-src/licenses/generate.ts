import handler from './[action].js';

export default function generateHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'generate' };
  return handler(req, res);
}
