import handler from './[action].js';

export default function resourcesHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'resources' };
  return handler(req, res);
}
