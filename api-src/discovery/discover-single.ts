import handler from './[action].js';

export default function discoverSingleHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'discover-single' };
  return handler(req, res);
}
