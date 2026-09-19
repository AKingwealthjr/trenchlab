import handler from './[action].js';

export default function rejectHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'reject' };
  return handler(req, res);
}
