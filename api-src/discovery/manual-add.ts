import handler from './[action].js';

export default function manualAddHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'manual-add' };
  return handler(req, res);
}
