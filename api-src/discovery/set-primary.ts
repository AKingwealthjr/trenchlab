import handler from './[action].js';

export default function setPrimaryHandler(req: any, res: any) {
  req.query = { ...req.query, action: 'set-primary' };
  return handler(req, res);
}
