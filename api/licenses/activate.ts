import handler from './[action].js';

export default function activateHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'activate' };
  return handler(req, res);
}
