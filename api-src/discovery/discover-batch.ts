import handler from './[action].js';

export default function discoverBatchHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'discover-batch' };
  return handler(req, res);
}
